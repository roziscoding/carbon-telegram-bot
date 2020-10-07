import TelegrafInlineMenu from 'telegraf-inline-menu'

export function deleteOriginalMessage(menu: TelegrafInlineMenu) {
  menu.toggle('Delete original message', 'delOriginal', {
    prefixFalse: '☑️',
    setFunc: async (ctx, newValue) => {
      await ctx.config.set('deleteOriginalMessage', newValue)
    },
    isSetFunc: (ctx) => ctx.config.get('deleteOriginalMessage')
  })
}

export default { install: deleteOriginalMessage }
