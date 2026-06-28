import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { saveAs } from 'file-saver'
import type { Board } from '@/engine/grid'
import type { ColorStat } from '@/engine/statistics'
import { rgbToLab } from '@/engine/convert/lab'
import type { RGB } from '@/engine/convert/rgb'

export interface PDFExportOptions {
  beadSize: number
  showGrid: boolean
  showNumbers: boolean
  includeLegend: boolean
  includeMaterialList: boolean
}

// Use English text only to avoid font issues
const TITLE = 'BeadStudio Pattern'
const SIZE_LABEL = 'Size: '
const BOARDS_LABEL = 'Boards: '
const MATERIAL_LIST = 'Material List'
const COLOR_CODE = 'Code'
const QTY = 'Qty'
const BOARD_LABEL = 'Board '

export async function exportToPDF(
  imageData: ImageData,
  boards: Board[],
  _colors: unknown,
  statistics: ColorStat[],
  options: PDFExportOptions
): Promise<void> {
  const pdfDoc = await PDFDocument.create()
  const pageWidth = 595
  const pageHeight = 842
  const margin = 40

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  // ========== PAGE 1: Title + Reference Image + Material List ==========
  let page = pdfDoc.addPage([pageWidth, pageHeight])
  let y = pageHeight - margin

  page.drawText(TITLE, {
    x: margin,
    y,
    size: 24,
    font: fontBold,
    color: rgb(0, 0, 0),
  })
  y -= 40

  page.drawText(`${SIZE_LABEL}${imageData.width} x ${imageData.height} beads`, {
    x: margin,
    y,
    size: 12,
    font,
    color: rgb(0, 0, 0),
  })
  y -= 20

  page.drawText(`${BOARDS_LABEL}${boards.length}`, {
    x: margin,
    y,
    size: 12,
    font,
    color: rgb(0, 0, 0),
  })
  y -= 30

  // Draw reference image (scaled to fit)
  const maxImgWidth = pageWidth - margin * 2
  const maxImgHeight = 200
  const imgAspect = imageData.width / imageData.height
  let imgDrawWidth = maxImgWidth
  let imgDrawHeight = imgDrawWidth / imgAspect
  if (imgDrawHeight > maxImgHeight) {
    imgDrawHeight = maxImgHeight
    imgDrawWidth = imgDrawHeight * imgAspect
  }

  // Create temp canvas to get image data URL
  const tempCanvas = document.createElement('canvas')
  tempCanvas.width = imageData.width
  tempCanvas.height = imageData.height
  const tempCtx = tempCanvas.getContext('2d')!
  tempCtx.putImageData(imageData, 0, 0)
  const imgDataUrl = tempCanvas.toDataURL('image/png')

  try {
    const refImg = await pdfDoc.embedPng(imgDataUrl)
    page.drawImage(refImg, {
      x: margin,
      y: y - imgDrawHeight,
      width: imgDrawWidth,
      height: imgDrawHeight,
    })
    y -= imgDrawHeight + 30
  } catch {
    y -= 20
  }

  // Material List
  if (options.includeMaterialList && statistics.length > 0) {
    page.drawText(MATERIAL_LIST, {
      x: margin,
      y,
      size: 18,
      font: fontBold,
      color: rgb(0, 0, 0),
    })
    y -= 25

    // Header
    page.drawText('Swatch', { x: margin, y, size: 11, font: fontBold, color: rgb(0, 0, 0) })
    page.drawText(COLOR_CODE, { x: margin + 22, y, size: 11, font: fontBold, color: rgb(0, 0, 0) })
    page.drawText(QTY, { x: margin + 75, y, size: 11, font: fontBold, color: rgb(0, 0, 0) })
    y -= 18

    for (const stat of statistics.slice(0, 30)) {
      if (y < margin + 30) {
        page = pdfDoc.addPage([pageWidth, pageHeight])
        y = pageHeight - margin
      }

      const [r, g, b] = stat.color.rgb
      page.drawRectangle({
        x: margin,
        y: y - 7,
        width: 12,
        height: 12,
        color: rgb(r / 255, g / 255, b / 255),
        borderColor: rgb(0.7, 0.7, 0.7),
        borderWidth: 0.5,
      })

      page.drawText(stat.color.code, { x: margin + 22, y, size: 10, font, color: rgb(0, 0, 0) })
      page.drawText(`${stat.count}`, { x: margin + 75, y, size: 10, font, color: rgb(0, 0, 0) })
      y -= 17
    }
  }

  // ========== BOARD PAGES ==========
  // Find color code for each pixel (reuse across boards)
  const colorCodeMap = new Map<string, string>()
  for (let py = 0; py < imageData.height; py++) {
    for (let px = 0; px < imageData.width; px++) {
      const idx = (py * imageData.width + px) * 4
      const r = imageData.data[idx]
      const g = imageData.data[idx + 1]
      const b = imageData.data[idx + 2]
      const key = `${r},${g},${b}`
      if (!colorCodeMap.has(key)) {
        const inputLab = rgbToLab([r, g, b] as RGB)
        let closest = statistics[0]?.color
        let minDist = Infinity
        for (const stat of statistics) {
          const statLab = rgbToLab(stat.color.rgb as RGB)
          const dL = inputLab.L - statLab.L
          const da = inputLab.a - statLab.a
          const db = inputLab.b - statLab.b
          const dist = Math.sqrt(dL * dL + da * da + db * db)
          if (dist < minDist) {
            minDist = dist
            closest = stat.color
          }
        }
        colorCodeMap.set(key, closest?.code || '?')
      }
    }
  }

  for (let i = 0; i < boards.length; i++) {
    page = pdfDoc.addPage([pageWidth, pageHeight])
    y = pageHeight - margin

    page.drawText(`${BOARD_LABEL}${i + 1} / ${boards.length}`, {
      x: margin,
      y,
      size: 16,
      font: fontBold,
      color: rgb(0, 0, 0),
    })
    y -= 18

    page.drawText(`Size: ${boards[i].width} x ${boards[i].height} beads`, {
      x: margin,
      y,
      size: 10,
      font,
      color: rgb(0.4, 0.4, 0.4),
    })
    y -= 25

    const board = boards[i]
    // High quality: 24px cells for large readable beads
    const cellSize = 24

    // Create high-quality board image (same as PNG)
    const boardImg = createHighResBoardImage(board, imageData, colorCodeMap, cellSize)

    // Embed board image
    try {
      const embeddedImg = await pdfDoc.embedPng(boardImg)
      const imgWidth = board.width * cellSize + 30 // extra for labels
      const imgHeight = board.height * cellSize + 30

      // Scale to fit page
      let scale = 1
      const maxW = pageWidth - margin * 2
      const maxH = y - margin - 10
      if (imgWidth > maxW) scale = maxW / imgWidth
      if (imgHeight * scale > maxH) scale = maxH / imgHeight

      page.drawImage(embeddedImg, {
        x: margin,
        y: y - imgHeight * scale,
        width: imgWidth * scale,
        height: imgHeight * scale,
      })
    } catch {
      // Fallback: draw grid only
    }
  }

  const pdfBytes = await pdfDoc.save()
  const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' })
  saveAs(blob, `beadstudio-${Date.now()}.pdf`)
}

