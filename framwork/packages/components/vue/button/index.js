import Button from './src/index'
import { version } from './package.json'

/* istanbul ignore next */
Button.install = function (Vue) {
  Vue.component(Button.name, Button)
}

Button.version = version

/* istanbul ignore next */
if (process.env.BUILD_TARGET === 'runtime') {
  if (typeof window !== 'undefined' && window.Vue) {
    Button.install(window.Vue)
  }
}

export default Button
