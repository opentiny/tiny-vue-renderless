<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <StackblitzIcon @click="open()" class="code-sandbox-btn"></StackblitzIcon>
    </template>
    {{ $t('openInStackblitz') }}
    <form className="code-box-code-action" action="https://stackblitz.com/run" method="POST" target="_blank" ref="stackblitzRef">
      <template v-for="key in stackblitzConfigKeys">
        <input type="hidden" v-if="key === 'dependencies'" :key="key" :name="'project[' + key + ']'" :value="dependenciesStr" />
        <template v-else-if="key === 'files'">
          <input
            type="hidden"
            v-for="fileKey in fileKeys"
            :key="key + '.' + fileKey"
            :name="'project[' + key + '][' + fileKey + ']'"
            :value="stackblitzConfig[key][fileKey]"
          />
        </template>
        <input type="hidden" v-else :key="key + '.ohters'" :name="'project[' + key + ']'" :value="stackblitzConfig[key]" />
      </template>
    </form>
  </n-tooltip>
</template>
<script>
import { defineComponent, reactive, toRefs, ref, nextTick, computed } from 'vue';
import { useMessage } from 'naive-ui';

import { $t, $t2 } from '@/i18n';
import { getOpenFiles } from '../shared/opendocs/get-open-files';
import StackblitzIcon from './stackblitz-icon.vue';

const BASE_URL = import.meta.env.BASE_URL;
const ICON_PATH = `${BASE_URL}assets/ionicons/`;

export default defineComponent({
  name: 'stackblitz-tooltip',
  props: ['getDemoCodesFn', 'packageName', 'packageTitle'],
  components: {
    StackblitzIcon,
  },
  setup(props) {
    const message = useMessage();
    const state = reactive({
      langKey: $t2('zh-CN', 'en-US'),
      stackblitzConfig: {
        title: props.packageTitle,
        template: 'angular-cli',
        dependencies: {},
        description: props.packageTitle,
        files: {},
        openFile: 'src/app/app.component.ts',
      },
      stackblitzValue: computed(() => JSON.stringify(state.stackblitzConfig)),
      stackblitzConfigKeys: computed(() => Object.keys(state.stackblitzConfig)),
      dependenciesStr: computed(() => JSON.stringify(state.stackblitzConfig.dependencies)),
      fileKeys: computed(() => Object.keys(state.stackblitzConfig.files)),
    });
    const stackblitzRef = ref(null);
    const fn = {
      // 获取所有的文本文件
      async getStringFiles() {
        const codeFiles = await this.getDemoCodesFn();
        return getOpenFiles(codeFiles, {
          packageName: this.packageName || 'opentiny',
          packageTitle: this.packageTitle || 'opentiny',
          ICON_PATH,
          isStackblitz: true,
          CSS_FILES: [`${BASE_URL}@demos/scripts/styles.css`]
        });
      },
      // 打开 codeSandbox
      async open() {
        try {
          const fileObject = await this.getStringFiles();
          const pakcageJson = fileObject['package.json'];
          this.stackblitzConfig = {
            ...this.stackblitzConfig,
            files: { ...fileObject, 'package.json': JSON.stringify(pakcageJson, null, 2) },
            dependencies: pakcageJson['dependencies'],
          };
          await nextTick();
          stackblitzRef.value?.submit();
        } catch (e) {
          message.error($t('openStackblitzFialed'));
          throw e;
        }
      },
    };
    return { ...toRefs(state), ...fn, stackblitzRef, $t };
  },
});
</script>
<style lang="less" scoped>
.code-sandbox-btn {
  outline: 0;
  &:focus {
    outline: 0;
  }
}
</style>
<style>
body .n-message-container {
  z-index: 9999;
}
</style>
