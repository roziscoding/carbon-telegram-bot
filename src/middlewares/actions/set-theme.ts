import { Theme } from '@prisma/client'
import { Telegraf } from 'telegraf'
import { BotContext } from '../../types/BotContext'

export const setThemeAction = Telegraf.action<BotContext>(/setTheme (?<theme>.*)/, async (ctx) => {
  const theme = ctx.match.groups && ctx.match.groups['theme']

  if (!theme) return

  if (!Object.keys(Theme).includes(theme)) {
    return ctx.reply('Invalid theme')
  }

  await ctx.prisma.user.update({
    where: {
      id: ctx.user.id
    },
    data: {
      theme: theme as Theme
    }
  })

  return ctx.editMessageText(`✅ Theme set to ${theme}`).then(() => ctx.answerCbQuery())
})
