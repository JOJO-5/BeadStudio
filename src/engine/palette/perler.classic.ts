/**
 * Perler Bead Color Palette
 * Source: https://www.pixel-beads.com/zh/perler-bead-color-chart
 * Total: 57 colors
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

export const perlerClassic: Palette = {
  id: 'perler-classic',
  brandId: 'perler',
  name: 'Perler',
  nameZh: 'Perler（57色）',
  colors: [
    // Whites & Grays
    { code: 'P01', name: 'White', nameZh: '白色', rgb: [241, 241, 241], hex: '#F1F1F1' },
    { code: 'P81', name: 'Light Gray', nameZh: '浅灰色', rgb: [238, 227, 207], hex: '#EEE3CF' },
    { code: 'P17', name: 'Gray', nameZh: '灰色', rgb: [138, 141, 145], hex: '#8A8D91' },
    { code: 'P105', name: 'Silver', nameZh: '银色', rgb: [119, 123, 129], hex: '#777B81' },
    { code: 'P92', name: 'Dark Gray', nameZh: '深灰色', rgb: [77, 81, 86], hex: '#4D5156' },
    { code: 'P18', name: 'Black', nameZh: '黑色', rgb: [46, 47, 50], hex: '#2E2F32' },

    // Reds & Pinks
    { code: 'P100', name: 'Pearl Coral', nameZh: '珍珠珊瑚', rgb: [249, 126, 121], hex: '#F97E79' },
    { code: 'P104', name: 'Pearl Light Pink', nameZh: '珍珠浅粉', rgb: [215, 168, 162], hex: '#D7A8A2' },
    { code: 'P20', name: 'Rust', nameZh: '锈色', rgb: [140, 55, 44], hex: '#8C372C' },
    { code: 'P33', name: 'Peach', nameZh: '桃色', rgb: [238, 186, 178], hex: '#EEBAB2' },
    { code: 'P79', name: 'Light Pink', nameZh: '浅粉色', rgb: [246, 179, 221], hex: '#F6B3DD' },
    { code: 'P83', name: 'Pink', nameZh: '粉色', rgb: [228, 72, 146], hex: '#E44892' },
    { code: 'P06', name: 'Bubblegum', nameZh: '泡泡糖', rgb: [221, 102, 155], hex: '#DD669B' },
    { code: 'P50', name: 'Neon Pink', nameZh: '霓虹粉', rgb: [255, 57, 145], hex: '#FF3991' },
    { code: 'P88', name: 'Raspberry', nameZh: '覆盆子', rgb: [165, 48, 97], hex: '#A53061' },
    { code: 'P38', name: 'Magenta', nameZh: '洋红', rgb: [242, 42, 123], hex: '#F22A7B' },
    { code: 'P96', name: 'Cranberry', nameZh: '蔓越莓', rgb: [128, 25, 34], hex: '#801922' },
    { code: 'P05', name: 'Red', nameZh: '红色', rgb: [240, 24, 32], hex: '#F01820' },
    { code: 'P59', name: 'Hot Coral', nameZh: '热珊瑚', rgb: [255, 56, 81], hex: '#FF3851' },
    { code: 'P63', name: 'Blush', nameZh: '腮红', rgb: [255, 130, 133], hex: '#FF8285' },

    // Oranges & Yellows
    { code: 'P12', name: 'Brown', nameZh: '棕色', rgb: [81, 57, 49], hex: '#513931' },
    { code: 'P04', name: 'Orange', nameZh: '橙色', rgb: [237, 97, 32], hex: '#ED6120' },
    { code: 'P35', name: 'Tan', nameZh: '棕褐色', rgb: [188, 147, 113], hex: '#BC9371' },
    { code: 'P98', name: 'Sand', nameZh: '沙色', rgb: [228, 182, 144], hex: '#E4B690' },
    { code: 'P48', name: 'Neon Orange', nameZh: '霓虹橙', rgb: [255, 119, 0], hex: '#FF7700' },
    { code: 'P85', name: 'Gold', nameZh: '金色', rgb: [187, 118, 52], hex: '#BB7634' },
    { code: 'P90', name: 'Butterscotch', nameZh: '奶油糖', rgb: [212, 132, 55], hex: '#D48437' },
    { code: 'P21', name: 'Light Brown', nameZh: '浅棕色', rgb: [129, 93, 52], hex: '#815D34' },
    { code: 'P57', name: 'Cheddar', nameZh: '切达', rgb: [241, 170, 12], hex: '#F1AA0C' },
    { code: 'P03', name: 'Yellow', nameZh: '黄色', rgb: [236, 216, 0], hex: '#ECD800' },
    { code: 'P103', name: 'Pearl Yellow', nameZh: '珍珠黄', rgb: [202, 192, 51], hex: '#CAC033' },
    { code: 'P02', name: 'Cream', nameZh: '奶油色', rgb: [224, 222, 169], hex: '#E0DEA9' },
    { code: 'P56', name: 'Light Yellow', nameZh: '淡黄色', rgb: [254, 248, 117], hex: '#FEF875' },
    { code: 'P47', name: 'Neon Yellow', nameZh: '霓虹黄', rgb: [220, 224, 2], hex: '#DCE002' },
    { code: 'P97', name: 'Cactus Fruit', nameZh: '仙人掌果', rgb: [189, 218, 1], hex: '#BDDA01' },

    // Greens
    { code: 'P75', name: 'Glow Green', nameZh: '发光绿', rgb: [190, 198, 150], hex: '#BEC696' },
    { code: 'P61', name: 'Kiwi Green', nameZh: '猕猴桃绿', rgb: [108, 190, 19], hex: '#6CBE13' },
    { code: 'P80', name: 'Bright Green', nameZh: '亮绿色', rgb: [79, 173, 66], hex: '#4FAD42' },
    { code: 'P53', name: 'Light Green', nameZh: '淡绿色', rgb: [118, 200, 130], hex: '#76C882' },
    { code: 'P102', name: 'Pearl Green', nameZh: '珍珠绿', rgb: [132, 183, 145], hex: '#84B791' },
    { code: 'P10', name: 'Dark Green', nameZh: '深绿色', rgb: [28, 117, 62], hex: '#1C753E' },
    { code: 'P49', name: 'Neon Green', nameZh: '霓虹绿', rgb: [1, 158, 67], hex: '#019E43' },
    { code: 'P179', name: 'Evergreen', nameZh: '常青绿', rgb: [17, 73, 56], hex: '#114938' },
    { code: 'P11', name: 'Light Green', nameZh: '浅绿色', rgb: [86, 186, 159], hex: '#56BA9F' },
    { code: 'P101', name: 'Pearl Light Blue', nameZh: '珍珠浅蓝', rgb: [122, 174, 162], hex: '#7AAEA2' },
    { code: 'P91', name: 'Parrot Green', nameZh: '鹦鹉绿', rgb: [6, 124, 129], hex: '#067C81' },

    // Blues
    { code: 'P58', name: 'Toothpaste', nameZh: '牙膏色', rgb: [147, 200, 212], hex: '#93C8D4' },
    { code: 'P52', name: 'Light Blue', nameZh: '淡蓝色', rgb: [83, 144, 209], hex: '#5390D1' },
    { code: 'P09', name: 'Sky Blue', nameZh: '天蓝色', rgb: [51, 112, 192], hex: '#3370C0' },
    { code: 'P70', name: 'Periwinkle', nameZh: '长春花蓝', rgb: [100, 124, 190], hex: '#647CBE' },
    { code: 'P93', name: 'Blueberry Cream', nameZh: '蓝莓奶油', rgb: [130, 151, 217], hex: '#8297D9' },
    { code: 'P08', name: 'Dark Blue', nameZh: '深蓝色', rgb: [43, 63, 135], hex: '#2B3F87' },
    { code: 'P62', name: 'Turquoise', nameZh: '绿松石', rgb: [43, 137, 198], hex: '#2B89C6' },

    // Purples
    { code: 'P54', name: 'Light Lavender', nameZh: '淡薰衣草', rgb: [138, 114, 193], hex: '#8A72C1' },
    { code: 'P07', name: 'Purple', nameZh: '紫色', rgb: [96, 64, 137], hex: '#604089' },
    { code: 'P60', name: 'Plum', nameZh: '梅子色', rgb: [162, 75, 156], hex: '#A24B9C' },
    { code: 'P82', name: 'Light Lavender', nameZh: '薰衣草', rgb: [173, 152, 212], hex: '#AD98D4' },
  ],
}
