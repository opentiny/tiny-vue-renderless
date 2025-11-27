import { defineConfig } from 'vite';
import path from 'path';
import docsbaseConfig from './vite.config.docs.base';

export default defineConfig(({ command, mode }) => {
  return {
    ...docsbaseConfig,
    envDir: './env/innerdocs',
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
        '@demos': path.resolve('node_modules/@oepntiny/tinydoc-ng-tiny'),
        '@style.css': path.resolve('node_modules/@oepntiny/tinydoc-ng-tiny/scripts/assets/theme/basic-var.min.css'),
        '@demo': path.resolve('src/views/components/demo.vue'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3101,
      fs: {
        strict: false,
        allow: ['..'],
      },
    },
  };
});
