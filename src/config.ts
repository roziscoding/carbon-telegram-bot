type ConvertFunction<TValue> = (value: string) => TValue

function env(names: string[] | string, defaultValue?: string) {
  const variableNames = Array.isArray(names) ? names : [names]
  const name = variableNames.find((name) => !!process.env[name])
  const value = name ? process.env[name] : undefined

  if (value !== undefined) {
    return value
  }

  if (defaultValue !== undefined) {
    return defaultValue
  }

  throw new Error(`Required environment variable [${variableNames.join(', ')}] not found.`)
}

const int: ConvertFunction<number> = (value) => parseInt(value, 10)

export const loadConfig = () => ({
  telegram: {
    token: env('TELEGRAM_TOKEN')
  },
  db: {
    uri: env('MONGODB_URI')
  },
  webhook: {
    port: int(env(['WEBHOOK_PORT', 'PORT'], '3000')),
    domain: env('WEBHOOK_DOMAIN', '')
  }
})

export type AppConfig = ReturnType<typeof loadConfig>
