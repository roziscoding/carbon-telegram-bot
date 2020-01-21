import '../../middlewares/user-config'
import { UserConfig, defaultUserConfig } from '../../types/UserConfig'
import TelegrafInlineMenu from 'telegraf-inline-menu'

export function widthAdjustment (menu: TelegrafInlineMenu) {
  menu.toggle('Auto adjust width', 'widthAdjustment', {
    setFunc: (ctx, newValue) => ctx.userConfig.set<UserConfig>('widthAdjustment', newValue),
    isSetFunc: (ctx) => ctx.userConfig.get<UserConfig, boolean>('widthAdjustment') ?? defaultUserConfig.widthAdjustment
  })
}

export default { install: widthAdjustment }
