import { ContextMessageUpdate } from 'telegraf'

const startText = `
Hi there :D
Send me a code snippet and I'll reply with a nice image of that code.
I support every langugage supported by carbon.now.sh!
To specify the desired langugage, use the [GFM format](https://help.github.com/en/articles/creating-and-highlighting-code-blocks#syntax-highlighting)
`

export function factory () {
  return (ctx: ContextMessageUpdate) => {
    ctx.replyWithMarkdown(startText)
  }
}

export default { factory }
