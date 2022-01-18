import { Telegraf } from 'telegraf'
import { AppConfig } from './config'
import { PrismaClient } from '@prisma/client'

import * as middlewares from './middlewares'
import { BotContext } from './types/BotContext'

export async function factory(config: AppConfig) {
  const bot = new Telegraf<BotContext>(config.telegram.token)
  const prisma = new PrismaClient()

  bot.on('text', (ctx, next) => {
    const hasProcessableEntity = ctx.message?.entities?.find(
      (entity) => entity.type === 'pre' || entity.type === 'bot_command'
    )

    if (hasProcessableEntity) {
      next()
    }
  })

  bot.use((ctx, next) => {
    ctx.prisma = prisma
    next()
  })

  // Setup middlewares
  bot.use(middlewares.getUser)
  bot.use(middlewares.createUser)
  bot.use(middlewares.updateUser)

  // Functional Middlewares
  bot.use(middlewares.entity)

  // Commands
  bot.use(middlewares.renderCommand)
  bot.use(middlewares.themeCommand)

  // Actions
  bot.use(middlewares.cancelAction)
  bot.use(middlewares.deleteAction)
  bot.use(middlewares.refreshAction)
  bot.use(middlewares.setThemeAction)
  bot.use(middlewares.themesPageAction)

  await bot.telegram.setMyCommands([
    { command: '/render', description: 'Reply to a message to render its code' },
    { command: '/theme', description: 'Set your theme' }
  ])

  return bot
}

export default {
  factory
}
