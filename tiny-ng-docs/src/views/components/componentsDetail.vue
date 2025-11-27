<template>
  <!-- 一个组件的文档:  描述md + demos + apis -->
  <div class="component-layout">
    <div class="author-info nav-bar box-shadow">
      <div style="display: flex; align-items: center">
        <div class="component-title">{{ componentTitle }}</div>
        <a
          v-if="currJson.codeLink"
          class="club-link"
          target="_blank"
          :href="currJson.codeLink"
          rel="noopener noreferrer"
        >
          {{ $t('codeLinkText') }}
        </a>
        <a
          v-if="currJson.designLink"
          class="club-link"
          target="_blank"
          :href="currJson.designLink"
          rel="noopener noreferrer"
        >
          {{ $t('designLinkText') }}
        </a>
      </div>
      <div v-if="currJson.owner" class="user" @click="copyText(currJson.owner)">
        {{ $t('doc-owner') }} :
        {{ currJson.owner }}
      </div>
    </div>
    <n-spin :show="cmpTopMdShow || currJsonShow">
      <div>
        <div class="nav-bar">
          <component class="markdown-body hidden-h1" :is="cmpTopMd"></component>
        </div>
      </div>
    </n-spin>
    <div v-if="tabsRulesDisplay.length > 1" class="tabs">
      <tiny-tabs v-model="tabValue" :key="'tabs-container' + tabsRulesDisplay.length">
        <tiny-tab-item
          :title="item.name"
          v-for="item in tabsRulesDisplay"
          :key="item.id"
          :name="item.id"
          :value="item.id"
        ></tiny-tab-item>
      </tiny-tabs>
    </div>
    <div ref="pageDiv" id="f-r" class="f-r pl40 docs-container">
      <div class="fi-1 w0 rel cmp-container">
        <div v-if="groupData.length > 1 && tabValue === 'example'" class="component-tab">
          <tiny-button-group
            size="medium"
            @change="groupChange"
            :data="groupData"
            v-model="groupValue"
          ></tiny-button-group>
        </div>
        <!-- 一个组件的文档:  描述md + demos + apis -->
        <template v-if="currJson?.demos?.length > 0 && tabValue === 'example'">
          <n-layout class="f-c f-wrap ofx-auto" :native-scrollbar="true">
            <template v-if="currJson.column === 'useGuid'">
              <div class="one-demo-col">
                <div>
                  <demo
                    v-for="demo in currJson.demos"
                    :key="demo.name"
                    :demo="demo"
                    ref="demoRefs"
                    :isActive="activeDemoIds.has(demo.demoId)"
                  />
                </div>
              </div>
            </template>
            <template v-else>
              <demo
                v-for="demo in currJson.demos"
                :key="demo.name"
                :demo="demo"
                ref="demoRefs"
                class="mb16"
                :isActive="activeDemoIds.has(demo.demoId)"
              />
            </template>
          </n-layout>
        </template>
        <!-- api表格 -->
        <template v-if="currJson.apis?.length > 0 && (tabValue === 'api' || isType)">
          <!-- apis 是一个数组 {name,type,properties:[原table内容],events:[] ...........} -->
          <template v-for="(oneGroup, index) in currJson.apis" :key="oneGroup.name">
            <div class="mt20" v-if="!isType || isActive(index)" :ref="ref => setRef(index, ref)">
              <div class="f-r f-pos-start fw-bold">
                <div :id="oneGroup.name" class="f18">{{ oneGroup.name }}</div>
                <div class="ml12 b-a-primary c-primary px8 py4">{{ oneGroup.type }}</div>
              </div>
              <div v-for="(oneApiArr, key) in oneGroup" :key="key">
                <template v-if="key !== 'name' && key !== 'type' && oneApiArr.length > 0">
                  <div class="f18 py28">{{ key }}</div>
                  <n-data-table class="api-table" v-bind="getApiTableOpt(oneApiArr, key, oneGroup.name)" />
                </template>
              </div>
            </div>
          </template>
        </template>
        <template v-if="tabValue === 'designStand' && designMd">
          <div ref="mdContainerRef">
            <component class="standard-md markdown-body mt24" :is="designMd"></component>
          </div>
        </template>

        <template v-if="tabValue === 'faq' && cmpFAQMd">
          <div ref="mdContainerRef">
            <component class="standard-md markdown-body mt24" :is="cmpFAQMd"></component>
          </div>
        </template>
        <template v-if="tabValue === 'designGuide' && designGuideMd">
          <div ref="mdContainerRef">
            <component class="standard-md markdown-body mt24" :is="designGuideMd"></component>
          </div>
        </template>
        <!-- 规范示例 -->
        <template v-if="tabValue === 'standard' && standardMd">
          <div ref="mdContainerRef">
            <component class="standard-md markdown-body mt24" :is="standardMd"></component>
          </div>
        </template>
        <!-- types表格 -->
        <template v-if="currJson.types">
          <n-data-table class="types-table mt20" v-bind="getTypesTableOpt(currJson.types)" />
        </template>
      </div>
      <!-- 文档导航：'demo','设计规范', '使用指南', '问答', 'api' -->
      <div class="catalog w160 sticky top32" @click.capture="handleApiAnchor">
        <n-anchor :show-rail="true" :offset-target="getOffsetTaget()" :ignore-gap="true" :show-background="true">
          <n-anchor-link v-for="anchor in docAnchors" :key="anchor.id" :title="anchor.text" :href="'#' + anchor.id" />
        </n-anchor>
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
  effectScope,
  nextTick,
  h,
  ref,
  effect,
  shallowRef,
} from 'vue';
import Tabs from '@opentiny/vue-tabs';
import TabItem from '@opentiny/vue-tab-item';
import ButtonGroup from '@opentiny/vue-button-group';
import demo from '@demo';
import { $t, $t2, $clone, getDemoModule, hasDemoModule, getI18n, debounce, scrollSmooth } from '@/tools';
import { router } from '@/router.js';
import { themeOverrides } from './cmpConfig';
import { VITE_CONTEXT, CUR_BUILD_TYPE, BUILD_TYPES } from '../../shared/const';
import { isCustomScroll, activeIndex, setActiveIndex } from '../../shared/store';
import { useVirtualScroll } from './virtual-scroll/use-virtual-scroll';

