import '../../middlewares/user-config'
import { UserConfig, defaultUserConfig } from '../../types/UserConfig'
import TelegrafInlineMenu from 'telegraf-inline-menu'

export function watermark (menu: TelegrafInlineMenu) {
  menu.toggle('Show watermark', 'watermark', {
    setFunc: (ctx, newValue) => ctx.userConfig.set<UserConfig>('watermark', newValue),
    isSetFunc: (ctx) => ctx.userConfig.get<UserConfig, boolean>('watermark') ?? defaultUserConfig.watermark
  })
}

export default { install: watermark }
