export interface BoardConfig {
  maxWidth: number  // 最大板宽（mm）
  maxHeight: number  // 最大板高（mm）
  beadSize: number   // 单个 bead 直径（mm）
}

export interface Board {
  id: string
  index: number
  x: number        // 在原图中的起始 X（bead 数量）
  y: number        // 在原图中的起始 Y（bead 数量）
  width: number    // 板宽（bead 数量）
  height: number   // 板高（bead 数量）
}

export interface BoardSplitResult {
  boards: Board[]
  boardWidth: number   // 每块板的 bead 数量
  boardHeight: number  // 每块板的 bead 数量
}

// Default Perler bead board: 29cm x 29cm with ~3mm beads
const DEFAULT_BOARD: BoardConfig = {
  maxWidth: 290,  // 29cm
  maxHeight: 290, // 29cm
  beadSize: 3,     // 3mm diameter
}

export function splitIntoBoards(
  imageWidth: number,   // 图片宽度（bead 数量）
  imageHeight: number,  // 图片高度（bead 数量）
  config: Partial<BoardConfig> = {}
): BoardSplitResult {
  const cfg = { ...DEFAULT_BOARD, ...config }

  // Convert mm to bead count (round down)
  const boardWidth = Math.floor(cfg.maxWidth / cfg.beadSize)
  const boardHeight = Math.floor(cfg.maxHeight / cfg.beadSize)

  const boards: Board[] = []
  let index = 0

  for (let y = 0; y < imageHeight; y += boardHeight) {
    for (let x = 0; x < imageWidth; x += boardWidth) {
      const width = Math.min(boardWidth, imageWidth - x)
      const height = Math.min(boardHeight, imageHeight - y)

      boards.push({
        id: `board-${index}`,
        index,
        x,
        y,
        width,
        height,
      })
      index++
    }
  }

  return { boards, boardWidth, boardHeight }
}
