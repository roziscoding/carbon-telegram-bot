import TelegrafInlineMenu from 'telegraf-inline-menu'

export function lineHeight(menu: TelegrafInlineMenu) {
  menu.question('Line height', 'set_lineHeight', {
    questionText: async (ctx) => {
      const currentSize = await ctx.config.get('lineHeight')

      return `Please insert a new size in % or 0 (Current: ${currentSize})`
    },
    setFunc: async (ctx, value) => {
      if (!value?.match(/^(?:(?:\d+%)|0)$/)) {
        ctx.reply('The value you provided is not a valid size. No changes were made')
        return
      }

      await ctx.config.set('lineHeight', value)
      ctx.reply('Done!')
    },
    uniqueIdentifier: 'lineHeight'
  })
}

export default { install: lineHeight }
