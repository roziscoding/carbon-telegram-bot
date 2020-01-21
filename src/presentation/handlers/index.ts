import gist from './gist'
import refresh from './refresh'
import deleteHandler from './delete'
import inlineGist from './inline-gist'
import chosenResultGist from './chosen-result-gist'
import Telegraf, { ContextMessageUpdate } from 'telegraf'

export const handlers = {
  gist,
  refresh,
  delete: deleteHandler,
  inlineGist,
  chosenResultGist
}

export function install (bot: Telegraf<ContextMessageUpdate>) {
  // Refreshes the code in a message
  bot.action(handlers.refresh.regex, handlers.refresh.factory())

  // Deletes a message sent by the bot
  bot.action(handlers.delete.regex, handlers.delete.factory())

  // Create image from gist
  bot.hears(handlers.gist.regex, handlers.gist.factory())

  bot.on('inline_query', handlers.inlineGist.factory())

  bot.on('chosen_inline_result', handlers.chosenResultGist.factory())
}

export default { install }
