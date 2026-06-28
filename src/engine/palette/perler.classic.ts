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

// Perler Classic palette - 216 colors
export const perlerClassic: Palette = {
  id: 'perler-classic',
  brandId: 'perler',
  name: 'Perler Classic',
  nameZh: 'Perler 经典色',
  colors: [
    { code: '00010', name: 'White', nameZh: '白色', rgb: [255, 255, 255], hex: '#FFFFFF' },
    { code: '00011', name: 'Black', nameZh: '黑色', rgb: [0, 0, 0], hex: '#000000' },
    { code: '00012', name: 'Red', nameZh: '红色', rgb: [255, 0, 0], hex: '#FF0000' },
    { code: '00013', name: 'Orange', nameZh: '橙色', rgb: [255, 165, 0], hex: '#FFA500' },
    { code: '00014', name: 'Yellow', nameZh: '黄色', rgb: [255, 255, 0], hex: '#FFFF00' },
    { code: '00015', name: 'Green', nameZh: '绿色', rgb: [0, 255, 0], hex: '#00FF00' },
    { code: '00016', name: 'Blue', nameZh: '蓝色', rgb: [0, 0, 255], hex: '#0000FF' },
    { code: '00017', name: 'Purple', nameZh: '紫色', rgb: [128, 0, 128], hex: '#800080' },
    { code: '00018', name: 'Pink', nameZh: '粉色', rgb: [255, 192, 203], hex: '#FFC0CB' },
    { code: '00019', name: 'Brown', nameZh: '棕色', rgb: [139, 69, 19], hex: '#8B4513' },
    { code: '00020', name: 'Gray', nameZh: '灰色', rgb: [128, 128, 128], hex: '#808080' },
  ],
}
