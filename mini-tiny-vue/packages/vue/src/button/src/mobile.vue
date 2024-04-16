<template>
  <button
    class="tiny-mobile-button"
    :class="{ 'is-disabled': state.disabled || disabled, 'is-circle': circle }"
    @click="handleClick"
    :disabled = "state.disabled || disabled"
  >
    <slot>
      <span>Default Button</span>
    </slot>
  </button>
</template>
<script>
import { defineComponent, $prefix, setup,props } from '@opentiny/vue-common'
import { renderless, api } from '@opentiny/renderless/src/button/vue'
import '@opentiny/vue-theme-mobile/src/button/index.less'

export default defineComponent({
  name: $prefix + 'Button',
  emits: ['click'],
  props: [...props,'disabled','resetTime','circle'],
  setup(props, context) {
    return setup({ props, context, renderless, api })
  }
})
</script>
