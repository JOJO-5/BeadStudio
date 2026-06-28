/**
 * Synchronous image resize using canvas 2D
 * Used for real-time preview when target size changes
 */

export interface SyncResizeOptions {
  width: number
  height: number
}

/**
 * Synchronously resize ImageData using canvas 2D
 * Fast but lower quality than pica
 */
export function syncResizeImage(
  source: ImageData,
  options: SyncResizeOptions
): ImageData {
  const { width, height } = options

  const srcCanvas = document.createElement('canvas')
  srcCanvas.width = source.width
  srcCanvas.height = source.height
  const srcCtx = srcCanvas.getContext('2d')!
  srcCtx.putImageData(source, 0, 0)

  const dstCanvas = document.createElement('canvas')
  dstCanvas.width = width
  dstCanvas.height = height
  const dstCtx = dstCanvas.getContext('2d')!

  // Use nearest neighbor for pixel art look
  dstCtx.imageSmoothingEnabled = false
  dstCtx.drawImage(srcCanvas, 0, 0, width, height)

  return dstCtx.getImageData(0, 0, width, height)
}
