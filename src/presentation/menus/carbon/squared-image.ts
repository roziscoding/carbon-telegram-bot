import TelegrafInlineMenu from 'telegraf-inline-menu'

export function squaredImage(menu: TelegrafInlineMenu) {
  menu.toggle('Square image', 'squaredImage', {
    prefixFalse: '☑️',
    setFunc: async (ctx, newValue) => {
      await ctx.config.set('squaredImage', newValue)
    },
    isSetFunc: (ctx) => ctx.config.get('squaredImage')
  })
}

export default { install: squaredImage }
