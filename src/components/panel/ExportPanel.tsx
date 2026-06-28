import { useState } from 'react'
import { X, Download, Image, FileText, FileCode } from 'lucide-react'
import { useProjectStore } from '@/store/projectStore'
import { presetPalettes } from '@/engine/palette'
import { pixelateImage } from '@/engine/pixelate'
import { quantizeWithDithering } from '@/engine/colorMatch'
import { removeWhiteBackground } from '@/engine/convert'
import { quickTouchup as applyTouchup } from '@/engine/grid'
import { countColors } from '@/engine/statistics'
import { exportToPNG, exportToPDF, exportToSVG } from '@/engine/export'

interface ExportPanelProps {
  onClose: () => void
}

export function ExportPanel({ onClose }: ExportPanelProps) {
  const originalImage = useProjectStore((s) => s.originalImage)
  const beadSize = useProjectStore((s) => s.beadSize)
  const paletteId = useProjectStore((s) => s.paletteId)
  const removeBackground = useProjectStore((s) => s.removeBackground)
  const quickTouchup = useProjectStore((s) => s.quickTouchup)
  const bgTolerance = useProjectStore((s) => s.bgTolerance)

  const [showGrid, setShowGrid] = useState(true)
  const [showNumbers, setShowNumbers] = useState(false)
  const [exportFormat, setExportFormat] = useState<'png' | 'pdf' | 'svg'>('png')
  const [isExporting, setIsExporting] = useState(false)

  const palette = presetPalettes.find((p) => p.id === paletteId) || presetPalettes[0]

  const processedImage = originalImage ? (() => {
    let processed = originalImage
    if (removeBackground) {
      processed = removeWhiteBackground(processed, { tolerance: bgTolerance })
    }
    let pixelated = pixelateImage(processed, { pixelSize: beadSize })
    if (quickTouchup) {
      pixelated = applyTouchup(pixelated, palette.colors)
    }
    return quantizeWithDithering(pixelated, palette).imageData
  })() : null

  const statistics = originalImage && processedImage ? countColors(processedImage, palette) : null

  const handleExport = async () => {
    if (!processedImage || !originalImage) return

    setIsExporting(true)
    try {
      if (exportFormat === 'png') {
        // Single board for now
        const boards = [{ id: 'board-0', index: 0, x: 0, y: 0, width: processedImage.width, height: processedImage.height }]
        exportToPNG(processedImage, boards, palette.colors, {
          beadSize: 10,
          showGrid,
          showNumbers,
        })
      } else if (exportFormat === 'pdf') {
        const boards = [{ id: 'board-0', index: 0, x: 0, y: 0, width: processedImage.width, height: processedImage.height }]
        await exportToPDF(processedImage, boards, palette.colors, statistics?.colors || [], {
          beadSize: 10,
          showGrid,
          showNumbers,
          includeLegend: true,
          includeMaterialList: true,
        })
      } else if (exportFormat === 'svg') {
        const boards = [{ id: 'board-0', index: 0, x: 0, y: 0, width: processedImage.width, height: processedImage.height }]
        exportToSVG(processedImage, boards, palette.colors, {
          beadSize: 10,
          showGrid,
          showNumbers,
        })
      }
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[var(--color-background)] rounded-[var(--radius-lg)] shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
          <h2 className="text-lg font-semibold">导出图案</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[var(--color-background-muted)] rounded-[var(--radius-sm)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Format Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block">导出格式</label>
            <div className="grid grid-cols-3 gap-2">
              <FormatButton
                icon={<Image className="w-5 h-5" />}
                label="PNG"
                description="高清位图"
                selected={exportFormat === 'png'}
                onClick={() => setExportFormat('png')}
              />
              <FormatButton
                icon={<FileText className="w-5 h-5" />}
                label="PDF"
                description="含材料清单"
                selected={exportFormat === 'pdf'}
                onClick={() => setExportFormat('pdf')}
              />
              <FormatButton
                icon={<FileCode className="w-5 h-5" />}
                label="SVG"
                description="矢量图"
                selected={exportFormat === 'svg'}
                onClick={() => setExportFormat('svg')}
              />
            </div>
          </div>

          {/* Options */}
          <div className="space-y-2">
            <label className="text-sm font-medium block">显示选项</label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showGrid}
                onChange={(e) => setShowGrid(e.target.checked)}
                className="w-4 h-4 rounded border-[var(--color-border)]"
              />
              <span className="text-sm">显示网格线</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showNumbers}
                onChange={(e) => setShowNumbers(e.target.checked)}
                className="w-4 h-4 rounded border-[var(--color-border)]"
              />
              <span className="text-sm">显示色号</span>
            </label>
          </div>

          {/* Stats */}
          {statistics && (
            <div className="bg-[var(--color-background-muted)] rounded-[var(--radius-md)] p-3 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-muted)]">图案尺寸</span>
                <span>{processedImage?.width} × {processedImage?.height} 颗</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-muted)]">珠子总数</span>
                <span>{(statistics.totalPixels || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-muted)]">颜色数量</span>
                <span>{statistics.colorCount}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-2 p-4 border-t border-[var(--color-border)]">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-sm border border-[var(--color-border)] rounded-[var(--radius-md)] hover:bg-[var(--color-background-muted)]"
          >
            取消
          </button>
          <button
            onClick={handleExport}
            disabled={!processedImage || isExporting}
            className="flex-1 px-4 py-2 text-sm bg-[var(--color-primary)] text-white rounded-[var(--radius-md)] hover:bg-[var(--color-primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            {isExporting ? '导出中...' : '导出'}
          </button>
        </div>
      </div>
    </div>
  )
}

function FormatButton({
  icon,
  label,
  description,
  selected,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  description: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`
        p-3 rounded-[var(--radius-md)] border text-left transition-all
        ${selected
          ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
          : 'border-[var(--color-border)] hover:border-[var(--color-border-strong)]'
        }
      `}
    >
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="font-medium text-sm">{label}</span>
      </div>
      <p className="text-xs text-[var(--color-text-muted)]">{description}</p>
    </button>
  )
}
