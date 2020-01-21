import { Collection, Db } from 'mongodb'
import { ContextMessageUpdate } from 'telegraf/typings'

export type UserConfigWrapper = ReturnType<typeof getUserConfigWrapper>

declare module 'telegraf' {
  export interface ContextMessageUpdate {
    userConfig: UserConfigWrapper
  }
}

export type Options = {
  property: string
  getSessionKey: (ctx: ContextMessageUpdate) => string
  collection: string,
  defaultConfig: any
}

type UserConfig = {
  key: string
  config: any
}

function getSessionKey (ctx: ContextMessageUpdate) {
  return `${ctx.from?.id ?? ctx.chat?.id}`
}

const defaultOptions: Options = {
  property: 'config',
  getSessionKey,
  collection: 'userConfig',
  defaultConfig: {}
}


function getUserConfigWrapper (config: UserConfig) {
  return {
    getConfig: () => config,
    set: <TConfig>(key: keyof TConfig, value: TConfig[typeof key]) => { config.config[key] = value },
    get: <TConfig, TReturn = unknown>(key: keyof TConfig): TReturn => config.config[key]
  }
}

async function getUserConfig (key: string, collection: Collection, defaultConfig: any): Promise<UserConfig> {
  return collection.findOne({ key })
    .then(config => (config ?? { key, config: defaultConfig }))
}

async function saveUserConfig (userConfig: UserConfig, collection: Collection) {
  const exists = await collection.countDocuments({ key: userConfig.key })
    .then(count => count > 0)

  if (exists) return collection.updateOne({ key: userConfig.key }, { $set: { config: userConfig.config } })

  return collection.insertOne(userConfig)
}

export function getMiddleware (connection: Db, options: Partial<Options> = defaultOptions) {
  const { collection: collectionName, getSessionKey, defaultConfig } = options
    ? Object.assign(defaultOptions, options)
    : defaultOptions

  const collection = connection.collection(collectionName)

  return async (ctx: ContextMessageUpdate, next: any) => {
    const key = getSessionKey(ctx)
    const userConfig = await getUserConfig(key, collection, defaultConfig ?? {})
    const configWrapper = getUserConfigWrapper(userConfig)

    Object.defineProperty(ctx, 'userConfig', {
      get () { return configWrapper }
    })

    await next()
    await saveUserConfig(configWrapper.getConfig(), collection)
  }
}

export default { getMiddleware, factory: getMiddleware }
