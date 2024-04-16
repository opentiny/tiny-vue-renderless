<script>
import { defineComponent, $prefix, setup, h } from '@opentiny/vue-common'
import { renderless, api } from '@opentiny/renderless/src/counter/vue'
import '@opentiny/vue-theme/src/counter/index.less'

/** 示例说明：
 * 由于历史开发的Vue2组件中，有的使用了render函数，通过在适配层提供 h 函数， 就能让这些组件在Vue3框架复活！ */
export default defineComponent({
  name: $prefix + 'Counter',
  emits: ['change'],
  props: {
    value: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 1
    }
  },
  setup(props, context) {
    return setup({ props, context, renderless, api })
  },
  render() {
    return h(
      'div',
      {
        class: 'tiny-counter',
        attrs: { title: '当前模板是通过h函数渲染的' } // 增加一个title，以区别模板的情况
      },
      [
        h(
          'span',
          {
            class: 'tiny-counter__control',
            on: {
              click: this.decrease
            }
          },
          ['- ' + this.step]
        ),
        h(
          'span',
          {
            class: 'tiny-counter__value'
          },
          [this.state.value]
        ),
        h(
          'span',
          {
            class: 'tiny-counter__control',
            on: {
              click: this.increase
            }
          },
          ['+ ' + this.step]
        )
      ]
    )
  }
})
</script>
