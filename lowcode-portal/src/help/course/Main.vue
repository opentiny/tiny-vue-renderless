<template>
  <div class="header-wrap">
    <tiny-button-group
      id="course-button-group"
      v-model="state.courseType"
      :data="state.groupData"
      @change="typeChange"
    ></tiny-button-group>
  </div>
  <div class="container">
    <div class="nav">
      <tiny-tree-menu
        ref="treeMenuRef"
        :expand-on-click-node="true"
        :default-expand-all="true"
        :data="state.treeData"
        node-key="id"
        ellipsis
        @node-click="handleNodeClick"
      ></tiny-tree-menu>
    </div>
    <div class="markdown-body">
      <course-marked
        v-if="!state.data?.video && state.data?.docs"
        :md="state.data?.docs"
        :preAndNextTitle="preAndNextTitle"
        :docTimeObj="docTimeObj"
        @click="handleMdClick"
        @preOrNextClick="preOrNextClick"
      ></course-marked>
      <div v-if="state.data?.video" class="video-container">
        <div class="video-left">
          <span class="video-title">{{ state.data.label }}</span>
          <video
            ref="videoRef"
            controls
            controlslist="nodownload"
            class="video"
            :src="state.data.video + '#t=1.5' || ''"
          ></video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, watchEffect, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import 'github-markdown-css/github-markdown-light.css'
import { ButtonGroup, TreeMenu } from '@opentiny/vue'
import { useModal } from 'lowcode-design-controller'
import CourseMarked from './components/courseMarked.vue'
import { getDoc, allDocsData as allData, getDocDataById } from '@/utils/importDocs'
import docsTime from './docsTime.json'

export default {
  components: {
    CourseMarked,
    TinyButtonGroup: ButtonGroup,
    TinyTreeMenu: TreeMenu
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { confirm } = useModal()
    const courseType = route.params.type
    const courseId = route.params.id
    const videoRef = ref(null)
    const treeMenuRef = ref(null)
    const TYPE_MAP = {
      engine: 'engine',
      portal: 'portal',
      case: 'case',
      video: 'video',
      dev: 'dev',
      backend: 'backend'
    }
    const state = reactive({
      data: null,
      expandedKeys: [],
      expandeArr: [],
      currentId: '',
      courseType: TYPE_MAP.engine,
      groupData: [
        {
          text: '使用指南',
          value: TYPE_MAP.engine
        },
        {
          text: '平台开发指南',
          value: TYPE_MAP.dev
        },
        {
          text: '网站文档',
          value: TYPE_MAP.portal
        }
      ],
      treeData: []
    })

    const typeChange = (newType) => {
      state.treeData = allData.filter(({ type }) => type === newType)

      if (!findItem(state.treeData, state.courseId)) {
        state.courseId = state.treeData[0].children ? state.treeData[0].children[0].id : state.treeData[0].id
        findItem(state.treeData, state.courseId)
      }

      router.push(`/help-center/course/${newType}/${state.courseId}`)
    }

    const replaceLinkPrefix = async (data) => {
      const EXPERIENCE_URL = import.meta.env?.MODE?.includes('open')
        ? `${import.meta.env.VITE_APP_ORIGIN}/tiny-engine#/`
        : `${import.meta.env.VITE_APP_ORIGIN}/platform-center/#/`

      if (!data.docs) {
        data.docs = await getDoc(data)
      }
      data.docs = String(data.docs)
        .replaceAll('md-only-prefix/', import.meta.env.BASE_URL)
        .replaceAll('portal-only-prefix/', EXPERIENCE_URL)
        .replaceAll('https://www.opentiny.design/tiny-engine#/', EXPERIENCE_URL) // 开源文档链接替换
        .replaceAll('./imgs/', `${import.meta.env.BASE_URL}docs/external-imgs/`)

      const matches = data.docs.matchAll(/\[[^\]]+\]\((\..*?\.md)(.*?)\)/g)
      const matchArr = [...matches]

      if (Array.isArray(matchArr)) {
        // 将markdown相对路径替换成hash路径
        matchArr.forEach((match) => {
          const path = match[1].trim()
          const type = match[2].trim().replace(/^"/, '').replace(/"$/, '')
          const pathWithType = type ? `../${type}/${path.split('/').pop()}` : path

          const newHash = new URL(pathWithType, window.location.origin + window.location.hash.replace('#', '')).pathname
          const href = `#${newHash.replace(/\.md$/, '')}`

          data.docs = data.docs.replace(path, href)
        })
      }

      return data
    }

    const handleNodeClick = async (item) => {
      if (!item.children) {
        state.courseId = item.id
        state.data = await replaceLinkPrefix(item)

        router.push(`/help-center/course/${state.courseType}/${state.courseId}`)
      }
    }

    const getGmtTime = (dateForm) => {
      if (dateForm === '') {
        return ''
      } else {
        const dateee = new Date(dateForm).toJSON()
        const date = new Date(Number(new Date(dateee)) + 8 * 3600 * 1000)
          .toISOString()
          .replace(/T/g, ' ')
          .replace(/\.[\d]{3}Z/, '')

        return date
      }
    }

    const findItem = (data, id) => {
      for (let index = 0; index < data.length; index++) {
        if (!data[index].children && data[index].id === id) {
          replaceLinkPrefix(data[index]).then((data) => {
            state.data = data
          })

          return true
        } else if (data[index].children) {
          if (findItem(data[index].children, id)) {
            return true
          }
        }
      }

      return false
    }

    const dynamicTab = () => {
      if (!Object.values(TYPE_MAP).includes(courseType)) {
        confirm({
          title: '文档类型不对',
          message: '请确认跳转的URL正确，跳转回首页',
          status: 'error',
          exec: () => {
            router.push('/home')
          }
        })

        return
      }

      state.courseType = courseType
      state.treeData = allData.filter(({ type }) => type === state.courseType)
      if (courseId) {
        state.courseId = courseId
      } else {
        state.courseId = state.treeData[0].children ? state.treeData[0].children[0].id : state.treeData[0].id
      }

      findItem(state.treeData, state.courseId)
    }

    dynamicTab()

    watchEffect(() => {
      treeMenuRef?.value?.setCurrentKey(state.courseId)
    })

    // 监听markdown点击事件，处理内部的文档链接跳转
    const handleMdClick = async (e) => {
      if (e.target.tagName !== 'A' || !e.target.href) {
        return
      }

      if (new URL(e.target.href).origin !== window.location.origin) {
        return
      }

      const paths = e.target.hash.split('/')
      const docData = getDocDataById(paths[paths.length - 1])

      if (docData) {
        state.courseType = paths[paths.length - 2]
        handleNodeClick(docData)
      }
    }

    const dataList = computed(() => {
      let list = []

      state.treeData.forEach((item) => {
        list = list.concat(item.children)
      })

      return list
    })

    const preAndNextTitle = computed(() => {
      let params = {}

      if (dataList.value.indexOf(state.data) === 0) {
        params.next = dataList.value[dataList.value.indexOf(state.data) + 1]
      } else if (dataList.value.indexOf(state.data) === dataList.value.length - 1) {
        params.pre = dataList.value[dataList.value.indexOf(state.data) - 1]
      } else {
        params.pre = dataList.value[dataList.value.indexOf(state.data) - 1]
        params.next = dataList.value[dataList.value.indexOf(state.data) + 1]
      }

      return params
    })

    const docTimeObj = computed(() => {
      return docsTime.find((item) => item.type === state.courseType && item.subName === state.courseId)
    })

    const preOrNextClick = async (item) => {
      state.courseId = item.id
      state.data = await replaceLinkPrefix(item)
      router.push(`/help-center/course/${state.courseType}/${state.courseId}`)
    }

    return {
      state,
      preAndNextTitle,
      docTimeObj,
      typeChange,
      handleNodeClick,
      getGmtTime,
      videoRef,
      treeMenuRef,
      handleMdClick,
      preOrNextClick
    }
  }
}
</script>

