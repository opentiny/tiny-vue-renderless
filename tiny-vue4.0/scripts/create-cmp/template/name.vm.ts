import { reactive, onMounted, onUnmounted, getCurrentInstance } from 'vue'
import type { $capName$Ctx } from './$rawName$.vue'
import { useProbe, type ProbeContext } from '@opentiny/vue-hooks'

/** TODO 规范
 * 1、禁止将props的属性转存到state上。 一定要使用 computed
 * 2、减少watch使用。 禁止 props.xxx && watch(...) 用法。
 * 3、禁止computed中有set函数。
 * 4、禁止dom操作，禁止js式的事件绑定（避免原来的on,off方法，事件应写到模板上）
 *    当遇到 window.resize,  document.click/dragstart  等事件绑定时， 使用useXXX 等hooks处理
 * 5、事件优先考虑冒泡到最上层处理，尤其是在有列表循环时
 * 6、在 useContext 中少使用instance, 禁止用 slots， 和 slots.default() 生成vnode的逻辑
 * 7、
 */

export default function useVm(ctx: $capName$Ctx) {
  const { props, emits, slots } = ctx
  const instance = getCurrentInstance()

  const state = reactive({})

  const api = {
    mount() {},
    unmount() {},
  }

  onMounted(() => api.mount())
  onUnmounted(() => api.unmount())
  const vm = { state, api, probeContext: {} as ProbeContext }

  if (__DEV__) {
    vm.probeContext = useProbe(vm)
  }

  return vm
}
