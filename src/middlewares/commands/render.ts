import { Telegraf } from 'telegraf'
import { renderMessageToContext } from '../../rendering'
import { Theme } from '@prisma/client'
import { BotContext } from '../../types/BotContext'
import { PreMessage } from '../../types/PreMessage'

export const renderCommand = Telegraf.command<BotContext>('/render', async (ctx, next) => {
  if (!ctx!.message.reply_to_message) {
    return ctx.reply('You must reply to a message to render it')
  }

  if (
    !(ctx.message.reply_to_message as PreMessage).entities.find((entity) => entity.type === 'pre')
  ) {
    return ctx.reply('The message you replied to does not contain a preformatted piece of code')
  }

  const message = ctx.message.reply_to_message as PreMessage

  const theme = Theme[ctx.user.theme]

  await renderMessageToContext(ctx, message, theme)

  return next()
})
