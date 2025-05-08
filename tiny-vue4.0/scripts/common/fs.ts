import fs from 'node:fs'
import pico from 'picocolors'
import shell from 'shelljs'

/** 文件和文件夹的访问者 */
export interface DirVisitor {
  onFile?: (fileName: string, dirName: string) => void
  onDirectory?: (dirName: string) => void
}

/** 遍历文件夹下的文件夹和文件, 并使用访问者模式进行分别处理 */
export function walkDir(directory: string, visitor: DirVisitor) {
  const stat = fs.statSync(directory)
  if (!stat.isDirectory()) return

  // 遍历文件和文件夹
  fs.readdirSync(directory).forEach((fileOrDir) => {
    const fullPath = `${directory}/${fileOrDir}`
    const stat = fs.statSync(`${directory}/${fileOrDir}`)

    if (stat.isFile()) {
      if (visitor.onFile) {
        visitor.onFile(fileOrDir, directory)
      }
    } else if (stat.isDirectory()) {
      if (visitor.onDirectory) {
        visitor.onDirectory(fullPath)
      }
      walkDir(fullPath, visitor)
    }
  })
}

/** 使用回调修改文件 */
export function editFile(filename: string, editFn: (content: string) => string) {
  try {
    fs.accessSync(filename, fs.constants.O_RDWR)
    let content = fs.readFileSync(filename, 'utf-8')
    content = editFn(content)

    fs.writeFileSync(filename, editFn(content), 'utf-8')
  } catch {
    pico.red(`${filename} 访问失败！`)
  }
}

/** 整体拷贝目录或文件 */
export function copy(from: string, to: string) {
  shell.cp('-r', from, to)
}
