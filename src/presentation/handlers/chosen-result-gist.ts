import { ContextMessageUpdate } from 'telegraf'
import { getKeyboard } from '../../util/keyboard'
import { getGistUrl } from '../../util/carbon/url'
import { getScreenshotFromUrl } from '../../util/carbon/puppeteer'

const regex = /\d+:(?<userId>[^:]+):(?<gistId>[a-zA-Z0-9]+)/

function factory () {
  return async function handleGist (ctx: ContextMessageUpdate) {
    if (
      !ctx.chosenInlineResult
      || !ctx.chosenInlineResult.result_id
      || !ctx.chosenInlineResult.inline_message_id
    ) return console.log('Bad return 1')

    const match = ctx.chosenInlineResult.result_id.match(regex)
    if (!match || !match.groups || !match.groups.gistId || !match.groups.userId) return console.log('Bad return 2')

    const { groups: { gistId, userId } } = match
    const config = ctx.userConfig.getConfig().config

    const url = getGistUrl(gistId, config)

    const imageBuffer = await getScreenshotFromUrl({ url })

    const { photo: [ sentImage ], message_id: imageMessageId } = await ctx.telegram.sendPhoto(userId, { source: imageBuffer })
    const { file_id: imageFileId } = sentImage

    const keyboard = getKeyboard(url).asObject()

    await (ctx.telegram as any).editMessageMedia(
      undefined,
      undefined,
      ctx.chosenInlineResult.inline_message_id,
      { type: 'photo', media: imageFileId },
      { reply_markup: keyboard }
    )

    await ctx.telegram.deleteMessage(userId, imageMessageId)
  }
}

export default { factory, regex }
