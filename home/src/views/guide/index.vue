<template>
  <div class="guide-root">
    <div class="docs f-r">
      <tiny-modal v-model="showModal" title="请注意" status="warning" show-footer>
        <div class="modal-body">
          TinyVue 从 <span class="modal-body-keyword">3.13.0</span> 开始不需要在
          <span class="modal-body-keyword">vite.config.js</span> 文件中配置
          <span class="modal-body-keyword">define: { 'process.env': { ...process.env } }</span>
          这段代码，这段代码会导致环境变量被打包到构建产物中，引起信息安全风险，请业务尽快升级到
          <span class="modal-body-keyword">3.13.0</span> 或以上版本！如果不升级版本可以改成：<span
            class="modal-body-keyword"
            >define: { 'process.env': { }}</span
          >
          同样也可以解决此问题！感谢您对 TinyVue 的支持！
        </div>
        <template #footer>
          <tiny-button type="primary" :disabled="disabled" @click="handleConfirm">{{
            disabled ? `${time}S 后可关闭此提示` : '确认将不再弹出此提示'
          }}</tiny-button>
          <tiny-button @click="handleCancel">取消</tiny-button>
        </template>
      </tiny-modal>
      <component id="doc_wrap" :is="docComponent" class="w0 fi-1" />
      <!-- 目录列表 -->
      <div class="catalog sticky top60">
        <tiny-anchor
          id="anchor"
          :links="catalog"
          type="dot"
          mask-class="custom-active-anchor"
          container-id="#doc-layout"
        >
        </tiny-anchor>
      </div>
    </div>
    <div id="footer"></div>
  </div>
</template>
<script setup>
import { ref, nextTick, effectScope, watch, onMounted, onUnmounted, computed, shallowRef } from 'vue'
import { TinyAnchor, TinyModal, TinyButton } from '@opentiny/vue'
import { getElementById, getDemoModule, dealHrefElement, scrollSmooth, useCopy } from '../../tools'
import { router } from '@/router.js'
import useData from '@/tools/useData.js'

const props = defineProps({
  jsPath: {
    type: String,
    default: ''
  },
  mdPath: {
    type: String,
    default: ''
  }
})

const { setMenuTitle } = useData()

setMenuTitle('指南')

