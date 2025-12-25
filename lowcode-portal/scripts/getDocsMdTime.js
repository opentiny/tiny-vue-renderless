const path = require('path')
const fs = require('fs')
const { exec } = require('node:child_process')


/**
 * 获取文件名
*/

const getFileName =  async(catalog) => {
  let list = []
  catalog.chapters.forEach((chapter) => {
    chapter.sections.forEach((section)=> {
      section.articles.forEach((article) => {
        if (Array.isArray(article.articles) && article.articles.length > 0) {
          article.articles.forEach((subarticle) => {
            list.push({
              type: chapter.type,
              name: `docs/${section.name}/${article.name}/${subarticle.name}`,
              path: `${article.name}/${subarticle.name.replace(/\.md$/, '')}`,
              subName: subarticle.name.replace(/\.md$/, ''),
              title: subarticle.title
            })
          })
      } else {
          list.push({
            type: chapter.type,
            name: `docs/${section.name}/${article.name}`,
            path: article.name.replace(/\.md$/, ''),
            subName: article.name.replace(/\.md$/, ''),
            title: article.title
          })
        }
      })
    })
  })
  return list
}

/**
 * 获取更新时间列表
 */
const getFileTime = async (catalog) => {
  const fileList = await getFileName(catalog)
  const timeList = await Promise.all(
    fileList.map(async (item) => {
      const params = {
        ...item,
        time: await getTime(item.name)
      }
      return params
    })
  )
  return timeList
}


/**
 * 获取单个文件更新时间
 */
const getTime = (name) => {
  return new Promise((resolve) => {
    const targetDir = path.resolve(__dirname, '../tiny-engine')
    exec(`git log -1 --format="%ai" ${name}`, { cwd: targetDir }, (error, stdout, stderr) => {
      if (error) {
        return 
      }
      const lines = stdout.split('\n')
      const lastLine = lines[lines.length - 2]
      resolve(lastLine)
    })
  })
}

/**
 * 生成json文件
 */
async function writeToFile() {
  const outputPath = path.join(__dirname, '../src/help/course/docsTime.json')
  if (fs.existsSync('./tiny-engine/docs/catalog.json')) {
    const catalog = fs.readFileSync('./tiny-engine/docs/catalog.json', 'utf-8')
    const catalogData = JSON.parse(catalog)
    const timeData = await getFileTime(catalogData)
    const timeJson = JSON.stringify(timeData, null, 2)
    fs.writeFileSync(outputPath, timeJson, 'utf8')
  } else {
    fs.writeFileSync(outputPath, '', 'utf8')
  }
}

writeToFile()
