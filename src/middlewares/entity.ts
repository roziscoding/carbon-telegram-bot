import { Theme } from '@prisma/client'
import { Telegraf } from 'telegraf'
import { renderMessageToContext } from '../rendering'
import { BotContext } from '../types/BotContext'
import { PreMessage } from '../types/PreMessage'

export const entity = Telegraf.entityText<BotContext>('pre', /.*/, async (ctx, next) => {
  const message = ctx.message as PreMessage

  const theme = Theme[ctx.user.theme]

  await renderMessageToContext(ctx, message, theme)

  return next()
})
