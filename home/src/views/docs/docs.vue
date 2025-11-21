<template>
  <div class="docs-root">
    <common-banner :title="getI18n(docJs?.title) || docTitle" :desc="docJs?.description && getI18n(docJs.description)"
      has-anchor></common-banner>
    <div class="docs">
      <div class="docs-container">
        <component id="doc_wrap" :is="docComponent" class="docs-content" />
        <!-- 目录列表 -->
        <div class="catalog sticky top60">
          <tiny-anchor id="anchor" :links="catalog" :key="anchorRefreshKey" type="dot" mask-class="custom-active-anchor"
            container-id="#doc-layout" @link-click="handleAnchorClick">
          </tiny-anchor>
        </div>
      </div>
    </div>
    <div id="footer"></div>
  </div>
</template>
<script setup>
import { ref, nextTick, effectScope, watch, onMounted, onUnmounted, computed, shallowRef } from 'vue'
import CommonBanner from '@/shared/components/common-banner.vue'
import { getI18n, getElementById, getDemoModule, dealHrefElement, scrollSmooth, useCopy } from '@/tools'
import { router } from '@/router.js'
import { currentMenuNode, VITE_CONTEXT } from '@/shared'
import { TinyAnchor } from '@opentiny/vue'

import useData from '@/tools/useData.js'
const { setMenuTitle } = useData()
setMenuTitle('组件设计规范')

const docTitle = computed(() => currentMenuNode.value?.label || '')

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

const catalog = ref([])
const docComponent = shallowRef(null)
const docJs = ref({})
const isLoading = ref(false)
const curDemoId = computed(() => router.currentRoute.value.hash?.replace(/^#\/?/, ''))
const [copyTip, copyText] = useCopy()

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
  catalog.value = Array.from(
    document
      .getElementById('doc_wrap')
      ?.querySelectorAll(
        router.currentRoute.value.path.startsWith(`${VITE_CONTEXT}opentiny-design/guide/develop`)
          ? 'h2[id],h3[id]'
          : 'h2[id]'
      ) || []
  ).map((h3) => {
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

const getOffsetTaget = () => {
  const dom = document.querySelector('#doc-layout .layout-scroll-container')
  if (dom && !originGetBoundingClientRect) {
    originGetBoundingClientRect = dom.getBoundingClientRect
    dom.getBoundingClientRect = function (...args) {
      const result = originGetBoundingClientRect.apply(this, args)
      return typeof result?.top === 'number' ? { ...result, top: result.top + 50 } : result
    }
  }
  return dom
}

const handleAnchorClick = async (ev) => {
  if (ev.target.tagName === 'A' && ev.target.hash?.startsWith('#')) {
    ev.stopPropagation?.()
    ev.stopImmediatePropagation?.()
    ev.preventDefault()
    const href = decodeURIComponent(ev.target.getAttribute('href'))
    router.replace({
      hash: href,
      query: router.currentRoute.value.query
    })
    await nextTick()
    scrollToActive()
  }
}

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

.docs-root {
  :deep(.tiny-anchor__wrapper) {
    .tiny-anchor {
      width: 232px;
    }

    a {
      text-decoration: none;
    }
  }
}

.docs-container {
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
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
  .pcPadding(48, 80, 130, 160);

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
</style>
