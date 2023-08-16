import Countdown from './src/pc.vue'
import { version } from './package.json'

/* istanbul ignore next */
Countdown.install = function (Vue) {
  Vue.component(Countdown.name, Countdown)
}

Countdown.version = version

/* istanbul ignore next */
if (process.env.BUILD_TARGET === 'runtime') {
  if (typeof window !== 'undefined' && window.Vue) {
    Countdown.install(window.Vue)
  }
}

export default Countdown
