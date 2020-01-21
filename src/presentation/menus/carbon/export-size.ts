import '../../middlewares/user-config'
import TelegrafInlineMenu from 'telegraf-inline-menu/dist/source'
import { UserConfig } from '../../types/UserConfig'

export function install (parentMenu: TelegrafInlineMenu) {
  const menu = new TelegrafInlineMenu('Choose an export size:')

  menu.select('select_export_size', ['1x', '2x', '4x'], {
    setFunc: (ctx, id) => ctx.userConfig.set<UserConfig>('exportSize', id),
    isSetFunc: (ctx, key) => ctx.userConfig.get<UserConfig, string>('exportSize') === key,
    columns: 1
  })

  parentMenu.submenu('Export size', 'export_size_menu', menu)
}

export default { install }
