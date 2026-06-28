export interface PixelateOptions {
  pixelSize: number
}

export function pixelateImage(source: ImageData, options: PixelateOptions): ImageData {
  const { pixelSize } = options
  const { width, height, data: srcData } = source

  const output = new ImageData(width, height)
  const dstData = output.data

  for (let y = 0; y < height; y += pixelSize) {
    for (let x = 0; x < width; x += pixelSize) {
      let r = 0, g = 0, b = 0, a = 0, count = 0

      for (let dy = 0; dy < pixelSize && y + dy < height; dy++) {
        for (let dx = 0; dx < pixelSize && x + dx < width; dx++) {
          const idx = ((y + dy) * width + (x + dx)) * 4
          r += srcData[idx]
          g += srcData[idx + 1]
          b += srcData[idx + 2]
          a += srcData[idx + 3]
          count++
        }
      }

      r = Math.round(r / count)
      g = Math.round(g / count)
      b = Math.round(b / count)
      a = Math.round(a / count)

      for (let dy = 0; dy < pixelSize && y + dy < height; dy++) {
        for (let dx = 0; dx < pixelSize && x + dx < width; dx++) {
          const idx = ((y + dy) * width + (x + dx)) * 4
          dstData[idx] = r
          dstData[idx + 1] = g
          dstData[idx + 2] = b
          dstData[idx + 3] = a
        }
      }
    }
  }

  return output
}
