import { BarChart3, Info } from 'lucide-react'

interface InspectorProps {
  beadCount: number
  colorCount: number
  boardCount: number
  projectName: string
  dimensions: { width: number; height: number }
}

export function Inspector({
  beadCount,
  colorCount,
  boardCount,
  projectName,
  dimensions,
}: InspectorProps) {
  return (
    <div className="p-4 space-y-6">
      {/* Statistics */}
      <InspectorSection title="统计" icon={<BarChart3 className="w-4 h-4" />}>
        <div className="space-y-3">
          <StatItem label="Bead 总数" value={beadCount.toLocaleString()} />
          <StatItem label="颜色数量" value={colorCount.toString()} />
          <StatItem label="拼板数量" value={boardCount.toString()} />
        </div>

        {/* Placeholder color bars */}
        <div className="mt-4 space-y-2">
          <p className="text-xs text-[var(--color-text-muted)]">颜色分布</p>
          {[
            { color: '#EF4444', name: '红色', count: 245 },
            { color: '#3B82F6', name: '蓝色', count: 189 },
            { color: '#22C55E', name: '绿色', count: 156 },
            { color: '#EAB308', name: '黄色', count: 98 },
          ].map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-[var(--color-text-secondary)] flex-1 truncate">
                {item.name}
              </span>
              <span className="text-xs text-[var(--color-text-muted)]">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </InspectorSection>

      {/* Project Info */}
      <InspectorSection title="项目信息" icon={<Info className="w-4 h-4" />}>
        <div className="space-y-3">
          <InfoItem label="名称" value={projectName} />
          <InfoItem label="尺寸" value={`${dimensions.width} × ${dimensions.height}`} />
          <InfoItem label="缩放" value="100%" />
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
