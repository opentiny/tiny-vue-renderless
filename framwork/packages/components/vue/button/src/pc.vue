<template>
  <button
    class="tiny-button"
    @click="handleClick"
    :disabled="state.buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'tiny-button--' + type : '',
      size ? 'tiny-button--' + size : '',
      {
        'is-disabled': state.buttonDisabled,
        'is-loading': loading,
        'is-plain': state.plain,
        'is-round': round,
        'is-circle': circle,
        'is-icon': icon && !loading && (text || $slots.default),
        'is-only-icon': icon && !loading && !(text || $slots.default)
      }
    ]"
    :tabindex="tabindex"
    v-bind="a($attrs, ['class', 'style'], true)"
  >
    <component
      v-if="icon && !loading"
      :is="icon"
      :class="{ 'is-text': text || $slots.default }"
    />
    <slot>
      <span>{{ text }}</span>
    </slot>
  </button>
</template>

<script>
import { renderless, api } from '@opentiny/renderless/button/vue'
import { props, setup, defineComponent } from '@opentiny/vue-common'
import '@opentiny/theme/button/index.less'

export default defineComponent({
  emits: ['click', 'hook-updated'],
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
    'autofocus',
    'round',
    'circle',
    'tabindex'
  ],
  setup(props, context) {
    return setup({ props, context, renderless, api })
  }
})
</script>
