import fs from 'fs-extra'

// 按需复制文档，因为部分文档构建会报错
const docList = [
  'changelog',
  'envpreparation-open',
  'faq',
  'form-valid',
  'i18n',
  'import-components',
  'installation',
  'theme',
  'mcp',
  'theme-dark'
]
docList.forEach((docName) => {
  fs.copy(
    `./node_modules/@opentiny/vue-docs/demos/pc/webdoc/${docName}.md`,
    `./tinydoc-design/guide/zh-CN/${docName}.md`
  )
})
