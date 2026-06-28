import type { WorkerRequest, WorkerResponse } from './image.worker'
import type { ResizeOptions } from '@/engine/resize'

type TaskHandler = (result: ImageData) => void
type ErrorHandler = (error: string) => void

class ImageWorkerClient {
  private worker: Worker | null = null
  private pending = new Map<string, { resolve: TaskHandler; reject: ErrorHandler }>()

  init() {
    if (this.worker) return
    this.worker = new Worker(new URL('./image.worker.ts', import.meta.url), {
      type: 'module',
    })
    this.worker.onmessage = (e: MessageEvent<WorkerResponse>) => {
      const { id, success, result, error } = e.data
      const handlers = this.pending.get(id)
      if (handlers) {
        if (success && result) {
          handlers.resolve(result)
        } else {
          handlers.reject(error || 'Unknown error')
        }
        this.pending.delete(id)
      }
    }
  }

  async resize(imageData: ImageData, width: number, height: number): Promise<ImageData> {
    this.init()
    return this.postMessage('resize', { imageData, options: { width, height } })
  }

  async pixelate(imageData: ImageData, pixelSize: number): Promise<ImageData> {
    this.init()
    return this.postMessage('pixelate', { imageData, options: { pixelSize } })
  }

  private postMessage(
    type: 'resize' | 'pixelate',
    payload: { imageData: ImageData; options: ResizeOptions | { pixelSize: number } }
  ): Promise<ImageData> {
    return new Promise((resolve, reject) => {
      if (!this.worker) {
        reject(new Error('Worker not initialized'))
        return
      }
      const id = crypto.randomUUID()
      this.pending.set(id, { resolve, reject })
      this.worker.postMessage({
        id,
        type,
        payload,
      } satisfies WorkerRequest)
    })
  }

  terminate() {
    this.worker?.terminate()
    this.worker = null
    this.pending.clear()
  }
}

export const imageWorker = new ImageWorkerClient()
