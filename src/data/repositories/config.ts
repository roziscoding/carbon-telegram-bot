import { Collection, Db } from 'mongodb'
import { defaultUserConfig, UserConfig } from '../../presentation/types/UserConfig'

export type Config = {
  key: string
  config: UserConfig
}

export const getUserConfig = (collection: Collection<Config>) => (key: string) =>
  collection.findOne({ key }).then((config) => config?.config ?? defaultUserConfig)

export const setConfig =
  (collection: Collection<Config>) =>
  <TKey extends keyof UserConfig>(user: string, key: TKey, value: UserConfig[TKey]) =>
    collection
      .findOneAndUpdate(
        { key: user },
        { $set: { [`config.${key}`]: value } },
        { returnDocument: 'after' }
      )
      .then((result) => {
        if (result.value) return result.value.config[key]

        const config = { ...defaultUserConfig, [key]: value }

        return collection.insertOne({ key: user, config }).then(() => value)
      })

export const factory = (db: Db) => {
  const collection = db.collection<Config>('userConfig')

  return {
    getUserConfig: getUserConfig(collection),
    setConfig: setConfig(collection)
  }
}

export type ConfigRepository = ReturnType<typeof factory>

export default {
  factory
}
