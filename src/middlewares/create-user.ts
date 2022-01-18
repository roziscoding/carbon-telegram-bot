import { MiddlewareFn } from 'telegraf'
import { BotContext } from '../types/BotContext'

export const createUser: MiddlewareFn<BotContext> = async (ctx, next) => {
  if (ctx.user) return next()

  const from = ctx.message?.from || ctx.callbackQuery?.from
  if (!from) return

  const newUser = await ctx.prisma.user.create({
    data: { telegramId: `${from!.id}`, name: from!.first_name }
  })

  ctx.user = newUser

  return next()
}
