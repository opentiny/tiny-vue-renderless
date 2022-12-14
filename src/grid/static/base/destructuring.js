import keys from './keys'
import slice from '../array/slice'
import assign from '../object/assign'
import includes from '../array/includes'
import arrayEach from '../array/arrayEach'

const destructuring = function (destination, sources) {
  if (destination && sources) {
    let rest = assign.apply(this, [{}].concat(slice(arguments, 1)))
    let restKeys = keys(rest)

    arrayEach(keys(destination), (key) => {
      if (includes(restKeys, key)) {
        destination[key] = rest[key]
      }
    })
  }

  return destination
}

export default destructuring
