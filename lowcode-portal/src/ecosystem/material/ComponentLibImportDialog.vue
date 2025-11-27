<template>
  <tiny-drawer :visible="state.visible" width="700px" :show-footer="true" @close="cancel">
    <template #header>
      <div class="comp-lib-header">
        <span class="comp-lib-header-title">组件库信息</span>
        <span class="comp-lib-header-subTitle" @click="openHelp">教我设置</span>
      </div>
    </template>
    <template #footer>
      <div>
        <tiny-button @click="cancel">取消</tiny-button>
        <tiny-button type="primary" :loading="state.confirmLoading" @click="confirm">确定</tiny-button>
      </div>
    </template>
    <tiny-form
      ref="form"
      label-width="120px"
      label-position="left"
      :model="state.formData"
      :rules="rules"
      validate-type="text"
      validate-position="bottom-start"
    >
      <tiny-form-item label="组件库名称" prop="name" @mouseenter="highLightTip('name')">
        <tiny-input v-model.trim="state.formData.name" placeholder="请输入" />
      </tiny-form-item>

      <tiny-form-item label="npm包名" prop="packageName" @mouseenter="highLightTip('packageName')">
        <tiny-input v-model.trim="state.formData.packageName" placeholder="请输入" />
      </tiny-form-item>

      <tiny-form-item label="版本号" prop="version" @mouseenter="highLightTip('version')">
        <tiny-input v-model.trim="state.formData.version" placeholder="示例：1.0.0" />
      </tiny-form-item>

      <tiny-form-item label="技术栈" prop="framework" @mouseenter="highLightTip('framework')">
        <tiny-button-group
          v-model="state.formData.framework"
          :data="state.framework"
          text-field="label"
        ></tiny-button-group>
      </tiny-form-item>

      <tiny-form-item label="JS文件CDN" prop="script" @mouseenter="highLightTip('script')">
        <tiny-input v-model.trim="state.formData.script" placeholder="请输入" />
      </tiny-form-item>

      <tiny-form-item label="CSS文件CDN" prop="css" @mouseenter="highLightTip('css')">
        <tiny-input v-model.trim="state.formData.css" placeholder="请输入" />
      </tiny-form-item>

      <tiny-form-item label="描述" prop="description" @mouseenter="highLightTip('description')">
        <tiny-input v-model.trim="state.formData.description" type="textarea" placeholder="请输入" />
      </tiny-form-item>

      <tiny-form-item label="缩略图地址" prop="thumbnail" @mouseenter="highLightTip('thumbnail')">
        <tiny-input v-model.trim="state.formData.thumbnail" placeholder="请输入" />
      </tiny-form-item>

      <tiny-form-item label="公开范围" @mouseenter="highLightTip('public')">
        <div style="display: flex">
          <tiny-radio-group
            v-model="state.formData.public"
            :options="[
              { label: 0, text: '私有' },
              { label: 1, text: '公开' },
              { label: 2, text: '半公开' }
            ]"
            @change="publicChange"
          ></tiny-radio-group>
          <tiny-select
            v-if="state.formData.public === 2"
            v-model="state.formData.public_scope_tenants"
            style="margin-left: 20px"
            multiple
            collapse-tags
            placeholder="选择租户"
            text-field="tenant_id"
            value-field="id"
            :options="tenants"
          ></tiny-select>
        </div>
      </tiny-form-item>

      <tiny-form-item
        v-if="isAdminRole"
        label="标识官方物料"
        prop="isOfficial"
        @mouseenter="highLightTip('isOfficial')"
      >
        <tiny-radio v-model="state.formData.isOfficial" :label="true">是</tiny-radio>
        <tiny-radio v-model="state.formData.isOfficial" :label="false">否</tiny-radio>
      </tiny-form-item>

      <tiny-form-item v-if="isAdminRole" label="标识默认物料" prop="isDefault" @mouseenter="highLightTip('isDefault')">
        <tiny-radio v-model="state.formData.isDefault" :label="true">是</tiny-radio>
        <tiny-radio v-model="state.formData.isDefault" :label="false">否</tiny-radio>
      </tiny-form-item>
      <tiny-form-item label="其他依赖">
        <tiny-grid
          ref="basicGridRef"
          :data="state.formData.dependencies"
          :edit-config="{
            trigger: 'click',
            mode: 'cell',
            showStatus: true,
            markInsert: true
          }"
          @toolbar-button-click="toolbarButtonClickEvent"
        >
          <template #toolbar>
            <tiny-grid-toolbar :buttons="toolbarButtons"></tiny-grid-toolbar>
          </template>
          <tiny-grid-column type="selection" width="50"></tiny-grid-column>
          <tiny-grid-column
            field="script"
            show-overflow
            title="JS文件CDN"
            :editor="{ component: 'input' }"
          ></tiny-grid-column>
          <tiny-grid-column field="name" title="包名" :editor="{ component: 'input' }"></tiny-grid-column>
          <tiny-grid-column field="version" title="版本" :editor="{ component: 'input' }"></tiny-grid-column>
          <tiny-grid-column
            field="needDeclare"
            title="是否声明"
            :renderer="{ component: TinySwitch }"
          ></tiny-grid-column>
        </tiny-grid>
      </tiny-form-item>
    </tiny-form>
  </tiny-drawer>
  <tiny-drawer width="500px" :visible="state.helpVisible" @close="closeHelp">
    <template #header>
      <p class="help-documents-title">帮助文档</p>
    </template>
    <div class="help-documents">
      <div class="help-documents-content">
        <template v-for="item in componentLibHelpDoc" :key="item.key">
          <div
            v-if="!item.hidden"
            :class="['help-documents-content-item', item.key === state.highLightKey ? 'high-light' : '']"
          >
            <p class="tips-documents-title">{{ item.title }}</p>
            <p class="tips-documents-desc">{{ item.desc }}</p>
          </div>
        </template>
      </div>
    </div>
  </tiny-drawer>
