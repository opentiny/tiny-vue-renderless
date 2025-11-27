import { axios } from '@huawei/tinybuilder-common'
import { createApp } from 'vue'
import Login from './Login.vue'
import config from './config'
import mockData from './mock'
import { LOCAL_STORAGE, openLoading } from '../controller/utils'

const procession = {
  promiseLogin: null,
  mePromise: {}
}

const loginDom = document.createElement('div')

document.body.appendChild(loginDom)
const loginVM = createApp(Login).mount(loginDom)

window.lowcode = {
  platformCenter: {
    Session: {
      rebuiltCallback: function () {
        loginVM.closeLogin()

        procession.mePromise.resolve('login ok')
        procession.promiseLogin = null
        procession.mePromise = {}
      }
    }
  }
}

let loadingInstance = null

const preResponse = (res) => {
  loadingInstance?.close()

  return res.data.error ? Promise.reject(res.data.error) : res.data.data
}
const errorResponse = (http, error) => {
  // 用户信息失效时，弹窗提示登录
  const { response } = error

  if (response?.status === 401 && response?.headers['x-login-url']) {
    // 页面切换的时候会有多个接口同时请求，但是只会恢复最后一个请求，就会导致页面在 loading 状态，需要直接 reload 刷新页面
    if (error?.config?.url === '/platform-center/api/user/me') {
      return window.location.reload()
    }

    return new Promise((resolve, reject) => {
      if (!procession.promiseLogin) {
        procession.promiseLogin = loginVM.openLogin(procession, `${import.meta.env.VITE_APP_ORIGIN}/api/rebuildSession`)
        procession.promiseLogin.then((res) => {
          http.request(response.config).then(resolve, reject)
        })
      }
    })
  }
  loadingInstance?.close()

  return response?.data.error ? Promise.reject(response.data.error) : Promise.reject(error.message)
}

export const createHttp = (options) => {
  const http = axios(config)
  // 如果未指定是否启用 mock，则本地开发时默认启用，模拟数据在 public/mock 目录下
  const { enableMock = import.meta.env.DEV } = options

  enableMock && http.mock(mockData)

  // 响应拦截器
  http.interceptors.response.use(preResponse, (error) => errorResponse(http, error))

  // 请求拦截器
  http.interceptors.request.use((config) => {
    try {
      const tenant = JSON.parse(localStorage.getItem(LOCAL_STORAGE.tenant))

      config.headers['x-lowcode-org'] = tenant.id
    } catch (error) {
      localStorage.setItem(LOCAL_STORAGE.tenant, null)
    }

    loadingInstance = config.loading ? openLoading() : null

    return config
  })

  return http
}

export const useHttp = (isMock) => createHttp({ enableMock: isMock || process.env.API_MOCK === 'mock' })
