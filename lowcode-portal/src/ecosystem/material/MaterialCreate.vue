<template>
  <div class="mymaterial">
    <div class="mymaterial-topbar">
      <div class="mymaterial-create" @click="back">
        <icon-chevron-left class="mymaterial-create-icon"></icon-chevron-left>
        <span class="mymaterial-create-title">编辑物料资产包</span>
        <span class="mymaterial-create-line"></span>
        <span class="mymaterial-create-name">{{ state.content.name }}</span>
      </div>
      <div v-if="state.content.assets_url?.material[0]" class="mymaterial-address">
        物料包地址:<a class="structure-url" :href="state.content.assets_url?.material[0]" target="_blank">{{
          state.content.assets_url?.material[0]
        }}</a>
      </div>
      <tiny-alert
        v-show="state.showAlert"
        class="mymaterial-success"
        description="恭喜！物料资产包创建成功。"
      ></tiny-alert>
    </div>
    <div class="progress-content">
      <tiny-dialog-box v-model:visible="state.progressDialog" width="400" top="30%" :show-header="false">
        <template #footer>
          <tiny-progress :percentage="materialPercent[state.content.id]" :stroke-width="8" type="line"></tiny-progress>
          <span class="progress-content-text">正在构建，请稍后...</span>
        </template>
      </tiny-dialog-box>
    </div>
    <div class="mymaterial-content">
      <div class="mymaterial-content-main">
        <edit-page
          title="构建物料资产包"
          :timeLineData="state.timeLineData"
          :timeActive="state.timeActive"
          :allData="state[state.timeLineData[state.timeActive].type]"
          :selectData="state.content[state.timeLineData[state.timeActive].type]"
          :selectDataAll="state.content"
          :label="state.timeLineData[state.timeActive].label"
          :type="state.timeLineData[state.timeActive].type"
          @select-all="selectAll"
          @line-change="lineChange"
          @add="addToMaterial"
          @delete-item="deleteItem"
          @set-version="setVersion"
        ></edit-page>
      </div>
    </div>
    <div class="mymaterial-footer">
      <tiny-button type="primary" native-type="submit" :disabled="state.buttonLoading" @click="confirmToBuild">{{
        !state.content.assets_url?.material[0] ? '创建物料资产包' : '再次创建'
      }}</tiny-button>
    </div>
    <baseForm
      isEdit
      :boxVisibility="showBaseForm"
      :data="{ ...state.content }"
      @cancel="showBaseForm = false"
      @save="updateBaseInfo"
    ></baseForm>
  </div>
  <version-manage-dialog
    v-if="state.showVersionManage"
    :showVersionManage="state.showVersionManage"
    @cancel="state.showVersionManage = false"
    @save="updateAndBuildMaterial"
  ></version-manage-dialog>
</template>

<script lang="jsx">
import { reactive, onMounted, onUnmounted, ref } from 'vue'
import { Button, Progress, Alert, DialogBox } from '@opentiny/vue'
import { useRouter } from 'vue-router'
import { useModal } from 'lowcode-design-controller'
import {
  setBuildingMessage,
  setBuildErrorMessage,
  setBuildPercent,
  SESSION_STORAGE,
  openLoading,
  TIMELINE_TYPES
} from 'lowcode-design-controller/utils'
import { useHttp } from 'lowcode-design-http'
import { requestUpdateMaterial, fetchMaterialById, fetchComponentLib } from '../http'
import { fetchBlocks, fetchBlockDetail, fetchBlocksByIds } from '@/ecosystem/http'
import { BuildTask } from '@huawei/tinybuilder-common'
import EditPage from '@/common/components/EditPage.vue'
import VersionManageDialog from '@/common/components/VersionManageDialog.vue'
import { extend, copyArray } from '@opentiny/vue-renderless/common/object'
import baseForm from './MaterialCreateDialog.vue'

const disabledBtns = reactive({})
const buildMessage = reactive({})
const materialPercent = reactive({})
const { COMPONENT_LIB, BLOCKS } = TIMELINE_TYPES

