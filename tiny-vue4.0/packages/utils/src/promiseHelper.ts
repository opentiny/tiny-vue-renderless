import { isPromise, isFunction } from '@vue/shared'
// 组件的一些拦截函数： beforeClose 等， 通过返回 boolean | Promise<boolean> 来判断是否允许close的。
//

/** 异步解析函数返回 any | Promise<any> 的确切值
 * @example
 * let boolOrPromise = beforeClose()
 * resolvePromise ( boolOrPromise)
 */
export const resolvePromise = async (val: any | Promise<any>) => {
  if (isPromise(val)) {
    try {
      const ret = await val
      return !!ret
    } catch {
      return false
    }
  } else {
    return !!val
  }
}

/** 通过传入的guard函数， 来判断返回是否为true,  为true则执行后面的回调函数
 * @example
 * callWithGuard(props.beforeClose, ()=> api.close() )
 * */
export const callWithGuard = async (guard: () => any | Promise<any>, callback: () => void) => {
  if (isFunction(guard)) {
    const ret = await resolvePromise(guard())
    if (ret) {
      callback()
    }
  } else {
    callback()
  }
}
