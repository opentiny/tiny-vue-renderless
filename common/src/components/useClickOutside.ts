/**
 * 点击外部回调一个函数
 * @param selectors 一组选择器，在其内部时忽略回调。 点击其它元素才回调
 * @param cb 回调函数
 */
export default function useClickOutside(selectors: string[], cb: () => void) {
  document.addEventListener('click', function (ev) {
    const target: HTMLElement = ev.target
    const clickIn = selectors.map((selector) => target.closest(selector)).some((el) => el)

    if (!clickIn) cb()
  })
}
