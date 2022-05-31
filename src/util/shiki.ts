import { createCanvas } from 'canvas'
import { getHighlighter } from 'shiki'
import { getCanvasRenderer } from 'shiki-renderer-canvas'
import { IncomingMessage } from 'telegraf/typings/telegram-types'
import entity from './entity'

export async function highlightSource(source: string, language: string) {
  const highlighter = await getHighlighter({
    theme: 'dracula'
  })
  const tokens = highlighter.codeToThemedTokens(source, language)

  const canvas = createCanvas(500, 500)
  const renderer = getCanvasRenderer(canvas)
  return renderer.renderToCanvas(tokens).toBuffer()
}

export function highlightMessage(message: IncomingMessage) {
  const codeEntity = entity.extract(message)

  if (!codeEntity) throw new Error('No code entity found in the message')

  const { source, language } = entity.parse(message, codeEntity)

  return highlightSource(source, language)
}

export default {
  highlight: highlightSource,
  highlightMessage
}
