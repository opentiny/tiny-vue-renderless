import { App } from 'vue'
import TinyBrowserTabs from './components/BrowserTabs.vue'

TinyBrowserTabs.install = function (app: App) {
  app.component(TinyBrowserTabs.name || 'TinyBrowserTabs', TinyBrowserTabs)
}

export { TinyBrowserTabs as BrowserTabs }

export default TinyBrowserTabs 