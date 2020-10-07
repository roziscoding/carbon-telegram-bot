import type { ContextMessageUpdate } from 'telegraf'

export function getSessionKey(ctx: ContextMessageUpdate) {
  return `${ctx.from?.id ?? ctx.chat?.id}`
}
