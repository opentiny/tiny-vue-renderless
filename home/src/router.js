import { computed } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/layout/layout.vue'
import { VITE_CONTEXT, isTinyCloud, menuPathMap } from './shared'
import { $t, $t2, geneTitle, getI18n, pathJoin } from './tools'
const Resource = () => import('@/views/resource/index.vue')
const Guide = () => import('@/views/guide/index.vue')
const ComponentOverview = () => import('@/views/overview/overview.vue')
const HomePage = () => import('@/views/home/index.vue')

const Docs = () => import('@/views/docs/docs.vue')
const Tech = () => import('@/views/tech/index.vue')
const Article = () => import('@/views/tech/components/article-detail-page.vue')
const Video = () => import('@/views/tech/components/video-page.vue')
const Write = () => import('@/views/tech/components/article-page.vue')
const Events = () => import('@/views/tech/components/activity-page.vue')
const About = () => import('@/views/about/index.vue')
const Developing = () => import('@/views/developing/index.vue')
const Tools = () => import('@/views/tools/index.vue')
const IconPage = () => import('@/views/icon/index.vue')
const langKey = computed(() => $t2('zh-CN', 'en-US'))

export const rootRoutes = [
  {
    path: VITE_CONTEXT,
    component: Layout,
    children: [
      {
        path: '',
        component: HomePage,
        name: 'home',
        meta: { title: geneTitle('') }
      },
      {
        path: 'opentiny-design',
        children: [
          {
            path: '',
            redirect: { path: `${VITE_CONTEXT}opentiny-design/design-principle` }
          },
          {
            path: 'guide',
            children: [
              {
                path: '',
                redirect: { path: `${VITE_CONTEXT}opentiny-design/guide/installation` }
              },
              {
                path: ':docId',
                component: Guide,
                name: 'guide',
                meta: { title: geneTitle('指南') },
                props: (route) => {
                  const {
                    params: { docId }
                  } = route

                  return {
                    mdPath: `tinydoc-design/guide/${langKey.value}/${docId}.md`
                  }
                }
              }
            ],
            meta: { title: geneTitle('指南') },
            props: (route) => {
              const {
                params: { docId },
                path
              } = route
              const { mdPath } = menuPathMap.value.get(path) || {}
              return {
                mdPath: getI18n(mdPath)
              }
            }
          },
          {
            path: 'tech',
            name: 'tech',
            component: Tech,
            children: [
              {
                path: 'write',
                name: 'write',
                component: Write,
                meta: { title: geneTitle('技术文章') }
              },
              {
                path: 'video',
                name: 'video',
                component: Video,
                meta: { title: geneTitle('视频课程') }
              },
              {
                path: 'events',
                name: 'events',
                component: Events,
                meta: { title: geneTitle('热门活动') }
              }
            ],
            meta: { title: geneTitle('技术学院') }
          },
          {
            path: `article/:mode/:type/:serial`,
            name: 'article',
            component: Article,
            meta: { title: geneTitle('文章详情') }
          },
          {
            path: `article/:mode/:serial`,
            name: 'articleWithoutType',
            component: Article,
            meta: { title: geneTitle('文章详情') }
          },
          {
            path: 'about',
            component: About,
            meta: { title: geneTitle('关于我们') }
          }
        ]
      },
      {
        name: 'not-found',
        path: ':pathMatch(.*)*',
        redirect: ({ path }) => {
          if (sessionStorage.getItem('opentiny_design_reloaded') !== 'true') {
            sessionStorage.setItem('opentiny_design_reloaded', 'true')
            return location.reload()
          }
          sessionStorage.removeItem('opentiny_design_reloaded')
          return { path: VITE_CONTEXT }
        }
      }
    ]
  }
]
const router = createRouter({
  mode: 'history',
  history: createWebHistory(),
  routes: rootRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { selector: to.hash }
    } else {
      return { x: 0, y: 0 }
    }
  }
})

const removeEmptyHash = async () => {
  const originReplaceState = history.replaceState
  function replaceState(...args) {
    const urlIndex = 2
    if (typeof args[urlIndex] === 'string') {
      args[urlIndex] = args[urlIndex].replace(/#\/?$/, '')
    }
    return originReplaceState.apply(this, args)
  }
  history.replaceState = replaceState
}

removeEmptyHash()

// 为浏览器添加title
router.afterEach((to, from) => {
  if (to.meta?.title) {
    document.title = to.meta.title
  }
  isTinyCloud.value = to.path.startsWith(`${VITE_CONTEXT}opentiny-design/design-develop/console/tiny-cloud/`)
})
export { router }
