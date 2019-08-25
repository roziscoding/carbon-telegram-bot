import env from 'sugar-env'

export interface IAppConfig {
  telegram: {
    token: string
  },
  server: {
    bindingHost?: string,
    bindingPort: number,
    externalHost?: string
  }
}

function getEnvName (names: string | string[]): { name: string, alternatives: string[] } {
  if (Array.isArray(names)) {
    const [ name, ...alternatives ] = names
    return { name, alternatives }
  }

  return { name: names, alternatives: [] }
}

export class MissingRequiredEnvError extends Error {
  constructor (names: string | string[]) {
    const { name, alternatives } = getEnvName(names)
    const message = `Missing required environment variable "${name}".`

    if (alternatives.length) {
      super(`${message} Alternative variable names are: ${alternatives.map(a => `"${a}"`).join(', ')}`)
      return
    }

    super(message)
  }
}

function requiredString (names: string | string[]) {
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
    bindingPort: env.get.int('SERVER_BINDING_PORT', 3000),
    externalHost: env.get('SERVER_EXTERNAL_HOST') || undefined
  }
}
