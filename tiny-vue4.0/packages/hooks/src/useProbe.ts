import {
  reactive,
  onMounted,
  onUpdated,
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  onBeforeUnmount,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered,
  getCurrentInstance,
} from 'vue'

export interface ProbeContext {
  name: string
  enabled: boolean
  lifecycle: boolean
  track: boolean
}

// open/end 监听生命周期， 其它是监听track，trigger
function log(context: ProbeContext, msg: string, type?: 'open' | 'end') {
  if (type === 'open') {
    return () => {
      if (!context.enabled || !context.lifecycle) return

      console.group(context.name + ':' + msg)
    }
  }
  if (type === 'end') {
    return () => {
      if (!context.enabled || !context.lifecycle) return

      console.log(msg)
      console.groupEnd()
    }
  }

  return (...args: any) => {
    if (!context.enabled || !context.track) return

    console.log(msg, args)
  }
}

// 内容泄漏监测
const memLeakWatcher = new FinalizationRegistry((heldValue) => {
  console.log(heldValue) // foo被销毁了
})

// 生产时返回固定假数据，提取以节省内存。
const dummyContext = { name: '', enabled: false, lifecycle: false, track: false }

/** 1、组件生命周期探针，调试开发使用。
 *  2、内存泄漏探针，监听内存泄漏
 *   */
export function useProbe(vm: any) {
  if (__DEV__) {
    const instance = getCurrentInstance()!
    const context: ProbeContext = reactive({
      name: instance.type.name!,
      enabled: false,
      lifecycle: true,
      track: false,
    })
    onBeforeMount(log(context, 'onBeforeMount', 'open'))
    onMounted(log(context, 'onMounted', 'end'))

    onBeforeUpdate(log(context, 'onBeforeUpdate', 'open'))
    onUpdated(log(context, 'onUpdated', 'end'))

    onBeforeUnmount(log(context, 'onBeforeUnmount', 'open'))
    onUnmounted(log(context, 'onUnmounted', 'end'))

    onRenderTriggered(log(context, 'onRenderTriggered'))
    onRenderTracked(log(context, 'onRenderTracked'))

    onErrorCaptured(log(context, 'onErrorCaptured'))

    memLeakWatcher.register(vm.state, 'state 已释放')
    return context
  }

  return dummyContext
}
