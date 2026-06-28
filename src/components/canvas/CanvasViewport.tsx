import { useRef, useEffect, useState, useMemo, useCallback } from 'react'
import type { WheelEvent, MouseEvent } from 'react'
import { useProjectStore } from '@/store/projectStore'
import { pixelateImage } from '@/engine/pixelate'
import { quantizeWithDithering } from '@/engine/colorMatch'
import { removeWhiteBackground } from '@/engine/convert'
import { quickTouchup as applyTouchup } from '@/engine/grid'
import { presetPalettes } from '@/engine/palette'
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
    if (applyTouchup) {
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

    // Clear
    ctx.fillStyle = '#F1F5F9'
    ctx.fillRect(0, 0, rect.width, rect.height)

    // Draw checkerboard background
    const checkSize = 8
    ctx.fillStyle = '#E2E8F0'
    for (let y = 0; y < rect.height; y += checkSize * 2) {
      for (let x = 0; x < rect.width; x += checkSize * 2) {
        ctx.fillRect(x, y, checkSize, checkSize)
        ctx.fillRect(x + checkSize, y + checkSize, checkSize, checkSize)
      }
    }

    // Draw image if available
    if (quantizedData && quantizedData.width > 0) {
      const pixelSize = Math.max(1, beadSize)

      // Create temp canvas for image
      const imgCanvas = document.createElement('canvas')
      imgCanvas.width = quantizedData.width
      imgCanvas.height = quantizedData.height
      const imgCtx = imgCanvas.getContext('2d')
      if (imgCtx) {
        imgCtx.putImageData(quantizedData, 0, 0)

        // Calculate position to center the image (use debounced values)
        const imgWidth = quantizedData.width * pixelSize * debouncedZoom
        const imgHeight = quantizedData.height * pixelSize * debouncedZoom
        const centerX = (rect.width - imgWidth) / 2 + debouncedPan.x
        const centerY = (rect.height - imgHeight) / 2 + debouncedPan.y

        ctx.imageSmoothingEnabled = false
        ctx.drawImage(imgCanvas, centerX, centerY, imgWidth, imgHeight)

        // Only draw grid when zoomed in enough
        if (debouncedZoom >= 0.8) {
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)'
          ctx.lineWidth = 1

          // Vertical lines
          for (let x = 0; x <= quantizedData.width; x++) {
            ctx.beginPath()
            ctx.moveTo(centerX + x * pixelSize * debouncedZoom, centerY)
            ctx.lineTo(centerX + x * pixelSize * debouncedZoom, centerY + imgHeight)
            ctx.stroke()
          }

          // Horizontal lines
          for (let y = 0; y <= quantizedData.height; y++) {
            ctx.beginPath()
            ctx.moveTo(centerX, centerY + y * pixelSize * debouncedZoom)
            ctx.lineTo(centerX + imgWidth, centerY + y * pixelSize * debouncedZoom)
            ctx.stroke()
          }
        }
      }
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
      ctx.font = '12px Inter, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('上传图片开始设计', centerX, centerY)
    }
  }, [debouncedZoom, debouncedPan, quantizedData, beadSize, zoom, pan])

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
