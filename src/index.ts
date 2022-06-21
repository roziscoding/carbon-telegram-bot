import { config } from './app.config'
import server from './presentation/server'
import pino from 'pino'

const logger = pino()

server.start(config, logger.child({ context: 'server' })).catch((err) => {
  logger.error('===== Fatal Error =====')

  const errStr = JSON.stringify(err)
  const errMsg = errStr !== '{}' ? errStr : err

  logger.error(errMsg)
  process.exit(1)
})
