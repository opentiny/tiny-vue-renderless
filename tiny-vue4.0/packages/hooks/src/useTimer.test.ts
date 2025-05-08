import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useTimer } from './useTimer'
import { ref } from 'vue'

// 编写指南： https://clouddevops.huawei.com/domains/29793/wiki/2/WIKI2025022101166
describe('useTimer的测试', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  it('setTimeOut功能', () => {
    const state = { disabled: true }
    const { start: resetDisabled } = useTimer(() => (state.disabled = false), 2000)
    resetDisabled()

    // 1 秒时仍然为真
    setTimeout(() => expect(state.disabled).toBe(true), 1000)
    // 2秒后为假
    setTimeout(() => expect(state.disabled).toBe(false), 2100)

    vi.runAllTimers()
  })

  it('debounce 功能', () => {
    const state = { count: 1 }
    const { start: addCount } = useTimer(() => state.count++, 2000)

    addCount()
    // 2 秒触发一次多次
    setTimeout(() => addCount(), 500)
    setTimeout(() => addCount(), 1000)
    setTimeout(() => addCount(), 1500)
    setTimeout(() => expect(state.count).toBe(1), 1600)
    setTimeout(() => expect(state.count).toBe(1), 2600)
    // 3.5秒后才生效
    setTimeout(() => expect(state.count).toBe(2), 3600)

    vi.runAllTimers()
  })

  it('回调函数传参', () => {
    const state = { a: 1, b: 1, c: 1 }
    const { start: add } = useTimer((a, b, c) => {
      state.a += a
      state.b += b
      state.c += c
    }, 2000)

    add(4, 5, 6)

    setTimeout(() => {
      expect(state.a).toBe(5)
      expect(state.b).toBe(6)
      expect(state.c).toBe(7)
    }, 2600)

    vi.runAllTimers()
  })

  it('动态修改delay时长', () => {
    const state = { count: 1 }
    const delay = ref(1000)
    const { start: add } = useTimer(() => state.count++, delay)

    delay.value = 500

    add()

    setTimeout(() => expect(state.count).toBe(2), 600)

    vi.runAllTimers()
  })

  it('清除定时器', () => {
    const state = { count: 1 }
    const { start: add, clear } = useTimer(() => state.count++, 1000)
    add()

    setTimeout(() => clear(), 500)
    setTimeout(() => expect(state.count).toBe(1), 1100)

    vi.runAllTimers()
  })
})
