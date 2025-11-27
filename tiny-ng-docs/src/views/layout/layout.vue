<template>
  <n-config-provider class="main-layout hp100 f-c f-box-stretch" :theme-overrides="themeOverrides">
    <!-- tiny angular 菜单统一到一起  -->
    <n-layout class="content-layout fi-1" :has-sider="!isFrame">
      <n-layout-sider
        id="layoutSider"
        v-if="!isFrame"
        bordered
        :collapsedWidth="4"
        :width="250"
        showTrigger="arrow-circle"
        :native-scrollbar="true"
      >
        <div class="menu-search">
          <n-input round :placeholder="$t('search')" clearable v-model:value="menuSearchValue"> </n-input>
        </div>
        <n-menu
          :value="menuSideKey"
          :default-expand-all="true"
          :options="menuOptions"
          v-show="!menuSearchValue"
          :indent="14"
        />
        <n-menu
          :value="menuSideKey"
          :default-expand-all="true"
          :options="searchMenuOptions"
          v-if="menuSearchValue"
          :indent="14"
        />
        <div v-if="menuSearchValue && !searchMenuOptions.length" class="no-seach-data">{{ $t('noData') }}</div>
      </n-layout-sider>
      <n-layout
        id="doc-layout"
        ref="contentRef"
        :native-scrollbar="true"
        content-style="display: flex;  flex-direction: column; height:100%"
        :class="'md-' + appData.configType"
        @scroll="handleScroll"
        @click="handleClick"
      >
        <n-message-provider>
          <router-view />
          <div class="back-top" @click="backTop" v-show="isShowBackTop">
            <div class="arrow"></div>
          </div>
          <n-image
            v-if="previewSrc"
            v-show="false"
            ref="previewImgRef"
            :src="previewSrc"
            :previewed-img-props="{ style: { backgroundColor: '#fff' } }"
          />
        </n-message-provider>
      </n-layout>
    </n-layout>
  </n-config-provider>
</template>
<script lang="jsx">
import { defineComponent, reactive, computed, toRefs, watch, onMounted, onUnmounted, nextTick, ref } from 'vue';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import html from 'highlight.js/lib/languages/xml';

import { genMenus } from '@/menus.jsx';
import { router } from '@/router.js';
import { $t, appData, appFn, debounce, throttle } from '@/tools';
import { setActiveIndex, activeIndex } from '../../shared/store';

import { hiddenPanel, menuDisplayToView, themeOverrides } from './layoutData.js';

const searchMenuItem = (menu, searchValue) => {
  if (!menu) {
    return null;
  }
  if (Array.isArray(menu)) {
    return menu.map(item => searchMenuItem(item, searchValue)).filter(Boolean);
  }
  const { children, label, searchKey } = menu;
  const isInclude = (a, b) =>
    typeof a === 'string' && typeof b === 'string' && a.toLowerCase().includes(b.toLowerCase());
  if (isInclude(searchKey, searchValue)) {
    return menu;
  }
  if (isInclude(label, searchValue)) {
    return menu;
  }

  const searchedChlid = searchMenuItem(children, searchValue);
  if (Array.isArray(searchedChlid) && searchedChlid.length) {
    return {
      ...menu,
      children: searchedChlid,
    };
  }
  return Array.isArray(menu) ? [] : null;
};

const findParent = (dom, fn) => {
  if (!dom) {
    return dom;
  }
  const parent = dom.parentNode || dom.parentElement;
  return fn(parent) ? parent : parent && findParent(parent, fn);
};

