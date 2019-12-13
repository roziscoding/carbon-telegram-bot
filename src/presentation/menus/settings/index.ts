import TelegrafInlineMenu from 'telegraf-inline-menu'
import deleteOriginalMessage from './delete-original-message'

export function factory () {
  const mainMenu = new TelegrafInlineMenu('Settings')
  mainMenu.setCommand('settings')

  // Adding buttons and submenus
  deleteOriginalMessage.factory(mainMenu)

  return mainMenu
}

export default { factory }
