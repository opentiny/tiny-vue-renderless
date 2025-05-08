// 存放一些Node环境中，公用的方法： 比如遍历目录，替换文本，编译，字符工具等等

export { camelize, capitalize, hyphenate } from '@vue/shared' // camelize：转小驼峰 hyphenate:转连字符

export { copy, walkDir, editFile } from './fs'

// 示例： await glob(['files/*.ts', '!**/*.d.ts'], { cwd: 'src' })
export { glob, globSync } from 'tinyglobby'

// 解析命令行参数, Node 18提供了该函数后， vue等库都删除了第3方的参数解析库。
// 建议复杂的启动命令时，不要使用参数，都使用 inquirer 库询问！
export { parseArgs } from 'node:util'
