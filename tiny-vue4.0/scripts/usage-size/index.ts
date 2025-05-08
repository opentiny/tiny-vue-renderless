// 参考 vue-core 的方法，打印组件的每一个对象的构建体积
// 该脚本让我们能：关注组件演进的体积变化，以及是否摇树成功

import { rolldown } from 'rolldown'
import { brotliCompressSync, gzipSync } from 'node:zlib'
import vue from '@vitejs/plugin-vue'
import pico from 'picocolors'
import prettyBytes from 'pretty-bytes'
import inquirer from 'inquirer'

/**
 * 执行该命令前，已经执行了 build:all 命令了，所以三个组件库都已经有dist产物了
 * 遍历产物中的所有键值，生成 源码：export Button from "@opentiny/vue-pc"
 * 使用rolldown 对源码进行打包，最后打印生成的体积
 * */
inquirer
  .prompt([
    {
      message: '选择待分析的包名',
      name: 'mode',
      type: 'select',
      choices: [
        { name: 'vue-pc', value: 'pc' },
        { name: 'vue-mobile', value: 'mobile' },
        { name: 'vue-multi', value: 'multi' },
      ],
    },
  ])
  .then(async (answer) => {
    const { mode } = answer
    const distModule = await import(`../../packages/components/pc/dist/vue-${mode}.js`)
    const entry = `@opentiny/vue-${mode}`

    // 1、 循环pckObj下的所有键值
    const codes = Object.keys(distModule).map((name) => {
      return {
        name: name,
        code: `export {${name}} from "${entry}" `,
      }
    })

    // 2、构建每一个对象
    const tasks = []
    for (const item of codes) {
      tasks.push(bundle(item))
    }

    // 2.1 构建item
    async function bundle(item: { name: string; code: string }) {
      const id = 'virtual:entry'
      const unoId = 'virtual:uno.css' // 忽略 unocss
      const lessId = 'virtual:less' // 忽略 less

      const result = await rolldown({
        input: id,
        plugins: [
          vue() as any,
          {
            name: 'usage-size-plugin',
            resolveId(_id) {
              if (_id === id) return id
              if (_id === unoId) return unoId
              if (_id.endsWith('.less')) return lessId
              return null
            },
            load(_id) {
              if (_id === id) return item.code
              if (_id === unoId) return ''
              if (_id === lessId) return ''
            },
          },
        ],
        external: ['vue'],
      })

      const generated = await result.generate({})

      const bundled = generated.output[0].code
      const size = bundled.length
      const gzip = gzipSync(bundled).length
      const brotli = brotliCompressSync(bundled).length

      return {
        name: item.name,
        size,
        gzip,
        brotli,
      }
    }

    // 3、输出所有结果，打印或存文件
    const results = await Promise.all(tasks)

    for (const r of results) {
      console.log(
        `${pico.green(pico.bold(r.name))} - ` +
          `min:${prettyBytes(r.size, { minimumFractionDigits: 3 })} / ` +
          `gzip:${prettyBytes(r.gzip, { minimumFractionDigits: 3 })} / ` +
          `brotli:${prettyBytes(r.brotli, { minimumFractionDigits: 3 })}`,
      )
    }
  })
