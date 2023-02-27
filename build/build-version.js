const fs = require('fs-extra')
const path = require('path')
const utils = require('./utils')

/**
 * 在文件 src/common/index.js 注入版本规则
 */

const RUNTIME_VERSION = 'process.env.RUNTIME_VERSION'
const BASE_RUNTIME_PATH = path.join(__dirname, '..', 'dist', 'common')
const RENDERLESS_VERSION = fs.readJsonSync(path.join(__dirname, '../package.json')).version;
['index.js', 'runtime.js'].forEach((fileName) => {
  const fullPath = path.join(BASE_RUNTIME_PATH, fileName)

  if (fs.existsSync(fullPath)) {
    let scriptContent = fs.readFileSync(fullPath).toString('UTF-8')

    scriptContent = scriptContent.replace(RUNTIME_VERSION, `'${RENDERLESS_VERSION}'`)

    fs.writeFileSync(fullPath, scriptContent)
  }
})

utils.logGreen('npm run build:version done.')
