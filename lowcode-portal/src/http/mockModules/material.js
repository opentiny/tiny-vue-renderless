import { format } from '@opentiny/vue-renderless/common/date'
import { state } from '../state'
import { updateMaterial, sortByTime, search } from '../utils'

export default [
  {
    url: '/material-center/api/material/create',
    response: async (config) => {
      const data = JSON.parse(config.data)
      const {
        name,
        name_cn,
        description,
        image_url,
        isOfficial,
        isDefault,
        public_scope_tenants,
        version,
        framework,
        business_categories
      } = data

      if (!state.materialList) {
        const getMaterial = async () => {
          const response = await fetch(`${import.meta.env.BASE_URL}mock/platform/material.json`)

          return response.json()
        }

        state.materialList = await getMaterial()
        state.materialList = state.materialList?.data || []
      }

      if (state.materialList.some((material) => material.name === name && version && material.version === version)) {
        return Promise.reject(new Error('物料资产包名称与版本不能同时重复'))
      }

      if (!state.business_categories.length) {
        const getBusinessList = async () => {
          const response = await fetch(`${import.meta.env.BASE_URL}mock/editor/business-list.json`)

          return response.json()
        }

        state.business_categories = (await getBusinessList()?.data) || []
      }

      const id = state.materialList?.length + 10
      const curTime = format(new Date())
      const materialListForm = {
        id,
        name,
        name_cn,
        version,
        latest: id + 5,
        user_blocks: [],
        blocks: [],
        description,
        user_components: [],
        image_url,
        isOfficial,
        isDefault,
        public: data.public,
        public_scope_tenants: public_scope_tenants?.map((item) => ({ id: item })),
        material_category_relations: state.business_categories
          .filter((item) => business_categories?.includes(item.id))
          .map((item) => ({ ...item, category: item.id })),
        framework,
        created_at: curTime,
        update_at: curTime
      }

      state.materialList.unshift(materialListForm)

      return new Promise((resolve) => {
        resolve([200, { data: materialListForm }])
      })
    }
  },
  {
    url: /\/material-center\/api\/material\/delete\/\d+$/,
    response(config) {
      const url = config.url
      const id = url.substr(url.lastIndexOf('/') + 1)
      const material = state.materialList.splice(
        state.materialList.findIndex((item) => String(item.id) === id),
        1
      )

      return new Promise((resolve) => {
        resolve([200, { data: material }])
      })
    }
  },
  {
    url: '/material-center/api/material/count',
    proxy: `${import.meta.env.BASE_URL}mock/platform/material.json`,
    handleData({ data }, config) {
      if (!state.materialList.length) {
        state.materialList = [...data]
      }

      return { data: state.materialList.length }
    }
  },
  {
    url: '/material-center/api/material/list2',
    proxy: `${import.meta.env.BASE_URL}mock/platform/material.json`,
    handleData({ data }) {
      if (!state.materialList.length) {
        state.materialList = data
      }

      return { data: { total: state.materialList.length, list: state.materialList || [] } }
    }
  },
  {
    url: /\/material-center\/api\/material\/list/,
    proxy: `${import.meta.env.BASE_URL}mock/platform/material.json`,
    handleData({ data }, config) {
      const { _limit, _start, _sort, framework_in } = config.params
      const nameContains = config.params['_where[_or][0][name_contains]']

      if (!state.materialList.length) {
        state.materialList = []
        state.materialList.push(...data)
      }

      let result = _limit === -1 ? state.materialList : state.materialList.slice(_start, _start + _limit)

      const getMaterialVersion = async () => {
        const response = await fetch(`${import.meta.env.BASE_URL}mock/material/version.json`)

        return response.json()
      }

      result = search(result, ['name', 'description'], nameContains)

      if (framework_in?.length) {
        result = result.filter((item) => framework_in.includes(item.framework))
      }

      if (_sort) {
        result = sortByTime(result, _sort)
      }

      getMaterialVersion().then(({ data }) => {
        state.materialVersionMap = data
      })

      return { data: result }
    }
  },
  {
    url: /\/material-center\/api\/material\/histories/,
    proxy: `${import.meta.env.BASE_URL}mock/material/version.json`,
    handleData({ data }, config) {
      const url = config.url
      const query = url.substr(url.indexOf('?'))
      const params = new URLSearchParams(query)
      const material = params.get('material')

      if (!data[material]) {
        return { data: data[Object.keys(data)[0]] }
      }

      return { data: data[material] || [] }
    }
  },
  {
    url: /\/material-center\/api\/material\/update\/\d+$/,
    async response(config) {
      const data = JSON.parse(config.data)
      const {
        id,
        name,
        description,
        user_blocks,
        user_components,
        componentLib,
        image_url,
        isOfficial,
        isDefault,
        public_scope_tenants,
        version
      } = data

      const oldMaterial = state.materialList.find((item) => item.id === id)
      const { userBlocks, publicScopeTenants } = updateMaterial({
        componentLib,
        user_components,
        user_blocks,
        public_scope_tenants
      })

      const versions = oldMaterial?.versions || []
      const curVersion = version || oldMaterial?.version
      const getComponentLib = async () => {
        const response = await fetch(`${import.meta.env.BASE_URL}mock/material/componentLibrary.json`)

        return response.json()
      }
      const resInst = await getComponentLib()

      const findComponentResult = resInst.data.filter((item) => data.componentLibrary.find((id) => item.id === id))

      const curTime = format(new Date())

      versions.push({
        id: state.materialList?.length + 14,
        version: curVersion,
        updated_at: curTime,
        created_at: curTime,
        description
      })

      const material = {
        id,
        name: name || oldMaterial.name,
        version: curVersion,
        versions,
        description: description || oldMaterial.description,
        isOfficial: isOfficial === undefined ? oldMaterial.isOfficial : isOfficial,
        isDefault: isDefault === undefined ? oldMaterial.isDefault : isDefault,
        image_url: image_url || oldMaterial.image_url,
        public: data.public === undefined ? oldMaterial.public : data.public,
        public_scope_tenants: public_scope_tenants?.length ? publicScopeTenants : oldMaterial.public_scope_tenants,
        user_blocks: user_blocks ? userBlocks : oldMaterial.user_blocks,
        user_components: user_components || oldMaterial.user_components || [],
        componentLib: findComponentResult || oldMaterial.componentLib,
        component_library: findComponentResult || oldMaterial.componentLib,
        updated_at: curTime,
        created_at: oldMaterial.created_at || curTime,
        latest: oldMaterial.latest,
        blocks: user_blocks || oldMaterial.user_blocks || [],
        framework: oldMaterial.framework,
        material_category_relations: oldMaterial.material_category_relations
      }

      state.materialList.splice(
        state.materialList.findIndex((item) => item.id === id),
        1,
        material
      )

      const versionItem = {
        id: 319,
        version,
        created_at: curTime,
        updated_at: curTime,
        description
      }

      let versionList = []

      if (!state.materialVersionMap[id]) {
        state.materialVersionMap[id] = []
        versionItem.id = 0
      } else {
        versionList = state.materialVersionMap[id]
        versionItem.id = versionList[versionList.length - 1].id + 1
      }

      const idx = versionList.findIndex((item) => item.version === version)

      if (idx > -1) {
        state.materialVersionMap[id].splice(idx, 1, versionItem)
      } else {
        state.materialVersionMap[id].push(versionItem)
      }

      return new Promise((resolve) => {
        resolve([200, { data: material }])
      })
    }
  },
  {
    url: /\/material-center\/api\/material\?id=\d+$/,
    async response(config) {
      const url = config.url
      const query = url.substr(url.indexOf('?'))
      const params = new URLSearchParams(query)
      const id = params.get('id')

      if (!state.materialList?.length) {
        const getMaterial = async () => {
          const response = await fetch(`${import.meta.env.BASE_URL}mock/platform/material.json`)

          return response.json()
        }

        state.materialList = await getMaterial()
        state.materialList = state.materialList.data || []
      }

      const material = state.materialList?.find((item) => String(item.id) === id)

      return new Promise((resolve) => {
        const response = material
          ? { data: material }
          : {
              data: null,
              locale: 'zh-cn',
              error: {
                code: 'CM001',
                message: '物料包不存在'
              },
              err_msg: 'An internal server error occurred'
            }

        resolve([200, response])
      })
    }
  },
  {
    url: /\/material-center\/api\/material\/build\/\d+/,
    response(config) {
      const url = config.url
      const data = JSON.parse(config.data)
      const id = url.substr(url.lastIndexOf('/') + 1)
      const response = {
        data: {
          id: 31286,
          teamId: 0,
          taskTypeId: 1,
          uniqueId: id,
          taskName: 'build material dsg',
          taskStatus: 0,
          taskResult: null,
          progress: null,
          created_at: '2023-08-07T09:35:35.000Z',
          updated_at: '2023-08-07T09:35:35.000Z',
          ratio: null,
          progress_percent: 0,
          indicator: null
        },
        locale: 'zh-cn'
      }
      // 物料构建成功后
      const material = state.materialList.find((item) => item.id === Number(id))

      material.blocks = state.blocks.filter((block) => data.blockVersions.some((item) => item.block_id === block.id))

      if (material) {
        material.assets_url = {
          material: [
            'https://opentiny-assets.obs.cn-north-4.myhuaweicloud.com/materials/asmateril/2022-7-7_15-14-48_1657178088517/dist/bundle.json'
          ]
        }
      }

      return new Promise((resolve) => {
        resolve([200, response])
      })
    }
  },
  {
    url: /\/material-center\/api\/tasks\/status\?uniqueIds=\d+$/,
    response(config) {
      const url = config.url
      const id = url.substr(url.lastIndexOf('/') + 1)
      const data = {
        id: 31286,
        teamId: 0,
        taskTypeId: 1,
        uniqueId: id,
        taskName: 'build material dsg',
        taskStatus: 3,
        taskResult: '{"result":"success"}',
        progress: 'Build task completed',
        created_at: '2023-08-07T09:35:35.000Z',
        updated_at: '2023-08-07T09:36:08.000Z',
        ratio: null,
        progress_percent: 100,
        indicator: null
      }

      return new Promise((resolve) => {
        resolve([200, { data }])
      })
    }
  },
  {
    url: /\/material-center\/api\/material/,
    response(config) {
      const url = config.url
      const query = url.substr(url.indexOf('?'))
      const params = new URLSearchParams(query)
      const id = params.get('id')
      const material = state.materialList.find((item) => String(item.id) === id)

      return new Promise((resolve) => {
        resolve([200, { data: material }])
      })
    }
  }
]
