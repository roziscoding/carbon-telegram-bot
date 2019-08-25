import Telegraf from 'telegraf'
import { commands } from './commands'
import { IAppConfig } from '../app.config'

declare module 'telegraf/typings' {
  export interface Telegraf<TContext extends ContextMessageUpdate> extends Composer<TContext> {
    entity: (entity: string | string[] | RegExp | RegExp[] | Function, ...middleware: Middleware<TContext>[]) => void
  }
}

export async function factory (config: IAppConfig) {
  const bot = new Telegraf(config.telegram.token, { telegram: { webhookReply: false } })

  bot.start((ctx) => {
    ctx.replyWithMarkdown('Hi there :D\nSend me a code snippet and I\'ll reply with a nice image of that code.\nI support every langugage supported by carbon.now.sh!\nTo specify the desired langugage, use the [GFD format](https://help.github.com/en/articles/creating-and-highlighting-code-blocks#syntax-highlighting)')
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

  // Send image when code block arrives
  bot.entity('pre', commands.image.factory())

  bot.command('/url', commands.url.factory())
  bot.command('/repo', commands.repo.factory())
  bot.command('/image', commands.image.factory())

  return bot
}

export default { factory }