export default defineComponent({
  name: 'Layout_vue',
  props: [],
  setup() {
    let state = reactive({
      menuOptions: genMenus(),
      hasHeader: true, // Header，当嵌入think时，无头。 所以预留变量
      menuTopKey: computed(() => router.currentRoute.value.name),
      menuTop: [
        {
          label: () => <router-link to={import.meta.env.VITE_CONTEXT + 'docs/introduction'}>{$t('doc')}</router-link>,
          key: 'docs',
        },
        {
          label: () => (
            <router-link to={import.meta.env.VITE_CONTEXT + 'components/button'}>{$t('component')}</router-link>
          ),
          key: 'components',
        },
      ],
      menuSideKey: computed(() => router.currentRoute?.value?.path || ''),
      isFrame: computed(() => router.currentRoute.value.meta?.iframe),
      contentRef: null,
      themeOverrides: themeOverrides,
      menuSearchValue: sessionStorage.getItem('menuSearchValue') || '',
      isShowBackTop: false,
      previewSrc: '',
      previewImgRef: ref(null),
      isVirtualScroll: computed(() => ['interfaces', 'classes'].includes(router.currentRoute.value.params.cmpId)),
    });
    const searchMenuOptions = computed(() => {
      const menuSearchValue = state.menuSearchValue?.trim();

      if (!menuSearchValue) {
        return state.menuOptions;
      }
      const initialMenus = genMenus().value;

      const value = searchMenuItem(initialMenus, menuSearchValue);
      return value;
    });
    watch(
      () => appData.configType,
      () => {
        state.menuOptions = genMenus();
      }
    );
    // 用户清除搜索条件时，回到选中的菜单
    watch(
      () => state.menuSearchValue,
      (curValue, preValue) => {
        if (!curValue && preValue) {
          nextTick(() => {
            menuDisplayToView();
          });
        }
        sessionStorage.setItem('menuSearchValue', curValue || '');
      }
    );
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('css', css);
    hljs.registerLanguage('html', html);
    let routerCbDestory = null;
    onMounted(() => {
      hiddenPanel();
      menuDisplayToView();
      // 每次切换路由，要导航到顶部
      routerCbDestory = router.afterEach((to, from) => {
        if (to?.path === from?.path) {
          return;
        }
        state.contentRef.scrollTo({ top: 0, behavior: 'auto' });
        // 如果路由跳转是通过overview页面的卡片点击得来的，让左侧菜单的高亮元素进行滚动从而显示到可视区
        if (from?.name === 'componentsOverview') {
          // 延时是为了解决，获取到的当前路由是overview路由，左侧菜单高亮元素显示到可视区不生效的问题
          setTimeout(() => {
            menuDisplayToView();
          });
        }
      });
    });
    const fn = {
      backTop() {
        if (state.isVirtualScroll) {
          setActiveIndex.value?.(0, 1000);
        } else {
          state.contentRef.scrollTo({ top: 0, behavior: 'auto' });
        }
      },
      handleScroll: debounce(event => {
        state.isShowBackTop = event.target.scrollTop >= 500;
      }, 20),
      handleClick: throttle(async event => {
        const { tagName, src } = event.target;

        const markDownParent =
          src &&
          tagName?.toLowerCase() === 'img' &&
          findParent(event.target, parent => /(^|\s)markdown-body(\s|$)/.test(parent.className || ''));

        if (markDownParent) {
          state.previewSrc = src;
          await nextTick();
          state.previewImgRef.click();
        }
      }, 200),
    };
    onUnmounted(() => {
      routerCbDestory();
    });
    return { ...toRefs(state), hljs, appData, ...appFn, ...fn, searchMenuOptions }; // appData：使用到里面的lang / configMode
  },
});
</script>
<style lang="less">
.main-layout > .n-layout-scroll-container {
  display: flex;
  flex-direction: column;
}

.content-layout > .n-layout-scroll-container,
#doc-layout > .n-layout-scroll-container {
  display: flex;
  flex-direction: row;
}
.n-image-preview-container {
  z-index: 99999 !important;
}
.markdown-body img {
  cursor: pointer;
}

.menu-search {
  padding: 0 32px;
  margin: 32px 0;
  width: 100%;
  background-color: #fff;
  z-index: 99;
  position: sticky;
  top: 0;
  transform: translateX(-1px);
}
.no-seach-data {
  padding: 32px;
  font-size: 20px;
  text-align: center;
}
// hover时，右侧menu显示滚动条
.n-layout-sider-scroll-container {
  scroll-behavior: smooth;
  overflow: hidden !important;

  .n-menu-item-content {
    width: 240px;
  }

  &:hover {
    overflow: auto !important;
  }
}

@media (max-width: 1023px) {
  .n-layout-sider {
    display: none;
    position: fixed;
    height: 100%;
    z-index: 2002;
    .n-layout-sider-scroll-container {
      overflow-y: auto !important;
    }

    .n-layout-toggle-button {
      display: none;
    }
  }
  .n-menu {
    padding-bottom: 70px;
  }
}
.back-top {
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 12px;
  position: fixed;
  bottom: 94px;
  right: 225px;
  text-align: center;
  padding-top: 10px;
  z-index: 1000;
  box-shadow: 0 2px 8px 0px rgba(0, 0, 0, 0.12);
  transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  &:hover {
    box-shadow: 0 2px 12px 0px rgba(0, 0, 0, 0.18);
    .arrow {
      border: 2px solid #36ad6a;
      border-left-color: transparent;
      border-top-color: transparent;
    }
  }
}
@media (max-width: 1279px) {
  .back-top {
    bottom: 72px;
    right: 20px;
  }
}
.arrow {
  border: 1px solid #191919;
  width: 10px;
  height: 10px;
  border-left-color: transparent;
  border-top-color: transparent;
  transform: rotate(-135deg); //上箭头
  margin: 0 auto;
  margin-top: 10px;
}
</style>
