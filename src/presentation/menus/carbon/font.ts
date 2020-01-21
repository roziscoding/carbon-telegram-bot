import '../../middlewares/user-config'
import { fontNames } from '../../../util/carbon/fonts'
import TelegrafInlineMenu from 'telegraf-inline-menu/dist/source'
import { UserConfig } from '../../types/UserConfig'

export function install (parentMenu: TelegrafInlineMenu) {
  const menu = new TelegrafInlineMenu('Choose a font:')

  menu.select('select_font', fontNames, {
    setFunc: (ctx, id) => ctx.userConfig.set<UserConfig>('fontFamily', id),
    isSetFunc: (ctx, key) => ctx.userConfig.get<UserConfig, string>('fontFamily') === key,
    columns: 2
  })

  parentMenu.submenu('Font', 'font_menu', menu)
}

export default { install }
