import { format } from '@opentiny/vue-renderless/common/date'
import { user } from '../controller'
import application from './mockModules/application'
import auth from './mockModules/auth'
import block from './mockModules/block'
import platform from './mockModules/platform'
import ecology from './mockModules/ecology'
import editor from './mockModules/editor'
import material from './mockModules/material'
import course from './mockModules/course'
import component from './mockModules/component'
import componentLibrary from './mockModules/componentLibrary'

let platformList = null

let materialList = null

let ecologyList = null

let applicationList = null

let tenants = null

let applyTenantList = []

const taskStatus = {}
const vscodeStatus = {}
const TASK_STATUS = {
  INIT: 0,
  RUNNING: 1,
  STOPPED: 2,
  FINISHED: 3,
  INITERROR: 4
}

const proxyApi = [
  ...auth,
  ...application,
  ...block,
  ...platform,
  ...ecology,
  ...editor,
  ...material,
  ...component,
  ...componentLibrary,
  ...course,
  {
    url: /\/platform-center\/api\/platform\/update/,
    response(config) {
      const data = JSON.parse(config.data)
      const { id, dsl, material_history, plugins, theme, toolbar, app_extend } = data
      const oldPlatform = platformList.find((item) => item.id === id)
      const platform = { ...oldPlatform, ...data }

      if (plugins) {
        platform.plugins = plugins.map((plugin) => ecologyList?.find((item) => item.id === plugin))
      }

      if (dsl) {
        platform.dsl = [ecologyList?.find((item) => item.id === dsl)]
      }

      if (toolbar) {
        platform.toolbar = toolbar.map((userItem) => ecologyList?.find((item) => item.id === userItem))
      }

      if (material_history) {
        platform.material_history = materialList?.find((item) => item.latest === material_history)
      }

      if (theme) {
        platform.theme = ecologyList?.find((item) => item.id === theme)
      }

      if (app_extend) {
        platform.app_extend = app_extend.map((item) => ecologyList?.find((eco) => eco.id === item))
      }

      platformList.splice(
        platformList.findIndex((item) => item.id === id),
        1,
        platform
      )

      return new Promise((resolve) => {
        resolve([200, { data: platform }])
      })
    }
  },
  {
    url: /\/vscode\/api\/vscode\/build/,
    response(config) {
      const url = config.url
      const id = url.substr(url.lastIndexOf('/') + 1)
      const task = vscodeStatus[id] || {}

      vscodeStatus[id] = task

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
            platformList.some((item) => {
              if (String(item.id) === id) {
                item.vscode_url = 'https://tiny-editor.obs.cn-north-5.myhuaweicloud.com/vscode'

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
    url: /\/vscode\/api\/vscode\/task/,
    response(config) {
      const url = config.url
      const query = url.substr(url.indexOf('?'))
      const params = new URLSearchParams(query)
      const id = params.get('uniqueId')

      let task = vscodeStatus[id]

      if (!task) {
        task = {
          data: {
            data: null
          }
        }
      }

      vscodeStatus[id] = task

      return [200, vscodeStatus[id].data]
    }
  },
  {
    url: /\/platform-center\/api\/ecology\/extension\/delete/,
    response(config) {
      const url = config.url
      const query = url.substr(url.indexOf('?'))
      const params = new URLSearchParams(query)
      const id = params.get('id')

      const ecology = ecologyList.splice(
        ecologyList.findIndex((item) => String(item.id) === id),
        1
      )

      return new Promise((resolve) => {
        resolve([200, { data: ecology }])
      })
    }
  },
  {
    url: /\/platform-center\/api\/ecology\/extension\/update/,
    response(config) {
      const data = JSON.parse(config.data)
      const { id, name, description, version, registry, screenshot, isOfficial, isDefault, public_scope_tenants } = data
      const oldACategory = ecologyList.find((item) => item.id === id)

      const ecology = {
        id,
        name,
        version,
        registry,
        description,
        updated_at: format(new Date()),
        screenshot,
        isOfficial,
        isDefault,
        category: oldACategory.category,
        public: data.public,
        public_scope_tenants: public_scope_tenants.map((item) => ({ id: item }))
      }

      ecologyList.splice(
        ecologyList.findIndex((item) => item.id === id),
        1,
        ecology
      )

      return new Promise((resolve) => {
        resolve([200, { data: ecology }])
      })
    }
  },
  {
    url: /\/platform-center\/api\/ecology\/extension\/create/,
    response(config) {
      const data = JSON.parse(config.data)
      const {
        name,
        description,
        version,
        registry,
        category,
        screenshot,
        isOfficial,
        isDefault,
        public_scope_tenants
      } = data

      const id = ecologyList?.length + 1
      const ecology = {
        id,
        name,
        version,
        registry,
        description,
        updated_at: format(new Date()),
        category,
        screenshot,
        isOfficial,
        isDefault,
        public: data.public,
        public_scope_tenants: public_scope_tenants.map((item) => ({ id: item }))
      }

      ecologyList?.unshift(ecology)

      return new Promise((resolve) => {
        resolve([200, { data: ecology }])
      })
    }
  },
  {
    url: /\/platform-center\/api\/ecology\/extension\/list/,
    proxy: `${import.meta.env.BASE_URL}mock/platform/ecology.json`,
    handleData({ data }, config) {
      const { _start, _limit, category } = config.params

      ecologyList = ecologyList ? ecologyList : data
      let result = ecologyList.filter((item) => item.category === category)

      result = _limit ? result.slice(_start, _start + _limit) : result

      return { data: result }
    }
  },
  {
    url: /\/platform-center\/api\/ecology\/extension\/count/,
    proxy: `${import.meta.env.BASE_URL}mock/platform/ecology.json`,
    handleData({ data }, config) {
      const { category } = config.params

      ecologyList = ecologyList ? ecologyList : data
      const result = ecologyList.filter((item) => item.category === category)

      return { data: result.length }
    }
  },
  {
    url: /\/material\/v2\/build/,
    response(config) {
      const url = config.url
      const id = url.substr(url.lastIndexOf('/') + 1)
      const task = taskStatus[id] || {}

      taskStatus[id] = task

      task.data = {
        data: {
          taskStatus: TASK_STATUS.INIT
        }
      }

      return new Promise((resolve) => {
        resolve([200, task.data])

        task.data.data.taskStatus = TASK_STATUS.RUNNING

        if (task.timeoutID) {
          clearTimeout(task.timeoutID)
        }

        task.timeoutID = setTimeout(() => {
          if (Number(id) === 3) {
            task.data.data.taskStatus = TASK_STATUS.STOPPED
          } else {
            task.data.data.taskStatus = TASK_STATUS.FINISHED

            // 构建成功后，启动平台服务，并往数据库里写入 url 信息
            materialList.some((item) => {
              if (item.id === id) {
                item.assets_url = {
                  material: `/materials/bundle-${item.framework}.json`
                }

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
    url: /\/tasks/,
    response(config) {
      const url = config.url
      const query = url.substr(url.indexOf('?'))
      const params = new URLSearchParams(query)
      const id = params.get('uniqueIds')

      let task = taskStatus[id]

      if (!task) {
        task = {
          data: {
            data: null
          }
        }
      }

      taskStatus[id] = task

      return [200, taskStatus[id].data]
    }
  },
  {
    url: /\/platform-center\/api\/user\/me/,
    proxy: `${import.meta.env.BASE_URL}mock/permission/currentUser.json`,
    handleData(data) {
      return { data }
    }
  },
  {
    url: /\/platform-center\/api\/org\/list/,
    proxy: `${import.meta.env.BASE_URL}mock/permission/tenants.json`,
    handleData({ data }, config) {
      if (tenants === null) {
        tenants = []
        tenants.push(...data)
      }

      return { data: tenants }
    }
  },
  {
    url: /\/platform-center\/api\/org\/create/,
    response(config) {
      const data = JSON.parse(config.data)
      const { tenant_id } = data
      const id = tenants?.length + 1

      const tenant = {
        id,
        tenant_id,
        created_at: format(new Date()),
        updated_at: format(new Date())
      }

      tenants?.push(tenant)

      return new Promise((resolve) => {
        resolve([200, { data: tenant }])
      })
    }
  },
  {
    url: /\/platform-center\/api\/org\/delete/,
    response(config) {
      const url = config.url
      const query = url.substr(url.indexOf('?'))
      const params = new URLSearchParams(query)
      const id = params.get('id')
      const tenant = tenants.splice(
        tenants.findIndex((item) => String(item.id) === id),
        1
      )

      return new Promise((resolve) => {
        resolve([200, { data: tenant }])
      })
    }
  },
  {
    url: /\/platform-center\/api\/org\/update/,
    response(con) {
      const data = JSON.parse(con.data)
      const { id, tenant_id } = data

      const tenant = {
        id,
        tenant_id,
        updated_at: format(new Date()),
        created_at: format(new Date())
      }

      tenants.splice(
        tenants.findIndex((item) => String(item.id) === id),
        1,
        tenant
      )

      return new Promise((resolve) => {
        resolve([200, { data: tenant }])
      })
    }
  },
  {
    url: /\/app-center\/api\/template\/all/,
    proxy: `${import.meta.env.BASE_URL}mock/application/application.json`,
    handleData({ data }, config) {
      if (applicationList === null) {
        applicationList = []
        applicationList.push(
          ...data.map((item, idx) => ({
            ...item,
            image_url: `${import.meta.env.BASE_URL}img/application/application${(idx % 4) + 1}.png`
          }))
        )
      }
      const result = applicationList.filter((item) => item.template_type)

      return {
        data: {
          list: result,
          total: result.length
        }
      }
    }
  },
  {
    url: /\/app-center\/api\/template\/set/,
    response(config) {
      const url = config.url
      const id = url.substr(url.lastIndexOf('/') + 1)
      const data = JSON.parse(config.data)
      const template_type = data.template_type
      const app = applicationList.find((item) => String(item.id) === id) || {}

      app.template_type = template_type

      applicationList.splice(
        applicationList.findIndex((item) => String(item.id) === id),
        1,
        app
      )

      return new Promise((resolve) => {
        resolve([200, { data: app }])
      })
    }
  },
  {
    url: /\/platform-center\/api\/apply\/list/,
    proxy: `${import.meta.env.BASE_URL}mock/permission/applyTenant.json`,
    handleData({ data }, config) {
      const action = config.params.action

      applyTenantList = applyTenantList ? applyTenantList : data
      const result = applyTenantList.filter((item) => item.action === action)

      return { data: result }
    }
  },
  {
    url: /\/platform-center\/api\/apply\/create/,
    response(config) {
      const data = JSON.parse(config.data)
      const { action, status, tenant_id, name_cn, name_en, project_desc } = data
      const { username, resetPasswordToken } = user.current

      const applyData = {
        id: applyTenantList.length + 1,
        username,
        account: resetPasswordToken,
        created_at: format(new Date()),
        updated_at: format(new Date()),
        tenant_id,
        name_cn,
        name_en,
        action,
        status,
        project_desc
      }

      applyTenantList?.unshift(applyData)

      return new Promise((resolve) => {
        resolve([200, { data: applyData }])
      })
    }
  },
  {
    url: /\/platform-center\/api\/apply\/update/,
    response(config) {
      const url = config.url
      const id = url.substr(url.lastIndexOf('/') + 1)
      const data = JSON.parse(config.data)
      const { action, status } = data

      const applyData = applyTenantList.find((item) => String(item.id) === id) || {}

      applyData.action = action
      applyData.status = status

      applyTenantList.splice(
        applyTenantList.findIndex((item) => String(item.id) === id),
        1,
        applyData
      )

      return new Promise((resolve) => {
        resolve([200, { data: applyData }])
      })
    }
  },
  {
    url: '*',
    proxy: '*'
  }
]

export default proxyApi
