import TelegrafInlineMenu from 'telegraf-inline-menu'

export function dropShadow(menu: TelegrafInlineMenu) {
  menu.toggle('Enable', 'dropShadow', {
    prefixFalse: '☑️',
    setFunc: async (ctx, newValue) => {
      await ctx.config.set('dropShadow', newValue)
    },
    isSetFunc: (ctx) => ctx.config.get('dropShadow')
  })
}

export default { install: dropShadow }
