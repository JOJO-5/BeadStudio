import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { saveAs } from 'file-saver'
import type { Board } from '@/engine/grid'
import type { ColorStat } from '@/engine/statistics'

export interface PDFExportOptions {
  beadSize: number
  showGrid: boolean
  showNumbers: boolean
  includeLegend: boolean
  includeMaterialList: boolean
}

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

  let page = pdfDoc.addPage([pageWidth, pageHeight])
  let y = pageHeight - margin

  page.drawText('BeadStudio - 拼豆图纸', {
    x: margin,
    y,
    size: 24,
    font: fontBold,
    color: rgb(0, 0, 0),
  })
  y -= 40

  page.drawText(`项目生成时间: ${new Date().toLocaleDateString('zh-CN')}`, {
    x: margin,
    y,
    size: 12,
    font,
    color: rgb(0.4, 0.4, 0.4),
  })
  y -= 20

  page.drawText(`图片尺寸: ${imageData.width} × ${imageData.height} beads`, {
    x: margin,
    y,
    size: 12,
    font,
    color: rgb(0, 0, 0),
  })
  y -= 20

  page.drawText(`拼板数量: ${boards.length}`, {
    x: margin,
    y,
    size: 12,
    font,
    color: rgb(0, 0, 0),
  })
  y -= 40

  page.drawText('图纸说明:', {
    x: margin,
    y,
    size: 14,
    font: fontBold,
    color: rgb(0, 0, 0),
  })
  y -= 20

  page.drawText('1. 每页显示一块拼板', {
    x: margin,
    y,
    size: 11,
    font,
    color: rgb(0, 0, 0),
  })
  y -= 15

  page.drawText('2. 请参考材料清单购买所需颜色', {
    x: margin,
    y,
    size: 11,
    font,
    color: rgb(0, 0, 0),
  })

  if (options.includeMaterialList && statistics.length > 0) {
    page = pdfDoc.addPage([pageWidth, pageHeight])
    y = pageHeight - margin

    page.drawText('材料清单', {
      x: margin,
      y,
      size: 18,
      font: fontBold,
      color: rgb(0, 0, 0),
    })
    y -= 30

    page.drawText('颜色编号', { x: margin, y, size: 12, font: fontBold, color: rgb(0, 0, 0) })
    page.drawText('颜色名称', { x: margin + 80, y, size: 12, font: fontBold, color: rgb(0, 0, 0) })
    page.drawText('数量', { x: margin + 200, y, size: 12, font: fontBold, color: rgb(0, 0, 0) })
    y -= 20

    for (const stat of statistics.slice(0, 30)) {
      if (y < margin) break
      page.drawText(stat.color.code, { x: margin, y, size: 10, font, color: rgb(0, 0, 0) })
      page.drawText(stat.color.nameZh, { x: margin + 80, y, size: 10, font, color: rgb(0, 0, 0) })
      page.drawText(stat.count.toString(), { x: margin + 200, y, size: 10, font, color: rgb(0, 0, 0) })
      y -= 15
    }
  }

  for (let i = 0; i < boards.length; i++) {
    page = pdfDoc.addPage([pageWidth, pageHeight])
    y = pageHeight - margin

    page.drawText(`Board ${i + 1} / ${boards.length}`, {
      x: margin,
      y,
      size: 16,
      font: fontBold,
      color: rgb(0, 0, 0),
    })
    y -= 20

    page.drawText(`位置: (${boards[i].x}, ${boards[i].y}) | 尺寸: ${boards[i].width} × ${boards[i].height} beads`, {
      x: margin,
      y,
      size: 10,
      font,
      color: rgb(0.4, 0.4, 0.4),
    })
    y -= 30

    const board = boards[i]
    const cellSize = Math.min(
      8,
      (pageWidth - margin * 2) / board.width,
      (pageHeight - y - margin) / board.height
    )

    const boardWidth = board.width * cellSize
    const boardHeight = board.height * cellSize
    const boardX = margin
    const boardY = y - boardHeight

    page.drawRectangle({
      x: boardX,
      y: boardY,
      width: boardWidth,
      height: boardHeight,
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    })

    for (let by = 0; by < board.height; by++) {
      for (let bx = 0; bx < board.width; bx++) {
        const pixelX = board.x + bx
        const pixelY = board.y + by
        const idx = (pixelY * imageData.width + pixelX) * 4

        const r = imageData.data[idx] / 255
        const g = imageData.data[idx + 1] / 255
        const b = imageData.data[idx + 2] / 255

        const cellX = boardX + bx * cellSize
        const cellY = boardY + (board.height - 1 - by) * cellSize

        page.drawRectangle({
          x: cellX + 1,
          y: cellY + 1,
          width: cellSize - 2,
          height: cellSize - 2,
          color: rgb(r, g, b),
        })
      }
    }
  }

  const pdfBytes = await pdfDoc.save()
  const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' })
  saveAs(blob, `beadstudio-${Date.now()}.pdf`)
}
