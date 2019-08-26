import { config } from './app.config'
import * as Sentry from '@sentry/node'
import server from './presentation/server'
import { RewriteFrames } from '@sentry/integrations'

if (config.sentry.dsn) Sentry.init({
  dsn: config.sentry.dsn,
  integrations: [
    new RewriteFrames({
      root: __dirname || process.cwd()
    })
  ]
})

server.start(config)
  .catch(err => {
    console.error('===== Fatal Error =====')
    console.error(JSON.stringify(err))
    process.exit(1)
  })
