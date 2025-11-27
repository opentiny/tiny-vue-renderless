<template>
  <div class="chart-oneline">
    <div class="chart-head">
      <div class="head1">
        <span>{{ title }}</span>
        <tiny-tooltip
          effect="light"
          :content="titleTip"
          placement="top-start"
        ><icon-help-query></icon-help-query></tiny-tooltip>
      </div>
      <div class="head2">次/天</div>
    </div>
    <div class="chart-body">
      <tiny-chart  height="100%" :loading="loading" :grid="grid" :data="chartData" :settings="chartSettings" :legend-visible="false"></tiny-chart>
    </div>
  </div>
</template>

<script>
import { ChartLine, Tooltip } from '@opentiny/vue'
import { IconHelpQuery } from '@opentiny/vue-icon'
import { computed } from 'vue'

const grid = {
  bottom: '0px',
  left: '0px',
  top: '10px'
}

export default {
  components: {
    TinyChart: ChartLine,
    TinyTooltip: Tooltip,
    IconHelpQuery: IconHelpQuery()
  },
  props: {
    xDatas: {
      type: Array,
      required: true,
      default: () => []
    },
    yDatas: {
      type: Array,
      required: true,
      default: () => []
    },
    titleTip: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const chartData = computed(() => {
      const data = {
        columns: ['天', '次数'],
        rows: props.xDatas.map((x, index) => {
          return { 天: x, 次数: props.yDatas[index] }
        })
      }

      return data
    })

    const chartSettings = {
      area: true
    }

    return {
      grid,
      chartSettings,
      chartData
    }
  }
}
</script>

<style lang="less" scoped>
.chart-oneline {
  height: 100%;
  .chart-head {
    height: 62px;
    font-size: 14px;
    font-weight: bold;
    text-align: left;
    color: #252b3a;
    .head1 {
      display: flex;
      align-items: center;
      >span{
        display: inline-block;
        padding-right: 5px;
      }
    }
    .head2 {
      padding: 16px 0 13px 0;
      color: #575d6c;
      font-weight: normal;
      font-size: 12px;
    }
  }
  .chart-body {
    height: calc(100% - 62px);
  }
}
</style>
