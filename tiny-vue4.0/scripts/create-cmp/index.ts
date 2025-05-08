import inquirer from 'inquirer'
import fs from 'node:fs'
import { camelize, capitalize, walkDir, editFile, copy } from '../common'

/**
 * 自动创建组件的脚本
 * 询问信息后，复制template到目标位置，并替换文件名和文件内容
 * 替换示例：
 * rawName= "card-item"  name= "cardItem"
 * capName= "CardItem"  cnName= "卡片选项"
 */

inquirer
  .prompt([
    {
      message: '选择组件类型',
      name: 'mode',
      type: 'select',
      choices: [
        { name: 'pc', value: 'pc' },
        { name: 'mobile', value: 'mobile' },
        { name: 'multi', value: 'multi' },
      ],
    },
    {
      message: '输入组件的连字符式名称：',
      name: 'rawName',
      type: 'input',
      default: 'card-item',
      required: true,
    },
    {
      message: '输入组件的中文名称：',
      name: 'cnName',
      type: 'input',
      required: true,
    },
  ])
  .then((answers) => {
    const { mode, rawName, cnName } = answers
    const name = camelize(rawName)
    const capName = capitalize(name)

    const templatePath = './create-cmp/template'
    const distPath = `../packages/components/${mode}/src/${rawName}`

    // 1、 目标下是否有该组件
    if (fs.existsSync(distPath)) {
      console.log(`目标位置已经存在 ${mode}/${rawName} 的组件，请确认！`)
      return
    }

    // 2、复制目录
    copy(templatePath, distPath)

    // 3、遍历目录下的所有目录和文件，进行名称替换
    walkDir(distPath, {
      onFile(fileName, dirName) {
        const newName = `${dirName}/${fileName.replace('name', rawName)}`

        fs.renameSync(`${dirName}/${fileName}`, newName)
        editFile(newName, (content) => {
          return content
            .replaceAll('$name$', name) //
            .replaceAll('$cnName$', cnName)
            .replaceAll('$capName$', capName)
            .replaceAll('$rawName$', rawName)
        })
      },
    })

    // 4、 打印后续消息
    console.log(`---------${capName} 组件创建成功，请手动在${mode}/index.ts 文件中增加导出！\n\n`)
  })
