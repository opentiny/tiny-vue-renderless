import arrayEach from './arrayEach'
import toArray from './toArray'
import map from './map'
import isFunction from '../base/isFunction'
import isUndefined from '../base/isUndefined'
import isNull from '../base/isNull'
import get from '../base/get'
import property from '../function/property'

// 支持中文、数字、字母排序 > null > undefined
const sortByDef = (v1, v2) => {
  if (isUndefined(v1) || isUndefined(v2)) {
    return isUndefined(v2) ? 1 : -1
  }

  if (isNull(v1) || isNull(v2)) {
    return isNull(v2) ? 1 : -1
  }

  return v1 && v1.localeCompare ? v1.localeCompare(v2) : v1 > v2 ? 1 : -1
}

const sortMultis = (name, compares) => {
  return (item1, item2) => {
    let v1 = item1[name]
    let v2 = item2[name]

    if (v1 === v2) {
      return compares ? compares(item1, item2) : 0
    }

    return sortByDef(v1, v2)
  }
}

const getSortPros = (arr, list, iterate, context) => {
  iterate = Array.isArray(iterate) ? iterate : [iterate]

  arrayEach(iterate, (prop, index) => {
    let eachCallback

    if (isFunction(prop)) {
      eachCallback = (val, key) => {
        val[index] = prop.call(context, val.data, key, arr)
      }
    } else {
      eachCallback = (val) => {
        val[index] = get(val.data, prop)
      }
    }

    arrayEach(list, eachCallback)
  })

  return iterate
}

const sortBy = (arr, iterate, context, STR_UNDEFINED) => {
  if (arr) {
    if (iterate === STR_UNDEFINED) {
      return toArray(arr).sort(sortByDef)
    }

    let compares
    let list = map(arr, (item) => ({ data: item }))
    let sortPros = getSortPros(arr, list, iterate, context)
    let len = sortPros.length

    if (len) {
      while (len >= 0) {
        compares = sortMultis(len, compares)
        len--
      }

      list = list.sort(compares)
    }

    return map(list, property('data'))
  }

  return []
}

export default sortBy
