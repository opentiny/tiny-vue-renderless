<template>
  <div class="tiny-countdown__container">
    <slot
      :day="state.day"
      :hour="state.hour"
      :minute="state.minute"
      :second="state.second"
    >
      <template v-if="!ignoreDay">{{ state.day }}:</template>{{ state.hour }}:{{
        state.minute
      }}:{{ state.second }}
    </slot>
  </div>
</template>

<script>
import { renderless, api } from '@opentiny/renderless/countdown/vue'
import { setup, defineComponent } from '@opentiny/vue-common'
import '@opentiny/theme/countdown/index.less'
export default defineComponent({
  props: {
    deadline: {
      // 倒计时剩余时间（秒）
      type: Number,
      default: 60
    },
    completeZero: {
      // 补全0
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    leftSecond: {
      // 提前到期（秒）
      type: Number,
      default: 0
    },
    ignoreDay: {
      // true：展示到小时；false：展示到天
      type: Boolean,
      default: true
    },
    operate: {
      type: Function
    }
  },
  setup(props, context) {
    return setup({ props, context, renderless, api })
  }
})
</script>
