import { App } from 'vue'
import TvpSearchBox from './src/index.vue'

export * from './src/index.type'

TvpSearchBox.install = function (app: App) {
  app.component(TvpSearchBox.name, TvpSearchBox)
}

export default TvpSearchBox
