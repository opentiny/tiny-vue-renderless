<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <sandbox-icon @click="openSandbox()" class="code-sandbox-btn"></sandbox-icon>
    </template>
    {{ openSandboxTip }}
    <form className="code-box-code-action" action="https://codesandbox.io/api/v1/sandboxes/define" method="POST" target="_blank" ref="sandboxRef">
      <input type="hidden" name="parameters" :value="codeSandboxValue" />
    </form>
  </n-tooltip>
</template>
<script>
import { defineComponent, reactive, toRefs, ref, nextTick, computed } from 'vue';
import { useMessage } from 'naive-ui';
import LZString from 'lz-string';

import { $t, $t2 } from '@/i18n';
import sandboxIcon from './sandbox-icon.vue';
import { getAllFiles } from './get-all-files';
import { CUR_BUILD_TYPE, BUILD_TYPES } from './code-config';

const compress = stringified =>
  LZString.compressToBase64(stringified)
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='

export default defineComponent({
  name: 'sandbox-tooltip',
  props: ['getDemoCodesFn', 'packageName', 'packageTitle'],
  components: {
    sandboxIcon,
  },
  setup(props) {
    const message = useMessage();
    const state = reactive({
      langKey: $t2('zh-CN', 'en-US'),
      codesanboxPrefillConfig: {},
      codeSandboxValue: computed(() => compress(JSON.stringify(state.codesanboxPrefillConfig))),
      openSandboxTip: computed(() => (CUR_BUILD_TYPE === BUILD_TYPES.OPEN_DOCS ? $t('openInSandboxExternal') : $t('openInSandbox'))),
    });
    const sandboxRef = ref(null);
    const fn = {
      // 获取所有的文本文件
      async getStringFiles() {
        const codeFiles = await this.getDemoCodesFn();
        return getAllFiles(codeFiles, {
          packageName: this.packageName || 'opentiny',
          packageTitle: this.packageTitle || 'opentiny',
        });
      },
      // 打开 codeSandbox
      async openSandbox() {
        try {
          const fileObject = await this.getStringFiles();
          Object.keys(fileObject).forEach(key => {
            fileObject[key] = {
              content: fileObject[key],
            };
          });
          this.codesanboxPrefillConfig = {
            ...this.codesanboxPrefillConfig,
            files: fileObject,
          };
          await nextTick();
          sandboxRef.value?.submit();
        } catch (e) {
          message.error($t('openSandboxFailed'));
          throw e;
        }
      },
    };
    return { ...toRefs(state), ...fn, sandboxRef, $t };
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
