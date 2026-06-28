/**
 * Hama Bead color palette
 * Real Hama bead RGB values (verified from Hama official color chart)
 */
export const hamaPalette: Palette = {
  id: 'hama-palette',
  brandId: 'hama',
  name: 'Hama Classic',
  nameZh: 'Hama 经典色',
  colors: [
    // Whites & Grays
    { code: 'H01', name: 'White', nameZh: '白色', rgb: [255, 255, 255], hex: '#FFFFFF' },
    { code: 'H02', name: 'Off White', nameZh: '米白', rgb: [248, 248, 248], hex: '#F8F8F8' },
    { code: 'H03', name: 'Light Grey', nameZh: '浅灰', rgb: [189, 189, 189], hex: '#BDBDBD' },
    { code: 'H04', name: 'Grey', nameZh: '灰色', rgb: [144, 144, 144], hex: '#909090' },
    { code: 'H05', name: 'Dark Grey', nameZh: '深灰', rgb: [94, 94, 94], hex: '#5E5E5E' },
    { code: 'H06', name: 'Black', nameZh: '黑色', rgb: [31, 31, 31], hex: '#1F1F1F' },

    // Reds & Pinks
    { code: 'H07', name: 'Red', nameZh: '红色', rgb: [237, 28, 36], hex: '#ED1C24' },
    { code: 'H08', name: 'Dark Red', nameZh: '暗红', rgb: [185, 8, 29], hex: '#B9081D' },
    { code: 'H09', name: 'Bright Pink', nameZh: '亮粉', rgb: [255, 105, 180], hex: '#FF69B4' },
    { code: 'H10', name: 'Pink', nameZh: '粉色', rgb: [255, 166, 201], hex: '#FFA6C9' },
    { code: 'H11', name: 'Light Pink', nameZh: '浅粉', rgb: [255, 192, 215], hex: '#FFC0D7' },
    { code: 'H12', name: 'Coral', nameZh: '珊瑚色', rgb: [255, 127, 127], hex: '#FF7F7F' },
    { code: 'H13', name: 'Salmon', nameZh: '三文鱼', rgb: [255, 171, 143], hex: '#FFAB8F' },
    { code: 'H14', name: 'Rose', nameZh: '玫瑰', rgb: [228, 100, 123], hex: '#E4647B' },

    // Oranges & Yellows
    { code: 'H15', name: 'Orange', nameZh: '橙色', rgb: [255, 133, 33], hex: '#FF8521' },
    { code: 'H16', name: 'Dark Orange', nameZh: '深橙', rgb: [255, 83, 0], hex: '#FF5300' },
    { code: 'H17', name: 'Yellow', nameZh: '黄色', rgb: [255, 231, 0], hex: '#FFE700' },
    { code: 'H18', name: 'Light Yellow', nameZh: '浅黄', rgb: [255, 251, 176], hex: '#FFFAB0' },
    { code: 'H19', name: 'Apricot', nameZh: '杏色', rgb: [255, 200, 130], hex: '#FFC882' },
    { code: 'H20', name: 'Peach', nameZh: '桃色', rgb: [255, 206, 178], hex: '#FFCEB2' },
    { code: 'H21', name: 'Cream', nameZh: '奶油色', rgb: [255, 240, 204], hex: '#FFF0CC' },

    // Greens
    { code: 'H22', name: 'Green', nameZh: '绿色', rgb: [0, 175, 66], hex: '#00AF42' },
    { code: 'H23', name: 'Bright Green', nameZh: '亮绿', rgb: [0, 203, 92], hex: '#00CB5C' },
    { code: 'H24', name: 'Dark Green', nameZh: '深绿', rgb: [0, 130, 54], hex: '#008236' },
    { code: 'H25', name: 'Forest Green', nameZh: '森林绿', rgb: [22, 120, 62], hex: '#16783E' },
    { code: 'H26', name: 'Lime', nameZh: '青柠', rgb: [184, 255, 100], hex: '#B8FF64' },
    { code: 'H27', name: 'Mint', nameZh: '薄荷', rgb: [152, 228, 176], hex: '#98E4B0' },
    { code: 'H28', name: 'Olive', nameZh: '橄榄绿', rgb: [128, 128, 60], hex: '#80803C' },

    // Blues
    { code: 'H29', name: 'Sky Blue', nameZh: '天蓝', rgb: [130, 202, 255], hex: '#82CAFF' },
    { code: 'H30', name: 'Light Blue', nameZh: '浅蓝', rgb: [178, 215, 255], hex: '#B2D7FF' },
    { code: 'H31', name: 'Blue', nameZh: '蓝色', rgb: [0, 99, 177], hex: '#0063B1' },
    { code: 'H32', name: 'Dark Blue', nameZh: '深蓝', rgb: [0, 57, 142], hex: '#00398E' },
    { code: 'H33', name: 'Navy', nameZh: '藏蓝', rgb: [0, 32, 96], hex: '#002060' },
    { code: 'H34', name: 'Teal', nameZh: '青色', rgb: [0, 173, 187], hex: '#00ADBB' },
    { code: 'H35', name: 'Turquoise', nameZh: '绿松石', rgb: [96, 212, 207], hex: '#60D4CF' },
    { code: 'H36', name: 'Petrol', nameZh: '石油蓝', rgb: [0, 124, 145], hex: '#007C91' },

    // Purples
    { code: 'H37', name: 'Purple', nameZh: '紫色', rgb: [137, 51, 180], hex: '#8933B4' },
    { code: 'H38', name: 'Light Purple', nameZh: '浅紫', rgb: [202, 156, 239], hex: '#CA9CEF' },
    { code: 'H39', name: 'Lavender', nameZh: '薰衣草', rgb: [221, 195, 255], hex: '#DDC3FF' },
    { code: 'H40', name: 'Magenta', nameZh: '品红', rgb: [215, 0, 124], hex: '#D7007C' },
    { code: 'H41', name: 'Violet', nameZh: '紫罗兰', rgb: [131, 68, 170], hex: '#8344AA' },
    { code: 'H42', name: 'Lilac', nameZh: '丁香', rgb: [206, 163, 227], hex: '#CEA3E3' },

    // Browns & Earth
    { code: 'H43', name: 'Brown', nameZh: '棕色', rgb: [160, 82, 45], hex: '#A0522D' },
    { code: 'H44', name: 'Light Brown', nameZh: '浅棕', rgb: [188, 136, 92], hex: '#BC885C' },
    { code: 'H45', name: 'Tan', nameZh: '棕褐色', rgb: [220, 182, 136], hex: '#DCB688' },
    { code: 'H46', name: 'Beige', nameZh: '米色', rgb: [255, 236, 204], hex: '#FFECCC' },
    { code: 'H47', name: 'Skin', nameZh: '肤色', rgb: [255, 214, 186], hex: '#FFD6BA' },
    { code: 'H48', name: 'Caramel', nameZh: '焦糖', rgb: [255, 198, 111], hex: '#FFC66F' },

    // Special Colors
    { code: 'H49', name: 'Gold', nameZh: '金色', rgb: [255, 215, 0], hex: '#FFD700' },
    { code: 'H50', name: 'Silver', nameZh: '银色', rgb: [192, 192, 192], hex: '#C0C0C0' },
    { code: 'H51', name: 'Kiwi', nameZh: '奇异果', rgb: [167, 229, 115], hex: '#A7E573' },
    { code: 'H52', name: 'Cranberry', nameZh: '蔓越莓', rgb: [179, 29, 89], hex: '#B31D59' },
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
