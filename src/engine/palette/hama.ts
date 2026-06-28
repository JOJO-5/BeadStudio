/**
 * Hama Bead Color Palette
 * Source: https://www.pixel-beads.com/zh/hama-bead-color-chart
 * Total: 53 colors
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

// Helper to convert HEX to RGB
function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : [0, 0, 0]
}

export const hamaPalette: Palette = {
  id: 'hama-palette',
  brandId: 'hama',
  name: 'Hama',
  nameZh: 'Hama（53色）',
  colors: [
    { code: 'H01', name: 'White', nameZh: '白色', rgb: hexToRgb('#ECEDED'), hex: '#ECEDED' },
    { code: 'H02', name: 'Cream', nameZh: '米色', rgb: hexToRgb('#F0E8B9'), hex: '#F0E8B9' },
    { code: 'H03', name: 'Yellow', nameZh: '黄色', rgb: hexToRgb('#F0B901'), hex: '#F0B901' },
    { code: 'H04', name: 'Orange', nameZh: '橙色', rgb: hexToRgb('#E64F27'), hex: '#E64F27' },
    { code: 'H05', name: 'Red', nameZh: '红色', rgb: hexToRgb('#B63136'), hex: '#B63136' },
    { code: 'H06', name: 'Pink', nameZh: '粉色', rgb: hexToRgb('#E1889F'), hex: '#E1889F' },
    { code: 'H07', name: 'Purple', nameZh: '紫色', rgb: hexToRgb('#694A82'), hex: '#694A82' },
    { code: 'H08', name: 'Dark Blue', nameZh: '深蓝', rgb: hexToRgb('#2C4690'), hex: '#2C4690' },
    { code: 'H09', name: 'Blue', nameZh: '蓝色', rgb: hexToRgb('#305CB0'), hex: '#305CB0' },
    { code: 'H10', name: 'Dark Green', nameZh: '深绿', rgb: hexToRgb('#256847'), hex: '#256847' },
    { code: 'H11', name: 'Green', nameZh: '绿色', rgb: hexToRgb('#49AE89'), hex: '#49AE89' },
    { code: 'H12', name: 'Brown', nameZh: '棕色', rgb: hexToRgb('#534137'), hex: '#534137' },
    { code: 'H17', name: 'Gray', nameZh: '灰色', rgb: hexToRgb('#83888A'), hex: '#83888A' },
    { code: 'H18', name: 'Black', nameZh: '黑色', rgb: hexToRgb('#2E2F31'), hex: '#2E2F31' },
    { code: 'H20', name: 'Dark Red', nameZh: '暗红', rgb: hexToRgb('#7F332A'), hex: '#7F332A' },
    { code: 'H21', name: 'Light Brown', nameZh: '浅棕', rgb: hexToRgb('#A5693F'), hex: '#A5693F' },
    { code: 'H22', name: 'Burgundy', nameZh: '酒红', rgb: hexToRgb('#A52D36'), hex: '#A52D36' },
    { code: 'H26', name: 'Peach', nameZh: '桃色', rgb: hexToRgb('#DE9B90'), hex: '#DE9B90' },
    { code: 'H27', name: 'Beige', nameZh: '米色', rgb: hexToRgb('#DEB48B'), hex: '#DEB48B' },
    { code: 'H28', name: 'Dark Gray', nameZh: '深灰', rgb: hexToRgb('#363F38'), hex: '#363F38' },
    { code: 'H29', name: 'Rose', nameZh: '玫瑰', rgb: hexToRgb('#B9395E'), hex: '#B9395E' },
    { code: 'H30', name: 'Dark Brown', nameZh: '深棕', rgb: hexToRgb('#592F38'), hex: '#592F38' },
    { code: 'H31', name: 'Light Blue', nameZh: '浅蓝', rgb: hexToRgb('#6797AE'), hex: '#6797AE' },
    { code: 'H33', name: 'Neon Red', nameZh: '霓虹红', rgb: hexToRgb('#FF3956'), hex: '#FF3956' },
    { code: 'H43', name: 'Neon Yellow', nameZh: '霓虹黄', rgb: hexToRgb('#F0EA37'), hex: '#F0EA37' },
    { code: 'H44', name: 'Coral', nameZh: '珊瑚', rgb: hexToRgb('#EE6972'), hex: '#EE6972' },
    { code: 'H45', name: 'Lavender', nameZh: '薰衣草', rgb: hexToRgb('#886DB9'), hex: '#886DB9' },
    { code: 'H46', name: 'Sky Blue', nameZh: '天蓝', rgb: hexToRgb('#629ED7'), hex: '#629ED7' },
    { code: 'H47', name: 'Light Green', nameZh: '浅绿', rgb: hexToRgb('#83CB70'), hex: '#83CB70' },
    { code: 'H48', name: 'Magenta', nameZh: '品红', rgb: hexToRgb('#CF70B7'), hex: '#CF70B7' },
    { code: 'H49', name: 'Turquoise', nameZh: '绿松石', rgb: hexToRgb('#4998BC'), hex: '#4998BC' },
    { code: 'H60', name: 'Gold', nameZh: '金色', rgb: hexToRgb('#F49422'), hex: '#F49422' },
    { code: 'H70', name: 'Light Purple', nameZh: '浅紫', rgb: hexToRgb('#B6B6D4'), hex: '#B6B6D4' },
    { code: 'H71', name: 'Charcoal', nameZh: '炭灰', rgb: hexToRgb('#464541'), hex: '#464541' },
    { code: 'H75', name: 'Tan', nameZh: '棕褐', rgb: hexToRgb('#BF7B4D'), hex: '#BF7B4D' },
    { code: 'H76', name: 'Dark Brown', nameZh: '深棕', rgb: hexToRgb('#663317'), hex: '#663317' },
    { code: 'H77', name: 'Off White', nameZh: '米白', rgb: hexToRgb('#EDE7DF'), hex: '#EDE7DF' },
    { code: 'H78', name: 'Flesh', nameZh: '肉色', rgb: hexToRgb('#FFC99A'), hex: '#FFC99A' },
    { code: 'H79', name: 'Dark Orange', nameZh: '深橙', rgb: hexToRgb('#F08643'), hex: '#F08643' },
    { code: 'H82', name: 'Dark Pink', nameZh: '深粉', rgb: hexToRgb('#962F5C'), hex: '#962F5C' },
    { code: 'H83', name: 'Teal', nameZh: '青色', rgb: hexToRgb('#0178A4'), hex: '#0178A4' },
    { code: 'H84', name: 'Olive', nameZh: '橄榄', rgb: hexToRgb('#8B924C'), hex: '#8B924C' },
    { code: 'H95', name: 'Light Pink', nameZh: '浅粉', rgb: hexToRgb('#F8CCE0'), hex: '#F8CCE0' },
    { code: 'H96', name: 'Lilac', nameZh: '丁香', rgb: hexToRgb('#D4B1E3'), hex: '#D4B1E3' },
    { code: 'H97', name: 'Baby Blue', nameZh: '婴儿蓝', rgb: hexToRgb('#A2D3FE'), hex: '#A2D3FE' },
    { code: 'H98', name: 'Mint', nameZh: '薄荷', rgb: hexToRgb('#9ADBB1'), hex: '#9ADBB1' },
    { code: 'H101', name: 'Sage', nameZh: '鼠尾草', rgb: hexToRgb('#A9C39B'), hex: '#A9C39B' },
    { code: 'H102', name: 'Forest Green', nameZh: '森林绿', rgb: hexToRgb('#356B2D'), hex: '#356B2D' },
    { code: 'H103', name: 'Bright Yellow', nameZh: '亮黄', rgb: hexToRgb('#FFE660'), hex: '#FFE660' },
    { code: 'H104', name: 'Lime', nameZh: '青柠', rgb: hexToRgb('#BCD122'), hex: '#BCD122' },
    { code: 'H105', name: 'Salmon', nameZh: '三文鱼', rgb: hexToRgb('#FFAC78'), hex: '#FFAC78' },
    { code: 'H106', name: 'Light Lavender', nameZh: '浅薰衣草', rgb: hexToRgb('#CCC5ED'), hex: '#CCC5ED' },
    { code: 'H107', name: 'Periwinkle', nameZh: '长春花', rgb: hexToRgb('#6A87C1'), hex: '#6A87C1' },
  ],
}
