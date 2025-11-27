import { state, TASK_STATUS } from '../state'
import { format } from '@opentiny/vue-renderless/common/date'
import { search, sortByTime } from '../utils'

const findEcologyItemByVersionId = (category, targetId, isNotChangeId = true) => {
  return state.ecologyList
    .filter((item) => item?.category === category && item?.versions[0]?.id === targetId)
    ?.map((item) => {
      const res = {
        ...item,
        version: item?.versions[0]?.id,
        base: item?.id
      }

      if (!isNotChangeId) res.id = targetId

      return res
    })[0]
}

const copyObj = (obj) => {
  return JSON.parse(JSON.stringify(obj || {}))
}
const getPlatform = (platform) => {
  if (platform.theme) {
    platform.theme = findEcologyItemByVersionId('theme', platform.theme, false)
  }
  if (platform.plugins) {
    platform.plugins = platform.plugins
      .map((id) => findEcologyItemByVersionId('plugin', id, false))
      .filter((item) => item)
  }

  if (platform.dsl) {
    platform.dsl = [findEcologyItemByVersionId('dsl', platform.dsl, false)]
  }

  if (platform.toolbar) {
    platform.toolbar = platform.toolbar
      .map((id) => findEcologyItemByVersionId('toolbar', id, false))
      .filter((item) => item)
  }

  if (platform.material_history) {
    platform.material_history = state.materialList?.find((item) => item.latest === platform.material_history)
  }
  if (platform.app_extend) {
    platform.app_extend = platform.app_extend
      .map((id) => findEcologyItemByVersionId('plugin', id, false))
      .filter((item) => item)
  }
}
// 设计器id
const updatePlatform = (platform, id) => {
  const listPlatform = state.platformList.find((item) => String(item.id) === String(id)) || {}

  if (platform.theme) {
    listPlatform.theme = platform.theme
    platform.theme = findEcologyItemByVersionId('theme', platform.theme)
  }
  if (platform.sort_plugins || platform.plugins) {
    listPlatform.plugins = copyObj(platform.plugins || [])
    platform.plugins = platform.plugins
      .map((id) => findEcologyItemByVersionId('plugin', id, false))
      .filter((item) => item)
  }

  if (platform.dsl) {
    platform.dsl = [findEcologyItemByVersionId('dsl', platform.dsl)]
  }

  if (platform.toolbar) {
    listPlatform.toolbar = copyObj(platform.toolbar || [])
    platform.toolbar = platform.toolbar = platform.toolbar
      .map((id) => findEcologyItemByVersionId('toolbar', id, false))
      .filter((item) => item)
  }

  if (platform.material_history) {
    platform.material_history = state.materialList?.find((item) => item.latest === platform.material_history)
    listPlatform.material_history = platform.material_history?.latest
  }
  if (platform?.app_extend?.length) {
    platform.app_extend = platform.app_extend
      .map((id) => findEcologyItemByVersionId('appExtension', id, false))
      .filter((item) => item)
  }

  platform.updated_at = format(new Date())
}
const getData = async () => {
  const getPlatformList = async () => {
    const response = await fetch(`${import.meta.env.BASE_URL}mock/platform/platformList.json`)

    return response.json()
  }
  const getMaterialList = async () => {
    const response = await fetch(`${import.meta.env.BASE_URL}mock/platform/material.json`)

    return response.json()
  }
  const getEcologyList = async () => {
    const response = await fetch(`${import.meta.env.BASE_URL}mock/platform/ecology.json`)

    return response.json()
  }

  if (!state.platformList.length) {
    state.platformList = (await getPlatformList()).data
  }
  if (!state.materialList.length) {
    state.materialList = (await getMaterialList()).data
  }
  if (!state.ecologyList.length) {
    state.ecologyList = (await getEcologyList()).data
  }
}

