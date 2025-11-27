<template>
  <tiny-config-provider class="content-provider" :design="designSmbConfig">
    <div class="app">
      <common-header v-show="headerShow"></common-header>
      <div :class="['content-wrap', { 'is-show-header': !headerShow }]">
        <router-view :key="$route.meta.activeMenuName"></router-view>
      </div>
      <common-help-float-bar v-if="isInternalEnv()"></common-help-float-bar>
    </div>
  </tiny-config-provider>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ConfigProvider as TinyConfigProvider } from '@opentiny/vue'
import designSmbConfig from '@opentiny/vue-design-smb'
import Header from './common/components/Header.vue'
import HelpFloatBar from './common/components/HelpFloatBar.vue'
import './theme/reset.less'
import { isInternalEnv } from './utils/env'

export default {
  components: {
    CommonHeader: Header,
    CommonHelpFloatBar: HelpFloatBar,
    TinyConfigProvider
  },
  setup() {
    const route = useRoute()

    const headerShow = computed(() => route.name !== 'applicationVisit')

    return {
      headerShow,
      designSmbConfig,
      isInternalEnv
    }
  }
}
</script>

<style lang="less" scoped>
html,
body {
  height: 100%;
}
.content-provider {
  height: 100%;
}
.app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .header-wrap {
    width: 100%;
    background: #fff;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
  }
  .content-wrap {
    width: 100%;
    height: calc(100% - 57px);
    margin-top: 57px;
    display: flex;
    flex-direction: column;
    overflow: auto;
    &.is-show-header {
      height: 100%;
      margin-top: 0;
    }
  }

  :deep(.monaco-editor .suggest-widget) {
    border-width: 0;
  }
}
</style>
