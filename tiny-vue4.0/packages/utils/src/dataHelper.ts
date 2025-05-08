import { isObject, isArray, hasOwn } from '@vue/shared'

/**
 * 通过影射访问数据集， 建议不要回写数据集，见测试用例！
 * 比如级联表单，tree， select组件中，通过text-field, value-field， props 指定自定义数据的别名
 * @param data 待处理的数据对象，
 * @param mapping 影射规则
 * @param mapToSelf 影射后的数据仍然是待处理的数据,需要递归处理的情况，比如 children
 *
 * @example
 * let mapping={label:'text', value:'id', children:'sublist', disabled:'stopped'}
 * let data = { text: '用户1', id:'1', children:[{text:'用户2',id:'2'}, {text:'用户3',id:'3'}]}
 *
 * let $data= proxyData(data,mapping, ['children'])
 *
 * $data.label
 * $data.value
 */
export function proxyData(
  data: any,
  mapping: Record<string, string>,
  mapToSelf: string[] = ['children'], // 假设它就是数组的场景
) {
  if (isArray(data)) {
    return data.map((item) => proxyData(item, mapping, mapToSelf))
  }
  return new Proxy(data, {
    get: function (target, property: string, receiver) {
      const realPropName = mapping[property] || property

      if (mapToSelf.includes(property)) {
        const children = target[realPropName]
        if (isArray(children)) {
          return children.map((item) => proxyData(item, mapping, mapToSelf))
        } else if (isObject(children)) {
          return proxyData(children, mapping, mapToSelf)
        } else {
          return children
        }
      } else {
        return target[realPropName]
      }
    },
    set: function (target, property, newValue, receiver) {
      const realPropName = mapping[property] || property

      target[realPropName] = newValue

      return true
    },
  })
}

/**
 * 原地的转换业务数据为另一种格式。【未校验属性冲突】
 * 使用场景：方便用户将业务数据转换为组件的数据，使用之后，再转换为业务自身格式的数据
 * @param data
 * @param mapping
 * @param mapToSelf
 * @param isRevert  是否反向转移
 *
 * @example
 * let data = { text: '用户1', id:'1', sublist:[{text:'用户2',id:'2'}, {text:'用户3',id:'3'}]}
 * let mapping={text:'label', id:'value', sublist:'children'}
 *
 * let newData = transferData(data, mapping, ['sublist'], false)
 * newData.value='用户1'
 * newData.label='1'
 *
 * let backData= transferData(newData, mapping, ['sublist'], true)
 * backData.text='用户1'
 * backData.id='1'
 *
 * 【未校验属性冲突】
 * let data = { text: '用户1', id:'1', value:'v1'}
 * let mapping={  id:'value' }
 * 以上场景， id 转移成value ,会直接覆盖原value。
 *
 * let mapping={ value:'__value',  id:'value' }    考虑这样写mapping进行规避
 */
export function transferData(
  data: any,
  mapping: Record<string, string>,
  mapToSelf: string[] = ['children'], // 假设它就是数组的场景
  isRevert = false,
) {
  if (isArray(data)) {
    return data.map((item) => transferData(item, mapping, mapToSelf))
  }

  // isRevert为true时，要按照mapping的声明的倒序进行替换。
  const realMapping = isRevert
    ? Object.keys(mapping)
        .reverse()
        .map((key) => ({ from: mapping[key], to: key }))
    : Object.keys(mapping).map((key) => ({ from: key, to: mapping[key] }))

  // 循环data的属性  id->value  sublist->children
  realMapping.forEach(({ from, to }) => {
    if (!hasOwn(data, from)) return

    data[to] = data[from]
    delete data[from]

    // 需要递归处理 data[to]
    if (mapToSelf.includes(from) || mapToSelf.includes(to)) {
      if (isArray(data[to])) {
        data[to] = data[to].map((item) => transferData(item, mapping, mapToSelf, isRevert))
      } else if (isObject(data[to])) {
        data[to] = transferData(data[to], mapping, mapToSelf, isRevert)
      }
    }
  })

  return data
}
