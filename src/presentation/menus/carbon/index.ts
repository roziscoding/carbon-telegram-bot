import font from './font'
import theme from './theme'
import padding from './padding'
import fontSize from './font-size'
import watermark from './watermark'
import exportSize from './export-size'
import lineHeight from './line-height'
import dropShadow from './drop-shadow'
import lineNumbers from './line-numbers'
import windowTheme from './window-theme'
import squaredImage from './squared-image'
import winddowControls from './window-controls'
import backgroundColor from './background-color'
import autoAdjustWidth from './auto-adjust-width'
import TelegrafInlineMenu from 'telegraf-inline-menu/dist/source'

const MENU_TEXT = 'Carbon.now.sh settings'

export function install (mainMenu: TelegrafInlineMenu) {
  const carbonMenu = new TelegrafInlineMenu(MENU_TEXT)

  // Submenus
  font.install(carbonMenu)
  theme.install(carbonMenu)
  padding.install(carbonMenu)
  exportSize.install(carbonMenu)
  dropShadow.install(carbonMenu)
  windowTheme.install(carbonMenu)

  // Questions
  fontSize.install(carbonMenu)
  lineHeight.install(carbonMenu)
  backgroundColor.install(carbonMenu)

  // Toggles
  watermark.install(carbonMenu)
  lineNumbers.install(carbonMenu)
  squaredImage.install(carbonMenu)
  winddowControls.install(carbonMenu)
  autoAdjustWidth.install(carbonMenu)

  mainMenu.submenu(MENU_TEXT, 'crbset', carbonMenu, { hide: () => false })
}

export default { install }
