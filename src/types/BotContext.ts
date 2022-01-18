import { PrismaClient, User } from '@prisma/client'
import { Context } from 'telegraf'
import { Update } from 'telegraf/typings/core/types/typegram'

export interface BotContext extends Context<Update> {
  prisma: PrismaClient
  user: User
}
