<template>
  <slot name="root" :state="state" :api="api">
    <div class="tiny-button">Button</div>
  </slot>
</template>

<script setup lang="ts">
import useVm from './button.vm.ts'
import './button.less'

defineOptions({ name: 'TinyButton' })

const props = withDefaults(
  defineProps<{
    /** 主题  @since 1.0.0*/
    theme?: 'light' | 'dark' | 'success' | 'info'
  }>(),
  {
    theme: 'light',
  },
)

const emits = defineEmits<{
  /** 写明触发时机  @since 1.0.0 */
  change: [id: number]
}>()

const slots = defineSlots<{
  /** 根结点插槽 @since 1.0.0*/
  root(props: { state: ButtonState; api: ButtonApi }): any
}>()

const { state, api, probeContext } = useVm({ props, emits, slots })

defineExpose({
  state,
  api,
})

export type ButtonProps = typeof props
export type ButtonEmits = typeof emits
export type ButtonSlots = typeof slots
export type ButtonState = typeof state
export type ButtonApi = typeof api
export type ButtonCtx = { props: ButtonProps; emits: ButtonEmits; slots: ButtonSlots }
</script>
