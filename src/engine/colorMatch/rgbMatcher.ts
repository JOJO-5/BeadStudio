import type { Palette, PaletteColor } from '@/engine/palette'

/**
 * Simple RGB Euclidean distance color matching
 * Fast and effective for limited palette sizes
 */
export function findNearestColor(
  r: number,
  g: number,
  b: number,
  palette: PaletteColor[]
): PaletteColor {
  let nearest = palette[0]
  let minDistance = Infinity

  for (const color of palette) {
    const dr = r - color.rgb[0]
    const dg = g - color.rgb[1]
    const db = b - color.rgb[2]
    // Euclidean distance in RGB space
    const distance = dr * dr + dg * dg + db * db

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
}

/**
 * Quantize image to palette without dithering
 */
export function quantizeToPalette(imageData: ImageData, palette: Palette): QuantizationResult {
  const { data, width, height } = imageData
  const output = new ImageData(width, height)
  const outData = output.data
  const usedColorSet = new Set<string>()

  const paletteColors = palette.colors

  for (let i = 0; i < data.length; i += 4) {
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
  }

  const usedColors = palette.colors.filter((c) => usedColorSet.has(c.code))

  return { imageData: output, usedColors }
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
