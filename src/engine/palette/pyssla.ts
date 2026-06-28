/**
 * Pyssla Bead Color Palette
 * Source: https://www.pixel-beads.com/zh/ikea-pyssla-bead-color-chart
 * Total: 18 colors (12 standard + 6 pastel)
 */

export interface PaletteColor {
  code: string
  name: string
  nameZh: string
  rgb: [number, number, number]
  hex: string
}

export interface Palette {
  id: string
  brandId: string
  name: string
  nameZh: string
  colors: PaletteColor[]
}

export const pysslaPalette: Palette = {
  id: 'pyssla-palette',
  brandId: 'pyssla',
  name: 'Pyssla',
  nameZh: 'Pyssla（18色）',
  colors: [
    { code: 'PS01', name: 'White', nameZh: '白色', rgb: [255, 255, 255], hex: '#FFFFFF' },
    { code: 'PS02', name: 'Yellow', nameZh: '黄色', rgb: [255, 224, 22], hex: '#FFE016' },
    { code: 'PS03', name: 'Yellow Pastel', nameZh: '浅黄', rgb: [247, 238, 69], hex: '#F7EE45' },
    { code: 'PS04', name: 'Orange', nameZh: '橙色', rgb: [242, 116, 26], hex: '#F2741A' },
    { code: 'PS05', name: 'Orange Pastel', nameZh: '浅橙', rgb: [237, 162, 80], hex: '#EDA250' },
    { code: 'PS06', name: 'Red', nameZh: '红色', rgb: [216, 6, 6], hex: '#D80606' },
    { code: 'PS07', name: 'Pink', nameZh: '粉色', rgb: [255, 102, 183], hex: '#FF66B7' },
    { code: 'PS08', name: 'Pink Pastel', nameZh: '浅粉', rgb: [242, 191, 210], hex: '#F2BFD2' },
    { code: 'PS09', name: 'Purple', nameZh: '紫色', rgb: [190, 136, 234], hex: '#BE88EA' },
    { code: 'PS10', name: 'Purple Pastel', nameZh: '浅紫', rgb: [197, 183, 218], hex: '#C5B7DA' },
    { code: 'PS11', name: 'Blue', nameZh: '蓝色', rgb: [6, 87, 216], hex: '#0657D8' },
    { code: 'PS12', name: 'Blue Pastel', nameZh: '浅蓝', rgb: [147, 211, 226], hex: '#93D3E2' },
    { code: 'PS13', name: 'Green', nameZh: '绿色', rgb: [31, 170, 3], hex: '#1FAA03' },
    { code: 'PS14', name: 'Green Pastel', nameZh: '浅绿', rgb: [172, 191, 51], hex: '#ACBF33' },
    { code: 'PS15', name: 'Brown', nameZh: '棕色', rgb: [58, 9, 9], hex: '#3A0909' },
    { code: 'PS16', name: 'Grey Pastel', nameZh: '浅灰', rgb: [158, 156, 157], hex: '#9E9C9D' },
    { code: 'PS17', name: 'Sand Pastel', nameZh: '浅沙', rgb: [224, 190, 168], hex: '#E0BEA8' },
    { code: 'PS18', name: 'Black', nameZh: '黑色', rgb: [0, 0, 0], hex: '#000000' },
  ],
}
