import '../../middlewares/user-config'
import { UserConfig, defaultUserConfig } from '../../types/UserConfig'
import TelegrafInlineMenu from 'telegraf-inline-menu'

export function dropShadow (menu: TelegrafInlineMenu) {
  menu.toggle('Drop shadow', 'dropShadow', {
    setFunc: (ctx, newValue) => ctx.userConfig.set<UserConfig>('dropShadow', newValue),
    isSetFunc: (ctx) => ctx.userConfig.get<UserConfig, boolean>('dropShadow') ?? defaultUserConfig.dropShadow
  })
}

export default { install: dropShadow }
