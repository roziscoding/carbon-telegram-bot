import { getGistUrl } from '../../util/carbon/url'
import { ContextMessageUpdate, Markup, Extra } from 'telegraf'
import { getScreenshotFromUrl } from '../../util/carbon/puppeteer'

const regex = /https?:\/\/gist\.github\.com\/(?<username>.+)\/(?<gistId>[a-zA-Z0-9]+)/

function factory () {
  return async function handleGist (ctx: ContextMessageUpdate) {
    if (!ctx.message || !ctx.message.text) return
    const match = ctx.message.text.match(regex)
    if (!match || !match.groups || !match.groups.gistId) return
    if (!ctx.chat) return

    const sentMessage = await ctx.reply('Processing...', Extra.inReplyTo(ctx.message.message_id) as any)

    const [ gistUrl ] = match
    const { groups: { gistId } } = match
    const url = getGistUrl(gistId)
    const image = await getScreenshotFromUrl({ url })

    const keyboard = (m: Markup) => m.inlineKeyboard([
      m.urlButton('Open gist', gistUrl, false),
      m.urlButton('Edit on carbon.now.sh', url, false)
    ], {})

    const extra = Extra.markup(keyboard).inReplyTo(ctx.message.message_id)

    ctx.telegram.sendPhoto(ctx.chat.id, { source: image }, extra as any)
    ctx.telegram.deleteMessage(ctx.chat.id, sentMessage.message_id)
  }
}

export default { factory, regex }
