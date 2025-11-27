<template>
  <div class="monitor">
    <div class="count-container">
      <div class="title">监控概览</div>
      <div class="counts">
        <div
          v-for="(item, index) in state.counts"
          :key="index"
        >
          <count-item
            :title="state.loading ? 'loading': item.title"
            :iconName="item.iconName"
            :count="item.count"
            :isDescent="item.isDescent"
            :changeRate="item.changeRate"
          />
        </div>
      </div>
      <div class="counts">
        <div
          v-for="(item, index) in state.counts2"
          :key="index"
        >
          <count-item
            :title="state.loading ? 'loading': item.title"
            :iconName="item.iconName"
            :count="item.count"
            :isDescent="item.isDescent"
            :changeRate="item.changeRate"
          />
        </div>
      </div>
    </div>
    <div class="chart-container">
      <div class="title">实时监控</div>
      <div class="charts">
        <div class="chart">
          <chart-oneline
            title="用户活跃度"
            :loading="state.loading"
            title-tip="以天为单位，所有用户登录门户网站的次数"
            :tipFormatter="(params) => `${format(params[0].name, 'yyyy/MM/dd')}<br/>用户数: ${params[0].value}`"
            :xFormatter="(value) => format(value, 'M/dd')"
            :xDatas="state.loginxDatas"
            :yDatas="state.loginDatas"
          ></chart-oneline>
        </div>
        <div class="chart">
          <chart-oneline
            title="开发活跃度"
            :loading="state.loading"
            title-tip="以天为单位，应用开发页面被打开的次数"
            :tipFormatter="(params) => `${format(params[0].name, 'yyyy/MM/dd')}<br/>开发数: ${params[0].value}`"
            :xFormatter="(value) => format(value, 'M/dd')"
            :xDatas="state.appOpenxDatas"
            :yDatas="state.appOpenDatas"
          ></chart-oneline>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { format } from '@opentiny/vue-renderless/common/date.js'
import { useModal } from 'lowcode-design-controller'
import CountItem from './CountItem.vue'
import ChartOneline from './ChartOneline.vue'
import {
  fetchOverview,
  requestEvent
} from './http'

const { message } = useModal()

// 上传登录事件
export const recordLogin = () => {
  if (!sessionStorage.getItem('tiny_lowcode_recordlogin')) {
    requestEvent({ event_type: 'login_portal', url: window.location.href }).then(() => {
      sessionStorage.setItem('tiny_lowcode_recordlogin', 1)
    })
  }
}

// 上传打开应用开发事件
export const recordOpenApp = () => { requestEvent({ event_type: 'open_canvas', url: window.location.href }) }

export default {
  components: {
    CountItem,
    ChartOneline
  },
  setup() {
    const state = reactive({
      loading: false,
      loginDatas: new Array(10).fill(0),
      loginxDatas: new Array(10).fill(0),
      appOpenDatas: new Array(10).fill(0),
      appOpenxDatas: new Array(10).fill(0),
      counts: [{}, {}, {}, {}],
      counts2: [{}, {}, {}, {}]
    })

    const generateCount = (title, iconName, count, rise) => {
      const change = Number(rise * 100)

      return { title, iconName, count, changeRate: Math.abs(change), isDescent: change < 0 ? true : false }
    }

    state.loading = true
    fetchOverview().then((data) => {
      state.counts = [
        generateCount('应用总数', 'app', data.apps.count, data.apps.rise_rate),
        generateCount('设计器总数', 'platform', data.platforms.count, data.platforms.rise_rate),
        generateCount('用户总数', 'user', data.user.count, data.user.rise_rate),
        generateCount('组织总数', 'org', data.tenants.count, data.tenants.rise_rate)
      ]
      state.counts2 = [
        generateCount('物料总数', 'material', data.materials.count, data.materials.rise_rate),
        generateCount('插件总数', 'plug', data.plugin.count, data.plugin.rise_rate),
        generateCount('主题总数', 'theme', data.theme.count, data.theme.rise_rate),
        generateCount('dsl总数', 'dsl', data.dsl.count, data.dsl.rise_rate)
      ]

      let x = []

      let y = []

      data?.user_activity.forEach(value => {
        x.push(value.date)
        y.push(value.count)
      })
      state.loginxDatas = x
      state.loginDatas = y

      x = []
      y = []

      data?.event_open_canvas.forEach(value => {
        x.push(value.date)
        y.push(value.count)
      })
      state.appOpenxDatas = x
      state.appOpenDatas = y
    }).catch(error => {
      message({ message: `数据更新失败: ${error.message || error}`, status: 'error' })
    }).finally(() => {
      state.loading = false
    })

    return {
      format,
      state
    }
  }
}
</script>
<style lang="less" scoped>
.monitor {
  background-color: #f2f5fc;
  height: 100%;
  overflow: auto;
  .title {
    box-sizing: border-box;
    font-size: 14px;
    font-family: 'Microsoft YaHei', 'Microsoft YaHei-Normal';
    text-align: left;
    color: #2e323c;
    padding: 0 0 20px 0;
  }
    > div {
      background-color: #fff;
      margin: 20px;
      padding: 20px;
      border-radius: 5px;
    }
    .counts {
      font-size: 44px;
      border: 1px solid #dfe1e6;
      border-radius: 4px;
      margin-bottom: 20px;
      padding: 30px 0;
      > div {
        display: inline-block;
        box-sizing: border-box;
        width: 25%;
        border-right: 1px solid #dfe1e6;
        text-align: center;
      }
      > div:last-child {
        border-right: none
      }
    }
    .chart-container {
      height: 50%;
    }
    .charts {
      height: calc(100% - 70px);
      display: flex;
      width: 100%;
      justify-content: space-between;
      .chart {
        box-sizing: border-box;
        display: inline-block;
        width: calc(50% - 20px);
        height: 100%;
        padding: 20px;
        border: 1px solid #dfe1e6;
        border-radius: 4px;
      }
    }
}
</style>
