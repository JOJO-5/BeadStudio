/**
 * Bead Renderer - Supports square, round solid, and round hollow beads
 * Engine layer - pure function, no DOM references
 */

import type { PaletteColor } from '@/engine/palette'

export type BeadType = 'square' | 'round-solid' | 'round-hollow'

export interface BeadRenderOptions {
  beadSize: number
  beadType: BeadType
  gap: number // Gap between beads as percentage (0-1), default 0.15
  highlightIntensity: number // 0-1, default 0.4
  holeSize: number // Hole size for hollow beads relative to bead radius (0-1), default 0.4
}

/**
 * Renders bead pattern with specified bead type
 * Pure function - no side effects
 */
export function renderBeads(
  ctx: CanvasRenderingContext2D,
  imageData: ImageData,
  _palette: readonly PaletteColor[],
  options: BeadRenderOptions,
  offsetX: number,
  offsetY: number
): void {
  const { beadSize, beadType = 'round-solid', gap = 0.15, highlightIntensity = 0.4, holeSize = 0.4 } = options
  const { width, height, data } = imageData

  // Calculate bead visual size with gap
  const beadRadius = (beadSize * (1 - gap)) / 2
  const beadDiameter = beadRadius * 2

  ctx.save()
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

      switch (beadType) {
        case 'square':
          renderSquareBead(ctx, cx, cy, beadDiameter, r, g, b, highlightIntensity)
          break
        case 'round-solid':
          renderRoundSolidBead(ctx, cx, cy, beadRadius, r, g, b, highlightIntensity)
          break
        case 'round-hollow':
          renderRoundHollowBead(ctx, cx, cy, beadRadius, r, g, b, highlightIntensity, holeSize)
          break
      }
    }
  }

  ctx.restore()
}

function renderSquareBead(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  r: number,
  g: number,
  b: number,
  highlightIntensity: number
): void {
  const halfSize = size / 2
  const x = cx - halfSize
  const y = cy - halfSize

  // Main square
  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
  ctx.fillRect(x, y, size, size)

  // Highlight (top-left corner)
  ctx.fillStyle = `rgba(255, 255, 255, ${highlightIntensity * 0.5})`
  ctx.fillRect(x, y, size, size * 0.3)
  ctx.fillRect(x, y, size * 0.3, size)
}

function renderRoundSolidBead(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  r: number,
  g: number,
  b: number,
  highlightIntensity: number
): void {
  // Main bead circle
  ctx.beginPath()
  ctx.arc(cx, cy, radius, 0, Math.PI * 2)
  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
  ctx.fill()

  // Highlight dot (top-left)
  const highlightRadius = radius * 0.35
  ctx.beginPath()
  ctx.arc(cx - radius * 0.3, cy - radius * 0.3, highlightRadius, 0, Math.PI * 2)
  ctx.fillStyle = `rgba(255, 255, 255, ${highlightIntensity})`
  ctx.fill()
}

function renderRoundHollowBead(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  r: number,
  g: number,
  b: number,
  highlightIntensity: number,
  holeSize: number
): void {
  const holeRadius = radius * holeSize

  // Outer ring (bead body with hole)
  ctx.beginPath()
  ctx.arc(cx, cy, radius, 0, Math.PI * 2)
  ctx.arc(cx, cy, holeRadius, 0, Math.PI * 2, true) // Counter-clockwise to create hole
  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
  ctx.fill()

  // Inner edge highlight (rim lighting)
  ctx.beginPath()
  ctx.arc(cx, cy, radius - 1, 0, Math.PI * 2)
  ctx.strokeStyle = `rgba(0, 0, 0, 0.3)`
  ctx.lineWidth = 1
  ctx.stroke()

  // Hole inner edge
  ctx.beginPath()
  ctx.arc(cx, cy, holeRadius, 0, Math.PI * 2)
  ctx.strokeStyle = `rgba(0, 0, 0, 0.4)`
  ctx.lineWidth = 1
  ctx.stroke()

  // Highlight on top-left of bead (not in hole)
  const highlightRadius = radius * 0.25
  const highlightX = cx - radius * 0.35
  const highlightY = cy - radius * 0.35

  // Only draw highlight if it's not in the hole area
  const distFromCenter = Math.sqrt(Math.pow(highlightX - cx, 2) + Math.pow(highlightY - cy, 2))
  if (distFromCenter + highlightRadius > holeRadius) {
    ctx.beginPath()
    ctx.arc(highlightX, highlightY, highlightRadius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${highlightIntensity})`
    ctx.fill()
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
