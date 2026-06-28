import { useMemo } from 'react'
import { BarChart3, Info } from 'lucide-react'
import { useProjectStore } from '@/store/projectStore'
import { presetPalettes } from '@/engine/palette'
import { pixelateImage } from '@/engine/pixelate'
import { quantizeWithDithering } from '@/engine/colorMatch'
import { removeWhiteBackground } from '@/engine/convert'
import { quickTouchup as applyTouchup } from '@/engine/grid'
import { countColors } from '@/engine/statistics'

interface InspectorProps {
  projectName: string
}

export function Inspector({ projectName }: InspectorProps) {
  const originalImage = useProjectStore((s) => s.originalImage)
  const beadSize = useProjectStore((s) => s.beadSize)
  const paletteId = useProjectStore((s) => s.paletteId)
  const targetWidth = useProjectStore((s) => s.targetWidth)
  const targetHeight = useProjectStore((s) => s.targetHeight)
  const removeBackground = useProjectStore((s) => s.removeBackground)
  const quickTouchup = useProjectStore((s) => s.quickTouchup)
  const bgTolerance = useProjectStore((s) => s.bgTolerance)

  const palette = presetPalettes.find((p) => p.id === paletteId) || presetPalettes[0]

  const statistics = useMemo(() => {
    if (!originalImage || originalImage.width === 0) {
      return null
    }

    let processed = originalImage

    if (removeBackground) {
      processed = removeWhiteBackground(processed, { tolerance: bgTolerance })
    }

    let pixelated = pixelateImage(processed, { pixelSize: beadSize })

    if (quickTouchup) {
      pixelated = applyTouchup(pixelated, palette.colors)
    }

    const quantized = quantizeWithDithering(pixelated, palette)
    return countColors(quantized.imageData, palette)
  }, [originalImage, beadSize, palette, removeBackground, quickTouchup, bgTolerance])

  const beadCount = statistics?.totalPixels || 0
  const colorCount = statistics?.colorCount || 0

  return (
    <div className="p-4 space-y-6">
      {/* Statistics */}
      <InspectorSection title="统计" icon={<BarChart3 className="w-4 h-4" />}>
        <div className="space-y-3">
          <StatItem label="Bead 总数" value={beadCount > 0 ? beadCount.toLocaleString() : '—'} />
          <StatItem label="颜色数量" value={colorCount > 0 ? colorCount.toString() : '—'} />
        </div>

        {statistics && statistics.colors.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-xs text-[var(--color-text-muted)]">颜色分布</p>
            {statistics.colors.slice(0, 8).map((stat) => (
              <div key={stat.color.code} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0 border border-[var(--color-border)]"
                  style={{ backgroundColor: stat.color.hex }}
                />
                <span className="text-xs text-[var(--color-text-secondary)] flex-1 truncate">
                  {stat.color.nameZh}
                </span>
                <span className="text-xs text-[var(--color-text-muted)]">
                  {stat.count} ({stat.percentage.toFixed(1)}%)
                </span>
              </div>
            ))}
          </div>
        )}
      </InspectorSection>

      {/* Project Info */}
      <InspectorSection title="项目信息" icon={<Info className="w-4 h-4" />}>
        <div className="space-y-3">
          <InfoItem label="名称" value={projectName} />
          <InfoItem label="调色板" value={palette.nameZh} />
          <InfoItem label="尺寸" value={targetWidth > 0 && targetHeight > 0 ? `${targetWidth} × ${targetHeight}` : '—'} />
          <InfoItem label="Bead 尺寸" value={`${beadSize}px`} />
        </div>
      </InspectorSection>
    </div>
  )
}

interface InspectorSectionProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}

function InspectorSection({ title, icon, children }: InspectorSectionProps) {
  return (
    <section>
      <h3 className="flex items-center gap-2 text-xs font-medium text-[var(--color-text-muted)] uppercase mb-3">
        {icon}
        {title}
      </h3>
      {children}
    </section>
  )
}

interface StatItemProps {
  label: string
  value: string
}

function StatItem({ label, value }: StatItemProps) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-[var(--color-text-secondary)]">{label}</span>
      <span className="text-sm font-medium text-[var(--color-text-primary)]">{value}</span>
    </div>
  )
}

interface InfoItemProps {
  label: string
  value: string
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-[var(--color-text-secondary)]">{label}</span>
      <span className="text-sm text-[var(--color-text-primary)]">{value}</span>
    </div>
  )
}
