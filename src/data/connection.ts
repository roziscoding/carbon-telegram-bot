import { MongoClient } from 'mongodb'
import { AppConfig } from '../app.config'

const MAXIMUM_CONNECTION_ATTEMPTS = 5

/**
 * MongoClient default settings
 */
const CLIENT_CONFIG = {
  maxPoolSize: 10,
  minPoolSize: 1
}

let client: MongoClient = null as any

/**
 * Connect to a MongoDB database
 *
 * @param {Object} mongoData Data to connect to the database
 * @param {string} mongoData.uri Host IP or mongodb:// URL to connect
 * @param {string} mongoData.dbname Database name
 * @param {MongoClientOptions} mongoData.options Options to be proxied to the database
 */
async function connect(
  { uri, dbName }: AppConfig['mongodb'],
  attemptsMade = 0
): Promise<MongoClient> {
  try {
    const client = await MongoClient.connect(uri, CLIENT_CONFIG)
    return client
  } catch (err) {
    if (attemptsMade >= MAXIMUM_CONNECTION_ATTEMPTS) {
      throw new Error(
        `Mongodb connection failed after ${attemptsMade} attempts with message: ${
          (err as Error).message
        }`
      )
    }
    return connect({ uri, dbName }, attemptsMade + 1)
  }
}

export async function createConnection(config: AppConfig['mongodb']) {
  client = client || (await connect(config))
  return client.db(config.dbName)
}
