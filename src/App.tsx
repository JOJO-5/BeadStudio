import { AppShell } from '@/components/layout/AppShell'
import { Toolbar } from '@/components/toolbar/Toolbar'
import { Sidebar } from '@/components/sidebar/Sidebar'
import { CanvasViewport } from '@/components/canvas/CanvasViewport'
import { Inspector } from '@/components/panel/Inspector'
import { StatusBar } from '@/components/panel/StatusBar'
import { useCanvasStore } from '@/store/canvasStore'

function App() {
  const { zoom, zoomIn, zoomOut } = useCanvasStore()

  return (
    <AppShell
      toolbar={
        <Toolbar
          zoom={zoom}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onUndo={() => {}}
          onRedo={() => {}}
          onExport={() => {}}
          canUndo={false}
          canRedo={false}
        />
      }
      sidebar={<Sidebar onUploadClick={() => {}} />}
      canvas={<CanvasViewport zoom={zoom} onZoomChange={() => {}} />}
      inspector={
        <Inspector
          beadCount={0}
          colorCount={0}
          boardCount={0}
          projectName="未命名项目"
          dimensions={{ width: 0, height: 0 }}
        />
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
