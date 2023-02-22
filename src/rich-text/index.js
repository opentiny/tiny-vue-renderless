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

import { extend } from '@opentiny/vue-renderless/common/object'
import { xss } from '@opentiny/vue-renderless/common'
import { getToolbarTips, defaultOptions } from './options'
import registerTableModule from './table-module'
import registerCustomClipboard from './clipboard'

export const initContent = ({ state }) => () => {
  if (state.quill) {
    if (state.content && state.content !== state.innerContent) {
      state.innerContent = state.content
      state.quill.pasteHTML(state.content)
    } else if (!state.content) {
      state.quill.setText('')
    }
  }
}

const getOuterHTML = (el) => {
  if (!el.outerHTML) {
    const container = document.createElement('div')

    container.appendChild(el)

    return container.innerHTML
  } else {
    return el.outerHTML
  }
}

export const initQuill = ({ api, emit, props, refs, service, state, Quill, ImageDrop, ImageUpload, FileUpload }) => () => {
  state.innerOptions = extend(true, {}, defaultOptions, props.globalOptions, props.options)

  if (document.caretRangeFromPoint) {
    if (props.imageDrop) {
      Quill.register('modules/imageDrop', ImageDrop, true)
      state.innerOptions.modules.imageDrop = props.imageDrop
    }

    if (props.imageUpload) {
      Quill.register('modules/imageUpload', ImageUpload, true)
      state.innerOptions.modules.imageUpload = props.imageUpload
    }

    if (props.fileUpload) {
      Quill.register('modules/fileUpload', FileUpload, true)

      state.innerOptions.modules.fileUpload = extend(true, {}, { httpRequest: service && service.network.request }, props.fileUpload, {
        url: state.fileUploadUrl
      })
    }
  }

  registerTableModule(Quill)

  if (state.innerOptions.modules) {
    state.innerOptions.modules.tableModule = props.tableModule === true
  }

  registerCustomClipboard(Quill, props.keepClass)

  state.quill = Object.freeze(new Quill(refs.editor, state.innerOptions))
  state.quill.enable(false)
  state.quill.on('selection-change', api.selectionChange)
  state.quill.on('text-change', api.textChange)

  if (state.content) {
    state.quill.pasteHTML(state.content)
  }

  if (!props.disabled) {
    state.quill.enable(true)
  }

  emit('ready', state.quill)

  api.setToolbarTips()
}

export const setToolbarTips = ({ refs, t, vm }) => () => {
  let tip
  const item = getToolbarTips(t)
  const length = item.length
  const richTextEl = vm.$el

  for (let i = 0; i < length; i++) {
    tip = richTextEl.querySelectorAll('.quill-editor ' + item[i].Choice)

    if (tip.length) {
      Array.prototype.slice.call(tip).forEach((ite) => {
        ite.setAttribute('title', item[i].title)
      })
    }
  }

  tip = richTextEl.querySelectorAll('.quill-editor .ql-file')

  if (tip.length) {
    const iconEl = refs.iconFile.$el

    Array.prototype.slice.call(tip).forEach((ite) => {
      ite.innerHTML = getOuterHTML(iconEl)
    })
  }
}

export const getFileUploadUrl = ({ service }) => () => (service ? service.common.getFileUploadUrl() : Promise.resolve(''))

export const selectionChange = ({ emit, state }) => (range) => {
  if (!range) {
    emit('blur', state.quill)
  } else {
    emit('focus', state.quill)
  }
}

export const textChange = ({ emit, refs, state }) => () => {
  let html = refs.editor.children[0].innerHTML
  const quill = state.quill
  const text = state.quill.getText()

  if (html === '<p><br></p>') {
    html = ''
  }

  state.innerContent = html

  emit('update:modelValue', html)
  emit('change', { html, text, quill })
}

export const mounted = ({ api, props, state, i18n, watch }) => () => {
  if (props.fileUpload && !props.fileUpload.url) {
    api.getFileUploadUrl().then((url) => {
      url = xss.filterUrl(url)
      state.fileUploadUrl = url
      api.initQuill()
    })
  } else {
    api.initQuill()
  }

  if (i18n) {
    watch(() => i18n.locale, api.setToolbarTips)
  }
}

export const beforeUnmount = ({ api, state }) => () => {
  state.quill.off('selection-change', api.selectionChange)
  state.quill.off('text-change', api.textChange)
  state.quill = null
  delete state.quill
}
