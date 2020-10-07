import TelegrafInlineMenu from 'telegraf-inline-menu/dist/source'

export function install(parentMenu: TelegrafInlineMenu) {
  const menu = new TelegrafInlineMenu('Choose a window theme:')

  menu.select(
    'select_window_theme',
    { none: 'None', sharp: 'Shartp', bw: 'Black & White' },
    {
      setFunc: async (ctx, id) => {
        await ctx.config.set('windowTheme', id)
      },
      isSetFunc: async (ctx, key) => (await ctx.config.get('windowTheme')) === key,
      columns: 1
    }
  )

  parentMenu.submenu('Window Theme', 'window_theme_menu', menu)
}

export default { install }
