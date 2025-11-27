import { state } from '../state'

let components = []

export default [
  {
    url: '/material-center/api/component/create',
    response(config) {
      const data = JSON.parse(config.data)

      data.updated_at = new Date().toISOString()
      data.created_at = data.updated_at
      data.createdBy = {
        id: 13,
        username: 'developer',
        resetPasswordToken: 'xxx'
      }
      data.id = new Date().getTime()

      state.components.unshift(data)

      components = [...state.components]

      return new Promise((resolve) => {
        resolve([200, { data }])
      })
    }
  },
  {
    url: '/material-center/api/component/update',
    response(config) {
      const data = JSON.parse(config.data)

      state.components.splice(
        state.components.findIndex((item) => item.id === data.id),
        1,
        data
      )

      components = [...state.components]

      return new Promise((resolve) => {
        resolve([200, { data }])
      })
    }
  },
  {
    url: /\/material-center\/api\/component\/delete/,
    response(config) {
      const url = config.url
      const query = url.substr(url.indexOf('?'))
      const params = new URLSearchParams(query)
      const id = params.get('id')
      const component = state.components.splice(
        state.components.findIndex((item) => String(item.id) === id),
        1
      )

      components = [...state.components]

      return new Promise((resolve) => {
        resolve([200, { data: component }])
      })
    }
  },
  {
    url: '/material-center/api/component/histories',
    proxy: `${import.meta.env.BASE_URL}mock/material/componentsHistories.json`,
    handleData({ data }, config) {
      const url = config.url
      const query = url.substr(url.indexOf('?'))
      const params = new URLSearchParams(query)
      const id = params.get('id')

      return { data: data[id] }
    }
  },
  {
    url: /\/material-center\/api\/component\/count/,
    proxy: `${import.meta.env.BASE_URL}mock/material/component.json`,
    handleData({ data }, config) {
      if (!state.components.length) {
        state.components = [...data]
        components = [...state.components]
      }

      return { data: components.length }
    }
  },
  {
    url: /\/material-center\/api\/component\/list/,
    proxy: `${import.meta.env.BASE_URL}mock/material/component.json`,
    handleData({ data }, config) {
      const url = config.url
      const query = url.substr(url.indexOf('?'))
      const params = new URLSearchParams(query)
      const library = parseInt(params.get('library'), 10)

      if (!state.components.length) {
        state.components = [...data]
      }

      const { _limit: limit, _start: start } = config.params || {}

      let result = limit ? state.components.slice(start, limit + start) : state.components

      result = result.filter((item) => item.library === library)

      return { data: result }
    }
  }
]
