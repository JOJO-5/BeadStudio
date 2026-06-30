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

  // When beadSize is small, use no gap to avoid sub-pixel rendering issues
  const effectiveGap = beadSize <= 3 ? 0 : gap
  const beadRadius = (beadSize * (1 - effectiveGap)) / 2
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

      // Center of this bead (round to integers for small beads to avoid sub-pixel issues)
      const cx = beadSize <= 3
        ? Math.round(offsetX + x * beadSize + beadSize / 2)
        : offsetX + x * beadSize + beadSize / 2
      const cy = beadSize <= 3
        ? Math.round(offsetY + y * beadSize + beadSize / 2)
        : offsetY + y * beadSize + beadSize / 2

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
  _highlightIntensity: number
): void {
  const halfSize = size / 2
  const x = cx - halfSize
  const y = cy - halfSize

  // Main square - solid color, crisp edges
  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
  ctx.fillRect(x, y, size, size)
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
  // Main bead circle - solid fill (use pixelated fill for small radii)
  if (radius < 1) {
    // For sub-pixel beads, just fill a single pixel
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
    ctx.fillRect(cx - 0.5, cy - 0.5, 1, 1)
  } else {
    ctx.beginPath()
    ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
    ctx.fill()

    // Simple highlight dot (top-left) - only if intensity is set and radius is big enough
    if (highlightIntensity > 0.1 && radius >= 2) {
      const highlightRadius = Math.max(0.5, radius * 0.25)
      ctx.beginPath()
      ctx.arc(cx - radius * 0.25, cy - radius * 0.25, highlightRadius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, highlightIntensity * 0.6)})`
      ctx.fill()
    }
  }
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

  // For sub-pixel or very small beads, render as simple square
  if (radius < 1) {
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
    ctx.fillRect(cx - 0.5, cy - 0.5, 1, 1)
    return
  }

  // Outer ring (bead body with hole) - clean solid fill
  ctx.beginPath()
  ctx.arc(cx, cy, radius, 0, Math.PI * 2)
  ctx.arc(cx, cy, holeRadius, 0, Math.PI * 2, true)
  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
  ctx.fill()

  // Clean hole edge
  ctx.beginPath()
  ctx.arc(cx, cy, holeRadius, 0, Math.PI * 2)
  ctx.strokeStyle = `rgba(0, 0, 0, 0.5)`
  ctx.lineWidth = Math.max(0.5, radius * 0.1)
  ctx.stroke()

  // Small highlight dot - only if intensity is set and position is valid
  if (highlightIntensity > 0.1 && radius >= 2) {
    const highlightRadius = Math.max(0.5, radius * 0.15)
    const highlightX = cx - radius * 0.35
    const highlightY = cy - radius * 0.35
    const distFromCenter = Math.sqrt(Math.pow(highlightX - cx, 2) + Math.pow(highlightY - cy, 2))
    if (distFromCenter + highlightRadius > holeRadius) {
      ctx.beginPath()
      ctx.arc(highlightX, highlightY, highlightRadius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, highlightIntensity * 0.5)})`
      ctx.fill()
    }
  }
}

/**
 * Draws grid lines between beads - optimized batch rendering
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

  // Batch all vertical lines into single path
  ctx.beginPath()
  for (let x = 0; x <= width; x++) {
    const xPos = offsetX + x * beadSize
    ctx.moveTo(xPos, offsetY)
    ctx.lineTo(xPos, offsetY + height * beadSize)
  }
  ctx.stroke()

  // Batch all horizontal lines into single path
  ctx.beginPath()
  for (let y = 0; y <= height; y++) {
    const yPos = offsetY + y * beadSize
    ctx.moveTo(offsetX, yPos)
    ctx.lineTo(offsetX + width * beadSize, yPos)
  }
  ctx.stroke()
}
