import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test',
    '@storybook/addon-outline',
    '@storybook/addon-backgrounds',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      // docgen: {
      //   plugin: 'vue-component-meta',
      //   tsconfig: '../../tsconfig.app.json',
      // }
    },
  },
}
export default config
