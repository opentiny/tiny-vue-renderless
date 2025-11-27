import { useHttp } from 'lowcode-design-http'

// 使用mock数据
const http = useHttp(true)

// 创建物料资产包
export const requestCreateMaterial = (params) => http.post('/material-center/api/material/create', params)
// 获取组件列表
export const fetchComponents = () => http.get('/material-center/api/component/list')
// 获取组件库列表
export const fetchComponentLib = () => http.get('/material-center/api/componentLibrary/find')
// 获取区块列表
export const fetchBlocks = () => http.get('/material-center/api/block')
// 用户申请、调真实服务
export const requestApply = (params) => useHttp().post('/platform-center/api/apply/create', params)
