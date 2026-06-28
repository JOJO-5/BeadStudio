import type { Palette, PaletteColor } from '@/engine/palette'
import { rgbToLab, calculateDeltaE00, type LAB } from '@/engine/convert'

export interface ColorMapping {
  sourceIndex: number
  targetColor: PaletteColor
  deltaE: number
}

export interface QuantizationResult {
  imageData: ImageData
  mappings: ColorMapping[]
  usedColors: PaletteColor[]
}

export function findClosestColor(lab: LAB, palette: Palette): { color: PaletteColor; deltaE: number } {
  let closest = palette.colors[0]
  let minDeltaE = Infinity

  for (const paletteColor of palette.colors) {
    const paletteLab = rgbToLab(paletteColor.rgb)
    const deltaE = calculateDeltaE00(lab, paletteLab)

    if (deltaE < minDeltaE) {
      minDeltaE = deltaE
      closest = paletteColor
    }
  }

  return { color: closest, deltaE: minDeltaE }
}

export function quantizeToPalette(imageData: ImageData, palette: Palette): QuantizationResult {
  const { data, width, height } = imageData
  const output = new ImageData(width, height)
  const outData = output.data
  const mappings: ColorMapping[] = []
  const usedColorSet = new Set<string>()

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const a = data[i + 3]

    const lab = rgbToLab([r, g, b])
    const { color: closestColor, deltaE } = findClosestColor(lab, palette)

    const pixelIndex = i / 4

    mappings[pixelIndex] = {
      sourceIndex: pixelIndex,
      targetColor: closestColor,
      deltaE,
    }

    outData[i] = closestColor.rgb[0]
    outData[i + 1] = closestColor.rgb[1]
    outData[i + 2] = closestColor.rgb[2]
    outData[i + 3] = a

    usedColorSet.add(closestColor.code)
  }

  const usedColors = palette.colors.filter((c) => usedColorSet.has(c.code))

  return { imageData: output, mappings, usedColors }
}
