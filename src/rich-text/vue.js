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

import { initContent, initQuill, setToolbarTips, getFileUploadUrl, selectionChange, textChange, mounted, beforeUnmount } from './index'

export const api = ['state', 'initContent', 'initQuill', 'setToolbarTips', 'selectionChange', 'textChange']

const initState = ({ reactive, props }) => {
  const state = reactive({
    innerOptions: {},
    innerContent: '',
    fileUploadUrl: (props.fileUpload && props.fileUpload.url) || '',
    content: props.modelValue || props.content
  })

  return state
}

const initApi = (args) => {
  let { api, props, state, refs, emit, service, ImageDrop } = args
  let { FileUpload, ImageUpload, Quill, t, vm, i18n, watch } = args

  Object.assign(api, {
    state,
    initContent: initContent({ state }),
    initQuill: initQuill({ service, emit, props, api, state, refs, ImageDrop, FileUpload, ImageUpload, Quill }),
    setToolbarTips: setToolbarTips({ refs, t, vm }),
    getFileUploadUrl: getFileUploadUrl({ service }),
    selectionChange: selectionChange({ emit, state }),
    textChange: textChange({ emit, refs, state }),
    mounted: mounted({ api, props, state, i18n, watch }),
    beforeUnmount: beforeUnmount({ api, state })
  })
}

const initWatch = ({ watch, props, api, state }) => {
  watch(
    () => props.modelValue,
    (value) => {
      state.content = value
      state.content && api.initContent()
    }
  )

  watch(
    () => props.content,
    (value) => {
      state.content = value
      state.content && api.initContent()
    }
  )

  watch(
    () => props.disabled,
    (param) => {
      if (state.quill) {
        state.quill.enable(!param)
      }
    }
  )
}

export const renderless = (
  props,
  { reactive, watch, onMounted, onBeforeUnmount },
  { service, emit, refs, t, vm, i18n },
  { Quill, ImageDrop, ImageUpload, FileUpload }
) => {
  const api = {}
  const state = initState({ reactive, props })
  const args = { api, props, state, refs, emit, service, ImageDrop }

  Object.assign(args, { FileUpload, ImageUpload, Quill, t, vm, i18n, watch })

  initApi(args)

  initWatch({ watch, props, api, state })
  onMounted(api.mounted)
  onBeforeUnmount(api.beforeUnmount)

  return api
}
