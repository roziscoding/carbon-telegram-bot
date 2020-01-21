import '../../middlewares/user-config'
import { UserConfig } from '../../types/UserConfig'
import TelegrafInlineMenu from 'telegraf-inline-menu/dist/source'

export function install (parentMenu: TelegrafInlineMenu) {
  const menu = new TelegrafInlineMenu('Choose a window theme:')

  menu.select('select_window_theme', { none: 'None', sharp: 'Shartp', bw: 'Black & White' }, {
    setFunc: (ctx, id) => ctx.userConfig.set<UserConfig>('windowTheme', id),
    isSetFunc: (ctx, key) => ctx.userConfig.get<UserConfig, string>('windowTheme') === key,
    columns: 1
  })

  parentMenu.submenu('Window Theme', 'window_theme_menu', menu)
}

export default { install }
