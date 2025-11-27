<template>
  <application-top v-if="isMyApplication"></application-top>
  <top-container
    v-else
    subTitle="这里是应用中心，您可以访问当前组织内发布上线的应用，也可以去我的设计器添加自己的应用～"
    :showBtn="false"
  ></top-container>
  <page-layout :class="{ 'is-loading': isLoading, 'my-app': isMyApplication }">
    <div class="my-application">
      <div class="my-application-toolbar">
        <div class="select-wrap">
          <tiny-select v-model="fetchState.sort" :options="sortOptions" @change="doFetch"> </tiny-select>
          <tiny-select v-model="fetchState.stack" :options="framework" @change="doFetch"> </tiny-select>
        </div>
        <tiny-input
          v-model="fetchState.filter"
          placeholder="请输入关键字"
          class="mymaterial-content-tool-search"
          @change="doFetch"
        >
          <template #suffix>
            <IconSearch> </IconSearch>
          </template>
        </tiny-input>
      </div>
    </div>
    <app-center-card-list
      v-if="isMyApplication"
      :data="fetchState.data"
      height="160px"
      :isMyApplication="isMyApplication"
      @clickMore="clickMore"
    ></app-center-card-list>
    <app-center-card-list v-else :data="fetchState.data"></app-center-card-list>
    <tiny-modal v-model="isTrue" show-footer title="暂无访问地址" status="info" class="tiny-modal-box-all">
      <template #default>
        <p class="tiny-modal-box-title">您还未设置此应用的在线访问地址，请设置。</p>
        <tiny-form ref="ruleForm" :model="state" :rules="baseRules" show-message validate-type="text">
          <tiny-form-item prop="inputVal" required :validate-icon="validateIcon">
            <tiny-input v-model="state.inputVal" placeholder="https://"></tiny-input>
          </tiny-form-item>
        </tiny-form>
      </template>
      <template #footer>
        <tiny-button type="info" round size="small" @click="toVisit">确认并访问</tiny-button>
      </template>
    </tiny-modal>
    <tiny-pager
      v-if="fetchState.total > fetchState.pageSizes[0]"
      class="application-tiny-pager"
      layout="sizes, total, prev, pager, next"
      :current-page="fetchState.currentPage"
      :total="fetchState.total"
      :page-size="fetchState.pageSize"
      :page-sizes="fetchState.pageSizes"
      @size-change="pageSizeChange"
      @current-change="currentChange"
    ></tiny-pager>
  </page-layout>
</template>

<script lang="jsx">
import { onMounted, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Pager, Select, Input, Modal, Button, Form, FormItem, Notify } from '@opentiny/vue'
import { IconEyeopen, IconCode, IconSetting, IconDel, IconSearch, IconError } from '@opentiny/vue-icon'
import {
  useModal,
  user,
  isAppAdmin,
  isAppDeveloper,
  isPlatformAdmin,
  isMaster,
  isTenantAdmin
} from 'lowcode-design-controller'
import { SESSION_STORAGE, ACTION_ID, sortOptions, framework, useFetchData } from 'lowcode-design-controller/utils'
import { isInternalEnv } from '@/utils/env'
import { openEditor } from '@/utils/editor'

import PageLayout from '../common/components/PageLayout.vue'
import AppCenterCardList from '../common/components/AppCenterCardList.vue'
import TopContainer from '../common/components/TopContainer.vue'
import { fetchApplication, fetchApplicationCount, requestDeleteApplication, requestUpdateApplication } from './http'
import ApplicationTop from './ApplicationTop'
import { recordOpenApp } from '../monitor/Main.vue'
import { formValidate } from '../controller/utils'

