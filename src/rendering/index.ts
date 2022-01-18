import fs from 'fs/promises'
import path from 'path'
import { chromium } from 'playwright-chromium'
import { MessageEntity } from 'telegraf/typings/core/types/typegram'
import { BotContext } from '../types/BotContext'
import { PreMessage } from '../types/PreMessage'
import { languages } from './Languages'
import { Theme } from '@prisma/client'

export const DEFAULT_INLINE_KEYBOARD = [
  [
    { text: 'Refresh', callback_data: 'refresh' },
    { text: 'Delete', callback_data: 'delete' }
  ]
]

const getThemeLoader = (fileName: string) => () =>
  fs.readFile(path.join(__dirname, 'themes', fileName), 'utf-8')

const themeMap: Record<string, string | (() => Promise<string>)> = {
  ...Object.fromEntries(
    Object.keys(Theme).map((themeName) => [
      themeName,
      themeName === 'Default'
        ? `https://cdnjs.cloudflare.com/ajax/libs/prism/1.26.0/themes/prism.min.css`
        : `https://cdnjs.cloudflare.com/ajax/libs/prism/1.26.0/themes/prism-${themeName.toLowerCase()}.min.css`
    ])
  ),
  ...{
    CB: getThemeLoader('prism-cb.css'),
    GHColors: getThemeLoader('prism-ghcolors.css'),
    Pojoaque: getThemeLoader('prism-pojoaque.css'),
    Xonokai: getThemeLoader('prism-xonokai.css'),
    Ateliersulphurpoollight: getThemeLoader('prism-base16-ateliersulphurpool.light.css'),
    Hopscotch: getThemeLoader('prism-hopscotch.css'),
    AtomDark: getThemeLoader('prism-atom-dark.css'),
    DuotoneDark: getThemeLoader('prism-duotone-dark.css'),
    DuotoneSea: getThemeLoader('prism-duotone-sea.css'),
    DuotoneSpace: getThemeLoader('prism-duotone-space.css'),
    DuotoneEarth: getThemeLoader('prism-duotone-earth.css'),
    DuotoneForest: getThemeLoader('prism-duotone-forest.css'),
    DuotoneLight: getThemeLoader('prism-duotone-light.css'),
    VS: getThemeLoader('prism-vs.css'),
    VSCodeDarkPlus: getThemeLoader('prism-vsc-dark-plus.css'),
    Darcula: getThemeLoader('prism-darcula.css'),
    a11yDark: getThemeLoader('prism-a11y-dark.css'),
    Dracula: getThemeLoader('prism-dracula.css'),
    Synthwave84: getThemeLoader('prism-synthwave84.css'),
    ShadesofPurple: getThemeLoader('prism-shades-of-purple.css'),
    MaterialDark: getThemeLoader('prism-material-dark.css'),
    MaterialLight: getThemeLoader('prism-material-light.css'),
    MaterialOceanic: getThemeLoader('prism-material-oceanic.css'),
    Nord: getThemeLoader('prism-nord.css'),
    ColdarkCold: getThemeLoader('prism-coldark-cold.css'),
    ColdarkDark: getThemeLoader('prism-coldark-dark.css'),
    Coywithoutshadows: getThemeLoader('prism-coy-without-shadows.css'),
    GruvboxDark: getThemeLoader('prism-gruvbox-dark.css'),
    GruvboxLight: getThemeLoader('prism-gruvbox-light.css'),
    Lucario: getThemeLoader('prism-lucario.css'),
    NightOwl: getThemeLoader('prism-night-owl.css'),
    HoliTheme: getThemeLoader('prism-holi-theme.css'),
    ZTouch: getThemeLoader('prism-z-touch.css'),
    SolarizedDarkAtom: getThemeLoader('prism-solarized-dark-atom.css'),
    OneDark: getThemeLoader('prism-one-dark.css'),
    OneLight: getThemeLoader('prism-one-light.css')
  }
}

const getEntityText = (text: string, entity: MessageEntity) => {
  return text.substring(entity.offset, entity.offset + entity.length)
}

export async function renderMessageToContext(ctx: BotContext, message: PreMessage, theme: Theme) {
  const { image, isCodeLanguageSupported } = await renderMessage(message, theme)

  if (!image) {
    return ctx.reply('Error while rendering code')
  }

  return ctx.replyWithPhoto(
    { source: image },
    {
      caption: isCodeLanguageSupported
        ? ''
        : 'Code language was not informed or is not supported.\nThe first line of the code should be the language name.\nCode rendered as "markup".',
      reply_to_message_id: message.message_id,
      reply_markup: {
        inline_keyboard: DEFAULT_INLINE_KEYBOARD
      }
    }
  )
}

export async function renderMessage(message: PreMessage, theme: Theme) {
  const code = message.entities.reduce((result, entity) => {
    if (entity.type !== 'pre') return result

    const entityText = getEntityText(message.text, entity)

    return result ? `${result}\n\n${entityText}` : entityText
  }, '')

  const codeLanguage = code.split('\n')[0]?.trim()
  const isCodeLanguageSupported = codeLanguage && languages.includes(codeLanguage)
  const language = isCodeLanguageSupported ? codeLanguage : 'markup'

  const finalCode = isCodeLanguageSupported
    ? code.replace(codeLanguage, '').trimStart().trimEnd()
    : code

  const image = await renderCode(finalCode, language, theme)
  return { image, codeLanguage, isCodeLanguageSupported }
}

export async function renderCode(code: string, language: string, theme: Theme) {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  const themeFromMap = themeMap[theme]
  const themeContent =
    typeof themeFromMap === 'string'
      ? `<link rel="stylesheet" href="${themeFromMap}" />`
      : `<style>${await themeFromMap!()}</style>`

  const pageContent = `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      ${themeContent}
      <title>Document</title>
      <style>
        .container {
          display: flex;
        }
      </style>
    </head>
    
    <body>
      <div class="container">
        <pre><code class="language-${language}">${code}</code></pre>
      </div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.26.0/prism.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.26.0/plugins/autoloader/prism-autoloader.min.js"></script>
    </body>
    
    </html>
  `

  // await fs.writeFile('./index.html', pageContent)

  await page.setViewportSize({ height: 10000, width: 10000 })
  await page.setContent(pageContent)

  const elementBox = await page.locator('pre').boundingBox()

  if (!elementBox) {
    return null
  }

  const image = await page.screenshot({
    fullPage: true,
    clip: {
      height: elementBox.height + 20,
      width: elementBox.width + 20,
      x: elementBox.x - 10,
      y: elementBox.y - 10
    }
  })

  await page.close()
  await browser.close()

  return image
}
