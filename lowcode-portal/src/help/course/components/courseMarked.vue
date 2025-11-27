<template>
  <div id="editor" class="only-iditor">
    <div :class="['md', { 'show-content': state.isShowContent }]">
      <div v-if="state.isMoutedMd" v-html="compiledMarkdown"></div>
      <a
        class="md-goto"
        :href="`https://github.com/opentiny/tiny-engine/edit/develop/${docTimeObj.name}`"
        target="_blank"
      >
        <svg-icon class="md-goto-icon" name="edit"></svg-icon>
        在GitHub上编辑此页
      </a>
      <div class="md-opt">
        <div v-if="preAndNextTitle.pre" @click="handleClick(preAndNextTitle.pre)">
          <span>上一章</span>
          <span class="md-opt-name">{{ preAndNextTitle.pre.label }}</span>
        </div>
        <div v-if="preAndNextTitle.next" @click="handleClick(preAndNextTitle.next)">
          <span>下一章</span>
          <span class="md-opt-name">{{ preAndNextTitle.next.label }}</span>
        </div>
      </div>
    </div>
    <div v-if="isUseContent" class="md-content">
      <div class="icon">目录</div>
      <div class="list-content">
        <a
          v-for="value in state.contentList"
          :key="value.id"
          :class="['jump', 'jump-' + value.level, { active: state.activeId === value.id }]"
          @click="moveView(value.id)"
        >
          {{ value.text }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted, watchEffect } from 'vue'
import { marked } from 'marked'

const rendererMD = new marked.Renderer()

export default {
  props: {
    md: {
      type: String,
      default: ''
    },
    isUseContent: {
      type: Boolean,
      default: true
    },
    preAndNextTitle: {
      type: Object,
      default: () => ({})
    },
    docTimeObj: {
      type: String,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    const state = reactive({
      isShowContent: false,
      contentList: [],
      activeId: '',
      isMoutedMd: false
    })

    const getGmtTime = (dateForm) => {
      if (dateForm === '') {
        return ''
      } else {
        return new Date(new Date(dateForm).getTime() + 8 * 3600 * 1000).toISOString().replace('T', ' ').split('.')[0]
      }
    }

    const compiledMarkdown = computed(() => {
      let index = 0

      state.contentList = []

      rendererMD.heading = function (text, level) {
        const id = `md${index++}`

        state.contentList.push({
          level,
          id,
          text
        })

        return id === 'md0'
          ? `<h${level} id="${id}" class="jump" >${text}<div class="time">更新时间：${getGmtTime(
              props.docTimeObj.time
            )}</div></h${level}>`
          : `<h${level} id="${id}" class="jump" >${text}</h${level}>`
      }

      return marked(props.md, { sanitize: false })
    })

    const moveView = (id) => {
      state.activeId = id
      const target = document.querySelector('#' + id)
      const scrollEl = document.getElementById('editor')

      scrollEl.scrollTop = target.offsetTop - 120
    }

    watchEffect(() => {
      const topId = state.contentList[0]?.id

      if (topId) {
        moveView(topId)
      }
    })

    const handleClick = (item) => {
      emit('preOrNextClick', item)
    }

    // 页面滚动，目录导航跟随高亮
    const syncPageScroll = () => {
      state.contentList.forEach((item) => {
        const target = document.querySelector('#' + item.id)
        const scrollEl = document.getElementById('editor')

        if (scrollEl.scrollTop > target.offsetTop - 150) {
          state.activeId = item.id
        }
      })
    }

    // 监听页面滚动
    document?.querySelector('.markdown-body')?.addEventListener('scroll', syncPageScroll, true)

    onMounted(() => {
      marked.setOptions({
        renderer: rendererMD,
        gfm: true,
        breaks: false,
        pedantic: false,
        smartLists: true,
        sanitize: true,
        smartypants: false
      })

      state.isMoutedMd = true
    })

    return {
      state,
      compiledMarkdown,
      moveView,
      handleClick
    }
  }
}
</script>

<style lang="less" scoped>
#editor,
.only-iditor {
  margin: auto;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  overflow-y: scroll;
  padding-right: 20px;

  .md {
    width: 80%;
    padding: 0 64px 0 32px;
  }

  .show-content {
    max-width: calc(100% - 250px);
    padding-right: 210px;
  }

  :deep(ul > li) {
    list-style: disc;
  }

  :deep(.time) {
    font-size: 14px;
    font-weight: 400;
    margin-top: 12px;
    line-height: 22px;
  }

  .md-goto {
    color: #1476ff;
    font-size: 14px;
    cursor: pointer;
    text-decoration: inherit;
    .md-goto-icon {
      margin-right: 3px;
    }
  }

  .md-opt {
    display: flex;
    gap: 32px;
    font-size: 14px;
    margin-top: 24px;
    & > div {
      text-align: center;
      width: 100%;
      height: 44px;
      line-height: 44px;
      color: #808080;
      border-radius: 8px;
      border: 1px solid #dbdbdb;
      cursor: pointer;
      &:hover {
        background: #f5f5f5;
      }
    }
    .md-opt-name {
      margin-left: 15px;
      color: #191919;
    }
  }
}

.md-content {
  max-width: 250px;
  padding: 5px;
  overflow: auto;
  border-radius: 4px;
  position: sticky;
  top: 0;

  .icon {
    text-align: left;
    cursor: pointer;
    margin-bottom: 6px;

    &:hover {
      color: #869de7;
    }
  }

  .list-content {
    width: 200px;

    .jump {
      display: block;
      color: rgba(0, 0, 0, 0.5);

      &:hover {
        color: #869de7;
      }

      padding: 2px 4px;
      font-size: 14px;
    }

    .jump-1 {
      font-weight: bold;
    }

    .jump-2 {
      padding-left: 10px;
    }

    .jump-3 {
      padding-left: 20px;
    }

    .jump-4 {
      padding-left: 30px;
    }

    .active {
      border-left: 2px solid #869de7;
      color: #869de7;
    }
  }
}
</style>
