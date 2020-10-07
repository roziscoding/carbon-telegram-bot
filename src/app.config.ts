import env from 'sugar-env'
import { IMongoParams } from '@nindoo/mongodb-data-layer'

export interface IAppConfig {
  telegram: {
    token: string
  }
  server: {
    bindingHost?: string
    bindingPort: number
    externalHost?: string
  }
  sentry: {
    dsn?: string
  }
  mongodb: IMongoParams
  logMessages: boolean
}

function getEnvName(names: string | string[]): { name: string; alternatives: string[] } {
  if (Array.isArray(names)) {
    const [name, ...alternatives] = names
    return { name, alternatives }
  }

  return { name: names, alternatives: [] }
}

export class MissingRequiredEnvError extends Error {
  constructor(names: string | string[]) {
    const { name, alternatives } = getEnvName(names)
    const message = `Missing required environment variable "${name}".`

    if (alternatives.length) {
      super(
        `${message} Alternative variable names are: ${alternatives.map((a) => `"${a}"`).join(', ')}`
      )
      return
    }

    super(message)
  }
}

function requiredString(names: string | string[]) {
  const value = env.get(names)

  if (!value) throw new MissingRequiredEnvError(names)

  return value
}

export const config: IAppConfig = {
  telegram: {
    token: requiredString(['TELEGRAM_TOKEN', 'TELEGRAM_API_TOKEN'])
  },
  server: {
    bindingHost: env.get('SERVER_BINDING_HOST') || undefined,
    bindingPort: env.get.int(['SERVER_BINDING_PORT', 'PORT'], 3000),
    externalHost: env.get('SERVER_EXTERNAL_HOST') || undefined
  },
  sentry: {
    dsn: env.get('SENTRY_DSN') || undefined
  },
  mongodb: {
    uri: requiredString('MONGODB_URI'),
    dbName: env.get('MONGODB_DBNAME', 'carbon-now-sh'),
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: env.get.int('MONGODB_POOL_SIZE', 5)
    }
  },
  logMessages: env.get.boolean('LOG_MESSAGES', false)
}
