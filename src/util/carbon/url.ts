import qs from 'querystring'
import { getConfig, Config } from './config'

export function getUrl (language: string, source: string, options: Partial<Config>) {
  const config = getConfig({ ...options, language })
  const encodedSource = encodeURIComponent(source)

  const queryString = qs.stringify({ ...config, code: encodedSource })

  return `https://carbon.now.sh?${queryString}`
}
