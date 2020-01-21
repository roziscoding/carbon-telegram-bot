import qs from 'querystring'
import { getConfig, ReadableCarbonConfig } from './config'

const BASE_URL = 'https://carbon.now.sh'

export function getUrl (language: string, source: string, options: Partial<ReadableCarbonConfig>) {
  const config = getConfig({ ...options, language })
  const encodedSource = encodeURIComponent(source)

  const queryString = qs.stringify({ ...config, code: encodedSource })

  return `${BASE_URL}?${queryString}`
}

export function getGistUrl (gistId: string) {
  return `${BASE_URL}/${gistId}`
}
