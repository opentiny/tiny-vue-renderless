import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ButtonVue from '../button.vue'

// 编写指南： https://clouddevops.huawei.com/domains/29793/wiki/2/WIKI2025022101166
describe('Button的单元测试', () => {
  it('最简的按钮', () => {
    const wrapper = mount(ButtonVue, {})
    expect(wrapper.text()).toContain('Button')
  })
})
