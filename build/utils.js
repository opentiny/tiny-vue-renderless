const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const { execSync } = require('child_process')

// const logger = console.log 本地开发时打开
const logger = () => {}

/**
 * 根据运行上下文获取路径（运行时打包用）
 * @returns 文件绝对路径
 */
const resolveCwd = (...args) => {
  return path.join(process.cwd(), ...args)
}

/**
 * 获取模板替换路径（动态）
 * @param {String} posixPath 路径
 * @returns 文件绝对路径
 */
const assetsPath = (posixPath) => {
  return path.posix.join('static', posixPath)
}

/**
 * 根据运行上下文获取，当前运行组件的名称
 * @returns 当前运行组件目录名称
 */
const getComponentName = () => {
  return process.cwd().split(path.sep).pop()
}

/**
 * 获取当前上下文的路径
 * @returns 文件绝对路径
 */
const pathJoin = (...args) => {
  return path.join(__dirname, ...args)
}

/**
 * 获取用户输入命令参数
 * @returns 参数数组
 */
const getInputCmd = () => {
  const args = []
  const argv = process.argv || []

  argv.forEach((item) => {
    if (item.indexOf(path.sep) === -1) {
      args.push(item)
    }
  })

  return args
}

/**
 * 执行 node 命令
 * @param {String} cmdStr 命令字符串
 */
const execCmd = (cmdStr) => {
  cmdStr && execSync(cmdStr, { stdio: 'inherit' })
}

/**
 * 首字母大写
 * @param {String} str 字符串
 * @returns 字符串
 */
const capitalize = (str) => {
  return typeof str === 'string'
    ? str.slice(0, 1).toUpperCase() + str.slice(1)
    : str
}

/**
 * @description 将驼峰字符串转化为以指定字符分割的小写字符串
 * @example kebabCase({ str : 'ImgPreviewItem' } )
 * @example 输出结果：img-preview-item
 *
 * @param str 字符串
 * @param splitChar 分隔符
 */
const kebabCase = ({ str, splitChar = '-' }) => {
  if (!str || typeof str !== 'string') return str

  return str
    .split('')
    .map((char, index) => {
      const charCod = char.charCodeAt(0)

      if (charCod < 65 || charCod > 122) return char

      return (charCod >= 65 && charCod) <= 90
        ? (index !== 0 ? splitChar : '') + char.toLowerCase()
        : char
    })
    .join('')
}

/**
 * 根据文件路径判断是否为文件，未创建的文件路径
 * @param {String} pathLink 文件路径
 */
const isVirtualFile = (pathLink) => {
  return ['.js', '.css', '.json', '.vue', '.log', '.md'].some(
    (item) => pathLink.lastIndexOf(item) > pathLink.length - 5
  )
}

/**
 * 根据文件 url 创建对应的文件夹
 * @param {String} targetDir 文件路径
 * @example mkdirByPathSync('../aa/bb/cc') 生成 aa/bb/cc 文件夹
 */
const mkdirByPathSync = (targetDir) => {
  const initDir = path.isAbsolute(targetDir) ? targetDir : pathJoin(targetDir)
  const isFile = isVirtualFile(initDir)
  let baseDir = initDir.split(path.sep)

  isFile && baseDir.pop()
  baseDir = baseDir.join(path.sep)

  if (!fs.existsSync(baseDir)) {
    fs.mkdirsSync(baseDir)
  }

  return targetDir
}

/**
 * 删除指定目录下的所有文件或文件夹
 * @param {String} targetDir 文件路径
 */
const rmdirAll = (targetDir) => {
  const initDir = path.isAbsolute(targetDir) ? targetDir : pathJoin(targetDir)
  const isFile = isVirtualFile(initDir)
  let baseDir = initDir.split(path.sep)

  isFile && baseDir.pop()
  baseDir = baseDir.join(path.sep)

  if (fs.existsSync(baseDir)) {
    fs.removeSync(baseDir)
  }
}

/**
 * 扫描指定目录下面的组件目录
 * @param {String} dirPath 绝对路径
 * @param {Boolean} isDeep 是否深度遍历
 * @param {Function} callback 遍历回调
 */
const walkFileTree = ({ dirPath, isDeep = false, callback }) => {
  if (!dirPath || typeof callback !== 'function') return

  const dirs = fs.readdirSync(
    path.isAbsolute(dirPath) ? dirPath : path.join(__dirname, dirPath)
  )

  if (Array.isArray(dirs) && dirs.length > 0) {
    dirs.forEach((file) => {
      const subPath = path.join(dirPath, file)

      if (fs.statSync(subPath).isDirectory()) {
        if (isDeep) {
          walkFileTree({ isDeep, dirPath: subPath, callback })
        } else {
          callback(file, subPath, dirs)
        }
      } else {
        callback(file, subPath, dirs)
      }
    })
  }
}

/**
 * 在控制台显示绿色提示
 * @param {String} 提示内容
 */
const logGreen = (str) => {
  logger(chalk.green('### ' + str))
}

/**
 * 在控制台显示黄色提示
 * @param {String} 提示内容
 */
const logYellow = (str) => {
  logger(chalk.yellow('### ' + str))
}

/**
 * 在控制台显示青色提示
 * @param {String} 提示内容
 */
const logCyan = (str) => {
  logger(chalk.cyan('### ' + str))
}

/**
 * 在控制台显示红色提示
 * @param {String} 提示内容
 */
const logRed = (str) => {
  logger(chalk.red('### ' + str))
}

/**
 * 采用 prettier 美化字符串
 * @param {String} str 格式字符
 * @param {Object} options 格式字符
 */
const prettierFormat = ({ str, options = {} }) => {
  return require('prettier').format(str, {
    printWidth: 100,
    jsxBracketSameLine: false,
    tabWidth: 2,
    useTabs: false,
    singleQuote: true,
    semi: false,
    trailingComma: 'none',
    bracketSpacing: true,
    parser: 'babel',
    ...options
  })
}

module.exports = {
  logRed,
  logCyan,
  execCmd,
  pathJoin,
  rmdirAll,
  logGreen,
  kebabCase,
  logYellow,
  assetsPath,
  resolveCwd,
  capitalize,
  getInputCmd,
  walkFileTree,
  mkdirByPathSync,
  getComponentName,
  prettierFormat
}
