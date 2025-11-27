<template>
  <div class="app-template-manage">
    <tiny-tabs v-model="state.activeName">
      <tiny-tab-item title="模板设置" name="templateSetting">
        <app-template-setting :appList="state.appList" @getAppList="getAppList"></app-template-setting>
      </tiny-tab-item>
      <tiny-tab-item title="模板列表" name="templateList">
        <app-template-list
          :tableData="state.tableData"
          @saveTemplate="saveTemplate"
          @deleteTemplate="deleteTemplate"
        ></app-template-list>
      </tiny-tab-item>
    </tiny-tabs>
  </div>
</template>

<script lang="jsx">
import { reactive, watch, onMounted } from 'vue'
import { Tabs, TabItem } from '@opentiny/vue'
import { useModal } from 'lowcode-design-controller'
import AppTemplateList from './AppTemplateList'
import AppTemplateSetting from './AppTemplateSetting'
import { fetchAppTemplateList, requestUpdataAppTemplate } from './http'
import { fetchAllApplication } from '../application/http'

export default {
  components: {
    AppTemplateList,
    AppTemplateSetting,
    TinyTabs: Tabs,
    TinyTabItem: TabItem
  },
  setup() {
    const { confirm, message } = useModal()

    const state = reactive({
      activeName: 'templateSetting',
      tableData: [],
      appList: []
    })

    const getData = () => {
      fetchAppTemplateList()
        .then((data) => {
          state.tableData = data.list
          state.tableData.sort((a, b) => {
            return a.updated_at < b.updated_at ? 1 : -1
          })
        })
        .catch((error) => {
          message({ message: `获取模板列表失败: ${error.message || error}`, status: 'error' })
        })
    }

    const saveTemplate = (row) => {
      requestUpdataAppTemplate(row.id, { template_type: row.template_type })
        .then(() => {
          message({ message: '模板更新成功', status: 'success' })
          getData()
        })
        .catch((error) => {
          message({ message: `模板更新失败: ${error.message || error}`, status: 'error' })
        })
    }

    const deleteTemplate = (row) => {
      const title = '删除模板'
      const status = 'warning'
      const messageRender = {
        render: () => <span>{`您确定要删除 ${row.name} 吗?`}</span>
      }
      const exec = () => {
        requestUpdataAppTemplate(row.id, { template_type: null })
          .then(() => {
            getData()
          })
          .catch((error) => {
            message({ message: `模板删除失败: ${error.message || error}`, status: 'error' })
          })
      }

      confirm({ title, status, message: messageRender, exec })
    }

    const getAppList = () => {
      fetchAllApplication()
        .then((data) => {
          fetchAppTemplateList().then((template) => {
            const templateList = template.list.map((item) => item.id)

            state.appList = data.filter((item) => !templateList.includes(item.id))
          })
        })
        .catch((error) => {
          message({ message: `获取应用列表失败: ${error.message || error}`, status: 'error' })
        })
    }

    watch(
      () => state.activeName,
      (value) => {
        value === 'templateList' ? getData() : getAppList()
      }
    )

    onMounted(getAppList)

    return {
      state,
      saveTemplate,
      deleteTemplate,
      getAppList
    }
  }
}
</script>

<style lang="less" scoped>
.app-template-manage {
  background-color: #fff;
  margin-bottom: 20px;
  padding: 32px 20px 24px;
}
</style>