export default {
  components: {
    EditPage,
    TinyButton: Button,
    TinyProgress: Progress,
    TinyAlert: Alert,
    TinyDialogBox: DialogBox,
    baseForm,
    VersionManageDialog
  },
  setup() {
    const router = useRouter()
    const createType = 'create'
    const http = useHttp()
    const { confirm, message } = useModal()
    const material = JSON.parse(sessionStorage.getItem(SESSION_STORAGE.material))
    const createMaterialType = sessionStorage.getItem(SESSION_STORAGE.createMaterialType)
    const statusDefault = 'isZero'
    const isInit = true
    const showBaseForm = ref(false)

    const state = reactive({
      content: {
        id: material?.id || '',
        [COMPONENT_LIB]: [],
        [BLOCKS]: [],
        public_scope_tenants: material?.public_scope_tenants
      },
      [COMPONENT_LIB]: [],
      [BLOCKS]: [],
      timeActive: 0,
      timeLineData: [
        {
          activeIdx: 0,
          name: '组件库',
          label: '组件库',
          imgUrl: `${import.meta.env.BASE_URL}img/edit/component.png`,
          thumbnailKey: 'thumbnail',
          defaultThumbnail: `${import.meta.env.BASE_URL}img/componentLib.png`,
          imgStyle: { width: '64px', height: '64px' },
          status: statusDefault,
          type: COMPONENT_LIB,
          uniqueKey: 'id',
          idKey: 'label',
          content: '组件是页面搭建最小的可复用单元，可通过拖拉拽组件，生成页面',
          stepIdx: '步骤1'
        },
        {
          activeIdx: 1,
          name: '区块',
          label: '区块',
          imgUrl: `${import.meta.env.BASE_URL}img/edit/block.png`,
          status: statusDefault,
          uniqueKey: 'label',
          idKey: 'current_history',
          type: BLOCKS,
          content: '区块可以包含一个或多个组件也可以包含其他区块',
          stepIdx: '步骤2'
        }
      ],
      loadingInstance: null,
      showVersionManage: false,
      blockVersionList: [],
      buttonLoading: false,
      showAlert: false,
      timer: null,
      progressDialog: false
    })

    const setSelected = (type) => {
      const allData = state[type]

      allData.forEach((item) => {
        const matchItem = state.content[type].find(({ id }) => id === (item.base || item.id))

        item.selected = Boolean(matchItem)

        if (!matchItem) {
          return
        }

        item.version = item.version || matchItem.version
        item.versions = item.versions || matchItem.versions
      })
    }

    const setVersion = (data) => {
      state.content[BLOCKS].forEach((item) => {
        if (item.id === data.block_id) {
          item.version = data.version
        }
      })
      state[BLOCKS].forEach((item) => {
        if (item.id === data.block_id) {
          item.version = data.version
        }
      })
    }

    const lineChange = (idx) => {
      state.timeActive = idx
    }

    const sortData = (data) => {
      if (!data || !data.length) return []

      data.sort((a, b) => a.tiny_reserved - b.tiny_reserved).sort((a, b) => b.isDefault - a.isDefault)

      return data
    }

    const updateMaterial = (params) => {
      const { id } = state.content

      delete params.versions

      return new Promise((resolve) => {
        requestUpdateMaterial({ id, ...params })
          .then(() => {
            resolve()
          })
          .catch((error) => {
            message({ message: `物料包更新失败: ${error.message || error}`, status: 'error' })
          })
      })
    }

    const back = () => {
      router.push({
        name: 'ecosystem'
      })
    }

    const addToMaterial = async (data) => {
      const { type, idKey } = state.timeLineData[state.timeActive]
      const componentId = data[idKey]

      if (!componentId && data.last_build_info && data.assets) {
        message({ message: '区块未发布', status: 'error' })

        return
      }

      const addData = extend(true, {}, data)

      if (type === BLOCKS && !addData.versions?.length) {
        const { histories } = await fetchBlockDetail(addData.id)

        addData.versions = histories
        addData.version = histories[0].version
      }

      if (state.content) {
        state.content[type]?.push(extend(true, {}, addData))
        setSelected(type)
      }
    }

    const deleteItem = (data) => {
      const type = state.timeLineData[state.timeActive].type

      const title = `移除${state.timeActive === 0 ? '组件' : '区块'}`
      const status = 'warning'
      const messageRender = {
        render: () => (
          <span>{`您确定要移除 ${data.content?.fileName || data.label || data.name.zh_CN || data.name} 吗?`}</span>
        )
      }

      const exec = () => {
        state.content[type] = state.content[type].filter((item) => item.id !== data.id)

        setSelected(type)
      }

      confirm({ title, status, message: messageRender, exec })
    }

    const getMaterial = async (isInit) => {
      const id = state.content?.id
      const loadingInstance = openLoading(document.getElementsByClassName('card-list')[0])

      await fetchMaterialById(id)
        .then((material) => {
          loadingInstance?.close()
          state.content = material
          state.content[COMPONENT_LIB] = material.component_library || []
          sessionStorage.setItem(SESSION_STORAGE.material, JSON.stringify(material))

          if (isInit) {
            setDefaultData()
          }
        })
        .catch((error) => {
          loadingInstance?.close()

          message({ message: `获取物料列表失败: ${error.message || error}`, status: 'error' })
        })
    }

    const getComponentLib = (resolve) => {
      const type = COMPONENT_LIB

      state.loadingInstance = openLoading(document.getElementsByClassName('edit-detail-list-content-cardlist')[0])

      fetchComponentLib()
        .then((data) => {
          state.loadingInstance?.close()

          if (!data || !data.length) {
            data = []
          }

          const framework = material?.framework === 'Html' ? ['Html'] : [material.framework, 'Html']

          state[type] = data.filter((item) => framework.includes(item?.framework))

          resolve()
        })
        .catch((error) => {
          state.loadingInstance?.close()

          message({ message: `获取组件库列表失败: ${error.message || error}`, status: 'error' })
        })
    }

    const setDefaultData = () => {
      const getFn = {
        [COMPONENT_LIB]: getComponentLib,
        [BLOCKS]: getBlocks
      }
      const promiseArray = state.timeLineData.map((item) => {
        return new Promise((resolve) => {
          getFn[item.type](resolve)
        })
      })
      const setDefaultComponentLibs = () => {
        return sortData(state[COMPONENT_LIB]).filter((item) => item.isDefault)
      }
      const setDefaultBlocks = () => {
        return sortData(state.blocks).filter((item) => item.isDefault)
      }
      const setDefaultFn = {
        [COMPONENT_LIB]: setDefaultComponentLibs,
        [BLOCKS]: setDefaultBlocks
      }

      Promise.allSettled(promiseArray).then(() => {
        state.timeLineData.forEach((item, idx) => {
          const { type } = state.timeLineData[idx]

          if (createMaterialType === createType || !state.content[type].length) {
            const data = setDefaultFn[type]()

            state.content[type] = copyArray(data)
          }

          setSelected(type)
        })

        sessionStorage.setItem(SESSION_STORAGE.createMaterialType, null)
      })
    }

    const hasSomeName = (type) => {
      const names = state.content[type].map((item) => (type === COMPONENT_LIB ? item.name : item.label))

      let temp = []

      names.forEach((item) => {
        if (names.indexOf(item) !== names.lastIndexOf(item) && temp.indexOf(item) === -1 && item) {
          temp.push(item)
        }
      })

      if (temp.length) {
        message({
          message: `添加了相同名称为“${temp.toString()}”的${type === COMPONENT_LIB ? '组件库' : '区块'}`,
          status: 'error'
        })

        return true
      } else {
        return false
      }
    }

    const buildMaterial = (data) => {
      const { id, name } = state.content

      if (hasSomeName(COMPONENT_LIB) || hasSomeName(BLOCKS)) {
        return
      }

      if (disabledBtns[id]) {
        return
      }

      const blockVersions = state.content.blocks.map((item) => {
        const obj = {
          block_id: item.id,
          version: item.version
        }

        return obj
      })

      const params = {
        ...data,
        blockVersions
      }

      const task = new BuildTask({
        buildTaskUrl: `/material-center/api/material/build/${id}`,
        queryStatusUrl: `/material-center/api/tasks/status?uniqueIds=${id}`,
        $http: http,
        params,
        method: 'POST',
        onInit: () => {
          disabledBtns[id] = true
          state.buttonLoading = true
          state.progressDialog = true
          setBuildPercent({ buildPercent: materialPercent, id, percent: 0 })
          setBuildingMessage({ buildMessage, id, name })
        },
        onInitError: (error) => {
          delete disabledBtns[id]
          state.buttonLoading = true
          state.progressDialog = true
          setBuildErrorMessage({ buildMessage, id, name, error })
        },
        onRunning: (data) => {
          disabledBtns[id] = true
          state.buttonLoading = true
          state.progressDialog = true
          setBuildPercent({ buildPercent: materialPercent, id, percent: data.progress_percent })
          setBuildingMessage({ buildMessage, id, name })
        },
        onFinished: async ({ progress_percent, isFirstQuery }) => {
          delete buildMessage[id]
          delete disabledBtns[id]
          state.buttonLoading = false
          if (isFirstQuery) {
            disabledBtns[id] = true
            state.buttonLoading = true
            state.progressDialog = true
            task.build()
          } else {
            state.progressDialog = false
            setBuildPercent({ buildPercent: materialPercent, id, percent: progress_percent })
            await getMaterial()
            state.showAlert = true
            state.timer = setTimeout(() => {
              state.showAlert = false
            }, 5000)
          }
        },
        onStopped: (error) => {
          delete disabledBtns[id]
          state.progressDialog = false
          state.buttonLoading = false
          setBuildErrorMessage({ buildMessage, id, name, error })

          const title = '物料包构建失败'
          const status = 'custom'
          const messageRender = {
            render: () => (
              <div style="max-height:316px;overflow:auto;">{`物料构建失败: ${
                error.taskResult || error
              }, 需要重新构建吗?`}</div>
            )
          }
          const exec = () => {
            disabledBtns[id] = true
            state.buttonLoading = true
            state.progressDialog = true
            task.build()
          }

          confirm({ title, status, message: messageRender, exec, width: 700 })
        }
      })
    }

    const getBlocks = (resolve) => {
      const type = BLOCKS

      state.loadingInstance = openLoading(document.getElementsByClassName('edit-detail-list-content-cardlist')[0])

      fetchBlocks()
        .then((data) => {
          state.loadingInstance?.close()

          const framework = material?.framework === 'Html' ? ['Html'] : [material.framework, 'Html']

          state[type] = data.filter(
            (item) =>
              framework.includes(item?.framework) && item.last_build_info && item.assets && item.histories_length
          )

          resolve()
        })
        .catch((error) => {
          state.loadingInstance?.close()

          message({ message: `获取区块列表失败: ${error.message || error}`, status: 'error' })
        })
    }

    const setImageUrl = (image_url) => {
      requestUpdateMaterial({
        id: state.content.id,
        image_url
      }).catch((error) => {
        message({ message: `图片设置失败: ${error.message || error}`, status: 'error' })
      })
    }

    const getUpdateParams = (data) => {
      const { id } = state.content
      const params = {
        id,
        [COMPONENT_LIB]: state.content[COMPONENT_LIB].map((item) => item.id),
        ...data
      }

      return params
    }

    const confirmToBuild = () => {
      if (state.content.npm_name) {
        const title = '构建物料'
        const status = 'custom'
        const messageRender = {
          render: () => <span>{'物料已构建, 确定要重新构建吗?'}</span>
        }
        const exec = () => {
          state.showVersionManage = true
        }

        confirm({ title, status, message: messageRender, exec })
      } else {
        state.showVersionManage = true
      }
    }

    const updateAndBuildMaterial = async (data) => {
      const updateParams = getUpdateParams(data)

      await updateMaterial(updateParams)
      buildMaterial(data)
    }

    const updateBaseInfo = ({
      name,
      name_cn,
      description,
      version,
      image_url,
      public: pub,
      public_scope_tenants,
      isOfficial,
      isDefault
    }) => {
      const editData = {
        name,
        name_cn,
        description,
        version,
        image_url,
        isOfficial,
        public: pub,
        public_scope_tenants,
        isDefault
      }

      Object.assign(state.content, editData)
      requestUpdateMaterial({
        id: state.content.id,
        ...editData
      }).catch((error) => {
        message({ message: `设置失败: ${error.message || error}`, status: 'error' })
      })
    }

    const setBlocksVersions = async (type, data) => {
      if (type !== BLOCKS) {
        return
      }

      const ids = data
        .filter((item) => Boolean(!item.versions?.length))
        .map((item) => {
          return item.id
        })
      const blocksDetails = await fetchBlocksByIds(ids)

      blocksDetails.forEach((item) => {
        const block = data.find((b) => b.id === item.id) || {}

        block.versions = item.histories
        block.version = item.histories[0].version
      })
    }

    const selectAll = (isSelectALl, data) => {
      const { type } = state.timeLineData[state.timeActive]

      if (isSelectALl) {
        const selectedIds = state.content[type].map((cur) => cur.base || cur.latest || cur.id)
        const newList = data.filter((item) => !selectedIds.includes(item.id))

        setBlocksVersions(type, newList)

        state.content[type].push(...newList)
      } else {
        const cancelIds = data.map((cur) => cur.base || cur.latest || cur.id)

        state.content[type] = state.content[type].filter(
          (item) => !cancelIds.includes(item.base || item.latest || item.id)
        )
      }

      setSelected(type)
    }

    onMounted(() => {
      getMaterial(isInit)
    })

    onUnmounted(() => {
      clearTimeout(state.timer)
      state.timer = null
    })

    return {
      state,
      disabledBtns,
      buildMessage,
      materialPercent,
      back,
      addToMaterial,
      deleteItem,
      updateAndBuildMaterial,
      lineChange,
      setImageUrl,
      showBaseForm,
      updateBaseInfo,
      setVersion,
      confirmToBuild,
      selectAll
    }
  }
}
</script>

