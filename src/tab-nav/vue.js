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
  computedNavStyle,
  computedSizeName,
  updated,
  visibilityChangeHandler,
  windowBlurHandler,
  windowFocusHandler,
  scrollToActiveTab,
  scrollIntoView,
  mounted,
  moreTabShow,
  beforeUnmount,
  scrollPrev,
  scrollNext,
  changeTab,
  setFocus,
  removeFocus
} from './index'

export const api = [
  'state',
  'setFocus',
  'removeFocus',
  'scrollPrev',
  'scrollNext',
  'changeTab',
  'scrollToActiveTab',
  'scrollIntoView',
  'moreTabShow',
  'swiperHandle'
]

export const renderless = (props, { computed, inject, onBeforeUnmount, onMounted, onUpdated, reactive }, { parent, refs, mode: tinyMode }) => {
  const api = { mounted, beforeUnmount, computedNavStyle, computedSizeName }
  const state = reactive({
    navOffset: 0,
    lineOffset: 0,
    lineWidth: 0,
    scrollable: false,
    isFocus: false,
    focusable: false,
    showMoreItem: false,
    isActive: false,
    showMoreTabs: props.showMoreTabs,
    mode: props._mode || parent.$mode || (tinyMode ? tinyMode.value : 'pc'),
    rootTabs: inject('rootTabs'),
    sizeName: computed(() => api.computedSizeName(state)),
    navStyle: computed(() => api.computedNavStyle(state))
  })
  Object.assign(api, {
    state,
    setFocus: setFocus(state),
    removeFocus: removeFocus(state),
    moreTabShow: moreTabShow(state),
    scrollPrev: scrollPrev({ refs, state }),
    scrollNext: scrollNext({ refs, state }),
    windowBlurHandler: windowBlurHandler(state),
    windowFocusHandler: windowFocusHandler(state),
    visibilityChangeHandler: visibilityChangeHandler(state),
    scrollToActiveTab: scrollToActiveTab({ props, parent, refs, state }),
    scrollIntoView: scrollIntoView({ props, parent, refs, state })
  })

  Object.assign(api, { updated: updated({ api, props, refs, state }), changeTab: changeTab(api) })
  onUpdated(() => api.updated())
  onMounted(() => api.mounted({ api, parent }))
  onBeforeUnmount(() => api.beforeUnmount({ api, parent }))

  return api
}
