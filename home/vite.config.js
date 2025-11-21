import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import UnoCssConfig from './uno.config'
import AutoComponents from 'unplugin-vue-components/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Markdown from 'vite-plugin-md'
import { MdExt, mdInstall } from './md.extend.config'
import Inspect from 'vite-plugin-inspect'
import importPlugin from '@opentiny/vue-vite-import'
import { visualizer } from 'rollup-plugin-visualizer'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'path'

function _resolve(dir) {
  return path.resolve(__dirname, dir)
}

export default defineConfig(({ command, mode }) => {
  return {
    envDir: './env',
    plugins: [
      mode === 'analyze' ? visualizer({ open: true }) : undefined,
      vue({
        include: [/\.vue$/, /\.md$/],
        exclude: [/node_module/]
      }),
      importPlugin(
        [
          {
            libraryName: '@opentiny/vue'
          },
          {
            libraryName: `@opentiny/vue-icon`,
            customName: (name) => {
              return `@opentiny/vue-icon/lib/${name.replace(/^icon-/, '')}.js`
            }
          }
        ],
        'pc' // 此配置非必选，按需配置(pc|mobile|mobile-first)
      ),
      Inspect(),
      vueJsx({
        include: [/\.js$/, /\.jsx$/, /\.ts$/, /\.tsx$/],
        exclude: [/node_module/]
      }),
      // 支持md转为vue组件：   https://github.com/antfu/vite-plugin-md#configuration--options
      Markdown({
        headEnabled: true,
        markdownItOptions: {
          html: true,
          linkify: true,
          typographer: true
        },
        markdownItSetup(md) {
          mdInstall(md)
        },
        markdownItUses: MdExt
      }),
      Unocss(UnoCssConfig),
      // 自动导入和项目组件   https://github.com/antfu/unplugin-vue-components#configuration
      AutoComponents({
        // 搜索下面目录中的 *.vue  *.md 都做为vue组件
        extensions: ['vue', 'md'],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        exclude: [/node_module/]
      }),
      viteStaticCopy({
        targets: [
          {
            src: '../home/public/downloadFile/*',
            dest: 'dist/home/downloadFile'
          }
        ]
      })
    ],
    define: {
      'process.env': { TINY_MODE: 'pc' }
    },
    base:
      command === 'build'
        ? `${process.env.static_url_prefix}/tinyui-design/${process.env.staticReleaseVersion}/home/`
        : '/',
    build: {
      outDir: '../../dist/home',
      commonjsOptions: {
        transformMixedEsModules: true
      },
      emptyOutDir: false
    },
    resolve: {
      alias: {
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
        '@': _resolve('src'),
        '@/components': _resolve('src/components'),
        'flexsearch': 'flexsearch/dist/flexsearch.bundle.js'
      }
    },
    server: {
      port: 3100,
      host: '0.0.0.0',
      fs: {
        strict: false,
        allow: ['..']
      }
    }
  }
})
