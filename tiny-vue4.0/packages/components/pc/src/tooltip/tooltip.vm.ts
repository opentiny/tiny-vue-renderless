import { reactive, onMounted, onUnmounted, getCurrentInstance, toRef, watch, toRaw } from 'vue'
import type { TooltipCtx } from './tooltip.vue'
import { useProbe, type ProbeContext } from '@opentiny/vue-hooks'
import { useFloating, useTimer } from '@opentiny/vue-hooks'
import { callWithGuard } from '@opentiny/utils'

/** Tooltip的vm
 * tooltip具有3个触发模式： trigger:'hover' |'click' |'manual'
 * 前2个模式， 通过鼠标操作后， 修改 popState.show 控制显示
 * manual 模式，双向绑定 show 属性， 来控制显示
 */

export default function useVm(ctx: TooltipCtx) {
  const { props, emits, slots } = ctx
  const instance = getCurrentInstance()

  const { state: popState, on, off } = useFloating({})

  const _toggle = (value: boolean) => {
    popState.show = value
    if (props.trigger === 'manual') {
      emits('update:show', value)
    }
  }
  const { start: delayShow, clear: cancelDelayShow } = useTimer(() => _toggle(true), toRef(props, 'openDelay'))
  const { start: delayHide, clear: cancelDelayHide } = useTimer(() => _toggle(false), toRef(props, 'closeDelay'))

  const state = reactive({ popState })

  const api = {
    mount() {
      popState.popper = instance?.refs.popperRef!
      popState.reference = instance?.refs.referenceRef!

      // 双向绑定属性
      popState.placement = toRef(props, 'placement')
      popState.customClass = toRef(props, 'popperClass')
      popState.arrowVisible = toRef(props, 'arrowVisible')
      popState.offset = toRef(props, 'offset')
      popState.animateName = toRef(props, 'animateName')
      popState.appendToBody = toRef(props, 'appendToBody')

      on('show', () => emits('popper-show'))
      on('hide', () => emits('popper-hide'))

      if (props.trigger === 'manual' && props.show) {
        delayShow()
      }
    },
    unmount() {
      off('show')
      off('hide')
    },
    /** referenceRef元素上的鼠标事件 */
    handleRefEvent(type: 'mouseenter' | 'mouseleave' | 'click') {
      if (props.trigger === 'hover') {
        if (type === 'mouseenter') {
          cancelDelayHide()
          delayShow()
        } else if (type === 'mouseleave') {
          cancelDelayShow()
          delayHide()
        }
      }

      if (props.trigger === 'click' && type === 'click') {
        if (popState.show) {
          delayHide()
        } else {
          delayShow()
        }
      }
    },
    /** popRef元素上的鼠标事件 */
    handlePopEvent(type: 'mouseenter' | 'mouseleave') {
      if (props.trigger === 'hover') {
        if (type === 'mouseenter') {
          cancelDelayHide()
        } else if (type === 'mouseleave') {
          delayHide()
        }
      }
    },
    delayShow,
    cancelDelayShow,
    delayHide,
    cancelDelayHide,

    async handleOk() {
      await callWithGuard(props.onOk, () => delayHide())
    },
    async handleCancel() {
      await callWithGuard(props.onCancel, () => delayHide())
    },
  }

  // 模式3
  watch(
    () => props.show,
    (value) => {
      if (props.trigger === 'manual') {
        value ? delayShow() : delayHide()
      }
    },
  )
  onMounted(() => api.mount())
  onUnmounted(() => api.unmount())
  const vm = { state, api, probeContext: {} as ProbeContext }

  if (__DEV__) {
    vm.probeContext = useProbe(vm)
  }

  return vm
}
