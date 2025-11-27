import { state } from '../state'
import { search, sortByTime } from '../utils'

let componentLibrary = []

export default [
  {
    url: /\/material-center\/api\/componentLibrary\/find/,
    proxy: `${import.meta.env.BASE_URL}mock/material/componentLibrary.json`,
    handleData({ data }, config) {
      if (!state.componentLibrary.length) {
        state.componentLibrary = [...data]
      }

      const { _limit: limit, _start: start, _sort: sort, framework_in } = config.params || {}
      const nameContains = config?.params?.['_where[_or][1][name_contains]']

      let result = limit ? state.componentLibrary.slice(start, limit + start) : state.componentLibrary

      result = search(result, ['name', 'description'], nameContains)

      if (framework_in?.length) {
        result = result.filter((item) => framework_in.includes(item.framework))
      }

      if (sort) {
        result = sortByTime(result, sort)
      }

      componentLibrary = [...state.componentLibrary]

      return { data: result }
    }
  },
  {
    url: '/material-center/api/componentLibrary/count',
    proxy: `${import.meta.env.BASE_URL}mock/material/componentLibrary.json`,
    handleData({ data }, config) {
      if (!state.componentLibrary.length) {
        state.componentLibrary = [...data]
        componentLibrary = [...state.componentLibrary]
      }

      return { data: componentLibrary.length }
    }
  },
  {
    url: '/material-center/api/componentLibrary/create',
    response(config) {
      const data = {
        ...JSON.parse(config.data),
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        id: new Date().getTime()
      }

      state.componentLibrary.unshift(data)

      return new Promise((resolve) => {
        resolve([200, { data }])
      })
    }
  },
  {
    url: /\/material-center\/api\/componentLibrary\/update\/\d+$/,
    response(config) {
      const data = JSON.parse(config.data)
      const params = config.url.split('/')

      const id = parseInt(params[params.length - 1], 10)

      state.componentLibrary.splice(
        state.componentLibrary.findIndex((item) => item.id === id),
        1,
        { ...data, id }
      )

      return new Promise((resolve) => {
        resolve([200, { data }])
      })
    }
  },
  {
    url: /\/material-center\/api\/componentLibrary\/delete\/\d+$/,
    response(config) {
      const params = config.url.split('/')
      const id = parseInt(params[params.length - 1], 10)
      const responseData = state.componentLibrary.splice(
        state.componentLibrary.findIndex((item) => item.id === id),
        1
      )

      return new Promise((resolve) => {
        resolve([200, { data: responseData }])
      })
    }
  },
  {
    url: /\/material-center\/api\/componentLibrary\/list/,
    response(config) {
      const url = config.url
      const query = url.substr(url.indexOf('?'))
      const params = new URLSearchParams(query)
      const id = parseInt(params.get('id'), 10)

      const res = state.componentLibrary.find((item) => item.id === id)

      return { data: res }
    }
  }
]
