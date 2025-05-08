<template>
  <slot name="root" v-bind="{ state, api, props, emits }">
    <div class="tiny-$rawName$">$capName$</div>
  </slot>
</template>

<script setup lang="ts">
import useVm from './$rawName$.vm.ts'
import './$rawName$.less'

defineOptions({ name: 'Tiny$capName$' })

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
  root(props: { state: $capName$State; api: $capName$Api }): any
}>()

const { state, api, probeContext } = useVm({ props, emits, slots })

defineExpose({
  state,
  api,
})

export type $capName$Props = typeof props
export type $capName$Emits = typeof emits
export type $capName$Slots = typeof slots
export type $capName$State = typeof state
export type $capName$Api = typeof api
export type $capName$Ctx = { props: $capName$Props; emits: $capName$Emits; slots: $capName$Slots }
</script>