const ALL_GROUP_VALUE = '__ALL_GROUP_VALUE';

const state = reactive({
  langKey: $t2('zh-CN', 'en-US'),
  cmpId: computed(() => router.currentRoute.value.params.cmpId),
  currJson: { column: 1, demos: [], apis: [] },
  currJsonShow: true,
  cmpTopMd: null,
  cmpTopMdShow: true,
  cmpFAQMd: null,
  apiDiv: null,
  themeOverrides: themeOverrides,
  tabValue: computed({
    set(tabValue) {
      if (tabValue === state.tabValue) {
        return;
      }
      router.replace({
        query: {
          ...router.currentRoute.value.query,
          tabValue,
        },
      });
    },
    get() {
      const { tabValue = 'example' } = router.currentRoute.value.query || {};

      return tabValue;
    },
  }),
  tabWidth: '100%',
  componentTitle: null,
  links: null,
  useGuidMd: null,
  designMd: null,
  demosComponent: null,
  groupValue: '',
  groupData: [],
  designGuideMd: null,
  activeDemoIds: new Set(),
  standardMd: null,
  pageDiv: null,
});

const docFiles = computed(() => ({
  designStand: `@design${VITE_CONTEXT.replace('-', '')}${state.cmpId}${
    CUR_BUILD_TYPE === BUILD_TYPES.TINY_CLOUD ? '/service-component' : ''
  }/${state.cmpId}.${state.langKey}.md`,
  designGuide: `@design${VITE_CONTEXT.replace('-', '')}${state.cmpId}${
    CUR_BUILD_TYPE === BUILD_TYPES.TINY_CLOUD ? '/service-component' : ''
  }/${state.cmpId}.guide.${state.langKey}.md`,
  faq: `@demos/app/${state.cmpId}/webdoc/${state.cmpId}.faq.${$t2('cn', 'en')}.md`,
  webdoc: `@demos/app/${state.cmpId}/webdoc/${state.cmpId}.${$t2('cn', 'en')}.md`,
  cmpJs: `@demos/app/${state.cmpId}/webdoc/${state.cmpId}.js`,
  standard: `@demos/app/${state.cmpId}/webdoc/${state.cmpId}-standard.${state.langKey}.md`,
}));

