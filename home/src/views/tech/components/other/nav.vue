<template>
  <div>
    <div class="tech-video-search">
      <tiny-select
        v-model="searchVal"
        filterable
        remote
        :remote-method="remoteMethod"
        :loading="loading"
        placeholder="请输入关键词"
        loading-text="Loading..."
      >
        <tiny-option v-for="item in searchArr" :label="item.title" :key="item.id" :value="item.id">
          <a @click="linkTo(item)" rel="noopener noreferrer">
            <p>
              <span style="font-weight: bold"> {{ item.info.name }}：</span>
              <span> {{ item.title }}</span>
            </p>
          </a>
        </tiny-option>
      </tiny-select>
    </div>
    <div class="tech-video-tabs">
      <tiny-tabs v-model="videoName" @click="tabsFn">
        <tiny-tab-item v-for="items in videoTabs" :key="items.name" :title="items.title" :name="items.name">
          <!-- 内容 -->
          <div class="tech-video-tabs-select">
            <!-- 类目选项 -->
            <div class="tech-video-tabs-select-class" v-if="props.showSelect">
              <div
                class="tech-video-tabs-select-options"
                v-for="(item, pos) in aboutData"
                :key="pos"
                @click="clickOptFn(item)"
              >
                <div :style="(activeClass === item.value && isSelected) || item.default === item.value ? styleObj : {}">
                  {{ item.info }}
                </div>
              </div>
            </div>
            <!-- 其他选项 -->
            <div class="tech-video-tabs-select-other" v-if="props.showTag">
              <div
                class="tech-video-tabs-select-tag"
                :style="(activeTag === item.name && isSelectedTag) || item.default === item.name ? styleTagObj : {}"
                v-for="(item, num) in tagData"
                :key="num"
                @click="clickTagFn(item)"
              >
                <div>
                  {{ item.name }}
                </div>
              </div>
            </div>
          </div>
        </tiny-tab-item>
      </tiny-tabs>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { TinySelect, TinyOption, TinyTabs, TinyTabItem } from '@opentiny/vue'
import { IconSearch } from '@opentiny/vue-icon'
import * as FlexSearch from 'flexsearch'
import { allData, useFlexSearch } from '../ts/utils'

const router = useRouter()
const route = useRoute()
const props = defineProps({
  data: {
    type: Object,
    default: {}
  },
  type: {
    type: String,
    default: ''
  },
  showSelect: {
    type: Boolean,
    default: false
  },
  showTag: {
    type: Boolean,
    default: false
  },
  tabsData: {
    type: Array<{ name: string; title: string }>,
    default: [
      {
        name: 'guide',
        title: '使用指南'
      },
      {
        name: 'analysis',
        title: '原理解析'
      },
      {
        name: 'feature',
        title: '特性介绍'
      },
      {
        name: 'technology',
        title: '前端技术'
      }
    ]
  }
})
const TinyIconSearch = IconSearch()
const searchVal = ref('')
const searchArr = ref([])
const loading = ref(false)
const videoName = ref('guide')
const currentData = ref({})
const videoTabs = ref<{ name: string; title: string }[]>([])
const aboutData = ref<{ info: string; value: string; default: string }[]>([])
const isSelected = ref(false)
const activeClass = ref('TinyVue')
const styleObj = ref({
  borderBottom: '1px solid rgb(25, 25, 25)',
  color: 'rgb(25, 25, 25)'
})
const executed = ref(false)
const tagData = ref([
  { index: 0, name: '热度最高', default: '热度最高' },
  { index: 1, name: '最新发布', default: '' },
  { index: 2, name: '综合排序', default: '' }
])
const activeTag = ref('热度最高')
const isSelectedTag = ref(false)
const styleTagObj = ref({
  border: '1px solid rgb(25, 25, 25)',
  color: 'rgb(25, 25, 25)',
  fontWeight: '600'
})
const executedTag = ref(false)

const emit = defineEmits(['tab-click', 'get-class', 'get-tag', 'change-data', 'change-video-data'])

const searchIndex = new FlexSearch.Index({ tokenize: 'forward' })
const articles = allData()

const addSearchIndex = (data) => {
  data.forEach((elem) => {
    searchIndex.add(elem.id, elem.title)
  })
}

// 技术文章模块
const getIndex = () => {
  articles.forEach((item) => {
    addSearchIndex(item.data)
  })
}

getIndex()

const getSearchValue = (searchResults, dataArr) => {
  const result = Array.from(searchResults)
    .map((pos) => {
      for (const item of dataArr) {
        if (item.data) {
          const matchingElement = item.data.find((elem) => Number(elem.id) === Number(pos['id']))
          if (matchingElement) {
            // 返回匹配的元素以及对应的 item.info
            return { ...matchingElement, info: item.info }
          }
        }
      }
      return null
    })
    .filter(Boolean) // 过滤掉可能的未找到项

  return result
}

const remoteMethod = (query) => {
  if (query !== undefined) {
    loading.value = true
    nextTick(async () => {
      loading.value = false
      const res = await useFlexSearch(articles, query)
      searchArr.value = getSearchValue(res, articles)
      return searchArr.value
    })
  }
}

const linkTo = (item) => {
  if (item.info.routeTo === 'article') {
    router.push({
      name: 'article',
      params: {
        mode: item.info.mode,
        type: item.info.type,
        serial: item.markId
      },
      query: {
        name: item.info.name,
        subName: item.info.subname
      }
    })
  } else if (item.info.routeTo === 'events') {
    router.push({
      name: 'articleWithoutType',
      params: {
        mode: item.info.mode,
        serial: item.markId
      },
      query: {
        name: item.info.name,
        type: item.info.type
      }
    })
    emit('change-data', item.info.type)
  } else {
    router.push({
      name: 'video'
    })
    sessionStorage.setItem('video-data', item.info.mode)
    window.open(`${item.link}`, '_blank')
    emit('change-video-data', item)
  }
}

const tabsFn = (val) => {
  currentData.value = props.data[`${val.name}`]
  if (props.showSelect) {
    aboutData.value = currentData.value['about']
    getDefault(aboutData.value[0].value)
  }
  emit('tab-click', {
    title: val.title,
    value: val.name,
    subtitle: aboutData.value[0]?.info || '',
    current: aboutData.value[0]?.value || ''
  })
}

const clear = () => {
  if (props.showSelect) {
    aboutData.value.forEach((item) => {
      item.default = ''
    })
  }
}

const getDefault = (msg) => {
  clear()
  activeClass.value = msg
  aboutData.value[0].default = msg
  executed.value = false
}

const getCurrentDefault = (msg) => {
  clear()
  activeClass.value = msg
  aboutData.value.filter((item) => {
    if (item.value === msg) {
      item.default = msg
    }
  })
  executed.value = false
}

const clickOptFn = (val) => {
  if (!executed.value) {
    clear()
  }
  isSelected.value = true
  activeClass.value = val.value
  executed.value = true
  emit('get-class', { name: activeClass.value, value: val.value })
}

const clickTagFn = (val) => {
  if (!executedTag.value) {
    tagData.value.forEach((item) => {
      item.default = ''
    })
  }
  isSelectedTag.value = true
  activeTag.value = val.value
  executedTag.value = true
  emit('get-tag', { value: activeTag.value })
}

const init = () => {
  videoTabs.value = props.tabsData
  videoName.value = props.tabsData[0]['name']
  if (props.type === 'article') {
    currentData.value = props.data['guide']
    aboutData.value = props.data['guide']['about']
  }
}

onMounted(() => {
  init()
})

defineExpose({
  currentData,
  aboutData,
  videoName,
  getCurrentDefault
})
</script>
