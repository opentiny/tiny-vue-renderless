import { state } from '../state'
import { format } from '@opentiny/vue-renderless/common/date'

export default [
  {
    // 获取生态，通过category字段区分theme/dsl/plugin/toolbar
    url: /\/platform-center\/api\/ecology\/extension\/base\/version$/,
    proxy: `${import.meta.env.BASE_URL}mock/platform/ecology.json`,
    handleData({ data }, config) {
      const { _limit, _start } = config.params

      if (!state.ecologyList.length) {
        state.ecologyList = data
      }

      let result = state.ecologyList.filter((item) => item.category === config.params.category)

      if (config.params.createdBy) {
        // 过滤出 “我的”查找
        result = result.filter((item) => item.createdBy.id === config.params.createdBy)
      }
      result = _limit === -1 || !_limit ? result : result.slice(_start, _start + _limit)

      return { data: result }
    }
  },
  {
    // 获取生态，通过category字段区分theme/dsl/plugin/toolbar
    url: /\/platform-center\/api\/ecology\/extension\/base\/version\/count/,
    proxy: `${import.meta.env.BASE_URL}mock/platform/ecology.json`,
    handleData({ data }, config) {
      if (!state.ecologyList.length) {
        state.ecologyList = data
      }
      let result = state.ecologyList.filter((item) => item.category === config.params.category)

      if (config.params.createdBy) {
        // 过滤出 “我的”
        result = result.filter((item) => item.createdBy.id === config.params.createdBy)
      }

      return { data: result.length }
    }
  },
  {
    // 获取生态，通过category字段区分theme/dsl/plugin/toolbar
    url: /\/platform-center\/v1\/api\/ecology\/extension\/base\/version\/create$/,
    proxy: `${import.meta.env.BASE_URL}mock/platform/ecology.json`,
    handleData({ data }, config) {
      const defaultConfig = JSON.parse(config.data)

      defaultConfig.updated_at = format(new Date())
      // id为13是固定的mock自己
      defaultConfig.createdBy = { id: 13, username: 'developer', resetPasswordToken: 'developer' }
      state.ecologyList.push(defaultConfig)

      return { data: defaultConfig }
    }
  },
  {
    // 获取生态，通过category字段区分theme/dsl/plugin/toolbar
    url: /\/platform-center\/v1\/api\/ecology\/extension\/base\/version\/update$/,
    proxy: `${import.meta.env.BASE_URL}mock/platform/ecology.json`,
    handleData({ data }, config) {
      const defaultConfig = JSON.parse(config.data)

      // 目前我看传进来的参数没有id，无法定位到当前更新的是哪个生态，所以暂时先这样，不会报错
      defaultConfig.updated_at = format(new Date())
      defaultConfig.createdBy = { id: 13, username: 'developer', resetPasswordToken: 'developer' }

      return { data: defaultConfig }
    }
  }
]
