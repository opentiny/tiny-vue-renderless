import { defineConfig } from 'vite';
import path from 'path';
import docsbaseConfig from './vite.config.docs.base';

export default defineConfig(({ command, mode }) => {
  return {
    ...docsbaseConfig,
    envDir: './env/tinycloud',
    base:
      command === 'build'
        ? `${process.env.static_url_prefix}/tinyui-design/${process.env.staticReleaseVersion}/tiny-cloud`
        : '/tiny-cloud/',
    build: {
      outDir: '../dist/tiny-cloud',
      emptyOutDir: false,
    },
    resolve: {
      alias: {
        '@': path.resolve('src'),
        '@demos': path.resolve('node_modules/@opentiny/tinydoc-ng-tinycloud'),
        '@style.css': path.resolve('node_modules/@opentiny/tinydoc-ng-tinycloud/scripts/styles.css'),
        '@demo': path.resolve('src/views/components/demo.vue'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3103,
      fs: {
        strict: false,
        allow: ['..'],
      },
    },
  };
});
