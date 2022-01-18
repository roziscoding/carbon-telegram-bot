import { URL } from 'url'
import app from './app'
import { AppConfig } from './config'
import localtunnel from 'localtunnel'

async function getTunnelDomain(port: number) {
  const tunnel = await localtunnel(port)

  process.once('SIGINT', () => tunnel.close())
  process.once('SIGTERM', () => tunnel.close())

  return new URL(tunnel.url).host
}

export async function start(config: AppConfig) {
  const bot = await app.factory(config)
  const webhookDomain = config.webhook.domain || (await getTunnelDomain(config.webhook.port))

  process.once('SIGINT', () => bot.stop('SIGINT'))
  process.once('SIGTERM', () => bot.stop('SIGTERM'))

  await bot.launch({
    webhook: {
      domain: webhookDomain,
      hookPath: `/bot${config.telegram.token}`,
      port: config.webhook.port
    }
  })

  console.log(
    `Bot listening on port ${config.webhook.port} at address https://${webhookDomain}/bot${config.telegram.token}`
  )
}

export default { start }
