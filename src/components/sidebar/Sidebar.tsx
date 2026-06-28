import { useState, useCallback } from 'react'
import { Palette, Settings } from 'lucide-react'
import { ImageUploader } from '@/features/image-upload'
import { useProjectStore } from '@/store/projectStore'
import { resizeImage } from '@/engine/resize'

export function Sidebar() {
  const { setOriginalImage, setTargetSize, targetWidth, targetHeight } = useProjectStore()
  const [isResizing, setIsResizing] = useState(false)

  const handleImageLoad = useCallback(async (imageData: ImageData) => {
    setOriginalImage(imageData)
    setTargetSize(imageData.width, imageData.height)
  }, [setOriginalImage, setTargetSize])

  const handleResize = useCallback(async () => {
    const { originalImage } = useProjectStore.getState()
    if (!originalImage || originalImage.width === 0) return

    setIsResizing(true)
    try {
      const resized = await resizeImage(originalImage, {
        width: targetWidth,
        height: targetHeight,
      })
      setOriginalImage(resized)
    } catch (err) {
      console.error('Resize failed:', err)
    } finally {
      setIsResizing(false)
    }
  }, [targetWidth, targetHeight, setOriginalImage])

  const handleWidthChange = (value: number) => {
    setTargetSize(value, targetHeight)
  }

  const handleHeightChange = (value: number) => {
    setTargetSize(targetWidth, value)
  }

  return (
    <div className="p-4 space-y-6">
      {/* Upload Section */}
      <SidebarSection title="上传" icon={<Settings className="w-4 h-4" />}>
        <ImageUploader onImageLoad={handleImageLoad} />
      </SidebarSection>

      {/* Palette Section */}
      <SidebarSection title="调色板" icon={<Palette className="w-4 h-4" />}>
        <div className="space-y-2">
          <PaletteSelector
            label="Perler 经典"
            colors={['#FFFFFF', '#000000', '#FF0000', '#00FF00', '#0000FF']}
          />
          <PaletteSelector
            label="Hama Midi"
            colors={['#FFFFFF', '#000000', '#FF0000', '#FFFF00', '#00FF00']}
          />
          <PaletteSelector
            label="Artkal S"
            colors={['#FFFFFF', '#000000', '#FF0000', '#FF00FF', '#00FFFF']}
          />
        </div>
      </SidebarSection>

      {/* Settings Section */}
      <SidebarSection title="图片设置" icon={<Settings className="w-4 h-4" />}>
        <ImageSettings
          targetWidth={targetWidth}
          targetHeight={targetHeight}
          onWidthChange={handleWidthChange}
          onHeightChange={handleHeightChange}
          onResize={handleResize}
          isResizing={isResizing}
        />
      </SidebarSection>
    </div>
  )
}

interface SidebarSectionProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}

function SidebarSection({ title, icon, children }: SidebarSectionProps) {
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

interface PaletteSelectorProps {
  label: string
  colors: string[]
}

function PaletteSelector({ label, colors }: PaletteSelectorProps) {
  return (
    <div className="bg-[var(--color-background)] rounded-[var(--radius-md)] p-2 cursor-pointer hover:ring-2 ring-[var(--color-primary)] transition-all">
      <p className="text-xs text-[var(--color-text-secondary)] mb-2">{label}</p>
      <div className="flex gap-1">
        {colors.map((color, i) => (
          <div
            key={i}
            className="w-5 h-5 rounded-full border border-[var(--color-border)]"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  )
}

interface ImageSettingsProps {
  targetWidth: number
  targetHeight: number
  onWidthChange: (value: number) => void
  onHeightChange: (value: number) => void
  onResize: () => void
  isResizing: boolean
}

function ImageSettings({
  targetWidth,
  targetHeight,
  onWidthChange,
  onHeightChange,
  onResize,
  isResizing,
}: ImageSettingsProps) {
  const { beadSize } = useProjectStore()

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <label className="text-sm text-[var(--color-text-secondary)] w-16">宽度</label>
        <input
          type="number"
          min={1}
          max={1024}
          value={targetWidth || ''}
          onChange={(e) => onWidthChange(Number(e.target.value))}
          className="flex-1 px-2 py-1 text-sm bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-sm)]"
        />
        <span className="text-xs text-[var(--color-text-muted)]">px</span>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm text-[var(--color-text-secondary)] w-16">高度</label>
        <input
          type="number"
          min={1}
          max={1024}
          value={targetHeight || ''}
          onChange={(e) => onHeightChange(Number(e.target.value))}
          className="flex-1 px-2 py-1 text-sm bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-sm)]"
        />
        <span className="text-xs text-[var(--color-text-muted)]">px</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-[var(--color-text-secondary)]">Bead 尺寸</span>
        <span className="text-sm text-[var(--color-text-primary)]">{beadSize}px</span>
      </div>
      <button
        type="button"
        onClick={onResize}
        disabled={isResizing || targetWidth <= 0 || targetHeight <= 0}
        className="w-full px-3 py-2 text-sm bg-[var(--color-primary)] text-white rounded-[var(--radius-md)] hover:bg-[var(--color-primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isResizing ? '调整中...' : '调整图片尺寸'}
      </button>
    </div>
  )
}
