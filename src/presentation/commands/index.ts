import url from './url'
import repo from './repo'
import help from './help'
import image from './image'
import start from './start'
import config from './config'
import settings from './settings'
import Telegraf, { ContextMessageUpdate } from 'telegraf'
import TelegrafInlineMenu from 'telegraf-inline-menu/dist/source'

declare module 'telegraf/typings' {
  export interface Telegraf<TContext extends ContextMessageUpdate> extends Composer<TContext> {
    entity: (entity: string | string[] | RegExp | RegExp[] | Function, ...middleware: Middleware<TContext>[]) => void
  }
}

export function install (bot: Telegraf<ContextMessageUpdate>, settingsMenu: TelegrafInlineMenu) {
  bot.command('/settings', commands.settings.factory(settingsMenu))
  bot.use(settingsMenu.init({ backButtonText: '◀️ Back', mainMenuButtonText: '🏘 Main menu' }))

  bot.help(commands.help.factory())
  bot.start(commands.start.factory())
  bot.entity('pre', commands.image.factory())
  bot.command('/url', commands.url.factory())
  bot.command('/repo', commands.repo.factory())
  bot.command('/image', commands.image.factory())
  bot.command('/config', commands.config.factory())
}

export const commands = {
  url,
  repo,
  help,
  image,
  start,
  config,
  settings
}

export default { install }
