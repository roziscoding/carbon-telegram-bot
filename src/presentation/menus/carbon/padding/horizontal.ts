import TelegrafInlineMenu from 'telegraf-inline-menu'

export function paddingHorizontal(menu: TelegrafInlineMenu) {
  menu.question('Horizontal', 'set_paddingH', {
    questionText: async (ctx) => {
      const currentSize = await ctx.config.get('paddingHorizontal')

      return `Please insert a new size in px or 0 (Current: ${currentSize})`
    },
    setFunc: async (ctx, value) => {
      if (!value?.match(/^(?:\d+px|0)$/)) {
        ctx.reply('The value you provided is not a valid size. No changes were made')
        return
      }

      await ctx.config.set('paddingHorizontal', value)
      ctx.reply('Done!')
    },
    uniqueIdentifier: 'paddingH'
  })
}

export default { install: paddingHorizontal }
