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

import {
  created,
  _loadPickerData,
  _wheelChanged,
  changeWheelItemStyle,
  _loadWheels,
  _createWheelHasFooter,
  _createWheelNoFooter,
  wheelsTo,
  refreshWheel,
  dealWheels,
  clickWheelItem,
} from './index'

export const api = [
  'state',
  'created',
  '_loadPickerData',
  '_wheelChanged',
  'changeWheelItemStyle',
  '_loadWheels',
  '_createWheelHasFooter',
  '_createWheelNoFooter',
  'wheelsTo',
  'refreshWheel',
  'dealWheels',
  'clickWheelItem',
]

const initState = ({ reactive }) => {
  const state = reactive({
    dataSource: [],
    defaultSelectedIndexs: [],
    pickerData: [],
    wheels: [],
    prevSelectedIndexs: [],
  })

  return state
}

const initApi = ({ api, props, state, emit, nextTick, refs, BScroll }) => {
  Object.assign(api, {
    state,
    created: created({ api }),
    _loadPickerData: _loadPickerData({ props, state }),
    _wheelChanged: _wheelChanged({ api, state }),
    changeWheelItemStyle: changeWheelItemStyle({ state }),
    _loadWheels: _loadWheels({ api, props, state, nextTick, refs }),
    _createWheelHasFooter: _createWheelHasFooter({ api, state, emit, BScroll }),
    _createWheelNoFooter: _createWheelNoFooter({ api, state, BScroll }),
    wheelsTo: wheelsTo({ api, state, nextTick }),
    refreshWheel: refreshWheel({ nextTick }),
    dealWheels: dealWheels({ state, nextTick }),
    clickWheelItem: clickWheelItem({ api, state, emit }),
  })
}

const initWatch = ({ watch, api, props, state, nextTick }) => {
  watch(
    () => props.defaultSelectedIndexs,
    () => {
      api.dealWheels({ state })
      nextTick(() => {
        api.created({ api })
      })
    }
  )
}

export const renderless = (props, { onMounted, reactive, watch }, { emit, nextTick, refs }, { BScroll }) => {
  const api = {}
  const state = initState({ reactive })

  initApi({ api, props, state, emit, nextTick, refs, BScroll })

  initWatch({ watch, api, props, state, nextTick })

  onMounted(() => {
    api.created({ api })
  })

  return api
}