const getTypesTableOptFn = typesArr => {
  return {
    columns: [
      {
        key: 'name',
        title: $t('name'),
        width: '20%',
        render: row => <div v-html={row.name} id={row.name}></div>,
      },
      {
        key: 'value',
        title: $t('typeValue'),
        width: '40%',
        render: row => <div v-html={row.value}></div>,
      },
      {
        key: 'desc',
        title: $t('desc'),
        width: '40%',
        render: row => <div v-html={row.desc[state.langKey]}></div>,
      },
    ],
    data: typesArr,
  };
};

const getApiTableOpt = (oneApiArr, apiName, groupName) => {
  return {
    columns: [
      {
        key: 'name',
        title: $t('name'),
        width: '20%',
        render: row => {
          return row.demoId ? (
            <a href={`?tabValue=example#${row.demoId}`} id={`${groupName}.${apiName}.${row.name}`}>
              {row.name}
            </a>
          ) : (
            <span id={`${groupName}.${apiName}.${row.name}`}> {row.name} </span>
          );
        },
      },
      {
        key: 'type',
        title: $t('propType'),
        width: '25%',
        render: row => <div class="route-anchor" v-html={row.type}></div>,
      },
      {
        key: 'defaultValue',
        title: $t('defValue'),
        width: '20%',
        render: row => <div class="route-anchor" v-html={row.defaultValue}></div>,
      },
      {
        key: 'desc',
        title: $t('desc'),
        width: '35%',
        render: row => <div class="route-anchor" v-html={row.desc[state.langKey]}></div>,
      },
    ],
    data: oneApiArr,
  };
};

