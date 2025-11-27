<template>
  <div class="top-container">
    <div class="top-container-wrap">
      <div class="top-container-title">
        <div class="title">我的设计器</div>
        <div class="sub-title">
          您可以在&nbsp;我的设计器&nbsp;中创建设计器，设计器创建完成后会自动打开编辑页面，用户可以在这里定制设计器的物料资产包、主题、工具栏、插件栏和DSL，设计器定制完成后，用户可以在&nbsp;我的设计器&nbsp;中创建应用
        </div>
      </div>
    </div>
  </div>
  <page-layout :class="{ 'is-loading': isLoading }">
    <div class="page-layout-container-top">
      <tiny-button
        type="info"
        round
        :showBtn="isTenantAdmin() || isMaster()"
        class="create-designer-button"
        @click="state.createVisibility = true"
        >创建设计器</tiny-button
      >
      <div class="platform-search-wrap">
        <div class="platform-select">
          <tiny-select v-model="fetchState.sort" :options="sortOptions" @change="doFetch"> </tiny-select>
          <tiny-input
            v-model="fetchState.filter"
            placeholder="请输入关键字"
            class="mymaterial-content-tool-search"
            @change="doFetch"
          >
            <template #suffix>
              <icon-search> </icon-search>
            </template>
          </tiny-input>
        </div>
      </div>
    </div>
    <card-list
      v-if="fetchState.data?.length"
      :data="fetchState.data"
      height="'160px'"
      @clickMore="clickMore"
    ></card-list>
    <div v-else-if="fetchState.empty" class="no-data">
      <empty-data></empty-data>
    </div>
    <tiny-pager
      class="platform-tiny-pager"
      layout="sizes, total, prev, pager, next"
      :current-page="fetchState.currentPage"
      :total="fetchState.total"
      :page-size="fetchState.pageSize"
      :page-sizes="fetchState.pageSizes"
      @size-change="pageSizeChange"
      @current-change="currentChange"
    ></tiny-pager>
    <app-create-dialog
      :boxVisibility="state.boxVisibility"
      title="新建应用"
      width="500px"
      @cancel="cancel"
      @save="createApp"
    ></app-create-dialog>
    <app-create-from-tem
      v-if="state.temBoxVisibility"
      :boxVisibility="state.temBoxVisibility"
      :platform="state.selectPlatform"
      title="从模板创建应用"
      @cancel="state.temBoxVisibility = false"
      @save="createAppFromTemplate"
    ></app-create-from-tem>
  </page-layout>
  <platform-create-general
    :boxVisibility="state.createVisibility"
    @create="createPlatform"
    @cancel="state.createVisibility = false"
  ></platform-create-general>
</template>

<script lang="jsx">
import { reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Pager, Input, Select, Button } from '@opentiny/vue'
import { IconDel, IconWriting, IconSetting, IconAdd, IconSearch } from '@opentiny/vue-icon'
import { useModal, isPlatformAdmin, isTenantAdmin, isMaster } from 'lowcode-design-controller'
import { useFetchData, SESSION_STORAGE, ACTION_ID, sortOptions } from 'lowcode-design-controller/utils'
import { fetchPlatform, requestDeletePlatform, requestCreatePlatform, fetchPlatformCount } from './http'
import { requestCreateApplication, requestCreateAppFromTemplate } from '../application/http'
import PageLayout from '../common/components/PageLayout.vue'
import CardList from '../common/components/CardList.vue'
import AppCreateDialog from '../common/components/AppCreateDialog'
import AppCreateFromTem from '../common/components/AppCreateFromTem'
import EmptyData from '../common/components/EmptyData.vue'
import PlatformCreateGeneral from './PlatformCreateGeneral.vue'

