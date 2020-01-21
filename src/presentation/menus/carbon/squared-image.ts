import '../../middlewares/user-config'
import { UserConfig, defaultUserConfig } from '../../types/UserConfig'
import TelegrafInlineMenu from 'telegraf-inline-menu'

export function squaredImage (menu: TelegrafInlineMenu) {
  menu.toggle('Square image', 'squaredImage', {
    setFunc: (ctx, newValue) => ctx.userConfig.set<UserConfig>('squaredImage', newValue),
    isSetFunc: (ctx) => ctx.userConfig.get<UserConfig, boolean>('squaredImage') ?? defaultUserConfig.squaredImage
  })
}

export default { install: squaredImage }
