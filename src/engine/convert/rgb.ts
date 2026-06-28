export type RGB = [number, number, number]

export function rgbToArray(r: number, g: number, b: number): RGB {
  return [r, g, b]
}

export function arrayToRgb(arr: RGB): { r: number; g: number; b: number } {
  return { r: arr[0], g: arr[1], b: arr[2] }
}

export function rgbToHex(rgb: RGB): string {
  const [r, g, b] = rgb
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')
}

export function hexToRgb(hex: string): RGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return [0, 0, 0]
  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
}
