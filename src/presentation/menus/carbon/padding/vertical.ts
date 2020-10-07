import TelegrafInlineMenu from 'telegraf-inline-menu'

export function paddingVertical(menu: TelegrafInlineMenu) {
  menu.question('Vertical', 'set_paddingV', {
    questionText: async (ctx) => {
      const currentSize = await ctx.config.get('paddingVertical')

      return `Please insert a new size in px or 0 (Current: ${currentSize})`
    },
    setFunc: async (ctx, value) => {
      if (!value?.match(/^(?:\d+px|0)$/)) {
        ctx.reply('The value you provided is not a valid size. No changes were made')
        return
      }

      await ctx.config.set('paddingVertical', value)
      ctx.reply('Done!')
    },
    uniqueIdentifier: 'paddingV'
  })
}

export default { install: paddingVertical }
