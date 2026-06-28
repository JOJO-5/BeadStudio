import type { Palette, PaletteColor } from '@/engine/palette'

export interface ColorStat {
  color: PaletteColor
  count: number
  percentage: number
}

export interface Statistics {
  totalPixels: number
  colorCount: number
  colors: ColorStat[]
}

export function countColors(imageData: ImageData, palette: Palette): Statistics {
  const { data, width, height } = imageData
  const colorMap = new Map<string, { color: PaletteColor; count: number }>()

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]

    // Find closest palette color
    let closest = palette.colors[0]
    let minDist = Infinity

    for (const pc of palette.colors) {
      const dr = pc.rgb[0] - r
      const dg = pc.rgb[1] - g
      const db = pc.rgb[2] - b
      const dist = dr * dr + dg * dg + db * db
      if (dist < minDist) {
        minDist = dist
        closest = pc
      }
    }

    const existing = colorMap.get(closest.code)
    if (existing) {
      existing.count++
    } else {
      colorMap.set(closest.code, { color: closest, count: 1 })
    }
  }

  const totalPixels = width * height
  const colors: ColorStat[] = []
  for (const { color, count } of colorMap.values()) {
    colors.push({ color, count, percentage: (count / totalPixels) * 100 })
  }

  // Sort by count descending
  colors.sort((a, b) => b.count - a.count)

  return {
    totalPixels,
    colorCount: colors.length,
    colors,
  }
}
