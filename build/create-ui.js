const { writeFileSync } = require('fs')

const utils = require('./utils')

const args = utils.getInputCmd()

/**
 * 动态创建 RenderLess 中 index.js 文件
 * @param {String} componentName 组件名称
 */
const createRenderLessIndex = ({ libName }) => {
  const template = `
  // import { on, off } from '../common/utils/dom'
  // import { isObject, typeOf } from '../common/type'

  export const emptyFn = () => {}
  `
  const output = utils.prettierFormat({ str: template })

  writeFileSync(
    utils.mkdirByPathSync(utils.pathJoin('..', 'src', libName, 'index.js')),
    output
  )
}

/**
 * 动态创建 RenderLess 中 vue.js 文件
 * @param {String} componentName 组件名称
 */
const createRenderLessValue = ({ libName }) => {
  const template = `
  import { emptyFn } from './index'

  export const api = []
  
  export const renderless = (props, { computed, onBeforeUnmount, onMounted, reactive, watch },{
    vm,
    emitter,
    parent,
    emit,
    constants,
    nextTick,
    refs,
    broadcast,
    dispatch,
    mode: tiny_mode
  }) => {
    const state = reactive({
      test: '1'
    })

    const api = {
      state,
      emptyFn
    }
  
    return api
  }  
  `
  const output = utils.prettierFormat({
    str: template,
    options: { printWidth: 1000 }
  })

  writeFileSync(
    utils.mkdirByPathSync(utils.pathJoin('..', 'src', libName, 'vue.js')),
    output
  )
}

if (args.length > 0) {
  const componentName = utils.capitalize(args[0])
  const libName = utils.kebabCase({ str: componentName })

  createRenderLessIndex({ componentName, libName })
  createRenderLessValue({ componentName, libName })

  utils.logGreen(`npm run create:ui ${componentName} done.`)
} else {
  utils.logYellow('please enter the component name after command.')
}
