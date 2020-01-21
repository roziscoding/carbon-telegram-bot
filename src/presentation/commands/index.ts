import url from './url'
import repo from './repo'
import help from './help'
import image from './image'
import start from './start'
import settings from './settings'
import Telegraf, { ContextMessageUpdate } from 'telegraf'
import TelegrafInlineMenu from 'telegraf-inline-menu/dist/source'

declare module 'telegraf/typings' {
  export interface Telegraf<TContext extends ContextMessageUpdate> extends Composer<TContext> {
    entity: (entity: string | string[] | RegExp | RegExp[] | Function, ...middleware: Middleware<TContext>[]) => void
  }
}

export function install (bot: Telegraf<ContextMessageUpdate>, settingsMenu: TelegrafInlineMenu) {
  bot.command('/settings', settings.factory(settingsMenu))
  bot.use(settingsMenu.init({ backButtonText: '◀️ Back', mainMenuButtonText: '🏘 Main menu' }))

  bot.help(help.factory())
  bot.start(start.factory())
  bot.entity('pre', image.factory())
  bot.command('/url', url.factory())
  bot.command('/repo', repo.factory())
  bot.command('/image', image.factory())
}

export const commands = {
  url,
  repo,
  help,
  image,
  start,
  settings
}

export default { install }