<style lang="less" scoped>
.header-wrap {
  border: 1px solid #dfe1e6;
  background-color: #fff;
  padding: 16px 20px;

  #course-button-group {
    :deep(.tiny-group-item) {
      li {
        margin-right: 0;

        button {
          background-color: #f5f5f5;
          border: 0;
          color: #595959;
        }

        button:hover {
          color: #191919;
        }
      }

      .active {
        button {
          background-color: #fff;
          border: 1px solid #191919;
          color: #191919;
        }
      }
    }
  }
}

.container {
  padding: 0;
  width: 100%;
  display: flex;
  background-color: #f5f5f5;
  height: calc(100vh - 132px);
  box-sizing: border-box;

  .nav {
    background-color: #fff;
    overflow-y: auto;

    :deep(.setting-nav-item) {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
  }

  .markdown-body {
    border-left: 1px solid #dfe1e6;
    width: 700px;
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 32px 32px 50px;
    box-sizing: border-box;

    :deep(#editor) {
      .md {
        flex: 1;
        .jump {
          border-bottom: none;
        }
      }
    }

    .video-container {
      display: flex;
      align-items: flex-start;
      padding: 20px 0 30px;

      .video-left {
        display: flex;
        flex-direction: column;
        margin-right: 32px;
        width: calc(100% - 300px);

        .video-title {
          font-weight: bold;
          font-size: 16px;
          margin-bottom: 8px;
        }

        .upload-time {
          margin-bottom: 16px;
          font-size: 12px;
        }

        .video {
          width: 80%;
          background-color: #000;
        }
      }

      .video-right {
        width: 300px;
        height: 100%;
        border-left: 1px solid #dfe1e6;
        padding: 16px 20px;

        .right-label {
          margin-bottom: 16px;
        }

        .right-item {
          display: flex;
          align-items: center;
          cursor: pointer;
          margin-bottom: 12px;

          .img-box {
            width: 120px;
            height: 70px;
            position: relative;
            margin-right: 16px;

            img {
              height: 100%;
            }

            .time {
              position: absolute;
              right: 0;
              bottom: 0;
              width: 40px;
              height: 20px;
              background: rgba(0, 0, 0, 0.3);
              color: #fff;
            }
          }

          .text-box {
            .box-label {
              font-size: 12px;
              margin-bottom: 8px;
            }

            .box-date {
              font-size: 12px;
              color: #595959;
            }
          }
        }
      }
    }
    :deep(video) {
      width: 100%;
    }
  }

  :deep(.tiny-tree-menu .tiny-tree .tiny-tree-node.is-current > .tiny-tree-node__content .tree-node-name) {
    border-left: 0px;
  }

  :deep(.tiny-tree-menu .tiny-input) {
    display: inline-block;
    margin: 10px 14px;
    width: 90%;

    .tiny-input__inner {
      border: 1px solid #dfe1e6;
    }
  }
}
</style>
