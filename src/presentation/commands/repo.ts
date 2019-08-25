import { ContextMessageUpdate } from 'telegraf/typings'

export function factory () {
  return async function handler (ctx: ContextMessageUpdate) {
    ctx.replyWithMarkdown('Check my source code [here](https://github.com/rjmunhoz/carbon-telegram-bot)')
  }
}

export default { factory }
