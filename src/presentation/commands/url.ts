import entity from '../../util/entity'

import { ContextMessageUpdate } from 'telegraf'

function makeResponse (url: string) {
  return `<a href="${url}">View in carbon.now.sh</a>`
}

export function factory () {
  return async function handler (ctx: ContextMessageUpdate) {
    if (!ctx.message) return

    const url = entity.toUrl(ctx.message, ctx.userConfig.getConfig().config)
    if (!url) return

    ctx.replyWithHTML(makeResponse(url), { reply_to_message_id: ctx.message.message_id })
  }
}

export default { factory }
