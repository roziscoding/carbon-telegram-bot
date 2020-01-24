import '../../middlewares/user-config'
import { UserConfig, defaultUserConfig } from '../../types/UserConfig'
import TelegrafInlineMenu from 'telegraf-inline-menu'

export function fontSize (menu: TelegrafInlineMenu) {
  menu.question('Font size', 'set_fontsize', {
    questionText: (ctx) => {
      const currentSize = ctx.userConfig.get<UserConfig>('fontSize') ?? defaultUserConfig.fontSize

      return `Please insert a new size in px or 0 (Current: ${currentSize})`
    },
    setFunc: (ctx, value) => {
      if (!value?.match(/^(?:\d+px|0)$/)) {
        ctx.reply('The value you provided is not a font size. No changes were made')
        return
      }

      ctx.reply('Done!')
      ctx.userConfig.set<UserConfig>('fontSize', value)
    },
    uniqueIdentifier: 'fontsize'
  })
}

export default { install: fontSize }