// 获取 组件顶部标题 文档
const getWebdocs = async () => {
  try {
    state.cmpTopMd = await getDemoModule(docFiles.value.webdoc);
    await nextTick();
    state.componentTitle = document.getElementsByTagName('h1')?.[0]?.innerText;
    state.cmpTopMdShow = false;
  } catch (e) {
    state.cmpTopMdShow = false;
  }
};
// 获取问答文档
const getFaqMd = async () => {
  try {
    state.cmpFAQMd = await getDemoModule(docFiles.value.faq);
  } catch (e) {
    state.cmpFAQMd = null;
  }
};
// 获取设计规范、使用指南文档
const getDesignMd = async () => {
  if (CUR_BUILD_TYPE !== BUILD_TYPES.OPEN_DOCS) {
    const [designMd, designGuideMd] = await Promise.all([
      getDemoModule(docFiles.value.designStand).catch(() => null),
      getDemoModule(docFiles.value.designGuide).catch(() => null),
    ]);

    state.designMd = designMd;
    state.designGuideMd = designGuideMd;
  }
};
const curDemoId = computed(() => router.currentRoute.value.hash?.replace(/^#\/?/, ''));

const apis = computed(() => (['interfaces', 'classes'].includes(state.cmpId) ? state.currJson?.apis || [] : []));

const scrollToActiveDemo = async () => {
  try {
    isCustomScroll.value = true;
    await nextTick();
    if (isType.value && apis.value.length) {
      const activeIndexValue =
        curDemoId.value && apis.value.findIndex(item => item?.name?.split('.')[0] === curDemoId.value);
      if (activeIndexValue >= 0) {
        await setActiveIndex.value?.(activeIndexValue, 180);
      }
      isCustomScroll.value = false;
      return;
    }
    const scrollTarget =
      curDemoId.value && (document.getElementById(curDemoId.value) || document.querySelector(`#${curDemoId.value}`));
    const scrollContainer = document.querySelector('#doc-layout .n-layout-scroll-container');

    if (scrollTarget && scrollContainer) {
      const header = document.querySelector('.tinyui-design-header');
      const getTargetScrollTop = () => {
        const containerScrollTop = scrollContainer?.scrollTop;
        const headerHeight = header?.getBoundingClientRect().height || 60;
        const targetTop = scrollTarget.getBoundingClientRect().top;
        const changedScrollTop = containerScrollTop + targetTop - headerHeight - 120;
        return changedScrollTop;
      };
      await scrollSmooth(scrollContainer, getTargetScrollTop);
      state.activeDemoIds.add(curDemoId.value);
      await nextTick();
    }
    await loadMoreDemo();
    isCustomScroll.value = false;
  } catch (e) {
    isCustomScroll.value = false;
    throw e;
  }
};

// 获取组件配置文件
const getComponentConfig = async () => {
  const json = $clone(await getDemoModule(docFiles.value.cmpJs));
  state.currJson = {
    ...json,
    demos: $clone(json['demos'] || []), // 克隆一下,避免保存上次的isOpen
    column: json.column || '1', // columns可能为空
    title: json.title || state.cmpId,
  };
  state.demosComponent = $clone(json['demos'] || []);
  state.activeDemoIds.clear();
  const demoIdArr = [
    'button-focus',
    'alert-trigger-scroll',
    'text-focus',
    'dynamic-form-vertical',
    'delete-page',
    'dynamic-form-input',
    'dynamic-form-input-group',
    'delete-loading-page',
    'delete-loading-page-with-cancel',
  ];
  const tabArr = [];
  state.currJson.demos.forEach((item, index) => {
    if (item.groupName) {
      tabArr.push(getI18n(item, 'groupName'));
    }
    if (demoIdArr.includes(item.demoId)) {
      state.currJson.demos.splice(index, 1);
      state.currJson.demos.unshift(item);
    }
  });

  if (tabArr?.length > 0) {
    state.groupData = [
      ...Array.from(new Set(tabArr)).map(item => ({
        text: item,
        value: item,
      })),
      {
        text: $t('allGroup'),
        value: ALL_GROUP_VALUE,
      },
    ];
    state.groupValue = curDemoId.value
      ? state.currJson.demos.find(item => item.demoId === curDemoId.value)?.groupName?.[state.langKey] ||
        ALL_GROUP_VALUE
      : state.groupData[0].value;
    fn.groupChange(state.groupValue);
  } else {
    state.groupData = [];
  }
  state.currJsonShow = false;
};

const getStandardMd = async () => {
  state.standardMd = await getDemoModule(docFiles.value.standard).catch(() => null);
};

const loadPage = async () => {
  // 重置数据
  state.cmpTopMdShow = state.currJsonShow = true;
  state.activeDemoIds.clear();
  setActiveIndex.value?.(0);
  await scrollSmooth(scrollRef.value, 0);

  await Promise.all([
    // 获取 组件顶部标题 文档
    getWebdocs(),
    // 获取组件配置文件
    getComponentConfig().catch(() => {
      state.currJsonShow = false;
    }),
    // 获取问答
    getFaqMd(),
    // 获取设计规范、使用指南文档
    getDesignMd(),
    // 获取规范示例
    getStandardMd(),
  ]);

  await nextTick();

  scrollToActiveDemo();
};
const handleApiAnchor = ev => {
  if (ev.target.tagName === 'A' && ev.target.hash?.startsWith('#')) {
    ev.stopPropagation?.();
    ev.stopImmediatePropagation?.();
    ev.preventDefault();
    const href = ev.target.getAttribute('href');
    router.replace({
      hash: href,
      query: router.currentRoute.value.query,
    });
    scrollToActiveDemo();
  }
};

const mdContainerRef = ref(null);

const isType = computed(() => ['interfaces', 'types', 'classes'].includes(state.cmpId));

const tabsRules = computed(() => [
  {
    id: 'example',
    name: $t('example'),
    show: !isType.value,
  },
  {
    id: 'api',
    name: $t('application'),
    show: !isType.value,
  },
  {
    id: 'standard',
    name: $t('demoSpecification'),
    show: hasDemoModule(docFiles.value.standard),
  },
  {
    id: 'faq',
    name: 'Q&A',
    show: state.cmpId === 'select',
  },
]);

const tabsRulesDisplay = computed(() => tabsRules.value.filter(item => item.show));
const docAnchors = computed(() => {
  if (isType.value) {
    return [
      ...(state.currJson?.demos?.map(item => ({ id: item.demoId, text: getI18n(item, 'name') })) || []),
      ...(state.currJson?.apis?.map(item => ({ id: item.name, text: item.name })) || []),
      ...(state.currJson?.types?.map(item => ({ id: item.name, text: item.name })) || []),
    ];
  } else if (state.tabValue === 'example') {
    return state.currJson?.demos?.map(item => ({ id: item.demoId, text: getI18n(item, 'name') })) || [];
  } else if (state.tabValue === 'api') {
    const nameSet = new Set();
    const getNoRepeatName = (name, id) => (nameSet.has(name) ? id : nameSet.add(name) && name);
    return (
      state?.currJson?.apis
        ?.map?.(item => [
          {
            id: item.name,
            text: getNoRepeatName(item.name, item.name),
          },
          ...Object.entries(item)
            .filter(([key, value]) => (key !== 'type' || key !== 'name') && Array.isArray(value))
            .map(([key, value]) =>
              value.map(vItem => ({
                id: `${item.name}.${key}.${vItem.name}`,
                text: getNoRepeatName(vItem.name, `${item.name}.${key}.${vItem.name}`),
              }))
            ),
        ])
        .flat(3) || []
    );
  }
  return Array.from(mdContainerRef.value?.querySelectorAll('h2[id],h3[id]') || []).map(h3 => ({
    id: h3.id,
    text: h3.dataset.label || decodeURIComponent(h3.id),
  }));
});

const demoRefs = shallowRef([]);

const isInView = someDom => {
  if (!someDom?.getBoundingClientRect) {
    return false;
  }
  const viewTop = 175;
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;
  const { top, bottom } = someDom.getBoundingClientRect();
  return (
    (top < viewTop && bottom > viewTop) ||
    (top < viewHeight && bottom > viewHeight) ||
    (top >= viewTop && top <= viewHeight) ||
    (bottom >= viewTop && bottom <= viewHeight)
  );
};

/**
 * 滚动时加载更多组件
 * @param {number} loadCount 一次加载组件的数量，默认是1
 */
const loadMoreDemo = async (loadCount = 1) => {
  if (!demoRefs.value.length) {
    return;
  }
  let loadedCount = 0;

  const loadDemos = demoRefs.value
    .map(({ demo, rootRef }, index) => ({ demo, rootRef, index }))
    .filter(demoInstance => {
      const isToLoad =
        loadedCount < loadCount &&
        !state.activeDemoIds.has(demoInstance.demo.demoId) &&
        demoInstance?.rootRef &&
        isInView(demoInstance.rootRef);
      if (isToLoad) {
        loadedCount++;
      }
      return isToLoad;
    });
  if (loadDemos.length) {
    loadDemos.forEach(loadDemo => state.activeDemoIds.add(loadDemo.demo.demoId));
    await nextTick();
    await loadMoreDemo(loadCount);
  }
};

const scrollComponent = debounce(event => {
  if (isCustomScroll.value) {
    return;
  }
  loadMoreDemo(3);
}, 20);

const fn = {
  copyText: text => {
    navigator.clipboard.writeText(text);
  },
  getTypesTableOpt: typesArr => {
    return getTypesTableOptFn(typesArr);
  },
  initializePage: () => {
    const demoContainerEle = document
      .getElementById('doc-layout')
      .getElementsByClassName('n-layout-scroll-container')[0];
    demoContainerEle?.addEventListener('scroll', scrollComponent);
  },
  groupChange: value => {
    if (value === ALL_GROUP_VALUE) {
      state.currJson.demos = state.demosComponent;
    } else {
      state.currJson.demos = state.demosComponent.filter(demo => {
        const isGroup = demo.groupName[state.langKey] === value;
        if (!isGroup && state.activeDemoIds.has(demo.demoId)) {
          state.activeDemoIds.delete(demo.demoId);
        }
        return isGroup;
      });
    }
    nextTick(() => loadMoreDemo());
  },
};

const scrollRef = ref(null);

export default defineComponent({
  name: 'CmpDetail',
  components: {
    demo,
    TinyTabs: Tabs,
    TinyTabItem: TabItem,
    TinyButtonGroup: ButtonGroup,
  },
  setup() {
    const scope = effectScope();
    const onResize = () => loadMoreDemo();
    const onCmpIdChange = () => {
      if (!state.cmpId) {
        state.currJson = {};
      } else {
        loadPage();
      }
    };

    const onTabValueChange = async () => {
      await nextTick();
      if (state.pageDiv && scrollRef.value) {
        const { top } = state.pageDiv.getBoundingClientRect();
        const { scrollTop } = scrollRef.value;
        if (top < 175) {
          isCustomScroll.value = true;
          await scrollSmooth(scrollRef.value, scrollTop + top - 175);
          isCustomScroll.value = false;
        }
      }
      if (state.tabValue === 'example') {
        await loadMoreDemo();
      } else {
        state.activeDemoIds.clear();
      }
    };

    scope.run(() => {
      watch(
        () => [state.tabValue, state.cmpId],
        (a, [oldTabValue, oldCmpId]) =>
          {
            if (oldCmpId === state.cmpId && oldTabValue === state.tabValue) {
              return
            } 
            if (oldCmpId === state.cmpId) {
              onTabValueChange();
            } else {
              onCmpIdChange();
            }
          }
      );
    });
    let originGetBoundingClientRect;
    const getOffsetTaget = () => {
      const dom = document.querySelector('#doc-layout');
      if (dom && !originGetBoundingClientRect) {
        originGetBoundingClientRect = dom.getBoundingClientRect;
        dom.getBoundingClientRect = function (...args) {
          const result = originGetBoundingClientRect.apply(this, args);
          return typeof result?.top === 'number' ? { ...result, top: result.top + 115 } : result;
        };
      }
      return dom;
    };
    onMounted(() => {
      loadPage();
      const common = new window.TDCommon(['#footer'], {});
      common.renderFooter();
      fn.initializePage();
      window.addEventListener('resize', onResize);
      scrollRef.value = document.querySelector('#doc-layout .n-layout-scroll-container');
    });
    onUnmounted(() => {
      const demoContainerEle = document
        .getElementById('doc-layout')
        .getElementsByClassName('n-layout-scroll-container')[0];
      demoContainerEle.removeEventListener('scroll', scrollComponent);
      document.getElementById('doc-layout').style.marginTop = 0;
      if (originGetBoundingClientRect) {
        document.querySelector('#doc-layout').getBoundingClientRect = originGetBoundingClientRect;
      }
      window.removeEventListener('resize', onResize);
      scope.stop();
    });

    const [, { setActiveIndex: setActiveIndexFn, setRef, isActive }] = useVirtualScroll({
      items: apis,
      scrollContainer: () => scrollRef.value,
      preload: 5,
      activeIndex,
      stopper: computed(() => isCustomScroll.value || !isType.value),
      itemMinHeight: item => getApiLength(item) * 50,
    });
    setActiveIndex.value = setActiveIndexFn;
    const getApiLength = data =>
      Object.keys(data).reduce((memo, item) => memo + (Array.isArray(data[item]) ? data[item].length : 0), 0);
    return {
      ...toRefs(state),
      ...fn,
      tabsRulesDisplay,
      docAnchors,
      mdContainerRef,
      demoRefs,
      handleApiAnchor,
      getOffsetTaget,
      getApiTableOpt,
      isType,
      isActive,
      setRef,
      getApiLength,
    };
  },
});
</script>
<style lang="less" scoped>
.doc-container {
  min-height: 600px;
}
.component-layout {
  width: 100%;
  .docs-container {
    display: flex;
    flex-direction: row;
    gap: 40px;
    .cmp-container {
      padding-right: 60px;
      .mb16:last-of-type {
        margin-bottom: 0;
      }
    }
    .catalog {
      position: sticky;
      top: 135px;
      margin-top: 20px;
      bottom: 20;
      height: fit-content;
      max-height: calc(100vh - 250px);
      flex-shrink: 0;
      z-index: 897;
      overflow: hidden auto;
      right: 40px;

      &::-webkit-scrollbar {
        width: 5px;
        background-color: #f5f5f5;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background-color: #c1c1c1;
      }
    }
  }
}
.types-table a,
.api-table a {
  text-decoration: none;
  color: #5e7ce0;
  cursor: pointer;
}

.n-data-table-td {
  vertical-align: middle !important;
}

.n-anchor .n-anchor-link .n-anchor-link__title {
  font-size: 12px;
}
.n-tabs .n-tabs-nav.n-tabs-nav--card-type .n-tabs-tab.n-tabs-tab--active {
  color: #5073e5;
}
.one-demo-col2 {
  display: grid;
  gap: 16px;
  grid-template-columns: minmax(0px, 1fr) minmax(0px, 1fr);
  align-items: flex-start;

  > div {
    display: grid;
    gap: 16px;
    grid-template-columns: 100%;
  }
}

@media (max-width: 1279px) {
  .catalog {
    display: none;
  }
  #f-r {
    padding-right: 40px !important;
    margin-bottom: 20px;
  }
  .component-layout .docs-container .cmp-container {
    padding-right: 0;
  }
}

@media (max-width: 767px) {
  .one-demo-col2 {
    grid-template-columns: 100%;
  }
}
.tabs {
  margin-top: 20px;
  position: sticky;
  top: 74px;
  z-index: 899;
  background-color: #fff;
  padding: 0 40px;
}
.author-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  z-index: 900;
  background: #fff;
  top: 0;
  width: 100%;
  height: 75px;
  .user {
    border: 1px solid #979797;
    border-radius: 25px;
    padding: 14px 21px;
    color: #191919;
  }
}
.nav-bar {
  ::v-deep .hidden-h1 h1 {
    display: none;
  }
}
.box-shadow {
  box-shadow: 12px 0px 19px 6px rgba(0, 0, 0, 0.06);
}
.nav-bar {
  padding: 16px 32px 16px 39px;
}
::v-deep(.n-tabs.n-tabs--flex .n-tabs-nav .n-tabs-wrapper) {
  width: 20% !important;
}
::v-deep(.n-tabs.n-tabs--top .n-tab-pane) {
  padding: 0 !important;
}
::v-deep(.markdown-body h1) {
  margin: 0 !important;
}
::v-deep(.tiny-tabs__item:hover) {
  color: #5e7ce0 !important;
}
::v-deep(.tiny-anchor-link-title) {
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: left;
  color: #595959;
  line-height: 22px;
  margin-top: 2px;
}
::v-deep(.tiny-tabs__content) {
  display: none;
}
::v-deep(.tiny-tabs__item.is-active) {
  color: #5e7ce0 !important;
}
::v-deep(.tiny-tabs__item__title) {
  font-size: 20px;
}
.component-title {
  font-size: 2em;
  font-family: PingFang SC, PingFang SC-Semibold;
  font-weight: 600;
  text-align: left;
  color: #191919;
  line-height: 1.5em;
}
.club-link {
  text-decoration: none !important;
  margin-left: 10px;
  color: #5e7ce0;
  font-size: 15px;
}
.standard-md {
  padding-top: 50px;
}
.component-tab {
  margin-top: 20px;
}
</style>
