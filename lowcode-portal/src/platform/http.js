import { useHttp } from 'lowcode-design-http'

const http = useHttp()

// 获取设计器列表
export const fetchPlatform = (params) => http.get('/platform-center/api/platforms', { params })
export const fetchPlatformCount = (params) => http.get('/platform-center/api/platform/count', { params })
// 根据设计器id获取设计器的历史版本
export const fetchVersion = (id) => http.get(`/platform-center/api/platform/histories?platform=${id}`)
// 根据设计器id删除设计器
export const requestDeletePlatform = (id) => http.get(`/platform-center/api/platform/delete/${id}`)
// 创建设计器
export const requestCreatePlatform = (params) => http.post('/platform-center/api/platform/create', params)
// 修改设计器
export const requestUpdatePlatform = (params) => http.post(`/platform-center/api/platform/update/${params.id}`, params)
// 设计器查询
export const fetchPlatformById = (id) => http.get(`/platform-center/api/platform?id=${id}`)
// 查询对比设计器hash是否变化
export const fetchPlatformHash = (id) => http.get(`/platform-center/api/platform/hash/compare/${id}`)
// 查询设计器构建进度
export const fetchPlatformStatus = (id) => http.get(`/platform-center/api/platform/task?uniqueId=${id}&taskTypeId=3`)
