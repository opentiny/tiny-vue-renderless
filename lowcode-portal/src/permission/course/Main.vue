<template>
  <div class="container">
    <div class="course-management">
      <tiny-tabs v-if="state.showTab" v-model="state.activeTab" class="tab-container">
        <tiny-tab-item title="发布课程" name="publish">
          <tiny-form
            ref="publishFormRef"
            :key="state.formKey"
            :rules="state.rules"
            :model="state.meta"
            :disabled="false"
            size="small"
            class="publish-form"
          >
            <h3 class="title">课程信息</h3>
            <tiny-form-item label="课程类型" prop="variety">
              <tiny-radio-group v-model="state.meta.variety">
                <tiny-radio-button label="manual" text="使用手册课程"></tiny-radio-button>
                <tiny-radio-button label="solution" text="解决方案课程"></tiny-radio-button>
              </tiny-radio-group>
            </tiny-form-item>
            <tiny-form-item label="二级类型" prop="category">
              <tiny-radio-group v-model="state.meta.category">
                <tiny-radio-button label="platformDev" text="设计器开发"></tiny-radio-button>
                <tiny-radio-button label="appDev" text="应用开发"></tiny-radio-button>
              </tiny-radio-group>
            </tiny-form-item>
            <tiny-form-item label="课程名称" prop="name">
              <tiny-input v-model="state.meta.name"></tiny-input>
            </tiny-form-item>
            <tiny-form-item label="课程描述" prop="desc">
              <tiny-input v-model="state.meta.desc"></tiny-input>
            </tiny-form-item>
            <tiny-form-item label="课程封面">
              <tiny-input v-model="state.meta.poster"></tiny-input>
            </tiny-form-item>
            <tiny-form-item label="课程分类" prop="type">
              <tiny-select v-model="state.meta.type" :options="typeOptions"> </tiny-select>
            </tiny-form-item>
            <h3 class="title section-title">添加章节</h3>
            <div v-for="(item, index) in state.meta.videos" :key="item" class="list-item">
              <div class="del-section-icon-wrap">
                <icon-del class="tiny-svg-size icon-del" @click="deleteSection(index)"></icon-del>
              </div>
              <div class="list-item-content">
                <tiny-form-item required label="章节名称" :prop="`videos[${index}].title`">
                  <tiny-input v-model="state.meta.videos[index].title"></tiny-input>
                </tiny-form-item>
                <tiny-form-item label="视频链接" :prop="`videos[${index}].video`">
                  <tiny-input v-model="state.meta.videos[index].video"></tiny-input>
                </tiny-form-item>
                <tiny-form-item label="文档" prop="docs">
                  <tiny-input v-model="state.meta.videos[index].docs" type="textarea"></tiny-input>
                </tiny-form-item>
              </div>
            </div>
            <tiny-link class="add-section-link" :underline="false" type="primary" @click="addSection">
              继续添加章节
            </tiny-link>
            <tiny-form-item class="confirm-item">
              <tiny-button type="primary" size="large" @click="handleSubmit">发布</tiny-button>
            </tiny-form-item>
          </tiny-form>
        </tiny-tab-item>
        <tiny-tab-item title="我的发布" name="list">
          <course-list :list="state.list" @editCourse="editCourse" @getList="getList"></course-list>
        </tiny-tab-item>
      </tiny-tabs>
      <result-page v-else text="showText" @handleShowTab="handleShowTab"></result-page>
    </div>
  </div>
</template>

<script>
import { Form, FormItem, Input, Button, Tabs, TabItem, RadioButton, RadioGroup, Select, Link } from '@opentiny/vue'
import { IconDel } from '@opentiny/vue-icon'
import { reactive, ref, onMounted } from 'vue'
import { useModal } from 'lowcode-design-controller'
import {
  requestCreateCourse,
  requestUpdateCourse,
  requestDeleteVideo,
  requestAddVideo,
  requestModifyVideo,
  requestCourseList
} from '../http'
import ResultPage from './ResultPage.vue'
import CourseList from './CourseList.vue'

const typeOptions = [
  {
    value: 'introductory',
    label: '入门课程'
  },
  {
    value: 'advanced',
    label: '进阶课程'
  },
  {
    value: 'practical',
    label: '实战教程'
  }
]

