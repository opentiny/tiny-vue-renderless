let scrollBarWidth
const isServer = typeof window === 'undefined'

export default function () {
  if (isServer) return 0
  if (scrollBarWidth !== undefined) return scrollBarWidth

  const container = document.createElement('div')
  container.className = 'tiny-scrollbar'
  container.style.visibility = 'hidden'
  container.style.position = 'absolute'
  container.style.top = '-9999px'

  const outer = document.createElement('div')
  outer.className = 'tiny-scrollbar__wrap'
  outer.style.width = '100px'

  container.appendChild(outer)
  document.body.appendChild(container)
  const widthNoScroll = outer.offsetWidth
  outer.style.overflow = 'scroll'

  const inner = document.createElement('div')
  inner.style.width = '100%'

  outer.appendChild(inner)

  const widthWithScroll = inner.offsetWidth
  outer.parentNode.removeChild(outer)
  scrollBarWidth = widthNoScroll - widthWithScroll

  return scrollBarWidth
}
