/**
 * Nabbi Bead Color Palette
 * Source: https://www.pixel-beads.com/zh/nabbi-bead-color-chart
 * Total: 30 colors
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

export const nabbiPalette: Palette = {
  id: 'nabbi-palette',
  brandId: 'nabbi',
  name: 'Nabbi',
  nameZh: 'Nabbi（30色）',
  colors: [
    { code: 'N01', name: 'Black', nameZh: '黑色', rgb: [58, 61, 65], hex: '#3A3D41' },
    { code: 'N02', name: 'Brown', nameZh: '棕色', rgb: [80, 68, 59], hex: '#50443B' },
    { code: 'N03', name: 'Terra', nameZh: '陶土', rgb: [90, 62, 54], hex: '#5A3E36' },
    { code: 'N04', name: 'Raspberry', nameZh: '覆盆子', rgb: [129, 53, 71], hex: '#813547' },
    { code: 'N05', name: 'Orange', nameZh: '橙色', rgb: [167, 98, 36], hex: '#A76224' },
    { code: 'N06', name: 'Beige', nameZh: '米色', rgb: [173, 150, 126], hex: '#AD967E' },
    { code: 'N07', name: 'Apricot', nameZh: '杏色', rgb: [238, 177, 130], hex: '#EEB182' },
    { code: 'N08', name: 'Gray', nameZh: '灰色', rgb: [141, 139, 127], hex: '#8D8B7F' },
    { code: 'N09', name: 'Dark Green', nameZh: '深绿', rgb: [47, 74, 57], hex: '#2F4A39' },
    { code: 'N10', name: 'Light Gray', nameZh: '浅灰', rgb: [211, 203, 203], hex: '#D3CBCB' },
    { code: 'N11', name: 'Purple', nameZh: '紫色', rgb: [100, 69, 145], hex: '#644591' },
    { code: 'N12', name: 'Sand', nameZh: '沙色', rgb: [226, 208, 191], hex: '#E2D0BF' },
    { code: 'N13', name: 'Bright Orange', nameZh: '亮橙', rgb: [243, 96, 27], hex: '#F3601B' },
    { code: 'N14', name: 'Yellow', nameZh: '黄色', rgb: [249, 202, 0], hex: '#F9CA00' },
    { code: 'N15', name: 'White', nameZh: '白色', rgb: [244, 244, 243], hex: '#F4F4F3' },
    { code: 'N16', name: 'Green', nameZh: '绿色', rgb: [41, 122, 59], hex: '#297A3B' },
    { code: 'N17', name: 'Blue', nameZh: '蓝色', rgb: [59, 117, 203], hex: '#3B75CB' },
    { code: 'N18', name: 'Pink', nameZh: '粉色', rgb: [225, 180, 171], hex: '#E1B4AB' },
    { code: 'N19', name: 'Red', nameZh: '红色', rgb: [223, 38, 56], hex: '#DF2638' },
    { code: 'N20', name: 'Tan', nameZh: '棕褐', rgb: [181, 139, 105], hex: '#B58B69' },
    { code: 'N21', name: 'Light Yellow', nameZh: '浅黄', rgb: [245, 236, 141], hex: '#F5EC8D' },
    { code: 'N22', name: 'Bright Green', nameZh: '亮绿', rgb: [72, 175, 79], hex: '#48AF4F' },
    { code: 'N23', name: 'Light Blue', nameZh: '浅蓝', rgb: [113, 163, 230], hex: '#71A3E6' },
    { code: 'N24', name: 'Lavender', nameZh: '薰衣草', rgb: [182, 160, 219], hex: '#B6A0DB' },
    { code: 'N25', name: 'Rose', nameZh: '玫瑰', rgb: [238, 106, 151], hex: '#EE6A97' },
    { code: 'N26', name: 'Coral', nameZh: '珊瑚', rgb: [252, 168, 121], hex: '#FCA879' },
    { code: 'N27', name: 'Dark Brown', nameZh: '深棕', rgb: [135, 95, 82], hex: '#875F52' },
    { code: 'N28', name: 'Sky Blue', nameZh: '天蓝', rgb: [167, 198, 241], hex: '#A7C6F1' },
    { code: 'N29', name: 'Gold', nameZh: '金色', rgb: [238, 149, 39], hex: '#EE9527' },
    { code: 'N30', name: 'Olive', nameZh: '橄榄', rgb: [199, 191, 94], hex: '#C7BF5E' },
  ],
}
