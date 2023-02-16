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

import { handleMoreClick, handleItemClick } from './index'

export const api = ['state', 'handleMoreClick', 'handleItemClick']

export const renderless = (props, { computed, reactive }, { emit }) => {
  const api = {
    handleMoreClick: handleMoreClick(emit),
    handleItemClick: handleItemClick(emit)
  }

  const state = reactive({
    visibleOptions: computed(() => props.options.slice(0, props.maxShowNum)),
    moreOptions: computed(() => props.options.slice(props.maxShowNum)),
    spacing: computed(() => (String(props.spacing).includes('px') ? props.spacing : props.spacing + 'px'))
  })

  Object.assign(api, {
    state
  })

  return api
}