export default {
  components: {
    IconSearch: IconSearch(),
    TinyButton: Button,
    TinyInput: Input,
    TinySelect: Select,
    TinyPager: Pager,
    TinyForm: Form,
    TinyFormItem: FormItem,
    PageLayout,
    AppCenterCardList,
    ApplicationTop,
    TopContainer,
    TinyModal: Modal
  },
  setup() {
    const isTrue = ref(false)
    const state = reactive({
      inputVal: '',
      id: ''
    })
    const router = useRouter()
    const { confirm, message } = useModal()
    const route = useRoute()
    const routeName = route.name
    const isMyApplication = routeName === 'myApplication'
    const ruleForm = ref(null)
    const validateIcon = ref(IconError())
    const baseRules = {
      inputVal: [{ required: true }, { validator: formValidate('https'), trigger: 'change' }]
    }

    const moreAction = [
      { id: ACTION_ID.view, icon: IconEyeopen(), content: '访问应用' },
      { id: ACTION_ID.develop, icon: IconCode(), content: '开发应用' },
      { id: ACTION_ID.setting, icon: IconSetting(), content: '应用设置' },
      { id: ACTION_ID.delete, icon: IconDel(), content: '删除应用' }
    ]

    if (isInternalEnv()) {
      moreAction.push({ id: ACTION_ID.preview, content: '应用预览' })
    }

    const roleBlackList = {
      // 设计器管理员，不能开发应用
      platformAdmin: [ACTION_ID.develop],
      // 应用管理员，不能删除应用
      appAdmin: [ACTION_ID.delete],
      // 应用开发人员，不能删除应用，不能修改应用信息
      appDeveloper: [ACTION_ID.delete, ACTION_ID.setting]
    }
    const toVisit = () => {
      ruleForm.value.validate((valid, value) => {
        if (valid) {
          isTrue.value = false
          const params = {
            visit_url: state.inputVal
          }

          requestUpdateApplication({ id: state.id, params })
            .then((data) => {
              Notify({
                type: 'success',
                message: '访问地址设置成功',
                position: 'top-right'
              })
              doFetch()
              window.open(data.visit_url, '_blank')
            })
            .catch((error) => {
              Notify({
                type: 'error',
                message: `访问地址设置失败: ${error.message || error}`,
                position: 'top-right'
              })
            })
        }
      })
    }
    const getMoreAction = (data) => {
      if (!isMyApplication) {
        return data
      }

      if (isMaster() || isTenantAdmin()) {
        const newData = data.map((item) => {
          item.moreAction = moreAction

          return item
        })

        return newData
      }

      const newData = data.map((item) => {
        let action = moreAction
        const platformId = item.platform?.id || -1

        if (isAppAdmin(item.id)) {
          action = action.filter((actionItem) => roleBlackList.appAdmin.includes(actionItem.id))
        }
        if (isAppDeveloper(item.id)) {
          action = action.filter((actionItem) => roleBlackList.appDeveloper.includes(actionItem.id))
        }
        if (isPlatformAdmin(platformId)) {
          action = action.filter((actionItem) => roleBlackList.platformAdmin.includes(actionItem.id))
        }

        item.moreAction = moreAction.filter((moreActionItem) => !action.includes(moreActionItem))

        return item
      })

      return newData
    }

    const { fetchState, currentChange, pageSizeChange, doFetch, isLoading } = useFetchData({
      request: fetchApplication,
      routeName,
      errorMsg: '获取应用列表失败',
      getCount: fetchApplicationCount,
      getMoreAction,
      getExtParams() {
        const extParams = {}

        if (isMyApplication) {
          extParams.filter_type = 'mine'
        }

        if (fetchState.stack) {
          extParams.framework_in = fetchState.stack
        }

        return extParams
      }
    })

    const deleteApplication = (app) => {
      const { id, name, is_default } = app

      if (is_default) {
        message({ message: '默认应用无法删除', status: 'error' })

        return
      }
      const title = '删除应用'
      const status = 'warning'
      const messageRender = {
        render: () => <span>{`您确定要删除 ${name} 吗?`}</span>
      }
      const exec = () => {
        requestDeleteApplication(id)
          .then(doFetch)
          .catch((error) => {
            message({ message: `删除应用失败: ${error.message || error}`, status: 'error' })
          })
      }

      confirm({ title, status, message: messageRender, exec })
    }
    const previewApplication = (item) => {
      if (item.visit_url) {
        window.open(item.visit_url, '_blank')
      } else {
        isTrue.value = !isTrue.value
      }
    }
    const openApplication = (item) => {
      if (item.editor_url) {
        const editor_url = `${item.editor_url}&tenant=${user.current.tenant?.id}`

        recordOpenApp()

        openEditor(router, editor_url)
      } else {
        message({ message: '未找到应用地址，请尝试重新构建设计器后再创建应用', status: 'warning' })
      }
    }

    const setApplication = (item) => {
      sessionStorage.setItem(SESSION_STORAGE.appSetting, JSON.stringify(item))

      router.push({
        path: '/application-setting'
      })
    }

    const visitApplication = (item) => {
      if (item.visit_url) {
        window.open(item.visit_url, '_blank')
      } else {
        const title = '填写访问地址'
        const status = 'warning'
        const messageRender = {
          render: () => <span>{'您需要先在应用设置中填写访问地址，现在去填写？'}</span>
        }
        const exec = () => {
          setApplication(item)
        }

        confirm({ title, status, message: messageRender, exec })
      }
    }

    const clickMore = ({ item, action }) => {
      state.id = item.id
      const actionMap = new Map([
        [ACTION_ID.view, () => visitApplication(item)],
        [ACTION_ID.setting, () => setApplication(item)],
        [ACTION_ID.delete, () => deleteApplication(item)],
        [ACTION_ID.develop, () => openApplication(item)],
        [ACTION_ID.preview, () => previewApplication(item)]
      ])

      if (actionMap.has(action.id)) {
        actionMap.get(action.id)()
      }
    }

    onMounted(doFetch)

    return {
      isTrue,
      sortOptions,
      framework,
      clickMore,
      doFetch,
      openApplication,
      fetchState,
      pageSizeChange,
      currentChange,
      isMyApplication,
      isLoading,
      toVisit,
      baseRules,
      ruleForm,
      state,
      validateIcon
    }
  }
}
</script>

