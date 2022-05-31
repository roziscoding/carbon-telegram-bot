import menus from './menus'
import Telegraf, { ContextMessageUpdate } from 'telegraf'
import commands from './commands'
import handlers from './handlers'
import * as middlewares from './middlewares'
import { IAppConfig } from '../app.config'
const session = require('telegraf/session')
import mongodb from '@nindoo/mongodb-data-layer'
import ConfigRepository from '../data/repositories/config'

export async function factory(config: IAppConfig) {
  const bot = new Telegraf(config.telegram.token, { telegram: { webhookReply: false } })

  const mongodbConnection = await mongodb.createConnection(config.mongodb)
  const configRepository = ConfigRepository.factory(mongodbConnection)

  const settingsMenu = menus.factory()

  bot.use(session())
  bot.use(middlewares.sentry.factory())
  bot.use(middlewares.config.factory(configRepository))

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
  bot.action('ok', (ctx) => ctx.answerCbQuery('OK, hold on :D'))

  bot.catch((err: unknown, ctx: ContextMessageUpdate) => {
    return ctx.reply(`Error processing message: ${err}`)
  })

  return bot
}

export default { factory }
