import { Palette, Settings } from 'lucide-react'
import { ImageUploader } from '@/features/image-upload'
import { useProjectStore } from '@/store/projectStore'

export function Sidebar() {
  const { setOriginalImage, setTargetSize } = useProjectStore()

  const handleImageLoad = (imageData: ImageData) => {
    setOriginalImage(imageData)
    // Set target size to match original image dimensions
    setTargetSize(imageData.width, imageData.height)
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
        <ImageSettings />
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

function ImageSettings() {
  const { beadSize, targetWidth, targetHeight } = useProjectStore()

  return (
    <div className="space-y-3">
      <SettingItem label="目标宽度" value={targetWidth > 0 ? `${targetWidth} px` : '—'} />
      <SettingItem label="目标高度" value={targetHeight > 0 ? `${targetHeight} px` : '—'} />
      <SettingItem label="Bead 尺寸" value={`${beadSize}px`} />
    </div>
  )
}

interface SettingItemProps {
  label: string
  value: string
}

function SettingItem({ label, value }: SettingItemProps) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-[var(--color-text-secondary)]">{label}</span>
      <span className="text-sm text-[var(--color-text-primary)]">{value}</span>
    </div>
  )
}
