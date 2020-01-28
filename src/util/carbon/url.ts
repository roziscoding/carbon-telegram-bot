import qs from 'querystring'
import { getConfig, ReadableCarbonConfig } from './config'

const BASE_URL = 'https://carbon.now.sh'

function getConfigQueryString (options: Partial<ReadableCarbonConfig>, code?: string) {
  const config = getConfig(options)
  return code
    ? qs.stringify({ ...config, code })
    : qs.stringify(config)
}

export function getUrl (language: string, source: string, options: Partial<ReadableCarbonConfig>) {
  const encodedSource = encodeURIComponent(source)
  const queryString = getConfigQueryString({ ...options, language }, encodedSource)

  return `${BASE_URL}?${queryString}`
}

export function getGistUrl (gistId: string, options: Partial<ReadableCarbonConfig> = {}) {
  const query = getConfigQueryString(options)
  return `${BASE_URL}/${gistId}?${query}`
}
