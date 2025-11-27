import { createI18n } from 'vue-i18n'
import locale from '@opentiny/vue-locale'

const messages = {
  zh_CN: {},
  en_US: {}
}

export default locale.initI18n({ createI18n, messages })
