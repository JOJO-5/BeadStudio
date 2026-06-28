import type { RGB } from './rgb'

export interface LAB {
  L: number
  a: number
  b: number
}

// D65 illuminant, 2 degree observer
const D65 = { x: 95.047, y: 100.0, z: 108.883 }

function gammaCorrect(c: number): number {
  return c > 0.008856 ? Math.pow(c, 1 / 3) : 7.787 * c + 16 / 116
}

export function rgbToLab(rgb: RGB): LAB {
  const [r, g, b] = rgb.map((c) => c / 255)
  const [rs, gs, bs] = [r, g, b].map((c) =>
    c > 0.04045 ? Math.pow((c + 0.055) / 1.055, 2.4) : c / 12.92
  )

  const x = (rs * 0.4124 + gs * 0.3576 + bs * 0.1805) / D65.x * 100
  const y = (rs * 0.2126 + gs * 0.7152 + bs * 0.0722) / D65.y * 100
  const z = (rs * 0.0193 + gs * 0.1192 + bs * 0.9505) / D65.z * 100

  const fx = gammaCorrect(x / 100)
  const fy = gammaCorrect(y / 100)
  const fz = gammaCorrect(z / 100)

  return {
    L: 116 * fy - 16,
    a: 500 * (fx - fy),
    b: 200 * (fy - fz),
  }
}
