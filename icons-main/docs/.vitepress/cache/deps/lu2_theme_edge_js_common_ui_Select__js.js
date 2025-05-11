// node_modules/.pnpm/lu2@2024.9.2/node_modules/lu2/theme/edge/js/common/ui/Select.js
var isSupportPopover = HTMLElement.prototype.hasOwnProperty('popover')
var isSupportAnchor = CSS.supports('justify-self', 'anchor-center')
var Select = class _Select extends HTMLSelectElement {
  static get observedAttributes() {
    return ['multiple', 'disabled', 'width']
  }
  constructor() {
    super()
    if (!this.element) {
      this.element = {
        button: null,
        combobox: null,
        datalist: null
      }
    }
    this.observer = null
    this.resizeObserver = null
    this.setProperty()
  }
  static addClass() {
    return ['ui', 'select'].concat([].slice.call(arguments)).join('-')
  }
  set multiple(value) {
    return this.toggleAttribute('multiple', Boolean(value))
  }
  get multiple() {
    return this.hasAttribute('multiple')
  }
  render() {
    this.create()
    this.refresh()
    this.events()
  }
  remove() {
    if (this.parentElement) {
      this.parentElement.removeChild(this)
    }
    if (this.element.combobox) {
      this.element.combobox.remove()
    }
  }
  getData() {
    if (!this.options.length) {
      return [
        {
          html: ''
        }
      ]
    }
    let eleOptgroups = this.querySelectorAll('optgroup')
    let isIntent = !!this.querySelector('optgroup[label]')
    if (eleOptgroups.length) {
      let arrData = []
      eleOptgroups.forEach((optgroup) => {
        arrData.push({
          html: optgroup.label,
          disabled: optgroup.disabled,
          className: optgroup.className,
          divide: !isIntent
        })
        optgroup.querySelectorAll('option').forEach((option) => {
          arrData.push({
            html: option.innerHTML,
            value: option.value,
            selected: option.selected,
            disabled: optgroup.disabled || option.disabled,
            className: option.className,
            intent: isIntent
          })
        })
      })
      return arrData
    }
    return [].slice.call(this.options).map((option) => {
      return {
        html: option.innerHTML,
        value: option.value,
        selected: option.selected,
        disabled: option.disabled,
        className: option.className
      }
    })
  }
  // 获取<select>元素原始状态下的尺寸
  get width() {
    let strAttrWidth = this.getAttribute('width')
    if (strAttrWidth && Number(strAttrWidth) === parseFloat(strAttrWidth)) {
      strAttrWidth = strAttrWidth + 'px'
    }
    return strAttrWidth
  }
  set width(value) {
    if (/\d/.test(value) == false) {
      return
    }
    this.setAttribute('width', value)
  }
  getWidth() {
    return this.style.width || this.width || this.offsetWidth + 'px'
  }
  setWidth() {
    if (this.element.combobox) {
      const width = this.getWidth()
      this.element.combobox.style.width = width
      this.style.transform = ''
      if (width.lastIndexOf('%') !== -1 && this.originPosition != 'absolute' && this.originPosition != 'fixed') {
        this.style.transform = `scaleX(${(this.parentElement.clientWidth * parseFloat(width) * 0.01) / this.offsetWidth})`
      }
    }
  }
  create() {
    if (this.element && this.element.combobox) {
      return
    }
    const strId = ('lulu_' + (this.id || Math.random())).replace('0.', '')
    const BUTTON_CLASS = _Select.addClass('button')
    const DATALIST_CLASS = _Select.addClass('datalist')
    const strOriginPosition = window.getComputedStyle(this).position
    this.originPosition = strOriginPosition
    const isCSSPosition = this.dataset.cssPosition || this.hasAttribute('is-css-position')
    const isCustomScroll = /windows/i.test(navigator.userAgent)
    const isPopover = !isCSSPosition && isSupportPopover
    const isAnchor = isSupportAnchor && !isCSSPosition && (this.hasAttribute('is-anchor') || this.dataset.anchor)
    this.insertAdjacentHTML(
      'afterend',
      `<div style="width: ${this.getWidth()}">
           ${
             !this.multiple
               ? `<button
                type="button"
                class="${BUTTON_CLASS}"
                ${isPopover ? 'popovertarget' : 'data-target'}="${strId}"
                aria-owns="${strId}"
                aria-expanded="false"
                style="display: ${this.multiple ? 'none' : 'block'};anchor-name: --${strId}"
                ${this.disabled ? 'disabled ' : ''}
            /></button>`
               : ''
           }
                <ui-select-list 
                id="${strId}" ${isPopover ? 'popover' : ''} 
                role="listbox" 
                aria-expanded="false" 
                class="${DATALIST_CLASS}" 
                ${!this.multiple ? 'aria-hidden="true"' : ''} 
                data-custom-scroll="${isCustomScroll}"
                ${isAnchor ? 'data-anchor="true"' : ''}
                style="position-anchor:--${strId};"
            ></ui-select-list>
        </div>`
    )
    let eleCombobox = this.nextElementSibling
    Object.assign(this.element, {
      combobox: eleCombobox,
      button: eleCombobox.querySelector(`.${BUTTON_CLASS}`),
      datalist: eleCombobox.querySelector(`.${DATALIST_CLASS}`)
    })
    if (strOriginPosition != 'fixed') {
      this.style.position = 'absolute'
    }
    this.dispatchEvent(new CustomEvent('DOMContentLoaded'))
  }
  /**
   * 下拉内容的刷新
   * @param {Array} data 刷新列表数组项，可选
   */
  refresh(data) {
    const isMultiple = this.multiple
    const eleSelect = this
    const eleCombobox = this.element.combobox
    const eleButton = this.element.button
    const eleDatalist = this.element.datalist
    if (!eleDatalist) {
      return
    }
    const strId = eleDatalist.id
    data = data || this.getData()
    eleCombobox.className = `${eleSelect.className} ${_Select.addClass()}`.trim()
    if (isMultiple) {
      eleCombobox.style.height = eleSelect.style.height || eleSelect.offsetHeight + 'px'
    } else if (eleSelect[eleSelect.selectedIndex]) {
      const strHtmlSelected = eleSelect[eleSelect.selectedIndex].innerHTML
      eleButton.innerHTML = `<span class="${_Select.addClass('text')}">${strHtmlSelected}</span><i class="${_Select.addClass('icon')}" aria-hidden="true"></i>`
      eleButton.dataset.value = eleSelect[eleSelect.selectedIndex].value
    }
    let index = -1
    eleDatalist.innerHTML = data
      .map((obj) => {
        let arrCl = [_Select.addClass('datalist', 'li'), obj.className]
        if (obj.selected) arrCl.push('selected')
        if (obj.disabled) arrCl.push('disabled')
        if (typeof obj.divide != 'undefined') {
          if (obj.divide) {
            arrCl = [_Select.addClass('datalist', 'hr'), obj.className]
            return `<div class="${arrCl.join(' ')}"></div>`
          }
          return `<div class="${arrCl.join(' ')}" role="heading">${obj.html}</div>`
        }
        index++
        if (obj.intent) {
          arrCl.push(_Select.addClass('intent'))
        }
        if (!obj.html) {
          return `<span class="${arrCl.join(' ')} disabled"></span>`
        }
        if (isMultiple) {
          return `<a class="${arrCl.join(' ')}" data-index=${index}>${obj.html}</a>`
        }
        return `<a
                ${obj.disabled ? '' : ' href="javascript:" '}
                class="${arrCl.join(' ')}"
                data-index=${index}
                data-target="${strId}"
                role="option"
                aria-selected="${obj.selected}"
            >${obj.html}</a>`
      })
      .join('')
  }
  /**
   * 下拉的事件处理
   */
  events() {
    if (this.multiple) {
      this.createMultipleEvent()
    } else {
      this.createNormalEvent()
    }
  }
  /**
   * 下拉的层级处理
   */
  zIndex() {
    let eleTarget = this.element.datalist
    let objStyleTarget = window.getComputedStyle(eleTarget)
    let numZIndexTarget = Number(objStyleTarget.zIndex)
    let numZIndexNew = 19
    document.body.childNodes.forEach((eleChild) => {
      if (eleChild.nodeType !== 1) return
      let objStyleChild = window.getComputedStyle(eleChild)
      let numZIndexChild = objStyleChild.zIndex * 1
      if (numZIndexChild && eleTarget !== eleChild && objStyleChild.display !== 'none') {
        numZIndexNew = Math.max(numZIndexChild + 1, numZIndexNew)
      }
    })
    if (numZIndexNew !== numZIndexTarget) {
      eleTarget.style.zIndex = numZIndexNew
    }
  }
  /**
   * 定位
   */
  position() {
    const objElement = this.element
    let eleCombobox = objElement.combobox
    let eleButton = objElement.button
    let eleDatalist = objElement.datalist
    if (!eleCombobox.classList.contains('active')) {
      return
    }
    let objBoundButton = eleButton.getBoundingClientRect()
    if (!eleCombobox.contains(eleDatalist) || eleButton.popoverTargetElement) {
      eleDatalist.style.left = objBoundButton.left + document.scrollingElement.scrollLeft + 'px'
      eleDatalist.style.top = objBoundButton.bottom + document.scrollingElement.scrollTop - 1 + 'px'
      eleDatalist.style.width = eleCombobox.getBoundingClientRect().width + 'px'
      eleDatalist.classList.add('active')
      this.zIndex()
    }
    let objBoundDatalist = eleDatalist.getBoundingClientRect()
    var isOverflow = objBoundDatalist.bottom + window.pageYOffset > Math.max(document.body.clientHeight, window.innerHeight)
    eleCombobox.classList[isOverflow ? 'add' : 'remove']('reverse')
    if (isOverflow && !this.dataset.cssPosition && !this.hasAttribute('is-css-position')) {
      eleDatalist.style.top = objBoundButton.top + document.scrollingElement.scrollTop - objBoundDatalist.height + 1 + 'px'
    }
  }
  /**
   * 单选下拉框的事件
   */
  createNormalEvent() {
    const objElement = this.element
    let eleCombobox = objElement.combobox
    let eleButton = objElement.button
    let eleDatalist = objElement.datalist
    eleButton.addEventListener('click', () => {
      if (this.disabled) {
        return false
      }
      eleCombobox.classList.toggle('active')
      if (eleCombobox.classList.contains('active')) {
        if (this.dataset.cssPosition || this.hasAttribute('is-css-position') || isSupportPopover) {
          eleCombobox.appendChild(eleDatalist)
        } else {
          document.body.appendChild(eleDatalist)
        }
        this.position()
        eleButton.setAttribute('aria-expanded', 'true')
        eleDatalist.removeAttribute('aria-hidden')
        var arrDataScrollTop = eleCombobox.dataScrollTop
        var eleDatalistSelected = eleDatalist.querySelector('.selected')
        if (
          arrDataScrollTop &&
          eleDatalistSelected &&
          arrDataScrollTop[1] === eleDatalistSelected.getAttribute('data-index') &&
          arrDataScrollTop[2] === eleDatalistSelected.innerText
        ) {
          eleDatalist.scrollTop = arrDataScrollTop[0]
          delete eleCombobox.dataScrollTop
        }
      } else {
        eleCombobox.classList.remove('reverse')
        eleButton.setAttribute('aria-expanded', 'false')
        eleDatalist.remove()
      }
    })
    eleDatalist.addEventListener('click', (event) => {
      var target = event.target
      if (!target || !target.closest) {
        return
      }
      var eleList = target
      var eleOption = null
      var isDisabled = eleList.classList.contains('disabled')
      var indexOption = eleList.getAttribute('data-index')
      var scrollTop = eleDatalist.scrollTop
      eleCombobox.dataScrollTop = [scrollTop, indexOption, eleList.innerText]
      if (!isDisabled) {
        eleOption = this[indexOption]
        if (eleOption) {
          eleOption.selected = true
        }
      }
      eleCombobox.classList.remove('active')
      eleButton.setAttribute('aria-expanded', 'false')
      eleDatalist.remove()
      eleButton.focus()
      eleButton.blur()
      if (!isDisabled) {
        this.refresh()
        this.dispatchEvent(
          new CustomEvent('change', {
            'bubbles': true
          })
        )
      }
    })
    const eleScrollable = []
    const funWalk = (ele) => {
      if (ele == document.body) {
        return
      }
      if (window.getComputedStyle(ele).overflow == 'auto') {
        eleScrollable.push(ele)
      }
      funWalk(ele.parentElement)
    }
    if (!this.dataset.cssPosition && !this.hasAttribute('is-css-position') && !isSupportPopover) {
      funWalk(eleButton.parentElement)
      eleScrollable.forEach((ele) => {
        ele.addEventListener('scroll', () => {
          this.position()
        })
      })
    }
    if (!document.isSelectMouseEvent) {
      document.addEventListener('mouseup', (event) => {
        var target = event.target
        if (!target) {
          return
        }
        const eleCombobox2 = document.querySelector('select+.ui-select.active')
        if (!eleCombobox2) {
          return
        }
        const eleSelect = eleCombobox2.previousElementSibling
        const eleDatalist2 = eleSelect.element && eleSelect.element.datalist
        if (!eleDatalist2.contains(target) && !eleCombobox2.contains(target)) {
          eleCombobox2.classList.remove('active')
          eleCombobox2.classList.remove('reverse')
          eleDatalist2.remove()
        }
      })
      document.isSelectMouseEvent = true
    }
  }
  /**
   * 多选下拉的事件处理
   */
  createMultipleEvent() {
    const eleDatalist = this.element.datalist
    this.addEventListener('change', () => {
      this.refresh()
    })
    this.addEventListener('scroll', () => {
      eleDatalist.scrollTop = this.scrollTop
    })
    this.addEventListener('mousedown', () => {
      this.setAttribute('data-active', 'true')
    })
    this.addEventListener('mousemove', (event) => {
      if (this.getAttribute('data-active')) {
        this.refresh()
        return
      }
      var clientY = event.clientY
      var clientX = event.clientX
      var elesFromPoint = document.elementsFromPoint(clientX, clientY)
      var eleListAll = eleDatalist.querySelectorAll('a')
      for (var indexList = 0; indexList < eleListAll.length; indexList++) {
        var eleList = eleListAll[indexList]
        eleList.removeAttribute('href')
        if ([...elesFromPoint].includes(eleList)) {
          if (!eleList.classList.contains('selected') && !eleList.classList.contains('disabled')) {
            eleList.href = 'javascript:'
          }
          break
        }
      }
    })
    this.addEventListener('mouseout', () => {
      var eleListAllWithHref = eleDatalist.querySelectorAll('a[href]')
      eleListAllWithHref.forEach(function (eleList) {
        eleList.removeAttribute('href')
      })
    })
    document.addEventListener('mouseup', () => {
      this.removeAttribute('data-active')
    })
  }
  /**
   * 重置原生的属性
   */
  setProperty() {
    Object.defineProperty(this, 'value', {
      configurable: true,
      enumerable: true,
      writeable: true,
      get: () => {
        return [...this.selectedOptions].map((option) => option.value).join()
      },
      set: (value) => {
        ;[...this.options].some((option) => {
          if (value.split(',').includes(option.value)) {
            option.selected = true
            if (!this.multiple) {
              return true
            }
          } else if (this.multiple) {
            option.selected = false
          }
        })
      }
    })
    const props = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'selectedIndex')
    Object.defineProperty(HTMLSelectElement.prototype, 'selectedIndex', {
      ...props,
      set(v) {
        if (this.options[v]) {
          this.options[v].selected = true
        }
      }
    })
  }
  /**
   * <select>属性变化时候的处理
   * @param {String} name 变化的属性名称
   */
  attributeChangedCallback(name) {
    const eleButton = this.element.button
    if (name === 'disabled') {
      if (!eleButton) return
      eleButton.disabled = this.disabled
    } else if (name === 'multiple') {
      if (this.element.combobox) {
        this.element.combobox.remove()
        this.render()
      }
    } else if (name == 'width') {
      this.setWidth()
    }
  }
  /**
   * is="ui-select" 元素载入到页面后
   */
  connectedCallback() {
    console.log('connectedCallback')
    this.observer = new MutationObserver((mutationsList) => {
      let isRefresh = true
      mutationsList.forEach((mutation) => {
        if (mutation.type == 'attributes' && mutation.target.hasAttribute('selected')) {
          mutation.target.selected = true
          isRefresh = false
        }
      })
      if (isRefresh) {
        this.refresh()
      }
    })
    this.resizeObserver = new ResizeObserver(() => {
      this.setWidth()
      this.position()
    })
    this.observer.observe(this, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['selected']
    })
    this.resizeObserver.observe(this)
    this.dispatchEvent(
      new CustomEvent('connected', {
        detail: {
          type: 'ui-select'
        }
      })
    )
    this.isConnectedCallback = true
    this.render()
  }
  /**
   * is="ui-select" 元素从页面移除后
   */
  disconnectedCallback() {
    if (!this.observer || !this.resizeObserver) {
      return
    }
    this.remove()
    this.observer.disconnect()
    this.resizeObserver.disconnect()
  }
}
var propOptionSelected = Object.getOwnPropertyDescriptor(HTMLOptionElement.prototype, 'selected')
Object.defineProperty(HTMLOptionElement.prototype, 'selected', {
  ...propOptionSelected,
  set(value) {
    propOptionSelected.set.call(this, value)
    if (this.parentElement && this.parentElement.refresh) {
      this.parentElement.refresh()
    }
  }
})
if (!customElements.get('ui-select')) {
  customElements.define('ui-select', Select, {
    extends: 'select'
  })
}
//# sourceMappingURL=lu2_theme_edge_js_common_ui_Select__js.js.map
