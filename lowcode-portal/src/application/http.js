import { useHttp } from '../http'

const http = useHttp()

// 获取应用列表
export const fetchApplication = (params = { _limit: 12, _start: 0 }) => http.get('/app-center/api/apps', { params })
export const fetchAllApplication = () => http.get('/app-center/api/apps?_limit=-1')
export const fetchApplicationCount = (params) => http.get('/app-center/api/apps/count', { params })
// 根据id获取应用的历史版本
export const fetchApplicationVersion = (id) => http.get(`/app-center/api/apps/histories?app=${id}`)
// 根据应用id删除应用
export const requestDeleteApplication = (id) => http.get(`/app-center/api/apps/delete/${id}`)
// 创建应用
export const requestCreateApplication = (params) => http.post('/app-center/api/apps/create', params)
// 更新应用
export const requestUpdateApplication = ({ id, params }) => http.post(`/app-center/api/apps/update/${id}`, params)
// 为用户新增权限
export const requestAddAuth = (params) =>
  http.post(`/platform-center/api/auth/create?current_auth=${params.current_auth}`, params)
// 更新用户权限
export const requestUpdateAuth = (params) =>
  http.post(`/platform-center/api/auth/update?current_auth=${params.current_auth}&id=${params.id}`, params)
// 删除用户权限
export const requestDeleteAuth = (params) => http.get('/platform-center/api/auth/delete', { params })
// 获取组织内权限列表
export const fetchMemberList = (params) => http.get('/platform-center/api/auth/list', { params })
// 获取角色列表
export const fetchAuthList = () => http.get('/platform-center/api/auth/role/list?_limit=-1')
// 从模板中创建应用
export const requestCreateAppFromTemplate = (params) => http.post('/app-center/api/template/creatapps', params)
// 获取用户列表
export const fetchAllUser = (params) => http.get('/platform-center/api/user/list?_limit=-1', { params })
// 获取应用发布包下载链接
export const fetchDownloadLink = (id) => http.get(`/app-center/api/apps/download/${id}`)
