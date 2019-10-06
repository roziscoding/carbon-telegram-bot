import { ContextMessageUpdate, Markup } from 'telegraf'

const regex = /https?:\/\/gist\.github\.com\/(?<username>.+)\/(?<gistId>[a-zA-Z0-9]+)/

function factory () {
  return async function handleGist (ctx: ContextMessageUpdate) {
    if (!ctx.inlineQuery || !ctx.inlineQuery.query || !ctx.inlineQuery.from) {
      return console.log('No inlineQuery, query, or from')
    }

    const match = ctx.inlineQuery.query.match(regex)
    if (!match || !match.groups || !match.groups.gistId) {
      return console.log('No regex match, groups or gistId')
    }

    const { groups: { gistId } } = match

    const keyboard = Markup.inlineKeyboard([
      Markup.callbackButton('OK', 'ok', false)
    ])

    const result = {
      type: 'photo',
      id: `${Date.now()}:${ctx.inlineQuery.from.id}:${gistId}`,
      title: 'Send gist as carbon.now.sh image',
      photo_url: 'https://via.placeholder.com/500x250.jpg?text=Loading+gist',
      thumb_url: 'https://via.placeholder.com/250x175.jpg?text=Create+image+from+gist',
      caption: `${ctx.inlineQuery.from.first_name} sent a gist.\nI am creating a syntax highlighted image of it and will send it here soon.`,
      reply_markup: keyboard
    }

    ctx.answerInlineQuery([ result as any ])
  }
}

export default { factory, regex }
