/**
* Copyright (c) 2022 - present TinyVue Authors.
* Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
*
* Use of this source code is governed by an MIT-style license.
*
* THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
* BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
* A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
*
*/

import { addClass, on, off } from '@opentiny/vue-renderless/common/deps/dom'

const setLinkList = ({ props, state }) => {
  JSON.stringify(props.links, (key, val) => {
    if (key === 'link' && typeof val === 'string') {
      state.linkList = [...state.linkList, val]
    }
    return val
  })
}

const setFixAnchor = ({ vm }) => {
  const { anchorRef } = vm.$refs
  if (anchorRef) {
    anchorRef.style.position = 'fixed'
    anchorRef.style.top = anchorRef.offsetTop
  }
}

const getScreenHeight = () => window.screen.height

const updateSkidPosition = ({ vm, state }) => {
  const activeEl = document.querySelector(`a[href='${state.currentLink}']`)
  const { skidRef, maskRef, anchorRef } = vm.$refs

  if (!activeEl || !anchorRef) {
    return
  }

  const { offsetHeight, offsetWidth } = activeEl
  const { top: linkTitleClientTop, left: linkTitleClientLeft } = activeEl.getBoundingClientRect()
  const { top: anchorClientTop, left: anchorClientLeft } = anchorRef.getBoundingClientRect()

  const offsetTop = linkTitleClientTop - anchorClientTop
  const offsetLeft = linkTitleClientLeft - anchorClientLeft
  addClass(skidRef, 'tiny-anchor-orbit-skid--active')
  skidRef.style.top = `${offsetTop}px`
  skidRef.style.height = `${offsetHeight}px`
  if (maskRef) {
    maskRef.style.top = `${offsetTop}px`
    maskRef.style.height = `${offsetHeight}px`
    maskRef.style.maxWidth = `${offsetWidth + offsetLeft}px`
  }
}

const getCurrentAnchor = ({ vm, state, currentLink }) => {
  state.currentLink = currentLink.link
  updateSkidPosition({ vm, state })
}

export const getContainer = ({ props }) => () => props.setContainer || window.document || window

export const mounted = ({ vm, props, state, api }) => () => {
  state.scrollContainer = api.getContainer()
  setLinkList({ props, state })
  setFixAnchor({ vm })
  state.scrollEvent = on(state.scrollContainer, 'scroll', api.debounceMouseScroll)
  api.debounceMouseScroll()
}

export const updated = ({ state, api }) => () => {
  if (state.scrollEvent) {
    const currentContainer = api.getContainer()
    if (state.scrollContainer !== currentContainer) {
      state.scrollEvent = off(state.scrollContainer, 'scroll', api.debounceMouseScroll)
      state.scrollContainer = currentContainer
      state.scrollEvent = on(state.scrollContainer, 'scroll', api.debounceMouseScroll)
      api.debounceMouseScroll()
    }
  }
}

export const unmounted = ({ state, api }) => () => {
  state.scrollEvent = off(state.scrollContainer, 'scroll', api.debounceMouseScroll)
}

export const debounceMouseScroll = ({ vm, state }) => () => {
  if (state.isScrolling) {
    state.isScrolling = false
    return
  }

  let currentLink = null
  let visibleArea = getScreenHeight() / 3
  const linkListPosition = []
  state.linkList.forEach(link => {
    const linkEl = document.querySelector(link)
    const { top, bottom } = linkEl.getBoundingClientRect()
    linkListPosition.push({
      link,
      top,
      bottom
    })
  })
  currentLink = linkListPosition[0]
  for (let i = 1; i < linkListPosition.length; i++) {
    if (linkListPosition[i].top <= visibleArea && linkListPosition[i].bottom >= visibleArea) {
      currentLink = linkListPosition[i]
    }
  }

  getCurrentAnchor({ vm, state, currentLink })
}

export const linkClick = ({ state, vm }) => (e, item) => {
  if (state.isScrolling) {
    return
  }
  state.currentLink = item.link
  updateSkidPosition({ vm, state })
  state.isScrolling = true
}