/** 该实现为 Opentiny Vue 仓库里的标准做法
 *  它是通过 node ./build-ui -v 2 启动编译的 */
import path from 'path'
import { createRequire } from 'module'
import { build, defineConfig, searchForWorkspaceRoot } from 'vite'
import minimist from 'minimist'

const workspaceRoot = searchForWorkspaceRoot(process.cwd()) // 根路径 ： mini-tiny-vue
const argv = minimist(process.argv.slice(2))

const require = createRequire(import.meta.url)
const pathFromWorkspaceRoot = (...args) => path.resolve(workspaceRoot, ...args)
const requireModules = (id) => require(require.resolve(pathFromWorkspaceRoot(id)))

// 1、选择vue插件以及输出路径。
let vuePlugin,dist
if (argv.v == 2) {
  vuePlugin = requireModules('internals/vue2-env/node_modules/vite-plugin-vue2').createVuePlugin
  dist=pathFromWorkspaceRoot('demos/vue2-app/src/lib/opentiny-vue')
} else {
  vuePlugin = requireModules('internals/vue3-env/node_modules/@vitejs/plugin-vue')
  dist=pathFromWorkspaceRoot('demos/vue3-app/src/lib/opentiny-vue')
}

// 2、 拼装正确的参数
const viteConfig = defineConfig({
  plugins: [
    vuePlugin({
      jsx: true,
      template: {
        compilerOptions: {
          comments: false
        }
      }
    })
  ],
  define:{
    VUE_VERSION:argv.v
  },
  build: {
    // 正常发包时，仅构建出es版本，之后 npm publish dist2/dist3目录
    // outDir: argv.v === 2 ? 'dist2' : 'dist3',

    // 此处直接输出到 demos/src/lib 目录中，以便演示。
    outDir: dist,
    emptyOutDir:true,
    lib: {
      entry: pathFromWorkspaceRoot('packages/vue/index.js'),
      name: 'OpentinyVue',
      formats: ['es'],
      fileName: (format) => `opentiny-vue.${format}.js`
    },
    rollupOptions: {
      external: ['vue', '@vue/composition-api'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    },
    minify:false,
    sourcemap:true
  }
})

// 3、调用build方法构建
build(viteConfig).then(()=>{
    console.log("构建完成，产物输出路径为：",dist)
})
