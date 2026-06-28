import { useRef, useEffect, useState, useMemo } from 'react'
import type { WheelEvent, MouseEvent } from 'react'
import { useProjectStore } from '@/store/projectStore'
import { pixelateImage } from '@/engine/pixelate'
import { quantizeToPalette } from '@/engine/colorMatch'
import { presetPalettes } from '@/engine/palette'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'

interface CanvasViewportProps {
  zoom: number
  onZoomChange: (zoom: number) => void
}

// 缩略图最大尺寸，超过则缩小
const THUMBNAIL_MAX = 150

export function CanvasViewport({ zoom, onZoomChange }: CanvasViewportProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })

  const originalImage = useProjectStore((s) => s.originalImage)
  const beadSize = useProjectStore((s) => s.beadSize)
  const paletteId = useProjectStore((s) => s.paletteId)

  // Debounce expensive computations (pixelate + quantize)
  const debouncedZoom = useDebouncedValue(zoom, 100)
  const debouncedPan = useDebouncedValue(pan, 100)

  // Memoize palette lookup
  const palette = useMemo(() =>
    presetPalettes.find((p) => p.id === paletteId) || presetPalettes[0],
    [paletteId]
  )

  // Pre-compute quantized image (expensive, only when inputs change)
  const quantizedData = useMemo(() => {
    if (!originalImage || originalImage.width === 0) return null

    const pixelSize = Math.max(1, beadSize)

    // 创建缩略图用于快速渲染
    const thumbWidth = Math.min(originalImage.width, THUMBNAIL_MAX)
    const thumbHeight = Math.round(originalImage.height * (thumbWidth / originalImage.width))

    // 如果图片很大，先缩小
    let processImage = originalImage
    if (originalImage.width > thumbWidth) {
      const tempCanvas = document.createElement('canvas')
      tempCanvas.width = originalImage.width
      tempCanvas.height = originalImage.height
      const tempCtx = tempCanvas.getContext('2d')
      if (tempCtx) {
        tempCtx.putImageData(originalImage, 0, 0)

        // 创建缩小的 canvas
        const scaledCanvas = document.createElement('canvas')
        scaledCanvas.width = thumbWidth
        scaledCanvas.height = thumbHeight
        const scaledCtx = scaledCanvas.getContext('2d')
        if (scaledCtx) {
          scaledCtx.drawImage(tempCanvas, 0, 0, thumbWidth, thumbHeight)
          const scaledData = scaledCtx.getImageData(0, 0, thumbWidth, thumbHeight)
          processImage = scaledData
        }
      }
    }

    const pixelated = pixelateImage(processImage, { pixelSize })
    const quantized = quantizeToPalette(pixelated, palette)

    return {
      imageData: quantized.imageData,
    }
  }, [originalImage, beadSize, palette])

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
    if (quantizedData && quantizedData.imageData.width > 0) {
      const pixelSize = Math.max(1, beadSize)
      const { imageData } = quantizedData

      // Create temp canvas for image
      const imgCanvas = document.createElement('canvas')
      imgCanvas.width = imageData.width
      imgCanvas.height = imageData.height
      const imgCtx = imgCanvas.getContext('2d')
      if (imgCtx) {
        imgCtx.putImageData(imageData, 0, 0)

        // Calculate position to center the image (use debounced values)
        const imgWidth = imageData.width * pixelSize * debouncedZoom
        const imgHeight = imageData.height * pixelSize * debouncedZoom
        const centerX = (rect.width - imgWidth) / 2 + debouncedPan.x
        const centerY = (rect.height - imgHeight) / 2 + debouncedPan.y

        ctx.imageSmoothingEnabled = false
        ctx.drawImage(imgCanvas, centerX, centerY, imgWidth, imgHeight)

        // Only draw grid when zoomed in enough
        if (debouncedZoom >= 0.5) {
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)'
          ctx.lineWidth = 1

          // Vertical lines
          for (let x = 0; x <= imageData.width; x++) {
            ctx.beginPath()
            ctx.moveTo(centerX + x * pixelSize * debouncedZoom, centerY)
            ctx.lineTo(centerX + x * pixelSize * debouncedZoom, centerY + imgHeight)
            ctx.stroke()
          }

          // Horizontal lines
          for (let y = 0; y <= imageData.height; y++) {
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