export default {
  components: {
    IconSearch: IconSearch(),
    TinyInput: Input,
    TinyButton: Button,
    TinySelect: Select,
    TinyPager: Pager,
    PageLayout,
    CardList,
    AppCreateDialog,
    AppCreateFromTem,
    PlatformCreateGeneral,
    EmptyData
  },
  setup() {
    const router = useRouter()
    const { confirm, message } = useModal()
    const route = useRoute()
    const routeName = route.name

    const moreAction = [
      { id: ACTION_ID.edit, icon: IconWriting(), content: '编辑设计器' },
      { id: ACTION_ID.setting, icon: IconSetting(), content: '设计器设置' },
      { id: ACTION_ID.create, icon: IconAdd(), content: '创建应用' },
      { id: ACTION_ID.delete, icon: IconDel(), content: '删除设计器' }
    ]

    const roleBlackList = {
      // 设计器管理员，不能编辑设计器，不能修改设计器信息，不能删除设计器
      platformAdmin: [ACTION_ID.edit, ACTION_ID.setting, ACTION_ID.delete]
    }

    const getMoreAction = (data) => {
      if (isMaster() || isTenantAdmin()) {
        const newData = data.map((item) => {
          item.moreAction = moreAction

          return item
        })

        return newData
      }

      const newData = data.map((item) => {
        let action = moreAction

        if (isPlatformAdmin(item.id)) {
          action = action.filter((actionItem) => roleBlackList.platformAdmin.includes(actionItem.id))
        }

        item.moreAction = moreAction.filter((moreActionItem) => !action.includes(moreActionItem))

        return item
      })

      return newData
    }

    const { fetchState, currentChange, pageSizeChange, doFetch, isLoading } = useFetchData({
      request: fetchPlatform,
      routeName,
      errorMsg: '获取设计器列表失败',
      getCount: fetchPlatformCount,
      getMoreAction,
      getExtParams() {
        return { filter_type: 'mine' }
      }
    })

    const state = reactive({
      boxVisibility: false,
      temBoxVisibility: false,
      createVisibility: false,
      selectPlatform: {}
    })

    const updatePlatform = (params) => {
      if (params) {
        sessionStorage.setItem(SESSION_STORAGE.platformSetting, JSON.stringify(params))
      } else {
        sessionStorage.setItem(SESSION_STORAGE.platformSetting, null)
      }

      router.push({
        name: 'myPlatformCreate'
      })
    }

    const createPlatform = (params) => {
      requestCreatePlatform(params)
        .then((data) => {
          sessionStorage.setItem(SESSION_STORAGE.platformSetting, JSON.stringify(data))
          sessionStorage.setItem(SESSION_STORAGE.createPlatformType, 'create')
          router.push({
            name: 'myPlatformCreate'
          })
        })
        .catch((error) => {
          message({ message: `设计器创建失败: ${error.message || error}`, status: 'error' })
        })
      state.createVisibility = false
    }

    const deletePlatform = (platform) => {
      const { id, name, is_default } = platform

      if (is_default) {
        message({ message: '默认设计器无法删除', status: 'error' })

        return
      }
      const title = '删除设计器'
      const status = 'warning'
      const messageRender = {
        render: () => (
          <span>{`您确定要删除设计器 ${name} 吗？删除后，基于此设计器创建的应用将无法更新物料资产包、无法应用预览、应用发布，且开发中易出现未知错误。`}</span>
        )
      }
      const exec = () => {
        requestDeletePlatform(id)
          .then(doFetch)
          .catch((error) => {
            message({ message: `删除设计器失败: ${error.message || error}`, status: 'error' })
          })
      }

      confirm({ title, status, message: messageRender, exec })
    }

    const createApp = (app) => {
      const params = {
        name: app.name,
        description: app.description,
        platform: state.selectPlatform.id,
        image_url: app.image_url
      }

      requestCreateApplication(params)
        .then(() => {
          router.push({
            path: '/my-application'
          })
        })
        .catch((error) => {
          message({ message: `创建应用失败: ${error.message || error}`, status: 'error' })
        })
    }

    const createAppFromTemplate = (app) => {
      const params = {
        name: app.name,
        description: app.description,
        platform: state.selectPlatform.id,
        image_url: app.image_url,
        id: app.id
      }

      requestCreateAppFromTemplate(params)
        .then(() => {
          router.push({
            path: '/my-application'
          })
        })
        .catch((error) => {
          message({ message: `创建应用失败: ${error.message || error}`, status: 'error' })
        })
    }

    const selectPlatform = (platform) => {
      if (!platform?.platform_url) {
        message({ message: '请先构建设计器', status: 'info', title: '提示' })

        return
      }
      state.selectPlatform = platform
      state.boxVisibility = true
    }

    const selectPlatformFromTem = (platform) => {
      if (!platform?.platform_url) {
        message({ message: '请先构建设计器', status: 'info', title: '提示' })

        return
      }
      state.selectPlatform = platform
      state.temBoxVisibility = true
    }

    const cancel = () => {
      state.boxVisibility = false
    }

    const setPlatform = (item) => {
      sessionStorage.setItem(SESSION_STORAGE.platformSetting, JSON.stringify(item))

      router.push({
        path: '/platform-setting'
      })
    }

    const clickMore = ({ item, action }) => {
      const actionMap = new Map([
        [ACTION_ID.edit, () => updatePlatform(item)],
        [ACTION_ID.setting, () => setPlatform(item)],
        [ACTION_ID.delete, () => deletePlatform(item)],
        [ACTION_ID.create, () => selectPlatform(item)],
        [ACTION_ID.createFromTemplate, () => selectPlatformFromTem(item)]
      ])

      if (actionMap.has(action.id)) {
        actionMap.get(action.id)()
      }
    }

    onMounted(doFetch)

    return {
      state,
      sortOptions,
      clickMore,
      pageSizeChange,
      currentChange,
      createApp,
      createAppFromTemplate,
      selectPlatform,
      cancel,
      createPlatform,
      fetchState,
      doFetch,
      isLoading,
      isTenantAdmin,
      isMaster
    }
  }
}
</script>

