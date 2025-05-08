import { reactive, onMounted, onUnmounted, getCurrentInstance } from 'vue'
import type { ButtonCtx } from './button.vue'
import { useProbe, type ProbeContext } from '@opentiny/vue-hooks'

// TODO 规范
// 1、禁止将props的属性转存到state上。 一定要使用 computed
// 2、减少watch使用。 禁止 props.xxx && watch(...) 用法。
// 3、禁止computed中有set函数。
// 4、禁止dom操作，禁止事件绑定（事件应写到模板上）
// 5、事件优先考虑冒泡到最上层处理，尤其是在有循环时

export default function useVm(ctx: ButtonCtx) {
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
