<template>
  <div class="container">
    <div class="nav">
      <tiny-tree-menu
        ref="treeMenuRef"
        :expand-on-click-node="true"
        :default-expand-all="true"
        :data="state.list"
        :default-expanded-keys="state.expandedKeys"
        :default-expanded-keys-highlight="state.defaultActiveKey"
        node-key="id"
        ellipsis
        @node-click="handleChangeLesson"
      ></tiny-tree-menu>
    </div>
    <div class="markdown-body">
      <show-marked v-if="currentData?.docs" :md="currentData?.docs" :isUseContent="true"></show-marked>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import ShowMarked from '../common/components/ShowMarked'
import 'github-markdown-css/github-markdown-light.css'
import { TreeMenu } from '@opentiny/vue'
import { applicationProtocol, materialPackageProtocol, protocolDemos } from './index'

import { BackendApiDocList } from '@/utils/importDocs'
import { triggerDownload } from '@/utils/download'

const AllDocs = [
  {
    id: 'app',
    docs: applicationProtocol,
    label: '应用描述协议'
  },
  {
    id: 'material',
    docs: materialPackageProtocol,
    label: '物料资产包协议'
  },
  {
    id: ' protocol',
    docs: protocolDemos,
    label: '协议示例'
  },
  {
    id: ' apiSDK',
    label: '后端SDK文档',
    children: BackendApiDocList
  }
]

export default {
  components: {
    ShowMarked,
    TinyTreeMenu: TreeMenu
  },
  setup() {
    const state = reactive({
      list: AllDocs,
      expandedKeys: [AllDocs[0].id],
      currentKey: AllDocs[0].id,
      defaultActiveKey: AllDocs[0].id
    })

    const handleChangeLesson = async (item) => {
      if (item.href) {
        triggerDownload(item.label, item.href)

        return
      }
      const id = item.id

      if (!id || state.currentKey === id || item.children) {
        return
      }
      state.currentKey = id
    }

    const getFlatDocsList = (list) => {
      return list.reduce((prevItem, item) => {
        let newFlatList = [...prevItem, item]

        if (item.children) {
          newFlatList = [...newFlatList, ...getFlatDocsList(item.children)]
        }

        return newFlatList
      }, [])
    }

    const currentData = computed(() => {
      return getFlatDocsList(AllDocs).find((item) => item.id === state.currentKey) || {}
    })

    return {
      state,
      handleChangeLesson,
      currentData
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 0;
  width: 100%;
  display: flex;
  background-color: #f5f5f5;
  height: calc(100% - 50px);
  box-sizing: border-box;
  .nav {
    background-color: #fff;
    :deep(.setting-nav-item) {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
  }
  :deep(.tiny-tree-menu) {
    margin-top: 10px;
    &::before {
      border-right: none;
    }
  }
  .markdown-body {
    margin: 20px;
    border-radius: 8px;
    width: 700px;
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 32px 32px 0 32px;
    box-sizing: border-box;
    :deep(#editor) {
      .md {
        flex: 1;
      }
    }
  }
}
</style>