// Create high-res board image (same as PNG export)
function createHighResBoardImage(
  board: Board,
  imageData: ImageData,
  colorCodeMap: Map<string, string>,
  cellSize: number
): string {
  const labelOffset = 30
  const width = board.width * cellSize + labelOffset
  const height = board.height * cellSize + labelOffset

  const canvas = document.createElement('canvas')
  canvas.width = width * 2
  canvas.height = height * 2
  canvas.style.width = width + 'px'
  canvas.style.height = height + 'px'

  const ctx = canvas.getContext('2d')!
  ctx.scale(2, 2)
  ctx.imageSmoothingEnabled = false

  // Background
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, width, height)

  // Row numbers
  ctx.fillStyle = '#333'
  ctx.font = 'bold 11px Inter'
  ctx.textAlign = 'right'
  ctx.textBaseline = 'middle'
  for (let i = 0; i <= board.height; i += 5) {
    ctx.fillText(String(i), labelOffset - 6, labelOffset + i * cellSize - cellSize / 2)
  }

  // Column numbers
  ctx.textAlign = 'center'
  ctx.textBaseline = 'bottom'
  for (let i = 0; i <= board.width; i += 5) {
    ctx.fillText(String(i), labelOffset + i * cellSize - cellSize / 2, labelOffset - 4)
  }

  // Draw round beads
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

      const cx = labelOffset + bx * cellSize
      const cy = labelOffset + by * cellSize
      const padding = 1.5
      const beadRadius = (cellSize - padding * 2) / 2

      ctx.beginPath()
      ctx.arc(cx + cellSize / 2, cy + cellSize / 2, beadRadius, 0, Math.PI * 2)
      ctx.fillStyle = `rgb(${r},${g},${b})`
      ctx.fill()

      // Grid
      ctx.strokeStyle = 'rgba(0,0,0,0.25)'
      ctx.lineWidth = 0.5
      ctx.strokeRect(cx + padding, cy + padding, cellSize - padding * 2, cellSize - padding * 2)

      // Color code
      if (beadRadius >= 6) {
        const key = `${r},${g},${b}`
        const code = colorCodeMap.get(key) || ''
        if (code) {
          const fontSize = Math.max(8, beadRadius * 0.45)
          ctx.font = `bold ${fontSize}px Inter`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.strokeStyle = '#ffffff'
          ctx.lineWidth = 2
          ctx.strokeText(code, cx + cellSize / 2, cy + cellSize / 2)
          ctx.fillStyle = '#000'
          ctx.fillText(code, cx + cellSize / 2, cy + cellSize / 2)
        }
      }
    }
  }

  // Border
  ctx.strokeStyle = '#333'
  ctx.lineWidth = 1
  ctx.strokeRect(labelOffset, labelOffset, board.width * cellSize, board.height * cellSize)

  return canvas.toDataURL('image/png')
}
