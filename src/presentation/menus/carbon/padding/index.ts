import vertical from './vertical'
import horizontal from './horizontal'
import TelegrafInlineMenu from 'telegraf-inline-menu/dist/source'

const MENU_TEXT = 'Padding'

export function install (carbonMenu: TelegrafInlineMenu) {
  const paddingMenu = new TelegrafInlineMenu(MENU_TEXT)
  vertical.install(paddingMenu)
  horizontal.install(paddingMenu)

  carbonMenu.submenu(MENU_TEXT, 'padding_menu', paddingMenu)
}

export default { install }