export default [
  {
    // 设计器首页列表数据
    url: /\/platform-center\/api\/platforms$/,
    proxy: `${import.meta.env.BASE_URL}mock/platform/platformList.json`,
    handleData({ data }, config) {
      const { _limit, _start, name_contains, _sort } = config.params || {}

      state.platformList = state.platformList.length ? state.platformList : data

      let result = state.platformList.slice(_start, _start + _limit)

      result = search(result, ['name', 'description'], name_contains)

      if (_sort) {
        result = sortByTime(result, _sort)
      }

      return { data: result }
    }
  },
  {
    url: /\/platform-center\/api\/platform(\?id=\d+)?$/,
    response: async (config) => {
      const url = config.url
      const query = url.substr(url.indexOf('?'))
      const params = new URLSearchParams(query)
      const id = params.get('id')

      await getData()
      state.platform = copyObj(state.platformList.find((item) => String(item.id) === id))
      getPlatform(state.platform)

      state.platform.app_extend_config.route = state.platform.app_extend_config.route.filter(
        (item) => item.name !== 'applicationSettingHConsole'
      )

      return [200, { data: state.platform }]
    }
  },
  {
    url: /\/platform-center\/api\/platform\/create$/,
    proxy: `${import.meta.env.BASE_URL}mock/platform/platformList.json`,
    handleData({ data }, config) {
      const defaultConfig = JSON.parse(config.data)

      const id = state.platformList?.length + 1
      const platform = { ...data[0], ...defaultConfig }

      platform.id = id
      platform.is_default = false
      platform.updated_at = format(new Date())
      platform.created_at = format(new Date())
      state.platformList?.push(platform)

      return { data: platform }
    }
  },
  {
    url: /\/platform-center\/api\/platform\/update\/\d+$/,
    response(config) {
      const data = JSON.parse(config.data)
      const { id } = data
      const oldPlatform = copyObj(state.platformList.find((item) => item.id === id))

      let platform = { ...oldPlatform, ...data }

      platform = copyObj(platform)
      updatePlatform(platform, id)

      state.platformList.splice(
        state.platformList.findIndex((item) => item.id === id),
        1,
        platform
      )

      return new Promise((resolve) => {
        resolve([200, { data: platform }])
      })
    }
  },
  {
    url: /\/platform-center\/api\/platform\/hash\/compare\/\d+$/,
    response(config) {
      return new Promise((resolve) => {
        resolve([200, { data: { same: false } }])
      })
    }
  },
  {
    url: /\/platform-center\/api\/platform\/histories/,
    proxy: `${import.meta.env.BASE_URL}mock/platform/version.json`,
    handleData({ data }, config) {
      const url = config.url
      const query = url.substr(url.indexOf('?'))
      const params = new URLSearchParams(query)
      const platform = params.get('platform')

      return { data: data[platform] || [] }
    }
  },
  {
    // 删除设计器
    url: /\/platform-center\/api\/platform\/delete\/\d+/,
    response(config) {
      const url = config.url
      const id = url.substr(url.lastIndexOf('/') + 1)

      const platform = state.platformList.splice(
        state.platformList.findIndex((item) => String(item.id) === id),
        1
      )

      return new Promise((resolve) => {
        resolve([200, { data: platform }])
      })
    }
  },
  {
    // 设计器构建进度
    url: /\/platform-center\/api\/platform\/task\?uniqueId=(.+)&taskTypeId=3/,
    response(config) {
      return new Promise((resolve) => {
        resolve([
          200,
          {
            data: {
              created_at: '2023-08-21T12:31:31.000Z',
              id: 31730,
              indicator: {
                durationValue: {
                  processes: [
                    { cost: 0, stage: 'initBuildGround' },
                    { cost: 151721, stage: 'initEditor' },
                    { cost: 2, stage: 'generateLowcodeConfig' },
                    { cost: 1, stage: 'injectAddons' },
                    { cost: 122439, stage: 'build' }
                  ],
                  totalCost: 275100
                },
                usageValue: {
                  maxCpu: 211.2,
                  maxCpuNew: 138,
                  maxMem: 4302435,
                  maxRss: 4507628
                }
              },
              progress: 'deploy code folder',
              progress_percent: 10,
              ratio: null,
              taskName: '',
              taskResult: '{"result":"platform building completed"}',
              taskStatus: 3,
              taskTypeId: 3,
              teamId: 0,
              uniqueId: 1977,
              updated_at: '2023-08-21T12:31:31.000Z'
            }
          }
        ])
      })
    }
  },
  {
    url: /\/platform-center\/api\/platform\/build\/d+$/,
    proxy: `${import.meta.env.BASE_URL}mock/platform/build.json`,
    response(config) {
      const url = config.url
      const id = url.substr(url.lastIndexOf('/') + 1)
      const task = state.platformStatus[id] || {}

      state.platformStatus[id] = task

      task.data = {
        data: {
          taskStatus: TASK_STATUS.INIT,
          progress_percent: 10
        }
      }

      return new Promise((resolve) => {
        resolve([200, task.data])

        task.data.data.taskStatus = TASK_STATUS.RUNNING
        task.data.data.progress_percent = 50

        if (task.timeoutID) {
          clearTimeout(task.timeoutID)
        }

        task.timeoutID = setTimeout(() => {
          if (Number(id) === 2) {
            task.data.data.taskStatus = TASK_STATUS.STOPPED
          } else {
            task.data.data.taskStatus = TASK_STATUS.FINISHED
            task.data.data.progress_percent = 0

            // 构建成功后，启动平台服务，并往数据库里写入 url 信息
            state.platformList.some((item) => {
              if (String(item.id) === id) {
                item.platform_url = `${process.env.VUE_APP_ORIGIN}/platform-center`

                return true
              }

              return false
            })
          }
        }, 10000)
      })
    }
  },
  {
    url: /\/platform-center\/api\/platform\/monitoring\/overview$/,
    proxy: `${import.meta.env.BASE_URL}mock/platform/monitor.json`,
    handleData({ data }) {
      return { data }
    }
  },
  {
    url: /\/platform-center\/api\/platform\/count$/,
    proxy: `${import.meta.env.BASE_URL}mock/platform/platformList.json`,
    handleData({ data }) {
      const len = state.platformList?.length || 1

      return { data: len }
    }
  },

  {
    url: /\/platform-center\/api\/platform\/all$/,
    proxy: `${import.meta.env.BASE_URL}mock/platform/platformList.json`,
    handleData({ data }, config) {
      if (!state.platformList.length) {
        state.platformList.push(...data)
      }
      const { _limit, _start } = config.params || {}
      const result = _limit ? state.platformList.slice(_start, _start + _limit) : state.platformList

      return {
        data: {
          list: result,
          total: state.platformList.length
        }
      }
    }
  },
  {
    url: /\/platform-center\/api\/platform/,
    proxy: `${import.meta.env.BASE_URL}mock/platform/platformList.json`,
    handleData({ data }, config) {
      const { _limit, _start } = config.params || {}
      const url = config.url
      const query = url.substr(url.indexOf('?'))
      const params = new URLSearchParams(query)
      const id = params.get('id')

      if (id) {
        const result = state.platformList
          ? state.platformList.find((item) => String(item.id) === id)
          : data?.find((item) => String(item.id) === id)

        return { data: result }
      } else {
        if (!state.platformList.length) {
          state.platformList.push(...data)
        }

        const result = state.platformList.slice(_start, _start + _limit)

        return { data: result }
      }
    }
  }
]
