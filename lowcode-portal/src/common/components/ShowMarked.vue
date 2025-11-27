<template>
  <div id="editor">
    <div
      v-if="state.isMoutedMd"
      :class="['md', { 'show-content': state.isShowContent }]"
      v-html="compiledMarkdown"
    ></div>
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
    }
  },
  setup(props) {
    const state = reactive({
      isShowContent: false,
      contentList: [],
      activeId: '',
      isMoutedMd: false
    })

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

        return `<h${level} id="${id}" class="jump" >${text}</h${level}>`
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
      moveView
    }
  }
}
</script>

<style lang="less" scoped>
#editor {
  margin: auto;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  overflow-y: scroll;
  padding-right: 20px;

  .md {
    width: 80%;
  }

  .show-content {
    max-width: calc(100% - 200px);
    padding-right: 210px;
  }

  :deep(ul > li) {
    list-style: disc;
  }
}

.md-content {
  max-width: 200px;
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
