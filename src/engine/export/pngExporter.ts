import { saveAs } from 'file-saver'
import type { Board } from '@/engine/grid'
import type { PaletteColor } from '@/engine/palette'
import { rgbToLab } from '@/engine/convert/lab'
import type { RGB } from '@/engine/convert/rgb'
import type { ColorStat } from '@/engine/statistics'

export interface PNGExportOptions {
  beadSize: number
  showGrid: boolean
  showNumbers: boolean
}

// High resolution export bead size (ensures clear zoom)
const EXPORT_BEAD_SIZE = 24

export function exportToPNG(
  imageData: ImageData,
  boards: Board[],
  colors: PaletteColor[],
  options: PNGExportOptions,
  statistics?: ColorStat[]
): void {
  const { showGrid, showNumbers } = options

  if (boards.length === 1) {
    const canvas = createBoardCanvas(boards[0], imageData, colors, showGrid, showNumbers, statistics)
    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, `beadstudio-board-${Date.now()}.png`)
      }
    })
  } else {
    const canvas = createGridCanvas(boards, imageData, colors, showGrid, showNumbers)
    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, `beadstudio-boards-${Date.now()}.png`)
      }
    })
  }
}

function findColorCode(r: number, g: number, b: number, colors: PaletteColor[]): string {
  const inputLab = rgbToLab([r, g, b] as RGB)
  let closest = colors[0]
  let minDist = Infinity
  for (const c of colors) {
    const cLab = rgbToLab(c.rgb as RGB)
    const dL = inputLab.L - cLab.L
    const da = inputLab.a - cLab.a
    const db = inputLab.b - cLab.b
    const dist = Math.sqrt(dL * dL + da * da + db * db)
    if (dist < minDist) {
      minDist = dist
      closest = c
    }
  }
  return closest?.code || ''
}

function createBoardCanvas(
  board: Board,
  imageData: ImageData,
  colors: PaletteColor[],
  showGrid: boolean,
  showNumbers: boolean,
  statistics?: ColorStat[]
): HTMLCanvasElement {
  const beadSize = EXPORT_BEAD_SIZE
  const labelOffset = 30 // Space for row/column numbers
  const legendWidth = statistics && statistics.length > 0 ? 180 : 0 // Space for color legend
  const canvasWidth = board.width * beadSize + labelOffset + legendWidth
  const canvasHeight = board.height * beadSize + labelOffset

  const canvas = document.createElement('canvas')
  canvas.width = canvasWidth * 2 // 2x for retina/high-res
  canvas.height = canvasHeight * 2
  canvas.style.width = canvasWidth + 'px'
  canvas.style.height = canvasHeight + 'px'

  const ctx = canvas.getContext('2d')!
  ctx.scale(2, 2)
  ctx.imageSmoothingEnabled = false

  // Background
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvasWidth, canvasHeight)

  // Draw row numbers (left side) - every 5
  ctx.fillStyle = '#333'
  ctx.font = 'bold 11px Inter'
  ctx.textAlign = 'right'
  ctx.textBaseline = 'middle'
  for (let i = 0; i <= board.height; i += 5) {
    const y = labelOffset + i * beadSize - beadSize / 2
    ctx.fillText(String(i), labelOffset - 6, y)
  }

  // Draw column numbers (top) - every 5
  ctx.textAlign = 'center'
  ctx.textBaseline = 'bottom'
  for (let i = 0; i <= board.width; i += 5) {
    const x = labelOffset + i * beadSize - beadSize / 2
    ctx.fillText(String(i), x, labelOffset - 4)
  }

  // Draw beads
  for (let by = 0; by < board.height; by++) {
    for (let bx = 0; bx < board.width; bx++) {
      const pixelX = board.x + bx
      const pixelY = board.y + by
      const idx = (pixelY * imageData.width + pixelX) * 4

      const r = imageData.data[idx]
      const g = imageData.data[idx + 1]
      const b = imageData.data[idx + 2]
      const a = imageData.data[idx + 3]

      if (a < 128) continue

      const cx = labelOffset + bx * beadSize
      const cy = labelOffset + by * beadSize
      const padding = 1.5
      const beadRadius = (beadSize - padding * 2) / 2

      // Draw round bead
      ctx.beginPath()
      ctx.arc(cx + beadSize / 2, cy + beadSize / 2, beadRadius, 0, Math.PI * 2)
      ctx.fillStyle = `rgb(${r},${g},${b})`
      ctx.fill()

      // Draw grid
      if (showGrid) {
        ctx.strokeStyle = 'rgba(0,0,0,0.25)'
        ctx.lineWidth = 0.75
        ctx.strokeRect(cx + padding, cy + padding, beadSize - padding * 2, beadSize - padding * 2)
      }

      // Draw number inside bead
      if (showNumbers && beadRadius >= 6) {
        const code = findColorCode(r, g, b, colors)
        if (code) {
          const fontSize = Math.max(8, beadRadius * 0.45)
          ctx.font = `bold ${fontSize}px Inter`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'

          // White outline for contrast
          ctx.strokeStyle = '#ffffff'
          ctx.lineWidth = 2.5
          ctx.strokeText(code, cx + beadSize / 2, cy + beadSize / 2)

          // Black text
          ctx.fillStyle = '#000000'
          ctx.fillText(code, cx + beadSize / 2, cy + beadSize / 2)
        }
      }
    }
  }

  // Draw border around board
  ctx.strokeStyle = '#333'
  ctx.lineWidth = 1.5
  ctx.strokeRect(labelOffset, labelOffset, board.width * beadSize, board.height * beadSize)

  // Draw color legend on the right side
  if (statistics && statistics.length > 0) {
    const legendX = labelOffset + board.width * beadSize + 20
    const legendY = labelOffset + 10

    // Title
    ctx.fillStyle = '#333'
    ctx.font = 'bold 12px Inter'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
    ctx.fillText('Color List', legendX, legendY)

    // Color swatches with count
    let yOffset = legendY + 25
    ctx.font = '11px Inter'
    ctx.textBaseline = 'middle'

    for (const stat of statistics.slice(0, 30)) {
      if (yOffset > canvasHeight - 20) break

      const [r, g, b] = stat.color.rgb

      // Draw color swatch (round bead)
      ctx.beginPath()
      ctx.arc(legendX + 8, yOffset, 8, 0, Math.PI * 2)
      ctx.fillStyle = `rgb(${r},${g},${b})`
      ctx.fill()
      ctx.strokeStyle = 'rgba(0,0,0,0.3)'
      ctx.lineWidth = 0.5
      ctx.stroke()

      // Color code
      ctx.fillStyle = '#333'
      ctx.textAlign = 'left'
      ctx.fillText(stat.color.code, legendX + 22, yOffset)

      // Count
      ctx.textAlign = 'right'
      ctx.fillText(`${stat.count}`, legendX + 60, yOffset)

      yOffset += 20
    }

    // Total count
    if (yOffset < canvasHeight - 20) {
      ctx.font = 'bold 11px Inter'
      ctx.textAlign = 'left'
      ctx.fillText(`Total: ${board.width * board.height}`, legendX, yOffset + 5)
    }
  }

  return canvas
}

