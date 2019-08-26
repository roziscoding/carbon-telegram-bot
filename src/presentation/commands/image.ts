import carbon from '../../util/carbon'
import entity from '../../util/entity'
import { ContextMessageUpdate } from 'telegraf'

export function factory () {
  return async function handler (ctx: ContextMessageUpdate) {
    if (!ctx.message) return
    if (!ctx.chat) return

    const sentMessage = await ctx.reply('Processing...', { reply_to_message_id: ctx.message.message_id })

    const url = entity.toUrl(ctx.message)

    if (!url) return

    const imageBuffer = await carbon.getScreenshotFromUrl({ url })


    await ctx.telegram.sendPhoto(ctx.chat.id, { source: imageBuffer }, { reply_to_message_id: ctx.message.message_id })
    ctx.telegram.deleteMessage(ctx.chat.id, sentMessage.message_id)
  }
}

export default { factory }
