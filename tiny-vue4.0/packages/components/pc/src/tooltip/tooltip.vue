<template>
  <div
    ref="referenceRef"
    class="tiny-tooltip su-inline-block"
    v-bind="$attrs"
    @mouseenter="api.handleRefEvent('mouseenter')"
    @mouseleave="api.handleRefEvent('mouseleave')"
    @click="api.handleRefEvent('click')"
  >
    <slot></slot>
  </div>
  <div
    ref="popperRef"
    class="tiny-tooltip__popper sc-tooltip sa-bd sa-br sa-theme su-hidden"
    :class="['st-' + theme, popperClass]"
    :style="arrowVisible ? {} : { '--it-tooltip-box-size': '0' }"
    @mouseenter="api.handlePopEvent('mouseenter')"
    @mouseleave="api.handlePopEvent('mouseleave')"
  >
    <slot name="popper" v-bind="{ state, api, props, emits }">
      <div v-if="title" class="su-fw-bold">{{ title }}</div>
      <template v-if="content">
        <div v-if="!pre">{{ content }}</div>
        <pre v-else>{{ content }}</pre>
      </template>
      <template v-if="showConfirm">
        <div class="su-text-right">
          <button @click="api.handleCancel">取消</button>
          <button @click="api.handleOk">确定</button>
        </div>
      </template>
    </slot>
  </div>
</template>

<script setup lang="ts">
import useVm from './tooltip.vm.ts'
import './tooltip.less'
import type { Placement, OffsetOptions } from '@floating-ui/dom'
import { OK } from '@opentiny/utils'

defineOptions({ name: 'TinyTooltip' })

const props = withDefaults(
  defineProps<{
    /** 主题 */
    theme?:
      | 'light'
      | 'dark'
      | 'success'
      | 'info'
      | 'warn'
      | 'error'
      | 'successless'
      | 'infoless'
      | 'warnless'
      | 'errorless'
    /** 待提示的标题 */
    title?: string
    /** 待提示的内容 */
    content?: string
    /** 是否显示确认按钮 */
    showConfirm?: boolean
    /** 点击确定按钮的回调函数， 返回false | Promise<false> 则阻止关闭 */
    onOk?: () => boolean | Promise<boolean>
    /** 点击取消按钮的回调函数， 返回false | Promise<false> 则阻止关闭 */
    onCancel?: () => boolean | Promise<boolean>
    /** 提示的位置 */
    placement?: Placement
    /** 关闭延时, 单位毫秒， 默认值 300 */
    closeDelay?: number
    /** 打开延时, 单位毫秒， 默认值 0  */
    openDelay?: number
    /** 弹出层类名，可以多个值 */
    popperClass?: string
    /** 触发模式 */
    trigger?: 'click' | 'hover' | 'manual'
    /** 双向绑定是否提示， 在 trigger='manual' 时才生效 */
    show?: boolean
    /** 是否显示箭头 */
    arrowVisible?: boolean
    /** 弹出层在主轴上的偏移量 */
    offset?: OffsetOptions
    /** 定义渐变动画的类名,默认 fade-in-linear */
    animateName?: string
    /** 是否将弹出层的元素添加到body上,默认true */
    appendToBody?: boolean
    /** 配置 pre 为 true ，就会预格式化 content 文本。被包围在 pre 标签元素中的文本会保留空格和换行符，文本也会呈现为等宽字体 */
    pre?: boolean
  }>(),
  {
    theme: 'light',
    title: '',
    content: '',
    showConfirm: false,
    onOk: OK,
    onCancel: OK,
    placement: 'top',
    closeDelay: 300,
    openDelay: 0,
    popperClass: '',
    trigger: 'hover',
    show: false,
    arrowVisible: true,
    offset: 6,
    animateName: 'fade-in-linear',
    appendToBody: true,
    pre: false,
  },
)

const emits = defineEmits<{
  /** 显示弹出层的事件  */
  'popper-show': []
  /** 隐藏弹出层的事件  */
  'popper-hide': []
  /** 双向绑定 show, 在 trigger='manual' 时才生效 */
  'update:show': [value: boolean]
}>()

const slots = defineSlots<{
  /** 默认插槽 */
  default(): any
  /** 弹出层插槽，启用插槽时，原有的content, title等属性自动失效。  */
  popper(props: { state: TooltipState; api: TooltipApi; props: TooltipProps; emits: TooltipEmits }): any
}>()

const { state, api, probeContext } = useVm({ props, emits, slots })

defineExpose({
  state,
  api,
})

export type TooltipProps = typeof props
export type TooltipEmits = typeof emits
export type TooltipSlots = typeof slots
export type TooltipState = typeof state
export type TooltipApi = typeof api
export type TooltipCtx = { props: TooltipProps; emits: TooltipEmits; slots: TooltipSlots }
</script>
