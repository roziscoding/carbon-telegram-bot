import theme from './theme'
import deleteOriginalMessage from './delete-original-message'
import TelegrafInlineMenu from 'telegraf-inline-menu'

export function factory() {
  const mainMenu = new TelegrafInlineMenu('Settings')
  mainMenu.setCommand('settings')

  theme.install(mainMenu)
  deleteOriginalMessage.install(mainMenu)

  return mainMenu
}

export default { factory }
