import ApiAppAI from 'lowcode-design-public/docs/api-app-ai.md?raw'
import ApiAppManage from 'lowcode-design-public/docs/api-app-manage.md?raw'
import ApiAppUtilManage from 'lowcode-design-public/docs/api-app-util-manage.md?raw'
import ApiBlockGroup from 'lowcode-design-public/docs/api-block-group.md?raw'
import ApiBlock from 'lowcode-design-public/docs/api-block.md?raw'
import ApiAppDataSource from 'lowcode-design-public/docs/api-data-source.md?raw'
import ApiDsl from 'lowcode-design-public/docs/api-dsl.md?raw'
import ApiMaterial from 'lowcode-design-public/docs/api-material.md?raw'
import ApiPage from 'lowcode-design-public/docs/api-page.md?raw'
import ApiService from 'lowcode-design-public/docs/api-service.md?raw'
import i18nSource from 'lowcode-design-public/docs/otherPro/i18nSource.md?raw'
import catalog from '@tiny-engine-docs/catalog.json'

/**
 * interface
 * {
 *    id: number; // course.json里的id；id 需要和 course.json里的id一致
 *    label?: string; // 文档标题
 *    docs: object; // 对应的文档
 * }
 */

export const BackendApiDocList = [
  { id: 39, label: 'AI功能接口', docs: ApiAppAI },
  { id: 40, label: '应用管理', docs: ApiAppManage },
  { id: 41, label: '区块分类', docs: ApiBlockGroup },
  { id: 42, label: '应用工具类管理', docs: ApiAppUtilManage },
  { id: 43, label: '区块管理', docs: ApiBlock },
  { id: 44, label: '数据源管理', docs: ApiAppDataSource },
  { id: 45, label: 'DSL代码生成', docs: ApiDsl },
  { id: 12, label: '国际化管理', docs: i18nSource },
  { id: 47, label: '物料中心', docs: ApiMaterial },
  { id: 48, label: '页面管理', docs: ApiPage },
  { id: 49, label: 'APP服务', docs: ApiService },
  {
    id: 50,
    label: '基础数据SQL文件',
    href: 'https://tinyengine-assets.obs.cn-north-4.myhuaweicloud.com/files/%E5%9F%BA%E7%A1%80%E6%95%B0%E6%8D%AE.sql'
  },
  {
    id: 53,
    label: '自实现数据中心-设计器涉及表',
    href: 'https://tinyengine-assets.obs.cn-north-4.myhuaweicloud.com/files/%E8%87%AA%E5%AE%9E%E7%8E%B0%E6%95%B0%E6%8D%AE%E4%B8%AD%E5%BF%83-%E8%AE%BE%E8%AE%A1%E5%99%A8%E6%B6%89%E5%8F%8A%E8%A1%A8.sql'
  }
]

/**
 * @typedef {Object} Article
 * @property {string} title
 * @property {string} name
 * @property {Article[]} [articles]
 */

/**
 * @typedef {Article&{articles:Article[]}} Section
 */

/**
 * @typedef {Object} Chapter
 * @property {string} title
 * @property {string} type
 * @property {Section[]} sections
 */

const allDocsMap = {}

/**
 *
 * @param {Article} article
 */
const formatArticle = (article, parentPath) => {
  const { name, title, articles } = article
  const path = `${parentPath}/${name}`

  const result = {
    // url路径去掉末尾的".md"
    id: name.replace(/\.md$/, ''),
    label: title,
    path,
    isDoc: false
  }

  if (Array.isArray(articles) && articles.length > 0) {
    result.children = articles.map((item) => formatArticle(item, path))
  } else {
    result.isDoc = true
    allDocsMap[result.id] = result
  }

  return result
}

/**
 * @type {Chapter[]}
 */
const chapters = catalog.chapters

export const allDocsData = chapters
  .map((chapter) => {
    return chapter.sections.map((section) => {
      return {
        id: section.name,
        label: section.title,
        type: chapter.type,
        children: section.articles.map((item) => formatArticle(item, section.name))
      }
    })
  })
  .flat()

const docPaths = Object.entries(import.meta.glob('@tiny-engine-docs/**/*.md'))
  .map(([key, value]) => ({
    key: key.replace(/^\/tiny-engine\/docs\//, ''),
    value
  }))
  .reduce((result, curr) => ({ ...result, [curr.key]: curr.value }), {})

export async function getDoc(data) {
  const mod = await docPaths[data.path]()

  return mod.markdown
}

export function getDocDataById(id) {
  return allDocsMap[id]
}
