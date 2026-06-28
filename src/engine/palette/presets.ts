import type { Palette } from './perler.classic'
import { perlerClassic } from './perler.classic'
import { artkalMini } from './artkal'
import { hamaPalette } from './hama'

export type { Palette, PaletteColor } from './perler.classic'

export const presetPalettes: Palette[] = [perlerClassic, artkalMini, hamaPalette]

export function getPaletteById(id: string): Palette | undefined {
  return presetPalettes.find((p) => p.id === id)
}

export function getDefaultPalette(): Palette {
  return perlerClassic
}
