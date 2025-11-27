import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Unocss from 'unocss/vite';
import createHtmlPlugin from 'vite-plugin-html';
import UnoCssConfig from './uno.config';
import AutoComponents from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Markdown from 'unplugin-vue-markdown/vite';
import { MdExt, mdInstall } from './md.extend.config';
import { dealBrace } from './vite-plugin-md';

const minimist = require('minimist'); // 命令行参数解析
const argv = minimist(process.argv.slice(2)); // 获取参数列表数据

export default defineConfig({
  define: {
    'process.env': Object.assign({}, process.env),
    // component-bundle生成的js版本
    __COMPONENT_BUNDLE_VERSION__: JSON.stringify(process.env.__COMPONENT_BUNDLE_VERSION__),
  },
  plugins: [
    dealBrace(),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    vueJsx({
      include: [/\.js$/, /\.jsx$/, /\.ts$/, /\.tsx$/],
    }),
    createHtmlPlugin({
      inject: {
        data: {
          injectScript: '',
          // web-component.js移到index.html是为了规避@opentiny/ng在ios chrome浏览器白屏的问题
          // 这样做，至少TinyNG官网能打开，只是组件渲染有问题，@opentiny/ng在ios chrome浏览器白屏的问题已经反馈给了姬锐锋
          injectWebComponentScript: `<script defer type="text/javascript" src="/@demos/scripts/web-components.js"></script>`,
        },
      },
    }),
    // 支持md转为vue组件：   https://github.com/antfu/vite-plugin-md#configuration--options
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
    Unocss(UnoCssConfig),
    // 自动导入和项目组件   https://github.com/antfu/unplugin-vue-components#configuration
    AutoComponents({
      resolvers: [NaiveUiResolver()],
      // 搜索下面目录中的 *.vue  *.md 都做为vue组件
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    }),
  ],
});
