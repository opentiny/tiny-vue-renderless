<template>
  <edit-page
    class="create-material-content"
    title="构建物料资产包（体验版）"
    :timeLineData="state.timeLineData"
    :timeActive="state.timeActive"
    :allData="state[state.timeLineData[state.timeActive].type]"
    :selectData="state.content[state.timeLineData[state.timeActive].type]"
    :selectDataAll="state.content"
    :label="state.timeLineData[state.timeActive].label"
    :type="state.timeLineData[state.timeActive].type"
    @line-change="lineChange"
    @select-all="selectAll"
    @add="addToMaterial"
    @delete-item="deleteItem"
  ></edit-page>
  <div class="create-material-button">
    <tiny-button type="primary" native-type="submit" @click="$emit('edit')">构建物料资产包</tiny-button>
  </div>
</template>
1
<script lang="jsx">
import { reactive, computed, onMounted } from 'vue'
import { Button } from '@opentiny/vue'
import { useModal } from 'lowcode-design-controller'
import { extend } from '@opentiny/vue-renderless/common/object'
import { fetchComponentLib, fetchBlocks } from './http'
import EditPage from '../common/components/EditPage.vue'
import { TIMELINE_TYPES } from 'lowcode-design-controller/utils'

const { COMPONENTS, COMPONENT_LIB, BLOCKS } = TIMELINE_TYPES

export default {
  components: {
    EditPage,
    TinyButton: Button
  },
  emits: ['edit'],
  setup() {
    const { confirm, message } = useModal()
    const statusDefault = 'isDefault'

    const state = reactive({
      content: {
        [COMPONENT_LIB]: [],
        [COMPONENTS]: [],
        [BLOCKS]: []
      },
      [COMPONENT_LIB]: [],
      [COMPONENTS]: [],
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
          imgStyle: {
            width: '64px',
            height: '64px'
          },
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
      ]
    })

    const currentType = computed(() => state.timeLineData[state.timeActive].type)

    const lineChange = (idx) => {
      state.timeActive = idx
    }

    const setSelected = (type) => {
      const allData = state[type]

      allData.forEach((item) => {
        item.selected = state.content[type].some(({ id, histories }) => {
          const flag = id === (item.base || item.id)

          if (type === BLOCKS && flag) {
            item.version = histories?.[0]?.version || '1.0.0'
            item.versions = histories || [{ version: '1.0.0' }]
          }

          return flag
        })
      })
    }

    const addToMaterial = (data) => {
      state.content[currentType.value].push(extend(true, {}, data))

      setSelected(currentType.value)
    }

    const deleteItem = (data) => {
      const title = `移除${state.timeActive === 0 ? '组件库' : '区块'}`
      const status = 'warning'
      const messageRender = {
        render: () => <span>{`您确定要移除 ${data.name?.zh_CN || data.label || data.name} 吗?`}</span>
      }
      const exec = () => {
        state.content[currentType.value] = state.content[currentType.value].filter((item) => item.id !== data.id)

        setSelected(currentType.value)
      }

      confirm({
        title,
        status,
        message: messageRender,
        exec
      })
    }

    const getComponentLib = () => {
      fetchComponentLib()
        .then((data) => {
          if (!data || !data.length) {
            data = []
          }

          const type = [COMPONENT_LIB]

          state[type] = data
          state.content[type].push(extend(true, {}, data[0]))

          setSelected(type)
        })
        .catch((error) => {
          message({
            message: `获取组件列表失败: ${error.message || error}`,
            status: 'error'
          })
        })
    }

    const getBlocks = () => {
      fetchBlocks()
        .then((data) => {
          const type = BLOCKS

          state[type] = data
          state.content[type].push(extend(true, {}, data[0]))

          setSelected(type)
        })
        .catch((error) => {
          message({
            message: `获取区块列表失败: ${error.message || error}`,
            status: 'error'
          })
        })
    }

    const selectAll = (isSelectALl, data) => {
      const { type } = state.timeLineData[state.timeActive]

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

      setSelected(type)
    }

    onMounted(() => {
      getComponentLib()
      getBlocks()
    })

    return {
      state,
      addToMaterial,
      deleteItem,
      lineChange,
      getBlocks,
      selectAll
    }
  }
}
</script>

<style lang="less" scoped>
.create-material-button {
  position: fixed;
  bottom: 0px;
  left: 0px;
  height: 60px;
  line-height: 60px;
  width: 100%;
  text-align: center;
  background: #fff;
  box-sizing: border-box;

  .tiny-button {
    max-width: 300px;
  }

  .create-material-footer-tips {
    font-size: 13px;
    font-family: Microsoft YaHei, Microsoft YaHei-Normal;
    font-weight: Normal;
    color: #8a8e99;
    line-height: 18px;
    padding-left: 10px;
  }
}

.create-material-content {
  padding: 20px 30px;
}

:deep(.edit-page-wrap) {
  padding: 20px;
  box-sizing: border-box;
}
</style>
