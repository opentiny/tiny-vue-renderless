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

import { xss } from '@opentiny/vue-renderless/common'

const Upload = function (quill, options) {
  this.quill = quill
  this.options = options || {}
  this.quill.getModule('toolbar').addHandler('file', this.selectLocalFile.bind(this))
}

const FormDataRequest = function ({ file, url, method, name, headers, callbackOK, callbackKO }) {
  const fd = new FormData()

  url = xss.filterUrl(url)
  fd.append(name, file, file.name)
  this.options.csrf && fd.append(this.options.csrf.token, this.options.csrf.hash)

  if (this.options.httpRequest) {
    const option = {
      url,
      headers,
      method,
      data: fd,
      onSuccess: function (res) {
        callbackOK(res && res.data, this.insert.bind(this))
      }.bind(this),
      onError(error) {
        callbackKO(error)
      }
    }

    const req = this.options.httpRequest(option)

    if (req && req.then) {
      req.then(option.onSuccess, option.onError)
    }
  } else {
    const xmlRequest = new XMLHttpRequest()
    xmlRequest.withCredentials = this.options.withCredentials !== false

    xmlRequest.open(method, url, true)
    for (let index in headers) {
      if (Object.prototype.hasOwnProperty.call(headers, index)) {
        xmlRequest.setRequestHeader(index, headers[index])
      }
    }

    xmlRequest.onload = function () {
      if (xmlRequest.status === 200) {
        callbackOK(JSON.parse(xmlRequest.responseText), this.insert.bind(this))
      } else {
        callbackKO({
          code: xmlRequest.status,
          type: xmlRequest.statusText,
          body: xmlRequest.responseText
        })
      }
    }.bind(this)

    xmlRequest.send(fd)
  }
}

const defaultUploader = function (file) {
  const url = this.options.url,
    method = this.options.method || 'POST',
    name = this.options.name || 'file',
    headers = this.options.headers || {},
    callbackOK = this.options.success || this.uploadCallbackOK.bind(this),
    callbackKO = this.options.fail || this.uploadCallbackKO.bind(this)

  if (url) {
    FormDataRequest.call(this, { file, url, method, name, headers, callbackOK, callbackKO })
  } else {
    const reader = new FileReader()

    reader.onload = function (event) {
      callbackOK(event.target.result, this.insert.bind(this))
    }.bind(this)
    reader.readAsDataURL(file)
  }
}

Upload.prototype.selectLocalFile = function () {
  const input = document.createElement('input')
  input.setAttribute('type', 'file')
  input.click()
  input.onchange = function () {
    const file = input.files[0]
    const checkBeforeSend = this.options.checkBeforeSend || this.checkBeforeSend.bind(this)
    checkBeforeSend(file, this.sendToServer.bind(this))
  }.bind(this)
}

Upload.prototype.checkBeforeSend = function (file, next) {
  next(file)
}

Upload.prototype.sendToServer = function (file) {
  if (this.options.customUploader) {
    this.options.customUploader(file, (file) => {
      this.insert(file).bind(this)
    })
  } else {
    defaultUploader.call(this, file)
  }
}

Upload.prototype.insert = function (file) {
  const index = (this.quill.getSelection() || {}).index || this.quill.getLength()
  this.quill.insertText(index, file.name, 'link', file.url)
  this.quill.setSelection(index + file.name.length)
}

Upload.prototype.uploadCallbackOK = function (response, next) {
  next(response)
}

Upload.prototype.uploadCallbackKO = function (error) {
  throw new Error(error)
}

export default Upload
