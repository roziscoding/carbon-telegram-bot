import { Telegraf } from 'telegraf'

export const cancelAction = Telegraf.action('cancel', (ctx) => {
  return ctx.editMessageText('❌ Action canceled').then(() => ctx.answerCbQuery('Action canceled'))
})
