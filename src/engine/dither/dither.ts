export type DitherAlgorithm = 'none' | 'floyd-steinberg' | 'atkinson' | 'sierra'

function applyError(data: Uint8ClampedArray, width: number, x: number, y: number, err: {r: number; g: number; b: number}, factor: number) {
  if (x < 0 || x >= width || y < 0) return
  const idx = (y * width + x) * 4
  data[idx] = Math.max(0, Math.min(255, data[idx] + err.r * factor))
  data[idx + 1] = Math.max(0, Math.min(255, data[idx + 1] + err.g * factor))
  data[idx + 2] = Math.max(0, Math.min(255, data[idx + 2] + err.b * factor))
}

export function applyFloydSteinberg(data: Uint8ClampedArray, width: number, height: number): Uint8ClampedArray {
  const result = new Uint8ClampedArray(data)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4
      const oldR = result[idx]
      const oldG = result[idx + 1]
      const oldB = result[idx + 2]

      result[idx] = oldR
      result[idx + 1] = oldG
      result[idx + 2] = oldB

      const err = {
        r: oldR - result[idx],
        g: oldG - result[idx + 1],
        b: oldB - result[idx + 2]
      }

      applyError(result, width, x + 1, y, err, 7 / 16)
      applyError(result, width, x - 1, y + 1, err, 3 / 16)
      applyError(result, width, x, y + 1, err, 5 / 16)
      applyError(result, width, x + 1, y + 1, err, 1 / 16)
    }
  }

  return result
}

export function applyAtkinson(data: Uint8ClampedArray, width: number, height: number): Uint8ClampedArray {
  const result = new Uint8ClampedArray(data)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4
      const oldR = result[idx]
      const oldG = result[idx + 1]
      const oldB = result[idx + 2]

      const err = {
        r: oldR - result[idx],
        g: oldG - result[idx + 1],
        b: oldB - result[idx + 2]
      }

      applyError(result, width, x + 1, y, err, 1 / 8)
      applyError(result, width, x + 2, y, err, 1 / 8)
      applyError(result, width, x - 1, y + 1, err, 1 / 8)
      applyError(result, width, x, y + 1, err, 1 / 8)
      applyError(result, width, x + 1, y + 1, err, 1 / 8)
      applyError(result, width, x, y + 2, err, 1 / 8)
    }
  }

  return result
}

export function applySierra(data: Uint8ClampedArray, width: number, height: number): Uint8ClampedArray {
  const result = new Uint8ClampedArray(data)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4
      const oldR = result[idx]
      const oldG = result[idx + 1]
      const oldB = result[idx + 2]

      const err = {
        r: oldR - result[idx],
        g: oldG - result[idx + 1],
        b: oldB - result[idx + 2]
      }

      applyError(result, width, x + 1, y, err, 5 / 32)
      applyError(result, width, x + 2, y, err, 3 / 32)
      applyError(result, width, x - 2, y + 1, err, 2 / 32)
      applyError(result, width, x - 1, y + 1, err, 4 / 32)
      applyError(result, width, x, y + 1, err, 5 / 32)
      applyError(result, width, x + 1, y + 1, err, 4 / 32)
      applyError(result, width, x + 2, y + 1, err, 2 / 32)
      applyError(result, width, x - 1, y + 2, err, 2 / 32)
      applyError(result, width, x, y + 2, err, 3 / 32)
      applyError(result, width, x + 1, y + 2, err, 2 / 32)
    }
  }

  return result
}

export function ditherImage(data: Uint8ClampedArray, width: number, height: number, algorithm: DitherAlgorithm): Uint8ClampedArray {
  switch (algorithm) {
    case 'floyd-steinberg':
      return applyFloydSteinberg(data, width, height)
    case 'atkinson':
      return applyAtkinson(data, width, height)
    case 'sierra':
      return applySierra(data, width, height)
    case 'none':
    default:
      return data
  }
}
