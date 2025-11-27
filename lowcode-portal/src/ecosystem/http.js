import { useHttp } from 'lowcode-design-http'
import qs from 'qs'

const paramsSerializer = (params) => {
  return qs.stringify(params, { arrayFormat: 'repeat' })
}

const http = useHttp()

// 获取组件列表
export const fetchComponents = (params) =>
  http.get('/material-center/api/component/list', {
    params: {
      _sort: 'updated_at:DESC',
      library_null: true,
      ...params
    },
    paramsSerializer
  })
export const fetchComponentsCount = (params) =>
  http.get('/material-center/api/component/count', { params, paramsSerializer })

// 获取组件库列表
export const fetchComponentLib = (params) =>
  http.get('/material-center/api/componentLibrary/find', {
    params: {
      _sort: 'updated_at:DESC',
      ...params
    },
    paramsSerializer
  })

// 获取组件库总数
export const fetchComponentLibCount = (params) =>
  http.get('/material-center/api/componentLibrary/count', { params, paramsSerializer })

// 物料中心组件库录入
export const requestCreateComponentLib = (params) => http.post('/material-center/api/componentLibrary/create', params)

// 物料中心组件库更新
export const requestUpdateComponentLib = ({ id, ...params }) =>
  http.post(`/material-center/api/componentLibrary/update/${id}`, params)

// 根据id删除组件库
export const requestDeleteComponentLib = (id) => http.delete(`/material-center/api/componentLibrary/delete/${id}`)

// 根据组件库id查询组件
export const requestComponentList = (id) => http.get(`/material-center/api/component/list?library=${id}`)

// 根据id查询组件库详情
export const requestComponentLibDetail = (id) => http.get(`/material-center/api/componentLibrary/list?id=${id}`)

// 获取区块列表
export const fetchBlocks = (params) =>
  http.get('/material-center/api/block', {
    params: {
      _sort: 'updated_at:DESC',
      ...params
    },
    paramsSerializer
  })
export const fetchBlocksCount = (params) => http.get('/material-center/api/block/count', { params, paramsSerializer })
// 物料中心组件录入
export const requestCreateComponents = (params) => http.post('/material-center/api/component/create', params)
// 物料中心组件更新
export const requestUpdateComponents = (params) => http.post('/material-center/api/component/update', params)
// 物料中心区块录入
export const requestCreateBlock = (params) => http.post('/material-center/api/block/create', params)
// 物料中心区块更新
export const requestUpdateBlock = (params) => http.post(`/material-center/api/block/update/${params.id}`, params)
// 根据id删除组件
export const requestDeleteComponent = (id) => http.get(`/material-center/api/component/delete?id=${id}`)
// 根据id删除区块
export const requestDeleteBlock = (id) => http.get(`/material-center/api/block/delete/${id}`)
// 获取区块所有标签
export const fetchTags = () => http.get('/material-center/api/block/tags')
// 获取区块所有作者
export const fetchUsers = () => http.get('/material-center/api/block/users')
// 获取区块所有tag
export const fetchTenants = () => http.get('/material-center/api/block/tenants')
// 获取生态，通过category字段区分theme/dsl/plugin/toolbar
export const fetchEcology = (params) =>
  http.get('/platform-center/api/ecology/extension/base/version', { params: { ...params, _sort: 'updated_at:DESC' } })
export const fetchEcologyCount = (params) =>
  http.get('/platform-center/api/ecology/extension/base/version/count', { params })
// 根据id删除某个生态
export const requestDeleteEcology = (id) =>
  http.delete(`/platform-center/api/ecology/extension/base/version/delete/${id}`)
// 新增生态
export const requestCreateEcology = (params) =>
  http.post('/platform-center/v1/api/ecology/extension/base/version/create', params)
// 更新生态
export const requestUpdateEcology = (params) =>
  http.put('/platform-center/v1/api/ecology/extension/base/version/update', params)
// 解锁/加锁操作
export const fetchLock = (params) => http.get('/app-center/api/apps/canvas/lock', { params })
// 根据id获取区块
export const fetchBlocksById = (id) => http.get(`/material-center/api/block?id=${id}`)
// 根据ids获取区块
export const fetchBlocksByIds = (ids) => http.get(`/material-center/api/block?id_in=${ids.join(',')}`)
// 根据id查询区块
export const fetchBlockDetail = (id) => http.get(`/material-center/api/block/detail/${id}`)

// 获取物料资产包列表
export const fetchMaterial = (params = { _limit: -1, _start: 0, _sort: 'updated_at:DESC' }) =>
  http.get('/material-center/api/material/list', { params })
// 物料资产包添加
export const requestCreateMaterial = (params) => http.post('/material-center/api/material/create', params)
// 根据物料id删除物料资产包
export const requestDeleteMaterial = (id) => http.get(`/material-center/api/material/delete/${id}`)
// 更新物料资产包
export const requestUpdateMaterial = (params) => http.post(`/material-center/api/material/update/${params.id}`, params)
// 物料资产包查询
export const fetchMaterialById = (id) => http.get(`/material-center/api/material?id=${id}`)
// 获取物料资产包历史版本
export const fetchVersion = (id) => http.get(`/material-center/api/material/histories?mode=tiny&material=${id}`)
export const getMaterialCount = (params) => http.get('/material-center/api/material/count', { params })
// 获取物料包列表
export const fetchMaterialList = () => http.get('/material-center/api/material/list2')
// 获取业务分类列表
export const fetchBusinessCategory = () => http.get('/platform-center/api/editor/business/category/list')
