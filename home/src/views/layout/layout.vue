<template>
  <div class="main-layout hp100 f-c f-box-stretch" :theme-overrides="themeOverrides">
    <!-- tiny angular 菜单统一到一起  -->
    <div class="layout-content fi-1">
      <div class="layout-container">
        <div id="layoutSider" :class="{ 'is-collapsed': isSideCollapsed }" v-if="!isFrame && currentMenus?.length">
          <div class="left-menu-container">
            <component v-if="menuTopKey !== 'home'" :is="LeftMenu" :title="menuTitle" />
            <div class="left-menu-toggle-button" @click="toggleMenu">
              <i class="base-icon">
                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </i>
            </div>
            <div class="left-menu-border"></div>
          </div>
        </div>
        <div id="doc-layout">
          <div ref="contentRef" class="layout-scroll-container" @scroll="handleScroll" @click.capture="handleClick">
            <router-view class="grow1" />
            <div id="footer"></div>
            <back-to-top :visible="isShowBackTop" :click-event="backTop"></back-to-top>
            <component
              :is="TinyImage"
              v-if="previewSrc"
              style="display: none"
              ref="previewImgRef"
              :src="previewSrc"
              :preview-src-list="previewSrcList"
              :z-index="10000"
            ></component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="jsx">
import {
  defineComponent,
  reactive,
  computed,
  toRefs,
  watch,
  onMounted,
  onUnmounted,
  nextTick,
  ref,
  defineAsyncComponent,
  effectScope
} from 'vue'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
import html from 'highlight.js/lib/languages/xml'
import { router } from '@/router.js'
import { $t, appData, appFn, debounce, throttle, findParent, geneTitle, getRoutePath } from '@/tools'
import useData from '@/tools/useData.js'
import { currentMenus, currentMenuNode, setActiveIndex, isSideCollapsed } from '@/shared'
import BackToTop from './back-to-top.vue'
import { hiddenPanel, themeOverrides } from './layoutData.js'
import useWindowSize from '@/tools/useWindowSize.js'
import { iconLoadingShadow } from '@opentiny/vue-icon'

