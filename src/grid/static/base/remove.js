import helperDeleteProperty from './helperDeleteProperty'
import isFunction from './isFunction'
import each from './each'
import arrayEach from '../array/arrayEach'
import lastEach from './lastEach'
import clear from './clear'
import eqNull from './eqNull'

const pluckProperty = (name) => (obj, key) => key === name

const remove = (obj, iterate, context) => {
  if (obj) {
    if (!eqNull(iterate)) {
      let removeIndexs = []
      let rest = []

      if (!isFunction(iterate)) {
        iterate = pluckProperty(iterate)
      }

      each(obj, (item, index, rest) => {
        if (iterate.call(context, item, index, rest)) {
          removeIndexs.push(index)
        }
      })

      if (Array.isArray(obj)) {
        lastEach(removeIndexs, (item) => {
          rest.push(obj[item])
          obj.splice(item, 1)
        })
      } else {
        rest = {}
        arrayEach(removeIndexs, (key) => {
          rest[key] = obj[key]
          helperDeleteProperty(obj, key)
        })
      }

      return rest
    }

    return clear(obj)
  }

  return obj
}

export default remove
