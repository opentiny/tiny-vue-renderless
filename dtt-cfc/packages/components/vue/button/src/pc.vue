<!--
 * Copyright (c) 2023 - present TinyVue Authors.
 * Copyright (c) 2023 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 -->
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
    <component v-if="icon && !loading" :is="icon" :class="{ 'is-text': text || $slots.default }" />
    <slot>
      <span>{{ text }}</span>
    </slot>
  </button>
</template>

<script>
import { renderless, api } from '@opentiny/renderless/button/vue'
import { props, setup, defineComponent } from '@opentiny/vue-common'
import '@opentiny/vue-theme/button/index.css'

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
