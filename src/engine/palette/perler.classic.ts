/**
 * Perler Bead Color Palette
 * Source: https://www.pixel-beads.com/zh/perler-bead-color-chart
 * Total: 57 colors (47 standard + 6 pearl + 4 neon)
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

export const perlerClassic: Palette = {
  id: 'perler-classic',
  brandId: 'perler',
  name: 'Perler',
  nameZh: 'Perler（57色）',
  colors: [
    // Whites & Grays
    { code: 'P01', name: 'White', nameZh: '白色', rgb: hexToRgb('#F1F1F1'), hex: '#F1F1F1' },
    { code: 'P81', name: 'Light Gray', nameZh: '浅灰色', rgb: hexToRgb('#EEE3CF'), hex: '#EEE3CF' },
    { code: 'P17', name: 'Gray', nameZh: '灰色', rgb: hexToRgb('#8A8D91'), hex: '#8A8D91' },
    { code: 'P105', name: 'Silver', nameZh: '银色', rgb: hexToRgb('#777B81'), hex: '#777B81' },
    { code: 'P92', name: 'Dark Gray', nameZh: '深灰色', rgb: hexToRgb('#4D5156'), hex: '#4D5156' },
    { code: 'P18', name: 'Black', nameZh: '黑色', rgb: hexToRgb('#2E2F32'), hex: '#2E2F32' },

    // Reds & Pinks
    { code: 'P100', name: 'Pearl Coral', nameZh: '珍珠珊瑚', rgb: hexToRgb('#F97E79'), hex: '#F97E79' },
    { code: 'P104', name: 'Pearl Light Pink', nameZh: '珍珠浅粉', rgb: hexToRgb('#D7A8A2'), hex: '#D7A8A2' },
    { code: 'P20', name: 'Rust', nameZh: '锈色', rgb: hexToRgb('#8C372C'), hex: '#8C372C' },
    { code: 'P79', name: 'Light Pink', nameZh: '浅粉色', rgb: hexToRgb('#F6B3DD'), hex: '#F6B3DD' },
    { code: 'P83', name: 'Pink', nameZh: '粉色', rgb: hexToRgb('#E44892'), hex: '#E44892' },
    { code: 'P06', name: 'Bubblegum', nameZh: '泡泡糖', rgb: hexToRgb('#DD669B'), hex: '#DD669B' },
    { code: 'P50', name: 'Neon Pink', nameZh: '霓虹粉', rgb: hexToRgb('#FF3991'), hex: '#FF3991' },
    { code: 'P88', name: 'Raspberry', nameZh: '覆盆子', rgb: hexToRgb('#A53061'), hex: '#A53061' },
    { code: 'P38', name: 'Magenta', nameZh: '洋红', rgb: hexToRgb('#F22A7B'), hex: '#F22A7B' },
    { code: 'P96', name: 'Cranberry', nameZh: '蔓越莓', rgb: hexToRgb('#801922'), hex: '#801922' },
    { code: 'P05', name: 'Red', nameZh: '红色', rgb: hexToRgb('#F01820'), hex: '#F01820' },
    { code: 'P59', name: 'Hot Coral', nameZh: '热珊瑚', rgb: hexToRgb('#FF3851'), hex: '#FF3851' },
    { code: 'P63', name: 'Blush', nameZh: '腮红', rgb: hexToRgb('#FF8285'), hex: '#FF8285' },

    // Oranges & Yellows
    { code: 'P33', name: 'Peach', nameZh: '桃色', rgb: hexToRgb('#EEBAB2'), hex: '#EEBAB2' },
    { code: 'P12', name: 'Brown', nameZh: '棕色', rgb: hexToRgb('#513931'), hex: '#513931' },
    { code: 'P04', name: 'Orange', nameZh: '橙色', rgb: hexToRgb('#ED6120'), hex: '#ED6120' },
    { code: 'P35', name: 'Tan', nameZh: '棕褐色', rgb: hexToRgb('#BC9371'), hex: '#BC9371' },
    { code: 'P98', name: 'Sand', nameZh: '沙色', rgb: hexToRgb('#E4B690'), hex: '#E4B690' },
    { code: 'P48', name: 'Neon Orange', nameZh: '霓虹橙', rgb: hexToRgb('#FF7700'), hex: '#FF7700' },
    { code: 'P85', name: 'Gold', nameZh: '金色', rgb: hexToRgb('#BB7634'), hex: '#BB7634' },
    { code: 'P90', name: 'Butterscotch', nameZh: '奶油糖', rgb: hexToRgb('#D48437'), hex: '#D48437' },
    { code: 'P21', name: 'Light Brown', nameZh: '浅棕色', rgb: hexToRgb('#815D34'), hex: '#815D34' },
    { code: 'P57', name: 'Cheddar', nameZh: '切达', rgb: hexToRgb('#F1AA0C'), hex: '#F1AA0C' },
    { code: 'P03', name: 'Yellow', nameZh: '黄色', rgb: hexToRgb('#ECD800'), hex: '#ECD800' },
    { code: 'P103', name: 'Pearl Yellow', nameZh: '珍珠黄', rgb: hexToRgb('#CAC033'), hex: '#CAC033' },
    { code: 'P02', name: 'Cream', nameZh: '奶油色', rgb: hexToRgb('#E0DEA9'), hex: '#E0DEA9' },
    { code: 'P56', name: 'Light Yellow', nameZh: '淡黄色', rgb: hexToRgb('#FEF875'), hex: '#FEF875' },
    { code: 'P47', name: 'Neon Yellow', nameZh: '霓虹黄', rgb: hexToRgb('#DCE002'), hex: '#DCE002' },
    { code: 'P97', name: 'Cactus Fruit', nameZh: '仙人掌果', rgb: hexToRgb('#BDDA01'), hex: '#BDDA01' },

    // Greens
    { code: 'P75', name: 'Glow Green', nameZh: '发光绿', rgb: hexToRgb('#BEC696'), hex: '#BEC696' },
    { code: 'P61', name: 'Kiwi Green', nameZh: '猕猴桃绿', rgb: hexToRgb('#6CBE13'), hex: '#6CBE13' },
    { code: 'P80', name: 'Bright Green', nameZh: '亮绿色', rgb: hexToRgb('#4FAD42'), hex: '#4FAD42' },
    { code: 'P53', name: 'Light Green', nameZh: '淡绿色', rgb: hexToRgb('#76C882'), hex: '#76C882' },
    { code: 'P102', name: 'Pearl Green', nameZh: '珍珠绿', rgb: hexToRgb('#84B791'), hex: '#84B791' },
    { code: 'P10', name: 'Dark Green', nameZh: '深绿色', rgb: hexToRgb('#1C753E'), hex: '#1C753E' },
    { code: 'P49', name: 'Neon Green', nameZh: '霓虹绿', rgb: hexToRgb('#019E43'), hex: '#019E43' },
    { code: 'P179', name: 'Evergreen', nameZh: '常青绿', rgb: hexToRgb('#114938'), hex: '#114938' },
    { code: 'P11', name: 'Mint', nameZh: '薄荷绿', rgb: hexToRgb('#56BA9F'), hex: '#56BA9F' },
    { code: 'P101', name: 'Pearl Light Blue', nameZh: '珍珠浅蓝', rgb: hexToRgb('#7AAEA2'), hex: '#7AAEA2' },
    { code: 'P91', name: 'Parrot Green', nameZh: '鹦鹉绿', rgb: hexToRgb('#067C81'), hex: '#067C81' },

    // Blues
    { code: 'P58', name: 'Toothpaste', nameZh: '牙膏色', rgb: hexToRgb('#93C8D4'), hex: '#93C8D4' },
    { code: 'P52', name: 'Light Blue', nameZh: '淡蓝色', rgb: hexToRgb('#5390D1'), hex: '#5390D1' },
    { code: 'P09', name: 'Sky Blue', nameZh: '天蓝色', rgb: hexToRgb('#3370C0'), hex: '#3370C0' },
    { code: 'P70', name: 'Periwinkle', nameZh: '长春花蓝', rgb: hexToRgb('#647CBE'), hex: '#647CBE' },
    { code: 'P93', name: 'Blueberry Cream', nameZh: '蓝莓奶油', rgb: hexToRgb('#8297D9'), hex: '#8297D9' },
    { code: 'P08', name: 'Deep Blue', nameZh: '深蓝色', rgb: hexToRgb('#2B3F87'), hex: '#2B3F87' },
    { code: 'P62', name: 'Turquoise', nameZh: '绿松石', rgb: hexToRgb('#2B89C6'), hex: '#2B89C6' },

    // Purples
    { code: 'P54', name: 'Light Lavender', nameZh: '淡薰衣草', rgb: hexToRgb('#8A72C1'), hex: '#8A72C1' },
    { code: 'P07', name: 'Purple', nameZh: '紫色', rgb: hexToRgb('#604089'), hex: '#604089' },
    { code: 'P60', name: 'Plum', nameZh: '梅子色', rgb: hexToRgb('#A24B9C'), hex: '#A24B9C' },
    { code: 'P82', name: 'Lavender', nameZh: '薰衣草', rgb: hexToRgb('#AD98D4'), hex: '#AD98D4' },
  ],
}
