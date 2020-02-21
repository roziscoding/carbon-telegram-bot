import menus from './menus'
import Telegraf from 'telegraf'
import commands from './commands'
import handlers from './handlers'
import middlewares from './middlewares'
import { IAppConfig } from '../app.config'
const session = require('telegraf/session')
import mongodb from '@nindoo/mongodb-data-layer'
import { defaultUserConfig } from './types/UserConfig'

export async function factory (config: IAppConfig) {
  const bot = new Telegraf(config.telegram.token, { telegram: { webhookReply: false } })

  const settingsMenu = menus.factory()
  const mongodbConnection = await mongodb.createConnection(config.mongodb)

  bot.use(session())
  bot.use(middlewares.sentry.factory())
  bot.use(middlewares.userConfig.factory(mongodbConnection, { defaultConfig: defaultUserConfig }))

  bot.use((ctx, next) => {
    if (!next) return

    if (!config.logMessages) return next()
    if (!ctx.message?.from?.id) return next()

    console.log()
    console.log(`Handling message from ${ctx.message.from?.first_name} <${ctx.message.from.id}>`)
    console.log(ctx.message.text)
    console.log()

    next()
  })

  handlers.install(bot)
  commands.install(bot, settingsMenu)
  bot.action('ok', ctx => ctx.answerCbQuery('OK, hold on :D'))

  return bot
}

export default { factory }
