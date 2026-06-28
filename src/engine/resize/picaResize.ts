/* eslint-disable @typescript-eslint/no-explicit-any */
import Pica from 'pica'

const pica = new (Pica as any)()

export interface ResizeOptions {
  width: number
  height: number
}

export async function resizeImage(
  source: ImageData,
  options: ResizeOptions
): Promise<ImageData> {
  const { width, height } = options

  const srcCanvas = document.createElement('canvas')
  srcCanvas.width = source.width
  srcCanvas.height = source.height
  const srcCtx = srcCanvas.getContext('2d')
  if (!srcCtx) {
    throw new Error('Failed to get 2d context')
  }
  srcCtx.putImageData(source, 0, 0)

  const dstCanvas = document.createElement('canvas')
  dstCanvas.width = width
  dstCanvas.height = height

  await pica.resize(srcCanvas, dstCanvas, {
    quality: 3,
    alpha: true,
  })

  const ctx = dstCanvas.getContext('2d')
  if (!ctx) {
    throw new Error('Failed to get 2d context')
  }

  return ctx.getImageData(0, 0, width, height)
}
