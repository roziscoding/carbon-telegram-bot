import * as Sentry from '@sentry/node'
import { ContextMessageUpdate } from 'telegraf'

function setUser (ctx: ContextMessageUpdate, scope: Sentry.Scope) {
  if (!ctx.from || !ctx.chat) return

  const id = ctx.chat.type === 'private' ? ctx.from.id : ctx.chat.id
  const username = ctx.chat.type === 'private' ? ctx.from.username : ctx.chat.title

  scope.setUser({
    id: `${id}`,
    username
  })
}

export function factory () {
  return (ctx: ContextMessageUpdate, next: any) => {
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
  }
}

export default { factory }
