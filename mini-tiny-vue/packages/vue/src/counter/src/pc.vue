<template>
  <div class="tiny-counter">
    <span class="tiny-counter__control" @click.stop="decrease">- {{ step }}</span>
    <span class="tiny-counter__value">{{ state.value }}</span>
    <span class="tiny-counter__control" @click.stop="increase">+ {{ step }}</span>
  </div>
</template>
<script>
import { defineComponent, $prefix, setup } from '@opentiny/vue-common'
import { renderless, api } from '@opentiny/renderless/src/counter/vue'
import '@opentiny/vue-theme/src/counter/index.less'

export default defineComponent({
  name: $prefix + 'Counter',
  emits: ['change'],
  props: {
    value: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 1
    }
  },
  setup(props, context) {
    return setup({ props, context, renderless, api })
  }
})
</script>