const catalog = ref([])
const docComponent = shallowRef(null)
const docJs = ref({})
const isLoading = ref(false)
const curDemoId = computed(() => router.currentRoute.value.hash?.replace(/^#\/?/, ''))
const tipFlag = localStorage.getItem('tiny-vue-env-tip')
// 暂时屏蔽公告栏
const showModal = ref(false)
const disabled = ref(true)
let time = ref(5)
if (showModal.value) {
  let timer = setInterval(() => {
    if (time.value > 0) {
      time.value = time.value - 1
    } else {
      disabled.value = false
      clearInterval(timer)
      timer = null
    }
  }, 1000)
}
const handleConfirm = () => {
  showModal.value = false
  localStorage.setItem('tiny-vue-env-tip', 'never')
}
const handleCancel = () => {
  showModal.value = false
}

const scrollToActive = async () => {
  const scrollTarget = getElementById(curDemoId.value)
  const scrollContainer = document.querySelector('#doc-layout .layout-scroll-container')

  if (scrollTarget && scrollContainer) {
    await scrollSmooth(
      scrollContainer,
      () => scrollContainer.scrollTop + scrollTarget.getBoundingClientRect().top - 64 - 50
    )
  }
}

const loadPage = async () => {
  isLoading.value = true
  const [docComponentValue, docJsValue] = await Promise.all([
    Promise.resolve(getDemoModule(props.mdPath)).catch(() => null),
    Promise.resolve(getDemoModule(props.jsPath)).catch(() => null)
  ])

  docComponent.value = docComponentValue
  docJs.value = docJsValue
  isLoading.value = false
  await nextTick()
  catalog.value = Array.from(document.getElementById('doc_wrap')?.querySelectorAll('h2[id]') || []).map((h3) => {
    const text = h3.innerText || h3.dataset.label || decodeURIComponent(h3.id)
    return {
      key: decodeURIComponent(h3.id),
      title: text.replace(/^\s*@cloud\/tiny(cloud|3|plus3)\s*@\s*/, ''),
      link: decodeURIComponent(`#${h3.id}`)
    }
  })
  await nextTick()
  dealHrefElement()
  await scrollToActive()
}

const scope = effectScope()

let originGetBoundingClientRect

onMounted(() => {
  scope.run(() => {
    watch(
      () => [props.jsPath, props.mdPath],
      () => {
        loadPage()
      },
      { immediate: true }
    )
  })
})

onUnmounted(() => {
  scope.stop()
  if (originGetBoundingClientRect) {
    document.querySelector('#doc-layout .layout-scroll-container').getBoundingClientRect = originGetBoundingClientRect
  }
})
</script>
<style lang="less" scoped>
@import '@/mixin.less';

.modal-body {
  font-size: 14px;
}

.modal-body .modal-body-keyword {
  color: var(--tv-base-color-error-6);
}

.guide-root {
  :deep(.tiny-anchor__wrapper) {
    .tiny-anchor {
      width: 232px;
    }
    a {
      text-decoration: none;
    }
  }
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: #f5f6f7;
  padding: 0 0 0 120px;
  border-radius: 4px;
  height: 50px;
  margin-top: 53px;
  top: 0;
  font-size: 40px;
  font-family: PingFang SC, PingFang SC-Semibold;
  font-weight: 600;
  line-height: 60px;
  text-align: justify;
  color: #191919;
  z-index: 90;
  &.sticky {
    font-size: 18px;
  }
  &.absolute {
    z-index: 91;
  }
  .owner {
    font-size: 14px;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    color: #1a1a1a;
    margin-right: 40px;
    cursor: copy;
    display: flex;
    align-items: center;
    height: 30px;
  }
}
.style-container {
  padding: 8px 120px 48px 120px;
  background: #f5f6f7;
  .style-description {
    font-size: 14px;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    text-align: left;
    color: #595959;
    line-height: 22px;
  }
}
.catalog {
  overflow: hidden auto;
  position: sticky;
  z-index: 89;
  margin-top: 64px;
  width: 232px;
  bottom: 0;
  max-height: calc(100vh - 200px);
  height: fit-content;
  padding-bottom: 20px;
  flex-shrink: 0;
}

.catalog::-webkit-scrollbar {
  width: 5px;
  background-color: #f5f5f5;
}

.catalog::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: #c1c1c1;
}

@media (max-width: 1279px) {
  .catalog {
    display: none;
  }
}

.docs {
  width: 100%;
  display: flex;
  flex-flow: row;
  align-items: start;
  gap: 70px;
  z-index: 1;
  .pcPadding(48, 40, 130, 160);

  :deep(.tiny-tabs__item) {
    align-items: flex-start;
    .tiny-tabs__item__title {
      color: #595959;
      &:hover {
        color: #494949;
      }
    }
    &.is-active .tiny-tabs__item__title {
      color: #191919 !important;
    }
  }
  :deep(.tiny-tabs__active-bar) {
    height: 2px;
    background-color: #191919;
  }
}

/* md样式会和首页代码块样式冲突，因此将prismjs/themes/prism.css的样式包裹一层 */
.guide-root {
  &:deep(div) {
    code[class*='language-'],
    pre[class*='language-'] {
      font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
      color: black;
      background: none;
      font-size: 1em;
      text-shadow: 0 1px white;
      text-align: left;
      white-space: pre;
      word-spacing: normal;
      text-shadow: none;
      word-break: normal;
      word-wrap: normal;
      line-height: 1.5;

      -moz-tab-size: 4;
      -o-tab-size: 4;
      tab-size: 4;

      -webkit-hyphens: none;
      -moz-hyphens: none;
      -ms-hyphens: none;
      hyphens: none;
    }

    pre[class*='language-'] ::-moz-selection,
    pre[class*='language-']::-moz-selection,
    code[class*='language-'] ::-moz-selection,
    code[class*='language-']::-moz-selection {
      text-shadow: none;
      background: #b3d4fc;
    }

    pre[class*='language-'] ::selection,
    pre[class*='language-']::selection,
    code[class*='language-'] ::selection,
    code[class*='language-']::selection {
      text-shadow: none;
      background: #b3d4fc;
    }

    /* Code blocks */
    pre[class*='language-'] {
      margin: 0.5em 0;
      padding: 1em;
      overflow: auto;
    }

    :not(pre) > code[class*='language-'],
    pre[class*='language-'] {
      background: #fafafa;
    }

    /* Inline code */
    :not(pre) > code[class*='language-'] {
      padding: 0.1em;
      border-radius: 0.3em;
      white-space: normal;
    }

    .token.prolog,
    .token.comment,
    .token.doctype,
    .token.cdata {
      color: slategray;
    }

    .token.punctuation {
      color: #999;
    }

    .token.namespace {
      opacity: 0.7;
    }

    .token.tag,
    .token.property,
    .token.number,
    .token.boolean,
    .token.symbol,
    .token.constant,
    .token.deleted {
      color: #905;
    }

    .token.attr-name,
    .token.selector,
    .token.char,
    .token.string,
    .token.builtin,
    .token.inserted {
      color: #690;
    }

    .token.entity,
    .token.operator,
    .language-css .token.string,
    .token.url,
    .style .token.string {
      color: #9a6e3a;
    }

    .token.attr-value,
    .token.atrule,
    .token.keyword {
      color: #07a;
    }

    .token.function,
    .token.class-name {
      color: #dd4a68;
    }

    .token.important,
    .token.regex,
    .token.variable {
      color: #e90;
    }

    .token.important,
    .token.bold {
      font-weight: bold;
    }
    .token.italic {
      font-style: italic;
    }

    .token.entity {
      cursor: help;
    }
    // 高亮行样式
    .highlighted-line {
      display: block;
      background-color: #fff4eb;
      margin: 0 -14px;
      padding: 0 14px;
    }
  }
}
</style>
