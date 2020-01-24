import '../../middlewares/user-config'
import { UserConfig, defaultUserConfig } from '../../types/UserConfig'
import TelegrafInlineMenu from 'telegraf-inline-menu'

export function lineHeight (menu: TelegrafInlineMenu) {
  menu.question('Line height', 'set_lineHeight', {
    questionText: (ctx) => {
      const currentSize = ctx.userConfig.get<UserConfig>('lineHeight') ?? defaultUserConfig.lineHeight

      return `Please insert a new size in % or 0 (Current: ${currentSize})`
    },
    setFunc: (ctx, value) => {
      if (!value?.match(/^(?:(?:\d+%)|0)$/)) {
        ctx.reply('The value you provided is not a valid size. No changes were made')
        return
      }

      ctx.reply('Done!')
      ctx.userConfig.set<UserConfig>('lineHeight', value)
    },
    uniqueIdentifier: 'lineHeight'
  })
}

export default { install: lineHeight }
