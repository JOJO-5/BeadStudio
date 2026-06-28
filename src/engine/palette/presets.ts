import type { Palette, PaletteColor } from './perler.classic'
import { perlerClassic } from './perler.classic'
import { artkalMini } from './artkal'
import { hamaPalette } from './hama'
import { mardPalette } from './mard'
import { nabbiPalette } from './nabbi'
import { pysslaPalette } from './pyssla'

export type { Palette, PaletteColor }

export const presetPalettes: Palette[] = [
  perlerClassic,
  artkalMini,
  hamaPalette,
  mardPalette,
  nabbiPalette,
  pysslaPalette,
]

export function getPaletteById(id: string): Palette | undefined {
  return presetPalettes.find((p) => p.id === id)
}

export function getDefaultPalette(): Palette {
  return perlerClassic
}
