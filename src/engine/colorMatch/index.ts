// Simple RGB-based color matching (fast, effective for limited palettes)
// For better color accuracy, can upgrade to LAB + ΔE later
export { quantizeToPalette, findNearestColor, type QuantizationResult } from './rgbMatcher'
