import { useState, useCallback } from 'react'
import { Settings, PaletteIcon, Eraser, Sparkles, FlipHorizontal, FlipVertical } from 'lucide-react'
import { ImageUploader } from '@/features/image-upload'
import { useProjectStore } from '@/store/projectStore'
import { resizeImage } from '@/engine/resize'
import { presetPalettes, type Palette } from '@/engine/palette'

// 常用拼板尺寸预设（宽度=横向珠子数，高度由图片比例决定）
const PRESET_SIZES = [
  { label: '25颗', width: 25, desc: '小图案' },
  { label: '50颗', width: 50, desc: '中方板' },
  { label: '75颗', width: 75, desc: '较大图案' },
  { label: '100颗', width: 100, desc: '大图案' },
  { label: '150颗', width: 150, desc: '超大图案' },
]

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
  const { flipImageHorizontal, flipImageVertical } = useProjectStore()
  const [isResizing, setIsResizing] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleImageLoad = useCallback(async (imageData: ImageData) => {
    // 宽度固定为用户设置的横向珠子数，高度按图片原比例计算
    const targetW = targetWidth || 50
    const scale = targetW / imageData.width
    const newWidth = targetW
    const newHeight = Math.round(imageData.height * scale)

    const resized = await resizeImage(imageData, { width: newWidth, height: newHeight })
    setOriginalImage(resized)
    setTargetSize(newWidth, newHeight)
    setImageLoaded(true)
  }, [setOriginalImage, setTargetSize, targetWidth])

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

      {/* Flip Section */}
      <SidebarSection title="翻转" icon={<FlipHorizontal className="w-4 h-4" />}>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={flipImageHorizontal}
            disabled={!imageLoaded}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-[var(--color-background-muted)] hover:bg-[var(--color-border)] rounded-[var(--radius-md)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="水平镜像"
          >
            <FlipHorizontal className="w-4 h-4" />
            <span>左右</span>
          </button>
          <button
            type="button"
            onClick={flipImageVertical}
            disabled={!imageLoaded}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-[var(--color-background-muted)] hover:bg-[var(--color-border)] rounded-[var(--radius-md)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="垂直镜像"
          >
            <FlipVertical className="w-4 h-4" />
            <span>上下</span>
          </button>
        </div>
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
  onResize: () => void
  isResizing: boolean
}

function ImageSettings({
  targetWidth,
  targetHeight,
  onWidthChange,
  onResize,
  isResizing,
}: ImageSettingsProps) {
  const { beadSize } = useProjectStore()
  const beadCount = targetWidth * targetHeight

  return (
    <div className="space-y-3">
      {/* 预设宽度选择 */}
      <div>
        <label className="text-xs text-[var(--color-text-muted)] mb-1 block">拼板宽度（横向珠子数）</label>
        <div className="grid grid-cols-3 gap-1">
          {PRESET_SIZES.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => onWidthChange(preset.width)}
              className={`
                px-2 py-1.5 text-xs rounded-[var(--radius-sm)] transition-colors text-left
                ${targetWidth === preset.width
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-background-muted)] hover:bg-[var(--color-border)]'
                }
              `}
            >
              <div className="font-medium">{preset.label}</div>
              <div className={`text-[10px] ${targetWidth === preset.width ? 'text-white/70' : 'text-[var(--color-text-muted)]'}`}>{preset.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm text-[var(--color-text-secondary)] w-16">宽度</label>
        <input
          type="number"
          min={5}
          max={200}
          value={targetWidth || ''}
          onChange={(e) => onWidthChange(Number(e.target.value))}
          className="flex-1 px-2 py-1 text-sm bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-sm)]"
        />
        <span className="text-xs text-[var(--color-text-muted)]">颗</span>
      </div>

      {/* 统计信息（高度由图片比例决定，上传后显示） */}
      {targetHeight > 0 && (
        <div className="bg-[var(--color-background-muted)] rounded-[var(--radius-sm)] p-2 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[var(--color-text-muted)]">尺寸</span>
            <span className="font-medium text-[var(--color-text-primary)]">{targetWidth}×{targetHeight} 颗</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[var(--color-text-muted)]">珠子总数</span>
            <span className="font-medium text-[var(--color-text-primary)]">{beadCount.toLocaleString()} 颗</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[var(--color-text-muted)]">成品尺寸（约）</span>
            <span className="text-[var(--color-text-secondary)]">{Math.round(targetWidth * beadSize / 10)}×{Math.round(targetHeight * beadSize / 10)} cm</span>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={onResize}
        disabled={isResizing || targetWidth <= 0}
        className="w-full px-3 py-2 text-sm bg-[var(--color-primary)] text-white rounded-[var(--radius-md)] hover:bg-[var(--color-primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isResizing ? '调整中...' : '应用尺寸'}
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
