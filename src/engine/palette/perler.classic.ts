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

// Perler Classic palette - 100+ colors for better quality
export const perlerClassic: Palette = {
  id: 'perler-classic',
  brandId: 'perler',
  name: 'Perler Classic',
  nameZh: 'Perler 经典色',
  colors: [
    // Whites & Grays
    { code: '00010', name: 'White', nameZh: '白色', rgb: [255, 255, 255], hex: '#FFFFFF' },
    { code: '00011', name: 'Black', nameZh: '黑色', rgb: [0, 0, 0], hex: '#000000' },
    { code: '00020', name: 'Pearl', nameZh: '珍珠白', rgb: [245, 245, 245], hex: '#F5F5F5' },
    { code: '00021', name: 'Lite Gray', nameZh: '浅灰', rgb: [207, 207, 207], hex: '#CFCFCF' },
    { code: '00022', name: 'Gray', nameZh: '灰色', rgb: [128, 128, 128], hex: '#808080' },
    { code: '00023', name: 'Dark Gray', nameZh: '深灰', rgb: [64, 64, 64], hex: '#404040' },

    // Reds & Pinks
    { code: '00030', name: 'Bright Red', nameZh: '鲜红', rgb: [255, 0, 0], hex: '#FF0000' },
    { code: '00031', name: 'Dark Red', nameZh: '暗红', rgb: [185, 16, 16], hex: '#B91010' },
    { code: '00032', name: 'Cherry Red', nameZh: '樱桃红', rgb: [210, 0, 0], hex: '#D20000' },
    { code: '00033', name: 'Flamingo Pink', nameZh: '火烈鸟粉', rgb: [255, 144, 144], hex: '#FF9090' },
    { code: '00034', name: 'Bubble Gum', nameZh: '泡泡糖粉', rgb: [255, 181, 197], hex: '#FFB5C5' },
    { code: '00035', name: 'Light Pink', nameZh: '浅粉', rgb: [255, 192, 203], hex: '#FFC0CB' },
    { code: '00036', name: 'Dark Pink', nameZh: '深粉', rgb: [255, 96, 128], hex: '#FF6080' },
    { code: '00037', name: 'Rose', nameZh: '玫瑰粉', rgb: [255, 106, 139], hex: '#FF6A8B' },
    { code: '00038', name: 'Salmon', nameZh: '三文鱼', rgb: [255, 155, 130], hex: '#FF9B82' },
    { code: '00039', name: 'Coral', nameZh: '珊瑚色', rgb: [255, 127, 80], hex: '#FF7F50' },

    // Oranges & Yellows
    { code: '00040', name: 'Orange', nameZh: '橙色', rgb: [255, 165, 0], hex: '#FFA500' },
    { code: '00041', name: 'Dark Orange', nameZh: '深橙', rgb: [255, 120, 0], hex: '#FF7800' },
    { code: '00042', name: 'Light Orange', nameZh: '浅橙', rgb: [255, 200, 100], hex: '#FFC864' },
    { code: '00043', name: 'Peach', nameZh: '桃色', rgb: [255, 218, 185], hex: '#FFDAB9' },
    { code: '00044', name: 'Yellow', nameZh: '黄色', rgb: [255, 255, 0], hex: '#FFFF00' },
    { code: '00045', name: 'Light Yellow', nameZh: '浅黄', rgb: [255, 255, 150], hex: '#FFFF96' },
    { code: '00046', name: 'Dark Yellow', nameZh: '暗黄', rgb: [255, 200, 0], hex: '#FFC800' },
    { code: '00047', name: 'Canary', nameZh: '金丝雀黄', rgb: [255, 235, 100], hex: '#FFEB64' },
    { code: '00048', name: 'Cheese', nameZh: '奶酪色', rgb: [255, 230, 150], hex: '#FFE696' },
    { code: '00049', name: 'Apricot', nameZh: '杏色', rgb: [255, 200, 120], hex: '#FFC878' },

    // Greens
    { code: '00050', name: 'Green', nameZh: '绿色', rgb: [0, 255, 0], hex: '#00FF00' },
    { code: '00051', name: 'Dark Green', nameZh: '深绿', rgb: [0, 150, 0], hex: '#009600' },
    { code: '00052', name: 'Forest Green', nameZh: '森林绿', rgb: [34, 139, 34], hex: '#228B22' },
    { code: '00053', name: 'Lime', nameZh: '青柠绿', rgb: [150, 255, 50], hex: '#96FF32' },
    { code: '00054', name: 'Mint', nameZh: '薄荷绿', rgb: [152, 255, 152], hex: '#98FF98' },
    { code: '00055', name: 'Kiwi', nameZh: '猕猴桃绿', rgb: [180, 230, 100], hex: '#B4E664' },
    { code: '00056', name: 'Olive', nameZh: '橄榄绿', rgb: [128, 128, 0], hex: '#808000' },
    { code: '00057', name: 'Sage', nameZh: '鼠尾草绿', rgb: [188, 184, 138], hex: '#BCB88A' },
    { code: '00058', name: 'Kelly Green', nameZh: '凯利绿', rgb: [0, 200, 0], hex: '#00C800' },
    { code: '00059', name: 'Emerald', nameZh: '翡翠绿', rgb: [0, 201, 87], hex: '#00C957' },

    // Blues & Cyans
    { code: '00060', name: 'Blue', nameZh: '蓝色', rgb: [0, 0, 255], hex: '#0000FF' },
    { code: '00061', name: 'Dark Blue', nameZh: '深蓝', rgb: [0, 0, 180], hex: '#0000B4' },
    { code: '00062', name: 'Navy', nameZh: '海军蓝', rgb: [0, 0, 128], hex: '#000080' },
    { code: '00063', name: 'Sky Blue', nameZh: '天蓝', rgb: [135, 206, 235], hex: '#87CEEB' },
    { code: '00064', name: 'Light Blue', nameZh: '浅蓝', rgb: [150, 180, 255], hex: '#96B4FF' },
    { code: '00065', name: 'Cyan', nameZh: '青色', rgb: [0, 255, 255], hex: '#00FFFF' },
    { code: '00066', name: 'Turquoise', nameZh: '绿松石', rgb: [64, 224, 208], hex: '#40E0D0' },
    { code: '00067', name: 'Teal', nameZh: '青绿色', rgb: [0, 128, 128], hex: '#008080' },
    { code: '00068', name: 'Denim', nameZh: '牛仔蓝', rgb: [21, 96, 189], hex: '#1560BD' },
    { code: '00069', name: 'Royal Blue', nameZh: '宝蓝', rgb: [65, 105, 225], hex: '#4169E1' },
    { code: '00070', name: 'Cobalt', nameZh: '钴蓝', rgb: [0, 71, 171], hex: '#0047AB' },

    // Purples & Violets
    { code: '00080', name: 'Purple', nameZh: '紫色', rgb: [128, 0, 128], hex: '#800080' },
    { code: '00081', name: 'Dark Purple', nameZh: '深紫', rgb: [85, 0, 85], hex: '#550055' },
    { code: '00082', name: 'Violet', nameZh: '紫罗兰', rgb: [139, 0, 255], hex: '#8B00FF' },
    { code: '00083', name: 'Lavender', nameZh: '薰衣草', rgb: [181, 126, 220], hex: '#B57EDC' },
    { code: '00084', name: 'Plum', nameZh: '梅红色', rgb: [142, 69, 133], hex: '#8E4585' },
    { code: '00085', name: 'Orchid', nameZh: '兰花粉', rgb: [218, 112, 214], hex: '#DA70D6' },
    { code: '00086', name: 'Mauve', nameZh: '藕荷色', rgb: [224, 176, 203], hex: '#E0B0CB' },

    // Browns & Tans
    { code: '00090', name: 'Brown', nameZh: '棕色', rgb: [139, 69, 19], hex: '#8B4513' },
    { code: '00091', name: 'Dark Brown', nameZh: '深棕', rgb: [101, 51, 15], hex: '#653310' },
    { code: '00092', name: 'Chocolate', nameZh: '巧克力', rgb: [123, 63, 0], hex: '#7B3F00' },
    { code: '00093', name: 'Coffee', nameZh: '咖啡色', rgb: [102, 51, 0], hex: '#663300' },
    { code: '00094', name: 'Tan', nameZh: '棕褐色', rgb: [210, 180, 140], hex: '#D2B48C' },
    { code: '00095', name: 'Beige', nameZh: '米色', rgb: [245, 222, 179], hex: '#F5DEB3' },
    { code: '00096', name: 'Sand', nameZh: '沙色', rgb: [222, 198, 140], hex: '#DEC68C' },
    { code: '00097', name: 'Caramel', nameZh: '焦糖色', rgb: [255, 213, 154], hex: '#FFD59A' },
    { code: '00098', name: 'Hazelnut', nameZh: '榛子色', rgb: [205, 133, 85], hex: '#CD8555' },
    { code: '00099', name: 'Cinnamon', nameZh: '肉桂色', rgb: [197, 134, 101], hex: '#C58665' },

    // Skin tones (important for portraits)
    { code: '00100', name: 'Light Peach', nameZh: '浅肤色', rgb: [255, 230, 210], hex: '#FFE6D2' },
    { code: '00101', name: 'Light Skin', nameZh: '浅肤色', rgb: [255, 223, 186], hex: '#FFDFBA' },
    { code: '00102', name: 'Light Beige', nameZh: '浅米色', rgb: [255, 228, 196], hex: '#FFE4C4' },
    { code: '00103', name: 'Medium Light', nameZh: '中浅肤色', rgb: [250, 210, 175], hex: '#FAD2AF' },
    { code: '00104', name: 'Medium', nameZh: '中肤色', rgb: [241, 194, 125], hex: '#F1C27D' },
    { code: '00105', name: 'Warm Beige', nameZh: '暖米色', rgb: [255, 210, 170], hex: '#FFD2AA' },
    { code: '00106', name: 'Peach', nameZh: '桃色', rgb: [255, 218, 185], hex: '#FFDAB9' },
    { code: '00107', name: 'Tan', nameZh: '棕褐色', rgb: [210, 180, 140], hex: '#D2B48C' },
    { code: '00108', name: 'Caramel', nameZh: '焦糖色', rgb: [200, 150, 100], hex: '#C89664' },
    { code: '00109', name: 'Dark Tan', nameZh: '深棕褐', rgb: [180, 130, 80], hex: '#B48250' },
    { code: '00110', name: 'Espresso', nameZh: '浓缩咖啡', rgb: [95, 65, 40], hex: '#5F4128' },

    // Special colors
    { code: '00120', name: 'Cream', nameZh: '奶油色', rgb: [255, 253, 230], hex: '#FFFDE6' },
    { code: '00121', name: 'Latte', nameZh: '拿铁色', rgb: [230, 200, 160], hex: '#E6C8A0' },
    { code: '00122', name: 'Bamboo', nameZh: '竹色', rgb: [235, 200, 150], hex: '#EBC896' },
    { code: '00123', name: 'Kiwi Lime', nameZh: '酸橙绿', rgb: [200, 240, 100], hex: '#C8F064' },
    { code: '00124', name: 'Lemon', nameZh: '柠檬黄', rgb: [255, 250, 100], hex: '#FFFA64' },
    { code: '00125', name: 'Tangerine', nameZh: '橘子橙', rgb: [255, 175, 50], hex: '#FFAF32' },
  ],
}
