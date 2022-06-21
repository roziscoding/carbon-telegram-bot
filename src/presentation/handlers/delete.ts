import { Logger } from 'pino'
import { ContextMessageUpdate } from 'telegraf'

const regex = /delete/i

function factory(_logger: Logger) {
  return async function handleRefresh(ctx: ContextMessageUpdate) {
    if (!ctx.chat) return
    if (
      !ctx.callbackQuery ||
      !ctx.callbackQuery.message ||
      !ctx.callbackQuery.message.reply_to_message
    )
      return

    const { callbackQuery: query } = ctx
    const message = query.message!
    const originalMessage = message.reply_to_message!

    if (originalMessage.from!.id !== query.from!.id) {
      await ctx.answerCbQuery('Only the person who sent the original message can do that')
      return
    }

    await ctx.telegram.deleteMessage(ctx.chat.id, message.message_id)
    await ctx.answerCbQuery('Done')
  }
}

export default { factory, regex }
