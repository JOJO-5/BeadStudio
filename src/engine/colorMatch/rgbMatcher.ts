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
export function quantizeWithDithering(imageData: ImageData, palette: Palette): QuantizationResult {
  const { data, width, height } = imageData

  // Work with floating point data
  const rData = new Float32Array(data.length / 4)
  const gData = new Float32Array(data.length / 4)
  const bData = new Float32Array(data.length / 4)

  // Copy original values
  for (let i = 0, j = 0; i < data.length; i += 4, j++) {
    rData[j] = data[i]
    gData[j] = data[i + 1]
    bData[j] = data[i + 2]
  }

  const paletteColors = palette.colors

  // Floyd-Steinberg dithering
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x
      const oldR = rData[idx]
      const oldG = gData[idx]
      const oldB = bData[idx]

      // Find nearest color
      const nearest = findNearestColor(
        Math.round(oldR),
        Math.round(oldG),
        Math.round(oldB),
        paletteColors
      )

      const newR = nearest.rgb[0]
      const newG = nearest.rgb[1]
      const newB = nearest.rgb[2]

      // Calculate quantization error
      const errR = oldR - newR
      const errG = oldG - newG
      const errB = oldB - newB

      rData[idx] = newR
      gData[idx] = newG
      bData[idx] = newB

      // Distribute error to neighbors (Floyd-Steinberg pattern)
      // Right pixel (7/16)
      if (x + 1 < width) {
        const idxRight = idx + 1
        rData[idxRight] += errR * 7 / 16
        gData[idxRight] += errG * 7 / 16
        bData[idxRight] += errB * 7 / 16
      }

      // Bottom-left pixel (3/16)
      if (y + 1 < height && x > 0) {
        const idxBL = (y + 1) * width + (x - 1)
        rData[idxBL] += errR * 3 / 16
        gData[idxBL] += errG * 3 / 16
        bData[idxBL] += errB * 3 / 16
      }

      // Bottom pixel (5/16)
      if (y + 1 < height) {
        const idxB = (y + 1) * width + x
        rData[idxB] += errR * 5 / 16
        gData[idxB] += errG * 5 / 16
        bData[idxB] += errB * 5 / 16
      }

      // Bottom-right pixel (1/16)
      if (y + 1 < height && x + 1 < width) {
        const idxBR = (y + 1) * width + (x + 1)
        rData[idxBR] += errR * 1 / 16
        gData[idxBR] += errG * 1 / 16
        bData[idxBR] += errB * 1 / 16
      }
    }
  }

  // Create output image
  const output = new ImageData(width, height)
  const outData = output.data
  const usedColorSet = new Set<string>()

  for (let i = 0, j = 0; i < outData.length; i += 4, j++) {
    outData[i] = Math.round(Math.max(0, Math.min(255, rData[j])))
    outData[i + 1] = Math.round(Math.max(0, Math.min(255, gData[j])))
    outData[i + 2] = Math.round(Math.max(0, Math.min(255, bData[j])))
    outData[i + 3] = 255

    // Track used colors
    const nearest = findNearestColor(outData[i], outData[i + 1], outData[i + 2], paletteColors)
    usedColorSet.add(nearest.code)
  }

  const usedColors = palette.colors.filter((c) => usedColorSet.has(c.code))

  return { imageData: output, usedColors }
}
