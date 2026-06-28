import { create } from 'zustand'

interface CanvasState {
  zoom: number
  panX: number
  panY: number
  mousePosition: { x: number; y: number }

  setZoom: (zoom: number) => void
  setPan: (x: number, y: number) => void
  setMousePosition: (x: number, y: number) => void
  zoomIn: () => void
  zoomOut: () => void
  resetView: () => void
}

export const useCanvasStore = create<CanvasState>((set) => ({
  zoom: 1,
  panX: 0,
  panY: 0,
  mousePosition: { x: 0, y: 0 },

  setZoom: (zoom) => set({ zoom: Math.max(0.1, Math.min(5, zoom)) }),
  setPan: (x, y) => set({ panX: x, panY: y }),
  setMousePosition: (x, y) => set({ mousePosition: { x, y } }),
  zoomIn: () => set((state) => ({ zoom: Math.min(5, state.zoom + 0.25) })),
  zoomOut: () => set((state) => ({ zoom: Math.max(0.1, state.zoom - 0.25) })),
  resetView: () => set({ zoom: 1, panX: 0, panY: 0 }),
}))
