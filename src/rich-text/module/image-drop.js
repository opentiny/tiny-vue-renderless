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

const ImageDrop = function (quill) {
  this.quill = quill
  this.handleDrop = this.handleDrop.bind(this)
  this.handlePaste = this.handlePaste.bind(this)
  this.quill.root.addEventListener('drop', this.handleDrop, false)
  this.quill.root.addEventListener('paste', this.handlePaste, false)
}

ImageDrop.prototype.handleDrop = function (e) {
  e.preventDefault()
  if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
    if (document.caretRangeFromPoint) {
      const selection = document.getSelection()
      const range = document.caretRangeFromPoint(e.clientX, e.clientY)
      if (selection && range) {
        selection.setBaseAndExtent(range.startContainer, range.startOffset, range.startContainer, range.startOffset)
      }
    }
    this.readFiles(e.dataTransfer.files, this.insert.bind(this))
  }
}

ImageDrop.prototype.handlePaste = function (e) {
  if (!e.clipboardData || !e.clipboardData.items || !e.clipboardData.items.length) {
    return
  }
  this.readFiles(e.clipboardData.items, (dataUrl) => {
    const selection = this.quill.getSelection()
    if (!selection) {
      setTimeout(() => {
        this.insert(dataUrl)
      }, 0)
    }
  })
}

ImageDrop.prototype.insert = function (dataUrl) {
  const index = (this.quill.getSelection() || {}).index || this.quill.getLength()
  this.quill.insertEmbed(index, 'image', dataUrl, 'user')
}

ImageDrop.prototype.readFiles = function (files, callback) {
  [].forEach.call(files, (file) => {
    if (!file.type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp|vnd\.microsoft\.icon)/i)) {
      return
    }
    const reader = new FileReader()
    reader.onload = function (e) {
      callback(e.target.result)
    }
    const blob = file.getAsFile ? file.getAsFile() : file
    if (blob instanceof Blob) {
      reader.readAsDataURL(blob)
    }
  })
}

export default ImageDrop
