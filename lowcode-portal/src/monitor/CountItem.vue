<template>
  <div class="count">
    <div class="count-left">
      <svg-icon :name="iconName" class="logo-svg"></svg-icon>
    </div>
    <div class="count-right">
      <div class="count-rr">
        <div class="count-title">{{ title }}</div>
        <div :class="['count-value', state.changeCount ? 'count-value1' : 'count-value2']">
          <span>{{ count }}</span>
        </div>
      </div>
      <span :class="['count-des', isDescent ? 'count-red' : 'content-blue']">
        <span class="count-icon">
          <component :is="isDescent ? 'icon-arrow-down' : 'icon-arrow-up'"></component>
        </span>
        <span class="conut-d">{{ isDescent ? '同比下降' : '同比增长' }}</span>
        <tiny-tooltip
          effect="light"
          :content="'今天对比上个月同一天的' + (isDescent ? '下降' : '增长') + '比率'"
          placement="top-start"
        >
          <span class="query"><icon-help-query></icon-help-query></span>
        </tiny-tooltip>
        <span>{{ changeRate }}%</span>
      </span>
    </div>
  </div>
</template>

<script>
import { watch, reactive } from 'vue'
import { IconArrowUp, IconArrowDown, IconHelpQuery } from '@opentiny/vue-icon'
import { Tooltip } from '@opentiny/vue'
export default {
  components: {
    TinyTooltip: Tooltip,
    IconArrowUp: IconArrowUp(),
    IconArrowDown: IconArrowDown(),
    IconHelpQuery: IconHelpQuery()
  },
  props: {
    iconName: {
      type: String,
      default: 'tiny-logo'
    },
    title: {
      type: String,
      default: '--'
    },
    count: {
      type: Number,
      default: 0
    },
    isDescent: {
      type: Boolean,
      default: false
    },
    changeRate: {
      type: Number,
      max: 100,
      min: 0,
      default: 0
    }
  },
  setup(props) {
    const state = reactive({
      changeCount: true
    })

    watch(
      () => props.count,
      () => {
        state.changeCount = !state.changeCount
      }
    )

    return {
      state
    }
  }
}
</script>

<style lang="less" scoped>
.count {
  display: inline-block;
  .count-left {
    display: inline-block;
    vertical-align: top;
    font-size: 1em;
    padding-right: 0.3em;
    line-height: 1em;
    &:after {
      content: '';
      display: inline-block;
      height: 100%;
      vertical-align: middle;
    }
  }
  .count-right {
    display: inline-block;
    .count-rr {
      display: inline-block;
      .count-title {
        text-align: left;
        font-size: 0.26em;
        color: #575d6c;
      }
      .count-value {
        font-size: 0.78em;
      }
      .count-value1 {
        animation-name: font-change;
        animation-duration: 1s;
      }
      .count-value2 {
        animation-name: font-change2;
        animation-duration: 1s;
      }
    }
    .count-des {
      font-size: 0.22em;
      vertical-align: middle;
      .query {
        display: inline-block;
        position: relative;
        top: -0.42em;
        margin-right: 0.42em;
      }
      .count-icon {
        line-height: 1em;
        margin: 0 0.33em 0 1.1em;
        display: inline-block;
        border-radius: 1em;
        color: #fff;
      }
      .conut-d {
        display: inline-block;
        padding-right: 0.42em;
      }
    }
    .content-blue {
      color: #5e7ce0;
      animation: red-to-blue 2s infinite;
      .count-icon {
        background-color: #5e7ce0;
      }
    }
    .count-red {
      color: #f66f6a;
      animation: blue-to-red 2s infinite;
      .count-icon {
        background-color: #f66f6a;
      }
    }
  }
}
@keyframes font-change {
  0% {
  }
  50% {
    transform: scale(1.2, 1.2);
  }
  100% {
  }
}
@keyframes font-change2 {
  0% {
  }
  50% {
    transform: scale(1.2, 1.2);
  }
  100% {
  }
}
</style>
