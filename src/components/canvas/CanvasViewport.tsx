import { useRef, useEffect, useState } from 'react'
import type { WheelEvent, MouseEvent } from 'react'
import { useProjectStore } from '@/store/projectStore'
import { pixelateImage } from '@/engine/pixelate'
import { quantizeToPalette } from '@/engine/colorMatch'
import { presetPalettes } from '@/engine/palette'

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
    if (originalImage && originalImage.width > 0 && originalImage.height > 0) {
      const palette = presetPalettes.find((p) => p.id === paletteId) || presetPalettes[0]
      const pixelSize = Math.max(1, beadSize)

      // First pixelate, then quantize to palette
      const pixelated = pixelateImage(originalImage, { pixelSize })
      const quantized = quantizeToPalette(pixelated, palette)

      // Create temp canvas for image
      const imgCanvas = document.createElement('canvas')
      imgCanvas.width = quantized.imageData.width
      imgCanvas.height = quantized.imageData.height
      const imgCtx = imgCanvas.getContext('2d')
      if (imgCtx) {
        imgCtx.putImageData(quantized.imageData, 0, 0)

        // Calculate position to center the image
        const imgWidth = quantized.imageData.width * pixelSize * zoom
        const imgHeight = quantized.imageData.height * pixelSize * zoom
        const centerX = (rect.width - imgWidth) / 2 + pan.x
        const centerY = (rect.height - imgHeight) / 2 + pan.y

        ctx.imageSmoothingEnabled = false
        ctx.drawImage(imgCanvas, centerX, centerY, imgWidth, imgHeight)

        // Draw bead grid overlay
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)'
        ctx.lineWidth = 1

        // Vertical lines
        for (let x = 0; x <= quantized.imageData.width; x++) {
          ctx.beginPath()
          ctx.moveTo(centerX + x * pixelSize * zoom, centerY)
          ctx.lineTo(centerX + x * pixelSize * zoom, centerY + imgHeight)
          ctx.stroke()
        }

        // Horizontal lines
        for (let y = 0; y <= quantized.imageData.height; y++) {
          ctx.beginPath()
          ctx.moveTo(centerX, centerY + y * pixelSize * zoom)
          ctx.lineTo(centerX + imgWidth, centerY + y * pixelSize * zoom)
          ctx.stroke()
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
  }, [zoom, pan, originalImage, beadSize, paletteId])

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
