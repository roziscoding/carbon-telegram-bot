import shiki from '../../util/shiki'
import { getKeyboard } from '../../util/keyboard'
import { ContextMessageUpdate } from 'telegraf'

const regex = /refresh/i

function factory() {
  return async function handleRefresh(ctx: ContextMessageUpdate) {
    if (!ctx.chat) return console.log('No ctx.chat')
    if (
      !ctx.callbackQuery ||
      !ctx.callbackQuery.message ||
      !ctx.callbackQuery.message.reply_to_message
    )
      return

    ctx.replyWithChatAction('upload_photo')
    ctx.answerCbQuery('Refreshing...')

    const {
      callbackQuery: { message }
    } = ctx
    const { reply_to_message: originalMessage } = message

    const imageBuffer = await shiki.highlightMessage(message)

    const inputMedia = {
      type: 'photo',
      media: { source: imageBuffer }
    }

    const keyboard = getKeyboard({
      from: originalMessage!.message_id,
      to: message.message_id
    }).asString()

    await (ctx.telegram as any)
      .editMessageMedia(ctx.chat.id, message.message_id, undefined, inputMedia, keyboard)
      .catch(() => {})
  }
}

export default { factory, regex }
