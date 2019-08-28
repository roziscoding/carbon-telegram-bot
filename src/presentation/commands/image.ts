import carbon from '../../util/carbon'
import entity from '../../util/entity'
import { ContextMessageUpdate, Extra, Markup } from 'telegraf'

export function factory () {
  return async function handler (ctx: ContextMessageUpdate) {
    if (!ctx.message) return
    if (!ctx.chat) return

    const sentMessage = await ctx.reply('Processing...', { reply_to_message_id: ctx.message.message_id })

    const url = entity.toUrl(ctx.message)

    if (!url) return

    const imageBuffer = await carbon.getScreenshotFromUrl({ url })

    const keyboard = (m: Markup) => m.inlineKeyboard([
      m.urlButton('Edit on carbon.now.sh', url, false)
    ], {})

    const extra = Extra.markup(keyboard).inReplyTo(ctx.message.message_id)

    await ctx.telegram.sendPhoto(ctx.chat.id, { source: imageBuffer }, extra as any)
    ctx.telegram.deleteMessage(ctx.chat.id, sentMessage.message_id)
  }
}

export default { factory }
