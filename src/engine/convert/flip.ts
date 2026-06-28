/**
 * Image flip utilities for bead pattern processing
 */

/**
 * Flip image horizontally (mirror)
 */
export function flipHorizontal(imageData: ImageData): ImageData {
  const { data, width, height } = imageData
  const output = new Uint8ClampedArray(data)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width / 2; x++) {
      const leftIdx = (y * width + x) * 4
      const rightIdx = (y * width + (width - 1 - x)) * 4

      // Swap left and right pixels
      for (let i = 0; i < 4; i++) {
        const temp = output[leftIdx + i]
        output[leftIdx + i] = output[rightIdx + i]
        output[rightIdx + i] = temp
      }
    }
  }

  return new ImageData(output, width, height)
}

/**
 * Flip image vertically
 */
export function flipVertical(imageData: ImageData): ImageData {
  const { data, width, height } = imageData
  const output = new Uint8ClampedArray(data)

  for (let y = 0; y < height / 2; y++) {
    for (let x = 0; x < width; x++) {
      const topIdx = (y * width + x) * 4
      const bottomIdx = ((height - 1 - y) * width + x) * 4

      // Swap top and bottom pixels
      for (let i = 0; i < 4; i++) {
        const temp = output[topIdx + i]
        output[topIdx + i] = output[bottomIdx + i]
        output[bottomIdx + i] = temp
      }
    }
  }

  return new ImageData(output, width, height)
}
