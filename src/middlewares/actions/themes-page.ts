import { Telegraf } from 'telegraf'
import { BotContext } from '../../types/BotContext'
import chunk from 'lodash.chunk'
import { Theme } from '@prisma/client'
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram'

export const themesPageAction = Telegraf.action<BotContext>(/themePage (?<page>\d+)/, (ctx) => {
  const rawPage = ctx.match.groups && ctx.match.groups['page']
  if (!rawPage) return

  const page = parseInt(rawPage, 10)

  const themes = Object.keys(Theme)

  const chunks = chunk(themes, 10)
  const columns = chunk(chunks[page]!, 2)

  const keyboard = columns.map((chunk) =>
    chunk.map(
      (themeName): InlineKeyboardButton.CallbackButton => ({
        text: themeName === ctx.user.theme ? `✅ ${themeName}` : themeName,
        callback_data: `setTheme ${themeName}`
      })
    )
  )

  if (page > 0 && page < chunks.length - 1) {
    keyboard.push([
      { text: '⬅️ Previous Page', callback_data: `themePage ${page - 1}` },
      { text: 'Next Page ➡️', callback_data: `themePage ${page + 1}` }
    ])
  }

  if (page === chunks.length - 1) {
    keyboard.push([{ text: '⬅️ Previous Page', callback_data: `themePage ${page - 1}` }])
  }

  if (page === 0) {
    keyboard.push([{ text: 'Next Page ➡️', callback_data: `themePage ${page + 1}` }])
  }

  ctx.editMessageReplyMarkup({
    inline_keyboard: keyboard.concat([[{ text: 'Cancel ❌', callback_data: 'cancel' }]])
  })
})
