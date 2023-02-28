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

import debounce from '@opentiny/vue-renderless/common/deps/debounce'
import { mounted, updated, unmounted, debounceMouseScroll, getContainer, linkClick } from './index'

export const api = ['state', 'debounceMouseScroll', 'getContainer', 'linkClick']

export const renderless = (props, { onMounted, onUnmounted, onUpdated, reactive }, { vm }) => {
  const api = {}
  const state = reactive({
    currentLink: '',
    scrollEvent: null,
    isScrolling: false,
    linkList: [],
    delay: 200
  })

  Object.assign(api, {
    state,
    mounted: mounted({ vm, props, state, api }),
    updated: updated({ state, api }),
    unmounted: unmounted({ state, api }),
    debounceMouseScroll: debounce(state.delay, debounceMouseScroll({ vm, state, api })),
    getContainer: getContainer({ props }),
    linkClick: linkClick({ state, vm })
  })

  onMounted(api.mounted)
  onUpdated(api.updated)
  onUnmounted(api.unmounted)

  return api
}

