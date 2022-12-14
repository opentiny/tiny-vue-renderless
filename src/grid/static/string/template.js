import toValString from './toString'
import get from '../base/get'

const template = (str, obj) => {
  let rest = toValString(str)

  if (rest && obj) {
    return rest.replace(/\{{2}([.\w[\]\s]+)\}{2}/g, (match, keys) => get(obj, keys))
  }

  return rest
}

export default template
