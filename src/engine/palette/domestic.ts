/**
 * Domestic Chinese bead brand palettes
 * Brands: 漫漫, 小舞, 盼盼, 黄豆豆, 动木木
 * Note: RGB values are approximations based on typical color ranges
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

// 漫漫 (ManMan) - 国产精选色
export const manmanPalette: Palette = {
  id: 'manman',
  brandId: 'manman',
  name: 'ManMan',
  nameZh: '漫漫',
  colors: [
    { code: 'MM01', name: 'White', nameZh: '白色', rgb: [255, 255, 255], hex: '#FFFFFF' },
    { code: 'MM02', name: 'Black', nameZh: '黑色', rgb: [30, 30, 30], hex: '#1E1E1E' },
    { code: 'MM03', name: 'Red', nameZh: '红色', rgb: [230, 30, 30], hex: '#E61E1E' },
    { code: 'MM04', name: 'Orange', nameZh: '橙色', rgb: [255, 140, 0], hex: '#FF8C00' },
    { code: 'MM05', name: 'Yellow', nameZh: '黄色', rgb: [255, 220, 0], hex: '#FFDC00' },
    { code: 'MM06', name: 'Green', nameZh: '绿色', rgb: [50, 180, 50], hex: '#32B432' },
    { code: 'MM07', name: 'Blue', nameZh: '蓝色', rgb: [30, 100, 200], hex: '#1E64C8' },
    { code: 'MM08', name: 'Purple', nameZh: '紫色', rgb: [140, 50, 180], hex: '#8C32B4' },
    { code: 'MM09', name: 'Pink', nameZh: '粉色', rgb: [255, 120, 160], hex: '#FF78A0' },
    { code: 'MM10', name: 'Brown', nameZh: '棕色', rgb: [140, 80, 50], hex: '#8C5032' },
    { code: 'MM11', name: 'Gray', nameZh: '灰色', rgb: [150, 150, 150], hex: '#969696' },
    { code: 'MM12', name: 'Beige', nameZh: '米色', rgb: [245, 235, 210], hex: '#F5EBD2' },
  ],
}

// 小舞 (XiaoWu) - 国产精选色
export const xiaowuPalette: Palette = {
  id: 'xiaowu',
  brandId: 'xiaowu',
  name: 'XiaoWu',
  nameZh: '小舞',
  colors: [
    { code: 'XW01', name: 'White', nameZh: '白色', rgb: [255, 255, 255], hex: '#FFFFFF' },
    { code: 'XW02', name: 'Black', nameZh: '黑色', rgb: [25, 25, 25], hex: '#191919' },
    { code: 'XW03', name: 'Red', nameZh: '红色', rgb: [220, 20, 20], hex: '#DC1414' },
    { code: 'XW04', name: 'Orange', nameZh: '橙色', rgb: [255, 130, 0], hex: '#FF8200' },
    { code: 'XW05', name: 'Yellow', nameZh: '黄色', rgb: [255, 230, 50], hex: '#FFE632' },
    { code: 'XW06', name: 'Green', nameZh: '绿色', rgb: [40, 170, 40], hex: '#28AA28' },
    { code: 'XW07', name: 'Blue', nameZh: '蓝色', rgb: [20, 90, 190], hex: '#145ABE' },
    { code: 'XW08', name: 'Purple', nameZh: '紫色', rgb: [130, 40, 170], hex: '#8228AA' },
    { code: 'XW09', name: 'Pink', nameZh: '粉色', rgb: [255, 100, 150], hex: '#FF6496' },
    { code: 'XW10', name: 'Brown', nameZh: '棕色', rgb: [130, 70, 40], hex: '#824628' },
    { code: 'XW11', name: 'Gray', nameZh: '灰色', rgb: [140, 140, 140], hex: '#8C8C8C' },
    { code: 'XW12', name: 'Beige', nameZh: '米色', rgb: [240, 225, 195], hex: '#F0E1C3' },
  ],
}

// 盼盼 (PanPan) - 国产精选色
export const panpanPalette: Palette = {
  id: 'panpan',
  brandId: 'panpan',
  name: 'PanPan',
  nameZh: '盼盼',
  colors: [
    { code: 'PP01', name: 'White', nameZh: '白色', rgb: [255, 255, 255], hex: '#FFFFFF' },
    { code: 'PP02', name: 'Black', nameZh: '黑色', rgb: [35, 35, 35], hex: '#232323' },
    { code: 'PP03', name: 'Red', nameZh: '红色', rgb: [225, 25, 25], hex: '#E11919' },
    { code: 'PP04', name: 'Orange', nameZh: '橙色', rgb: [250, 125, 0], hex: '#FA7D00' },
    { code: 'PP05', name: 'Yellow', nameZh: '黄色', rgb: [250, 220, 30], hex: '#FADC1E' },
    { code: 'PP06', name: 'Green', nameZh: '绿色', rgb: [45, 165, 45], hex: '#2DA52D' },
    { code: 'PP07', name: 'Blue', nameZh: '蓝色', rgb: [25, 95, 195], hex: '#195FC3' },
    { code: 'PP08', name: 'Purple', nameZh: '紫色', rgb: [125, 35, 165], hex: '#7D23A5' },
    { code: 'PP09', name: 'Pink', nameZh: '粉色', rgb: [250, 105, 145], hex: '#FA6991' },
    { code: 'PP10', name: 'Brown', nameZh: '棕色', rgb: [125, 65, 35], hex: '#7D4123' },
    { code: 'PP11', name: 'Gray', nameZh: '灰色', rgb: [135, 135, 135], hex: '#878787' },
    { code: 'PP12', name: 'Beige', nameZh: '米色', rgb: [238, 228, 200], hex: '#EEE4C8' },
  ],
}

// 黄豆豆 (HuangDouDou) - 国产精选色
export const huangdoudouPalette: Palette = {
  id: 'huangdoudou',
  brandId: 'huangdoudou',
  name: 'HuangDouDou',
  nameZh: '黄豆豆',
  colors: [
    { code: 'HD01', name: 'White', nameZh: '白色', rgb: [255, 255, 255], hex: '#FFFFFF' },
    { code: 'HD02', name: 'Black', nameZh: '黑色', rgb: [28, 28, 28], hex: '#1C1C1C' },
    { code: 'HD03', name: 'Red', nameZh: '红色', rgb: [235, 35, 35], hex: '#EB2323' },
    { code: 'HD04', name: 'Orange', nameZh: '橙色', rgb: [255, 140, 10], hex: '#FF8C0A' },
    { code: 'HD05', name: 'Yellow', nameZh: '黄色', rgb: [255, 225, 40], hex: '#FFE128' },
    { code: 'HD06', name: 'Green', nameZh: '绿色', rgb: [55, 175, 55], hex: '#37AF37' },
    { code: 'HD07', name: 'Blue', nameZh: '蓝色', rgb: [30, 100, 200], hex: '#1E64C8' },
    { code: 'HD08', name: 'Purple', nameZh: '紫色', rgb: [135, 45, 175], hex: '#872DAF' },
    { code: 'HD09', name: 'Pink', nameZh: '粉色', rgb: [255, 115, 155], hex: '#FF739B' },
    { code: 'HD10', name: 'Brown', nameZh: '棕色', rgb: [135, 75, 45], hex: '#874B2D' },
    { code: 'HD11', name: 'Gray', nameZh: '灰色', rgb: [145, 145, 145], hex: '#919191' },
    { code: 'HD12', name: 'Beige', nameZh: '米色', rgb: [242, 232, 205], hex: '#F2E8CD' },
  ],
}

// 动木木 (DongMuMu) - 国产精选色
export const dongmumuPalette: Palette = {
  id: 'dongmumu',
  brandId: 'dongmumu',
  name: 'DongMuMu',
  nameZh: '动木木',
  colors: [
    { code: 'DM01', name: 'White', nameZh: '白色', rgb: [255, 255, 255], hex: '#FFFFFF' },
    { code: 'DM02', name: 'Black', nameZh: '黑色', rgb: [32, 32, 32], hex: '#202020' },
    { code: 'DM03', name: 'Red', nameZh: '红色', rgb: [228, 28, 28], hex: '#E41C1C' },
    { code: 'DM04', name: 'Orange', nameZh: '橙色', rgb: [255, 135, 5], hex: '#FF8705' },
    { code: 'DM05', name: 'Yellow', nameZh: '黄色', rgb: [255, 228, 35], hex: '#FFE423' },
    { code: 'DM06', name: 'Green', nameZh: '绿色', rgb: [48, 172, 48], hex: '#30AC30' },
    { code: 'DM07', name: 'Blue', nameZh: '蓝色', rgb: [28, 98, 198], hex: '#1C62C6' },
    { code: 'DM08', name: 'Purple', nameZh: '紫色', rgb: [132, 42, 172], hex: '#842AAC' },
    { code: 'DM09', name: 'Pink', nameZh: '粉色', rgb: [255, 108, 152], hex: '#FF6C98' },
    { code: 'DM10', name: 'Brown', nameZh: '棕色', rgb: [132, 72, 42], hex: '#84482A' },
    { code: 'DM11', name: 'Gray', nameZh: '灰色', rgb: [148, 148, 148], hex: '#949494' },
    { code: 'DM12', name: 'Beige', nameZh: '米色', rgb: [245, 235, 208], hex: '#F5EBD0' },
  ],
}
