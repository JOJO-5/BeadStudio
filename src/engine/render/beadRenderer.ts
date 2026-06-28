/**
 * Bead Renderer - Renders pixels as realistic round beads with highlights and gaps
 */

import type { PaletteColor } from '@/engine/palette'

export interface BeadRenderOptions {
  beadSize: number
  gap: number // Gap between beads as percentage (0-1), default 0.1
  highlightIntensity: number // 0-1, default 0.3
}

/**
 * Renders bead pattern to canvas context
 * Each pixel becomes a circular bead with 3D highlight effect
 */
export function renderBeads(
  ctx: CanvasRenderingContext2D,
  imageData: ImageData,
  _palette: readonly PaletteColor[],
  options: BeadRenderOptions,
  offsetX: number,
  offsetY: number
): void {
  const { beadSize, gap = 0.1, highlightIntensity = 0.3 } = options
  const { width, height, data } = imageData

  // Calculate actual bead size with gap
  const actualSize = beadSize * (1 - gap)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4
      const r = data[idx]
      const g = data[idx + 1]
      const b = data[idx + 2]
      const a = data[idx + 3]

      // Skip transparent pixels
      if (a < 128) continue

      const cx = offsetX + x * beadSize + beadSize / 2
      const cy = offsetY + y * beadSize + beadSize / 2
      const radius = actualSize / 2

      // Draw bead shadow (subtle dark edge)
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${Math.max(0, r - 40)}, ${Math.max(0, g - 40)}, ${Math.max(0, b - 40)}, 0.5)`
      ctx.fill()

      // Draw main bead color
      ctx.beginPath()
      ctx.arc(cx, cy, radius - 1, 0, Math.PI * 2)
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
      ctx.fill()

      // Draw highlight (3D effect - top-left lighter area)
      const gradient = ctx.createRadialGradient(
        cx - radius * 0.3,
        cy - radius * 0.3,
        0,
        cx,
        cy,
        radius
      )
      gradient.addColorStop(0, `rgba(255, 255, 255, ${highlightIntensity})`)
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)')
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.1)')

      ctx.beginPath()
      ctx.arc(cx, cy, radius - 1, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()
    }
  }
}

/**
 * Renders bead pattern as simple grid (faster, no 3D effect)
 * Good for preview when performance matters
 */
export function renderBeadGrid(
  ctx: CanvasRenderingContext2D,
  imageData: ImageData,
  options: BeadRenderOptions,
  offsetX: number,
  offsetY: number
): void {
  const { beadSize, gap = 0.08 } = options
  const { width, height, data } = imageData

  const actualSize = beadSize * (1 - gap)
  const gapOffset = beadSize * gap

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4
      const r = data[idx]
      const g = data[idx + 1]
      const b = data[idx + 2]
      const a = data[idx + 3]

      if (a < 128) continue

      const px = offsetX + x * beadSize + gapOffset
      const py = offsetY + y * beadSize + gapOffset

      // Main bead
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
      ctx.fillRect(px, py, actualSize, actualSize)

      // Subtle highlight
      ctx.fillStyle = `rgba(255, 255, 255, 0.2)`
      ctx.fillRect(px, py, actualSize, actualSize * 0.3)
      ctx.fillRect(px, py, actualSize * 0.3, actualSize)
    }
  }
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
  zoom: number
): void {
  const { width, height } = imageData

  if (zoom < 0.5) return // Don't draw grid when zoomed out too much

  ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)'
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
