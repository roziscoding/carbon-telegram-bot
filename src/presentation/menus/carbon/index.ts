import font from './font'
import theme from './theme'
import watermark from './watermark'
import dropShadow from './drop-shadow'
import exportSize from './export-size'
import lineNumbers from './line-numbers'
import windowTheme from './window-theme'
import squaredImage from './squared-image'
import winddowControls from './window-controls'
import autoAdjustWidth from './auto-adjust-width'
import TelegrafInlineMenu from 'telegraf-inline-menu/dist/source'

const MENU_TEXT = 'Carbon.now.sh settings'

export function install (mainMenu: TelegrafInlineMenu) {
  const carbonMenu = new TelegrafInlineMenu(MENU_TEXT)

  // Submenus
  font.install(carbonMenu)
  theme.install(carbonMenu)
  exportSize.install(carbonMenu)
  windowTheme.install(carbonMenu)

  // Toggles
  watermark.install(carbonMenu)
  dropShadow.install(carbonMenu)
  lineNumbers.install(carbonMenu)
  squaredImage.install(carbonMenu)
  winddowControls.install(carbonMenu)
  autoAdjustWidth.install(carbonMenu)

  mainMenu.submenu(MENU_TEXT, 'crbset', carbonMenu, { hide: () => false })
}

export default { install }
