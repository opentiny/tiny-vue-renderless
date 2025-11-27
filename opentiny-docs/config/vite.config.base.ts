import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';
import { viteMockServe } from 'vite-plugin-mock';
import Markdown from 'vite-plugin-md';
import { MdExt, mdInstall } from '../md.extend.config';

export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    vueJsx(),
    svgLoader({ svgoConfig: {} }),
    viteMockServe({
      logger: false, // 是否在控制台显示请求日志
      supportTs: false, // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件
      injectFile: resolve('../src/main.ts'),
    }),
    Markdown({
      headEnabled: true,
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      markdownItSetup(md) {
        mdInstall(md);
      },
      markdownItUses: MdExt,
    }),
  ],
  build: {
    outDir: resolve(__dirname, '../dist/openTiny-docs'),
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  resolve: {
    alias: [
      {
        find: '@src',
        replacement: resolve(__dirname, '../src'),
      },
      {
        find: 'assets',
        replacement: resolve(__dirname, '../src/assets'),
      },
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.esm-bundler.js', // Resolve the i18n warning issue
      },
      {
        find: 'vue',
        replacement: 'vue/dist/vue.esm-bundler.js', // compile template
      },
    ],
    extensions: ['.ts', '.js', '.md'],
  },
  define: {
    'process.env': {},
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
