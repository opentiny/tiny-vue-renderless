import each from '../base/each'
import isFunction from '../base/isFunction'
import toNumber from '../number/toNumber'

const sum = (array, iterate, context) => {
  let result = 0
  let eachCallback

  if (iterate) {
    if (isFunction(iterate)) {
      eachCallback = (...args) => {
        result += toNumber(iterate.apply(context, args))
      }
    } else {
      eachCallback = (val) => {
        result += toNumber(val[iterate])
      }
    }
  } else {
    eachCallback = (val) => {
      result += toNumber(val)
    }
  }

  each(array, eachCallback)

  return result
}

export default sum
