import type { Palette, PaletteColor } from '@/engine/palette'
import { rgbToLab } from '@/engine/convert/lab'
import type { RGB } from '@/engine/convert/rgb'

// Pre-computed LAB values for palette (cached per palette)
const paletteLabCache = new Map<string, { L: number; a: number; b: number }[]>()

function getPaletteLab(palette: PaletteColor[]): { L: number; a: number; b: number }[] {
  const key = palette.map(c => c.code).join(',')
  if (!paletteLabCache.has(key)) {
    const labValues = palette.map(c => rgbToLab(c.rgb as RGB))
    paletteLabCache.set(key, labValues)
  }
  return paletteLabCache.get(key)!
}

/**
 * Color matching using LAB color space + CIE76 distance
 * Optimized with pre-computed palette LAB values
 */
export function findNearestColor(
  r: number,
  g: number,
  b: number,
  palette: PaletteColor[],
  paletteLab?: { L: number; a: number; b: number }[]
): PaletteColor {
  const inputLab = rgbToLab([r, g, b] as RGB)

  // Use pre-computed LAB if provided, otherwise compute
  const labs = paletteLab || getPaletteLab(palette)

  let nearest = palette[0]
  let minDistance = Infinity

  for (let i = 0; i < palette.length; i++) {
    const colorLab = labs[i]
    const dL = inputLab.L - colorLab.L
    const da = inputLab.a - colorLab.a
    const db = inputLab.b - colorLab.b
    const distance = Math.sqrt(dL * dL + da * da + db * db)

    if (distance < minDistance) {
      minDistance = distance
      nearest = palette[i]
    }
  }

  return nearest
}

export interface QuantizationResult {
  imageData: ImageData
  usedColors: PaletteColor[]
  /** Color code for each pixel (stored as string array, index = y * width + x) */
  colorCodes: string[]
}

/**
 * Quantize image to palette without dithering
 * Optimized: pre-compute palette LAB values once
 */
export function quantizeToPalette(imageData: ImageData, palette: Palette): QuantizationResult {
  const { data, width, height } = imageData
  const output = new ImageData(width, height)
  const outData = output.data
  const usedColorSet = new Set<string>()
  const colorCodes: string[] = []

  const paletteColors = palette.colors
  const paletteLab = getPaletteLab(paletteColors)

  for (let i = 0; i < data.length; i += 4) {
    const pixelIndex = i / 4
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const a = data[i + 3]

    const nearest = findNearestColor(r, g, b, paletteColors, paletteLab)

    outData[i] = nearest.rgb[0]
    outData[i + 1] = nearest.rgb[1]
    outData[i + 2] = nearest.rgb[2]
    outData[i + 3] = a

    usedColorSet.add(nearest.code)
    colorCodes[pixelIndex] = nearest.code
  }

  const usedColors = palette.colors.filter((c) => usedColorSet.has(c.code))

  return { imageData: output, usedColors, colorCodes }
}

/**
 * Quantize image - for bead patterns we use simple palette matching
 * without dithering because each bead is a solid color
 */
export function quantizeWithDithering(imageData: ImageData, palette: Palette): QuantizationResult {
  return quantizeToPalette(imageData, palette)
}
