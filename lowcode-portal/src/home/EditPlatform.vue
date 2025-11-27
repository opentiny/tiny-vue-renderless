<template>
  <edit-page
    class="create-platform-content"
    title="构建可视化设计器（体验版）"
    text="在这里可以为您高效定制多种专属设计器，包括定制自己的物料资产包、主题、DSL、工具栏、插件栏；"
    :timeLineData="state.timeLineData"
    :timeActive="state.timeActive"
    :allData="state.timeLineData[state.timeActive].allData"
    :selectData="state.content[state.timeLineData[state.timeActive].type]"
    :selectDataAll="state.content"
    :label="state.timeLineData[state.timeActive].label"
    :type="state.timeLineData[state.timeActive].type"
    :linkParams="state.linkParams"
    :searchGroup="state.businessList"
    :selectGroup="state.selectGroup"
    @select-all="selectAll"
    @line-change="lineChange"
    @add="addItem"
    @delete-item="deleteItem"
    @drag-item="dragItem"
    @set-version="setVersion"
  ></edit-page>
  <div class="create-platform-button">
    <tiny-button type="primary" native-type="submit" @click="$emit('edit')">构建设计器</tiny-button>
  </div>
</template>

<script lang="jsx">
import { reactive, onMounted } from 'vue'
import { Button } from '@opentiny/vue'
import { useModal } from 'lowcode-design-controller'
import { extend } from '@opentiny/vue-renderless/common/object'
import { fetchEcology, fetchMaterial } from '../ecosystem/http'
import EditPage from '../common/components/EditPage.vue'
import { TIMELINE_TYPES } from 'lowcode-design-controller/utils'

const { MATERIAL, THEME, PLUGINS, TOOLBAR, DSL } = TIMELINE_TYPES

