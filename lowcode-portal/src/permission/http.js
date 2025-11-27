import { useHttp } from 'lowcode-design-http'

const http = useHttp()

// 获取当前用户信息
export const fetchCurrentUser = () => http.get('/platform-center/api/user/me')
// 获取组织列表
export const fetchTenant = (params) => http.get('/platform-center/api/org/list?_limit=-1', { params })
// 更新组织
export const requestUpdateTenant = (params) => http.post('/platform-center/api/org/update', params)
// 创建组织
export const requestCreateTenant = (params) => http.post('/platform-center/api/org/create', params)
// 删除组织
export const requestDeleteTenant = (id) => http.get(`/platform-center/api/org/delete?id=${id}`)
// 获取组织管理员列表
export const fetchTenantUser = (params) => http.get('/platform-center/api/auth/list', { params })
// 为用户增加组织管理员权限
export const requestCreateTenantUser = (params) => http.post('/platform-center/api/auth/create', params)
// 更新用户组织管理员权限
export const requestUpdateTenantUser = (params) => http.post(`/platform-center/api/auth/update?id=${params.id}`, params)
// 获取当前用户可分配权限的用户列表
export const fetchAllUser = (params = {}) => http.get('/platform-center/api/user/list?_limit=-1', { params })
// 删除用户的组织管理员权限
export const requestDeleteTenantUser = (id) => http.get(`/platform-center/api/auth/delete?id=${id}`)
// 查询所有角色列表
export const fetchRole = () => http.get('/platform-center/api/auth/role/list?_limit=-1')
// 查询申请列表
export const fetchApplicationList = (params) =>
  http.get('/platform-center/api/apply/list?_limit=-1', { params: { ...params, _sort: 'created_at:DESC' } })
// 更新申请审批状态
export const requestUpdataApply = (id, params) => http.post(`/platform-center/api/apply/update/${id}`, params)
// 获取超级管理员所能访问的应用列表
export const fetchAppList = (params) => http.get('app-center/api/apps/all', { params })
// 修改应用是否为 Demo 应用
export const requestApplicationMeta = (id, params) => http.post(`app-center/api/apps/update/${id}`, params)
// 获取应用模板列表
export const fetchAppTemplateList = (params) =>
  http.get('app-center/api/template/all?_limit=-1', { params: { ...params, _sort: 'updated_at:DESC' } })
// 更新应用模板
export const requestUpdataAppTemplate = (id, params) => http.post(`app-center/api/apps/update/${id}`, params)
// 把应用设置为模板
export const requestCreateAppTemplate = (id, params) => http.post(`app-center/api/template/set/${id}`, params)
// 获取超级管理员能够访问的设计器列表
export const fetchPlatformList = (params) => http.get('platform-center/api/platform/all', { params })
// 修改设计器是否为 默认 设计器
export const requestPlatformMeta = (id, params) => http.post(`platform-center/api/platform/update/${id}`, params)

// 删除章节
export const requestDeleteVideo = (courseId, params) =>
  http.post(`platform-center/api/course/${courseId}/video/delete`, params)
// 新增章节
export const requestAddVideo = (courseId, params) => http.post(`platform-center/api/course/${courseId}/video`, params)
// 修改章节
export const requestModifyVideo = (courseId, params) => http.put(`platform-center/api/course/${courseId}/video`, params)
// 新增课程
export const requestCreateCourse = (params) => http.post('platform-center/api/course', params)
// 删除课程
export const requestDeleteCourse = (courseId) => http.delete(`platform-center/api/course/${courseId}`)
// 更新课程
export const requestUpdateCourse = (courseId, params) => http.put(`platform-center/api/course/${courseId}`, params)
// 获取课程列表
export const requestCourseList = () => http.get('platform-center/api/courses')
// 获取个人AK/SK列表
export const requestAkskList = (params) => http.get('platform-center/api/ak/list?_limit=-1', { params })
// 创建AK/SK
export const requestCreateAksk = (params) => http.post('platform-center/api/ak/create', params)
// 更新AK状态
export const requestEditAksk = (id, params) => http.put(`/platform-center/api/ak/update/${id}`, params)
// 删除AK
export const requestDeleteAksk = (id) => http.delete(`/platform-center/api/ak/delete/${id}`)
