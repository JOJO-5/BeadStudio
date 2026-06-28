import { useState, useCallback } from 'react'
import { Settings, PaletteIcon, Eraser, Sparkles } from 'lucide-react'
import { ImageUploader } from '@/features/image-upload'
import { useProjectStore } from '@/store/projectStore'
import { resizeImage } from '@/engine/resize'
import { presetPalettes, type Palette } from '@/engine/palette'

// 最大尺寸限制，超过则自动缩放
const MAX_IMAGE_SIZE = 400

export function Sidebar() {
  const {
    setOriginalImage,
    setTargetSize,
    setPaletteId,
    targetWidth,
    targetHeight,
    paletteId,
    removeBackground,
    setRemoveBackground,
    quickTouchup,
    setQuickTouchup,
    bgTolerance,
    setBgTolerance,
  } = useProjectStore()
  const [isResizing, setIsResizing] = useState(false)

  const handleImageLoad = useCallback(async (imageData: ImageData) => {
    // 如果图片太大，自动缩放
    if (imageData.width > MAX_IMAGE_SIZE || imageData.height > MAX_IMAGE_SIZE) {
      const scale = Math.min(
        MAX_IMAGE_SIZE / imageData.width,
        MAX_IMAGE_SIZE / imageData.height
      )
      const newWidth = Math.round(imageData.width * scale)
      const newHeight = Math.round(imageData.height * scale)

      const resized = await resizeImage(imageData, { width: newWidth, height: newHeight })
      setOriginalImage(resized)
      setTargetSize(newWidth, newHeight)
    } else {
      setOriginalImage(imageData)
      setTargetSize(imageData.width, imageData.height)
    }
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

  const handlePaletteSelect = (id: string) => {
    setPaletteId(id)
  }

  return (
    <div className="p-4 space-y-6">
      {/* Upload Section */}
      <SidebarSection title="上传" icon={<Settings className="w-4 h-4" />}>
        <ImageUploader onImageLoad={handleImageLoad} />
      </SidebarSection>

      {/* Palette Section */}
      <SidebarSection title="调色板" icon={<PaletteIcon className="w-4 h-4" />}>
        <div className="space-y-2">
          {presetPalettes.map((palette) => (
            <PaletteSelector
              key={palette.id}
              palette={palette}
              isSelected={palette.id === paletteId}
              onSelect={() => handlePaletteSelect(palette.id)}
            />
          ))}
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

      {/* Background Removal Section */}
      <SidebarSection title="去白底" icon={<Eraser className="w-4 h-4" />}>
        <BackgroundSettings
          enabled={removeBackground}
          onToggle={() => setRemoveBackground(!removeBackground)}
          tolerance={bgTolerance}
          onToleranceChange={setBgTolerance}
        />
      </SidebarSection>

      {/* Quick Touchup Section */}
      <SidebarSection title="修豆快" icon={<Sparkles className="w-4 h-4" />}>
        <TouchupSettings
          enabled={quickTouchup}
          onToggle={() => setQuickTouchup(!quickTouchup)}
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
  palette: Palette
  isSelected: boolean
  onSelect: () => void
}

function PaletteSelector({ palette, isSelected, onSelect }: PaletteSelectorProps) {
  const displayColors = palette.colors.slice(0, 8)

  return (
    <div
      className={`
        bg-[var(--color-background)] rounded-[var(--radius-md)] p-2 cursor-pointer transition-all
        ${isSelected ? 'ring-2 ring-[var(--color-primary)]' : 'hover:ring-2 hover:ring-[var(--color-border-strong)]'}
      `}
      onClick={onSelect}
    >
      <p className="text-xs text-[var(--color-text-secondary)] mb-2">{palette.nameZh}</p>
      <div className="flex gap-1 flex-wrap">
        {displayColors.map((color) => (
          <div
            key={color.code}
            className="w-5 h-5 rounded-full border border-[var(--color-border)]"
            style={{ backgroundColor: color.hex }}
            title={`${color.nameZh} (${color.code})`}
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

interface BackgroundSettingsProps {
  enabled: boolean
  onToggle: () => void
  tolerance: number
  onToleranceChange: (value: number) => void
}

function BackgroundSettings({ enabled, onToggle, tolerance, onToleranceChange }: BackgroundSettingsProps) {
  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={enabled}
          onChange={onToggle}
          className="w-4 h-4 rounded border-[var(--color-border)]"
        />
        <span className="text-sm text-[var(--color-text-secondary)]">移除白底</span>
      </label>
      {enabled && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--color-text-muted)]">容差</span>
            <span className="text-xs text-[var(--color-text-primary)]">{tolerance}</span>
          </div>
          <input
            type="range"
            min={10}
            max={100}
            value={tolerance}
            onChange={(e) => onToleranceChange(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-xs text-[var(--color-text-muted)]">数值越大，越多背景色会被移除</p>
        </div>
      )}
    </div>
  )
}

interface TouchupSettingsProps {
  enabled: boolean
  onToggle: () => void
}

function TouchupSettings({ enabled, onToggle }: TouchupSettingsProps) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={enabled}
          onChange={onToggle}
          className="w-4 h-4 rounded border-[var(--color-border)]"
        />
        <span className="text-sm text-[var(--color-text-secondary)]">自动修豆</span>
      </label>
      <p className="text-xs text-[var(--color-text-muted)]">填补空洞、平滑边缘</p>
    </div>
  )
}
