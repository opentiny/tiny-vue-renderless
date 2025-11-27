import { format } from '@opentiny/vue-renderless/common/date'
import { state } from '../state'

export default [
  {
    url: /\/platform-center\/api\/user\/list/,
    proxy: `${import.meta.env.BASE_URL}mock/permission/user.json`,
    handleData({ data }) {
      if (state.userList === null) {
        state.userList = data
      }

      return { data: state.userList }
    }
  },
  {
    url: /\/platform-center\/api\/auth\/role\/list/,
    proxy: `${import.meta.env.BASE_URL}mock/permission/role.json`,
    handleData({ data }) {
      if (state.roleList === null) {
        state.roleList = data
      }

      return { data: state.roleList }
    }
  },
  {
    url: /\/platform-center\/api\/auth\/create$/,
    response(config) {
      const data = JSON.parse(config.data)
      const { role, user, expired_time, unit } = data
      const id = state.authList?.length + 1
      const newUser = state.userList.filter((item) => String(item.id) === user)
      const newRole = state.roleList.filter((item) => item.id === role)
      const auth = {
        id,
        expired_time,
        user: newUser[0],
        role: newRole[0],
        unit,
        created_at: format(new Date()),
        updated_at: format(new Date())
      }

      state.authList?.unshift(auth)

      return new Promise((resolve) => {
        resolve([200, { data: auth }])
      })
    }
  },
  {
    url: /\/platform-center\/api\/auth\/update$/,
    response(config) {
      const data = JSON.parse(config.data)
      const { id, user, expired_time } = data
      const newUser = state.userList.filter((item) => String(item.id) === String(user))
      const oldAuth = state.authList.find((item) => item.id === id)
      const auth = {
        id,
        expired_time,
        user: newUser[0],
        role: oldAuth.role,
        unit: oldAuth.unit,
        created_at: format(new Date()),
        updated_at: format(new Date())
      }

      state.authList.splice(
        state.authList.findIndex((item) => item.id === id),
        1,
        auth
      )

      return new Promise((resolve) => {
        resolve([200, { data: auth }])
      })
    }
  },
  {
    url: /\/platform-center\/api\/auth\/delete/,
    response(config) {
      const url = config.url
      const query = url.substr(url.indexOf('?'))
      const params = new URLSearchParams(query)
      const id = params.get('id') || config.params?.id
      const auth = state.authList.splice(
        state.authList.findIndex((item) => String(item.id) === String(id)),
        1
      )

      return new Promise((resolve) => {
        resolve([200, { data: auth }])
      })
    }
  },
  {
    url: /\/platform-center\/api\/auth\/list/,
    proxy: `${import.meta.env.BASE_URL}mock/permission/auth.json`,
    response({ data }) {
      return new Promise((resolve) => {
        resolve([200, { data }])
      })
    }
  }
]
