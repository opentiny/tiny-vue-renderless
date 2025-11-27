import { state } from '../state'
import { sortByTime } from '../utils'

export default [
  {
    url: /\/material-center\/api\/block\/detail\//,
    proxy: `${import.meta.env.BASE_URL}mock/material/block.json`,
    handleData({ data }, config) {
      const id = config.url.replace(/\/material-center\/api\/block\/detail\//, '')

      if (!state.blocks?.length) {
        state.blocks.push(...data)
      }
      let result = state.blocks.find((block) => String(block.id) === id)

      return { data: result }
    }
  },
  {
    url: /\/material-center\/api\/block\/histories$/,
    proxy: `${import.meta.env.BASE_URL}mock/material/blocksHistories.json`,
    handleData({ data }, config) {
      const url = config.url
      const query = url.substr(url.indexOf('?'))
      const params = new URLSearchParams(query)
      const id = params.get('id')

      return { data: data[id] }
    }
  },
  {
    url: /\/material-center\/api\/block\/tags$/,
    proxy: `${import.meta.env.BASE_URL}mock/material/block.json`,
    handleData({ data }) {
      const tags = []

      data &&
        data.forEach((block) => {
          block.tags && tags.push(...block.tags)
        })

      return { data: Array.from(new Set(tags)) }
    }
  },
  {
    url: /\/material-center\/api\/block\/users$/,
    proxy: `${import.meta.env.BASE_URL}mock/material/block.json`,
    handleData({ data }) {
      const users = []

      data &&
        data.forEach((block) => {
          users.push(block.author)
        })

      return { data: users }
    }
  },
  {
    url: /\/material-center\/api\/block\/tenants$/,
    proxy: `${import.meta.env.BASE_URL}mock/material/block.json`,
    handleData({ data }) {
      const tenants = []

      data &&
        data.forEach((block) => {
          block.tenant && tenants.push(block.tenant)
        })

      return { data: tenants }
    }
  },
  {
    url: /\/material-center\/api\/block\/delete$/,
    response(config) {
      const url = config.url
      const id = url.substr(url.lastIndexOf('/') + 1)
      const block = state.blocks.splice(
        state.blocks.findIndex((item) => String(item.id) === id),
        1
      )

      return new Promise((resolve) => {
        resolve([200, { data: block }])
      })
    }
  },
  {
    url: /\/material-center\/api\/block\/create$/,
    response(config) {
      const data = JSON.parse(config.data)

      data.createdBy = {
        id: 13,
        username: 'developer',
        resetPasswordToken: 'xxx'
      }

      state.blocks.unshift(data)

      return new Promise((resolve) => {
        resolve([200, { data }])
      })
    }
  },
  {
    url: /\/material-center\/api\/block\/update$/,
    response(config) {
      const data = JSON.parse(config.data)

      state.blocks.splice(
        state.blocks.findIndex((item) => item.id === data.id),
        1,
        data
      )

      return new Promise((resolve) => {
        resolve([200, { data }])
      })
    }
  },
  {
    url: /\/material-center\/api\/block\/count/,
    proxy: `${import.meta.env.BASE_URL}mock/material/block.json`,
    handleData({ data }, config) {
      if (!state.blocks?.length) {
        state.blocks.push(...data)
      }

      return { data: state.blocks.length }
    }
  },
  {
    url: /\/material-center\/api\/block/,
    proxy: `${import.meta.env.BASE_URL}mock/material/block.json`,
    handleData({ data }, config) {
      let result = null
      const { _limit, _start, createdBy, framework_in, _sort: sort } = config.params || {}
      const nameContains = config?.params?.['_where[_or][0][name_cn_contains]']

      if (!state.blocks?.length) {
        state.blocks.push(...data)
      }

      result = createdBy ? state.blocks.filter((block) => block.createdBy?.id === createdBy) : state.blocks

      if (framework_in && framework_in.length) {
        result = result.filter((block) => framework_in.includes(block.framework))
      }

      if (nameContains) {
        result = result.filter((block) => `${block.content?.fileName} ${block.description}`.includes(nameContains))
      }

      if (sort) {
        result = sortByTime(result, sort)
      }

      result = _limit ? result.slice(_start, _start + _limit) : result

      return { data: result }
    }
  }
]
