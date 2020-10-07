import TelegrafInlineMenu from 'telegraf-inline-menu'

import deleteOriginalMessage from './delete-original-message'

const MENU_TEXT = 'Bot settings'

export function install(mainMenu: TelegrafInlineMenu) {
  const botMenu = new TelegrafInlineMenu(MENU_TEXT)

  // Adding buttons and submenus
  deleteOriginalMessage.install(botMenu)

  mainMenu.submenu(MENU_TEXT, 'botset', botMenu, { hide: () => false })
}

export default { install }
