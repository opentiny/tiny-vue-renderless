const { sep, join } = require('path')
const { existsSync, statSync } = require('fs-extra')
const {
  getInputCmd,
  execCmd,
  kebabCase,
  logGreen,
  walkFileTree,
  logRed
} = require('./utils')

/**
 * 快捷测试命令，支持单组件、多组件以都号分割、文件夹（非深度遍历）
 *
 * 组件名称支持格式：ImgPreview 或 img-preview
 *
 * yarn test 测试全部用例
 * yarn test Loading 测试单个组件
 * yarn test loading,rate,search 测试多个组件
 * yarn test common 测试 commom 文件夹
 * yarn test Loading --coverage 支持后面带 jest 指令（默认 --no-cache）
 *
 */

const args = getInputCmd()
const uiMatchs = []
const uiNames = (args[0] || 'test').split(',')
const testArgs = args.slice(0)
const noCache = '--no-cache'
const specSuffixes = '.spec.js'
const testRootPath = '../test/'
const defaultCmd = testRootPath + '**/*' + specSuffixes
let cmdStr = 'jest '

uiMatchs.push('--testMatch')

for (let i = 0, len = uiNames.length; i < len; i++) {
  if (uiNames[i]) {
    const fileName = kebabCase({ str: uiNames[i].trim() })
    const isRootPath = testRootPath.indexOf('/' + fileName + '/') > -1
    const testPath = testRootPath + `${isRootPath ? '' : fileName}`
    const testPathLink = join(__dirname, testPath)

    if (!isRootPath) {
      if (existsSync(testPathLink) && statSync(testPathLink).isDirectory()) {
        walkFileTree({
          dirPath: testPathLink,
          isDeep: false,
          callback: (file, subPath) => {
            if (file.indexOf(specSuffixes) > -1) {
              const rootPart = sep + fileName + sep
              const newPathPart = subPath
                .substring(subPath.indexOf(rootPart) + rootPart.length - 1)
                .replace(sep, '/')
              const matchPath = testPath + newPathPart

              !uiMatchs.includes(matchPath) &&
                uiMatchs.push(testPath + newPathPart)
            }
          }
        })
      } else {
        const matchPath = testPath + specSuffixes
        existsSync(testPathLink + specSuffixes) &&
          !uiMatchs.includes(matchPath) &&
          uiMatchs.push(testPath + specSuffixes)
      }
    } else {
      uiMatchs.length = 1
      uiMatchs.push(defaultCmd)
      break
    }
  }
}

for (let i = testArgs.length; i >= 0; i--) {
  if ((testArgs[i] || '').indexOf('-') === -1) {
    testArgs.splice(i, 1)
  }
}

if (uiMatchs.length === 1) {
  if (uiNames.length === 0 || testArgs.length > 0) {
    uiMatchs.push(defaultCmd)
  } else {
    cmdStr = ''
  }
}

if (cmdStr) {
  cmdStr += uiMatchs.map((item) => item.replace('../', '**/')).join(' ')
  !testArgs.includes(noCache) && testArgs.push(noCache)
  cmdStr += ' ' + testArgs.join(' ')

  try {
    logGreen(cmdStr)
    execCmd(cmdStr)
  } catch (e) {
    e
  }
} else {
  logRed(
    `Enter the file or folder : ${uiNames.join(
      ','
    )} is not exist , please enter valid name.`
  )
}
