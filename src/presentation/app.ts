import { MongoClient } from 'mongodb'
import { createConnection } from '../data/connection'
import { Logger } from 'pino'
import Telegraf, { ContextMessageUpdate } from 'telegraf'
import { AppConfig } from '../app.config'
import ConfigRepository from '../data/repositories/config'
import commands from './commands'
import handlers from './handlers'
import menus from './menus'
import * as middlewares from './middlewares'
const session = require('telegraf/session')

export async function factory(config: AppConfig, logger: Logger) {
  const bot = new Telegraf(config.telegram.token, { telegram: { webhookReply: false } })

  const mongodbConnection = await createConnection(config.mongodb)
  const configRepository = ConfigRepository.factory(mongodbConnection)

  const settingsMenu = menus.factory()

  bot.use(session())
  bot.use(middlewares.config.factory(configRepository))
  bot.use(middlewares.messageLog.factory(logger))

  handlers.install(bot, logger.child({ context: 'handlers' }))
  commands.install(bot, settingsMenu)

  bot.action('ok', (ctx) => ctx.answerCbQuery('OK, hold on :D'))

  bot.catch((err: unknown, ctx: ContextMessageUpdate) => {
    return ctx.reply(`Error processing message: ${err}`)
  })

  return bot
}

export default { factory }
