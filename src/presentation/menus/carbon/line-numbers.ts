import TelegrafInlineMenu from 'telegraf-inline-menu'

export function lineNumbers(menu: TelegrafInlineMenu) {
  menu.toggle('Show line numbers', 'lineNumbers', {
    prefixFalse: '☑️',
    setFunc: async (ctx, newValue) => {
      await ctx.config.set('lineNumbers', newValue)
    },
    isSetFunc: (ctx) => ctx.config.get('lineNumbers')
  })
}

export default { install: lineNumbers }
