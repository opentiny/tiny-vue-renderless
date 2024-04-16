/** 绑定事件 */
export const on = (el, event, handler) => {
  if (el && event && handler) {
    el.addEventListener(event, handler)
  }
}
/** 移除事件 */
export const off = (el, event, handler) => {
  if (el && event) {
    el.removeEventListener(event, handler)
  }
}
