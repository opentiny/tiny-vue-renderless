import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TooltipVue from '../tooltip.vue'

// 编写指南： https://clouddevops.huawei.com/domains/29793/wiki/2/WIKI2025022101166
describe('Tooltip的单元测试', () => {
  it('最简的提示组件', () => {
    const wrapper = mount(TooltipVue, {})
    expect(wrapper.text()).toContain('Tooltip')
  })
})
