/**
* Copyright (c) 2022 - present TinyVue Authors.
* Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
*
* Use of this source code is governed by an MIT-style license.
*
* THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
* BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
* A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
*
*/

import { copyArray } from '@opentiny/vue-renderless/common/object'

export const getObj = (props) => () => props.data.reduce((o, cur) => (o[cur[props.props.key]] = cur) && o, {})

export const getSourceData = ({ props, Tree }) => () => {
  if (props.render && props.render.plugin.name === Tree) {
    return props.data
  }

  return props.data.filter((item) => props.modelValue.indexOf(item[props.props.key]) === -1)
}

export const getFlatData = (data, hasChildren) => {
  const nodes = []

  const getChild = (data) => {
    data.forEach((node) => {
      nodes.push(node)
      if (node.children && node.children.length > 0) {
        getChild(node.children)
      }
    })
  }

  getChild(data)

  if (hasChildren) {
    nodes.forEach((item) => {
      if (item.children) {
        delete item.children
      }
    })
  }

  return nodes
}

export const getTargetData = ({ order, props, state, Tree, Table }) => () => {
  if (props.render && props.render.plugin.name === Tree) {
    const nodes = getFlatData(copyArray(props.data), true)

    const rightData = nodes.filter((item) => props.modelValue.indexOf(item[props.props.key]) > -1)

    const sortAry = []

    props.modelValue.forEach((value) => {
      sortAry.push(rightData.filter((item) => item[props.props.key] === value)[0])
    })

    sortAry.flag = 'sort'

    return sortAry
  }

  if (props.targetOrder === order) {
    return props.data.filter((item) => props.modelValue.indexOf(item[props.props.key]) > -1)
  } else {
    const data = props.modelValue.reduce((arr, cur) => {
      const val = state.dataObj[cur]

      if (val) {
        arr.push(val)
      }

      return arr
    }, [])

    if (props.render && props.render.plugin.name === Table) {
      data.flag = 'table'
    }

    return data
  }
}

export const onSourceCheckedChange = ({ emit, state }) => (val, movedKeys) => {
  state.leftChecked = val

  if (movedKeys === undefined) {
    return
  }

  emit('left-check-change', val, movedKeys)
}

export const onTargetCheckedChange = ({ emit, state }) => (val, movedKeys) => {
  state.rightChecked = val

  if (movedKeys === undefined) {
    return
  }

  emit('right-check-change', val, movedKeys)
}

export const addToLeft = ({ emit, props, state }) => (value) => {
  state.isToLeft = true

  let currentValue = props.modelValue.slice()

  if (value === 'all') {
    state.rightChecked = state.rightData.map((item) => item[props.props.key])
  }

  state.rightChecked.forEach((item) => {
    const index = currentValue.indexOf(item)

    if (index > -1) {
      currentValue.splice(index, 1)
    }
  })

  state.rightChecked = state.rightChecked.slice(0)

  emit('update:modelValue', currentValue)
  emit('change', currentValue, 'left', state.rightChecked)
}

export const addToRight = ({ emit, refs, props, state, Tree }) => (value) => {
  state.isToLeft = false

  let currentValue = props.modelValue.slice()
  const itemsToBeMoved = []
  const key = props.props.key

  if (props.render && props.render.plugin.name === Tree) {
    if (!props.treeOp.checkStrictly) {
      currentValue = refs.leftPanel.$refs.plugin.getCheckedKeys()
    } else {
      state.leftChecked.forEach((item) => currentValue.indexOf(item) === -1 && currentValue.push(item))
    }
  } else {
    if (value === 'all') {
      state.leftData.forEach((item) => {
        const itemKey = item[key]

        if (props.modelValue.indexOf(itemKey) === -1) {
          itemsToBeMoved.push(itemKey)
        }
      })

      state.leftChecked = itemsToBeMoved.slice()
    } else {
      props.data.forEach((item) => {
        const itemKey = item[key]

        if (state.leftChecked.indexOf(itemKey) > -1 && props.modelValue.indexOf(itemKey) === -1) {
          itemsToBeMoved.push(itemKey)
        }
      })
    }

    currentValue = props.targetOrder === 'unshift' ? itemsToBeMoved.concat(currentValue) : currentValue.concat(itemsToBeMoved)
  }

  state.rightDisabled = false

  emit('update:modelValue', currentValue)
  emit('change', currentValue, 'right', state.leftChecked)
}

export const clearQuery = (refs) => (which) => {
  if (which === 'left') {
    refs.leftPanel.state.query = ''
  } else if (which === 'right') {
    refs.rightPanel.state.query = ''
  }
}

export const logicFun = ({ props, emit, state }) => ({ event, isAdd, pullMode }) => {
  let currentValue = props.modelValue.slice()
  let movedKeys = []

  if (pullMode) {
    currentValue.splice(event.newIndex, 0, currentValue.splice(event.oldIndex, 1)[0])
  } else {
    const key = isAdd ? state.targetData[event.oldIndex][props.props.key] : state.sourceData[event.oldIndex][props.props.key]
    const index = isAdd ? state.rightChecked.indexOf(key) : state.leftChecked.indexOf(key)
    const valueIndex = currentValue.indexOf(key)

    if (isAdd) {
      ~valueIndex && currentValue.splice(valueIndex, 1)
    } else {
      !~valueIndex && currentValue.splice(event.newIndex, 0, key)
    }

    if (~index) {
      isAdd ? state.rightChecked.splice(index, 1) : state.leftChecked.splice(index, 1)
    }

    movedKeys = [key]
  }

  state.rightChecked = state.rightChecked.slice(0)

  emit('update:modelValue', currentValue)
  emit('change', currentValue, 'left', movedKeys)
}

export const sortableEvent = ({ api, droppanel, props, queryDom, refs }) => () => {
  if (props.dropConfig) {
    const leftPanel = refs.leftPanel.$el.querySelector(droppanel)
    const Sortable = props.dropConfig.plugin

    new Sortable(leftPanel, {
      group: 'sorting',
      handle: queryDom,
      sort: false,
      filter: '.is-disabled',
      onAdd(event) {
        api.logicFun({ event, isAdd: true })
      },
      onRemove(event) {
        api.logicFun({ event, isAdd: false })
      }
    })

    const rightPanle = refs.rightPanel.$el.querySelector(droppanel)

    new Sortable(rightPanle, {
      group: 'sorting',
      handle: queryDom,
      sort: true,
      filter: '.is-disabled',
      onUpdate(event) {
        if (event.pullMode) {
          return
        }

        api.logicFun({ event, pullMode: 'sort' })
      }
    })
  }
}

export const getLeftCheckedData = ({ props, state }) => () => state.sourceData.filter((item) => !item[props.props.disabled])

export const getRightCheckedData = ({ props, state }) => () => state.targetData.filter((item) => !item[props.props.disabled])

export const recursiveData = ({ api, props, state }) => (data, isCasader, sign) => {
  const propChildren = (props.treeOp && props.treeOp.props && props.treeOp.props.children) || 'children'
  const values = props.modelValue.slice()
  const key = props.props.key

  data.forEach((obj) => {
    const isChecked = ~values.indexOf(obj[key])

    if (sign && !isCasader) {
      state.treeData.push(obj)
    } else {
      if (isChecked) {
        state.treeData.push(obj)
      }
    }

    if (obj[propChildren] && obj[propChildren].length > 0) {
      api.recursiveData(obj[propChildren], isCasader, isChecked ? true : false)
    }
  })
}
