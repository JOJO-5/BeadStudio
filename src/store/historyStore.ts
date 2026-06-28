import { create } from 'zustand'

interface HistoryState {
  undoStack: string[]
  redoStack: string[]
  maxSize: number
}

interface HistoryActions {
  push: (state: string) => void
  undo: () => string | null
  redo: () => string | null
  canUndo: () => boolean
  canRedo: () => boolean
  clear: () => void
}

export const useHistoryStore = create<HistoryState & HistoryActions>((set, get) => ({
  undoStack: [],
  redoStack: [],
  maxSize: 50,

  push: (state) => {
    const { undoStack, maxSize } = get()
    const newStack = [...undoStack, state]
    // Keep only the last maxSize items
    if (newStack.length > maxSize) {
      newStack.shift()
    }
    set({ undoStack: newStack, redoStack: [] })
  },

  undo: () => {
    const { undoStack, redoStack } = get()
    if (undoStack.length === 0) return null

    const newUndoStack = [...undoStack]
    const state = newUndoStack.pop()!
    set({
      undoStack: newUndoStack,
      redoStack: [...redoStack, state],
    })
    // Return the previous state (now at top of undo stack)
    return newUndoStack[newUndoStack.length - 1] || null
  },

  redo: () => {
    const { undoStack, redoStack } = get()
    if (redoStack.length === 0) return null

    const newRedoStack = [...redoStack]
    const state = newRedoStack.pop()!
    set({
      undoStack: [...undoStack, state],
      redoStack: newRedoStack,
    })
    return state
  },

  canUndo: () => get().undoStack.length > 1,
  canRedo: () => get().redoStack.length > 0,
  clear: () => set({ undoStack: [], redoStack: [] }),
}))
