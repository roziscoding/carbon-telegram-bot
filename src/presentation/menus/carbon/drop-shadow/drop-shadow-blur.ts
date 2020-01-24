import '../../../middlewares/user-config'
import { UserConfig, defaultUserConfig } from '../../../types/UserConfig'
import TelegrafInlineMenu from 'telegraf-inline-menu'

export function dropShadowBlurRadius (menu: TelegrafInlineMenu) {
  menu.question('Blur radius', 'set_dropShadowBlur', {
    questionText: (ctx) => {
      const currentSize = ctx.userConfig.get<UserConfig>('dropShadowBlurRadius') ?? defaultUserConfig.dropShadowBlurRadius

      return `Please insert a new size in px or 0 (Current: ${currentSize})`
    },
    setFunc: (ctx, value) => {
      if (!value?.match(/^(?:\d+px|0)$/)) {
        ctx.reply('The value you provided is not a valid size. No changes were made')
        return
      }

      ctx.reply('Done!')
      ctx.reply('Done!')
      ctx.userConfig.set<UserConfig>('dropShadowBlurRadius', value)
    },
    uniqueIdentifier: 'dropShadowBlur'
  })
}

export default { install: dropShadowBlurRadius }
