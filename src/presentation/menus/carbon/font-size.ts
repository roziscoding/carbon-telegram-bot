import TelegrafInlineMenu from 'telegraf-inline-menu'

export function fontSize(menu: TelegrafInlineMenu) {
  menu.question('Font size', 'set_fontsize', {
    questionText: async (ctx) => {
      const currentSize = await ctx.config.get('fontSize')

      return `Please insert a new size in px or 0 (Current: ${currentSize})`
    },
    setFunc: async (ctx, value) => {
      if (!value?.match(/^(?:\d+px|0)$/)) {
        ctx.reply('The value you provided is not a font size. No changes were made')
        return
      }

      await ctx.config.set('fontSize', value)
      ctx.reply('Done!')
    },
    uniqueIdentifier: 'fontsize'
  })
}

export default { install: fontSize }
