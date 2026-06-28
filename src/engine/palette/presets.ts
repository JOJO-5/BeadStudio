import type { Palette } from './perler.classic'
import { perlerClassic } from './perler.classic'

export type { Palette, PaletteColor } from './perler.classic'

export const presetPalettes: Palette[] = [perlerClassic]

export function getPaletteById(id: string): Palette | undefined {
  return presetPalettes.find((p) => p.id === id)
}

export function getDefaultPalette(): Palette {
  return perlerClassic
}
