import { findParent, isInView } from '@/tools'

export function hiddenPanel() {
  // 解决滚动页面时，下拉类组件面板与目标元素分离问题。为容器添加scroll事件，滚动页面，关闭下拉面板。
  const demoContainerEle = document.getElementById('doc-layout').getElementsByClassName('layout-scroll-container')[0]
  demoContainerEle?.addEventListener('scroll', () => {
    const event = new CustomEvent('tiScroll', { bubbles: false, cancelable: true })
    document.dispatchEvent(event)
  })
}

// 页面初始化及刷新时，让左侧菜单高亮的title显示到可视区
export function menuDisplayToView() {
  const menuContainer = document.querySelector('.left-menu-root >.tiny-tree-menu > .tiny-tree')
  if (!menuContainer) {
    return
  }
  const menuTarget = document.querySelector('.left-menu-root .tiny-tree-node.is-current')
  if (!menuTarget || isInView(menuTarget, { top: 197, bottom: 40 })) {
    return
  }
  const headerHeight = 197
  const containerScrollTop = menuContainer.scrollTop
  const menuTop = menuTarget.getBoundingClientRect().top
  menuContainer.scrollTop = containerScrollTop + menuTop - headerHeight
}

// 主题色更新
const backgroundColor = '#e9edfa'
const textColor = '#5073e5'
const borderFocus = '1px solid #5073e5'
const boxShadowFocus = '0 0 0 2px rgba(80,115,229,0.2)'
export const themeOverrides = {
  Menu: {
    itemTextColorActive: textColor,
    itemColorActive: backgroundColor,
    itemTextColorActiveHover: textColor,
    itemColorActiveHover: backgroundColor,
    itemTextColorChildActive: textColor,
    itemTextColorChildActiveHover: textColor,
    arrowColorActive: textColor,
    arrowColorActiveHover: textColor,
    arrowColorChildActive: textColor,
    arrowColorChildActiveHover: textColor
  },
  Anchor: {
    linkColor: backgroundColor,
    linkTextColorHover: textColor,
    linkTextColorActive: textColor,
    linkTextColorPressed: textColor,
    railColorActive: textColor
  },
  Input: {
    caretColor: textColor,
    borderHover: borderFocus,
    borderFocus: borderFocus,
    loadingColor: textColor,
    boxShadowFocus: boxShadowFocus
  }
}
