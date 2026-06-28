/**
 * White background removal for bead artwork
 * Detects and removes light/white backgrounds, replacing with transparency
 */

export interface RmBgOptions {
  /** Background color to remove (default: white) */
  bgColor?: [number, number, number]
  /** Tolerance for background matching (0-255, default: 30) */
  tolerance?: number
  /** Edge feather radius in pixels (default: 2) */
  feather?: number
}

/**
 * Detect if a pixel is background (near white/light color)
 */
function isBackgroundPixel(
  r: number,
  g: number,
  b: number,
  bgColor: [number, number, number],
  tolerance: number
): boolean {
  const dr = r - bgColor[0]
  const dg = g - bgColor[1]
  const db = b - bgColor[2]
  // Use simple RGB distance for speed
  const distance = Math.sqrt(dr * dr + dg * dg + db * db)
  return distance < tolerance
}

/**
 * Flood fill to find connected background region
 */
function floodFillBg(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  startX: number,
  startY: number,
  bgColor: [number, number, number],
  tolerance: number,
  visited: Uint8Array
): Set<number> {
  const result = new Set<number>()
  const stack: [number, number][] = [[startX, startY]]

  while (stack.length > 0) {
    const [x, y] = stack.pop()!
    if (x < 0 || x >= width || y < 0 || y >= height) continue

    const idx = y * width + x
    if (visited[idx]) continue

    const i = idx * 4
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]

    if (!isBackgroundPixel(r, g, b, bgColor, tolerance)) continue

    visited[idx] = 1
    result.add(idx)

    // Add neighbors (4-connected)
    stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1])
  }

  return result
}

/**
 * Remove white/light background from image
 * Returns image with transparent background where background was detected
 */
export function removeWhiteBackground(
  imageData: ImageData,
  options: RmBgOptions = {}
): ImageData {
  const {
    bgColor = [255, 255, 255],
    tolerance = 45,
  } = options

  const { data, width, height } = imageData
  const output = new ImageData(width, height)
  const outData = output.data

  // Copy original data first
  outData.set(data)

  // Track visited pixels
  const visited = new Uint8Array(width * height)

  // Check corners and edges for background color (most common bg locations)
  const edgePixels: [number, number][] = []

  // Top-left corner region
  for (let y = 0; y < Math.min(10, height); y++) {
    for (let x = 0; x < Math.min(10, width); x++) {
      edgePixels.push([x, y])
    }
  }

  // Top-right corner region
  for (let y = 0; y < Math.min(10, height); y++) {
    for (let x = Math.max(0, width - 10); x < width; x++) {
      edgePixels.push([x, y])
    }
  }

  // Bottom-left corner region
  for (let y = Math.max(0, height - 10); y < height; y++) {
    for (let x = 0; x < Math.min(10, width); x++) {
      edgePixels.push([x, y])
    }
  }

  // Bottom-right corner region
  for (let y = Math.max(0, height - 10); y < height; y++) {
    for (let x = Math.max(0, width - 10); x < width; x++) {
      edgePixels.push([x, y])
    }
  }

  // Top edge
  for (let x = 0; x < width; x++) {
    edgePixels.push([x, 0])
  }

  // Left edge
  for (let y = 0; y < height; y++) {
    edgePixels.push([0, y])
  }

  // Collect all background pixels from flood fills
  const bgPixels = new Set<number>()

  for (const [x, y] of edgePixels) {
    const idx = y * width + x
    if (visited[idx]) continue

    const i = idx * 4
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]

    if (isBackgroundPixel(r, g, b, bgColor, tolerance)) {
      const filled = floodFillBg(data, width, height, x, y, bgColor, tolerance, visited)
      filled.forEach((p) => bgPixels.add(p))
    }
  }

  // Make background transparent
  bgPixels.forEach((idx) => {
    const i = idx * 4
    outData[i + 3] = 0 // Set alpha to 0
  })

  return output
}

/**
 * Simple threshold-based background removal
 * Faster but less accurate than flood fill method
 */
export function removeBackgroundSimple(
  imageData: ImageData,
  options: RmBgOptions = {}
): ImageData {
  const {
    bgColor = [255, 255, 255],
    tolerance = 45,
  } = options

  const { data, width, height } = imageData
  const output = new ImageData(width, height)
  const outData = output.data

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]

    if (isBackgroundPixel(r, g, b, bgColor, tolerance)) {
      // Make transparent
      outData[i] = 0
      outData[i + 1] = 0
      outData[i + 2] = 0
      outData[i + 3] = 0
    } else {
      // Keep original
      outData[i] = r
      outData[i + 1] = g
      outData[i + 2] = b
      outData[i + 3] = 255
    }
  }

  return output
}
