import each from '../base/each'
import isFunction from '../base/isFunction'
import property from '../function/property'

const map = function (obj, iterate, context) {
  let result = []

  if (obj && arguments.length > 1) {
    if (!isFunction(iterate)) {
      iterate = property(iterate)
    }

    if (obj.map) {
      return obj.map(iterate, context)
    } else {
      each(obj, (...args) => {
        result.push(iterate.apply(context, args))
      })
    }
  }

  return result
}

export default map
