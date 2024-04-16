import { on } from './dom'

const nodeList = []
const nameSpace = '@@clickoutsideContext'
let startClick
let seed = 0

on(document, 'mousedown', (event) => (startClick = event))

on(document, 'mouseup', (event) => {
  nodeList.forEach((node) => node[nameSpace].documentHandler(event, startClick))
  startClick = void 0
})

const createDocumentHandler = (el, binding, vnode) =>
  function (mouseup = {}, mousedown = {}) {
    let popperElm = vnode.context.popperElm || (vnode.context.state && vnode.context.state.popperElm)

    if (
      !mouseup ||
      !mouseup.target ||
      !mousedown ||
      !mousedown.target ||
      el.contains(mouseup.target) ||
      el.contains(mousedown.target) ||
      el === mouseup.target ||
      (popperElm && (popperElm.contains(mouseup.target) || popperElm.contains(mousedown.target)))
    ) {
      return
    }

    if (binding.expression && el[nameSpace].methodName && vnode.context[el[nameSpace].methodName]) {
      vnode.context[el[nameSpace].methodName]()
    } else {
      el[nameSpace].bindingFn && el[nameSpace].bindingFn()
    }
  }

/**
  该指令示例，是以Vue2的生命周期编写，在传递给模板使用时，使用适配层函数 directive() 处理成兼容Vue3的指令。
  比如：
    import Clickoutside from '@opentiny/vue-renderless/common/clickoutside'

    export default defineComponent({
      directives: directive({ Clickoutside }),
      ......
    })
 */
export default {
  bind: (el, binding, vnode) => {
    nodeList.push(el)
    const id = seed++

    el[nameSpace] = {
      id,
      documentHandler: createDocumentHandler(el, binding, vnode),
      methodName: binding.expression,
      bindingFn: binding.value
    }
  },

  update: (el, binding, vnode) => {
    el[nameSpace].documentHandler = createDocumentHandler(el, binding, vnode)
    el[nameSpace].methodName = binding.expression
    el[nameSpace].bindingFn = binding.value
  },

  unbind: (el) => {
    if (el.nodeType !== Node.ELEMENT_NODE) {
      return
    }

    let len = nodeList.length

    for (let i = 0; i < len; i++) {
      if (nodeList[i][nameSpace].id === el[nameSpace].id) {
        nodeList.splice(i, 1)
        break
      }
    }

    if (nodeList.length === 0 && startClick) {
      startClick = null
    }

    delete el[nameSpace]
  }
}
