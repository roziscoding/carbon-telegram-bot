import app from './app'
import ngrok from 'ngrok'
import { AppConfig } from '../app.config'
import { Logger } from 'pino'

async function getWebhookExternalHost(config: AppConfig) {
  if (config.server.externalHost) return config.server.externalHost

  return ngrok.connect(config.server.bindingPort)
}

export async function start(config: AppConfig, logger: Logger) {
  const bot = await app.factory(config, logger.child({ context: 'app' }))

  const externalHost = await getWebhookExternalHost(config)

  const { username } = await bot.telegram.getMe()

  await bot.telegram.setWebhook(`${externalHost}/${config.telegram.token}`)
  logger.debug(`Webhook set to ${externalHost}`)

  bot.startWebhook(
    `/${config.telegram.token}`,
    null,
    config.server.bindingPort,
    config.server.bindingHost
  )

  logger.debug(
    'Webhook listening on http://%s:%s',
    config.server.bindingHost || 'localhost',
    config.server.bindingPort
  )

  if (username) logger.info(`Listening on username @${username}`)

  return bot
}

export default { start }