<style lang="less" scoped>
.my-application {
  width: 100%;
  .my-application-toolbar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 20px 0;
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
.page-layout.is-loading {
  min-height: calc(100% - 180px);
  &.my-app {
    min-height: calc(100% - 250px);
  }
}
.application-tiny-pager {
  margin-top: 18px;
}
.tiny-modal-box-all {
  margin-top: 180px;
  .tiny-modal-box-title {
    font-size: 14px;
    line-height: 6px;
    color: #595959;
    margin: 0 0 25px;
  }
  :deep(.tiny-form-item__error) {
    font-size: 12px;
    svg {
      margin: -3px 5px 0 0;
    }
  }
  :deep(.tiny-modal__box) {
    border-radius: 8px;
  }
  :deep(.tiny-modal__status-wrapper) {
    color: #1476ff;
  }
  :deep(.tiny-input__inner) {
    border-radius: 6px;
    width: 300px;
    border-color: #c2c2c2;
  }
  :deep(.tiny-form-item__content) {
    margin-left: 0 !important;
  }
  :deep(.tiny-button.tiny-button--info.is-round) {
    border-radius: 16px;
    height: 32px;
    width: 120px;
  }
}

:deep(.tiny-pager__sizes .tiny-pager__input input) {
  width: 70px;
  height: 32px;
  border-radius: 6px;
  color: #595959;
  font-size: 14px;
  line-height: 20px;
}
:deep(.tiny-pager__input-btn) {
  width: 30px;
  height: 24px;
  svg {
    opacity: 0;
  }
  &::before {
    content: '';
    display: block;
    width: 9px;
    height: 9px;
    border: 0 solid #595959;
    border-top-width: 1px;
    border-right-width: 1px;
    transform-origin: center center;
    transform: translate(130%, 100%) rotate(135deg);
  }
}
:deep(.tiny-pager .tiny-pager__total) {
  width: 81px;
  height: 20px;
  font-size: 14px;
  color: #191919;
  line-height: 20px;
  margin: 0 -16px 0 4px;
}
:deep(.tiny-pager__pages) {
  font-size: 14px;
  color: #595959;
  height: 32px;
  line-height: 32px;
}
:deep(.tiny-pager .tiny-pager__pages li.is-active) {
  width: 32px;
  height: 32px;
  background-color: rgba(0, 0, 0, 5%);
  font-size: 14px;
  color: #191919;
  font-weight: 900;
  line-height: 32px;
  border-radius: 16px;
  font-family: Microsoft YaHei, Microsoft YaHei-Bold;
}
:deep(.tiny-pager .tiny-pager__pages li) {
  font-size: 14px;
  color: #595959;
  width: 32px;
  height: 32px;
  line-height: 32px;
}
</style>