export default {
  components: {
    EditPage,
    TinyButton: Button
  },
  props: {
    material: {
      type: Object,
      default: () => null
    }
  },
  emits: ['edit'],
  setup(props) {
    const { confirm, message } = useModal()
    const statusDefault = 'isDefault'
    const materialType = MATERIAL
    const timeLineData = [
      {
        activeIdx: 0,
        name: '物料资产包',
        label: '物料资产包',
        type: MATERIAL,
        attr: MATERIAL,
        allData: [],
        imgUrl: `${import.meta.env.BASE_URL}img/edit/material.png`,
        status: statusDefault,
        singleChoice: true,
        content: '物料是可视化页面搭建的原料，按照粒度可分为组件和区块',
        stepIdx: '步骤1'
      },
      {
        activeIdx: 1,
        name: '主题设置',
        label: '主题',
        type: THEME,
        attr: THEME,
        allData: [],
        imgUrl: `${import.meta.env.BASE_URL}img/edit/theme.png`,
        status: statusDefault,
        singleChoice: true,
        content: '您可按自己喜好，定制专属主题',
        stepIdx: '步骤2'
      },
      {
        activeIdx: 2,
        name: '添加插件',
        label: '插件',
        type: PLUGINS,
        attr: 'plugin',
        allData: [],
        imgUrl: `${import.meta.env.BASE_URL}img/edit/plugin.png`,
        status: statusDefault,
        content: '',
        stepIdx: '步骤3'
      },
      {
        activeIdx: 3,
        name: '添加工具',
        label: '工具栏',
        type: TOOLBAR,
        attr: TOOLBAR,
        allData: [],
        imgUrl: `${import.meta.env.BASE_URL}img/edit/toolbar.png`,
        status: statusDefault,
        content: '工具栏置于设计器最顶部，是可视化搭建的辅助工具',
        stepIdx: '步骤4'
      }
    ]

    const state = reactive({
      content: {
        [MATERIAL]: [],
        [THEME]: [],
        [TOOLBAR]: [],
        [PLUGINS]: [],
        [DSL]: [],
        appExtension: []
      },
      data: [],
      timeActive: 0,
      timeLineData: `${import.meta.env.MODE}` === 'prod' ? timeLineData.slice(0, timeLineData.length - 1) : timeLineData
    })

    const sortData = (data) => {
      const timeSortType = 'updated_at' // 默认按更新时间倒序

      data &&
        data
          .sort((a, b) => a.tiny_reserved - b.tiny_reserved)
          .sort((a, b) => b[timeSortType]?.localeCompare(a[timeSortType]))
          .sort((a, b) => b.isDefault - a.isDefault)

      return data
    }

    const setSelected = (type, allData) => {
      allData.forEach((item) => {
        const matchItem = state.content[type].find(({ id }) => id === item.id)

        item.selected = Boolean(matchItem)

        if (!matchItem) {
          return
        }

        item.versions = item.versions || matchItem.versions || [{ version: '1.0.0' }]
        item.version = item.version || matchItem.version || '1.0.0'
      })
    }

    const getEcology = (category, idx) => {
      fetchEcology({ category })
        .then((data) => {
          state.timeLineData[idx].allData = sortData(data)
          if (category === 'plugin') {
            category = PLUGINS
          }
          if (!data.length) return

          if (state.content[category]?.length === 0) {
            const newItem = state.timeLineData[idx].allData[0]

            state.content[category].push(extend(true, {}, newItem))
            setSelected(category, state.timeLineData[idx].allData)
          }
        })
        .catch((error) => {
          message({ message: `获取数据失败: ${error.message || error}`, status: 'error' })
        })
    }

    const getMaterial = () => {
      fetchMaterial()
        .then((data) => {
          state.timeLineData[0].allData = sortData(data.filter((i) => i.name && i.name !== ''))

          if (!data.length) return

          const newItem = state.timeLineData[0].allData[0] || {}
          const materialType = MATERIAL

          state.content[materialType].push(extend(true, {}, props.material?.id ? props.material : newItem))
          setSelected(materialType, state.timeLineData[0].allData)
        })
        .catch((error) => {
          message({ message: `获取物料资产包列表失败: ${error.message || error}`, status: 'error' })
        })
    }

    const lineChange = (idx) => {
      state.timeActive = idx
    }

    const addItem = (data) => {
      const { type, label, allData } = state.timeLineData[state.timeActive]
      const singleArray = [materialType, THEME, DSL]

      if (singleArray.includes(type) && state.content[type]?.length) {
        const status = 'custom'
        const messageRender = {
          render: () => <span>{`${label}已存在，需要替换吗？`}</span>
        }
        const exec = () => {
          state.content[type] = [extend(true, {}, data)]
          setSelected(type, allData)
        }

        confirm({ title: `添加${label}`, status, message: messageRender, exec })
      } else {
        state.content[type].push(extend(true, {}, data))
        setSelected(type, allData)
      }
    }

    const deleteItem = (data) => {
      const { type, label, allData } = state.timeLineData[state.timeActive]
      const singleArray = [materialType, THEME]

      if (singleArray.includes(type) && state.content[type]?.length === 1) {
        message({ message: `${label}为必选项，您可以选择其他${label}替换`, status: 'warning' })

        return
      }

      const status = 'warning'
      const messageRender = {
        render: () => <span>{`您确定要移除 ${data.name_cn} 吗?`}</span>
      }
      const exec = () => {
        state.content[type] = state.content[type].filter((item) => item.id !== data.id)
        setSelected(type, allData)
      }

      confirm({ title: `移除${label}`, status, message: messageRender, exec })
    }

    const dragItem = async (data) => {
      const { type, allData } = state.timeLineData[state.timeActive]

      state.content[type] = data.map((id) => allData.find((item) => item.id === id))
    }

    const getAllData = () => {
      state.timeLineData.forEach((item, idx) => {
        idx === 0 ? getMaterial() : getEcology(item.attr, idx)
      })
    }

    const selectAll = (isSelectALl, data) => {
      const { type, allData } = state.timeLineData[state.timeActive]

      if (isSelectALl) {
        const selectedIds = state.content[type].map((cur) => cur.base || cur.latest || cur.id)
        const newList = data.filter((item) => !selectedIds.includes(item.id))

        state.content[type].push(...newList)
      } else {
        const cancelIds = data.map((cur) => cur.base || cur.latest || cur.id)

        state.content[type] = state.content[type].filter(
          (item) => !cancelIds.includes(item.base || item.latest || item.id)
        )
      }

      setSelected(type, allData)
    }

    const setVersion = (data, type, idx) => {
      state.content[type].forEach((item) => {
        if (data.block_id && item.material === data.block_id) {
          item.version = data.version
          item.id = data.id
        }

        if (item.base === data.base) {
          item.version = data.version
        }
      })

      state.timeLineData[idx].allData.forEach((item) => {
        if (data.block_id && item.id === data.block_id) {
          item.version = data.version
        }
      })
    }

    onMounted(getAllData)

    return {
      state,
      addItem,
      deleteItem,
      lineChange,
      dragItem,
      selectAll,
      setVersion
    }
  }
}
</script>

<style lang="less" scoped>
.create-platform-button {
  position: fixed;
  bottom: 0px;
  left: 0px;
  height: 60px;
  line-height: 60px;
  width: 100%;
  text-align: center;
  background: #fff;
  z-index: 16;
  .tiny-button {
    max-width: 300px;
  }
  .create-platform-footer-tips {
    font-size: 13px;
    font-family: Microsoft YaHei, Microsoft YaHei-Normal;
    font-weight: Normal;
    color: #8a8e99;
    line-height: 18px;
    padding-left: 10px;
  }
}
.create-platform-content {
  padding: 20px 30px;
  min-height: 700px;
}
:deep(.edit-page-wrap) {
  padding: 20px;
  box-sizing: border-box;
}
:deep(.tiny-steps-timeline > .timeline) {
  height: 68px !important;
}
</style>
