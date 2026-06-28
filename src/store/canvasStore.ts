import { create } from 'zustand'
import type { BeadType } from '@/engine/render'

export type EditTool = 'select' | 'brush' | 'eraser' | 'picker'

interface CanvasState {
  // View state
  zoom: number
  panX: number
  panY: number
  mousePosition: { x: number; y: number }

  // Edit tool state
  activeTool: EditTool
  selectedColor: string | null // Hex color code
  brushSize: number // 1-5 pixels
  showGrid: boolean

  // Bead rendering
  beadType: BeadType

  // Actions
  setZoom: (zoom: number) => void
  setPan: (x: number, y: number) => void
  setMousePosition: (x: number, y: number) => void
  zoomIn: () => void
  zoomOut: () => void
  resetView: () => void

  // Tool actions
  setActiveTool: (tool: EditTool) => void
  setSelectedColor: (color: string | null) => void
  setBrushSize: (size: number) => void
  toggleGrid: () => void
  setBeadType: (type: BeadType) => void
}

export const useCanvasStore = create<CanvasState>((set) => ({
  // View state
  zoom: 1,
  panX: 0,
  panY: 0,
  mousePosition: { x: 0, y: 0 },

  // Edit tool state
  activeTool: 'select',
  selectedColor: null,
  brushSize: 1,
  showGrid: true,

  // Bead rendering
  beadType: 'round-hollow',

  // View actions
  setZoom: (zoom) => set({ zoom: Math.max(0.1, Math.min(5, zoom)) }),
  setPan: (x, y) => set({ panX: x, panY: y }),
  setMousePosition: (x, y) => set({ mousePosition: { x, y } }),
  zoomIn: () => set((state) => ({ zoom: Math.min(5, state.zoom + 0.25) })),
  zoomOut: () => set((state) => ({ zoom: Math.max(0.1, state.zoom - 0.25) })),
  resetView: () => set({ zoom: 1, panX: 0, panY: 0 }),

  // Tool actions
  setActiveTool: (tool) => set({ activeTool: tool }),
  setSelectedColor: (color) => set({ selectedColor: color }),
  setBrushSize: (size) => set({ brushSize: Math.max(1, Math.min(5, size)) }),
  toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),
  setBeadType: (type) => set({ beadType: type }),
}))
