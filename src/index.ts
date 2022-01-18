import dotenv from 'dotenv'
import server from './server'
import { loadConfig } from './config'

dotenv.config()

async function start() {
  const config = loadConfig()
  return server.start(config)
}

start().catch((err) => console.error('---- Error starting server ----\n', err.stack))