<style lang="less" scoped>
.platform-search-wrap {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  margin: 20px 0 14px;
  .tiny-input {
    width: 300px;
    :deep(.tiny-input__inner) {
      height: 32px;
    }
  }
  .tiny-select {
    width: 140px;
    margin-left: 12px;
    :deep(.tiny-input__inner) {
      height: 32px;
    }
  }
}
.page-layout.is-loading {
  min-height: calc(100% - 220px);
}
.platform-tiny-pager {
  margin-bottom: 20px;
}
.top-container {
  width: 100%;
  height: 250px;
  background-image: url('../assets/designerBanner.jpg');
  .top-container-wrap {
    max-width: 1220px;
    margin: 0 auto;
    padding: 0 24px;
    .top-container-title {
      padding-top: 60px;
      .title {
        font-size: 36px;
        color: #191919;
        font-family: 'Microsoft YaHei';
      }
      .sub-title {
        width: 416px;
        font-size: 16px;
        line-height: 22px;
        color: #595959;
        font-family: 'Microsoft YaHei';
        margin-top: 16px;
      }
    }
  }
}
.page-layout-container-top {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .create-designer-button {
    width: 130px;
    height: 32px;
    background-color: #191919;
    color: #fff;
  }
}

.no-data {
  margin: 32px auto;
}
.platform-search-wrap {
  width: 100%;
  margin: 20px 0;
  .platform-select {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .tiny-input {
      width: 309px;
      margin-left: 8px;
      :deep(.tiny-input__inner) {
        height: 32px;
        border-radius: 6px;
        border-color: #c2c2c2;
      }
    }
    .tiny-select {
      width: 150px;
      :deep(.tiny-input__inner) {
        height: 32px;
        border-radius: 6px;
        border-color: #c2c2c2;
      }

      & + .tiny-select {
        margin-left: 8px;
      }
    }
  }
}
</style>