function createGridCanvas(
  boards: Board[],
  imageData: ImageData,
  colors: PaletteColor[],
  showGrid: boolean,
  showNumbers: boolean
): HTMLCanvasElement {
  const beadSize = EXPORT_BEAD_SIZE
  const cols = Math.ceil(Math.sqrt(boards.length))
  const maxBoardWidth = Math.max(...boards.map((b) => b.width))
  const maxBoardHeight = Math.max(...boards.map((b) => b.height))
  const canvasWidth = cols * maxBoardWidth * beadSize
  const canvasHeight = Math.ceil(boards.length / cols) * maxBoardHeight * beadSize

  const canvas = document.createElement('canvas')
  canvas.width = canvasWidth * 2
  canvas.height = canvasHeight * 2
  canvas.style.width = canvasWidth + 'px'
  canvas.style.height = canvasHeight + 'px'

  const ctx = canvas.getContext('2d')!
  ctx.scale(2, 2)
  ctx.imageSmoothingEnabled = false

  boards.forEach((board, i) => {
    const col = i % cols
    const row = Math.floor(i / cols)
    const offsetX = col * maxBoardWidth * beadSize
    const offsetY = row * maxBoardHeight * beadSize

    ctx.fillStyle = '#000'
    ctx.font = 'bold 14px Inter'
    ctx.textAlign = 'left'
    ctx.fillText(`Board ${i + 1}`, offsetX, offsetY - 6)

    for (let by = 0; by < board.height; by++) {
      for (let bx = 0; bx < board.width; bx++) {
        const pixelX = board.x + bx
        const pixelY = board.y + by
        const idx = (pixelY * imageData.width + pixelX) * 4

        const r = imageData.data[idx]
        const g = imageData.data[idx + 1]
        const b = imageData.data[idx + 2]
        const a = imageData.data[idx + 3]

        if (a < 128) continue

        const cx = offsetX + bx * beadSize
        const cy = offsetY + by * beadSize
        const padding = 1.5
        const beadRadius = (beadSize - padding * 2) / 2

        // Draw round bead
        ctx.beginPath()
        ctx.arc(cx + beadSize / 2, cy + beadSize / 2, beadRadius, 0, Math.PI * 2)
        ctx.fillStyle = `rgb(${r},${g},${b})`
        ctx.fill()

        if (showGrid) {
          ctx.strokeStyle = 'rgba(0,0,0,0.2)'
          ctx.lineWidth = 0.75
          ctx.strokeRect(cx + padding, cy + padding, beadSize - padding * 2, beadSize - padding * 2)
        }

        if (showNumbers && beadRadius >= 6) {
          const code = findColorCode(r, g, b, colors)
          if (code) {
            const fontSize = Math.max(8, beadRadius * 0.45)
            ctx.font = `bold ${fontSize}px Inter`
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.strokeStyle = '#ffffff'
            ctx.lineWidth = 2.5
            ctx.strokeText(code, cx + beadSize / 2, cy + beadSize / 2)
            ctx.fillStyle = '#000000'
            ctx.fillText(code, cx + beadSize / 2, cy + beadSize / 2)
          }
        }
      }
    }
  })

  return canvas
}