export default {
  components: {
    TinyTabs: Tabs,
    TinyTabItem: TabItem,
    TinyForm: Form,
    TinyFormItem: FormItem,
    TinyInput: Input,
    TinyButton: Button,
    TinyRadioButton: RadioButton,
    TinyRadioGroup: RadioGroup,
    TinySelect: Select,
    TinyLink: Link,
    IconDel: IconDel(),
    ResultPage: ResultPage,
    CourseList: CourseList
  },
  setup() {
    const publishFormRef = ref(null)
    const { message } = useModal()
    const state = reactive({
      activeTab: 'list',
      showTab: true,
      showText: '',
      formKey: 0,
      meta: {
        type: '',
        name: '',
        desc: '',
        poster: '',
        category: '',
        variety: '',
        videos: [{ title: '', video: '', docs: '' }]
      },
      rules: {
        variety: [{ required: true, message: '课程类型必选', trigger: 'change' }],
        category: [{ required: true, message: '二级类型必选', trigger: 'change' }],
        name: [{ required: true, message: '课程名称必填', trigger: 'blur' }],
        type: [{ required: true, message: '课程分类必选', trigger: 'blur' }],
        videos: [
          {
            title: [{ required: true, message: '必填', trigger: 'blur' }]
          }
        ]
      },
      list: [],
      modifyingData: {}
    })

    const addSection = () => {
      state.meta.videos.push({ title: '', video: '', docs: '' })
    }

    const deleteSection = (index) => {
      if (state.meta.videos.length <= 1) {
        return
      }

      state.meta.videos = state.meta.videos.filter((_item, idx) => idx !== index)
      ++state.formKey
    }

    const editCourse = (data) => {
      // 跳转到发布课程Tab
      state.activeTab = 'publish'
      // 请求课程详情
      state.meta = {
        ...data,
        videos: [...data.videos]
      }
    }

    const resetStateMeta = () => {
      state.meta = {
        type: '',
        name: '',
        desc: '',
        poster: '',
        category: '',
        variety: '',
        videos: [{ title: '', video: '', docs: '' }]
      }
    }

    const handleSubmit = () => {
      publishFormRef.value.validate((valid) => {
        if (valid) {
          const { variety, category, name, desc, poster, type, videos } = state.meta
          const params = { variety, category, name, desc, poster, type }

          // 新增课程
          if (!state.meta.id) {
            params.videos = videos
            requestCreateCourse(params)
              .then(() => {
                state.showTab = false
                resetStateMeta()
                getList()
              })
              .catch((err) => {
                message({
                  message: `发布失败${JSON.stringify(err)}`,
                  status: 'error'
                })
              })

            return
          }
          // 修改，调用修改接口
          const currentVideos = (state.meta.videos.filter((item) => item.id !== undefined) || []).map(({ id }) => id)

          // 删除的视频
          const deletedVideos =
            (state.list.filter(({ id }) => id === state.meta.id)?.[0]?.videos || [])
              .map(({ id }) => id)
              .filter((id) => !currentVideos.includes(id)) || []
          // 新增的视频
          const addedVideos = state.meta.videos.filter((item) => item.id === undefined) || []
          // 修改的视频
          const modifyVideos = state.meta.videos.filter((item) => item.id !== undefined) || []

          Promise.all([
            requestUpdateCourse(state.meta.id, params),
            requestAddVideo(state.meta.id, { videos: addedVideos }),
            requestDeleteVideo(state.meta.id, { videoIds: deletedVideos }),
            requestModifyVideo(state.meta.id, { videos: modifyVideos })
          ])
            .then(() => {
              state.showTab = false
              resetStateMeta()
              getList()
            })
            .catch((err) => {
              message({
                message: `发布失败${JSON.stringify(err)}`,
                status: 'error'
              })
            })
        }
      })
    }
    const getList = () => {
      requestCourseList()
        .then((res) => {
          state.list = res
        })
        .catch(() => {
          message({
            message: '请求课程列表失败',
            status: 'error'
          })
        })
    }

    onMounted(() => {
      getList()
    })

    const handleShowTab = (value, tabname = 'list') => {
      state.showTab = value
      state.activeTab = tabname
    }

    return {
      state,
      typeOptions,
      addSection,
      deleteSection,
      editCourse,
      handleSubmit,
      publishFormRef,
      handleShowTab,
      getList
    }
  }
}
</script>

<style lang="less" scoped>
.course-management {
  border-radius: 4px;
  padding: 20px;
  background-color: #fff;
  padding-left: 86px;
  min-height: 80vh;
}
.tab-container {
  max-width: 960px;
}
.publish-form {
  max-width: 754px;
}
.title {
  font-size: 14px;
  margin: 30px 0;
}
.section-title {
  margin-bottom: 20px;
}
.list-item {
  background-color: #f2f5fc;
  padding: 35px 0 35px 40px;
  margin-top: 20px;
  border-radius: 4px;
}
.list-item-content {
  max-width: 590px;
}
.add-section-link {
  margin-top: 20px;
}
.confirm-item {
  margin-top: 40px;
}
.del-section-icon-wrap {
  margin-bottom: 10px;
  text-align: right;
  margin-right: 20px;
  .icon-del {
    cursor: pointer;
    &:hover {
      color: red;
    }
  }
}
</style>
