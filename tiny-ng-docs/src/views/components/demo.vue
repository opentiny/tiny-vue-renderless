<template>
  <div :id="demo.demoId" class="br-sm pt20" :class="currDemoId == demo.demoId ? 'b-a-success' : ''" ref="rootRef">
    <div class="demo">
      <!-- DEMO 的标题 + 说明desc+  示例wcTag -->
      <div class="f-r f-pos-between f-box-end pb20">
        <div class="f18 cur-hand title-component">{{ demo.name[langKey] }}</div>
        <div class="operation">
          <!-- 复制代码 -->
          <tiny-tooltip class="item" effect="dark" :content="copyTip" placement="top-start">
            <i :class="copyIcon" class="h:c-success w16 h16 cur-hand" @click="copyCode(demo)" @mouseout="resetTip()" />
          </tiny-tooltip>
          <!-- 展开代码 -->
          <tiny-tooltip
            class="item"
            effect="dark"
            :content="demo.isOpen ? $t('hideCode') : $t('showCode')"
            placement="top-start"
          >
            <i
              :class="!!demo.isOpen ? 'i-ti-codeslash' : 'i-ti-code'"
              class="ml8 h:c-success w16 h16 cur-hand"
              @click="toggleDemoCode(demo)"
            />
          </tiny-tooltip>
          <!-- 在 stackblitz中打开 -->
          <stackblitz
            v-if="isStackblitzShow"
            :getDemoCodesFn="mkGetDemoCodes(demo)"
            :packageName="sandboxName"
            :packageTitle="sandboxName"
          ></stackblitz>
          <!-- 在 codeSandbox中打开 -->
          <sandbox
            v-if="isSandBoxShow"
            :getDemoCodesFn="mkGetDemoCodes(demo)"
            :packageName="sandboxName"
            :packageTitle="sandboxName"
          ></sandbox>
        </div>
      </div>
      <template v-if="isShowDemo">
        <n-space vertical v-if="isMdLoading">
          <n-skeleton text style="width: 60%" />
          <n-skeleton text :repeat="2" />
        </n-space>
        <component v-else :is="getDescMd(demo)" class="mb16 f14" v-bind="{ startBrace, endBrace }" />
        <div class="demo-tag" v-html="`<${demo.tag} />`"></div>
      </template>
      <n-space vertical v-else>
        <n-skeleton text style="width: 60%" />
        <n-skeleton text :repeat="2" />
        <n-skeleton height="400px" width="100%" :sharp="false" />
      </n-space>
    </div>
    <!-- demo 打开后的示例代码  细滚动时，width:fit-content; -->
    <div v-if="demo.isOpen" class="py20 b-t-lightless">
      <n-config-provider :theme-overrides="themeOverrides">
        <div class="file-provider">
          <div class="tab-box">
            <span
              class="tab-file"
              v-for="(file, idx) in demo.files"
              :key="file.fileName"
              :name="'tab' + idx"
              :class="{ active: idx === activeIndex }"
              @click="changeIndex(idx, demo)"
            >
              {{ file.fileName }}
            </span>
          </div>
          <n-layout
            :native-scrollbar="true"
            :content-style="`overflow-x:auto; padding: 20px 5px; background-color:#fff;`"
          >
            <n-code :code="demo.files[activeIndex].code" :language="demo.files[activeIndex].language" />
          </n-layout>
        </div>
      </n-config-provider>
    </div>
  </div>
</template>
<script lang="jsx">
import { defineComponent, reactive, computed, toRefs, onMounted, watch, ref } from 'vue';
import Tooltip from '@opentiny/vue-tooltip';
import { $t, $t2 } from '@/i18n';
import { $split, appData, getDemoModule, hasDemoModule, getI18n, fetchDemosFile } from '@/tools';
import { getMenuTitleByCmpId } from '@/menus.jsx';
import { router } from '@/router.js';
import { languageMap, themeOverrides } from './cmpConfig';
import sandbox from './sandbox/index.vue';
import { PROJECT_NAME, SHOW_SANDBOX_PROJECTS, CUR_BUILD_TYPE, BUILD_TYPES } from './sandbox/code-config';
import stackblitz from './stackblitz/index.vue';
import { pathJoin, getFileName } from './shared';

