import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import $capName$Vue from '../$rawName$.vue'

// 编写指南： https://clouddevops.huawei.com/domains/29793/wiki/2/WIKI2025022101166
describe('$capName$的单元测试', () => {
  it('最简的$cnName$', () => {
    const wrapper = mount($capName$Vue, {})
    expect(wrapper.text()).toContain('$capName$')
  })
})
