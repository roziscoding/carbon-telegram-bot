import app from './app'
import ngrok from 'ngrok'
import { IAppConfig } from '../app.config'

async function getWebhookExternalHost (config: IAppConfig) {
  if (config.server.externalHost) return config.server.externalHost

  return ngrok.connect(config.server.bindingPort)
}

export async function start (config: IAppConfig) {
  const bot = await app.factory(config)

  const externalHost = await getWebhookExternalHost(config)

  const { username } = await bot.telegram.getMe()

  await bot.telegram.setWebhook(`${externalHost}/${config.telegram.token}`)
  console.log(`Webhook set to ${externalHost}`)

  bot.startWebhook(`/${config.telegram.token}`, null, config.server.bindingPort, config.server.bindingHost)
  console.log(`Webhook listening on http://${config.server.bindingHost || 'localhost'}:${config.server.bindingPort}`)

  if (username) console.log(`Listening on username @${username}`)

  return bot
}

export default { start }
