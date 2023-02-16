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
  handleKeydown,
  isValidValue,
  changeSelectionRange,
  handleConfirm,
  setMaxSelectionRange,
  setMinSelectionRange,
  handleChange,
  handleMaxChange,
  handleMinChange,
  handleCancel,
  handleClear,
  watchVisible,
  watchValue,
  minTimeOfDay,
  maxTimeOfDay,
  advanceTime,
  compuAmPmMode
} from './index'
import { parseDate } from '@opentiny/vue-renderless/common/deps/date-util'

export const api = ['state', 'handleMinChange', 'handleConfirm', 'setMinSelectionRange', 'handleCancel', 'setMaxSelectionRange', 'handleMaxChange']

const initState = ({ reactive, computed, refs, api }) => {
  const state = reactive({
    popperClass: '',
    defaultValue: null,
    format: 'HH:mm:ss',
    visible: false,
    value: [],
    oldValue: [new Date(), new Date()],
    selectionRange: [0, 2],
    arrowControl: false,
    maxDate: new Date(),
    minDate: new Date(),
    showSeconds: computed(() => (state.format || '').indexOf('ss') !== -1),
    offset: computed(() => (state.showSeconds ? 11 : 8)),
    spinner: computed(() => (state.selectionRange[0] < state.offset ? refs.minSpinner : refs.maxSpinner)),
    btnDisabled: computed(() => state.minDate.getTime() > state.maxDate.getTime()),
    amPmMode: computed(() => api.compuAmPmMode())
  })

  return state
}

export const renderless = (props, { computed, reactive, watch, nextTick }, { t, refs, emit: $emit }) => {
  const api = {}
  const emit = props.emitter ? props.emitter.emit : $emit
  const MIN_TIME = parseDate('00:00:00', 'HH:mm:ss', t)
  const MAX_TIME = parseDate('23:59:59', 'HH:mm:ss', t)
  const state = initState({ reactive, computed, refs, api })

  Object.assign(api, {
    t,
    state,
    handleClear: handleClear(emit),
    compuAmPmMode: compuAmPmMode(state),
    maxTimeOfDay: maxTimeOfDay({ MAX_TIME }),
    minTimeOfDay: minTimeOfDay({ MIN_TIME }),
    changeSelectionRange: changeSelectionRange({ refs, state }),
    setMaxSelectionRange: setMaxSelectionRange({ emit, state }),
    setMinSelectionRange: setMinSelectionRange({ emit, state }),
    isValidValue: isValidValue({ refs, state }),
    handleConfirm: handleConfirm({ emit, refs, state }),
    handleCancel: handleCancel({ emit, refs, state }),
    watchVisible: watchVisible({ nextTick, refs, state }),
    advanceTime: advanceTime(api),
    watchValue: watchValue({ api, state }),
    handleKeydown: handleKeydown({ api, state }),
    handleChange: handleChange({ api, emit, refs, state }),
    handleMinChange: handleMinChange({ api, state }),
    handleMaxChange: handleMaxChange({ api, state })
  })

  watch(() => state.value, api.watchValue)
  watch(() => state.visible, api.watchVisible)

  return api
}
