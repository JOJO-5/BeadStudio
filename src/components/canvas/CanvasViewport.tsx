import { useRef, useEffect, useState, useMemo, useCallback } from 'react'
import type { WheelEvent, MouseEvent } from 'react'
import { useProjectStore } from '@/store/projectStore'
import { useCanvasStore } from '@/store/canvasStore'
import { quantizeWithDithering } from '@/engine/colorMatch'
import { removeWhiteBackground } from '@/engine/convert'
import { quickTouchup as applyTouchup } from '@/engine/grid'
import { presetPalettes } from '@/engine/palette'
import { renderBeads, renderBeadGridLines } from '@/engine/render'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { syncResizeImage } from '@/engine/resize'

interface CanvasViewportProps {
  zoom: number
  onZoomChange: (zoom: number) => void
}

export function CanvasViewport({ zoom, onZoomChange }: CanvasViewportProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })
  const [hoveredBead, setHoveredBead] = useState<{ x: number; y: number; code: string; name: string } | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const originalImage = useProjectStore((s) => s.originalImage)
  const beadSize = useProjectStore((s) => s.beadSize)
  const paletteId = useProjectStore((s) => s.paletteId)
  const removeBackground = useProjectStore((s) => s.removeBackground)
  const quickTouchup = useProjectStore((s) => s.quickTouchup)
  const bgTolerance = useProjectStore((s) => s.bgTolerance)
  const targetWidth = useProjectStore((s) => s.targetWidth)
  const targetHeight = useProjectStore((s) => s.targetHeight)

  const beadType = useCanvasStore((s) => s.beadType)
  const showGrid = useCanvasStore((s) => s.showGrid)

  // Palette lookup (memoized)
  const palette = useMemo(() =>
    presetPalettes.find((p) => p.id === paletteId) || presetPalettes[0],
    [paletteId]
  )

  // Pre-compute quantized image (only when inputs change, not on zoom/pan)
  const quantizedResult = useMemo(() => {
    if (!originalImage || originalImage.width === 0) return null

    let processed = originalImage

    // Resize to target bead count dimensions
    if (targetWidth > 0 && targetHeight > 0 && (originalImage.width !== targetWidth || originalImage.height !== targetHeight)) {
      processed = syncResizeImage(processed, { width: targetWidth, height: targetHeight })
    }

    // Apply background removal if enabled
    if (removeBackground) {
      processed = removeWhiteBackground(processed, { tolerance: bgTolerance })
    }

    // Skip pixelateImage - the resize already gives us 1 pixel = 1 bead
    // Just apply touchup if enabled
    let final = processed
    if (quickTouchup) {
      final = applyTouchup(processed, palette.colors)
    }

    const quantized = quantizeWithDithering(final, palette)

    return quantized
  }, [originalImage, beadSize, palette, removeBackground, quickTouchup, bgTolerance, targetWidth, targetHeight])

  const quantizedData = quantizedResult?.imageData ?? null

  // Debounce zoom/pan for rendering (smooth interaction without re-computing)
  const debouncedZoom = useDebouncedValue(zoom, 50)
  const debouncedPan = useDebouncedValue(pan, 50)

  // Draw canvas content - optimized with reduced DPR for mobile
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2) // Cap at 2x for mobile perf
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Clear with background
    ctx.fillStyle = '#F1F5F9'
    ctx.fillRect(0, 0, rect.width, rect.height)

    // Draw bead pattern if available
    if (quantizedData && quantizedData.width > 0) {
      // Use beadSize directly for rendering
      const renderSize = beadSize

      // Calculate position to center the image
      const imgWidth = quantizedData.width * renderSize
      const imgHeight = quantizedData.height * renderSize
      const centerX = (rect.width - imgWidth * debouncedZoom) / 2 + debouncedPan.x
      const centerY = (rect.height - imgHeight * debouncedZoom) / 2 + debouncedPan.y

      // Save context for scaling
      ctx.save()

      // Apply zoom transform
      ctx.translate(centerX, centerY)
      ctx.scale(debouncedZoom, debouncedZoom)

      // Render beads with specified bead type
      renderBeads(ctx, quantizedData, palette.colors, {
        beadSize: renderSize,
        beadType: beadType,
        gap: 0.1,
        highlightIntensity: 0.3,
        holeSize: 0.4,
      }, 0, 0)

      // Draw grid lines
      if (showGrid && debouncedZoom >= 0.6) {
        renderBeadGridLines(ctx, quantizedData, renderSize, 0, 0, debouncedZoom)
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
    // Don't prevent default - passive listeners can't preventDefault
    // The wheel event on a div doesn't scroll the page anyway
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
    const canvas = canvasRef.current
    if (!canvas || !quantizedData || !quantizedResult) {
      setHoveredBead(null)
      return
    }

    // Track mouse position for tooltip
    const rect = canvas.getBoundingClientRect()
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })

    if (isPanning) {
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      })
      return
    }

    // Calculate mouse position relative to canvas
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    // Calculate image position and size
    const renderSize = beadSize
    const imgWidth = quantizedData.width * renderSize
    const imgHeight = quantizedData.height * renderSize
    const centerX = (rect.width - imgWidth * debouncedZoom) / 2 + debouncedPan.x
    const centerY = (rect.height - imgHeight * debouncedZoom) / 2 + debouncedPan.y

    // Transform mouse position to image coordinates
    const imageX = (mouseX - centerX) / debouncedZoom
    const imageY = (mouseY - centerY) / debouncedZoom

    // Convert to bead grid coordinates
    const beadX = Math.floor(imageX / renderSize)
    const beadY = Math.floor(imageY / renderSize)

    // Check if within image bounds
    if (beadX >= 0 && beadX < quantizedData.width && beadY >= 0 && beadY < quantizedData.height) {
      const pixelIndex = beadY * quantizedData.width + beadX
      const code = quantizedResult.colorCodes[pixelIndex]
      const colorInfo = palette.colors.find(c => c.code === code)
      if (colorInfo) {
        setHoveredBead({ x: beadX, y: beadY, code: colorInfo.code, name: colorInfo.nameZh })
      } else {
        setHoveredBead(null)
      }
    } else {
      setHoveredBead(null)
    }
  }, [isPanning, panStart, quantizedData, quantizedResult, palette, beadSize, debouncedZoom, debouncedPan])

  const handleMouseUp = useCallback(() => {
    setIsPanning(false)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsPanning(false)
    setHoveredBead(null)
  }, [])

  return (
    <div
      className="w-full h-full overflow-hidden"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ cursor: isPanning ? 'grabbing' : 'default', imageRendering: 'pixelated' }}
      />
      {hoveredBead && (
        <div
          className="absolute pointer-events-none bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-sm)] px-2 py-1 shadow-lg text-xs z-50"
          style={{
            left: `${mousePos.x + 10}px`,
            top: `${mousePos.y - 30}px`,
          }}
        >
          <div className="font-medium">{hoveredBead.code}</div>
          <div className="text-[var(--color-text-muted)]">{hoveredBead.name}</div>
        </div>
      )}
    </div>
  )
}
