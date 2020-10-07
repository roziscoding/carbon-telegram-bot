import TelegrafInlineMenu from 'telegraf-inline-menu'

export function watermark(menu: TelegrafInlineMenu) {
  menu.toggle('Show watermark', 'watermark', {
    prefixFalse: '☑️',
    setFunc: async (ctx, newValue) => {
      await ctx.config.set('watermark', newValue)
    },
    isSetFunc: (ctx) => ctx.config.get('watermark')
  })
}

export default { install: watermark }
