import { Pencil, Eraser, Pipette, Grid3X3 } from 'lucide-react'
import { useCanvasStore } from '@/store/canvasStore'
import { useProjectStore } from '@/store/projectStore'
import { SegmentedControl } from './SegmentedControl'
import type { BeadType } from '@/engine/render'

type BeadTypeOption = { value: BeadType; label: string }

const BEAD_TYPE_OPTIONS: BeadTypeOption[] = [
  { value: 'square', label: '方珠' },
  { value: 'round-solid', label: '圆实' },
  { value: 'round-hollow', label: '圆空' },
]

type GridSizeOption = { value: number; label: string }

const GRID_SIZE_OPTIONS: GridSizeOption[] = [
  { value: 8, label: '5mm' },
  { value: 5, label: '2.6mm' },
]

type ToolOption = { value: 'brush' | 'eraser' | 'picker'; icon: React.ReactNode; label: string }

const TOOL_OPTIONS: ToolOption[] = [
  { value: 'brush', icon: <Pencil className="w-4 h-4" />, label: '画笔' },
  { value: 'eraser', icon: <Eraser className="w-4 h-4" />, label: '橡皮' },
  { value: 'picker', icon: <Pipette className="w-4 h-4" />, label: '取色' },
]

export function EditToolbar() {
  const { beadType, setBeadType, showGrid, toggleGrid, activeTool, setActiveTool } = useCanvasStore()
  const { beadSize, setBeadSize } = useProjectStore()

  return (
    <div className="flex items-center gap-4 px-4 py-2 bg-[var(--color-background)] border-b border-[var(--color-border)]">
      {/* Bead Type Selector */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-[var(--color-text-muted)]">珠子</span>
        <SegmentedControl
          options={BEAD_TYPE_OPTIONS}
          value={beadType}
          onChange={(value) => setBeadType(value)}
        />
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-[var(--color-border)]" />

      {/* Grid Size Selector */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-[var(--color-text-muted)]">尺寸</span>
        <SegmentedControl
          options={GRID_SIZE_OPTIONS}
          value={beadSize}
          onChange={(value) => setBeadSize(value)}
        />
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-[var(--color-border)]" />

      {/* Edit Tools */}
      <div className="flex items-center gap-1">
        {TOOL_OPTIONS.map((tool) => (
          <ToolButton
            key={tool.value}
            icon={tool.icon}
            label={tool.label}
            isActive={activeTool === tool.value}
            onClick={() => setActiveTool(tool.value)}
          />
        ))}
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-[var(--color-border)]" />

      {/* Grid Toggle */}
      <button
        type="button"
        onClick={toggleGrid}
        className={`
          flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-md)]
          text-sm transition-all duration-[var(--duration-fast)]
          ${showGrid
            ? 'bg-[var(--color-primary)] text-white'
            : 'bg-[var(--color-background-muted)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]'
          }
        `}
        title={showGrid ? '隐藏网格' : '显示网格'}
      >
        <Grid3X3 className="w-4 h-4" />
        <span>网格</span>
      </button>
    </div>
  )
}

interface ToolButtonProps {
  icon: React.ReactNode
  label: string
  isActive: boolean
  onClick: () => void
}

function ToolButton({ icon, label, isActive, onClick }: ToolButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className={`
        p-2 rounded-[var(--radius-md)] transition-all duration-[var(--duration-fast)]
        ${isActive
          ? 'bg-[var(--color-primary)] text-white'
          : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-background-muted)]'
        }
      `}
    >
      {icon}
    </button>
  )
}
