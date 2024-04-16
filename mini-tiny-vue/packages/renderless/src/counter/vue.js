import { increase,decrease,reset } from './index'

// 决定哪些变量会暴露到模板上
export const api = ['state', 'increase','decrease','reset']

export const renderless = (props, { reactive }, { emit }) => {
  const state = reactive({
    value: props.value
  })

  const api = {
    state,
    increase: increase({ props, state, emit }),
    decrease: decrease({ props, state, emit }),
    reset: reset({ state, emit })
  }

  return api
}
