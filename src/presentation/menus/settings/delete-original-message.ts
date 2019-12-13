import '../../middlewares/user-config'
import { UserConfig, defaultUserConfig } from '../../types/UserConfig'
import TelegrafInlineMenu from 'telegraf-inline-menu'

export function deleteOriginalMessage (menu: TelegrafInlineMenu) {
  menu.toggle('Delete original message', 'deleteOriginalMessage', {
    setFunc: async (ctx, newValue) => {
      ctx.userConfig.set<UserConfig>('deleteOriginalMessage', newValue)
    },
    isSetFunc: async (ctx) => {
      const defaultValue = defaultUserConfig.deleteOriginalMessage
      return ctx.userConfig.getWithDefault<UserConfig, boolean>('deleteOriginalMessage', defaultValue)
    }
  })
}

export default { factory: deleteOriginalMessage }
