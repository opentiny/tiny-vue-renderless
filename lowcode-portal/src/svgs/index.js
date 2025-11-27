import Svgs from '@opentiny/vue-icon'
import SvgIcon from './src/Main.vue'

export default (app) => {
  app.component('SvgIcon', SvgIcon)

  Object.keys(Svgs).forEach((name) => {
    app.component(name, Svgs[name]())
  })
}
