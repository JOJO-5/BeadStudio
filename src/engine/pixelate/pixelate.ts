export interface PixelateOptions {
  pixelSize: number
}

export function pixelateImage(source: ImageData, options: PixelateOptions): ImageData {
  const { pixelSize } = options
  const { width, height, data: srcData } = source

  const output = new ImageData(width, height)
  const dstData = output.data

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // Find the block this pixel belongs to
      const blockX = Math.floor(x / pixelSize) * pixelSize
      const blockY = Math.floor(y / pixelSize) * pixelSize

      let r = 0, g = 0, b = 0, a = 0, count = 0

      // Average all pixels in the block
      for (let dy = 0; dy < pixelSize && blockY + dy < height; dy++) {
        for (let dx = 0; dx < pixelSize && blockX + dx < width; dx++) {
          const idx = ((blockY + dy) * width + (blockX + dx)) * 4
          r += srcData[idx]
          g += srcData[idx + 1]
          b += srcData[idx + 2]
          a += srcData[idx + 3]
          count++
        }
      }

      const idx = (y * width + x) * 4
      if (count > 0) {
        dstData[idx] = Math.round(r / count)
        dstData[idx + 1] = Math.round(g / count)
        dstData[idx + 2] = Math.round(b / count)
        dstData[idx + 3] = Math.round(a / count)
      }
    }
  }

  return output
}
