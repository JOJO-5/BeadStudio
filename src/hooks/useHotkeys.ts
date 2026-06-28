import { useEffect } from 'react'

export interface HotkeyConfig {
  ctrl?: boolean
  shift?: boolean
  alt?: boolean
  key: string
  action: () => void
  description?: string
}

export function useHotkeys(hotkeys: HotkeyConfig[], enabled = true) {
  useEffect(() => {
    if (!enabled) return

    const handler = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return
      }

      for (const hotkey of hotkeys) {
        const ctrlMatch = hotkey.ctrl ? (e.ctrlKey || e.metaKey) : !(e.ctrlKey || e.metaKey)
        const shiftMatch = hotkey.shift ? e.shiftKey : !e.shiftKey
        const altMatch = hotkey.alt ? e.altKey : !e.altKey
        const keyMatch = e.key.toLowerCase() === hotkey.key.toLowerCase()

        if (ctrlMatch && shiftMatch && altMatch && keyMatch) {
          e.preventDefault()
          hotkey.action()
          return
        }
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [hotkeys, enabled])
}

// Common hotkey helpers
export const commonHotkeys = {
  undo: (action: () => void): HotkeyConfig => ({
    ctrl: true,
    key: 'z',
    action,
    description: '撤销',
  }),
  redo: (action: () => void): HotkeyConfig => ({
    ctrl: true,
    shift: true,
    key: 'z',
    action,
    description: '重做',
  }),
  save: (action: () => void): HotkeyConfig => ({
    ctrl: true,
    key: 's',
    action,
    description: '保存',
  }),
  delete: (action: () => void): HotkeyConfig => ({
    key: 'Delete',
    action,
    description: '删除',
  }),
  zoomIn: (action: () => void): HotkeyConfig => ({
    ctrl: true,
    key: '=',
    action,
    description: '放大',
  }),
  zoomOut: (action: () => void): HotkeyConfig => ({
    ctrl: true,
    key: '-',
    action,
    description: '缩小',
  }),
}