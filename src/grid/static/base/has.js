import hasOwn from './hasOwnProp'
import staticHGKeyRE from '../static/staticHGKeyRE'
import helperGetHGSKeys from './helperGetHGSKeys'

const formatterArgs = (matchs, rest, isHas) => {
  let arrIndex = matchs[1]
  let objProp = matchs[2]

  if (arrIndex) {
    if (rest[arrIndex]) {
      if (hasOwn(rest[arrIndex], objProp)) {
        isHas = true
        rest = rest[arrIndex][objProp]
      }
    }
  } else {
    if (hasOwn(rest, objProp)) {
      isHas = true
      rest = rest[objProp]
    }
  }

  return { isHas, rest }
}

const has = (obj, property) => {
  if (!obj) {
    return
  }

  const compare = (property) => {
    let prop, matchs, rest, isHas
    let props = helperGetHGSKeys(property)
    let index = 0
    let len = props.length
    let flag = false

    for (rest = obj; index < len; index++) {
      isHas = false
      prop = props[index]
      matchs = prop ? prop.match(staticHGKeyRE) : ''

      if (matchs) {
        const args = formatterArgs(matchs, rest, isHas)

        isHas = args.isHas
        rest = args.rest
      } else {
        hasOwn(rest, prop) && ((isHas = true), (rest = rest[prop]))
      }

      if (isHas) {
        index === len - 1 && (flag = true)
      } else {
        break
      }
    }

    return flag
  }

  if (hasOwn(obj, property)) {
    return true
  } else {
    return compare(property)
  }
}

export default has
