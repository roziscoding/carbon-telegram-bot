import TelegrafInlineMenu from 'telegraf-inline-menu/dist/source'

export function install(parentMenu: TelegrafInlineMenu) {
  const menu = new TelegrafInlineMenu('Choose an export size:')

  menu.select('select_export_size', ['1x', '2x', '4x'], {
    setFunc: async (ctx, id) => {
      await ctx.config.set('exportSize', id)
    },
    isSetFunc: async (ctx, key) => (await ctx.config.get('exportSize')) === key,
    columns: 1
  })

  parentMenu.submenu('Export size', 'export_size_menu', menu)
}

export default { install }
