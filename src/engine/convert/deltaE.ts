import type { LAB } from './lab'

// ΔE2000 color difference formula (CIEDE2000)
export function calculateDeltaE00(lab1: LAB, lab2: LAB): number {
  const { L: L1, a: a1, b: b1 } = lab1
  const { L: L2, a: a2, b: b2 } = lab2

  const kL = 1
  const kC = 1
  const kH = 1

  const C1 = Math.sqrt(a1 * a1 + b1 * b1)
  const C2 = Math.sqrt(a2 * a2 + b2 * b2)
  const Cb = (C1 + C2) / 2

  const G = 0.5 * (1 - Math.sqrt(Cb ** 7 / (Cb ** 7 + 25 ** 7)))

  const a1p = a1 * (1 + G)
  const a2p = a2 * (1 + G)

  const C1p = Math.sqrt(a1p * a1p + b1 * b1)
  const C2p = Math.sqrt(a2p * a2p + b2 * b2)

  const h1p = Math.atan2(b1, a1p) * 180 / Math.PI
  const h1pAdjusted = h1p < 0 ? h1p + 360 : h1p

  const h2p = Math.atan2(b2, a2p) * 180 / Math.PI
  const h2pAdjusted = h2p < 0 ? h2p + 360 : h2p

  const dLp = L2 - L1
  const dCp = C2p - C1p

  let dhp: number
  if (C1p * C2p === 0) {
    dhp = 0
  } else if (Math.abs(h2pAdjusted - h1pAdjusted) <= 180) {
    dhp = h2pAdjusted - h1pAdjusted
  } else if (h2pAdjusted - h1pAdjusted > 180) {
    dhp = h2pAdjusted - h1pAdjusted - 360
  } else {
    dhp = h2pAdjusted - h1pAdjusted + 360
  }

  const dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin((dhp * Math.PI) / 360)

  const Lb = (L1 + L2) / 2
  const Cbp = (C1p + C2p) / 2

  let Hb: number
  if (C1p * C2p === 0) {
    Hb = h1pAdjusted + h2pAdjusted
  } else if (Math.abs(h1pAdjusted - h2pAdjusted) <= 180) {
    Hb = (h1pAdjusted + h2pAdjusted) / 2
  } else if (h1pAdjusted + h2pAdjusted < 360) {
    Hb = (h1pAdjusted + h2pAdjusted + 360) / 2
  } else {
    Hb = (h1pAdjusted + h2pAdjusted - 360) / 2
  }

  const T = 1 -
    0.17 * Math.cos((Hb - 30) * Math.PI / 180) +
    0.24 * Math.cos(2 * Hb * Math.PI / 180) +
    0.32 * Math.cos((3 * Hb + 6) * Math.PI / 180) -
    0.20 * Math.cos((4 * Hb - 63) * Math.PI / 180)

  const dTheta = 30 * Math.exp(-(((Hb - 275) / 25) ** 2))

  const RC = 2 * Math.sqrt(Cbp ** 7 / (Cbp ** 7 + 25 ** 7))

  const SL = 1 + (0.015 * (Lb - 50) ** 2) / Math.sqrt(20 + (Lb - 50) ** 2)
  const SC = 1 + 0.045 * Cbp
  const SH = 1 + 0.015 * Cbp * T
  const RT = -Math.sin(2 * dTheta * Math.PI / 180) * RC

  const dE = Math.sqrt(
    (dLp / (kL * SL)) ** 2 +
    (dCp / (kC * SC)) ** 2 +
    (dHp / (kH * SH)) ** 2 +
    RT * (dCp / (kC * SC)) * (dHp / (kH * SH))
  )

  return dE
}
