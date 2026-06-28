import { useCallback } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import { Toolbar } from '@/components/toolbar/Toolbar'
import { EditToolbar } from '@/components/toolbar/EditToolbar'
import { Sidebar } from '@/components/sidebar/Sidebar'
import { CanvasViewport } from '@/components/canvas/CanvasViewport'
import { Inspector } from '@/components/panel/Inspector'
import { StatusBar } from '@/components/panel/StatusBar'
import { useCanvasStore } from '@/store/canvasStore'
import { useHistoryStore } from '@/store/historyStore'
import { useProjectStore } from '@/store/projectStore'
import { useHotkeys, commonHotkeys } from '@/hooks/useHotkeys'

function App() {
  const { zoom, zoomIn, zoomOut, setZoom } = useCanvasStore()
  const { canUndo, canRedo } = useHistoryStore()
  const projectName = useProjectStore((s) => s.name)

  const handleUndo = useCallback(() => {
    const prevState = useHistoryStore.getState().undo()
    if (prevState !== null) {
      // State restored from history store
    }
  }, [])

  const handleRedo = useCallback(() => {
    const nextState = useHistoryStore.getState().redo()
    if (nextState !== null) {
      // State restored from history store
    }
  }, [])

  const handleSave = useCallback(() => {
    // TODO: Implement project save
    console.log('Save shortcut triggered')
  }, [])

  // Register global hotkeys
  useHotkeys([
    commonHotkeys.undo(handleUndo),
    commonHotkeys.redo(handleRedo),
    commonHotkeys.save(handleSave),
  ])

  return (
    <AppShell
      toolbar={
        <Toolbar
          zoom={zoom}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onExport={() => {}}
          canUndo={canUndo()}
          canRedo={canRedo()}
        />
      }
      editToolbar={<EditToolbar />}
      sidebar={<Sidebar />}
      canvas={<CanvasViewport zoom={zoom} onZoomChange={setZoom} />}
      inspector={
        <Inspector projectName={projectName} />
      }
      statusBar={
        <StatusBar
          zoom={zoom}
          mousePosition={{ x: 0, y: 0 }}
          dimensions={{ width: 0, height: 0 }}
        />
      }
    />
  )
}

export default App
