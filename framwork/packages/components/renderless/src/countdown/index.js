// 格式化数字格式
const formatNumber = (number, completeZero) => {
  if (number < 10 && completeZero) {
    return '0' + number
  } else {
    return number.toString()
  }
}

// 模拟setInterval
export const CustomSetInterval = function (func, millisecond) {
  let setIntervalId

  if (typeof func === 'function') {
    setIntervalId = setTimeout(function self() {
      setIntervalId = setTimeout(self, millisecond)

      func()
    }, millisecond)
  }

  this.stop = () => {
    clearTimeout(setIntervalId)
  }
}

export const getRestTime = (state) => {
  // 获取剩余时间（秒）
  return Math.max(Math.round((state.deadlineTimestamp - Date.now()) / 1000), 0)
}

export const render =
  ({ state, props, nextTick, emit }) =>
  () => {
    const restTime = getRestTime(state)
    if (state.ignoreDay) {
      state.hour = formatNumber(
        Math.floor(restTime / (60 * 60)),
        props.completeZero
      )
    } else {
      state.day = formatNumber(
        Math.floor(restTime / (24 * 60 * 60)),
        props.completeZero
      )
      state.hour = formatNumber(
        Math.floor((restTime / (60 * 60)) % 24),
        props.completeZero
      )
    }
    state.minute = formatNumber(
      Math.floor((restTime / 60) % 60),
      props.completeZero
    )

    state.second = formatNumber(restTime % 60, props.completeZero)

    nextTick(() => {
      emit('update', {
        day: state.day,
        hour: state.hour,
        minute: state.minute,
        second: state.second,
        restSecond: restTime // 剩余时间（秒）
      })
    })
  }

export const start =
  ({ render, state, emit, props }) =>
  () => {
    state.deadlineTimestamp = Date.now() + props.deadline * 1000
    if (getRestTime(state) > props.leftSecond) {
      state.setIntervalInstance.stop()

      state.setIntervalInstance = new CustomSetInterval(() => {
        render()

        if (getRestTime(state) <= props.leftSecond) {
          state.setIntervalInstance.stop()
        }
      }, 1000)
    }
  }

export const reset =
  ({ state, props, renderFn }) =>
  () => {
    state.deadlineTimestamp = Date.now() + props.deadline * 1000
    state.setIntervalInstance.stop()
    renderFn()
  }

export const init = ({ api, props, state }) => {
  const { start, reset, render } = api
  render()
  props.operate && props.operate({ start, reset })
  if (props.autoPlay) {
    start()
  }
}
