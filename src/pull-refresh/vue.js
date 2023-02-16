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

import { mountedHandler, beforeUnmountHandler, watchModelValue, onTouchstart, onTouchmove, onTouchend } from './index'

export const api = ['state']

export const renderless = (props, { computed, onMounted, reactive, watch, onBeforeUnmount }, { refs, emit }) => {
  const api = {}
  const state = reactive({
    replaces: '',
    styleObj: {},
    translate3d: 0,
    draggposition: 0,
    value: props.modelValue,
    checkStatus: false,
    headHeight: props.headHeight,
    pullingText: props.pullingText,
    loosingText: props.loosingText,
    successText: props.successText,
    successDuration: props.successDuration,
    animationDuration: props.animationDuration,
    disabled: computed(() => props.disabled)
  })

  Object.assign(api, {
    state,
    onTouchstart: onTouchstart({ state }),
    onTouchmove: onTouchmove({ refs, state }),
    onTouchend: onTouchend({ emit, props, state }),
    mountedHandler: mountedHandler({ api, refs, state }),
    beforeUnmountHandler: beforeUnmountHandler({ api, refs })
  })

  watch(
    () => props.modelValue,
    (value) => {
      watchModelValue({ value, state })
    }
  )

  onMounted(api.mountedHandler)
  onBeforeUnmount(api.beforeUnmountHandler)

  return api
}
