import { Telegraf } from 'telegraf'
import { DEFAULT_INLINE_KEYBOARD, renderMessage } from '../../rendering'
import { BotContext } from '../../types/BotContext'
import { PreMessage } from '../../types/PreMessage'

export const refreshAction = Telegraf.action<BotContext>('refresh', async (ctx) => {
  const { callbackQuery: query } = ctx
  const { message } = query
  const originalMessage = (message as any).reply_to_message as PreMessage

  const { image } = await renderMessage(originalMessage, ctx.user.theme)

  if (!image) {
    return ctx.answerCbQuery('Error while rendering code to refresh image')
  }

  await ctx
    .editMessageMedia(
      { type: 'photo', media: { source: image } },
      { reply_markup: { inline_keyboard: DEFAULT_INLINE_KEYBOARD } }
    )
    .catch(() => {})

  return ctx.answerCbQuery('Image refreshed')
})
