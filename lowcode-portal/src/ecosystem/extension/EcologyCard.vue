<template>
  <div class="ecology-page">
    <tiny-tabs v-model="state.activeName">
      <tiny-tab-item title="所有" name="all">
        <material-card :data="data" :type="type" :moreAction="allAction" :roundImg="roundImg" @clickMore="clickMore">
          <template v-slot:[addButtonSlotName]>
            <tiny-button v-if="state.title" class="release-button" type="primary" @click="createEcology">
              发布{{ state.title }}
            </tiny-button>
          </template>
        </material-card>
      </tiny-tab-item>
      <tiny-tab-item title="我的" name="mine">
        <material-card :data="data" :type="type" :moreAction="myAction" :roundImg="roundImg" @clickMore="clickMore">
          <template v-slot:[addButtonSlotName]>
            <tiny-button v-if="state.title" class="release-button" type="primary" @click="createEcology">
              发布{{ state.title }}
            </tiny-button>
          </template>
        </material-card>
      </tiny-tab-item>
    </tiny-tabs>
    <a v-if="state.title" class="ecology-page-title" :href="courseUrl">{{ `如何开发一个${state.title}` }}</a>
    <slot></slot>
  </div>

  <ecology-create
    :visible="state.createVisibility"
    :category="state.title"
    @cancel="state.createVisibility = false"
    @create="submitCreate"
  ></ecology-create>
  <ecology-detail
    :visible="state.detailVisibility"
    :version="state.version"
    :editFlag="state.editFlag"
    @cancel="state.detailVisibility = false"
    @update="submitUpdate"
  >
    <template #base>
      <tiny-form
        ref="formRef"
        :model="state.detail"
        label-width="100px"
        :rules="rules"
        :label-align="true"
        label-position="left"
      >
        <tiny-form-item label="名称" prop="name_cn">
          <tiny-input v-if="state.editFlag" v-model="state.detail.name_cn"></tiny-input>
          <div v-else>{{ state.detail.name_cn || '无' }}</div>
        </tiny-form-item>
        <tiny-form-item label="npm包名">
          <div>{{ state.detail.name || '无' }}</div>
        </tiny-form-item>
        <tiny-form-item label="仓库地址">
          <div>{{ state.detail.registry || '无' }}</div>
        </tiny-form-item>
        <tiny-form-item label="描述">
          <tiny-input v-if="state.editFlag" v-model="state.detail.description"></tiny-input>
          <div v-else>{{ state.detail.description || '无' }}</div>
        </tiny-form-item>
        <tiny-form-item label="缩略图">
          <div v-if="state.editFlag">
            <upload-pic @change="getImgData"></upload-pic>
          </div>
          <div v-else>
            <img :src="state.detail.image_url" class="detail-image" />
            <span v-if="!state.detail.image_url">无</span>
          </div>
        </tiny-form-item>
        <tiny-form-item label="官方">
          <div v-if="state.editFlag">
            <tiny-radio v-model="state.detail.isOfficial" :label="true">是</tiny-radio>
            <tiny-radio v-model="state.detail.isOfficial" :label="false">否</tiny-radio>
          </div>
          <div v-else>{{ state.detail.isOfficial ? '是' : '否' }}</div>
        </tiny-form-item>
        <tiny-form-item label="默认">
          <div v-if="state.editFlag">
            <tiny-radio v-model="state.detail.isDefault" :label="true">是</tiny-radio>
            <tiny-radio v-model="state.detail.isDefault" :label="false">否</tiny-radio>
          </div>
          <div v-else>{{ state.detail.isDefault ? '是' : '否' }}</div>
        </tiny-form-item>
        <tiny-form-item label="公开范围">
          <div v-if="state.editFlag" style="display: flex">
            <tiny-radio-group
              v-model="state.detail.public"
              :options="[
                { label: 0, text: '私有' },
                { label: 1, text: '公开' },
                { label: 2, text: '半公开' }
              ]"
              @change="publicChange"
            ></tiny-radio-group>
            <tiny-select
              v-if="state.detail.public === 2"
              v-model="state.detail.public_scope_tenants"
              style="margin-left: 20px"
              multiple
              collapse-tags
              placeholder="选择租户"
              text-field="tenant_id"
              value-field="id"
              :options="tenants"
            ></tiny-select>
          </div>
          <div v-else>{{ publicMatch[state.detail.public] }}</div>
        </tiny-form-item>
        <tiny-form-item v-if="!state.editFlag && state.detail.public === 2" label="公开组织">
          <div class="public-tenant">
            <span v-for="item in state.detail.public_scope_tenants" :key="item.id">{{ item.tenant_id }}</span>
          </div>
        </tiny-form-item>
      </tiny-form>
    </template>
    <template #version>
      <tiny-button v-if="state.editFlag" class="detail-create-version" @click="insertVersion">新增版本</tiny-button>
      <tiny-grid
        ref="gridRef"
        auto-resize
        :fetch-data="{ api: getData }"
        :pager="state.pagerConfig"
        :edit-config="{ trigger: 'click', mode: 'row', activeMethod: activeMethod }"
        :edit-rules="rules"
        :border="true"
        seq-serial
        size="small"
        @edit-closed="updateVersion"
      >
        <tiny-grid-column
          field="version"
          title="版本号"
          width="100"
          :editor="{ component: 'input', blurOutside: blurOutside }"
        >
        </tiny-grid-column>
        <tiny-grid-column
          field="description"
          title="版本描述"
          show-overflow="ellipsis"
          :editor="{ component: 'input', blurOutside: blurOutside }"
        ></tiny-grid-column>
        <tiny-grid-column field="updated_at" title="更新时间" width="160" format-text="longDateTime">
        </tiny-grid-column>
        <tiny-grid-column v-if="state.editFlag" title="操作" width="100" align="center">
          <template v-slot="data">
            <span class="detail-delete-version" size="mini" @click="deleteVersion(data.row)">删除</span>
          </template>
        </tiny-grid-column>
        <template #empty>
          <empty-data></empty-data>
        </template>
      </tiny-grid>
    </template>
  </ecology-detail>
