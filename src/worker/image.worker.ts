import { resizeImage, type ResizeOptions } from '@/engine/resize'
import { pixelateImage, type PixelateOptions } from '@/engine/pixelate'

export interface WorkerRequest {
  id: string
  type: 'resize' | 'pixelate'
  payload: {
    imageData: ImageData
    options: ResizeOptions | PixelateOptions
  }
}

export interface WorkerResponse {
  id: string
  success: boolean
  result?: ImageData
  error?: string
}

self.onmessage = async (e: MessageEvent<WorkerRequest>) => {
  const { id, type, payload } = e.data
  const { imageData, options } = payload

  try {
    let result: ImageData

    switch (type) {
      case 'resize':
        result = await resizeImage(imageData, options as ResizeOptions)
        break
      case 'pixelate':
        result = pixelateImage(imageData, options as PixelateOptions)
        break
      default:
        throw new Error(`Unknown task type: ${type}`)
    }

    self.postMessage({
      id,
      success: true,
      result,
    } satisfies WorkerResponse)
  } catch (err) {
    self.postMessage({
      id,
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    } satisfies WorkerResponse)
  }
}
