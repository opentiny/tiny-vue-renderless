<template>
  <div class="overview">
    <common-banner
      title="总览"
      desc="Cloud Design System提供了丰富的规范文档及开发组件，我们还将持续探索最佳用户体验规范，欢迎使用Cloud Design System。"
    ></common-banner>
    <div class="overview-body">
      <div class="overview-body-inner">
        <div class="overview-body-search">
          <tiny-input placeholder="搜索" v-model="menuSearchValue" clearable>
            <template #prefix>
              <tiny-icon-search />
            </template>
          </tiny-input>
        </div>
        <div class="overview-body-components">
          <div class="components" v-for="menus in displayMenus" :key="menus.key">
            <component-overview-list :components="menus"></component-overview-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="js">
import { effectScope, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import CommonBanner from '@/shared/components/common-banner.vue';
import { Input as TinyInput} from '@opentiny/vue';
import { iconSearch } from '@opentiny/vue-icon';
import { currentMenus } from '@/shared/menus';
import { searchMenuItem } from '@/tools';

import ComponentOverviewList from './overviewConpoments.vue'

import useData from '@/tools/useData.js'
const { setMenuTitle } = useData()
setMenuTitle('UX体验设计规范')

const TinyIconSearch = iconSearch();

const menuSearchValue = ref(null);
const displayMenus = ref([]);



const scope = effectScope();
onMounted(() => {
  scope.run(() => {
    watch(
        () => [currentMenus.value, menuSearchValue.value],
        () => {
          const overviewMenuIndex = Math.max(currentMenus.value.findIndex(item => item.label === '总览') + 1, 1);
          displayMenus.value = searchMenuItem(currentMenus.value?.slice(overviewMenuIndex), menuSearchValue.value);
        },
        { immediate: true }
    );
  });
});
onBeforeUnmount(() => {
  scope.stop();
});
</script>
<style lang="less" scoped>
.overview {
  &-body {
    padding: 24px var(--tiny-main-container-padding-horizontal) 130px;
    &-inner {
      margin: 0 auto;
      max-width: var(--tiny-main-container-width);
    }
    &-search {
      ::v-deep(.tiny-input) {
        .tiny-input__inner {
          border: 1px solid #c2c2c2;
          border-radius: 17px;
          height: 32px;
          font-size: 14px;
          font-weight: 400;
          color: #808080;
        }
        .tiny-input__prefix {
          left: 10px;
          svg {
            fill: #808080;
          }
        }
        .tiny-input__suffix {
          right: 36px;
          svg {
            fill: #808080;
          }
        }
      }
    }

    &-components {
    }
  }
}
</style>
