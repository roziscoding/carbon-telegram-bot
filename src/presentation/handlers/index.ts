import gist from './gist'
import refresh from './refresh'
import deleteHandler from './delete'

export const handlers = {
  gist,
  refresh,
  delete: deleteHandler
}

export default handlers
