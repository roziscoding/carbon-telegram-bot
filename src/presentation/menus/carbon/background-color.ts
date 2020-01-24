import '../../middlewares/user-config'
import { UserConfig, defaultUserConfig } from '../../types/UserConfig'
import TelegrafInlineMenu from 'telegraf-inline-menu'

export function backgroundColor (menu: TelegrafInlineMenu) {
  menu.question('Background color', 'set_bgcolor', {
    questionText: (ctx) => {
      const currentColor = ctx.userConfig.get<UserConfig>('backgroundColor') ?? defaultUserConfig.backgroundColor

      return `Please insert a color in HEX format (Current: ${currentColor})`
    },
    setFunc: (ctx, value) => {
      if (!value?.match(/^#[0-9a-f]{6}$/i)) {
        ctx.reply('The value you provided is not a valid HEX color. No changes were made')
        return
      }

      ctx.reply('Done!')
      ctx.userConfig.set<UserConfig>('backgroundColor', value)
    },
    uniqueIdentifier: 'bgcolor'
  })
}

export default { install: backgroundColor }
