import browser from '@opentiny/vue-renderless/common/browser'
import { remove } from '../static'
import { on } from '@opentiny/vue-renderless/common/deps/dom'

// 监听全局事件
const wheelName = browser.isDoc && /Firefox/i.test(navigator.userAgent) ? 'DOMMouseScroll' : 'mousewheel'
const eventStore = []

const GlobalEvent = {
  on(comp, type, cb) {
    if (cb) {
      eventStore.push({ comp, type, cb })
    }
  },
  off(comp, type) {
    remove(eventStore, (item) => item.comp === comp && item.type === type)
  },
  trigger(event) {
    eventStore.forEach(({ comp, type, cb }) => {
      if (type === event.type || (type === 'mousewheel' && event.type === wheelName)) {
        cb.call(comp, event)
      }
    })
  }
}

if (browser.isDoc) {
  on(document, 'keydown', GlobalEvent.trigger)
  on(document, 'contextmenu', GlobalEvent.trigger)
  on(window, 'mousedown', GlobalEvent.trigger)
  on(window, 'blur', GlobalEvent.trigger)
  on(window, 'resize', GlobalEvent.trigger)
  on(window, wheelName, GlobalEvent.trigger)
}

export default GlobalEvent
