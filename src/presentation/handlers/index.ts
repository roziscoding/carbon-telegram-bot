import refresh from './refresh'
import deleteHandler from './delete'
import Telegraf, { ContextMessageUpdate } from 'telegraf'
import { Logger } from 'pino'

export const handlers = {
  refresh,
  delete: deleteHandler
}

export function install(bot: Telegraf<ContextMessageUpdate>, logger: Logger) {
  // Refreshes the code in a message
  bot.action(handlers.refresh.regex, handlers.refresh.factory(logger.child({ handler: 'refresh' })))

  // Deletes a message sent by the bot
  bot.action(handlers.delete.regex, handlers.delete.factory(logger.child({ handler: 'delete' })))
}

export default { install }
