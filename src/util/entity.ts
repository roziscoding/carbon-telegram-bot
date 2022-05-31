import { IncomingMessage, MessageEntity } from 'telegraf/typings/telegram-types'

export function extract(message: IncomingMessage) {
  if (!message.entities || !message.entities.length) return null
  return message.entities.find((entity) => entity.type === 'pre' || entity.type === 'code')
}

export function parse(message: IncomingMessage, entity: MessageEntity) {
  if (!message.text) return { language: 'auto', source: '' }

  const source = message.text.substr(entity.offset, entity.length)

  const lines = source.trim().split('\n')

  if (lines.length <= 1) return { source, language: 'auto' }

  const language = lines[0].trim().toLowerCase()

  lines.shift()

  return { source: lines.join('\n'), language }
}

export default { extract, parse }
