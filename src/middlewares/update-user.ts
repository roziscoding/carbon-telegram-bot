import { MiddlewareFn } from 'telegraf'
import { Chat } from 'telegraf/typings/core/types/typegram'
import { BotContext } from '../types/BotContext'

export const updateUser: MiddlewareFn<BotContext> = async (ctx, next) => {
  const from = ctx.message?.from || (ctx.callbackQuery?.message?.chat as Chat.PrivateChat)
  if (!from) return

  if (ctx.user.name === from!.last_name) return next()

  await ctx.prisma.user.update({
    where: { telegramId: `${from!.id}` },
    data: { name: from!.first_name }
  })

  return next()
}
