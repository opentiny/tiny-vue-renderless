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

import { on, off } from '@opentiny/vue-renderless/common/deps/dom'

export const onTouchstart = ({ state }) => (event) => {
  state.draggposition = event.touches[0].clientY
}

export const onTouchmove = ({ refs, state }) => (event) => {
  if (!state.disabled) {
    if (event.touches[0].clientY < state.draggposition || refs.track.parentNode.scrollTop > 10) {
      return
    }

    state.replaces = state.pullingText
    state.animationDuration = 0
    state.translate3d = (event.touches[0].clientY - state.draggposition) / 2
    state.styleObj = {
      'transition-duration': '0ms',
      transform: 'translate3d(0px,' + state.translate3d + 'px,0px)'
    }
    state.checkStatus = false

    if (state.translate3d > state.headHeight) {
      state.replaces = state.loosingText
    } else {
      state.replaces = state.pullingText
    }
  }
}

export const onTouchend = ({ emit, props, state }) => () => {
  state.animationDuration = props.animationDuration

  if (state.translate3d >= state.headHeight) {
    state.translate3d = state.headHeight
    state.checkStatus = true
    state.styleObj = {
      'transition-duration': state.animationDuration + 'ms',
      transform: 'translate3d(0px,' + state.translate3d + 'px,0px)'
    }

    emit('update:modelValue', true)
    emit('refresh')
  } else {
    state.styleObj = {
      'transition-duration': state.animationDuration + 'ms'
    }
    state.translate3d = 0
    state.checkStatus = false
    state.replaces = ''
  }
}

export const mountedHandler = ({ api, refs, state }) => () => {
  state.styleObj = { 'transition-duration': state.animationDuration + 'ms' }

  const track = refs.track

  on(track, 'touchstart', api.onTouchstart)
  on(track, 'touchmove', api.onTouchmove)
  on(track, 'touchend', api.onTouchend)
}

export const beforeUnmountHandler = ({ api, refs }) => () => {
  const track = refs.track

  off(track, 'touchstart', api.onTouchstart)
  off(track, 'touchmove', api.onTouchmove)
  off(track, 'touchend', api.onTouchend)
}

export const watchModelValue = ({ value, state }) => {
  if (!value) {
    if (state.successText) {
      state.checkStatus = false
      state.replaces = state.successText

      setTimeout(() => {
        state.translate3d = 0
        state.styleObj = {
          'transition-duration': state.animationDuration + 'ms'
        }
        state.replaces = ''
      }, state.successDuration)
    } else {
      state.translate3d = 0
      state.checkStatus = false
      state.replaces = ''
      state.styleObj = {
        'transition-duration': state.animationDuration + 'ms'
      }
    }
  }
}
