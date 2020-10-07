import TelegrafInlineMenu from 'telegraf-inline-menu'

export function backgroundColor(menu: TelegrafInlineMenu) {
  menu.question('Background color', 'set_bgcolor', {
    questionText: async (ctx) => {
      const currentColor = await ctx.config.get('backgroundColor')

      return `Please insert a color in HEX format (Current: ${currentColor})`
    },
    setFunc: async (ctx, value) => {
      if (!value?.match(/^#[0-9a-f]{6}$/i)) {
        ctx.reply('The value you provided is not a valid HEX color. No changes were made')
        return
      }

      await ctx.config.set('backgroundColor', value)
      ctx.reply('Done!')
    },
    uniqueIdentifier: 'bgcolor'
  })
}

export default { install: backgroundColor }
