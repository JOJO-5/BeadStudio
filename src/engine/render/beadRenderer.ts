/**
 * Bead Renderer - Crisp round beads with clear gaps
 */

import type { PaletteColor } from '@/engine/palette'

export interface BeadRenderOptions {
  beadSize: number
  gap: number // Gap between beads as percentage (0-1), default 0.15
  highlightSize: number // Highlight dot size relative to bead (0-1), default 0.3
}

/**
 * Renders bead pattern as clean round beads with gaps
 * Optimized for crisp, clear output
 */
export function renderBeads(
  ctx: CanvasRenderingContext2D,
  imageData: ImageData,
  _palette: readonly PaletteColor[],
  options: BeadRenderOptions,
  offsetX: number,
  offsetY: number
): void {
  const { beadSize, gap = 0.15, highlightSize = 0.35 } = options
  const { width, height, data } = imageData

  // Calculate bead visual size with gap
  const beadRadius = (beadSize * (1 - gap)) / 2

  ctx.save()

  // Disable anti-aliasing for crisp edges
  ctx.imageSmoothingEnabled = false

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4
      const r = data[idx]
      const g = data[idx + 1]
      const b = data[idx + 2]
      const a = data[idx + 3]

      // Skip transparent pixels
      if (a < 128) continue

      // Center of this bead
      const cx = offsetX + x * beadSize + beadSize / 2
      const cy = offsetY + y * beadSize + beadSize / 2

      // Draw main bead (filled circle)
      ctx.beginPath()
      ctx.arc(cx, cy, beadRadius, 0, Math.PI * 2)
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
      ctx.fill()

      // Draw highlight (small white circle at top-left of bead)
      const highlightRadius = beadRadius * highlightSize
      const highlightOffsetX = cx - beadRadius * 0.35
      const highlightOffsetY = cy - beadRadius * 0.35

      ctx.beginPath()
      ctx.arc(highlightOffsetX, highlightOffsetY, highlightRadius, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
      ctx.fill()
    }
  }

  ctx.restore()
}

/**
 * Draws grid lines between beads
 */
export function renderBeadGridLines(
  ctx: CanvasRenderingContext2D,
  imageData: ImageData,
  beadSize: number,
  offsetX: number,
  offsetY: number,
  _zoom: number
): void {
  const { width, height } = imageData

  ctx.strokeStyle = 'rgba(0, 0, 0, 0.12)'
  ctx.lineWidth = 1

  // Vertical lines
  for (let x = 0; x <= width; x++) {
    ctx.beginPath()
    ctx.moveTo(offsetX + x * beadSize, offsetY)
    ctx.lineTo(offsetX + x * beadSize, offsetY + height * beadSize)
    ctx.stroke()
  }

  // Horizontal lines
  for (let y = 0; y <= height; y++) {
    ctx.beginPath()
    ctx.moveTo(offsetX, offsetY + y * beadSize)
    ctx.lineTo(offsetX + width * beadSize, offsetY + y * beadSize)
    ctx.stroke()
  }
}
