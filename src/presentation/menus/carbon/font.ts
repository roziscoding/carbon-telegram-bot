import { fontNames } from '../../../util/carbon/fonts'
import TelegrafInlineMenu from 'telegraf-inline-menu/dist/source'

export function install(parentMenu: TelegrafInlineMenu) {
  const menu = new TelegrafInlineMenu('Choose a font:')

  menu.select('select_font', fontNames, {
    setFunc: async (ctx, id) => {
      await ctx.config.set('fontFamily', id)
    },
    isSetFunc: async (ctx, key) => (await ctx.config.get('fontFamily')) === key,
    columns: 2
  })

  parentMenu.submenu('Font', 'font_menu', menu)
}

export default { install }
