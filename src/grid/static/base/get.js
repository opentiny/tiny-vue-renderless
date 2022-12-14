import eqNull from './eqNull'
import hasOwnProp from './hasOwnProp'
import isUndefined from './isUndefined'
import helperGetHGSKeys from './helperGetHGSKeys'
import staticHGKeyRE from '../static/staticHGKeyRE'

const valGet = (obj, key) => {
  const matchs = key ? key.match(staticHGKeyRE) : ''

  return matchs
    ? matchs[1]
      ? obj[matchs[1]]
        ? obj[matchs[1]][matchs[2]]
        : undefined
      : obj[matchs[2]]
    : obj[key]
}

const pathGet = (obj, property) => {
  if (!obj) {
    return
  }

  let rest
  let index = 0

  const getRest = (len, props) => {
    for (rest = obj; index < len; index++) {
      rest = valGet(rest, props[index])

      if (eqNull(rest)) {
        return
      }
    }
  }

  if (obj[property] || hasOwnProp(obj, property)) {
    return obj[property]
  } else {
    const props = helperGetHGSKeys(property)
    const len = props.length

    if (len) {
      getRest(len, props)
    }

    return rest
  }
}

const get = (obj, property, defaultValue) => {
  if (eqNull(obj)) {
    return defaultValue
  }

  const result = pathGet(obj, property)

  return isUndefined(result) ? defaultValue : result
}

export default get
