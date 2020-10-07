import TelegrafInlineMenu from 'telegraf-inline-menu'

export function dropShadowOffsetY(menu: TelegrafInlineMenu) {
  menu.question('Y Offset', 'set_dropShadowOffsetY', {
    questionText: async (ctx) => {
      const currentSize = await ctx.config.get('dropShadowOffsetY')

      return `Please insert a new size in px or 0 (Current: ${currentSize})`
    },
    setFunc: async (ctx, value) => {
      if (!value?.match(/^(?:\d+px|0)$/)) {
        ctx.reply('The value you provided is not a valid size. No changes were made')
        return
      }

      await ctx.config.set('dropShadowOffsetY', value)
      ctx.reply('Done!')
    },
    uniqueIdentifier: 'dropShadowOffsetY'
  })
}

export default { install: dropShadowOffsetY }
