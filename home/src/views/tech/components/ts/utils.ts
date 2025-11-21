import { articleMdData } from './article'
import { activeData } from './active'
import { moreData, techData, enjoyData, engineData, vueData } from './video'
import * as FlexSearch from 'flexsearch'

export const scrollToView = async (save) => {
  const anchorElement = document.getElementById(save.serial)
  if (anchorElement) {
    anchorElement.style.background = '#f5f5f5'
    anchorElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    delay(() => {
      anchorElement.style.background = 'initial'
    }, 1000)
  }
}

export const delay = (callback, ms) => {
  const start = performance.now()
  const checkProgress = () => {
    const elapsed = performance.now() - start
    if (elapsed < ms) {
      requestAnimationFrame(checkProgress)
    } else {
      callback()
    }
  }
  requestAnimationFrame(checkProgress)
}

// 技术文章
export const allData = () => {
  // 技术文章
  const dataArticle = articleMdData()
  // 热门活动
  const dataActiveData = activeData()
  // 视频课程
  const more = moreData()
  const tech = techData()
  const enjoy = enjoyData()
  const engine = engineData()
  const vues = vueData()
  let idCounter = 1 // 初始化计数器
  const concatArr = [
    Object.assign(
      { info: { routeTo: 'article', name: '使用指南', subname: 'Tinyvue', mode: 'guide', type: 'tinyvue' } },
      { data: dataArticle.guide.data.tinyvue }
    ),
    Object.assign(
      { info: { routeTo: 'article', name: '使用指南', subname: 'Tinyengine', mode: 'guide', type: 'tinyengine' } },
      { data: dataArticle.guide.data.tinyengine }
    ),
    Object.assign(
      { info: { routeTo: 'article', name: '使用指南', subname: 'Tinypro', mode: 'guide', type: 'tinypro' } },
      { data: dataArticle.guide.data.tinypro }
    ),
    Object.assign(
      { info: { routeTo: 'article', name: '使用指南', subname: 'Tinycli', mode: 'guide', type: 'tinycli' } },
      { data: dataArticle.guide.data.tinycli }
    ),
    Object.assign(
      { info: { routeTo: 'article', name: '原理解析', subname: 'Tinyvue', mode: 'analysis', type: 'tinyvue' } },
      { data: dataArticle.analysis.data.tinyvue }
    ),
    Object.assign(
      { info: { routeTo: 'article', name: '特性介绍', subname: 'Tinycharts', mode: 'feature', type: 'tinycharts' } },
      { data: dataArticle.feature.data.tinycharts }
    ),
    Object.assign(
      { info: { routeTo: 'article', name: '特性介绍', subname: 'Tinyeditor', mode: 'feature', type: 'tinyeditor' } },
      { data: dataArticle.feature.data.tinyeditor }
    ),
    Object.assign(
      { info: { routeTo: 'article', name: '特性介绍', subname: 'Tinyengine', mode: 'feature', type: 'tinyengine' } },
      { data: dataArticle.feature.data.tinyengine }
    ),
    Object.assign(
      { info: { routeTo: 'article', name: '特性介绍', subname: 'Tinypro', mode: 'feature', type: 'tinypro' } },
      { data: dataArticle.feature.data.tinypro }
    ),
    Object.assign(
      { info: { routeTo: 'article', name: '特性介绍', subname: 'Tinyvue', mode: 'feature', type: 'tinyvue' } },
      { data: dataArticle.feature.data.tinyvue }
    ),
    Object.assign(
      { info: { routeTo: 'article', name: '前端技术', subname: 'Node', mode: 'technology', type: 'node' } },
      { data: dataArticle.technology.data.node }
    ),
    Object.assign(
      { info: { routeTo: 'article', name: '前端技术', subname: 'Other', mode: 'technology', type: 'other' } },
      { data: dataArticle.technology.data.other }
    ),
    Object.assign(
      { info: { routeTo: 'article', name: '前端技术', subname: 'Zone', mode: 'technology', type: 'zone' } },
      { data: dataArticle.technology.data.zone }
    ),
    Object.assign(
      { info: { routeTo: 'events', name: '热门活动', mode: 'hot', type: 'hot' } },
      { data: dataActiveData.hot.data }
    ),
    Object.assign(
      { info: { routeTo: 'events', name: '最新活动', mode: 'news', type: 'news' } },
      { data: dataActiveData.news.data }
    ),
    Object.assign({ info: { routeTo: 'video', name: '更多', mode: 'more' } }, { data: more }),
    Object.assign({ info: { routeTo: 'video', name: 'OpenTiny开发者技术实践', mode: 'tech' } }, { data: tech }),
    Object.assign({ info: { routeTo: 'video', name: 'OpenTiny前端解决方案技术分享', mode: 'enjoy' } }, { data: enjoy }),
    Object.assign({ info: { routeTo: 'video', name: 'TinyEngine低代码引擎系列', mode: 'engine' } }, { data: engine }),
    Object.assign({ info: { routeTo: 'video', name: 'TinyVue组件库系列', mode: 'vue' } }, { data: vues })
  ]
  concatArr.forEach((obj) => {
    if (Array.isArray(obj.data)) {
      obj.data.forEach((item) => {
        item['id'] = idCounter++
      })
    }
  })

  return concatArr
}

const addSearchIndex = (arr, index) => {
  arr.data.forEach((elem) => {
    const obj = { id: elem.id, title: elem.title, content: elem.content || '' }
    index.add(obj)
  })
}

export const useFlexSearch = (data, keyword) => {
  const index = new FlexSearch.Document({
    encode: (str) =>
      str
        .toLowerCase()
        .replace(/[“”“, 。！ ？ 、]/g, ' ')
        .replace(/([a-z]+)/gi, ' $1 ')
        .replace(/([\u4e00-\u9fa5])/g, ' $1 ')
        .split(/\s+/)
        .filter(Boolean),
    tokenize: 'forward',
    document: {
      id: 'id',
      index: ['title', 'content'],
      store: ['title', 'content']
    }
  })

  data.forEach((elem) => {
    addSearchIndex(elem, index)
  })

  const arr: { id: string | number; title: string }[] = []
  return new Promise((resolve) => {
    if (!keyword) return resolve([])

    const res = index.search(keyword, { limit: 50, enrich: true })
    const set = new Set()

    for (const filedRes of res) {
      for (const { id, doc } of filedRes.result) {
        if (set.has(id)) continue
        set.add(id)
        arr.push({ id: id, title: doc.title })
      }
    }
    resolve(arr) // 确保调用 resolve 来返回结果
  })
}

export const downloadFile = (filePath, fileName) => {
  const link = document.createElement('a')

  // 确保 filePath 不以斜杠开头
  const href = filePath.startsWith('/') ? filePath.slice(1) : filePath
  // 根据环境设置 link.href
  link.href = `${import.meta.env.BASE_URL}${href}`
  link.download = fileName || 'download-file'
  document.body.appendChild(link)

  link.click()
  document.body.removeChild(link)
}

export const getLabel = (msg) => {
  if (msg === 'Next') {
    return 'OpenTiny Next'
  }

  if (msg === 'Tinycli') {
    return 'TinyCLI'
  }

  return msg
}
