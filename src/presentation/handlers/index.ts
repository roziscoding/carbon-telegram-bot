import refresh from './refresh'
import deleteHandler from './delete'
import Telegraf, { ContextMessageUpdate } from 'telegraf'

export const handlers = {
  refresh,
  delete: deleteHandler
}

export function install(bot: Telegraf<ContextMessageUpdate>) {
  // Refreshes the code in a message
  bot.action(handlers.refresh.regex, handlers.refresh.factory())

  // Deletes a message sent by the bot
  bot.action(handlers.delete.regex, handlers.delete.factory())
}

export default { install }
