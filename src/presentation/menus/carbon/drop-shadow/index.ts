import dropShadow from './enable'
import dropShadowBlur from './drop-shadow-blur'
import dropShadowOffset from './drop-shadow-offset'
import TelegrafInlineMenu from 'telegraf-inline-menu/dist/source'

export function install (carbonMenu: TelegrafInlineMenu) {
  const dropShadowMenu = new TelegrafInlineMenu('Drop shadow')
  dropShadow.install(dropShadowMenu)
  dropShadowBlur.install(dropShadowMenu)
  dropShadowOffset.install(dropShadowMenu)

  carbonMenu.submenu('Drop shadow', 'dropshadow_menu', dropShadowMenu)
}

export default { install }
