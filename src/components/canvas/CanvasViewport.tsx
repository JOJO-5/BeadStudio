import { useRef, useEffect, useState } from 'react'
import type { WheelEvent, MouseEvent } from 'react'

interface CanvasViewportProps {
  zoom: number
  onZoomChange: (zoom: number) => void
}

export function CanvasViewport({ zoom, onZoomChange }: CanvasViewportProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })

  // Draw checkerboard background and grid
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Clear
    ctx.fillStyle = '#F1F5F9'
    ctx.fillRect(0, 0, rect.width, rect.height)

    // Draw checkerboard pattern (transparency)
    const checkSize = 8
    ctx.fillStyle = '#E2E8F0'
    for (let y = 0; y < rect.height; y += checkSize * 2) {
      for (let x = 0; x < rect.width; x += checkSize * 2) {
        ctx.fillRect(x, y, checkSize, checkSize)
        ctx.fillRect(x + checkSize, y + checkSize, checkSize, checkSize)
      }
    }

    // Draw grid
    const gridSize = 20 * zoom
    ctx.strokeStyle = '#E2E8F0'
    ctx.lineWidth = 1

    // Vertical lines
    for (let x = 0; x < rect.width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, rect.height)
      ctx.stroke()
    }

    // Horizontal lines
    for (let y = 0; y < rect.height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(rect.width, y)
      ctx.stroke()
    }

    // Draw center cross (placeholder for where image would go)
    const centerX = rect.width / 2 + pan.x
    const centerY = rect.height / 2 + pan.y
    const placeholderSize = 100 * zoom

    ctx.strokeStyle = '#CBD5E1'
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])
    ctx.strokeRect(
      centerX - placeholderSize / 2,
      centerY - placeholderSize / 2,
      placeholderSize,
      placeholderSize
    )
    ctx.setLineDash([])

    // Center indicator
    ctx.fillStyle = '#94A3B8'
    ctx.font = '12px Inter, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('上传图片开始设计', centerX, centerY)
  }, [zoom, pan])

  // Handle zoom
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    const newZoom = Math.max(0.1, Math.min(5, zoom + delta))
    onZoomChange(newZoom)
  }

  // Handle pan
  const handleMouseDown = (e: MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.altKey)) {
      setIsPanning(true)
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isPanning) {
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsPanning(false)
  }

  return (
    <div
      className="w-full h-full overflow-hidden cursor-crosshair"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ cursor: isPanning ? 'grabbing' : 'default' }}
      />
    </div>
  )
}
