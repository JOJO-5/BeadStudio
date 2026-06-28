import { Upload, Palette, Settings } from 'lucide-react'

interface SidebarProps {
  onUploadClick: () => void
}

export function Sidebar({ onUploadClick }: SidebarProps) {
  return (
    <div className="p-4 space-y-6">
      {/* Upload Section */}
      <SidebarSection title="上传" icon={<Upload className="w-4 h-4" />}>
        <div
          className="border-2 border-dashed border-[var(--color-border)] rounded-[var(--radius-lg)] p-6 text-center cursor-pointer hover:border-[var(--color-primary)] hover:bg-[var(--color-background)] transition-colors"
          onClick={onUploadClick}
        >
          <Upload className="w-8 h-8 mx-auto mb-2 text-[var(--color-text-muted)]" />
          <p className="text-sm text-[var(--color-text-secondary)]">
            点击或拖拽上传图片
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            支持 PNG, JPG, WEBP
          </p>
        </div>
      </SidebarSection>

      {/* Palette Section */}
      <SidebarSection title="调色板" icon={<Palette className="w-4 h-4" />}>
        <div className="space-y-2">
          <PaletteSelector label="Perler 经典" colors={['#FFFFFF', '#000000', '#FF0000', '#00FF00', '#0000FF']} />
          <PaletteSelector label="Hama Midi" colors={['#FFFFFF', '#000000', '#FF0000', '#FFFF00', '#00FF00']} />
          <PaletteSelector label="Artkal S" colors={['#FFFFFF', '#000000', '#FF0000', '#FF00FF', '#00FFFF']} />
        </div>
      </SidebarSection>

      {/* Settings Section */}
      <SidebarSection title="图片设置" icon={<Settings className="w-4 h-4" />}>
        <div className="space-y-3">
          <SettingItem label="目标宽度" value="64 bead" />
          <SettingItem label="目标高度" value="64 bead" />
          <SettingItem label="Bead 尺寸" value="8px" />
          <SettingItem label="缩放算法" value="Lanczos" />
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
