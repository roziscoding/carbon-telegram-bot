import '../../middlewares/user-config'
import { themes } from '../../../util/carbon/themes'
import TelegrafInlineMenu from 'telegraf-inline-menu/dist/source'
import { UserConfig } from '../../types/UserConfig'

export function install (parentMenu: TelegrafInlineMenu) {
  const menu = new TelegrafInlineMenu('Choose a theme:')

  menu.select('select_theme', themes, {
    setFunc: (ctx, id) => ctx.userConfig.set<UserConfig>('theme', id),
    isSetFunc: (ctx, key) => ctx.userConfig.get<UserConfig, string>('theme') === key,
    columns: 2
  })

  parentMenu.submenu('Theme', 'theme_menu', menu)
}

export default { install }
