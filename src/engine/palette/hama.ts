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

export const hamaPalette: Palette = {
  id: 'hama-palette',
  brandId: 'hama',
  name: 'Hama',
  nameZh: 'Hama（53色）',
  colors: [
    { code: 'H01', name: 'White', nameZh: '白色', rgb: [236, 237, 237], hex: '#ECEDED' },
    { code: 'H02', name: 'Cream', nameZh: '米色', rgb: [240, 232, 185], hex: '#F0E8B9' },
    { code: 'H03', name: 'Yellow', nameZh: '黄色', rgb: [240, 185, 1], hex: '#F0B901' },
    { code: 'H04', name: 'Orange', nameZh: '橙色', rgb: [230, 79, 39], hex: '#E64F27' },
    { code: 'H05', name: 'Red', nameZh: '红色', rgb: [182, 49, 54], hex: '#B63136' },
    { code: 'H06', name: 'Pink', nameZh: '粉色', rgb: [225, 137, 159], hex: '#E1889F' },
    { code: 'H07', name: 'Purple', nameZh: '紫色', rgb: [105, 74, 130], hex: '#694A82' },
    { code: 'H08', name: 'Dark Blue', nameZh: '深蓝', rgb: [44, 70, 144], hex: '#2C4690' },
    { code: 'H09', name: 'Blue', nameZh: '蓝色', rgb: [48, 92, 176], hex: '#305CB0' },
    { code: 'H10', name: 'Dark Green', nameZh: '深绿', rgb: [37, 104, 71], hex: '#256847' },
    { code: 'H11', name: 'Green', nameZh: '绿色', rgb: [73, 174, 137], hex: '#49AE89' },
    { code: 'H12', name: 'Brown', nameZh: '棕色', rgb: [83, 65, 55], hex: '#534137' },
    { code: 'H17', name: 'Gray', nameZh: '灰色', rgb: [131, 136, 138], hex: '#83888A' },
    { code: 'H18', name: 'Black', nameZh: '黑色', rgb: [46, 47, 49], hex: '#2E2F31' },
    { code: 'H20', name: 'Dark Red', nameZh: '暗红', rgb: [127, 51, 42], hex: '#7F332A' },
    { code: 'H21', name: 'Light Brown', nameZh: '浅棕', rgb: [165, 105, 63], hex: '#A5693F' },
    { code: 'H22', name: 'Burgundy', nameZh: '酒红', rgb: [165, 45, 54], hex: '#A52D36' },
    { code: 'H26', name: 'Peach', nameZh: '桃色', rgb: [222, 155, 144], hex: '#DE9B90' },
    { code: 'H27', name: 'Beige', nameZh: '米色', rgb: [222, 180, 139], hex: '#DEB48B' },
    { code: 'H28', name: 'Dark Gray', nameZh: '深灰', rgb: [54, 63, 56], hex: '#363F38' },
    { code: 'H29', name: 'Rose', nameZh: '玫瑰', rgb: [185, 57, 94], hex: '#B9395E' },
    { code: 'H30', name: 'Dark Brown', nameZh: '深棕', rgb: [89, 47, 56], hex: '#592F38' },
    { code: 'H31', name: 'Light Blue', nameZh: '浅蓝', rgb: [103, 151, 174], hex: '#6797AE' },
    { code: 'H33', name: 'Neon Red', nameZh: '霓虹红', rgb: [255, 57, 86], hex: '#FF3956' },
    { code: 'H43', name: 'Neon Yellow', nameZh: '霓虹黄', rgb: [240, 234, 55], hex: '#F0EA37' },
    { code: 'H44', name: 'Coral', nameZh: '珊瑚', rgb: [238, 105, 114], hex: '#EE6972' },
    { code: 'H45', name: 'Lavender', nameZh: '薰衣草', rgb: [136, 109, 185], hex: '#886DB9' },
    { code: 'H46', name: 'Sky Blue', nameZh: '天蓝', rgb: [98, 158, 215], hex: '#629ED7' },
    { code: 'H47', name: 'Light Green', nameZh: '浅绿', rgb: [131, 203, 112], hex: '#83CB70' },
    { code: 'H48', name: 'Magenta', nameZh: '品红', rgb: [207, 112, 183], hex: '#CF70B7' },
    { code: 'H49', name: 'Turquoise', nameZh: '绿松石', rgb: [73, 152, 188], hex: '#4998BC' },
    { code: 'H60', name: 'Gold', nameZh: '金色', rgb: [244, 148, 34], hex: '#F49422' },
    { code: 'H70', name: 'Light Purple', nameZh: '浅紫', rgb: [182, 182, 212], hex: '#B6B6D4' },
    { code: 'H71', name: 'Charcoal', nameZh: '炭灰', rgb: [70, 69, 65], hex: '#464541' },
    { code: 'H75', name: 'Tan', nameZh: '棕褐', rgb: [191, 123, 77], hex: '#BF7B4D' },
    { code: 'H76', name: 'Dark Brown', nameZh: '深棕', rgb: [102, 51, 23], hex: '#663317' },
    { code: 'H77', name: 'Off White', nameZh: '米白', rgb: [237, 231, 223], hex: '#EDE7DF' },
    { code: 'H78', name: 'Flesh', nameZh: '肉色', rgb: [255, 201, 154], hex: '#FFC99A' },
    { code: 'H79', name: 'Dark Orange', nameZh: '深橙', rgb: [240, 134, 67], hex: '#F08643' },
    { code: 'H82', name: 'Dark Pink', nameZh: '深粉', rgb: [150, 47, 92], hex: '#962F5C' },
    { code: 'H83', name: 'Teal', nameZh: '青色', rgb: [1, 120, 164], hex: '#0178A4' },
    { code: 'H84', name: 'Olive', nameZh: '橄榄', rgb: [139, 146, 76], hex: '#8B924C' },
    { code: 'H95', name: 'Light Pink', nameZh: '浅粉', rgb: [248, 206, 224], hex: '#F8CCE0' },
    { code: 'H96', name: 'Lilac', nameZh: '丁香', rgb: [212, 177, 227], hex: '#D4B1E3' },
    { code: 'H97', name: 'Baby Blue', nameZh: '婴儿蓝', rgb: [162, 211, 254], hex: '#A2D3FE' },
    { code: 'H98', name: 'Mint', nameZh: '薄荷', rgb: [154, 219, 177], hex: '#9ADBB1' },
    { code: 'H101', name: 'Sage', nameZh: '鼠尾草', rgb: [169, 195, 155], hex: '#A9C39B' },
    { code: 'H102', name: 'Forest Green', nameZh: '森林绿', rgb: [53, 107, 45], hex: '#356B2D' },
    { code: 'H103', name: 'Bright Yellow', nameZh: '亮黄', rgb: [255, 230, 96], hex: '#FFE660' },
    { code: 'H104', name: 'Lime', nameZh: '青柠', rgb: [188, 209, 34], hex: '#BCD122' },
    { code: 'H105', name: 'Salmon', nameZh: '三文鱼', rgb: [255, 172, 120], hex: '#FFAC78' },
    { code: 'H106', name: 'Light Lavender', nameZh: '浅薰衣草', rgb: [204, 197, 237], hex: '#CCC5ED' },
    { code: 'H107', name: 'Periwinkle', nameZh: '长春花', rgb: [106, 135, 193], hex: '#6A87C1' },
  ],
}