const getDemoCodeFn = demo => {
  // 获取code代码文本
  if (!demo.files) {
    const cmpId = router.currentRoute.value.params.cmpId;
    demo.files = demo.codeFiles.map(pathName => {
      const ext = $split(pathName, '.', -1);
      const language = languageMap[ext] || '';

      return { fileName: getFileName(pathName), language, files: [], pathName };
    });
  }
};
export default defineComponent({
  name: 'Demo',
  components: {
    sandbox,
    TinyTooltip: Tooltip,
    stackblitz,
  },
  props: {
    demo: {
      type: Object,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const state = reactive({
      tabValue: 'tab0',
      cmpId: router.currentRoute.value.params.cmpId,
      langKey: $t2('zh-CN', 'en-US'),
      currDemoId: computed(() => {
        let hash = router.currentRoute.value.hash?.slice(1);

        // 兼容/#hashName这种模式
        if (hash.indexOf('/') > -1) {
          hash = hash.slice(1);
        }
        return hash;
      }),
      copyTip: $t('copyCode'),
      copyIcon: 'i-ti-copy',
      themeOverrides: themeOverrides,
      // 是否显示 codeSandbox
      isSandBoxShow: computed(() => SHOW_SANDBOX_PROJECTS.indexOf(CUR_BUILD_TYPE) > -1),
      // 代码示例标题
      sandboxName: computed(() => {
        const menuTitle = getMenuTitleByCmpId(state.cmpId);
        return `opentiny-${PROJECT_NAME}-${menuTitle || ''}-${props.demo.name[state.langKey]}`;
      }),
      descMd: null,
      activeIndex: 0,
      isStackblitzShow: computed(() => CUR_BUILD_TYPE === BUILD_TYPES.OPEN_DOCS),
      isShowDemo: props.isActive,
      rootRef: ref(null),
      isMdLoading: false,
    });
    const descMdPath = computed(() =>
      props.demo.descFiles ? pathJoin(`@demos/app/${state.cmpId}/webdoc/`, getI18n(props.demo, 'descFiles')) : ''
    );
    watch(
      () => [props.isActive, descMdPath.value],
      async () => {
        if (!props.isActive) {
          return;
        }
        state.isShowDemo = true;
        if (!state.descMd && hasDemoModule(descMdPath.value)) {
          state.isMdLoading = true;
          state.descMd = await getDemoModule(descMdPath.value).catch(() => null);
        }
        state.isMdLoading = false;
      },
      { immediate: true }
    );
    const fn = {
      getDescMd(demo) {
        // desc字段可能是md,也可能是html。 返回md组件或者html组件
        const desc = demo.desc[state.langKey].trim();
        return hasDemoModule(descMdPath.value) ? state.descMd : <div class="demo-desc" v-html={desc}></div>;
      },
      toggleDemoCode(demo) {
        // 第一次打开时，要请求一下相应的codeFiles .存储到files属性下
        if (!demo.files) {
          this.getDemoCode(demo);
          demo.isOpen = true;
        } else {
          demo.isOpen = !demo.isOpen;
        }
        // 打开组件示例时，获取代码
        if (demo.isOpen) {
          this.handleUpdateValue(demo);
        }
      },
      async copyCode(demo) {
        const idx = demo.isOpen ? parseInt(state.tabValue.slice(3)) : 0;
        if (!demo.files) {
          const code = await this.getDemoCode(demo);
        }
        await navigator.clipboard?.writeText(demo.files[idx].code);
        state.copyTip = $t('copyCodeOk');
        state.copyIcon = 'i-ti-check';
      },
      resetTip() {
        setTimeout(() => {
          state.copyTip = $t('copyCode');
          state.copyIcon = 'i-ti-copy';
        }, 300);
      },
      handleUpdateValue(demo) {
        const idx = parseInt(state.tabValue.slice(3));

        if (!demo.files[idx].code) {
          let path = pathJoin(`@demos/app/${state.cmpId}/`, demo.files[idx].pathName);
          fetchDemosFile(path)
            .then(code => {
              demo.files[idx].code = code;
            })
            .catch(error => {});
        }
      },
      async getDemoCode(demo) {
        await getDemoCodeFn(demo);
        // 获取code代码文本
        const idx = demo.isOpen ? parseInt(state.tabValue.slice(3)) : 0;
        let path = pathJoin(`@demos/app/${state.cmpId}/`, demo.files[idx].pathName);
        const code = await fetchDemosFile(path);
        state.demo.files[idx].code = code;
        return code;
      },
      // 创建 获取demo代码函数 的函数
      mkGetDemoCodes(demo) {
        // 这里返回的是一个函数
        return () => {
          getDemoCodeFn(demo);
          const { codeFiles } = demo;
          return Promise.all(
            codeFiles.map(async (pathName, index) => {
              const fileName = getFileName(pathName);
              let readPath = pathJoin(`@demos/app/${state.cmpId}/`, pathName);
              if (state.cmpId?.indexOf('best-cases') > -1) {
                readPath = `@demos/app/${state.cmpId}/${demo.files[0].fileName.split('.')[0]}/${fileName}`;
              }
              // 已经缓存的数据
              const demoFileCache = demo?.files?.[index];
              // 有缓存数据，使用缓存数据
              if (demoFileCache?.code) {
                return {
                  fileName,
                  fileContent: demoFileCache.code,
                  readPath,
                  writePath: `src/app/${fileName}`,
                };
              }
              const fileContent = await fetchDemosFile(readPath);
              // 获取到的代码缓存起来
              if (demoFileCache) {
                demoFileCache.code = fileContent;
              }
              return {
                fileName,
                fileContent,
                readPath,
                writePath: `src/app/${fileName}`,
              };
            })
          );
        };
      },
      changeIndex(i, demo) {
        state.activeIndex = i;
        const idx = i;

        if (!demo.files[idx].code) {
          let path = pathJoin(`@demos/app/${state.cmpId}/`, demo.files[idx].pathName);
          fetchDemosFile(path)
            .then(code => {
              demo.files[idx].code = code;
            })
            .catch(error => {});
        }
      },
    };
    onMounted(() => {
      getDemoCodeFn(props.demo);
    });
    return { ...toRefs(state), ...fn, appData, startBrace: '{{', endBrace: '}}' };
  },
});
</script>
<style lang="less">
.demo-desc {
  line-height: 1.5;
  code {
    background: #f1f2f3;
    padding: 2px 4px;
    border-radius: 2px;
    margin: 2px 4px;
    display: inline-block;
  }

  a {
    text-decoration: none;
    color: #5e7ce0;
    cursor: pointer;
  }
  table {
    border: 1;
  }
}

.theme-dark {
  .demo-desc {
    code {
      background: #333333;
    }
  }
}
.demo-item {
  border: 1px solid #ddd;
}
.b-a-success {
  animation: border-trans 3s;
  padding-left: 20px;
  padding-right: 20px;
}
@keyframes border-trans {
  0% {
    border: 1px solid #5073e5;
    background: none;
  }
  50% {
    background: rgba(255, 95, 85, 0.1);
    border: 1px solid rgba(255, 95, 88, 0.6);
  }
  100% {
    border: 1px solid #5073e5;
    background: none;
  }
}
.title-component {
  font-size: 20px;
  font-family: PingFang SC, PingFang SC-Semibold;
  font-weight: 600;
  text-align: left;
  color: #191919;
  line-height: 28px;
}
.demo-tag {
  background: #fafafa;
  padding: 32px 24px 40px 24px;
}
:deep(.n-tabs-tab--active) {
  background: blue !important;
}
.active {
  background: #fff;
  border-radius: 6px;
  border: 1px solid #f2f2f2;
  color: #191919;
  font-weight: 500;
}
.file-provider {
  padding: 24px;
  border: 1px solid #efeff4;
}
.tab-box {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  color: #595959;
  display: inline-block;
  .tab-file {
    padding: 5px 38px;
    line-height: 20px;
    display: inline-block;
    cursor: pointer;
  }
}

.demo {
  position: relative;
  .operation {
    position: absolute;
    bottom: 15px;
    right: 24px;
  }
}
</style>
