import { BUNDLED_THEMES } from 'shiki'
import TelegrafInlineMenu from 'telegraf-inline-menu/dist/source'

export function install(parentMenu: TelegrafInlineMenu) {
  const menu = new TelegrafInlineMenu('Choose a theme:')

  menu.select('select_theme', BUNDLED_THEMES, {
    setFunc: async (ctx, id) => {
      await ctx.config.set('theme', id)
    },
    isSetFunc: async (ctx, key) => (await ctx.config.get('theme')) === key,
    columns: 2
  })

  parentMenu.submenu('Theme', 'theme_menu', menu)
}

export default { install }
