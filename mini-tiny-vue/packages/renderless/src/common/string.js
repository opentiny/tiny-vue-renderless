function cached(fn) {
  let cache = Object.create(null)

  return function cachedFn(str) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

const camelizeRE = /-(\w)/g
export const camelize = cached((str) => str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : '')))


export const capitalize = cached((str) => str.charAt(0).toUpperCase() + str.slice(1))
