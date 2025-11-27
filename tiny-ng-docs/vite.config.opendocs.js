import { defineConfig } from 'vite';
import path from 'path';
import docsbaseConfig from './vite.config.docs.base';

export default defineConfig(({ command, mode }) => {
  return {
    ...docsbaseConfig,
    envDir: './env/opendocs',
    base:
      command === 'build'
        ? `${process.env.static_url_prefix}/tinyui-design/${process.env.staticReleaseVersion}/docs`
        : '/tiny-ng/',
    build: {
      outDir: '../dist/docs',
      emptyOutDir: false,
    },
    resolve: {
      alias: {
        '@': path.resolve('src'),
        '@demos': path.resolve('node_modules/@opentiny/ng-tinydoc'),
        '@style.css': path.resolve('node_modules/@opentiny/ng-tinydoc/scripts/styles.css'),
        '@demo': path.resolve('src/views/components/demo.vue'),
        '@design': path.resolve('node_modules/@opentiny/ng-tinydoc/webdoc/design'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3105,
      fs: {
        strict: false,
        allow: ['..'],
      },
    },
  };
});
