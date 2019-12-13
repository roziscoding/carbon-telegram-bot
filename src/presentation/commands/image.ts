import '../middlewares/user-config'
import carbon from '../../util/carbon'
import entity from '../../util/entity'
import { ContextMessageUpdate } from 'telegraf'
import { getKeyboard } from '../../util/keyboard'
import { UserConfig, defaultUserConfig } from '../types/UserConfig'

export function factory () {
  return async function handler (ctx: ContextMessageUpdate) {
    if (!ctx.message) return
    if (!ctx.chat) return

    const deleteOriginalMessage = ctx.userConfig.getWithDefault<UserConfig, boolean>('deleteOriginalMessage', defaultUserConfig.deleteOriginalMessage)

    const message = ctx.message.reply_to_message || ctx.message

    const { chat: { id: chatId } } = ctx
    const messageId = message.message_id

    const sentMessage = await ctx.reply('Processing...', { reply_to_message_id: ctx.message.message_id })

    const url = entity.toUrl(message)

    if (!url) return

    const imageBuffer = await carbon.getScreenshotFromUrl({ url })

    const extra = getKeyboard(url).asExtra().inReplyTo(ctx.message.message_id)

    const { message_id: imageMessageId } = await ctx.telegram.sendPhoto(chatId, { source: imageBuffer }, extra as any)
    await ctx.telegram.deleteMessage(chatId, sentMessage.message_id)

    const refreshData = { from: messageId, to: imageMessageId, hideRefresh: deleteOriginalMessage }

    const secondKeyboard = getKeyboard(url, refreshData).asString()

    await ctx.telegram.editMessageReplyMarkup(chatId, imageMessageId, undefined, secondKeyboard)

    if (deleteOriginalMessage) {
      await ctx.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id).catch(() => { })
    }
  }
}

export default { factory }
