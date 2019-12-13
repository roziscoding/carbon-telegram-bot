import { ContextMessageUpdate } from 'telegraf'
import TelegrafInlineMenu from 'telegraf-inline-menu'

export function factory (menu: TelegrafInlineMenu) {
  const middleware = menu.replyMenuMiddleware().middleware()

  return (ctx: ContextMessageUpdate, next: any) => {
    if (ctx.chat?.type === 'private') {
      return middleware(ctx, next)
    }

    return ctx.reply('Please open a private chat with me to change your settings')
  }
}

export default { factory }
