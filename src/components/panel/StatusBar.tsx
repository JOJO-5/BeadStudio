interface StatusBarProps {
  zoom: number
  mousePosition: { x: number; y: number }
  dimensions: { width: number; height: number }
}

export function StatusBar({ zoom, mousePosition, dimensions }: StatusBarProps) {
  return (
    <div className="flex items-center justify-between h-full px-4 text-xs text-[var(--color-text-muted)]">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <span>缩放: {Math.round(zoom * 100)}%</span>
        <span className="text-[var(--color-border)]">|</span>
        <span>
          尺寸: {dimensions.width > 0 ? `${dimensions.width} × ${dimensions.height}` : '—'}
        </span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <span>
          鼠标: {mousePosition.x > 0 ? `${mousePosition.x}, ${mousePosition.y}` : '—, —'}
        </span>
        <span className="text-[var(--color-border)]">|</span>
        <span>BeadStudio v0.1.0</span>
      </div>
    </div>
  )
}
