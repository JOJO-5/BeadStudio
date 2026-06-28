/**
 * Artkal Bead Color Palette
 * Source: https://www.pixel-beads.com/zh/artkal-bead-color-chart
 * Total: 159 colors
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

export const artkalMini: Palette = {
  id: 'artkal-mini',
  brandId: 'artkal',
  name: 'Artkal',
  nameZh: 'Artkal（159色）',
  colors: [
    // Greyscale
    { code: 'S01', name: 'White', nameZh: '白色', rgb: hexToRgb('#FFFFFF'), hex: '#FFFFFF' },
    { code: 'S13', name: 'Black', nameZh: '黑色', rgb: hexToRgb('#000000'), hex: '#000000' },
    { code: 'S42', name: 'Silver', nameZh: '银色', rgb: hexToRgb('#A09F9D'), hex: '#A09F9D' },
    { code: 'S69', name: 'Mine Shaft', nameZh: '矿黑', rgb: hexToRgb('#23282B'), hex: '#23282B' },
    { code: 'S78', name: 'Ash Gray', nameZh: '灰烬', rgb: hexToRgb('#D1D1D1'), hex: '#D1D1D1' },
    { code: 'S79', name: 'Light Gray', nameZh: '浅灰', rgb: hexToRgb('#BBBCBC'), hex: '#BBBCBC' },
    { code: 'S07', name: 'Gray', nameZh: '灰色', rgb: hexToRgb('#9B9B9B'), hex: '#9B9B9B' },
    { code: 'S43', name: 'Dark Gray', nameZh: '深灰', rgb: hexToRgb('#767777'), hex: '#767777' },
    { code: 'S89', name: 'Charcoal Gray', nameZh: '炭灰', rgb: hexToRgb('#484949'), hex: '#484949' },

    // Metallics
    { code: 'S41', name: 'Copper', nameZh: '铜色', rgb: hexToRgb('#9A5516'), hex: '#9A5516' },
    { code: 'S63', name: 'Metallic Gold', nameZh: '金属金', rgb: hexToRgb('#4C5914'), hex: '#4C5914' },
    { code: 'S52', name: 'Picasso', nameZh: '毕加索', rgb: hexToRgb('#F2F0A1'), hex: '#F2F0A1' },

    // Yellows
    { code: 'S29', name: 'Pastel Yellow', nameZh: '粉黄', rgb: hexToRgb('#F6EB61'), hex: '#F6EB61' },
    { code: 'S14', name: 'Sandstorm', nameZh: '沙尘', rgb: hexToRgb('#FAE053'), hex: '#FAE053' },
    { code: 'S27', name: 'Yellow', nameZh: '黄色', rgb: hexToRgb('#FFD100'), hex: '#FFD100' },
    { code: 'S48', name: 'Corn', nameZh: '玉米', rgb: hexToRgb('#FFC72C'), hex: '#FFC72C' },
    { code: 'S86', name: 'Goldenrod', nameZh: '金盏花', rgb: hexToRgb('#EAAA00'), hex: '#EAAA00' },
    { code: 'S90', name: 'Pastel Orange', nameZh: '粉橙', rgb: hexToRgb('#FFC56E'), hex: '#FFC56E' },
    { code: 'S03', name: 'Tangerine', nameZh: '橘子', rgb: hexToRgb('#F6AD4C'), hex: '#F6AD4C' },
    { code: 'S39', name: 'Yellow Orange', nameZh: '黄橙', rgb: hexToRgb('#ED8B00'), hex: '#ED8B00' },
    { code: 'S56', name: 'Bright Carrot', nameZh: '亮胡萝卜', rgb: hexToRgb('#FF6A13'), hex: '#FF6A13' },
    { code: 'S04', name: 'Orange', nameZh: '橙色', rgb: hexToRgb('#FF671F'), hex: '#FF671F' },
    { code: 'S66', name: 'Blaze Orange', nameZh: '火焰橙', rgb: hexToRgb('#F4633A'), hex: '#F4633A' },
    { code: 'S65', name: 'Canary', nameZh: '金丝雀', rgb: hexToRgb('#F3EA5D'), hex: '#F3EA5D' },

    // Pinks & Reds
    { code: 'S87', name: 'Coral Red', nameZh: '珊瑚红', rgb: hexToRgb('#FF6D6A'), hex: '#FF6D6A' },
    { code: 'S02', name: 'Burning Sand', nameZh: '燃烧沙', rgb: hexToRgb('#FFA38B'), hex: '#FFA38B' },
    { code: 'S50', name: 'Mandys Pink', nameZh: '粉红', rgb: hexToRgb('#FAAA8D'), hex: '#FAAA8D' },
    { code: 'S35', name: 'Mona Lisa', nameZh: '蒙娜丽莎', rgb: hexToRgb('#F7CED7'), hex: '#F7CED7' },
    { code: 'S28', name: 'Lily Pink', nameZh: '百合粉', rgb: hexToRgb('#EAB8E4'), hex: '#EAB8E4' },
    { code: 'S40', name: 'Carnation Pink', nameZh: '康乃馨粉', rgb: hexToRgb('#F1A7DC'), hex: '#F1A7DC' },
    { code: 'S06', name: 'Raspberry Pink', nameZh: '树莓粉', rgb: hexToRgb('#EC86D0'), hex: '#EC86D0' },
    { code: 'S25', name: 'Hot Pink', nameZh: '热粉', rgb: hexToRgb('#FF34B3'), hex: '#FF34B3' },
    { code: 'S26', name: 'Magenta', nameZh: '品红', rgb: hexToRgb('#DB2152'), hex: '#DB2152' },
    { code: 'S05', name: 'Tall Poppy', nameZh: '红罂粟', rgb: hexToRgb('#E10600'), hex: '#E10600' },
    { code: 'S34', name: 'Red', nameZh: '红色', rgb: hexToRgb('#BA0C2F'), hex: '#BA0C2F' },
    { code: 'S58', name: 'Paprika', nameZh: '辣椒红', rgb: hexToRgb('#A50034'), hex: '#A50034' },
    { code: 'S38', name: 'Burgundy', nameZh: '酒红', rgb: hexToRgb('#AB2556'), hex: '#AB2556' },
    { code: 'S49', name: 'Mulberry Wood', nameZh: '桑葚', rgb: hexToRgb('#72195F'), hex: '#72195F' },
    { code: 'S88', name: 'Dark Pink', nameZh: '深粉', rgb: hexToRgb('#DA1884'), hex: '#DA1884' },

    // Earth Tones
    { code: 'S67', name: 'Vanilla', nameZh: '香草', rgb: hexToRgb('#F3CFB3'), hex: '#F3CFB3' },
    { code: 'S18', name: 'Sand', nameZh: '沙色', rgb: hexToRgb('#CC9966'), hex: '#CC9966' },
    { code: 'S36', name: 'Old Pink', nameZh: '旧粉', rgb: hexToRgb('#C9809E'), hex: '#C9809E' },
    { code: 'S19', name: 'Bubble Gum', nameZh: '泡泡糖', rgb: hexToRgb('#FCBFA9'), hex: '#FCBFA9' },
    { code: 'S51', name: 'Spring Sun', nameZh: '春阳', rgb: hexToRgb('#FCFBCD'), hex: '#FCFBCD' },
    { code: 'S32', name: 'Beeswax', nameZh: '蜂蜡', rgb: hexToRgb('#FFE780'), hex: '#FFE780' },
    { code: 'S68', name: 'Tan', nameZh: '棕褐', rgb: hexToRgb('#E1C078'), hex: '#E1C078' },
    { code: 'S81', name: 'Deer', nameZh: '鹿色', rgb: hexToRgb('#CDB277'), hex: '#CDB277' },
    { code: 'S82', name: 'Clay', nameZh: '黏土', rgb: hexToRgb('#B58150'), hex: '#B58150' },
    { code: 'S17', name: 'Light Brown', nameZh: '浅棕', rgb: hexToRgb('#7B4D35'), hex: '#7B4D35' },
    { code: 'S16', name: 'Brown', nameZh: '棕色', rgb: hexToRgb('#5C4738'), hex: '#5C4738' },
    { code: 'S85', name: 'Red Wine', nameZh: '红酒', rgb: hexToRgb('#42031A'), hex: '#42031A' },
    { code: 'S15', name: 'Redwood', nameZh: '红木', rgb: hexToRgb('#793E2C'), hex: '#793E2C' },
    { code: 'S57', name: 'Buccaneer', nameZh: '海盗', rgb: hexToRgb('#A4493D'), hex: '#A4493D' },
    { code: 'S83', name: 'Sienna', nameZh: '赭石', rgb: hexToRgb('#B86125'), hex: '#B86125' },
    { code: 'S47', name: 'Marigold', nameZh: '万寿菊', rgb: hexToRgb('#B47E00'), hex: '#B47E00' },

    // Greens
    { code: 'S46', name: 'Bright Green', nameZh: '亮绿', rgb: hexToRgb('#73D33C'), hex: '#73D33C' },
    { code: 'S08', name: 'Emerald', nameZh: '翡翠', rgb: hexToRgb('#24DE5B'), hex: '#24DE5B' },
    { code: 'S61', name: 'Key Lemon Pie', nameZh: '柠檬派', rgb: hexToRgb('#CEDC00'), hex: '#CEDC00' },
    { code: 'S70', name: 'Dark Algae', nameZh: '深藻', rgb: hexToRgb('#9BBC11'), hex: '#9BBC11' },
    { code: 'S80', name: 'Dark Olive', nameZh: '深橄榄', rgb: hexToRgb('#999B30'), hex: '#999B30' },
    { code: 'S55', name: 'Pistachio', nameZh: '开心果', rgb: hexToRgb('#ADDC91'), hex: '#ADDC91' },
    { code: 'S21', name: 'Pastel Green', nameZh: '粉绿', rgb: hexToRgb('#87D839'), hex: '#87D839' },
    { code: 'S20', name: 'Green', nameZh: '绿色', rgb: hexToRgb('#249E6B'), hex: '#249E6B' },
    { code: 'S71', name: 'Jade Green', nameZh: '玉石绿', rgb: hexToRgb('#00852B'), hex: '#00852B' },
    { code: 'S62', name: 'Green Tea', nameZh: '绿茶', rgb: hexToRgb('#007C58'), hex: '#007C58' },
    { code: 'S09', name: 'Dark Green', nameZh: '深绿', rgb: hexToRgb('#00685E'), hex: '#00685E' },
    { code: 'S91', name: 'Brunswick Green', nameZh: '不伦瑞克绿', rgb: hexToRgb('#183028'), hex: '#183028' },

    // Blues & Purples
    { code: 'S33', name: 'Maverick', nameZh: '特立独行', rgb: hexToRgb('#C5B4E3'), hex: '#C5B4E3' },
    { code: 'S60', name: 'Lavender', nameZh: '薰衣草', rgb: hexToRgb('#A77BCA'), hex: '#A77BCA' },
    { code: 'S12', name: 'Pastel Lavender', nameZh: '粉薰衣草', rgb: hexToRgb('#A05EB5'), hex: '#A05EB5' },
    { code: 'S23', name: 'Royal Purple', nameZh: '皇家紫', rgb: hexToRgb('#64359B'), hex: '#64359B' },
    { code: 'S59', name: 'Butterfly Bush', nameZh: '蝴蝶花', rgb: hexToRgb('#4A1F87'), hex: '#4A1F87' },
    { code: 'S22', name: 'Purple', nameZh: '紫色', rgb: hexToRgb('#330072'), hex: '#330072' },
    { code: 'S64', name: 'Black Rock', nameZh: '黑岩', rgb: hexToRgb('#050849'), hex: '#050849' },
    { code: 'S44', name: 'Sky Blue', nameZh: '天蓝', rgb: hexToRgb('#8DC8E8'), hex: '#8DC8E8' },
    { code: 'S10', name: 'Baby Blue', nameZh: '婴儿蓝', rgb: hexToRgb('#41B6E6'), hex: '#41B6E6' },
    { code: 'S53', name: 'Blue Enchantress', nameZh: '蓝色魅力', rgb: hexToRgb('#69B3E7'), hex: '#69B3E7' },
    { code: 'S54', name: 'Light Blue', nameZh: '浅蓝', rgb: hexToRgb('#0090DA'), hex: '#0090DA' },
    { code: 'S24', name: 'True Blue', nameZh: '纯蓝', rgb: hexToRgb('#147BD1'), hex: '#147BD1' },
    { code: 'S11', name: 'Dark Blue', nameZh: '深蓝', rgb: hexToRgb('#003399'), hex: '#003399' },
    { code: 'S30', name: 'Shadow Green', nameZh: '阴影绿', rgb: hexToRgb('#99D6EA'), hex: '#99D6EA' },
    { code: 'S31', name: 'Sea Mist', nameZh: '海雾', rgb: hexToRgb('#9EE5B0'), hex: '#9EE5B0' },
    { code: 'S37', name: 'Blue-Green', nameZh: '蓝绿', rgb: hexToRgb('#71D8BF'), hex: '#71D8BF' },
    { code: 'S72', name: 'Light Sea Blue', nameZh: '浅海蓝', rgb: hexToRgb('#59D5D8'), hex: '#59D5D8' },
    { code: 'S45', name: 'Medium Turquoise', nameZh: '中绿松石', rgb: hexToRgb('#00B2A9'), hex: '#00B2A9' },
    { code: 'S76', name: 'Sea Blue', nameZh: '海蓝', rgb: hexToRgb('#00AEC7'), hex: '#00AEC7' },
    { code: 'S73', name: 'Steel Blue', nameZh: '钢蓝', rgb: hexToRgb('#48A9C5'), hex: '#48A9C5' },
    { code: 'S74', name: 'Azure', nameZh: '蔚蓝', rgb: hexToRgb('#00AED6'), hex: '#00AED6' },
    { code: 'S75', name: 'Dark Steel Blue', nameZh: '深钢蓝', rgb: hexToRgb('#0085AD'), hex: '#0085AD' },

    // Extended Colors S92-S159
    { code: 'S92', name: 'Dandelion', nameZh: '蒲公英', rgb: hexToRgb('#DEB947'), hex: '#DEB947' },
    { code: 'S93', name: 'Pale Skin', nameZh: '淡肤色', rgb: hexToRgb('#DAB698'), hex: '#DAB698' },
    { code: 'S94', name: 'Warm Blush', nameZh: '暖腮红', rgb: hexToRgb('#F4A999'), hex: '#F4A999' },
    { code: 'S95', name: 'Salmon', nameZh: '三文鱼', rgb: hexToRgb('#EE7D67'), hex: '#EE7D67' },
    { code: 'S96', name: 'Apricot', nameZh: '杏色', rgb: hexToRgb('#F08661'), hex: '#F08661' },
    { code: 'S97', name: 'Papaya', nameZh: '木瓜', rgb: hexToRgb('#D4722A'), hex: '#D4722A' },
    { code: 'S98', name: 'Himalaya Blue', nameZh: '喜马拉雅蓝', rgb: hexToRgb('#64ACDF'), hex: '#64ACDF' },
    { code: 'S99', name: 'Waterfall', nameZh: '瀑布', rgb: hexToRgb('#64C2DC'), hex: '#64C2DC' },
    { code: 'S100', name: 'Lagoon', nameZh: '泻湖', rgb: hexToRgb('#4F9FB3'), hex: '#4F9FB3' },
    { code: 'S101', name: 'Electric Blue', nameZh: '电蓝', rgb: hexToRgb('#3196DD'), hex: '#3196DD' },
    { code: 'S102', name: 'Pool Blue', nameZh: '池蓝', rgb: hexToRgb('#1B6CB6'), hex: '#1B6CB6' },
    { code: 'S103', name: 'Caribbian Blue', nameZh: '加勒比蓝', rgb: hexToRgb('#083980'), hex: '#083980' },
    { code: 'S104', name: 'Deep Water', nameZh: '深水', rgb: hexToRgb('#0A668B'), hex: '#0A668B' },
    { code: 'S105', name: 'Petrol Blue', nameZh: '石油蓝', rgb: hexToRgb('#085B6E'), hex: '#085B6E' },
    { code: 'S106', name: 'Wedgewood Blue', nameZh: '韦奇伍德蓝', rgb: hexToRgb('#004E78'), hex: '#004E78' },
    { code: 'S107', name: 'Pond Blue', nameZh: '池塘蓝', rgb: hexToRgb('#005574'), hex: '#005574' },
    { code: 'S108', name: 'Seashell Beige', nameZh: '贝壳米', rgb: hexToRgb('#CCBE80'), hex: '#CCBE80' },
    { code: 'S109', name: 'Beige', nameZh: '米色', rgb: hexToRgb('#A49350'), hex: '#A49350' },
    { code: 'S110', name: 'Beach Beige', nameZh: '海滩米', rgb: hexToRgb('#9E883C'), hex: '#9E883C' },
    { code: 'S111', name: 'Caffe Latte', nameZh: '咖啡拿铁', rgb: hexToRgb('#766C2B'), hex: '#766C2B' },
    { code: 'S112', name: 'Oaktree Brown', nameZh: '橡树棕', rgb: hexToRgb('#795F26'), hex: '#795F26' },
    { code: 'S113', name: 'Khaki', nameZh: '卡其', rgb: hexToRgb('#BAB8A2'), hex: '#BAB8A2' },
    { code: 'S114', name: 'Light Greengray', nameZh: '浅绿灰', rgb: hexToRgb('#728C54'), hex: '#728C54' },
    { code: 'S115', name: 'Mossy Green', nameZh: '苔绿', rgb: hexToRgb('#7E7C44'), hex: '#7E7C44' },
    { code: 'S116', name: 'Earth Green', nameZh: '土绿', rgb: hexToRgb('#64692E'), hex: '#64692E' },
    { code: 'S117', name: 'Sage Green', nameZh: '鼠尾草绿', rgb: hexToRgb('#4E582C'), hex: '#4E582C' },
    { code: 'S118', name: 'Pinetree Green', nameZh: '松树绿', rgb: hexToRgb('#4A5E2D'), hex: '#4A5E2D' },
    { code: 'S119', name: 'Frosty Blue', nameZh: '霜蓝', rgb: hexToRgb('#71C452'), hex: '#71C452' },
    { code: 'S120', name: 'Polar Mint', nameZh: '薄荷绿', rgb: hexToRgb('#66CC99'), hex: '#66CC99' },
    { code: 'S121', name: 'Celadon Green', nameZh: '青瓷绿', rgb: hexToRgb('#569A83'), hex: '#569A83' },
    { code: 'S122', name: 'Eucalyptus', nameZh: '桉树绿', rgb: hexToRgb('#14C25B'), hex: '#14C25B' },
    { code: 'S123', name: 'Clover Field', nameZh: '三叶草', rgb: hexToRgb('#18A818'), hex: '#18A818' },
    { code: 'S124', name: 'Pooltable Felt', nameZh: '台球桌绿', rgb: hexToRgb('#04552E'), hex: '#04552E' },
    { code: 'S125', name: 'Snake Green', nameZh: '蛇绿', rgb: hexToRgb('#136B5A'), hex: '#136B5A' },
    { code: 'S126', name: 'Dark Eucalyptus', nameZh: '深桉树绿', rgb: hexToRgb('#054641'), hex: '#054641' },
    { code: 'S127', name: 'Marsmallow Rose', nameZh: '棉花糖玫瑰', rgb: hexToRgb('#D9B6D6'), hex: '#D9B6D6' },
    { code: 'S128', name: 'Light Grape', nameZh: '浅葡萄', rgb: hexToRgb('#AD62A4'), hex: '#AD62A4' },
    { code: 'S129', name: 'Rosebud Pink', nameZh: '玫瑰花苞粉', rgb: hexToRgb('#E68CA3'), hex: '#E68CA3' },
    { code: 'S130', name: 'Fuschia', nameZh: '紫红', rgb: hexToRgb('#DE5479'), hex: '#DE5479' },
    { code: 'S131', name: 'Candy Violet', nameZh: '糖果紫', rgb: hexToRgb('#9E82BA'), hex: '#9E82BA' },
    { code: 'S132', name: 'Flamingo', nameZh: '火烈鸟', rgb: hexToRgb('#E8416B'), hex: '#E8416B' },
    { code: 'S133', name: 'Pink Plum', nameZh: '粉李', rgb: hexToRgb('#B7388F'), hex: '#B7388F' },
    { code: 'S134', name: 'Amethyst', nameZh: '紫水晶', rgb: hexToRgb('#581F7E'), hex: '#581F7E' },
    { code: 'S135', name: 'Moonlight Blue', nameZh: '月光蓝', rgb: hexToRgb('#8CA3D4'), hex: '#8CA3D4' },
    { code: 'S136', name: 'Summer Rain', nameZh: '夏雨', rgb: hexToRgb('#9A9ACC'), hex: '#9A9ACC' },
    { code: 'S137', name: 'Azur Blue', nameZh: '天蓝', rgb: hexToRgb('#5981C1'), hex: '#5981C1' },
    { code: 'S138', name: 'Cornflower Blue', nameZh: '矢车菊蓝', rgb: hexToRgb('#4166B0'), hex: '#4166B0' },
    { code: 'S139', name: 'Forget Me Not', nameZh: '勿忘我', rgb: hexToRgb('#475FAB'), hex: '#475FAB' },
    { code: 'S140', name: 'Indigo', nameZh: '靛蓝', rgb: hexToRgb('#374593'), hex: '#374593' },
    { code: 'S141', name: 'Horizon Blue', nameZh: '地平线蓝', rgb: hexToRgb('#3D56A5'), hex: '#3D56A5' },
    { code: 'S142', name: 'Cobolt', nameZh: '钴蓝', rgb: hexToRgb('#294299'), hex: '#294299' },
    { code: 'S143', name: 'Royal Blue', nameZh: '皇家蓝', rgb: hexToRgb('#25268A'), hex: '#25268A' },
    { code: 'S144', name: 'Marine', nameZh: '海军', rgb: hexToRgb('#1A2F6F'), hex: '#1A2F6F' },
    { code: 'S145', name: 'Pale Yellow Moss', nameZh: '淡黄苔', rgb: hexToRgb('#D3C95D'), hex: '#D3C95D' },
    { code: 'S146', name: 'Bloodrose Red', nameZh: '血玫红', rgb: hexToRgb('#510918'), hex: '#510918' },
    { code: 'S147', name: 'Spearmint', nameZh: '留兰香', rgb: hexToRgb('#64B39E'), hex: '#64B39E' },
    { code: 'S148', name: 'Mocha', nameZh: '摩卡', rgb: hexToRgb('#634338'), hex: '#634338' },
    { code: 'S149', name: 'Creme', nameZh: '奶油', rgb: hexToRgb('#EDD39E'), hex: '#EDD39E' },
    { code: 'S150', name: 'Iris Violet', nameZh: '虹膜紫', rgb: hexToRgb('#6963AB'), hex: '#6963AB' },
    { code: 'S151', name: 'Forrest Green', nameZh: '森林绿', rgb: hexToRgb('#2B3F1F'), hex: '#2B3F1F' },
    { code: 'S152', name: 'Lilac', nameZh: '丁香', rgb: hexToRgb('#9791C5'), hex: '#9791C5' },
    { code: 'S153', name: 'Pale Lilac', nameZh: '淡紫', rgb: hexToRgb('#B8BDE0'), hex: '#B8BDE0' },
    { code: 'S154', name: 'Sahara Sand', nameZh: '撒哈拉沙', rgb: hexToRgb('#F9C898'), hex: '#F9C898' },
    { code: 'S155', name: 'Sunkissed Teint', nameZh: '阳光肤色', rgb: hexToRgb('#C39069'), hex: '#C39069' },
    { code: 'S156', name: 'Steel Grey', nameZh: '钢灰', rgb: hexToRgb('#44505B'), hex: '#44505B' },
    { code: 'S157', name: 'Iron Grey', nameZh: '铁灰', rgb: hexToRgb('#3E4955'), hex: '#3E4955' },
    { code: 'S158', name: 'Pepper', nameZh: '胡椒灰', rgb: hexToRgb('#202830'), hex: '#202830' },
    { code: 'S159', name: 'Oslo Gray', nameZh: '奥斯陆灰', rgb: hexToRgb('#888B8D'), hex: '#888B8D' },
  ],
}
