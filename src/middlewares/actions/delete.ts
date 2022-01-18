import { Telegraf } from 'telegraf'

export const deleteAction = Telegraf.action('delete', (ctx) => {
  if (ctx.callbackQuery.from.id !== (ctx.callbackQuery.message as any).reply_to_message.from.id) {
    return
  }

  return ctx
    .deleteMessage(ctx.callbackQuery.message?.message_id)
    .then(() => ctx.answerCbQuery('Message deleted'))
})
