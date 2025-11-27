import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import svgBuilder from './scripts/svgBuilder'
import monacoEditorPlugin from 'vite-plugin-monaco-editor'
import nodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill'
import nodeModulesPolyfillPlugin from '@esbuild-plugins/node-modules-polyfill'
import nodePolyfill from 'rollup-plugin-polyfill-node'
import markdown from 'vite-plugin-markdown'
import fs from 'node:fs'
import fg from 'fast-glob'

// https://vitejs.dev/config/
const config = {
  server: {
    host: 'localhost.opentiny.design',
    open: true,
    port: 3000
  },
  // 设置本地构建后的预览端口为 8080，解决 @opentiny/vue 的 OBS 跨域访问限制
  preview: {
    host: 'localhost.opentiny.design',
    open: true,
    port: 8080
  },
  plugins: [vue(), vueJsx(), svgBuilder(path.resolve(__dirname, 'src/svgs/assets')), markdown({ mode: 'markdown' })],
  resolve: {
    extensions: ['.js', '.jsx', '.vue'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@huawei/tiny-vue3': '@opentiny/vue',
      '@huawei/tiny-vue3-icon': '@opentiny/vue-icon',
      '@huawei/tiny-vue3-locale': '@opentiny/vue-locale',
      'lowcode-design-http': path.resolve(__dirname, 'src/http'),
      'lowcode-design-controller': path.resolve(__dirname, 'src/controller'),
      'lowcode-design-public': path.resolve(__dirname, 'public'),
      '@tiny-engine-docs': path.resolve(__dirname, 'tiny-engine/docs')
    }
  },
  define: {
    'process.env': process.env
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        nodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true
        }),
        nodeModulesPolyfillPlugin()
      ]
    }
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      // monaco-editor 满足 ESM 规范，防止被误转换
      exclude: ['node_modules/*monaco-editor*/**']
    },
    rollupOptions: {
      plugins: [nodePolyfill()]
      // 必须把卡片用到的 TinyVue 和 Vue 排除，否则卡片和应用不在一个 Vue 实例里
      // external: [/^@opentiny\/vue.*/, 'vue']
    }
  }
}

const importMapVersions = {
  tinyVue: '3.11'
}

function getImportMaps(mode = 'development') {
  const baseUrl = mode === 'open' ? 'https://npm.onmicrosoft.cn/' : 'https://unpkg.opentiny.design/'

  const importMap = {
    imports: {
      vue: `${baseUrl}vue@3.2.36/dist/vue.runtime.esm-browser.js`,
      'vue/server-renderer': `${baseUrl}@vue/server-renderer@3.2.36/dist/server-renderer.esm-browser.js`,
      'vue-i18n': `${baseUrl}vue-i18n@9.2.0-beta.36/dist/vue-i18n.esm-browser.js`,
      'vue-router': `${baseUrl}vue-router@4.0.16/dist/vue-router.esm-browser.js`,
      '@vue/devtools-api': `${baseUrl}@vue/devtools-api@6.1.4/lib/esm/index.js`,
      axios: `${baseUrl}axios@1.0.0-alpha.1/dist/esm/axios.js`,
      'axios-mock-adapter': `${baseUrl}axios-mock-adapter@1.21.1/dist/axios-mock-adapter.js`,
      '@huawei/tiny-webcomponent-core':
        'https://unpkg.opentiny.design/@huawei/tiny-webcomponent-core@1/dist/tiny-webcomponent-core.es.js',
      '@huawei/tiny-i18n-host': 'https://unpkg.opentiny.design/@huawei/tiny-i18n-host@1/dist/tiny-i18n-host.es.js',
      '@opentiny/vue': `${baseUrl}@opentiny/vue@${importMapVersions.tinyVue}/runtime/tiny-vue.mjs`,
      '@opentiny/vue-icon': `${baseUrl}@opentiny/vue@${importMapVersions.tinyVue}/runtime/tiny-vue-icon.mjs`,
      '@opentiny/vue-common': `${baseUrl}@opentiny/vue@${importMapVersions.tinyVue}/runtime/tiny-vue-common.mjs`,
      '@opentiny/vue-locale': `${baseUrl}@opentiny/vue@${importMapVersions.tinyVue}/runtime/tiny-vue-locale.mjs`,
      '@huawei/tiny-vue3': `${baseUrl}@opentiny/vue@${importMapVersions.tinyVue}/runtime/tiny-vue.mjs`,
      '@huawei/tiny-vue3-icon': `${baseUrl}@opentiny/vue@${importMapVersions.tinyVue}/runtime/tiny-vue-icon.mjs`,
      '@huawei/tiny-vue3-common': `${baseUrl}@opentiny/vue@${importMapVersions.tinyVue}/runtime/tiny-vue-common.mjs`,
      '@huawei/tiny-vue3-locale': `${baseUrl}@opentiny/vue@${importMapVersions.tinyVue}/runtime/tiny-vue-locale.mjs`,
      '@huawei/tiny-vue': `${baseUrl}@opentiny/vue@${importMapVersions.tinyVue}/runtime/tiny-vue.mjs`,
      '@huawei/tiny-vue-icon': `${baseUrl}@opentiny/vue@${importMapVersions.tinyVue}/runtime/tiny-vue-icon.mjs`,
      '@huawei/tiny-vue-common': `${baseUrl}@opentiny/vue-common@${importMapVersions.tinyVue}/index.js`,
      '@huawei/tiny-vue-locale': `${baseUrl}@opentiny/vue-locale@${importMapVersions.tinyVue}/index.js`,
      '@huawei/tiny-vue-renderless/': `${baseUrl}@opentiny/vue-renderless@${importMapVersions.tinyVue}/`,
      '@opentiny/vue-renderless/': `${baseUrl}@opentiny/vue-renderless@${importMapVersions.tinyVue}/`,
      '@opentiny/vue-design-smb': `${baseUrl}@opentiny/vue-design-smb@${importMapVersions.tinyVue}/index.js`,
      '@opentiny/vue-theme/': `${baseUrl}@opentiny/vue-theme@${importMapVersions.tinyVue}/`
    }
  }

  return JSON.stringify(importMap)
}

