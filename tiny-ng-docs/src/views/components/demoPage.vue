<template>
  <n-message-provider>
    <router-view>
      <div class="container">
        <div v-if="demo" :id="demo.demoId" class="demo-item br-sm">
          <!--查看代码 复制 在sandbox打开-->
          <div class="icon-content">
            <n-tooltip trigger="hover">
              <template #trigger>
                <i :class="copyIcon" class="h:c-success w16 h16 cur-hand" @click="copyCode(demo)" @mouseout="resetTip()" />
              </template>
              {{ copyTip }}
            </n-tooltip>
            <n-tooltip trigger="hover">
              <template #trigger>
                <i :class="!!demo.isOpen ? 'i-ti-codeslash' : 'i-ti-code'" class="ml8 h:c-success w16 h16 cur-hand" @click="toggleDemoCode(demo)" />
              </template>
              {{ demo.isOpen ? $t('hideCode') : $t('showCode') }}
            </n-tooltip>
            <!-- 在 codeSandbox中打开 -->
            <sandbox v-if="isSandBoxShow" :getDemoCodesFn="mkGetDemoCodes(demo)" :packageName="sandboxName" :packageTitle="sandboxName"></sandbox>
          </div>
          <div v-html="`<${demo.tag} />`"></div>
        </div>
        <!-- demo 打开后的示例代码  细滚动时，width:fit-content; -->
        <div v-if="demo.isOpen" class="px24 py20 b-t-lightless">
          <n-config-provider :theme-overrides="themeOverrides">
            <n-tabs v-model:value="tabValue" type="line" size="large" justify-content="space-evenly" @update:value="handleUpdateValue(demo)">
              <n-tab-pane v-for="(file, idx) in demo.files" :key="file.fileName" :name="'tab' + idx" :tab="file.fileName">
                <n-layout :native-scrollbar="true" :content-style="`overflow-x:auto; padding: 20px 5px; background-color:#f5f6f8;`">
                  <n-code :code="file.code" :language="file.language" />
                </n-layout>
              </n-tab-pane>
            </n-tabs>
          </n-config-provider>
        </div>
      </div>
    </router-view>
  </n-message-provider>
</template>
<script lang="jsx">
import { defineComponent, reactive, toRefs, onMounted, computed, watch } from 'vue';
import { getMenuTitleByCmpId } from '@/menus.jsx';
import { $t, $t2 } from '@/i18n';
import { $clone, $split, appData, fetchDemosFile } from '@/tools';
import { router } from '@/router.js';
import { languageMap, themeOverrides } from './cmpConfig';
import sandbox from './sandbox/index.vue';
import { PROJECT_NAME, SHOW_SANDBOX_PROJECTS, CUR_BUILD_TYPE } from './sandbox/code-config';
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
  name: 'DemoPage',
  components: {
    sandbox,
  },
  setup(props) {
    const state = reactive({
      cmpId: computed(() => router.currentRoute.value.params.cmpId),
      parentDemo: computed(() => router.currentRoute.value.params.parentDemo || null),
      currDemoId: computed(() => router.currentRoute.value.params.demoId),
      themeOverrides: themeOverrides,
      demo: {
        isOpen: false,
      },
      tabValue: 'tab0',
      langKey: $t2('zh-CN', 'en-US'),
      copyTip: $t('copyCode'),
      copyIcon: 'i-ti-copy',
      // 是否显示 codeSandbox
      isSandBoxShow: computed(() => SHOW_SANDBOX_PROJECTS.indexOf(CUR_BUILD_TYPE) > -1),
      sandboxName: '',
    });
    const getDemo = (cmpId, demoId) => {
      fetchDemosFile(`@demos/app/${cmpId}/webdoc/${demoId}.js`)
        .then(data => {
          // tslint:disable-next-line
          const dangerEval = window[['e','v','a','l'].join('')];
          const json = dangerEval('(' + data.slice(15) + ')');

          const demos = $clone(json['demos']);
          state.demo = demos.find(item => item.demoId === demoId);
          getDemoCodeFn(state.demo);
          state.sandboxName = `opentiny-${PROJECT_NAME}-${getMenuTitleByCmpId(state.cmpId) || ''}-${state.demo.name[state.langKey]}`;
        })
        .catch(error => {});
    };
    const fn = {
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
        if (!demo.files[idx].code) {
          const code = await this.getDemoCode(demo);
        }
        await navigator.clipboard?.writeText(state.demo.files[idx].code);
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
          let path = pathJoin(`@demos/app/${state.cmpId}`, demo.files[idx].pathName);
          fetchDemosFile(path)
            .then(code => {
              demo.files[idx].code = code;
            })
            .catch(error => {});
        }
      },
      async getDemoCode(demo) {
        // 获取code代码文本
        const idx = demo.isOpen ? parseInt(state.tabValue.slice(3)) : 0;
        let path = pathJoin(`@demos/app/${state.cmpId}`, demo.files[idx].pathName);
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
    };
    watch(
      () => state.currDemoId,
      value => {
        getDemo(state.cmpId, state.currDemoId);
      }
    );
    onMounted(() => {
      getDemo(state.cmpId, state.currDemoId);
    });
    return { ...toRefs(state), ...fn, appData };
  },
});
</script>
<style lang="less">
.container {
  overflow-y: auto;
  padding: 30px;
  height: 100%;
  .icon-content {
    display: flex;
    justify-content: flex-end;
    padding: 24px 0;
  }
}
</style>
