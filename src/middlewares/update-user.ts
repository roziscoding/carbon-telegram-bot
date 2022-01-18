import { MiddlewareFn } from 'telegraf'
import { BotContext } from '../types/BotContext'

export const updateUser: MiddlewareFn<BotContext> = async (ctx, next) => {
  const from = ctx.message?.from || ctx.callbackQuery?.from
  if (!from) return

  if (ctx.user.name === from!.first_name) return next()

  await ctx.prisma.user.update({
    where: { telegramId: `${from!.id}` },
    data: { name: from!.first_name }
  })

  return next()
}
