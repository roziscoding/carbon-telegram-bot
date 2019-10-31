import carbon from './carbon'
import { Config } from './carbon/config'
import { IncomingMessage, MessageEntity } from 'telegraf/typings/telegram-types'

export function extract (message: IncomingMessage) {
  if (!message.entities || !message.entities.length) return null
  return message.entities.find(entity => entity.type === 'pre' || entity.type === 'code')
}

export function parse (message: IncomingMessage, entity: MessageEntity) {
  if (!message.text) return { language: 'auto', source: '' }

  const code = message.text.substr(entity.offset, entity.length)
  return carbon.getLanguage(code)
}

export function toUrl (message: IncomingMessage, settings: Partial<Config> = {}) {
  const codeEntity = extract(message)

  if (!codeEntity) return

  const { source, language } = parse(message, codeEntity)

  return carbon.getUrl(language, source, {
    theme: 'dracula',
    paddingHorizontal: '0',
    paddingVertical: '0',
    dropShadow: false,
    ...settings
  })
}

export default { extract, parse, toUrl }
