import { useRef, useEffect, useState, useMemo, useCallback } from 'react'
import type { WheelEvent, MouseEvent } from 'react'
import { useProjectStore } from '@/store/projectStore'
import { useCanvasStore } from '@/store/canvasStore'
import { pixelateImage } from '@/engine/pixelate'
import { quantizeWithDithering } from '@/engine/colorMatch'
import { removeWhiteBackground } from '@/engine/convert'
import { quickTouchup as applyTouchup } from '@/engine/grid'
import { presetPalettes } from '@/engine/palette'
import { renderBeads, renderBeadGridLines } from '@/engine/render'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'

interface CanvasViewportProps {
  zoom: number
  onZoomChange: (zoom: number) => void
}

export function CanvasViewport({ zoom, onZoomChange }: CanvasViewportProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })

  const originalImage = useProjectStore((s) => s.originalImage)
  const beadSize = useProjectStore((s) => s.beadSize)
  const paletteId = useProjectStore((s) => s.paletteId)
  const removeBackground = useProjectStore((s) => s.removeBackground)
  const quickTouchup = useProjectStore((s) => s.quickTouchup)
  const bgTolerance = useProjectStore((s) => s.bgTolerance)

  const beadType = useCanvasStore((s) => s.beadType)
  const showGrid = useCanvasStore((s) => s.showGrid)

  // Palette lookup (memoized)
  const palette = useMemo(() =>
    presetPalettes.find((p) => p.id === paletteId) || presetPalettes[0],
    [paletteId]
  )

  // Pre-compute quantized image (only when inputs change, not on zoom/pan)
  const quantizedData = useMemo(() => {
    if (!originalImage || originalImage.width === 0) return null

    let processed = originalImage

    // Apply background removal if enabled
    if (removeBackground) {
      processed = removeWhiteBackground(processed, { tolerance: bgTolerance })
    }

    const pixelSize = Math.max(1, beadSize)
    let pixelated = pixelateImage(processed, { pixelSize })

    // Apply quick touchup if enabled
    if (quickTouchup) {
      pixelated = applyTouchup(pixelated, palette.colors)
    }

    const quantized = quantizeWithDithering(pixelated, palette)

    return quantized.imageData
  }, [originalImage, beadSize, palette, removeBackground, quickTouchup, bgTolerance])

  // Debounce zoom/pan for rendering (smooth interaction without re-computing)
  const debouncedZoom = useDebouncedValue(zoom, 50)
  const debouncedPan = useDebouncedValue(pan, 50)

  // Draw canvas content
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

    // Clear with background
    ctx.fillStyle = '#F1F5F9'
    ctx.fillRect(0, 0, rect.width, rect.height)

    // Draw subtle checkerboard background
    const checkSize = 16
    ctx.fillStyle = '#E2E8F0'
    for (let y = 0; y < rect.height; y += checkSize * 2) {
      for (let x = 0; x < rect.width; x += checkSize * 2) {
        ctx.fillRect(x, y, checkSize, checkSize)
        ctx.fillRect(x + checkSize, y + checkSize, checkSize, checkSize)
      }
    }

    // Draw bead pattern if available
    if (quantizedData && quantizedData.width > 0) {
      const pixelSize = Math.max(4, beadSize) // Minimum 4px for visibility

      // Calculate position to center the image
      const imgWidth = quantizedData.width * pixelSize
      const imgHeight = quantizedData.height * pixelSize
      const centerX = (rect.width - imgWidth * debouncedZoom) / 2 + debouncedPan.x
      const centerY = (rect.height - imgHeight * debouncedZoom) / 2 + debouncedPan.y

      // Save context for scaling
      ctx.save()

      // Apply zoom transform
      ctx.translate(centerX, centerY)
      ctx.scale(debouncedZoom, debouncedZoom)

      // Render beads with specified bead type
      renderBeads(ctx, quantizedData, palette.colors, {
        beadSize: pixelSize,
        beadType: beadType,
        gap: 0.15,
        highlightIntensity: 0.4,
        holeSize: 0.4,
      }, 0, 0)

      // Draw grid lines
      if (showGrid && debouncedZoom >= 0.6) {
        renderBeadGridLines(ctx, quantizedData, pixelSize, 0, 0, debouncedZoom)
      }

      ctx.restore()
    } else {
      // Draw placeholder
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

      ctx.fillStyle = '#94A3B8'
      ctx.font = '14px Inter, -apple-system, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('上传图片开始设计', centerX, centerY)
    }
  }, [debouncedZoom, debouncedPan, quantizedData, beadSize, zoom, pan, palette, beadType, showGrid])

  // Handle zoom
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    const newZoom = Math.max(0.1, Math.min(5, zoom + delta))
    onZoomChange(newZoom)
  }, [zoom, onZoomChange])

  // Handle pan
  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.altKey)) {
      setIsPanning(true)
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
    }
  }, [pan])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isPanning) {
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      })
    }
  }, [isPanning, panStart])

  const handleMouseUp = useCallback(() => {
    setIsPanning(false)
  }, [])

  return (
    <div
      className="w-full h-full overflow-hidden"
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
