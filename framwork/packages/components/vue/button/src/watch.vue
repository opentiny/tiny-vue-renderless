<template>
  <button
    class="tiny-watch-button"
    @click="handleClick"
    :disabled="state.buttonDisabled || loading"
    :type="nativeType"
    :class="[
      type ? 'tiny-watch-button--' + type : '',
      size ? 'tiny-watch-button--' + size : '',
      {
        'is-disabled': state.buttonDisabled,
        'is-loading': loading,
        'is-plain': state.plain,
        'is-round': round
      }
    ]"
    v-bind="a($attrs, ['class', 'style'], true)"
  >
    <component v-if="icon && !loading" :is="icon" class="tiny-icon is-icon" />
    <slot>
      <span :style="{ marginLeft: text && (icon || loading) ? '4px' : 0 }">{{
        text
      }}</span>
    </slot>
  </button>
</template>

<script>
import { renderless, api } from '@opentiny/renderless/button/vue'
import { props, setup, defineComponent } from '@opentiny/vue-common'
import '@opentiny/theme-watch/button/index.less'

export default defineComponent({
  inheritAttrs: false,
  emits: ['hook-updated', 'click'],
  props: [
    ...props,
    'type',
    'text',
    'size',
    'icon',
    'resetTime',
    'nativeType',
    'loading',
    'disabled',
    'plain',
    'round'
  ],
  setup(props, context) {
    return setup({ props, context, renderless, api })
  }
})
</script>
