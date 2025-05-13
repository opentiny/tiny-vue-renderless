// node_modules/.pnpm/lu2@2024.9.2/node_modules/lu2/theme/edge/js/common/ui/Follow.js
HTMLElement.prototype.follow = function (eleTarget, options) {
  let defaults = {
    offsets: {
      x: 0,
      y: 0
    },
    safeArea: [0, 0, 0, 0],
    // eleTrigger-eleTarget
    position: '4-1',
    // 边缘位置自动调整
    edgeAdjust: true
  }
  if (eleTarget && Object.prototype.toString.call(eleTarget) === '[object Object]') {
    options = eleTarget
    eleTarget = null
  }
  for (var keyOption in options || (options = {})) {
    if (typeof options[keyOption] == 'undefined') {
      delete options[keyOption]
    }
  }
  let objParams = Object.assign({}, defaults, options)
  if (!eleTarget) {
    let strTarget = this.getAttribute('is-follow') || this.dataset.target
    if (!strTarget) {
      return
    }
    eleTarget = document.getElementById(strTarget) || document.querySelector('.' + strTarget) || document.querySelector(strTarget)
    if (!eleTarget) {
      return
    }
  }
  let arrLegalPosition = ['4-1', '1-4', '5-7', '2-3', '2-1', '6-8', '3-4', '4-3', '8-6', '1-2', '7-5', '3-2']
  let dataOffsets = this.dataset.offsets
  let arrOffsets = []
  if (objParams.offsets.map && objParams.offsets.length) {
    arrOffsets = objParams.offsets
  } else if (typeof objParams.offsets == 'string') {
    arrOffsets = objParams.offsets.trim().split(/,\s*|\s+/)
  }
  if (dataOffsets && !options.offsets) {
    arrOffsets = dataOffsets.trim().split(/,\s*|\s+/)
  }
  if (arrOffsets.length) {
    objParams.offsets = {}
    objParams.offsets.x = arrOffsets[0]
    objParams.offsets.y = arrOffsets[1] || arrOffsets[0]
  }
  let dataOffsetX = this.dataset.offsetX
  let dataOffsetY = this.dataset.offsetY
  if (dataOffsetX) {
    objParams.offsets.x = dataOffsetX
  }
  if (dataOffsetY) {
    objParams.offsets.y = dataOffsetY
  }
  objParams.offsets.x *= 1
  objParams.offsets.y *= 1
  let dataPosition = this.dataset.position
  let dataAlign = this.dataset.align
  let isDataAlignMatch = arrLegalPosition.some((strLegalPosition) => {
    return strLegalPosition === dataAlign
  })
  if (!dataPosition && dataAlign && isDataAlignMatch) {
    dataPosition = dataAlign
  }
  if (dataPosition && (!options || !options.position)) {
    objParams.position = dataPosition
  }
  let dataEdgeAdjust = this.dataset.edgeAdjust || objParams.edgeAdjust
  let isEdgeAdjust = !(dataEdgeAdjust === '0' || dataEdgeAdjust === 'none' || dataEdgeAdjust === 'false' || dataEdgeAdjust === false)
  if (typeof dataEdgeAdjust == 'string' && typeof objParams.edgeAdjust != 'boolean') {
    objParams.edgeAdjust = isEdgeAdjust
  }
  let strOriginPosition = eleTarget.style.position
  if (strOriginPosition != 'absolute') {
    eleTarget.style.position = 'absolute'
  }
  let objBoundTrigger = this.getBoundingClientRect()
  let objBoundTarget = eleTarget.getBoundingClientRect()
  if (objBoundTarget.width * objBoundTarget.height === 0) {
    eleTarget.style.position = strOriginPosition || ''
    window.console.warn((eleTarget.id ? 'id为' + eleTarget.id + '的' : '') + '目前元素尺寸为0，无法定位')
    return
  }
  const selectorScroller = this.dataset.scroller
  let scroller
  if (selectorScroller) {
    scroller = this.closest(selectorScroller) || this.closest('#' + selectorScroller)
  }
  if (!scroller) {
    scroller = document.scrollingElement || document.documentElement
  }
  let numScrollTop = scroller.scrollTop
  let numScrollLeft = scroller.scrollLeft
  let numWinWidth = window.innerWidth
  let numWinHeight = window.innerHeight
  if (
    (objBoundTrigger.left < 0 && objBoundTrigger.right < 0) ||
    (objBoundTrigger.top < 0 && objBoundTrigger.bottom < 0) ||
    (objBoundTrigger.left > numWinWidth && objBoundTrigger.right > numWinWidth) ||
    (objBoundTrigger.top > numWinHeight && objBoundTrigger.bottom > numWinHeight)
  ) {
    objParams.edgeAdjust = isEdgeAdjust = false
  }
  let eleOffsetParent = eleTarget.offsetParent
  let objBoundOffsetParent = eleOffsetParent.getBoundingClientRect()
  const element = {
    follow: eleTarget
  }
  this.element = this.element ? Object.assign(this.element, element) : element
  this.params = this.params ? Object.assign(this.params, objParams) : objParams
  let objOffsets = objParams.offsets
  let numOffsetTop = objBoundOffsetParent.top + numScrollTop
  let numOffsetLeft = objBoundOffsetParent.left + numScrollLeft
  if (eleOffsetParent === document.body && window.getComputedStyle(eleOffsetParent).position === 'static') {
    numOffsetTop = 0
    numOffsetLeft = 0
  }
  let strPosition = objParams.position
  let numTargetLeft, numTargetTop
  let zIndex = function () {
    let objStyleTarget = window.getComputedStyle(eleTarget)
    let numZIndexTarget = Number(objStyleTarget.zIndex)
    let numZIndexNew = 19
    eleOffsetParent.childNodes.forEach((eleChild) => {
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
  if (typeof strPosition !== 'string' && strPosition.length === 2) {
    let arrPosition = strPosition
    numTargetLeft = arrPosition[0] + objOffsets.x
    numTargetTop = arrPosition[1] + objOffsets.y
    if (objParams.edgeAdjust === true) {
      if (numTargetLeft + objBoundTarget.width > numWinWidth + numScrollLeft) {
        numTargetLeft = numWinWidth + numScrollLeft - objBoundTarget.width - objOffsets.x
      }
      if (numTargetTop + objBoundTarget.height > numWinHeight + numScrollTop) {
        numTargetTop = numWinHeight + numScrollTop - objBoundTarget.height - objOffsets.y
      }
    }
    eleTarget.style.left = `${numTargetLeft}px`
    eleTarget.style.top = `${numTargetTop}px`
    eleTarget.dataset.align = '3-1'
    zIndex()
    return
  }
  let isAlignMatch = arrLegalPosition.some((strLegalPosition) => {
    return strLegalPosition === strPosition
  })
  if (isAlignMatch === false) {
    strPosition = defaults.position
  }
  let arrSafeArea = this.dataset.safeArea || getComputedStyle(eleTarget).getPropertyValue('--safe-area') || objParams.safeArea
  if (typeof arrSafeArea == 'string') {
    arrSafeArea = arrSafeArea.trim().split(/(?:,\s*|\s+)/)
  }
  arrSafeArea = arrSafeArea.map(function (val) {
    return parseFloat(val) || 0
  })
  if (arrSafeArea.length == 1) {
    arrSafeArea = arrSafeArea.concat(arrSafeArea[0], arrSafeArea[0], arrSafeArea[0])
  } else if (arrSafeArea.length == 2) {
    arrSafeArea.push(arrSafeArea[0])
    arrSafeArea.push(arrSafeArea[1])
  } else if (arrSafeArea.length == 3) {
    arrSafeArea.push(arrSafeArea[1])
  }
  const objIsOverflow = {
    // 键使用trigger-target方位表示
    // 例如'left-right'表示trigger元素的左边缘和target元素右边缘对齐时候是否溢出
    'left-right': objBoundTarget.width + objOffsets.x + arrSafeArea[3] > objBoundTrigger.left,
    'top-bottom': objBoundTrigger.top - (objBoundTarget.height + objOffsets.y + arrSafeArea[0]) < 0,
    'right-left': objBoundTrigger.right + objBoundTarget.width + objOffsets.x + arrSafeArea[1] > numWinWidth,
    'bottom-top': objBoundTrigger.bottom + objBoundTarget.height + objOffsets.y + arrSafeArea[2] > numWinHeight,
    // 新增4个方位
    'right-right': objBoundTarget.width + objOffsets.x + arrSafeArea[3] > objBoundTrigger.right,
    'left-left': objBoundTrigger.left + objBoundTarget.width + objOffsets.x + arrSafeArea[1] > numWinWidth,
    'bottom-bottom': objBoundTarget.height + objOffsets.y + arrSafeArea[0] > objBoundTrigger.bottom,
    'top-top': objBoundTrigger.top + objBoundTarget.height + objOffsets.y + arrSafeArea[2] > numWinHeight
  }
  let strDirection = 'bottom'
  var funGetPosition = () => {
    switch (strPosition) {
      case '1-4':
      case '5-7':
      case '2-3': {
        numTargetTop = objBoundTrigger.top - objBoundTarget.height
        if (strPosition === '1-4') {
          numTargetLeft = objBoundTrigger.left
        } else if (strPosition === '5-7') {
          numTargetLeft = objBoundTrigger.left - (objBoundTarget.width - objBoundTrigger.width) / 2
        } else {
          numTargetLeft = objBoundTrigger.left - (objBoundTarget.width - objBoundTrigger.width)
        }
        strDirection = 'top'
        if (isEdgeAdjust && objIsOverflow['top-bottom']) {
          if (!objIsOverflow['bottom-top']) {
            strPosition = {
              '1-4': '4-1',
              '5-7': '7-5',
              '2-3': '3-2'
            }[strPosition]
            funGetPosition()
          } else if (!objIsOverflow['left-right'] || !objIsOverflow['right-left']) {
            strPosition = {
              '1-4': '2-1',
              '5-7': '6-8',
              '2-3': '3-4'
            }[strPosition]
            funGetPosition()
          }
        }
        break
      }
      case '2-1':
      case '6-8':
      case '3-4': {
        numTargetLeft = objBoundTrigger.right
        if (strPosition === '2-1') {
          numTargetTop = objBoundTrigger.top
        } else if (strPosition === '6-8') {
          numTargetTop = objBoundTrigger.top - (objBoundTarget.height - objBoundTrigger.height) / 2
        } else {
          numTargetTop = objBoundTrigger.top - (objBoundTarget.height - objBoundTrigger.height)
        }
        strDirection = 'right'
        if (isEdgeAdjust && objIsOverflow['right-left']) {
          if (!objIsOverflow['left-right']) {
            strPosition = {
              '2-1': '1-2',
              '6-8': '8-6',
              '3-4': '4-3'
            }[strPosition]
            funGetPosition()
          } else if (!objIsOverflow['top-bottom'] || !objIsOverflow['bottom-top']) {
            strPosition = {
              '2-1': '1-4',
              '6-8': '5-7',
              '3-4': '2-3'
            }[strPosition]
            funGetPosition()
          }
        }
        break
      }
      case '4-1':
      case '7-5':
      case '3-2': {
        numTargetTop = objBoundTrigger.bottom
        if (strPosition === '4-1') {
          numTargetLeft = objBoundTrigger.left
        } else if (strPosition === '7-5') {
          numTargetLeft = objBoundTrigger.left - (objBoundTarget.width - objBoundTrigger.width) / 2
        } else {
          numTargetLeft = objBoundTrigger.left - (objBoundTarget.width - objBoundTrigger.width)
        }
        strDirection = 'bottom'
        if (isEdgeAdjust && objIsOverflow['bottom-top']) {
          if (!objIsOverflow['top-bottom']) {
            strPosition = {
              '4-1': '1-4',
              '7-5': '5-7',
              '3-2': '2-3'
            }[strPosition]
            funGetPosition()
          } else if (!objIsOverflow['left-right'] || !objIsOverflow['right-left']) {
            strPosition = {
              '4-1': '2-1',
              '7-5': '6-8',
              '3-2': '3-4'
            }[strPosition]
            funGetPosition()
          }
        }
        break
      }
      case '1-2':
      case '8-6':
      case '4-3': {
        numTargetLeft = objBoundTrigger.left - objBoundTarget.width
        if (strPosition === '1-2') {
          numTargetTop = objBoundTrigger.top
        } else if (strPosition === '8-6') {
          numTargetTop = objBoundTrigger.top - (objBoundTarget.height - objBoundTrigger.height) / 2
        } else {
          numTargetTop = objBoundTrigger.top - (objBoundTarget.height - objBoundTrigger.height)
        }
        strDirection = 'left'
        if (isEdgeAdjust && objIsOverflow['left-right']) {
          if (!objIsOverflow['right-left']) {
            strPosition = {
              '1-2': '2-1',
              '8-6': '6-8',
              '4-3': '3-4'
            }[strPosition]
            funGetPosition()
          } else if (!objIsOverflow['top-bottom'] || !objIsOverflow['bottom-top']) {
            strPosition = {
              '1-2': '1-4',
              '8-6': '5-7',
              '4-3': '2-3'
            }[strPosition]
            funGetPosition()
          }
        }
        break
      }
    }
  }
  funGetPosition()
  numTargetLeft = numTargetLeft + objOffsets.x - numOffsetLeft
  numTargetTop = numTargetTop + objOffsets.y - numOffsetTop
  if (isEdgeAdjust) {
    if (strDirection == 'top') {
      numTargetTop = numTargetTop - arrSafeArea[2]
    } else if (strDirection == 'bottom') {
      numTargetTop = numTargetTop + arrSafeArea[0]
    } else if (strDirection == 'left') {
      numTargetLeft = numTargetLeft - arrSafeArea[1]
    } else {
      numTargetLeft = numTargetLeft + arrSafeArea[3]
    }
  }
  numTargetTop += numScrollTop
  numTargetLeft += numScrollLeft
  eleTarget.style.left = `${Math.round(numTargetLeft)}px`
  eleTarget.style.top = `${Math.round(numTargetTop)}px`
  objBoundTarget = eleTarget.getBoundingClientRect()
  if (isEdgeAdjust) {
    if (strDirection == 'top' || strDirection == 'bottom') {
      if (objBoundTarget.left < arrSafeArea[3]) {
        numTargetLeft = numTargetLeft + (arrSafeArea[3] - objBoundTarget.left)
      } else if (objBoundTarget.right + arrSafeArea[1] > numWinWidth) {
        numTargetLeft = numTargetLeft - (objBoundTarget.right + arrSafeArea[1] - numWinWidth)
      }
    } else if (objBoundTarget.top < arrSafeArea[0]) {
      numTargetTop += arrSafeArea[0] - objBoundTarget.top
    } else if (objBoundTarget.bottom + arrSafeArea[2] > numWinHeight) {
      numTargetTop -= objBoundTarget.bottom + arrSafeArea[2] - numWinHeight
    }
    eleTarget.style.left = `${Math.round(numTargetLeft)}px`
    eleTarget.style.top = `${Math.round(numTargetTop)}px`
  }
  eleTarget.dataset.align = strPosition
  eleTarget.dataset.direction = strDirection
  zIndex()
  if (!eleTarget.zIndex) {
    eleTarget.zIndex = zIndex
  }
}
;[NodeList.prototype, HTMLCollection.prototype].forEach((prop) => {
  prop.follow = function () {
    ;[...this].forEach((node) => {
      if (node.nodeType === 1) {
        node.follow.apply(node, this.arguments)
      }
    })
  }
})

// node_modules/.pnpm/lu2@2024.9.2/node_modules/lu2/theme/edge/js/common/ui/Color.js
var BG_COLOR = 'background-color'
var Color = class _Color extends HTMLInputElement {
  // 指定观察的属性，这样attributeChangedCallback才会起作用
  static get observedAttributes() {
    return ['disabled']
  }
  constructor() {
    super()
    this.setProperty()
  }
  static addClass(...arg) {
    return ['ui', 'color', ...arg].join('-')
  }
  // hsl颜色转换成十六进制颜色
  static funHslToHex(h, s, l, a) {
    let r, g, b
    if (s == 0) {
      r = g = b = l
    } else {
      const hue2rgb = function (p2, q2, t) {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1 / 6) return p2 + (q2 - p2) * 6 * t
        if (t < 1 / 2) return q2
        if (t < 2 / 3) return p2 + (q2 - p2) * (2 / 3 - t) * 6
        return p2
      }
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      r = hue2rgb(p, q, h + 1 / 3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1 / 3)
    }
    const arrRgb = [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
    if (a) {
      arrRgb.push(Math.round(a * 255))
    }
    return arrRgb
      .map((rgb) => {
        rgb = rgb.toString(16)
        if (rgb.length == 1) {
          return '0' + rgb
        }
        return rgb
      })
      .join('')
  }
  // 16进制颜色转换成hsl颜色表示
  static funHexToHsl(hex) {
    hex = (hex || '').replace('#', '')
    if (hex.length == 3 || hex.length == 4) {
      hex = hex
        .split('')
        .map(function (char) {
          return char + char
        })
        .join('')
    }
    const r = parseInt(hex.slice(0, 2), 16) / 255
    const g = parseInt(hex.slice(2, 4), 16) / 255
    const b = parseInt(hex.slice(4, 6), 16) / 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h, s
    const l = (max + min) / 2
    if (max == min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }
    if (hex.length == 8) {
      const a = parseInt(hex.slice(6, 8), 16) / 255
      return [h, s, l, a]
    }
    return [h, s, l]
  }
  // rgb/rgba颜色转hex
  static funRgbToHex(rgb) {
    if (!rgb) {
      return _Color.defaultValue
    }
    let arr = []
    let arrA = []
    rgb = rgb.replace('#', '').toLowerCase()
    if (/^[0-9A-F]{1,6}$/i.test(rgb)) {
      return '#' + rgb.repeat(Math.ceil(6 / rgb.length)).slice(0, 6)
    }
    if (/^[0-9A-F]{1,8}$/i.test(rgb)) {
      return '#' + rgb.repeat(Math.ceil(8 / rgb.length)).slice(0, 8)
    }
    arr = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)/i)
    arrA = rgb.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([0|1]?\.?\d+)/i)
    const hex = (x) => ('0' + parseInt(x, 10).toString(16)).slice(-2)
    if (arr && arr.length == 4) {
      return `#${hex(arr[1])}${hex(arr[2])}${hex(arr[3])}`
    }
    if (arrA && arrA.length == 5) {
      return `#${hex(arrA[1])}${hex(arrA[2])}${hex(arrA[3])}${Math.round(arrA[4] * 255)
        .toString(16)
        .padStart(2, '0')}`
    }
    return _Color.defaultValue
  }
  get type() {
    return this.getAttribute('type') || 'color'
  }
  set type(v) {
    return this.setAttribute('type', v || 'color')
  }
  /**
   * container内的一些事件
   * @return {Object} 返回当前DOM元素对象
   */
  events() {
    const objElement = this.element
    const eleContainer = objElement.target
    const eleCircle = objElement.circle
    const eleFill = objElement.fill
    const eleArrow = objElement.arrow
    const eleField = objElement.field
    const eleOpacity = objElement.opacity
    eleContainer.addEventListener('click', (event) => {
      const eleTarget = event.target
      let strValue = ''
      const strCl = eleTarget.className
      if (/cancel/.test(strCl)) {
        this.hide()
      } else if (/lump/.test(strCl)) {
        strValue = eleTarget.getAttribute('data-color')
        this.value = '#' + strValue
      } else if (/switch/.test(strCl)) {
        if (eleTarget.textContent === '更多') {
          objElement.more.style.display = 'block'
          objElement.basic.style.display = 'none'
          eleTarget.textContent = '基本'
          objElement.mode.setAttribute('data-mode', 'basic')
        } else {
          objElement.more.style.display = 'none'
          objElement.basic.style.display = 'block'
          eleTarget.textContent = '更多'
          objElement.mode.setAttribute('data-mode', 'more')
        }
        this.match()
      }
    })
    eleField.addEventListener('input', () => {
      const value = this.value
      if (/^[0-9A-F]{6}$/i.test(value) || /^[0-9A-F]{8}$/i.test(value)) {
        this.match()
      } else if (/^[0-9A-F]{3, 4}$/i.test(value)) {
        this.match(_Color.funRgbToHex('#' + value).replace('#', ''))
      }
    })
    eleField.addEventListener('keyup', (event) => {
      if (event.keyCode == 13) {
        let strValue = eleField.value
        if (strValue) {
          if (eleOpacity) {
            strValue = _Color.funRgbToHex('#' + strValue).replace('#', '')
          } else {
            strValue = _Color.funRgbToHex('#' + strValue.slice(0, 6)).replace('#', '')
          }
          this.value = '#' + strValue
        }
        this.hide()
      }
    })
    if (eleOpacity) {
      eleOpacity.addEventListener('input', () => {
        let strValue = eleField.value
        let curOpacity = Math.round((eleOpacity.value / 100) * 255)
          .toString(16)
          .padStart(2, '0')
        if (strValue) {
          let strValueColor = strValue.slice(0, 6) + curOpacity
          this.value = strValueColor
        }
      })
    }
    const objPosArrow = {}
    const objPosCircle = {}
    eleArrow.addEventListener('pointerdown', (event) => {
      event.preventDefault()
      objPosArrow.pageY = event.pageY
      objPosArrow.top = parseFloat(window.getComputedStyle(eleArrow).top)
    })
    eleFill.addEventListener('pointerdown', (event) => {
      event.preventDefault()
      let eleTarget = event.target
      const objRect = eleTarget.getBoundingClientRect()
      const numOffsetTop = event.pageY - window.pageYOffset - objRect.top
      eleArrow.style.top = numOffsetTop + 'px'
      this.isTrustedEvent = true
      this.value = this.getValueByStyle()
      objPosArrow.pageY = event.pageY
      objPosArrow.top = parseFloat(window.getComputedStyle(eleArrow).top)
    })
    eleCircle.parentElement.querySelectorAll('a').forEach((eleRegion) => {
      eleRegion.addEventListener('pointerdown', (event) => {
        event.preventDefault()
        objPosCircle.pageY = event.pageY
        objPosCircle.pageX = event.pageX
        eleCircle.style.left = event.offsetX + 'px'
        eleCircle.style.top = event.offsetY + 'px'
        objPosCircle.top = parseFloat(event.offsetY)
        objPosCircle.left = parseFloat(event.offsetX)
        this.isTrustedEvent = true
        this.value = this.getValueByStyle()
      })
    })
    document.addEventListener(
      'pointermove',
      (event) => {
        if (typeof objPosArrow.top == 'number') {
          event.preventDefault()
          let numTop = objPosArrow.top + (event.pageY - objPosArrow.pageY)
          const numMaxTop = eleArrow.parentElement.clientHeight
          if (numTop < 0) {
            numTop = 0
          } else if (numTop > numMaxTop) {
            numTop = numMaxTop
          }
          eleArrow.style.top = numTop + 'px'
          this.isTrustedEvent = true
          this.value = this.getValueByStyle()
        } else if (typeof objPosCircle.top == 'number') {
          event.preventDefault()
          const objPos = {
            top: event.pageY - objPosCircle.pageY + objPosCircle.top,
            left: event.pageX - objPosCircle.pageX + objPosCircle.left
          }
          const objMaxPos = {
            top: eleCircle.parentElement.clientHeight,
            left: eleCircle.parentElement.clientWidth
          }
          if (objPos.left < 0) {
            objPos.left = 0
          } else if (objPos.left > objMaxPos.left) {
            objPos.left = objMaxPos.left
          }
          if (objPos.top < 0) {
            objPos.top = 0
          } else if (objPos.top > objMaxPos.top) {
            objPos.top = objMaxPos.top
          }
          const numColorH = objPos.left / objMaxPos.left
          const strColorS = 1 - objPos.top / objMaxPos.top
          eleCircle.style.left = objPos.left + 'px'
          eleCircle.style.top = objPos.top + 'px'
          const strHsl = `hsl('${[360 * numColorH, 100 * strColorS + '%', '50%'].join()})`
          eleCircle.style[BG_COLOR] = strHsl
          this.isTrustedEvent = true
          this.value = this.getValueByStyle()
        }
      },
      {
        passive: false
      }
    )
    document.addEventListener('pointerup', () => {
      objPosArrow.top = null
      objPosCircle.top = null
    })
    eleFill.parentElement.querySelectorAll('a').forEach((eleButton) => {
      eleButton.addEventListener('keydown', (event) => {
        if (event.keyCode == 38 || event.keyCode == 40) {
          event.preventDefault()
          let numTop = parseFloat(window.getComputedStyle(eleArrow).top)
          const numMaxTop = eleFill.clientHeight
          if (event.keyCode == 38) {
            numTop--
            if (numTop < 0) {
              numTop = 0
            }
          } else {
            numTop++
            if (numTop > numMaxTop) {
              numTop = numMaxTop
            }
          }
          const ariaLabel = eleArrow.getAttribute('aria-label')
          eleArrow.style.top = numTop + 'px'
          eleArrow.setAttribute('aria-label', ariaLabel.replace(/\d+/, Math.round((100 * numTop) / numMaxTop)))
          this.isTrustedEvent = true
          this.value = this.getValueByStyle()
        }
      })
    })
    eleCircle.parentElement.querySelectorAll('a').forEach((eleRegion) => {
      eleRegion.addEventListener('keydown', (event) => {
        if (event.keyCode >= 37 && event.keyCode <= 40) {
          event.preventDefault()
          const objStyleCircle = window.getComputedStyle(eleCircle)
          let numTop = parseFloat(objStyleCircle.top)
          let numLeft = parseFloat(objStyleCircle.left)
          const numMaxTop = eleRegion.clientHeight
          const numMaxLeft = eleRegion.clientWidth
          if (event.keyCode == 38) {
            numTop--
            if (numTop < 0) {
              numTop = 0
            }
          } else if (event.keyCode == 40) {
            numTop++
            if (numTop > numMaxTop) {
              numTop = numMaxTop
            }
          } else if (event.keyCode == 37) {
            numLeft--
            if (numLeft < 0) {
              numLeft = 0
            }
          } else if (event.keyCode == 39) {
            numLeft++
            if (numLeft > numMaxLeft) {
              numLeft = numMaxLeft
            }
          }
          eleCircle.style.left = numLeft + 'px'
          eleCircle.style.top = numTop + 'px'
          this.isTrustedEvent = true
          this.value = this.getValueByStyle()
        }
      })
    })
    return this
  }
  /**
   * container内HTML的创建
   * @return {Object} 返回当前DOM元素对象
   */
  create() {
    const eleContainer = this.element.target
    const isSupportOpacity = this.type === 'color-opacity'
    const strHtmlConvert = `<button class="${_Color.addClass('switch')} colorMode" data-mode="more" role="button">更多</button>`
    const strHtmlCurrent = `<div class="${_Color.addClass('current')}">
            <i class="${isSupportOpacity ? _Color.addClass('current', 'square', 'opacity') : _Color.addClass('current', 'square')} colorCurrent"></i>
            #<input class="${_Color.addClass('current', 'input')}" value="${this.value.replace('#', '')}">
        </div>`
    const arrBasicColorPreset = this.params.color.basicPreset
    const arrFixedColor = this.params.color.fixed
    const strHtmlBody =
      `<div class="${_Color.addClass('body')}">` +
      (function () {
        let strHtml = `<div class="${_Color.addClass('basic')} colorBasicX" role="listbox">`
        let arrCommonColors = (localStorage.commonColors || '').split(',')
        strHtml +=
          `<aside class="${_Color.addClass('basic', 'l')}">` +
          (function () {
            return arrFixedColor
              .concat(arrCommonColors[0] || '0ff', arrCommonColors[1] || '800180')
              .map(function (color) {
                const strColor = _Color.funRgbToHex(color).replace('#', '')
                return `<a href="javascript:" class="${_Color.addClass(
                  'lump'
                )}" data-color="${strColor}" aria-label="${strColor}" style="${BG_COLOR}:#${strColor}" role="option"></a>`
              })
              .join('')
          })() +
          '</aside>'
        strHtml =
          strHtml +
          `<div class="${_Color.addClass('basic', 'r')}">` +
          (function () {
            let strHtmlRG = ''
            arrBasicColorPreset.forEach((colorItem) => {
              strHtmlRG += `<a href="javascript:" title="#${colorItem}${isSupportOpacity ? 'ff' : ''}" class="${_Color.addClass(
                'lump',
                'preset'
              )}" data-color="${colorItem}${isSupportOpacity ? 'ff' : ''}" style="${BG_COLOR}:#${colorItem}${
                isSupportOpacity ? 'ff' : ''
              }" aria-label="${colorItem}${isSupportOpacity ? 'ff' : ''}" role="option"></a>`
            })
            return strHtmlRG
          })() +
          '</div>'
        return strHtml + '</div>'
      })() +
      (function () {
        let html = `<div class="${_Color.addClass('more')} colorMoreX">`
        html += `<div class="${_Color.addClass('more', 'l')}">
                <a href="javascript:" class="${_Color.addClass('cover', 'white')}" aria-label="色域背景块" role="region"></a><div class="${_Color.addClass(
          'circle'
        )} colorCircle"></div>
                <div class="${_Color.addClass('gradient')}">
                </div>
                </div><div class="${_Color.addClass('more', 'r')}">
                    <div class="${_Color.addClass('more', 'fill')} colorFill">
                        <a href="javascript:" class="${_Color.addClass('more', 'cover')}" aria-label="明度控制背景条" role="region"></a>
                        <div class="${_Color.addClass(
                          'gradient'
                        )}" style="background: linear-gradient(#ffffff 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0) 50%, ${_Color.defaultValue} 100%);">
                        </div>
                    </div>
                    <a href="javascript:" class="${_Color.addClass('more', 'arrow')} colorArrow" role="slider" aria-label="明度控制按钮：100%"></a>
                </div>`
        return html + '</div>'
      })() +
      (function () {
        if (isSupportOpacity) {
          let opacityHtml = `<div class="${_Color.addClass('opacity')}">透明度：<input class="${_Color.addClass(
            'opacity',
            'range'
          )} colorOpacity"type="range"  value="100" min="0" max="100" step="1" data-tips="\${value}%" is="ui-range"></div>`
          return opacityHtml
        }
        return ''
      })() +
      '</div>'
    const strHtmlFooter = ''
    eleContainer.innerHTML = strHtmlConvert + strHtmlCurrent + strHtmlBody + strHtmlFooter
    Object.assign(this.element, {
      field: eleContainer.querySelector('input'),
      basic: eleContainer.querySelector('.colorBasicX'),
      more: eleContainer.querySelector('.colorMoreX'),
      mode: eleContainer.querySelector('.colorMode'),
      opacity: eleContainer.querySelector('.colorOpacity'),
      circle: eleContainer.querySelector('.colorCircle'),
      fill: eleContainer.querySelector('.colorFill'),
      arrow: eleContainer.querySelector('.colorArrow'),
      current: eleContainer.querySelector('.colorCurrent')
    })
    const propValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')
    let eleField = this.element.field
    Object.defineProperty(eleField, 'value', {
      ...propValue,
      set(value) {
        propValue.set.call(this, value)
        eleField.dispatchEvent(new CustomEvent('change'))
      }
    })
    if (document.body.contains(eleContainer) == false) {
      document.body.appendChild(eleContainer)
    }
    this.events()
    return this
  }
  /**
   * 面板的色块啊，圆和尖角位置匹配
   * @param  {String} value 面板UI相匹配的色值，可缺省，表示使用当前输入框的颜色值进行UI变化
   * @return {Object}       返回当前DOM元素对象
   */
  match(value) {
    if (this.display != true) {
      return this
    }
    const objElement = this.element
    const eleContainer = objElement.target
    const eleCurrent = objElement.current
    const eleMore = objElement.more
    const eleCircle = objElement.circle
    const eleFill = objElement.fill
    const eleArrow = objElement.arrow
    const eleField = objElement.field
    const eleOpacity = objElement.opacity
    let isRePosition = true
    if (value === false) {
      isRePosition = false
    }
    let strValue = value || eleField.value
    if (strValue == '') {
      strValue = _Color.funRgbToHex(getComputedStyle(eleCurrent)[BG_COLOR]).replace('#', '')
      eleField.value = strValue
    }
    strValue = strValue.replace('#', '')
    if (eleOpacity) {
      if (/^[0-9A-F]{8}$/i.test(strValue)) {
        eleOpacity.value = (parseInt(strValue.slice(6, 8), 16) / 255) * 100
      }
      if (/^[0-9A-F]{6}$/i.test(strValue)) {
        eleField.value += Math.round((eleOpacity.value / 100) * 255)
          .toString(16)
          .padStart(2, '0')
      }
    } else {
      eleCurrent.style[BG_COLOR] = '#' + strValue
    }
    if (window.getComputedStyle(eleMore).display == 'none') {
      const eleActive = eleContainer.querySelector('.active')
      if (eleActive) {
        eleActive.classList.remove('active')
      }
      const eleColorMatch = eleContainer.querySelector(`a[data-color="${strValue.toUpperCase()}"]`)
      if (eleColorMatch) {
        eleColorMatch.classList.add('active')
      }
    } else {
      let numWidth = eleCircle.parentElement.clientWidth
      let numHeight = eleCircle.parentElement.clientHeight
      let numColorH = 0
      let numColorS = 1
      let numColorL = 0.5
      if (isRePosition == true) {
        let arrHSL = _Color.funHexToHsl(strValue)
        numColorH = arrHSL[0]
        numColorS = arrHSL[1]
        numColorL = arrHSL[2]
        eleCircle.style.left = numWidth * numColorH + 'px'
        eleCircle.style.top = numHeight * (1 - numColorS) + 'px'
        eleArrow.style.top = eleArrow.parentElement.clientHeight * (1 - numColorL) + 'px'
      } else {
        numColorH = parseFloat(eleCircle.style.left || 0) / numWidth
        numColorS = 1 - parseFloat(eleCircle.style.top || 0) / numHeight
      }
      let strColor = `hsl(${[360 * numColorH, Math.round(100 * numColorS) + '%', '50%'].join()}`
      eleFill.style[BG_COLOR] = strColor
      eleCircle.style[BG_COLOR] = strColor
    }
    return this
  }
  /**
   * 浮层定位方法
   * @return undefined
   */
  position() {
    this.follow()
    return this
  }
  /**
   * 颜色面板显示
   * @return undefined
   */
  show() {
    let eleContainer = this.element.target
    if (eleContainer.innerHTML.trim() == '') {
      this.create()
    }
    this.display = true
    eleContainer.style.display = 'inline'
    eleContainer.classList.add('ESC')
    this.setAttribute('aria-expanded', 'true')
    this.position()
    const eleCurrent = this.element.current
    if (!eleCurrent.getAttribute('style')) {
      eleCurrent.style[BG_COLOR] = this.value
    }
    this.match()
    this.dispatchEvent(
      new CustomEvent('show', {
        detail: {
          type: 'ui-color'
        }
      })
    )
    return this
  }
  /**
   * 颜色面板隐藏
   * @return undefined
   */
  hide() {
    let eleContainer = this.element.target
    eleContainer.style.display = 'none'
    eleContainer.classList.remove('ESC')
    this.setAttribute('aria-expanded', 'false')
    this.display = false
    this.focus()
    this.dispatchEvent(
      new CustomEvent('hide', {
        detail: {
          type: 'ui-color'
        }
      })
    )
    return this
  }
  /**
   * 给当前元素对象扩展方法、重置原生value属性
   */
  setProperty() {
    Object.defineProperty(this, 'getValueByStyle', {
      value: () => {
        const eleCircle = this.element.circle
        const eleArrow = this.element.arrow
        const eleOpacity = this.element.opacity
        if (eleCircle.length * eleArrow.length == 0) {
          return _Color.defaultValue
        }
        let numColorH, numColorS, numColorL
        if (eleCircle.style.left) {
          numColorH = parseFloat(window.getComputedStyle(eleCircle).left) / eleCircle.parentElement.clientWidth
        } else {
          numColorH = 0
        }
        if (eleCircle.style.top) {
          numColorS = 1 - parseFloat(window.getComputedStyle(eleCircle).top) / eleCircle.parentElement.clientHeight
        } else {
          numColorS = 1
        }
        if (eleArrow.style.top) {
          numColorL = 1 - parseFloat(window.getComputedStyle(eleArrow).top) / eleArrow.parentElement.clientHeight
        } else {
          numColorL = 0
        }
        if (eleOpacity && eleOpacity.value) {
          return '#' + _Color.funHslToHex(numColorH, numColorS, numColorL, eleOpacity.value / 100)
        }
        return '#' + _Color.funHslToHex(numColorH, numColorS, numColorL)
      }
    })
    const props = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')
    Object.defineProperty(_Color.prototype, 'value', {
      ...props,
      set(value) {
        let strValue = value
        let strOldValue = this.value
        if (typeof value == 'string') {
          if (/^[a-z]{3,}$/.test(strValue)) {
            document.head.style.backgroundColor = strValue
            strValue = window.getComputedStyle(document.head).backgroundColor
            document.head.style.backgroundColor = ''
          }
          strValue = _Color.funRgbToHex(strValue)
          props.set.call(this, strValue)
          if (!this.params) {
            return
          }
          const strCommonColors = localStorage.commonColors || ''
          let arrCommonColors = strCommonColors.split(',')
          const arrFixedColor = this.params.color.fixed
          if (
            arrFixedColor.some((strFixedColor) => {
              return _Color.funRgbToHex(strFixedColor) == strValue
            }) == false
          ) {
            arrCommonColors = arrCommonColors.filter((strValueWithSharp) => {
              return strValueWithSharp && strValueWithSharp != strValue.replace('#', '')
            })
            arrCommonColors.unshift(strValue.replace('#', ''))
            localStorage.commonColors = arrCommonColors.join()
            const eleBasic = this.element.basic
            if (eleBasic) {
              const eleAsideColors = eleBasic.querySelectorAll('aside a')
              const eleBasicColorLast = eleAsideColors[eleAsideColors.length - 2]
              const eleBasicColorSecond = eleAsideColors[eleAsideColors.length - 1]
              eleBasicColorLast.setAttribute('data-color', arrCommonColors[0])
              eleBasicColorLast.setAttribute('aria-label', arrCommonColors[0])
              eleBasicColorLast.style[BG_COLOR] = strValue
              const strColorSecond = arrCommonColors[1] || '0ff'
              eleBasicColorSecond.setAttribute('data-color', strColorSecond)
              eleBasicColorSecond.setAttribute('aria-label', strColorSecond)
              eleBasicColorSecond.style[BG_COLOR] = '#' + strColorSecond
            }
          }
          this.style.setProperty('--ui-color-opacity', strValue)
          this.element.target.style.setProperty('--ui-color-opacity', strValue)
          if (this.element.field) {
            this.element.field.value = strValue.replace('#', '')
          }
          if (this.isTrustedEvent) {
            this.match(false)
            this.isTrustedEvent = null
          } else {
            this.match()
          }
        } else if (!strOldValue) {
          strOldValue = _Color.defaultValue
          props.set.call(this, strOldValue)
        }
        if (strOldValue && strValue != strOldValue) {
          this.dispatchEvent(
            new CustomEvent('change', {
              'bubbles': true
            })
          )
          this.dispatchEvent(
            new CustomEvent('input', {
              'bubbles': true
            })
          )
        }
      }
    })
    if (!this.title) {
      this.title = (this.disabled ? '禁止' : '') + '颜色选择'
    }
  }
  attributeChangedCallback(name) {
    if (name == 'disabled') {
      if (this.title == '颜色选择' && this.disabled) {
        this.title = '禁止颜色选择'
      } else if (this.title == '禁止颜色选择' && !this.disabled) {
        this.title = '颜色选择'
      }
    }
  }
  connectedCallback() {
    if (!this.id) {
      this.id = 'lulu_' + (Math.random() + '').split('.')[1]
    }
    this.addEventListener('click', (event) => {
      event.preventDefault()
      if (this.display != true) {
        this.show()
      }
    })
    if (!this.dataset.position) {
      this.dataset.position = '7-5'
    }
    const eleContainer = document.createElement('div')
    eleContainer.classList.add(_Color.addClass('container'))
    eleContainer.id = ('lulu_' + Math.random()).replace('0.', '')
    this.dataset.target = eleContainer.id
    this.element = {
      target: eleContainer
    }
    if (this.getAttribute('type') === 'color-opacity') {
      this.style.setProperty('--ui-color-opacity', this.value)
      eleContainer.style.setProperty('--ui-color-opacity', this.value)
    }
    const arrBasicColor = ['0', '3', '6', '9', 'c', 'f']
    const arrBasicColorPreset = [
      '2a80eb',
      '0057c3',
      '7fdbff',
      'f7f9fa',
      '1cad70',
      '3d9970',
      '39cccc',
      'dddddd',
      'eb4646',
      'ab2526',
      'ef8a5e',
      'a2a9b6',
      'f59b00',
      'de6d00',
      'ffdc00',
      '4c5161'
    ]
    const arrFixedColor = arrBasicColor.concat('eb4646', '1cad70', '2a80eb', 'f59b00')
    this.params = this.params || {}
    this.params.color = {
      basic: arrBasicColor,
      basicPreset: arrBasicColorPreset,
      fixed: arrFixedColor
    }
    document.addEventListener('click', (event) => {
      const eleClicked = event && event.target
      if (!eleClicked || !this.display) {
        return
      }
      if (eleClicked != this && eleContainer.contains(eleClicked) == false) {
        this.hide()
      }
    })
    window.addEventListener('resize', () => {
      if (this.display) {
        this.position()
      }
    })
    this.dispatchEvent(
      new CustomEvent('connected', {
        detail: {
          type: 'ui-color'
        }
      })
    )
    this.isConnectedCallback = true
  }
}
Color.defaultValue = '#000000'
if (!customElements.get('ui-color')) {
  customElements.define('ui-color', Color, {
    extends: 'input'
  })
}
var Color_default = Color
export { Color_default as default }
//# sourceMappingURL=lu2_theme_edge_js_common_ui_Color__js.js.map
