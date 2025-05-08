import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVitest from '@vitest/eslint-plugin'
import pluginPlaywright from 'eslint-plugin-playwright'
import oxlint from 'eslint-plugin-oxlint'
// 中心仓库没有该包， 待修改
// import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup
// 所有的vue文件脚本，必须是ts
import { configureVueProject } from '@vue/eslint-config-typescript'
configureVueProject({ scriptLangs: ['ts', 'tsx'] })

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', 'scripts/create-cmp/template/**'],
  },

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },

  {
    ...pluginPlaywright.configs['flat/recommended'],
    files: ['e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  },
  oxlint.configs['flat/recommended'],
  // skipFormatting,

  // 以下为自定义覆盖的规则。 未用到变量仅提示，不算报错。
  {
    rules: {
      'vue/no-unused-vars': 'off',
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      'vue/prefer-import-from-vue': 'off',
    },
  },

  oxlint.buildFromOxlintConfig({
    ignorePatterns: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/create-cmp/template/**'],
    rules: {
      'no-unused-vars': 'off',
    },
  }),
)
