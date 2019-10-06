import gist from './gist'
import refresh from './refresh'
import deleteHandler from './delete'
import inlineGist from './inline-gist'
import chosenResultGist from './chosen-result-gist'

export const handlers = {
  gist,
  refresh,
  delete: deleteHandler,
  inlineGist,
  chosenResultGist
}

export default handlers
