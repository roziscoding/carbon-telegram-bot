import '../../middlewares/user-config'
import { UserConfig, defaultUserConfig } from '../../types/UserConfig'
import TelegrafInlineMenu from 'telegraf-inline-menu'

export function deleteOriginalMessage (menu: TelegrafInlineMenu) {
  menu.toggle('Delete original message', 'deleteOriginalMessage', {
    setFunc: (ctx, newValue) => ctx.userConfig.set<UserConfig>('deleteOriginalMessage', newValue),
    isSetFunc: (ctx) => ctx.userConfig.get<UserConfig, boolean>('deleteOriginalMessage') ?? defaultUserConfig.deleteOriginalMessage
  })
}

export default { install: deleteOriginalMessage }
