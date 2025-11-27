<template>
  <div class="header-wrap">
    <div class="header">
      <div class="bread-crumb">
        <span class="bread-crumb-item" @click="$router.push('/help-center/course')">设计器学院</span>
        <span class="bread-crumb-item" @click="$router.push('/help-center/course')">{{
          typeMap[state.data?.variety]
        }}</span>
        <span>{{ state.data?.name }}</span>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="nav">
      <nav-layout :navData="state.list" :currentId="state.currentId" @select="handleChangeLesson"></nav-layout>
    </div>
    <div class="markdown-body">
      <show-marked v-if="docs" :md="docs"></show-marked>
      <div class="footer-menu">
        <div class="footer-menu-item">
          <span>上一节</span>
          <span class="menu-link" @click="handleChangeLesson(nextPrevData?.prev)">{{ nextPrevData?.prev?.title }}</span>
        </div>
        <div class="footer-menu-item">
          <span>下一节</span>
          <span class="menu-link" @click="handleChangeLesson(nextPrevData?.next)">{{ nextPrevData?.next?.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed, ref, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ShowMarked from '../../common/components/ShowMarked'
import 'github-markdown-css/github-markdown-light.css'
import { updateProgress, requestCourseDetail, requestCourseList } from './http'
import { useModal } from 'lowcode-design-controller'
import NavLayout from '@/common/components/NavLayout.vue'

const typeMap = {
  manual: '使用手册课程',
  solution: '解决方案课程'
}

export default {
  components: {
    ShowMarked,
    NavLayout
  },
  props: {
    md: {
      type: String,
      default: ''
    }
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const courseId = route.params.id
    const queryCourseName = route.query?.courseName
    const sessionId = Number(route.query?.sessionId)
    const videoRef = ref(null)

    const state = reactive({
      data: {},
      list: [],
      md: '',
      progress: {},
      currentId: ''
    })

    const handleChangeLesson = async (item) => {
      const id = item.id

      if (!id || state.currentId === id) {
        return
      }
      state.currentId = id
    }

    const nextPrevData = computed(() => {
      const curIndex = state.list.findIndex(({ id }) => id === state.currentId) || 0

      return {
        next: state.list?.[curIndex + 1] || {},
        prev: state.list?.[curIndex - 1] || {}
      }
    })

    const docs = computed(() => {
      const currentData = state.list.find(({ id }) => id === state.currentId) || {}
      const EXPERIENCE_URL = import.meta.env?.MODE?.includes('open')
        ? `${import.meta.env.VITE_APP_ORIGIN}/tiny-engine#/`
        : `${import.meta.env.VITE_APP_ORIGIN}/platform-center/#/`

      let docsOne = String(currentData.docs).replaceAll('md-only-prefix/', import.meta.env.BASE_URL)

      docsOne = docsOne.replaceAll('portal-only-prefix/', EXPERIENCE_URL)

      return docsOne
    })

    const handleVideoEnd = async (currentEndId) => {
      const index = state.list?.findIndex(({ id }) => id === currentEndId)

      const percent = Number((((index + 1) / state.list.length) * 100).toFixed())

      if (!state.data.progress || percent > state.data.progress) {
        updateProgress(courseId, {
          progress: Number(percent)
        })
        state.data.progress = percent
      }
      if (index + 1 < state.list.length) {
        state.currentId = state.list[index + 1].id
        await nextTick()
        videoRef.value?.play()
      }
    }

    const { confirm, message } = useModal()

    onMounted(() => {
      if (!courseId && !queryCourseName) {
        confirm({
          title: '课程ID不对',
          message: '请确认跳转的URL正确，跳转回设计器学院列表页',
          status: 'error',
          exec: () => {
            router.push('/help-center/course')
          }
        })

        return
      }
      if (queryCourseName) {
        requestCourseList({ name: queryCourseName })
          .then((res) => {
            state.data = res?.[0] || {}
            state.list = state.data?.videos || []
            state.currentId = state.list?.[0]?.id || ''
            if (sessionId && state.list?.find(({ id }) => id === sessionId)) {
              state.currentId = sessionId
            }
          })
          .catch((error) => {
            message({
              message: `查询课程详情出错${error}`,
              status: 'error'
            })
          })

        return
      }

      requestCourseDetail(courseId)
        .then((res) => {
          state.data = res || {}
          state.list = res?.videos || []
          state.currentId = state.list?.[0]?.id || ''
          if (sessionId && state.list?.find(({ id }) => id === sessionId)) {
            state.currentId = sessionId
          }
        })
        .catch((error) => {
          message({
            message: `查询课程详情出错${error}`,
            status: 'error'
          })
        })
    })

    return {
      state,
      typeMap,
      handleChangeLesson,
      docs,
      nextPrevData,
      handleVideoEnd,
      videoRef
    }
  }
}
</script>

<style lang="less" scoped>
.header-wrap {
  height: 50px;
  border: 1px solid #dfe1e6;
  background-color: #fff;
}

.header {
  margin-left: 30px;
}

.bread-crumb {
  position: relative;
  color: #8a8e99;
  line-height: 50px;

  .bread-crumb-item {
    cursor: pointer;
    color: #191919;

    &:hover {
      font-weight: 600;
    }
  }

  span {
    position: relative;

    &:last-child {
      color: #fff;
    }
  }

  span + span {
    margin-left: 18px;

    &::before {
      content: '/';
      position: absolute;
      left: -10px;
      top: 1px;
      line-height: 16px;
      font-size: 18px;
    }
  }
}

.video-container {
  display: flex;
  align-items: flex-start;
  padding: 20px 0 30px;
}

.video {
  width: 830px;
  height: 480px;
  background-color: #000;
}

.menu-container {
  height: 480px;
  box-sizing: border-box;
  padding-bottom: 20px;
  overflow: hidden;
  min-width: 320px;
  background-color: #393e49;
}

.menu-header {
  display: flex;
  box-sizing: border-box;
  height: 60px;
  background-color: #454955;
  padding: 10px;
  padding-left: 24px;
  color: #8a8e99;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;

  h5 {
    font-size: 18px;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    max-width: 140px;
  }

  .menu-header-nextLesson {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    max-width: 140px;
  }
}

.menu-list {
  max-width: 298px;
  margin: 20px auto 0;
  overflow-y: auto;
  height: 380px;
}

.list-item {
  padding: 10px 24px;
  color: #8a8e99;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  transition: all 0.1s ease-in-out;

  &.active,
  &:hover {
    color: #50d4ab;
    background-color: #454955;
  }
}

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

  .markdown-body {
    margin: 20px;
    border-radius: 8px;
    width: 700px;
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 32px;
    box-sizing: border-box;

    :deep(#editor) {
      .md {
        flex: 1;
      }
    }
  }
}

.footer-menu {
  border-top: 1px solid #b4b6be;
  display: flex;
  justify-content: space-between;
  padding-top: 6px;
  padding-bottom: 20px;

  .footer-menu-item {
    display: flex;
    flex-direction: column;
    line-height: 22px;

    .menu-link {
      cursor: pointer;

      &:hover {
        color: #50d4ab;
      }
    }
  }
}
</style>
