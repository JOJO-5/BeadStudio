import { saveAs } from 'file-saver'
import type { Board } from '@/engine/grid'
import type { PaletteColor } from '@/engine/palette'

export interface PNGExportOptions {
  beadSize: number
  showGrid: boolean
  showNumbers: boolean
}

export function exportToPNG(
  imageData: ImageData,
  boards: Board[],
  colors: PaletteColor[],
  options: PNGExportOptions
): void {
  const { beadSize, showGrid, showNumbers } = options

  if (boards.length === 1) {
    const canvas = createBoardCanvas(boards[0], imageData, colors, beadSize, showGrid, showNumbers)
    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, `beadstudio-board-${Date.now()}.png`)
      }
    })
  } else {
    const canvas = createGridCanvas(boards, imageData, colors, beadSize, showGrid, showNumbers)
    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, `beadstudio-boards-${Date.now()}.png`)
      }
    })
  }
}

function createBoardCanvas(
  board: Board,
  imageData: ImageData,
  colors: PaletteColor[],
  beadSize: number,
  showGrid: boolean,
  showNumbers: boolean
): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = board.width * beadSize
  canvas.height = board.height * beadSize

  const ctx = canvas.getContext('2d')!
  ctx.imageSmoothingEnabled = false

  for (let by = 0; by < board.height; by++) {
    for (let bx = 0; bx < board.width; bx++) {
      const pixelX = board.x + bx
      const pixelY = board.y + by
      const idx = (pixelY * imageData.width + pixelX) * 4

      const r = imageData.data[idx]
      const g = imageData.data[idx + 1]
      const b = imageData.data[idx + 2]

      ctx.fillStyle = `rgb(${r},${g},${b})`
      ctx.beginPath()
      ctx.arc(
        bx * beadSize + beadSize / 2,
        by * beadSize + beadSize / 2,
        beadSize / 2 - 1,
        0,
        Math.PI * 2
      )
      ctx.fill()

      if (showGrid) {
        ctx.strokeStyle = 'rgba(0,0,0,0.2)'
        ctx.strokeRect(bx * beadSize, by * beadSize, beadSize, beadSize)
      }

      if (showNumbers) {
        const color = colors.find((c) => c.rgb[0] === r && c.rgb[1] === g && c.rgb[2] === b)
        if (color) {
          ctx.fillStyle = isLightColor(r, g, b) ? '#000' : '#fff'
          ctx.font = `${Math.max(6, beadSize / 3)}px Inter`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(color.code.slice(-2), bx * beadSize + beadSize / 2, by * beadSize + beadSize / 2)
        }
      }
    }
  }

  return canvas
}

function createGridCanvas(
  boards: Board[],
  imageData: ImageData,
  _colors: PaletteColor[],
  beadSize: number,
  showGrid: boolean,
  _showNumbers: boolean
): HTMLCanvasElement {
  const cols = Math.ceil(Math.sqrt(boards.length))
  const maxBoardWidth = Math.max(...boards.map((b) => b.width))
  const maxBoardHeight = Math.max(...boards.map((b) => b.height))
  const canvasWidth = cols * maxBoardWidth * beadSize
  const canvasHeight = Math.ceil(boards.length / cols) * maxBoardHeight * beadSize

  const canvas = document.createElement('canvas')
  canvas.width = canvasWidth
  canvas.height = canvasHeight

  const ctx = canvas.getContext('2d')!

  boards.forEach((board, i) => {
    const col = i % cols
    const row = Math.floor(i / cols)
    const offsetX = col * maxBoardWidth * beadSize
    const offsetY = row * maxBoardHeight * beadSize

    ctx.fillStyle = '#000'
    ctx.font = 'bold 12px Inter'
    ctx.textAlign = 'left'
    ctx.fillText(`Board ${i + 1}`, offsetX, offsetY - 4)

    for (let by = 0; by < board.height; by++) {
      for (let bx = 0; bx < board.width; bx++) {
        const pixelX = board.x + bx
        const pixelY = board.y + by
        const idx = (pixelY * imageData.width + pixelX) * 4

        const r = imageData.data[idx]
        const g = imageData.data[idx + 1]
        const b = imageData.data[idx + 2]

        ctx.fillStyle = `rgb(${r},${g},${b})`
        ctx.beginPath()
        ctx.arc(
          offsetX + bx * beadSize + beadSize / 2,
          offsetY + by * beadSize + beadSize / 2,
          beadSize / 2 - 1,
          0,
          Math.PI * 2
        )
        ctx.fill()

        if (showGrid) {
          ctx.strokeStyle = 'rgba(0,0,0,0.2)'
          ctx.strokeRect(offsetX + bx * beadSize, offsetY + by * beadSize, beadSize, beadSize)
        }
      }
    }
  })

  return canvas
}

function isLightColor(r: number, g: number, b: number): boolean {
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5
}
