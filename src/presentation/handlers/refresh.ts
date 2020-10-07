import carbon from '../../util/carbon'
import entity from '../../util/entity'
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

    const url = entity.toUrl(originalMessage!, await ctx.config.getAll())

    if (!url) return

    const imageBuffer = await carbon.getScreenshotFromUrl({ url })

    if (!imageBuffer) return console.log('No image buffer')

    const inputMedia = {
      type: 'photo',
      media: { source: imageBuffer }
    }

    const keyboard = getKeyboard(url, {
      from: originalMessage!.message_id,
      to: message.message_id
    }).asString()

    await (ctx.telegram as any)
      .editMessageMedia(ctx.chat.id, message.message_id, undefined, inputMedia, keyboard)
      .catch(() => {})
  }
}

export default { factory, regex }
