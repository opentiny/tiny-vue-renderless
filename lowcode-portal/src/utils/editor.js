import { TINY_ENGINE_DEFAULT_URL } from '../controller/utils'
import { isInternalEnv } from './env'

export function openEditor(router, editorUrl = TINY_ENGINE_DEFAULT_URL) {
  if (isInternalEnv()) {
    window.open(editorUrl, '_blank')
  } else {
    router.push({
      name: 'applicationVisit'
    })
  }
}
