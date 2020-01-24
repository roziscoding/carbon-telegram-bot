import '../../../middlewares/user-config'
import { UserConfig, defaultUserConfig } from '../../../types/UserConfig'
import TelegrafInlineMenu from 'telegraf-inline-menu'

export function dropShadowOffsetY (menu: TelegrafInlineMenu) {
  menu.question('Y Offset', 'set_dropShadowOffsetY', {
    questionText: (ctx) => {
      const currentSize = ctx.userConfig.get<UserConfig>('dropShadowOffsetY') ?? defaultUserConfig.dropShadowOffsetY

      return `Please insert a new size in px or 0 (Current: ${currentSize})`
    },
    setFunc: (ctx, value) => {
      if (!value?.match(/^(?:\d+px|0)$/)) {
        ctx.reply('The value you provided is not a valid size. No changes were made')
        return
      }

      ctx.reply('Done!')
      ctx.userConfig.set<UserConfig>('dropShadowOffsetY', value)
    },
    uniqueIdentifier: 'dropShadowOffsetY'
  })
}

export default { install: dropShadowOffsetY }
