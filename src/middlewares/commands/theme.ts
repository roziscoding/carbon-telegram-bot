import { Theme } from '@prisma/client'
import { Telegraf } from 'telegraf'
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram'
import { BotContext } from '../../types/BotContext'
import chunk from 'lodash.chunk'

export const themeCommand = Telegraf.command<BotContext>('/theme', async (ctx, next) => {
  if (ctx.chat.type !== 'private') {
    return ctx.reply('This command can only be used in private chats.')
  }

  const themes = Object.keys(Theme)

  const chunks = chunk(themes, 10)
  const columns = chunk(chunks[0]!, 2)

  ctx.reply('Choose your theme:', {
    reply_markup: {
      inline_keyboard: columns
        .map((chunk) =>
          chunk.map(
            (themeName): InlineKeyboardButton.CallbackButton => ({
              text: themeName === ctx.user.theme ? `✅ ${themeName}` : themeName,
              callback_data: `setTheme ${themeName}`
            })
          )
        )
        .concat([[{ text: 'Next Page ➡️', callback_data: 'themePage 1' }]])
        .concat([[{ text: 'Cancel ❌', callback_data: 'cancel' }]])
    }
  })

  return next()
})
