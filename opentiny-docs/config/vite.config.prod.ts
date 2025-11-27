import { mergeConfig } from 'vite';
import baseConig from './vite.config.base';
import configCompressPlugin from './plugin/compress';
import configVisualizerPlugin from './plugin/visualizer';
import configTinyResolverPlugin from './plugin/tinyResolver';

export default mergeConfig(
  {
    mode: 'docs',
    mock: true,
    base: `${process.env.static_url_prefix}/tiny-openTiny-docs/${process.env.staticReleaseVersion}/openTiny-docs`,
    plugins: [
      configCompressPlugin('gzip'),
      configVisualizerPlugin(),
      configTinyResolverPlugin(),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia', '@vueuse/core', 'vue-i18n'],
          },
        },
      },
      chunkSizeWarningLimit: 2000,
    },
  },
  baseConig
);
