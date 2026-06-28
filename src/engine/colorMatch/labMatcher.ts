import type { PaletteColor } from '@/engine/palette'
import { rgbToLab } from '@/engine/convert/lab'
import { calculateDeltaE00 } from '@/engine/convert/deltaE'
import type { RGB } from '@/engine/convert/rgb'

/**
 * Find nearest color using LAB color space + ΔE2000
 * More accurate for human color perception than RGB distance
 */
export function findNearestColorLAB(
  r: number,
  g: number,
  b: number,
  palette: PaletteColor[]
): PaletteColor {
  const inputRGB: RGB = [r, g, b]
  const inputLab = rgbToLab(inputRGB)

  let nearest = palette[0]
  let minDeltaE = Infinity

  for (const color of palette) {
    const colorLab = rgbToLab(color.rgb as RGB)
    const deltaE = calculateDeltaE00(inputLab, colorLab)

    if (deltaE < minDeltaE) {
      minDeltaE = deltaE
      nearest = color
    }
  }

  return nearest
}

/**
 * Pre-compute LAB values for palette colors to speed up matching
 */
export function createLabPaletteCache(palette: PaletteColor[]): Map<string, { lab: ReturnType<typeof rgbToLab> }> {
  const cache = new Map()
  for (const color of palette) {
    cache.set(color.code, { lab: rgbToLab(color.rgb as RGB) })
  }
  return cache
}

/**
 * Find nearest color using pre-computed LAB cache
 */
export function findNearestColorLABCached(
  r: number,
  g: number,
  b: number,
  palette: PaletteColor[],
  labCache: Map<string, { lab: ReturnType<typeof rgbToLab> }>
): PaletteColor {
  const inputLab = rgbToLab([r, g, b])

  let nearest = palette[0]
  let minDeltaE = Infinity

  for (const color of palette) {
    const cached = labCache.get(color.code)
    if (!cached) continue

    const deltaE = calculateDeltaE00(inputLab, cached.lab)

    if (deltaE < minDeltaE) {
      minDeltaE = deltaE
      nearest = color
    }
  }

  return nearest
}
