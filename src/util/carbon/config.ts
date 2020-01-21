export const defaultCarbonConfig = {
  // Theme
  t: 'dracula',
  // Language
  l: 'auto',
  // Background
  bg: '#ADB7C1',
  // Window theme
  // none, sharp, bw
  wt: 'none',
  // Window controls
  wc: true,
  // Font family
  fm: 'Hack',
  // Font size
  fs: '18px',
  // Line numbers
  ln: false,
  // Drop shadow
  ds: false,
  // Drop shadow offset
  dsyoff: '20px',
  // Drop shadow blur
  dsblur: '68px',
  // Auto adjust width
  wa: true,
  // Line height
  lh: '133%',
  // Padding vertical
  pv: '0',
  // Padding horizontal
  ph: '0',
  // Squared image
  si: false,
  // Watermark
  wm: false,
  // Export size
  // 1x, 2x, 4x
  es: '2x'
}

export type CarbonConfig = typeof defaultCarbonConfig

export type ReadableCarbonConfig = {
  backgroundColor: CarbonConfig['bg'],
  theme: CarbonConfig['t'],
  windowTheme: CarbonConfig['wt'],
  language: CarbonConfig['l'],
  dropShadow: CarbonConfig['ds'],
  dropShadowOffsetY: CarbonConfig['dsyoff'],
  dropShadowBlurRadius: CarbonConfig['dsblur'],
  windowControls: CarbonConfig['wc'],
  widthAdjustment: CarbonConfig['wa'],
  paddingVertical: CarbonConfig['pv'],
  paddingHorizontal: CarbonConfig['ph'],
  lineNumbers: CarbonConfig['ln'],
  fontFamily: CarbonConfig['fm'],
  fontSize: CarbonConfig['fs'],
  lineHeight: CarbonConfig['lh'],
  squaredImage: CarbonConfig['si'],
  exportSize: CarbonConfig['es'],
  watermark: CarbonConfig['wm']
}

const botToCarbon: Record<keyof ReadableCarbonConfig, keyof CarbonConfig> = {
  backgroundColor: 'bg',
  theme: 't',
  windowTheme: 'wt',
  language: 'l',
  dropShadow: 'ds',
  dropShadowOffsetY: 'dsyoff',
  dropShadowBlurRadius: 'dsblur',
  windowControls: 'wc',
  widthAdjustment: 'wa',
  paddingVertical: 'pv',
  paddingHorizontal: 'ph',
  lineNumbers: 'ln',
  fontFamily: 'fm',
  fontSize: 'fs',
  lineHeight: 'lh',
  squaredImage: 'si',
  exportSize: 'es',
  watermark: 'wm'
}

export function translateToCarbon (config: Partial<ReadableCarbonConfig>) {
  let obj = {} as Partial<CarbonConfig>

  for (const [name, value] of Object.entries(config)) {
    const carbonConfigName = botToCarbon[name as keyof ReadableCarbonConfig]
    if (!carbonConfigName) continue
    obj[carbonConfigName] = value as any
  }

  return obj
}

export function getConfig (settings: Partial<ReadableCarbonConfig>): CarbonConfig {
  return {
    ...defaultCarbonConfig,
    ...translateToCarbon(settings)
  }
}
