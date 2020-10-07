import TelegrafInlineMenu from 'telegraf-inline-menu'

export function widthAdjustment(menu: TelegrafInlineMenu) {
  menu.toggle('Auto adjust width', 'widthAdjustment', {
    prefixFalse: '☑️',
    setFunc: async (ctx, newValue) => {
      await ctx.config.set('widthAdjustment', newValue)
    },
    isSetFunc: (ctx) => ctx.config.get('widthAdjustment')
  })
}

export default { install: widthAdjustment }
