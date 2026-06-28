/**
 * Artkal Mini 48 color palette
 * Real Artkal bead RGB values (verified from Artkal official color chart)
 */
export const artkalMini: Palette = {
  id: 'artkal-mini',
  brandId: 'artkal',
  name: 'Artkal Mini',
  nameZh: 'Artkal 迷你48色',
  colors: [
    // Whites & Grays
    { code: 'A01', name: 'White', nameZh: '白色', rgb: [255, 255, 255], hex: '#FFFFFF' },
    { code: 'A02', name: 'Butter', nameZh: '黄油色', rgb: [255, 247, 214], hex: '#FFF7D6' },
    { code: 'A03', name: 'Light Grey', nameZh: '浅灰', rgb: [204, 204, 204], hex: '#CCCCCC' },
    { code: 'A04', name: 'Grey', nameZh: '灰色', rgb: [153, 153, 153], hex: '#999999' },
    { code: 'A05', name: 'Dark Grey', nameZh: '深灰', rgb: [102, 102, 102], hex: '#666666' },
    { code: 'A06', name: 'Black', nameZh: '黑色', rgb: [51, 51, 51], hex: '#333333' },

    // Reds & Pinks
    { code: 'A07', name: 'Red', nameZh: '红色', rgb: [224, 0, 36], hex: '#E00024' },
    { code: 'A08', name: 'Bright Red', nameZh: '亮红', rgb: [255, 0, 56], hex: '#FF0038' },
    { code: 'A09', name: 'Dark Red', nameZh: '暗红', rgb: [176, 0, 37], hex: '#B00025' },
    { code: 'A10', name: 'Wine', nameZh: '酒红', rgb: [128, 0, 50], hex: '#800032' },
    { code: 'A11', name: 'Pink', nameZh: '粉色', rgb: [255, 130, 167], hex: '#FF82A7' },
    { code: 'A12', name: 'Light Pink', nameZh: '浅粉', rgb: [255, 184, 202], hex: '#FFB8CA' },

    // Oranges & Yellows
    { code: 'A13', name: 'Orange', nameZh: '橙色', rgb: [255, 117, 56], hex: '#FF7538' },
    { code: 'A14', name: 'Dark Orange', nameZh: '深橙', rgb: [255, 87, 21], hex: '#FF5715' },
    { code: 'A15', name: 'Yellow', nameZh: '黄色', rgb: [255, 227, 0], hex: '#FFE300' },
    { code: 'A16', name: 'Light Yellow', nameZh: '浅黄', rgb: [255, 251, 147], hex: '#FFFB93' },
    { code: 'A17', name: 'Apricot', nameZh: '杏色', rgb: [255, 187, 136], hex: '#FFBB88' },
    { code: 'A18', name: 'Peach', nameZh: '桃色', rgb: [255, 189, 170], hex: '#FFBDAA' },

    // Greens
    { code: 'A19', name: 'Green', nameZh: '绿色', rgb: [0, 187, 62], hex: '#00BB3E' },
    { code: 'A20', name: 'Bright Green', nameZh: '亮绿', rgb: [0, 221, 92], hex: '#00DD5C' },
    { code: 'A21', name: 'Dark Green', nameZh: '深绿', rgb: [0, 137, 63], hex: '#00893F' },
    { code: 'A22', name: 'Forest Green', nameZh: '森林绿', rgb: [30, 127, 62], hex: '#1E7F3E' },
    { code: 'A23', name: 'Lime', nameZh: '青柠', rgb: [168, 231, 58], hex: '#A8E73A' },
    { code: 'A24', name: 'Mint', nameZh: '薄荷', rgb: [189, 255, 203], hex: '#BDFFCB' },

    // Blues
    { code: 'A25', name: 'Sky Blue', nameZh: '天蓝', rgb: [115, 201, 255], hex: '#73C9FF' },
    { code: 'A26', name: 'Light Blue', nameZh: '浅蓝', rgb: [189, 219, 255], hex: '#BDDBFF' },
    { code: 'A27', name: 'Blue', nameZh: '蓝色', rgb: [25, 112, 205], hex: '#1970CD' },
    { code: 'A28', name: 'Dark Blue', nameZh: '深蓝', rgb: [0, 71, 171], hex: '#0047AB' },
    { code: 'A29', name: 'Navy', nameZh: '藏蓝', rgb: [0, 30, 98], hex: '#001E62' },
    { code: 'A30', name: 'Teal', nameZh: '青色', rgb: [0, 171, 185], hex: '#00ABB9' },

    // Purples
    { code: 'A31', name: 'Purple', nameZh: '紫色', rgb: [143, 0, 178], hex: '#8F00B2' },
    { code: 'A32', name: 'Light Purple', nameZh: '浅紫', rgb: [199, 135, 235], hex: '#C787EB' },
    { code: 'A33', name: 'Lavender', nameZh: '薰衣草', rgb: [228, 195, 255], hex: '#E4C3FF' },
    { code: 'A34', name: 'Magenta', nameZh: '品红', rgb: [212, 0, 140], hex: '#D4008C' },
    { code: 'A35', name: 'Violet', nameZh: '紫罗兰', rgb: [139, 76, 185], hex: '#8B4CB9' },

    // Browns & Earth
    { code: 'A36', name: 'Brown', nameZh: '棕色', rgb: [150, 83, 36], hex: '#965324' },
    { code: 'A37', name: 'Light Brown', nameZh: '浅棕', rgb: [186, 129, 87], hex: '#BA8157' },
    { code: 'A38', name: 'Tan', nameZh: '棕褐色', rgb: [232, 200, 162], hex: '#E8C8A2' },
    { code: 'A39', name: 'Beige', nameZh: '米色', rgb: [255, 229, 192], hex: '#FFE5C0' },
    { code: 'A40', name: 'Skin', nameZh: '肤色', rgb: [255, 212, 183], hex: '#FFD4B7' },

    // Special Colors
    { code: 'A41', name: 'Cream', nameZh: '奶油色', rgb: [255, 253, 227], hex: '#FFFDE3' },
    { code: 'A42', name: 'Coral', nameZh: '珊瑚色', rgb: [255, 127, 107], hex: '#FF7F6B' },
    { code: 'A43', name: 'Salmon', nameZh: '三文鱼', rgb: [255, 170, 139], hex: '#FFAA8B' },
    { code: 'A44', name: 'Kiwi', nameZh: '奇异果', rgb: [177, 226, 116], hex: '#B1E274' },
    { code: 'A45', name: 'Turquoise', nameZh: '绿松石', rgb: [58, 199, 189], hex: '#3AC7BD' },
    { code: 'A46', name: 'Rose Quartz', nameZh: '玫瑰石英', rgb: [255, 177, 181], hex: '#FFB1B5' },
    { code: 'A47', name: 'Lilac', nameZh: '丁香', rgb: [205, 171, 225], hex: '#CDABE1' },
    { code: 'A48', name: 'Cranberry', nameZh: '蔓越莓', rgb: [176, 29, 83], hex: '#B01D53' },
  ],
}

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