</template>

<script lang="jsx">
import { reactive, watch, computed, ref } from 'vue'
import {
  Button,
  Tabs,
  TabItem,
  Grid,
  GridColumn,
  Form,
  FormItem,
  Input,
  Select,
  RadioGroup,
  Radio,
  Pager
} from '@opentiny/vue'
import { IconEyeopen } from '@opentiny/vue-icon'
import { user } from 'lowcode-design-controller'
import { ACTION_ID, formValidate } from 'lowcode-design-controller/utils'
import MaterialCard from '@/common/components/MaterialCard'
import EmptyData from '@/common/components/EmptyData.vue'
import EcologyDetail from '@/common/components/EcologyDetail'
import EcologyCreate from './EcologyCreate'
import UploadPic from './UploadPic.vue'
import { isGuest } from '@/controller'

export default {
  components: {
    TinyButton: Button,
    TinyTabs: Tabs,
    TinyTabItem: TabItem,
    TinyGrid: Grid,
    TinyGridColumn: GridColumn,
    TinyForm: Form,
    TinyFormItem: FormItem,
    TinyInput: Input,
    TinyRadioGroup: RadioGroup,
    TinyRadio: Radio,
    TinySelect: Select,
    MaterialCard,
    EcologyDetail,
    EcologyCreate,
    UploadPic,
    EmptyData
  },
  props: {
    type: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: () => []
    },
    roundImg: {
      type: Boolean,
      default: true
    }
  },
  emits: ['delete', 'create', 'tabChange', 'update'],
  setup(props, { emit }) {
    const gridRef = ref(null)
    const formRef = ref(null)
    const courseUrl = import.meta.env.MODE?.includes('open')
      ? `${import.meta.env.VITE_APP_ORIGIN}/tiny-engine#/help-center/course-detail/22`
      : `${import.meta.env.VITE_APP_ORIGIN}/platform-center/#/help-center/course-detail?courseName=生态中心`

    const myAction = isGuest()
      ? []
      : [
          {
            id: ACTION_ID.edit,
            icon: <svg-icon name="editor" />,
            content: '编辑'
          },
          {
            id: ACTION_ID.delete,
            icon: <svg-icon name="delete-application" />,
            content: '删除'
          }
        ]
    const allAction = isGuest() ? [] : [{ id: ACTION_ID.check, icon: IconEyeopen(), content: '查看' }]

    const titleMatch = {
      dsl: 'dsl',
      theme: '主题',
      plugin: '插件',
      toolbar: '工具栏',
      appExtension: '应用扩展'
    }

    const publicMatch = {
      0: '私有',
      1: '公开',
      2: '半公开'
    }

    const rules = {
      name_cn: [{ required: true }, { validator: formValidate('nameZh'), trigger: 'blur' }],
      version: [{ required: true }, { validator: formValidate('version') }],
      description: [{ required: true, message: '必填' }]
    }

    const state = reactive({
      title: isGuest() ? '' : titleMatch[props.type],
      createVisibility: false,
      detailVisibility: false,
      editFlag: false,
      activeName: 'all',
      data: props.data,
      detail: {},
      versions: [],
      pagerConfig: {
        component: Pager,
        attrs: {
          currentPage: 1,
          pageSize: 5,
          pageSizes: [5, 10],
          total: 0,
          layout: 'total, prev, pager, next, sizes'
        }
      },
      version: true
    })

    const clickMore = (params) => {
      if (params.action.id === ACTION_ID.check) {
        state.editFlag = false
        state.detail = { ...params.item }
        state.versions = params.item.versions || []
        gridRef.value.handleFetch()
        state.detailVisibility = true
      } else if (params.action.id === ACTION_ID.edit) {
        state.editFlag = true
        state.detailVisibility = true
        state.detail = {
          ...params.item,
          public_scope_tenants: params.item.public_scope_tenants?.map(({ id }) => id) || []
        }
        state.versions = params.item.versions || []
        gridRef.value.handleFetch()
      } else {
        emit('delete', params.item)
      }
    }

    const activeMethod = () => state.editFlag

    const getData = ({ page }) => {
      const curPage = page.currentPage
      const pageSize = page.pageSize
      const offset = (curPage - 1) * pageSize

      return new Promise((resolve) => {
        let total = state.versions?.length

        let result = state.versions?.slice(offset, offset + pageSize) || []

        resolve({ result, page: { total: total } })
      })
    }

    const createEcology = () => {
      state.createVisibility = true
    }

    const submitCreate = (params) => {
      emit('create', params)
    }

    const getImgData = (imgData) => {
      state.detail.image = imgData.image.split(',')[1]
      state.detail.image_name = imgData.image_name
    }

    const submitUpdate = async (type) => {
      const formValid = await formRef.value.validate()
      const params = { ...state.detail, ...{ versions: state.versions } }

      delete state.detail.image_url

      if (formValid) {
        gridRef.value.validate((valid) => {
          if (valid) {
            emit('update', params)
            state.detailVisibility = false
          }
        })
      }
    }

    const insertVersion = () => {
      gridRef.value.insert({
        type: 'insert'
      })
    }

    const deleteVersion = (row) => {
      gridRef.value.remove(row)
      const key = row.id ? 'id' : 'version'

      state.versions.splice(
        state.versions.findIndex((item) => item[key] === row[key]),
        1
      )
    }

    const updateVersion = ({ row }) => {
      gridRef.value.validate((valid) => {
        if (valid) {
          const key = row.id ? 'id' : 'version'
          const index = state.versions.findIndex((item) => item[key] === row[key])

          if (index >= 0) {
            state.versions.splice(index, 1, row)
          } else {
            state.versions.push({ version: row.version, description: row.description })
          }
        }
      })
    }

    const blurOutside = (e) => {
      const getEventTargetNode = gridRef.value.getEventTargetNode

      return e.cell.contains(e.event.target) || getEventTargetNode(e.event, document.body, 'tiny-popper').flag
    }

    const tenants = computed(() => user.current.tenants)

    const addButtonSlotName = computed(() => (props.data.length ? 'header' : 'empty'))

    const publicChange = (value) => {
      if (value !== 2) {
        state.detail.public_scope_tenants = []
      }
    }

    watch(
      () => state.activeName,
      (value) => {
        emit('tabChange', value)
      }
    )

    return {
      courseUrl,
      state,
      myAction,
      allAction,
      tenants,
      addButtonSlotName,
      ACTION_ID,
      publicMatch,
      rules,
      gridRef,
      formRef,
      clickMore,
      createEcology,
      publicChange,
      submitCreate,
      submitUpdate,
      insertVersion,
      deleteVersion,
      updateVersion,
      blurOutside,
      getData,
      activeMethod,
      getImgData
    }
  }
}
</script>

<style lang="less" scoped>
.ecology-page {
  width: 100%;
  margin: 0 auto;
  position: relative;

  .ecology-page-title {
    position: absolute;
    top: 20px;
    right: 16px;
    color: #191919;
    font-size: 12px;
    cursor: pointer;
  }

  :deep(.tiny-tabs__header) {
    margin-bottom: 36px;
  }

  :deep(.tiny-tabs__item) {
    font-size: 14px;
  }

  :deep(.tiny-tabs__content) {
    padding: 0;

    .release-button {
      margin-bottom: 20px;
    }
  }
}

.ecology-pager {
  padding-left: 16px;
}

:deep(.tiny-form-item__content) {
  line-height: 28px;
}

.public-tenant {
  span {
    margin-right: 8px;
  }
}

.detail-create-version {
  margin-bottom: 20px;
}

.detail-delete-version {
  color: #5e7ce0;
  cursor: pointer;
}

.detail-image {
  width: 60px;
  height: 60px;
}
</style>
