import bot from './bot'
// import carbon from './carbon'
import TelegrafInlineMenu from 'telegraf-inline-menu'

export function factory() {
  const mainMenu = new TelegrafInlineMenu('Settings')
  mainMenu.setCommand('settings')

  bot.install(mainMenu)
  // carbon.install(mainMenu)

  return mainMenu
}

export default { factory }
