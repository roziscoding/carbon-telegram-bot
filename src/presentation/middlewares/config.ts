import { ContextMessageUpdate } from 'telegraf'

import { UserConfig } from '../types/UserConfig'
import { getSessionKey } from '../../util/get-session-key'
import { ConfigRepository } from '../../data/repositories/config'

const CONFIG_CACHE_EXPIRATION_TIME = 10 * 60 * 1000

const configCache: Record<string, UserConfig> = {}

declare module 'telegraf' {
  export interface ContextMessageUpdate {
    config: {
      getAll(): Promise<UserConfig>
      get<TKey extends keyof UserConfig>(
        key: TKey,
        defaultValue?: UserConfig[TKey]
      ): Promise<UserConfig[TKey]>
      set<TKey extends keyof UserConfig>(
        key: TKey,
        value: UserConfig[typeof key]
      ): Promise<UserConfig[TKey] | undefined>
    }
  }
}

const cacheUserConfig = async (repository: ConfigRepository, sessionKey: string) => {
  if (configCache[sessionKey]) return

  configCache[sessionKey] = await repository.getUserConfig(sessionKey)

  setTimeout(() => {
    configCache[sessionKey] = null as any
  }, CONFIG_CACHE_EXPIRATION_TIME)
}

const getAll = (
  ctx: ContextMessageUpdate,
  repository: ConfigRepository
): ContextMessageUpdate['config']['getAll'] => async () => {
  const sessionKey = getSessionKey(ctx)
  await cacheUserConfig(repository, sessionKey)
  return configCache[sessionKey]
}

const getConfig = (
  ctx: ContextMessageUpdate,
  repository: ConfigRepository
): ContextMessageUpdate['config']['get'] => async (key) => {
  const sessionKey = getSessionKey(ctx)
  await cacheUserConfig(repository, sessionKey)

  return configCache[sessionKey][key]
}

const setConfig = (
  ctx: ContextMessageUpdate,
  repository: ConfigRepository
): ContextMessageUpdate['config']['set'] => async (key, value) => {
  const sessionKey = getSessionKey(ctx)
  await cacheUserConfig(repository, sessionKey)

  configCache[sessionKey][key] = value
  return repository.setConfig(getSessionKey(ctx), key, value)
}

export function factory(repository: ConfigRepository) {
  return (ctx: ContextMessageUpdate, next: any) => {
    ctx.config = {
      getAll: getAll(ctx, repository),
      get: getConfig(ctx, repository),
      set: setConfig(ctx, repository)
    }

    next(ctx)
  }
}
