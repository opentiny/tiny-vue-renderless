import { describe, it, expect } from 'vitest'
import { proxyData, transferData } from './dataHelper'
import { reactive, ref } from 'vue'

// 编写指南： https://clouddevops.huawei.com/domains/29793/wiki/2/WIKI2025022101166
describe('proxyData 测试', () => {
  it('基本读测试', () => {
    const mapping = { label: 'text', value: 'id', children: 'sublist', disabled: 'stopped' }
    const data = {
      text: '用户1',
      id: '1',
      sublist: [
        { text: '用户2', id: '2' },
        { text: '用户3', id: '3' },
      ],
    }

    const $data = proxyData(data, mapping, ['children'])

    expect($data.label).toBe('用户1')
    expect($data.value).toBe('1')

    // 递归能力
    expect($data.children[0].label).toBe('用户2')
    expect($data.children[0].value).toBe('2')
  })

  it('回写数据： proxyData不要回写children', () => {
    const mapping = { label: 'text', value: 'id', children: 'sublist', disabled: 'stopped' }
    const data = {
      text: '用户1',
      id: '1',
      sublist: [
        { text: '用户2', id: '2' },
        { text: '用户3', id: '3' },
      ],
    }

    const $data = proxyData(data, mapping, ['children'])

    // 1、非代理属性
    $data.otherValue = 'other'
    expect($data.otherValue).toBe('other')

    // 2、代理属性
    $data.value = '3'
    expect($data.value).toBe('3')

    //3、 数组赋值------ 结论： 不要回写children的数组
    $data.children = [{ text: '用户4', id: '4' }] // TODO 这里如何写 {label:'', value:''}
    expect($data.children[0].value).toBe('4')

    $data.children.push({ text: '用户5', id: '5' }) // TODO push是个复合操作，此处并不能push成功
    expect($data.children.length).toBe(1)
  })

  it('proxData 2次也可以', () => {
    const mapping = { label: 'text', value: 'id', children: 'sublist', disabled: 'stopped' }
    const data = {
      text: '用户1',
      id: '1',
      sublist: [
        { text: '用户2', id: '2' },
        { text: '用户3', id: '3' },
      ],
    }

    const $data = proxyData(data, mapping, ['children'])
    const $$data = proxyData($data, mapping, ['children'])

    expect($$data.label).toBe('用户1')
    expect($$data.value).toBe('1')

    // 递归能力
    expect($$data.children[0].label).toBe('用户2')
    expect($$data.children[0].value).toBe('2')
  })

  it('proxData的配合ref, reactive使用', () => {
    const mapping = { label: 'text', value: 'id', children: 'sublist', disabled: 'stopped' }
    const data = {
      text: '用户1',
      id: '1',
      sublist: [
        { text: '用户2', id: '2' },
        { text: '用户3', id: '3' },
      ],
    }

    const $data = proxyData(data, mapping, ['children'])

    // 1、配合reactive
    let state: any = reactive({ data: $data })

    expect(state.data.label).toBe('用户1')
    expect(state.data.value).toBe('1')

    // 递归能力
    expect(state.data.children[0].label).toBe('用户2')
    expect(state.data.children[0].value).toBe('2')

    //2、 配合ref
    const dataRef = ref($data)

    expect(dataRef.value.label).toBe('用户1')
    expect(dataRef.value.value).toBe('1')

    // 递归能力
    expect(dataRef.value.children[0].label).toBe('用户2')
    expect(dataRef.value.children[0].value).toBe('2')

    // 3、reactive 的数组中使用
    state = reactive({ list: [] })
    state.list.push($data)

    expect(state.list[0].label).toBe('用户1')
    expect(state.list[0].value).toBe('1')

    // 递归能力
    expect(state.list[0].children[0].label).toBe('用户2')
    expect(state.list[0].children[0].value).toBe('2')
  })
})

describe('transferData 测试', () => {
  it('正向/反向转换', () => {
    const mapping = { text: 'label', id: 'value', sublist: 'children' }
    const data = {
      text: '用户1',
      id: '1',
      sublist: [
        { text: '用户2', id: '2' },
        { text: '用户3', id: '3' },
      ],
    }

    const $data = transferData(data, mapping, ['sublist'], false)

    expect($data.label).toBe('用户1')
    expect($data.value).toBe('1')

    expect($data.children[0].label).toBe('用户2')
    expect($data.children[0].value).toBe('2')

    const backData = transferData($data, mapping, ['sublist'], true)

    expect(backData.text).toBe('用户1')
    expect(backData.id).toBe('1')

    expect(backData.sublist[0].text).toBe('用户2')
    expect(backData.sublist[0].id).toBe('2')
  })
})
