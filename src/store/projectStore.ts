import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ProjectState {
  name: string
  originalImage: ImageData | null
  processedImage: ImageData | null
  paletteId: string
  beadSize: number
  targetWidth: number
  targetHeight: number
}

interface ProjectActions {
  setName: (name: string) => void
  setOriginalImage: (image: ImageData | null) => void
  setProcessedImage: (image: ImageData | null) => void
  setPaletteId: (paletteId: string) => void
  setBeadSize: (size: number) => void
  setTargetSize: (width: number, height: number) => void
  reset: () => void
}

const initialState: ProjectState = {
  name: '未命名项目',
  originalImage: null,
  processedImage: null,
  paletteId: 'perler-classic',
  beadSize: 8,
  targetWidth: 0,
  targetHeight: 0,
}

export const useProjectStore = create<ProjectState & ProjectActions>()(
  persist(
    (set) => ({
      ...initialState,

      setName: (name) => set({ name }),
      setOriginalImage: (originalImage) => set({ originalImage }),
      setProcessedImage: (processedImage) => set({ processedImage }),
      setPaletteId: (paletteId) => set({ paletteId }),
      setBeadSize: (beadSize) => set({ beadSize }),
      setTargetSize: (targetWidth, targetHeight) => set({ targetWidth, targetHeight }),
      reset: () => set(initialState),
    }),
    {
      name: 'beadstudio-project',
      partialize: (state) => ({
        name: state.name,
        paletteId: state.paletteId,
        beadSize: state.beadSize,
        targetWidth: state.targetWidth,
        targetHeight: state.targetHeight,
      }),
    }
  )
)
