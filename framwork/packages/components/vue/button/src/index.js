import { $props, $prefix, $setup, defineComponent } from '@opentiny/vue-common'
import PcTemplate from './pc.vue'
import MobileTemplate from './mobile.vue'
import WatchTemplate from './watch.vue'

const template = (mode) => {
  if (mode === 'mobile') {
    return MobileTemplate
  } else if (mode === 'watch') {
    return WatchTemplate
  } else {
    return PcTemplate
  }
}

export default defineComponent({
  name: $prefix + 'Button',
  inject: {
    buttonGroup: {
      default: ''
    }
  },
  props: {
    ...$props,
    type: {
      type: String,
      default: 'default'
    },
    tabindex: { type: String, default: '1' },
    icon: {
      type: [Object, String],
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    resetTime: {
      type: Number,
      default: 1000
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    size: {
      type: String,
      default: '',
      validator(val) {
        return ['large', 'medium', 'small', 'mini', ''].includes(val)
      }
    },
    round: Boolean,
    plain: Boolean,
    circle: Boolean,
    loading: Boolean,
    disabled: Boolean,
    autofocus: Boolean,
    buttonClass: {
      type: String,
      default: ''
    }
  },
  setup(props, context) {
    return $setup({ props, context, template })
  }
})