</template>

<script setup>
import { defineProps, defineEmits, reactive, ref, watch, computed, toRaw } from 'vue'
import {
  Drawer as TinyDrawer,
  Button as TinyButton,
  Form as TinyForm,
  FormItem as TinyFormItem,
  Input as TinyInput,
  Radio as TinyRadio,
  RadioGroup as TinyRadioGroup,
  Select as TinySelect,
  ButtonGroup as TinyButtonGroup,
  Grid as TinyGrid,
  GridColumn as TinyGridColumn,
  GridToolbar as TinyGridToolbar,
  Switch as TinySwitch,
  Notify
} from '@opentiny/vue'
import { user, isAdmin } from 'lowcode-design-controller'
import { requestCreateComponentLib, requestUpdateComponentLib } from '../http'
import { formValidate, framework } from 'lowcode-design-controller/utils'

const props = defineProps({
  componentLibData: {
    type: Object,
    default: () => {}
  },
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:visible', 'addSuccess'])

const form = ref(null)

const toolbarButtons = ref([
  {
    code: 'insert',
    name: '新增'
  },
  {
    code: 'delete',
    name: '删除'
  }
])
const basicGridRef = ref()

const rules = reactive({
  name: [{ required: true, trigger: 'blur' }],
  packageName: [{ required: true, trigger: 'blur' }],
  version: [
    { required: true, trigger: 'blur' },
    { validator: formValidate('version'), trigger: 'blur' }
  ],
  script: [{ required: true, trigger: 'blur' }]
})

const state = reactive({
  visible: false,
  helpVisible: false,
  confirmLoading: false,
  framework,
  frameworkList: [
    { text: 'HTML', value: 'HTML' },
    { text: 'Vue', value: 'Vue' },
    { text: 'React', value: 'React' },
    { text: 'Angular', value: 'Angular' }
  ],
  formData: {
    id: '',
    name: '', // 组件库名称
    packageName: '', // 包名
    version: '', // 版本号
    cssUrl: '', // CSS文件路径
    framework: 'Vue', // 技术栈
    script: '', // js cdn
    css: '', // css cdn
    registry: '', // 仓库地址
    description: '', // 描述
    thumbnail: '', // 缩略图地址
    isDefault: false, // 标识成默认组件库（构建物料包时，默认的会自动添加上）
    isOfficial: false, // 标识成官方组件库（用途未知，有个官方的标签显示）
    public: 0, // 公开范围
    public_scope_tenants: [], // 公开范围为半公开时，选择的组织
    dependencies: [] // 组件库自己的依赖
  },
  highLightKey: ''
})

const tenants = computed(() => user.current.tenants)

const isEdit = computed(() => props.componentLibData.id)

const isAdminRole = computed(() => isAdmin())

const componentLibHelpDoc = computed(() => [
  { key: 'name', title: '组件库名称', desc: '必填。' },
  { key: 'packageName', title: 'npm包名', desc: '必填，发布到npm仓库中的包名，即package.json文件的name字段。' },
  { key: 'version', title: '版本号', desc: '必填，npm仓库中已发布的版本。' },
  { key: 'framework', title: '技术栈', desc: '必选，组件库依赖的JS框架或HTML原生' },
  { key: 'script', title: 'JS文件CDN', desc: '必填，ESModule格式的JS文件CDN地址，用于在设计器中加载并渲染组件。' },
  { key: 'css', title: 'CSS文件CDN', desc: '选填，样式文件CDN地址，用于设计器中渲染组件样式。' },
  { key: 'description', title: '描述', desc: '选填，关于组件库的描述信息，会在组件列表该物料下展示。' },
  { key: 'thumbnail', title: '缩略图地址', desc: '选填，组件列表中该物料展示的图片。' },
  {
    key: 'public',
    title: '公开范围',
    desc: '私有，只能用户自己使用和编辑；公开：所有用户都可以使用；半公开：仅勾选的组织内成员可以使用。'
  },
  {
    key: 'isOfficial',
    title: '标识官方物料',
    desc: '选择“是”，组件列表中该物料会携带“官方”标识。',
    hidden: !isAdminRole.value
  },
  {
    key: 'isDefault',
    title: '标识默认物料',
    desc: '选择“是”，在构建物料包时，会默认勾选该物料。',
    hidden: !isAdminRole.value
  },
  {
    key: 'dependencies',
    title: '其他依赖',
    desc: '组件库本身的依赖'
  }
])

watch(
  () => props.visible,
  (val) => {
    state.visible = val

    if (val) {
      Object.assign(state.formData, props.componentLibData)
    }
  }
)

const openHelp = () => {
  state.helpVisible = true
}

const closeHelp = () => {
  state.helpVisible = false
}

const cancel = () => {
  closeHelp()
  emit('update:visible', false)
}

const confirm = async () => {
  const valid = await form.value.validate()

  if (valid) {
    const params = toRaw(state.formData)

    state.confirmLoading = true

    const fn = isEdit.value ? requestUpdateComponentLib : requestCreateComponentLib

    fn(params)
      .then((res) => {
        emit('addSuccess', res)
        cancel()
      })
      .catch((error) => {
        Notify({
          type: 'error',
          message: `创建组件库失败: ${error.message || error}`,
          position: 'top-right'
        })
      })
      .finally(() => {
        state.confirmLoading = false
      })
  }
}

const publicChange = (value) => {
  if (value !== 2) {
    state.formData.public_scope_tenants = []
  }
}

const highLightTip = (name) => {
  state.highLightKey = name
}

const toolbarButtonClickEvent = ({ code, $grid }) => {
  if (code === 'insert') {
    $grid.insert({}).then((res) => {
      if (Array.isArray(state.formData.dependencies)) {
        state.formData.dependencies.push(res.row)
      } else {
        state.formData.dependencies = [res.row]
      }
    })
  }
  if (code === 'delete') {
    $grid.removeSelecteds().then((res) => {
      const deleteIds = res.rows.map((item) => item._RID)

      state.formData.dependencies = state.formData.dependencies.filter((item) => !deleteIds.includes(item._RID))
    })
  }
}
</script>

<style lang="less" scoped>
.comp-lib-header {
  padding: 32px 32px 24px;
  display: flex;
  align-items: flex-end;
  &-title {
    font-size: 24px;
    margin-right: 10px;
  }
  &-subTitle {
    cursor: pointer;
    font-size: 14px;
    font-weight: normal;
    border-bottom: 1px dashed #333;
  }
}
.item {
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.flex-align-center {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.mb-10 {
  margin-bottom: 10px;
}
.help-documents {
  background-color: #ffffff;
  border-bottom: 1px solid #f5f5f5;
  overflow-y: auto;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
}
.help-documents-title {
  font-size: 18px;
  color: #191919;
  font-weight: bold;
  padding: 20px 0 0 20px;
}

.help-documents-content {
  flex: 1;
  margin: 16px 0 30px -8px;
  overflow-y: auto;
  &-item {
    padding: 8px;
    border-radius: 8px;
  }
  .tips-documents-title {
    font-size: 14px;
    line-height: 18px;
    color: #191919;
    font-weight: bold;
    margin: 0;
  }
  .tips-documents-desc {
    font-size: 12px;
    line-height: 18px;
    color: #595959;
    margin: 0;
    margin-top: 16px;
  }
  .high-light {
    background-color: #f5f5f5;
  }
}

:deep(.tiny-button-group) {
  width: 100%;
  .tiny-group-item {
    display: flex;
    li {
      flex: 1;
      margin: 0;
      button {
        width: 100%;
        border-radius: 0;
        background: #f5f5f5;
        padding: 0 20px;
        border: 0;
      }
      &.active button:not(.disabled) {
        background: #fff;
        color: #191919;
        border: 1px solid #191919;
        border-radius: 6px;
      }

      &:hover:not(.active) button:not(.disabled) {
        color: #191919;
        font-weight: 700;
        background: #f5f5f5;
      }
    }
  }
}

:deep(.tiny-grid-toolbar) {
  padding: 0 0 12px 0;
}

.v-enter-active,
.v-leave-active {
  transition: transform 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(100%);
}
</style>
