import TelegrafInlineMenu from 'telegraf-inline-menu'

export function dropShadowBlurRadius(menu: TelegrafInlineMenu) {
  menu.question('Blur radius', 'set_dropShadowBlur', {
    questionText: async (ctx) => {
      const currentSize = await ctx.config.get('dropShadowBlurRadius')

      return `Please insert a new size in px or 0 (Current: ${currentSize})`
    },
    setFunc: async (ctx, value) => {
      if (!value?.match(/^(?:\d+px|0)$/)) {
        ctx.reply('The value you provided is not a valid size. No changes were made')
        return
      }

      await ctx.config.set('dropShadowBlurRadius', value)
      ctx.reply('Done!')
    },
    uniqueIdentifier: 'dropShadowBlur'
  })
}

export default { install: dropShadowBlurRadius }
