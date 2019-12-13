import '../middlewares/user-config'
import { ContextMessageUpdate } from 'telegraf'
import { defaultUserConfig, UserConfig } from '../types/UserConfig'

function isValidKey(key: any): key is keyof typeof defaultUserConfig {
  return Object.keys(defaultUserConfig).includes(key)
}

const isBoolean = (value: string) => value === 'true' || value === 'false'
const stringToBoolean = (value: string) => value === 'true' ? true : false

type PropertyMap = {
  [k in keyof UserConfig]: {
    validate: (value: string) => boolean,
    convert: (value: string) => UserConfig[k],
    default: UserConfig[k]
  }
}

const validatorMap: PropertyMap = {
  deleteOriginalMessage: { validate: isBoolean, convert: stringToBoolean, default: defaultUserConfig.deleteOriginalMessage }
}

export function factory () {
  return async function handler (ctx: ContextMessageUpdate) {
    const match = ctx.message?.text?.match(/\/config (.*)/)

    if (!match) return

    const [, rawValue] = match
    const [key, value] = rawValue.split(' ')

    if (!isValidKey(key)) return ctx.reply(`"${key}" is not a valid config key`)
    const property = validatorMap[key]

    if (!value) return ctx.replyWithMarkdown(`Current value for \`${key}\` is \`${ctx.userConfig.getWithDefault(key, property.default)}\``)

    if (!property.validate(value)) return ctx.reply(`"${value}" is not a valid value for key "${key}"`)

    ctx.userConfig.set<UserConfig>('deleteOriginalMessage', property.convert(value))

    return ctx.replyWithMarkdown(`\`${key}\` was succesfully set to \`${value}\``)
  }
}

export default { factory }
