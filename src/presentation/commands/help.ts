import { ContextMessageUpdate } from 'telegraf'

const helpText =
`/repo - See my source code
/url - Get a carbon url for your code
/image - Get an image for a block of code

I now work in inline mode to create images form gist URLs. Just type my username, followed by the desired gist

Also, you can send me any preformated code or code block, and I\'ll reply with the image, even on groups!

PS: Changing theme and other settings shold be supported soon. Help is very welcome! Check /repo if you would like to contribute.
`

export function factory () {
  return (ctx: ContextMessageUpdate) => {
    ctx.reply(helpText)
  }
}

export default { factory }
