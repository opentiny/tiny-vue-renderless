import { format } from '@opentiny/vue-renderless/common/date'
import { state } from '../state'
import { search, sortByTime } from '../utils'

function inintApplicationList(data) {
  if (!state.applicationList?.length) {
    state.applicationList.push(
      ...data.map((item, idx) => ({
        ...item,
        image_url: `${import.meta.env.BASE_URL}img/application/application${(idx % 4) + 1}.png`
      }))
    )
  }
  const editorUrl = import.meta.env.BASE_URL + 'tiny-engine-editor/index.html?type=app'

  state.applicationList = state.applicationList.map((app) => ({ ...app, editor_url: editorUrl }))
}

export default [
  {
    url: /\/app-center\/api\/apps\/delete/,
    response(config) {
      const url = config.url
      const id = url.substr(url.lastIndexOf('/') + 1)
      const appform = state.applicationList.splice(
        state.applicationList.findIndex((item) => String(item.id) === id),
        1
      )

      return new Promise((resolve) => {
        resolve([200, { data: appform }])
      })
    }
  },
  {
    url: /\/app-center\/api\/apps\/histories/,
    proxy: `${import.meta.env.BASE_URL}mock/application/version.json`,
    handleData({ data }, config) {
      const url = config.url
      const query = url.substr(url.indexOf('?'))
      const params = new URLSearchParams(query)
      const app = params.get('app')

      return { data: data[app] || [] }
    }
  },
  {
    url: /\/app-center\/api\/apps\/create$/,
    async response(config) {
      const data = JSON.parse(config.data)
      const { name, description, platform } = data

      if (!state.applicationList?.length) {
        const appModules = await import('@/application/http')

        state.applicationList = await appModules.fetchApplication()
      }

      const id = state.applicationList?.length + 1

      const platformModules = await import('@/platform/http')

      const platformInstance = await platformModules.fetchPlatformById(platform)
      const framework = platformInstance?.material_history.framework || platformInstance.dsl[0]?.name_cn?.split('-')[0]

      const app = {
        id,
        name,
        description,
        platform: platformInstance,
        version: '1.0',
        created_at: format(new Date()),
        updated_at: format(new Date()),
        framework
      }

      state.applicationList?.push(app)

      return new Promise((resolve) => {
        resolve([200, { data: app }])
      })
    }
  },
  {
    url: /\/app-center\/api\/apps\/update/,
    response(config) {
      const url = config.url
      const id = url.substr(url.lastIndexOf('/') + 1)
      const data = JSON.parse(config.data)
      const oldApp = state.applicationList.find((item) => String(item.id) === id)
      const app = { ...oldApp, ...data }

      app.updated_at = format(new Date())

      state.applicationList.splice(
        state.applicationList.findIndex((item) => String(item.id) === id),
        1,
        app
      )

      return new Promise((resolve) => {
        resolve([200, { data: app }])
      })
    }
  },
  {
    url: /\/app-center\/api\/apps\/canvas\/lock$/,
    response(config) {
      const state = config.params.state
      const user = {
        id: 13,
        username: '开发者',
        email: 'developer@lowcode.com',
        provider: null,
        password: null,
        resetPasswordToken: 'developer',
        confirmationToken: 'dfb2c162-351f-4f44-ad5f-899831311129',
        confirmed: true,
        blocked: null,
        created_by: null,
        updated_by: null,
        created_at: '2022-05-16T19:54:43.000Z',
        updated_at: '2022-05-16T19:54:43.000Z'
      }

      const result = {
        occupier: state === 'occupy' ? user : null
      }

      return new Promise((resolve) => {
        resolve([200, { data: result }])
      })
    }
  },
  {
    url: /\/app-center\/api\/apps\/count$/,
    proxy: `${import.meta.env.BASE_URL}mock/application/application.json`,
    handleData({ data }, config) {
      const { _limit, _start, name_contains, framework_in, _sort } = config.params || {}

      inintApplicationList(data)

      let result = search(state.applicationList, ['name', 'description'], name_contains)

      if (framework_in) {
        result = result.filter((app) => framework_in === app.framework)
      }

      if (_sort) {
        result = sortByTime(result, _sort)
      }

      result = _limit ? result.slice(_start, _start + _limit) : result

      return { data: result.length }
    }
  },
  {
    url: /\/app-center\/api\/apps\/download/,
    response(config) {
      return new Promise((resolve) => {
        resolve([
          200,
          {
            data: 'https://tiny-editor.obs.cn-north-5.myhuaweicloud.com/app-preview/source-code/app-959-1660899960939.zip'
          }
        ])
      })
    }
  },
  {
    url: /\/app-center\/api\/apps\/all$/,
    proxy: `${import.meta.env.BASE_URL}mock/application/application.json`,
    handleData({ data }, config) {
      const { _limit, _start } = config.params || {}

      inintApplicationList(data)

      const result = _limit ? state.applicationList.slice(_start, _start + _limit) : state.applicationList

      return {
        data: {
          list: result,
          total: state.applicationList.length
        }
      }
    }
  },
  {
    url: /\/app-center\/api\/apps/,
    proxy: `${import.meta.env.BASE_URL}mock/application/application.json`,
    handleData({ data }, config) {
      const { _limit, _start, name_contains, framework_in, _sort } = config.params || {}

      inintApplicationList(data)

      let result = search(state.applicationList, ['name', 'description'], name_contains)

      if (framework_in) {
        result = result.filter((app) => framework_in === app.framework)
      }

      if (_sort) {
        result = sortByTime(result, _sort)
      }

      result = _limit ? result.slice(_start, _start + _limit) : result

      return { data: result }
    }
  },
  {
    url: /\/app-center\/api\/template\/creatapps$/,
    async response(config) {
      if (!state.applicationList?.length) {
        const appModules = await import('@/application/http')

        state.applicationList = await appModules.fetchApplication()
      }

      const params = JSON.parse(config.data)
      const { description, image_url, name, platform, id } = params

      const app = state.applicationList.find((item) => item.id === id)
      const newApp = { ...app }

      newApp.id = state.applicationList.length + 1
      newApp.name = name
      newApp.description = description
      newApp.image_url = image_url
      newApp.platform.id = platform
      newApp.is_default = false
      newApp.template_type = null

      state.applicationList.unshift(newApp)

      return new Promise((resolve) => {
        resolve([200, { data: newApp }])
      })
    }
  }
]
