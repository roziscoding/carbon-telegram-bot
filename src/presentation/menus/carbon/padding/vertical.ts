import '../../../middlewares/user-config'
import { UserConfig, defaultUserConfig } from '../../../types/UserConfig'
import TelegrafInlineMenu from 'telegraf-inline-menu'

export function paddingVertical (menu: TelegrafInlineMenu) {
  menu.question('Vertical', 'set_paddingV', {
    questionText: (ctx) => {
      const currentSize = ctx.userConfig.get<UserConfig>('paddingVertical') ?? defaultUserConfig.paddingVertical

      return `Please insert a new size in px or 0 (Current: ${currentSize})`
    },
    setFunc: (ctx, value) => {
      if (!value?.match(/^(?:\d+px|0)$/)) {
        ctx.reply('The value you provided is not a valid size. No changes were made')
        return
      }

      ctx.reply('Done!')
      ctx.userConfig.set<UserConfig>('paddingVertical', value)
    },
    uniqueIdentifier: 'paddingV'
  })
}

export default { install: paddingVertical }
