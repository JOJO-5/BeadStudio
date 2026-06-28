import type { Palette, PaletteColor } from '@/engine/palette'
import { rgbToLab } from '@/engine/convert/lab'
import type { RGB } from '@/engine/convert/rgb'

/**
 * Color matching using LAB color space + CIE76 distance
 * Fast and accurate for human color perception
 */
export function findNearestColor(
  r: number,
  g: number,
  b: number,
  palette: PaletteColor[]
): PaletteColor {
  const inputLab = rgbToLab([r, g, b] as RGB)

  let nearest = palette[0]
  let minDistance = Infinity

  for (const color of palette) {
    const colorLab = rgbToLab(color.rgb as RGB)
    // CIE76 LAB distance (fast approximation)
    const dL = inputLab.L - colorLab.L
    const da = inputLab.a - colorLab.a
    const db = inputLab.b - colorLab.b
    const distance = Math.sqrt(dL * dL + da * da + db * db)

    if (distance < minDistance) {
      minDistance = distance
      nearest = color
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
 */
export function quantizeToPalette(imageData: ImageData, palette: Palette): QuantizationResult {
  const { data, width, height } = imageData
  const output = new ImageData(width, height)
  const outData = output.data
  const usedColorSet = new Set<string>()
  const colorCodes: string[] = []

  const paletteColors = palette.colors

  for (let i = 0; i < data.length; i += 4) {
    const pixelIndex = i / 4
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const a = data[i + 3]

    const nearest = findNearestColor(r, g, b, paletteColors)

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
 * Quantize image with Floyd-Steinberg dithering
 * Produces smoother gradients with limited palette
 */
/**
 * Quantize image - for bead patterns we use simple palette matching
 * without dithering because each bead is a solid color
 */
export function quantizeWithDithering(imageData: ImageData, palette: Palette): QuantizationResult {
  return quantizeToPalette(imageData, palette)
}
