<template>
  <tiny-drawer
    class="material-drawer"
    title="物料资产包详情"
    :visible="isVisible"
    :mask="false"
    :show-footer="true"
    width="600px"
    @confirm="confirm"
  >
    <div>
      <tiny-form
        ref="ruleForm"
        :model="state.createData"
        :disabled="false"
        :rules="state.rules"
        label-width="120px"
        :label-align="true"
        label-position="left"
        class="material-detail-form"
      >
        <div class="mymaterial-content-basicConfig">
          <tiny-form-item label="物料包中文名" prop="name_cn">
            <tiny-input v-model="state.createData.name_cn" placeholder="请输入"></tiny-input>
          </tiny-form-item>
          <tiny-form-item label="物料包英文名" prop="name">{{ state.createData.name }} </tiny-form-item>
          <tiny-form-item label="选择技术栈" prop="framework">{{ state.createData.framework }} </tiny-form-item>
          <tiny-form-item label="物料包描述">
            <tiny-input
              v-model="state.createData.description"
              type="text"
              maxlength="1000"
              show-word-limit
              placeholder="请输入"
            >
            </tiny-input>
          </tiny-form-item>

          <tiny-form-item label="预览图片">
            <select-img v-model="state.createData.image_url" type="myMaterial" maxlength="350" placeholder="请输入">
            </select-img>
          </tiny-form-item>
          <tiny-form-item label="业务分类" prop="business_categories">
            <tiny-checkbox-group v-model="state.createData.business_categories" disabled>
              <tiny-checkbox
                v-for="item in state.typeList"
                :key="item.name"
                :label="item.id"
                :text="item.name"
              ></tiny-checkbox>
            </tiny-checkbox-group>
          </tiny-form-item>
          <tiny-form-item v-if="isAdmin" label="标识官方物料">
            <tiny-radio v-model="state.createData.isOfficial" :label="true">是</tiny-radio>
            <tiny-radio v-model="state.createData.isOfficial" :label="false">否</tiny-radio>
          </tiny-form-item>
          <tiny-form-item v-if="isAdmin" label="标识默认物料">
            <tiny-radio v-model="state.createData.isDefault" :label="true">是</tiny-radio>
            <tiny-radio v-model="state.createData.isDefault" :label="false">否</tiny-radio>
          </tiny-form-item>
          <tiny-form-item label="公开范围">
            <div class="public-scope-wrap">
              <tiny-radio-group
                v-model="state.createData.public"
                :options="publicScopeOptions"
                @change="publicChange"
              ></tiny-radio-group>
              <tiny-select
                v-if="state.createData.public === publicScopeType.SEMI_OPEN"
                v-model="state.publicScopeTenants"
                multiple
                collapse-tags
                placeholder="选择租户"
                text-field="tenant_id"
                value-field="id"
                :options="tenants"
              ></tiny-select>
            </div>
          </tiny-form-item>
        </div>
      </tiny-form>
    </div>
  </tiny-drawer>
</template>
<script setup lang="jsx">
import { reactive, computed, onMounted, defineProps } from 'vue'
import SelectImg from '@/common/components/SelectImg.vue'
import {
  Radio as TinyRadio,
  RadioGroup as TinyRadioGroup,
  Input as TinyInput,
  Checkbox as TinyCheckbox,
  Select as TinySelect,
  CheckboxGroup as TinyCheckboxGroup,
  Drawer as TinyDrawer,
  Form as TinyForm,
  FormItem as TinyFormItem,
  Notify
} from '@opentiny/vue'
import { user, isAdmin } from 'lowcode-design-controller'
import { fetchBusinessCategory, requestUpdateMaterial } from '../../ecosystem/http'
import { SESSION_STORAGE } from 'lowcode-design-controller/utils'

const publicScopeType = {
  PRIVATE: 0,
  PUBLIC: 1,
  SEMI_OPEN: 2
}

const publicScopeOptions = [
  { label: publicScopeType.PRIVATE, text: '私有' },
  { label: publicScopeType.PUBLIC, text: '公开' },
  { label: publicScopeType.SEMI_OPEN, text: '半公开' }
]

defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
})

const state = reactive({
  createData: {},
  typeList: [],
  publicScopeTenants: []
})

const getAppTypeList = () => {
  fetchBusinessCategory()
    .then((data) => {
      const categoryRelations = state.createData?.material_category_relations || []
      const categories = categoryRelations.map((item) => item.category)

      state.typeList = data
      state.createData.business_categories = categories
    })
    .catch((error) => {
      Notify({
        type: 'error',
        title: () => <h4 style="margin:0">消息提示</h4>,
        message: `获取业务分类列表失败: ${error.message || error}`,
        position: 'top-right',
        duration: 5000
      })
    })
}

const publicChange = (value) => {
  state.publicScopeTenants =
    value === publicScopeType.SEMI_OPEN ? state.createData.public_scope_tenants.map(({ id }) => id) : []
}

const confirm = async () => {
  const params = {
    ...state.createData,
    public_scope_tenants: []
  }

  if (state.createData.public === publicScopeType.SEMI_OPEN) {
    params.public_scope_tenants = state.publicScopeTenants
  }

  try {
    const res = await requestUpdateMaterial(params)

    sessionStorage.setItem(SESSION_STORAGE.material, JSON.stringify(res))
  } catch (error) {
    Notify({
      type: 'error',
      title: () => <h4 style="margin:0">消息提示</h4>,
      message: `更新物料资产包详情信息失败: ${error.message || error}`,
      position: 'top-right',
      duration: 5000
    })
  }
}

const tenants = computed(() => user.current.tenants)

onMounted(() => {
  getAppTypeList()

  try {
    const material = JSON.parse(sessionStorage.getItem(SESSION_STORAGE.material))

    state.createData = material

    if (state.createData.public === publicScopeType.SEMI_OPEN) {
      state.publicScopeTenants = state.createData.public_scope_tenants.map(({ id }) => id)
    }
  } catch (error) {
    Notify({
      type: 'error',
      title: '获取物料包详情失败',
      message: `错误信息：${error}\n请从返回物料生态页面重新进入重试。`,
      position: 'top-right'
    })
  }
})
</script>
<style lang="less" scoped>
.material-drawer {
  --ti-drawer-head-title-font-size: 20px;
}
.material-detail-form {
  font-weight: normal;
}

.public-scope-wrap {
  display: flex;
  column-gap: 20px;
}
</style>