<style lang="less" scoped>
.mymaterial {
  width: 100%;
  height: calc(100% - 50px);
  &-topbar {
    background-color: #fff;
    border-bottom: 1px solid #dfe1e6;
    height: 50px;
    display: flex;
    .mymaterial-create {
      display: flex;
      align-items: center;
      padding-left: 20px;
      box-sizing: border-box;
      cursor: pointer;
      z-index: 10;
      &-icon {
        width: 16px;
        height: 16px;
        color: rgba(0, 0, 0, 0.2);
      }
      &-line {
        background: #adb0b8;
        width: 1px;
        height: 10px;
        margin: 8px;
      }
      &-title {
        font-size: 14px;
        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
        font-weight: Bold;
        color: #252b3a;
      }
      &-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .mymaterial-address {
      position: absolute;
      top: 34px;
      left: 0;
      width: 100%;
      height: 26px;
      line-height: 26px;
      font-size: 12px;
      text-align: center;
      color: #1476ff;
      max-width: 100%;
      .structure-url {
        color: #1476ff;
        margin-left: 10px;
      }
    }
    .mymaterial-success {
      width: 260px;
      position: absolute;
      top: 0;
      right: 20px;
      z-index: 15;
    }
  }
  .progress-content {
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    .progress-content-text {
      color: #808080;
      font-size: 14px;
      margin-top: 50px;
    }
  }
  &-content-tool {
    padding: 30px;
    display: flex;
    justify-content: space-around;
    .tiny-input {
      width: 250px;
    }
    .tiny-select {
      width: 250px;
    }
  }
  &-content {
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 62px);
    background-color: #ffffff;

    .mymaterial-content-structure {
      box-sizing: border-box;
      width: 100%;
      max-height: 168px;
      background: #f2f5fc;
      padding: 16px 22px;
      .left {
        display: flex;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        max-width: calc(100% - 160px);
        flex-direction: column;
      }
      .right {
        width: 180px;
        height: 80px;
        position: relative;
        svg {
          position: absolute;
          bottom: 0;
          right: 20px;
          color: #2496ff;
          cursor: pointer;
        }
      }
      .mymaterial-content-structure-text {
        height: 26px;
        line-height: 26px;
        font-size: 14px;
        font-family: Microsoft YaHei, Microsoft YaHei-Normal;
        font-weight: Normal;
        color: #575d6c;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        max-width: 100%;
        span {
          outline: none;
          margin-left: 10px;
          cursor: pointer;
          color: #333;
          .icon-writing {
            margin-left: 2px;
          }
          &:focus {
            content: none;
            border: 1px solid #1890ff;
            padding: 0 5px;
          }
        }
        .structure-url {
          color: #2496ff;
          margin-left: 10px;
        }
      }
      .material-content-status {
        line-height: 26px;
      }
    }
    .mymaterial-content-main {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      margin-top: 10px;
      display: flex;
      .edit-page {
        height: 100%;
        padding: 0;
        :deep(.edit-detail) {
          padding: 10px 30px;
        }
      }
    }
  }
  &-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 62px;
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 34px;
    box-sizing: border-box;
    z-index: 16;
    .tiny-button {
      max-width: 300px;
    }
    .mymaterial-footer-tips {
      font-size: 13px;
      font-family: Microsoft YaHei, Microsoft YaHei-Normal;
      font-weight: Normal;
      color: #8a8e99;
      line-height: 18px;
      padding-left: 10px;
    }
  }
  :deep(.tiny-steps.is-horizontal .tiny-steps-normal .normal) {
    width: 30% !important;
  }
  :deep(.tiny-steps.is-horizontal .tiny-steps-normal .normal:last-child) {
    width: 90px !important;
  }
  @media only screen and (max-width: 1600px) {
    :deep(.tiny-steps-timeline > .timeline) {
      height: 48px !important;
    }
    :deep(.tiny-steps-timeline .timeline:not(:last-child) .line) {
      height: 48px !important;
    }
  }
}
</style>
