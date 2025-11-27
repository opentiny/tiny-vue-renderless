<template>
  <div>
    <n-spin :show="isLoading">
      <div class="header-container" v-if="isBaseStyle && baseStyleJson" ref="headerRef">
        <label class="style-title">{{ getI18n(baseStyleJson.title) }}</label>
        <label class="style-description"> {{ getI18n(baseStyleJson.description) }}</label>
      </div>
    </n-spin>
    <div class="docs f-r pt48 pl48 pr48 pb155">
      <component id="doc_wrap" :is="isBaseStyle ? baseStyleComponent : docMDs[currPage]" class="w0 fi-1" />
      <!-- 目录列表 -->
      <div class="catalog w128 sticky top32 ml24">
        <n-anchor :show-rail="true" offset-target="#doc-layout" :ignore-gap="true" :show-background="true">
          <n-anchor-link v-for="cat in catalog" :key="cat.id" :title="cat.text" :href="`#${cat.id}`" />
        </n-anchor>
      </div>
    </div>
    <div id="footer"></div>
  </div>
</template>
<script setup>
import { ref, nextTick, effectScope, watch, onMounted, onUnmounted, computed } from 'vue';
import { $t2, getI18n } from '@/tools';
import { router } from '@/router.js';

import docMDs from './docConfig.js';
import { baseStyleComponents, baseStyleInfo } from './baseStylesConfig';

const currPage = ref('');
const catalog = ref([]);
const isBaseStyle = computed(() => router.currentRoute.value.path.includes('/tiny-cloud/base-styles/'));
const langKey = $t2('zh-CN', 'en-US');
const baseStyleComponent = ref(null);
const baseStyleJson = ref({});
const isLoading = ref(false);

const loadPage = async () => {
  if (isBaseStyle.value) {
    const { baseStyleId, baseStyleChildId } = router.currentRoute.value.params;
    const pathPrefix = [baseStyleId, baseStyleChildId, baseStyleChildId || baseStyleId].filter(Boolean).join('/');
    isLoading.value = true;
    await Promise.all([
      Promise.resolve(baseStyleComponents[`${pathPrefix}.${langKey}.md`]?.())
        .catch(() => null)
        .then(component => {
          baseStyleComponent.value = component?.default;
        }),
      Promise.resolve(baseStyleInfo[`${pathPrefix}.js`]?.())
        .catch(() => null)
        .then(json => {
          baseStyleJson.value = json?.default;
        }),
    ]);
    isLoading.value = false;
  } else {
    let suffix = $t2('', '-en');
    currPage.value = `${router.currentRoute.value.params.docId}${suffix}.md`;
    isLoading.value = false;
  }
  await nextTick();
  catalog.value = Array.from(document.getElementById('doc_wrap')?.querySelectorAll('h2[id],h3[id]') || []).map(h3 => {
    const title = h3.dataset.label || decodeURIComponent(h3.id);
    let text = '';
    if (title.indexOf('tiny3') >= 0) {
      //  匹配tiny3
      text = title.replace(/^@opentiny\/tiny3/g, '').split('（')[0];
    } else if (title.indexOf('tinycloud') >= 0) {
      //  匹配tinycloud
      text = title.replace(/^@opentiny\/tinycloud/g, '').split('（')[0];
    } else {
      // 其他截取掉括号中的内容
      text = title.split('（')[0];
    }
    return {
      id: h3.id,
      text: text,
    };
  });
};

const scope = effectScope();
scope.run(() => {
  watch([router.currentRoute, () => appData.configMode], () => {
    loadPage();
  });
});
onMounted(() => {
  loadPage();
  nextTick(() => {
    const common = new window.TDCommon(['#footer'], {});
    common.renderFooter();
  });
});

onUnmounted(() => scope.stop());
</script>
<style lang="less">
.header-container {
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  background: #f5f6f7;
  padding: 48px 0 48px 48px;
  border-radius: 4px;

  .style-title {
    font-size: 40px;
    font-family: PingFang SC, PingFang SC-Semibold;
    font-weight: 600;
    text-align: justify;
    color: #191919;
  }
  .style-description {
    margin-top: 10px;
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
  z-index: 999;
  right: 40px;
  top: 20px;
  margin-top: 88px;
  bottom: 0;
  max-height: calc(100vh - 200px);
  height: fit-content;
  flex-shrink: 0;
}

.catalog::-webkit-scrollbar {
  width: 5px;
  background-color: #f5f5f5;
}

.catalog::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #c1c1c1;
}

.n-anchor .n-anchor-link .n-anchor-link__title {
  font-size: 12px;
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
  gap: 60px;
}
</style>
