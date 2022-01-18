import { MiddlewareFn } from 'telegraf'
import { BotContext } from '../types/BotContext'

export const getUser: MiddlewareFn<BotContext> = async (ctx, next) => {
  const from = ctx.message?.from || ctx.callbackQuery?.from
  if (!from) return

  const user = await ctx.prisma.user.findUnique({ where: { telegramId: `${from!.id}` } })

  if (user) ctx.user = user

  return next()
}
