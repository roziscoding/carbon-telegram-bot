export type UserConfig = {
  deleteOriginalMessage: boolean
  theme?: string
}

export const defaultUserConfig: UserConfig = {
  deleteOriginalMessage: false
}
