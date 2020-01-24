import '../../middlewares/user-config'
import { UserConfig, defaultUserConfig } from '../../types/UserConfig'
import TelegrafInlineMenu from 'telegraf-inline-menu'

export function lineNumbers (menu: TelegrafInlineMenu) {
  menu.toggle('Show line numbers', 'lineNumbers', {
    prefixFalse: '☑️',
    setFunc: (ctx, newValue) => ctx.userConfig.set<UserConfig>('lineNumbers', newValue),
    isSetFunc: (ctx) => ctx.userConfig.get<UserConfig, boolean>('lineNumbers') ?? defaultUserConfig.lineNumbers
  })
}

export default { install: lineNumbers }
