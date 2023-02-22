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

let selectors = []
let doms = []
let scrolls = []

function backup() {
  doms.push(window)
  scrolls.push({ left: window.pageXOffset, top: window.pageYOffset })

  selectors.forEach((selector) => {
    const dom = document.querySelector(`.${selector}`)

    if (dom) {
      doms.push(dom)
      scrolls.push({ left: dom.scrollLeft, top: dom.scrollTop })
    }
  })
}

function restore() {
  doms.forEach((dom, i) => dom.scrollTo(scrolls[i]))

  doms = []
  scrolls = []
}

function registerCustomClipboard(Quill, keepClass) {
  const Clipboard = Quill.import('modules/clipboard')
  const Delta = Quill.import('delta')

  if (typeof keepClass === 'string') {
    selectors.push(keepClass)
  } else if (Array.isArray(keepClass)) {
    selectors = keepClass.slice(0)
  }

  class CustomClipboard extends Clipboard {
    onPaste(e) {
      backup() // 备份滚动位置

      if (e.defaultPrevented || !this.quill.isEnabled()) {
        return
      }

      const range = this.quill.getSelection()
      let delta = new Delta().retain(range.index)

      const scrollTop = this.quill.scrollingContainer.scrollTop

      this.container.focus()
      this.quill.selection.update(Quill.sources.SILENT)

      setTimeout(() => {
        delta = delta.concat(this.convert()).delete(range.length)

        this.quill.updateContents(delta, Quill.sources.USER)
        this.quill.setSelection(delta.length() - range.length, Quill.sources.SILENT)
        this.quill.scrollingContainer.scrollTop = scrollTop
        this.quill.focus()

        restore() // 还原滚动位置
      }, 1)
    }
  }

  Quill.register('modules/clipboard', CustomClipboard, true)
}

export default registerCustomClipboard
