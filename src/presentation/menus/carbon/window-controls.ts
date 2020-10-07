import TelegrafInlineMenu from 'telegraf-inline-menu'

export function windowControls(menu: TelegrafInlineMenu) {
  menu.toggle('Show window controls', 'windowControls', {
    prefixFalse: '☑️',
    setFunc: async (ctx, newValue) => {
      await ctx.config.set('windowControls', newValue)
    },
    isSetFunc: (ctx) => ctx.config.get('windowControls')
  })
}

export default { install: windowControls }
