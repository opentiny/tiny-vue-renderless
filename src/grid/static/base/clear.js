import isNull from './isNull'
import isObject from './isObject'
import assign from '../object/assign'
import isPlainObject from './isPlainObject'
import objectEach from '../object/objectEach'
import helperDeleteProperty from './helperDeleteProperty'

const clear = function (obj, defs, assigns) {
  if (!obj) {
    return obj
  }
  let isDefs = arguments.length > 1 && (isNull(defs) || !isObject(defs))
  let extds = isDefs ? assigns : defs

  if (isPlainObject(obj)) {
    let eachCallback

    if (isDefs) {
      eachCallback = (val, key) => {
        obj[key] = defs
      }
    } else {
      eachCallback = (val, key) => {
        helperDeleteProperty(obj, key)
      }
    }

    objectEach(obj, eachCallback)

    if (extds) {
      assign(obj, extds)
    }
  } else if (Array.isArray(obj)) {
    if (isDefs) {
      let len = obj.length

      while (len > 0) {
        len--
        obj[len] = defs
      }
    } else {
      obj.length = 0
    }

    if (extds) {
      obj.push.apply(obj, extds)
    }
  }

  return obj
}

export default clear
