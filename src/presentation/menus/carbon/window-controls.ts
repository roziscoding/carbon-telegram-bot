import '../../middlewares/user-config'
import { UserConfig, defaultUserConfig } from '../../types/UserConfig'
import TelegrafInlineMenu from 'telegraf-inline-menu'

export function windowControls (menu: TelegrafInlineMenu) {
  menu.toggle('Show window controls', 'windowControls', {
    prefixFalse: '☑️',
    setFunc: (ctx, newValue) => ctx.userConfig.set<UserConfig>('windowControls', newValue),
    isSetFunc: (ctx) => ctx.userConfig.get<UserConfig, boolean>('windowControls') ?? defaultUserConfig.windowControls
  })
}

export default { install: windowControls }