export default defineComponent({
  name: 'Layout_vue',
  props: ['menuTitle'],
  components: {
    BackToTop,
    IconLoading: iconLoadingShadow()
  },
  setup() {
    const state = reactive({
      hasHeader: true, // Header，当嵌入think时，无头。 所以预留变量
      menuTopKey: computed(() => router.currentRoute.value.name),
      isFrame: computed(() => router.currentRoute.value.meta?.iframe),
      contentRef: null,
      themeOverrides: themeOverrides,
      isShowBackTop: false,
      previewSrc: '',
      previewSrcList: [],
      previewImgRef: ref(null),
      isVirtualScroll: computed(() => ['interfaces', 'classes'].includes(router.currentRoute.value.params.cmpId)),
      isSideCollapsed,
      closeDeclineTime: 5
    })

    const LeftMenu = defineAsyncComponent({
      loader: () => import('./left-menu.vue'),
      loadingComponent: <IconLoading class="menu-loading"></IconLoading>
    })
    const TinyImage = defineAsyncComponent(() => import('@opentiny/vue-image'))

    hljs.registerLanguage('javascript', javascript)
    hljs.registerLanguage('css', css)
    hljs.registerLanguage('html', html)
    let routerCbDestory = null
    const scope = effectScope()

    const { width } = useWindowSize()

    const watchWidth = () => {
      if (width.value < 1000) {
        state.isSideCollapsed = true
      }
    }

    watchWidth()

    watch(
      () => width.value,
      () => watchWidth()
    )

    const closeViewer = () => state.previewImgRef?.closeViewer()
    const fn = {
      backTop() {
        if (state.isVirtualScroll) {
          setActiveIndex.value?.(0, 1000)
        } else {
          state.contentRef.scrollTo({ top: 0, behavior: 'auto' })
        }
      },
      handleScroll: debounce((event) => {
        state.isShowBackTop = event.target.scrollTop >= 500
      }, 20),
      handleClick: throttle(async (event) => {
        const markDownParent = findParent(event.target, (parent) =>
          /(^|\s)(markdown-body|click-captrue)(\s|$)/.test(parent?.className || '')
        )
        if (!markDownParent) {
          return
        }
        const { tagName, src, href, target } = event.target
        if (src && tagName?.toLowerCase() === 'img') {
          state.previewSrc = src
          const previewSrcList = Array.from(
            document.querySelectorAll(`.markdown-body img[src],.click-captrue img[src]`)
          )
            .map((item) => item.src)
            .filter(Boolean)
          const previewIndex = previewSrcList.indexOf(src)
          if (previewIndex > 0) {
            previewSrcList.push(...previewSrcList.splice(0, previewIndex))
          }
          state.previewSrcList = previewSrcList

          await nextTick()
          state.previewImgRef.clickHandler()
          await nextTick()
          document
            .querySelector('body > div.tiny-image-viewer.tiny-image-viewer__wrapper > div.tiny-image-viewer__mask')
            ?.addEventListener('click', closeViewer)
        } else if (tagName?.toLowerCase() === 'a' && href?.startsWith?.(location.origin) && target !== '_blank') {
          const routerPath = getRoutePath(href)
          if (routerPath) {
            event.preventDefault()
            router.push(routerPath)
          }
        }
      }, 200),
      toggleMenu: () => {
        state.isSideCollapsed = !state.isSideCollapsed
      }
    }
    onMounted(() => {
      hiddenPanel()
      // 每次切换路由，要导航到顶部
      routerCbDestory = router.afterEach((to, from) => {
        if (to?.path === from?.path) {
          return
        }
        state.contentRef.scrollTo({ top: 0, behavior: 'auto' })
      })
      scope.run(() => {
        watch(
          () => currentMenuNode.value?.label,
          (value) => {
            if (value) {
              document.title = geneTitle(value)
            }
          },
          { immediate: true }
        )
      })
    })
    onUnmounted(() => {
      routerCbDestory()
      scope.stop()
    })
    const { menuTitle } = useData()
    return { ...toRefs(state), hljs, appData, ...appFn, ...fn, currentMenus, LeftMenu, TinyImage, menuTitle } // appData：使用到里面的lang / configMode
  },
  mounted() {
    // 添加尾部导航
    // tinycommon.renderFooter()
  }
})
</script>
<style lang="less">
@import '@/mixin.less';
.main-layout {
  @keyframes infiniteRotate {
    from {
      transform: translateX(-50%) rotate(0);
    }
    to {
      transform: translateX(-50%) rotate(360deg);
    }
  }
  .menu-loading {
    width: 32px;
    height: 32px;
    left: 50%;
    top: 30%;
    position: absolute;
    animation: infiniteRotate 2s linear infinite;
  }
  .layout-content {
    --tiny-bezier: cubic-bezier(0.4, 0, 0.2, 1);
    --tiny-text-color: #191919;
    flex: 1;
    color: var(--n-text-color);
    background-color: var(--n-color);
    box-sizing: border-box;
    position: relative;
    z-index: auto;
    overflow: hidden;
    transition: box-shadow 0.3s var(--tiny-bezier), background-color 0.3s var(--tiny-bezier),
      color 0.3s var(--tiny-bezier);
  }
  .layout-container {
    display: flex;
    flex-flow: row;
    width: 100%;
    overflow-x: hidden;
    box-sizing: border-box;
    height: 100%;
  }
  #layoutSider {
    position: relative;
    transition: all 0.5s;
    width: 276px;
    max-width: 276px;
    display: flex;
    justify-content: flex-end;
    box-sizing: border-box;
    flex-shrink: 0;
    &.is-collapsed {
      width: 4px;
      max-width: 4px;
      .base-icon {
        transform: rotate(0);
      }
    }
  }
  .left-menu-container {
    min-width: 276px;
    overflow: hidden;
  }
  .left-menu-toggle-button {
    transition: color 0.3s var(--tiny-bezier), right 0.3s var(--tiny-bezier), left 0.3s var(--tiny-bezier),
      border-color 0.3s var(--tiny-bezier), background-color 0.3s var(--tiny-bezier);
    width: 24px;
    cursor: pointer;
    height: 24px;
    position: absolute;
    top: 50%;
    right: 0;
    transition: all 0.5s;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #191919;
    border: 1px solid rgb(239, 239, 245);
    background-color: #fff;
    box-shadow: 0 2px 4px 0px rgba(0, 0, 0, 0.06);
    transform: translateX(50%) translateY(-50%);
    z-index: 1;
  }
  .base-icon {
    transition: transform 0.3s var(--tiny-bezier);
    transform: rotate(180deg);
    height: 1em;
    fill: currentColor;
    width: 1em;
    text-align: center;
    line-height: 1em;
    display: inline-block;
    position: relative;
  }
  .left-menu-border {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    background-color: rgb(239, 239, 245);
    transition: background-color 0.3s var(--tiny-bezier);
    right: 0;
  }

  @media screen and (max-width: 815px) {
    #layoutSider {
      position: absolute;
      background: #fff;
      z-index: 9;
      &.is-collapsed .left-menu-toggle-button {
        transform: translateX(75%);
        top: 30%;
      }
    }
  }
}

.grow1 {
  flex-grow: 1;
}
#doc-layout {
  flex-grow: 1;
  width: 100%;
  > .layout-scroll-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: auto;
    // 表格组件demo区会将其父容器(.layout-scroll-container)宽度撑开超出中间内容区，设置此样式限制demo区容器的宽度
    width: 100%;
    scroll-behavior: smooth;
  }
}

body > div.tiny-image-viewer.tiny-image-viewer__wrapper {
  > .tiny-image-viewer__mask {
    cursor: pointer;
  }
  > .tiny-image-viewer__canvas {
    height: auto;
    width: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
    img.tiny-image-viewer__img {
      background-color: #fff;
      max-width: 80vw !important;
      max-height: 80vh !important;
      object-fit: contain;
    }
  }
  > .tiny-image-viewer__btn.tiny-image-viewer__actions {
    .tiny-image-viewer__actions-inner {
      justify-content: center;
      gap: 20px;
      .tiny-svg {
        margin: 0;
      }
      .tiny-image-viewer__actions-divider:nth-child(3),
      .tiny-svg:nth-child(4) {
        display: none;
      }
    }
  }
}
</style>
