import { saveAs } from 'file-saver'
import type { Board } from '@/engine/grid'
import type { PaletteColor } from '@/engine/palette'

export interface SVGExportOptions {
  beadSize: number
  showGrid: boolean
  showNumbers: boolean
}

export function exportToSVG(
  imageData: ImageData,
  boards: Board[],
  colors: PaletteColor[],
  options: SVGExportOptions
): void {
  const { beadSize, showGrid, showNumbers } = options

  if (boards.length === 0) return

  // Calculate total canvas size
  const maxBoardWidth = Math.max(...boards.map((b) => b.width))
  const maxBoardHeight = Math.max(...boards.map((b) => b.height))
  const cols = Math.ceil(Math.sqrt(boards.length))
  const canvasWidth = cols * maxBoardWidth * beadSize
  const canvasHeight = Math.ceil(boards.length / cols) * maxBoardHeight * beadSize

  // Build SVG
  let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${canvasWidth} ${canvasHeight}" width="${canvasWidth}" height="${canvasHeight}">
  <style>
    text { font-family: Arial, sans-serif; font-size: ${Math.max(6, beadSize / 3)}px; text-anchor: middle; dominant-baseline: central; }
  </style>
`

  boards.forEach((board, i) => {
    const col = i % cols
    const row = Math.floor(i / cols)
    const offsetX = col * maxBoardWidth * beadSize
    const offsetY = row * maxBoardHeight * beadSize

    // Board label
    svg += `  <text x="${offsetX}" y="${offsetY - 4}" font-size="12" font-weight="bold">Board ${i + 1}</text>\n`

    // Beads
    for (let by = 0; by < board.height; by++) {
      for (let bx = 0; bx < board.width; bx++) {
        const pixelX = board.x + bx
        const pixelY = board.y + by
        const idx = (pixelY * imageData.width + pixelX) * 4

        const r = imageData.data[idx]
        const g = imageData.data[idx + 1]
        const b = imageData.data[idx + 2]

        const cx = offsetX + bx * beadSize + beadSize / 2
        const cy = offsetY + by * beadSize + beadSize / 2
        const color = `rgb(${r},${g},${b})`

        // Draw bead as circle
        svg += `  <circle cx="${cx}" cy="${cy}" r="${beadSize / 2 - 0.5}" fill="${color}" stroke="${showGrid ? 'rgba(0,0,0,0.2)' : 'none'}" stroke-width="${showGrid ? 0.5 : 0}"/>\n`

        // Draw number if enabled
        if (showNumbers) {
          const colorMatch = colors.find((c) => c.rgb[0] === r && c.rgb[1] === g && c.rgb[2] === b)
          if (colorMatch) {
            const textColor = isLightColor(r, g, b) ? '#000' : '#fff'
            svg += `  <text x="${cx}" y="${cy}" fill="${textColor}">${colorMatch.code.slice(-2)}</text>\n`
          }
        }
      }
    }
  })

  svg += '</svg>'

  const blob = new Blob([svg], { type: 'image/svg+xml' })
  saveAs(blob, `beadstudio-board-${Date.now()}.svg`)
}

function isLightColor(r: number, g: number, b: number): boolean {
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5
}
