import { $props, $prefix, $setup, defineComponent } from '@opentiny/vue-common'
import PCTemplate from './pc.vue'
import MobileTemplate from './mobile.vue'

const template = (mode) => {
  if ('mobile' === mode) return MobileTemplate

  return PCTemplate
}

export default defineComponent({
  name: $prefix + 'Button',
  props: {
    ...$props,
    disabled:Boolean,
    resetTime: {
      type: Number,
      default: 1000
    },
    circle: Boolean
  },
  setup(props, context) {
    return $setup({ props, context, template })
  }
})
