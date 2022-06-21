import { Logger } from 'pino'
import { ContextMessageUpdate } from 'telegraf'

export function factory(logger: Logger) {
  return (ctx: ContextMessageUpdate, next: any) => {
    if (!next) return
    if (!ctx.message?.from?.id) return next()

    const { from, text } = ctx.message

    logger.debug('Handling message from %s <%s>: %s', from.first_name, from.id, text)

    next(ctx)
  }
}
