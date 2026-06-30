import { Undo2, Redo2, ZoomIn, ZoomOut, Download, Sun, Moon } from 'lucide-react'
import { useSettingsStore } from '@/store/settingsStore'

interface ToolbarProps {
  zoom: number
  onZoomIn: () => void
  onZoomOut: () => void
  onUndo: () => void
  onRedo: () => void
  onExport: () => void
  canUndo: boolean
  canRedo: boolean
}

export function Toolbar({
  zoom,
  onZoomIn,
  onZoomOut,
  onUndo,
  onRedo,
  onExport,
  canUndo,
  canRedo,
}: ToolbarProps) {
  const { theme, setTheme } = useSettingsStore()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="flex items-center h-full px-2 md:px-4 gap-1 md:gap-2">
      {/* Logo - hidden on mobile */}
      <div className="hidden md:flex items-center gap-2 mr-2">
        <span className="font-semibold text-[var(--color-text-primary)]">BeadStudio</span>
      </div>

      {/* Undo/Redo */}
      <div className="flex items-center gap-1">
        <ToolbarButton
          icon={<Undo2 className="w-4 h-4" />}
          onClick={onUndo}
          disabled={!canUndo}
          title="撤销 (Ctrl+Z)"
        />
        <ToolbarButton
          icon={<Redo2 className="w-4 h-4" />}
          onClick={onRedo}
          disabled={!canRedo}
          title="重做 (Ctrl+Shift+Z)"
        />
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-[var(--color-border)]" />

      {/* Zoom controls */}
      <div className="flex items-center gap-1">
        <ToolbarButton
          icon={<ZoomOut className="w-4 h-4" />}
          onClick={onZoomOut}
          title="缩小"
        />
        <span className="w-12 md:w-14 text-center text-xs md:text-sm text-[var(--color-text-secondary)]">
          {Math.round(zoom * 100)}%
        </span>
        <ToolbarButton
          icon={<ZoomIn className="w-4 h-4" />}
          onClick={onZoomIn}
          title="放大"
        />
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Theme toggle */}
      <ToolbarButton
        icon={theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        onClick={toggleTheme}
        title={theme === 'dark' ? '切换浅色模式' : '切换深色模式'}
      />

      {/* Export - always visible */}
      <ToolbarButton
        icon={<Download className="w-4 h-4" />}
        onClick={onExport}
        title="导出"
      />
    </div>
  )
}

interface ToolbarButtonProps {
  icon: React.ReactNode
  onClick: () => void
  disabled?: boolean
  title: string
  active?: boolean
}

function ToolbarButton({ icon, onClick, disabled, title, active }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        p-2 rounded-[var(--radius-md)]
        transition-all duration-[var(--duration-fast)]
        ${active
          ? 'bg-[var(--color-primary)] text-white'
          : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-background-muted)]'
        }
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {icon}
    </button>
  )
}
