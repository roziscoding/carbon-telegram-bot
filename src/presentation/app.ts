import { commands } from './commands'
import { handlers } from './handlers'
import * as Sentry from '@sentry/node'
import { IAppConfig } from '../app.config'
import Telegraf, { ContextMessageUpdate } from 'telegraf'

declare module 'telegraf/typings' {
  export interface Telegraf<TContext extends ContextMessageUpdate> extends Composer<TContext> {
    entity: (entity: string | string[] | RegExp | RegExp[] | Function, ...middleware: Middleware<TContext>[]) => void
  }
}

function setUser (ctx: ContextMessageUpdate, scope: Sentry.Scope) {
  if (!ctx.from || !ctx.chat) return

  const id = ctx.chat.type === 'private' ? ctx.from.id : ctx.chat.id
  const username = ctx.chat.type === 'private' ? ctx.from.username : ctx.chat.title

  scope.setUser({
    id: `${id}`,
    username
  })
}

export async function factory (config: IAppConfig) {
  const bot = new Telegraf(config.telegram.token, { telegram: { webhookReply: false } })

  bot.use((ctx, next: any) => {
    Sentry.configureScope(scope => {
      setUser(ctx, scope)
      scope.setExtra('update', ctx.update)
    })

    next(ctx)
      .catch((err: any) => {
        console.error(`Error processing update ${ctx.update.update_id}: ${err.message}`)
        Sentry.captureException(err)
        if (ctx.chat && ctx.message) {
          ctx.telegram.sendMessage(ctx.chat.id, 'Error processing message', { reply_to_message_id: ctx.message.message_id })
            .catch(console.error)
        }
      })
  })

  bot.start((ctx) => {
    ctx.replyWithMarkdown('Hi there :D\nSend me a code snippet and I\'ll reply with a nice image of that code.\nI support every langugage supported by carbon.now.sh!\nTo specify the desired langugage, use the [GFM format](https://help.github.com/en/articles/creating-and-highlighting-code-blocks#syntax-highlighting)')
  })

  bot.help((ctx) => {
    const lines = []
    lines.push('/repo - See my source code')
    lines.push('/url - Get a carbon url for your code')
    lines.push('/image - Get an image for a block of code')
    lines.push('\nAlso, you can send me any preformated code or code block, and I\'ll reply with the image, even on groups!')
    lines.push('\nPS: Changing theme and other settings shold be supported soon. Help is very welcome! Check /repo if you would like to contribute.')
    ctx.reply(lines.join('\n'))
  })

  bot.command('/url', commands.url.factory())
  bot.command('/repo', commands.repo.factory())
  bot.command('/image', commands.image.factory())

  // Refreshes the code in a message
  bot.action(handlers.refresh.regex, handlers.refresh.factory())

  // Deletes a message sent by the bot
  bot.action(handlers.delete.regex, handlers.delete.factory())

  // Create image from gist
  bot.hears(handlers.gist.regex, handlers.gist.factory())

  // Send image when code block is received
  bot.entity('pre', commands.image.factory())

  return bot
}

export default { factory }