const htmlPlugin = (mode) => {
  const tags = [
    // {
    //   tag: 'script',
    //   injectTo: 'head',
    //   attrs: {
    //     type: 'importmap'
    //   },
    //   children: getImportMaps(mode)
    // }
  ]

  if (mode !== 'development') {
    tags.push({
      tag: 'meta',
      injectTo: 'head-prepend',
      attrs: {
        'http-equiv': 'Content-Security-Policy',
        content: 'upgrade-insecure-requests'
      }
    })
  }

  return {
    name: 'html-plugin',
    transformIndexHtml: {
      enforce: 'pre',
      transform: (html) => {
        return {
          html,
          tags
        }
      }
    }
  }
}

/** @type {(options:{src:string,dest:string})=>import('vite').Plugin} */
const copyFilesPlugin = (options) => {
  return {
    name: 'vite-plugin-copy-files',
    buildStart() {
      const { src, dest } = options

      if (!src || !dest) {
        return
      }

      const targetFolder = path.resolve(__dirname, dest)

      if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder, { recursive: true })
      }

      const files = fg.globSync(src, { cwd: path.resolve(__dirname) })

      for (const file of files) {
        const fileName = path.basename(file)
        const destPath = path.join(targetFolder, fileName)

        fs.copyFileSync(file, destPath)
      }
    }
  }
}

export default defineConfig(({ command, mode }) => {
  const VITE_APP_STATIC_PATH = loadEnv(mode, process.cwd()).VITE_APP_STATIC_PATH

  config.base = mode !== 'development' ? VITE_APP_STATIC_PATH + process.env.staticReleaseVersion + '/' : '/'
  config.build.sourcemap = ['development', 'alpha'].includes(mode)

  const monacoPublicPath = {
    local: 'monaco-workers',
    alpha: 'https://tiny-editor.obs.cn-north-5.myhuaweicloud.com/libs/monaco-assets',
    'alpha-open': 'https://tiny-editor.obs.cn-north-5.myhuaweicloud.com/libs/monaco-assets',
    open: 'https://tinyengine-assets.obs.cn-north-4.myhuaweicloud.com/libs/monaco-assets',
    prod: 'https://opentiny-assets.obs.cn-north-4.myhuaweicloud.com/libs/monaco-assets'
  }

  let monacoEditorPluginInstance = null

  if (command === 'serve') {
    monacoEditorPluginInstance = monacoEditorPlugin({ publicPath: monacoPublicPath.local })
  } else {
    monacoEditorPluginInstance = monacoEditorPlugin({ publicPath: monacoPublicPath[mode] })
  }

  config.plugins.push(monacoEditorPluginInstance)
  config.plugins.push(htmlPlugin(mode))
  config.plugins.push(copyFilesPlugin({ src: './tiny-engine/docs/**/imgs/*', dest: './public/docs/external-imgs' }))

  return config
})
