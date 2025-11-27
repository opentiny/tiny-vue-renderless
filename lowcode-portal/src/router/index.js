import { createRouter, createWebHashHistory } from 'vue-router'
import { Notify } from '@opentiny/vue'
import {
  guideline,
  changelogPortal,
  changelogDesign,
  materialPanel,
  vscode,
  domTree,
  page,
  block,
  dataSource,
  resource,
  i18n,
  script,
  state,
  schema,
  toolbar,
  setting,
  buildMaterial,
  buildPlatform,
  permissionManagement
} from '../help'
import { requestEvent } from '../monitor/http.js'
import { getExtendRoute } from '../application/ApplicationSetting'
import { fetchCurrentUser } from '../permission/http'
import { user, routeMap, isMaster, isAdmin } from 'lowcode-design-controller'
import { LOCAL_STORAGE, refreshHeadMenuList } from 'lowcode-design-controller/utils'

const routes = [
  {
    path: '/',
    name: 'app',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'teamHome',
    component: () => import('../home/Main.vue'),
    meta: { activeMenuName: 'teamHome' }
  },
  {
    path: '/home/create',
    name: 'teamHomeCreate',
    component: () => import('../home/HomeCreate.vue'),
    meta: { activeMenuName: 'teamHomeCreate' }
  },
  {
    path: '/home/apply',
    name: 'teamHomeApply',
    component: () => import('../home/ApplyPage.vue'),
    meta: { activeMenuName: 'teamHomeApply' }
  },
  {
    path: '/my-platform',
    name: 'myPlatform',
    component: () => import('../platform/PlatformCenter.vue'),
    meta: {
      activeMenuName: 'myPlatform'
    }
  },
  {
    path: '/my-platform/create',
    name: 'myPlatformCreate',
    component: () => import('../platform/PlatformCreate.vue'),
    meta: {
      activeMenuName: 'myPlatformCreate'
    }
  },
  {
    path: '/platform-center',
    name: 'platformCenter',
    component: () => import('../platform/PlatformCenter.vue'),
    meta: { activeMenuName: 'platformCenter' }
  },
  {
    path: '/my-material',
    name: 'myMaterial',
    redirect: {
      name: 'ecosystemMaterial',
      params: { activeName: 'myMaterial' }
    }
  },
  {
    path: '/my-material/create',
    name: 'myMaterialCreate',
    redirect: '/ecosystem/material/create'
  },
  {
    path: '/my-application',
    name: 'myApplication',
    component: () => import('../application/ApplicationCenter.vue'),
    meta: { activeMenuName: 'myApplication' }
  },
  {
    path: '/application-center',
    name: 'applicationCenter',
    component: () => import('../application/ApplicationCenter.vue'),
    meta: { activeMenuName: 'applicationCenter' }
  },
  {
    path: '/tiny-engine-editor',
    name: 'applicationVisit',
    component: () => import('../application/ApplicationVisit.vue')
  },
  {
    path: '/component-lib-import',
    name: 'componentsLibImport',
    component: () => import('../ecosystem/material/ComponentLibImport.vue'),
    meta: { activeMenuName: 'ecosystem' }
  },
  {
    path: '/ecosystem',
    name: 'ecosystem',
    component: () => import('../ecosystem/Main.vue'),
    redirect: '/ecosystem/material',
    meta: { activeMenuName: 'ecosystem' },
    children: [
      {
        path: 'material/:activeName?',
        name: 'ecosystemMaterial',
        component: () => import('../ecosystem/material/Main.vue'),
        meta: { activeMenuName: 'ecosystem' }
      },
      {
        path: 'material/create',
        name: 'createMaterial',
        component: () => import('../ecosystem/material/MaterialCreate.vue'),
        meta: {
          activeMenuName: 'ecosystem'
        }
      },
      {
        path: 'component-import',
        name: 'componentImport',
        component: () => import('../ecosystem/material/ComponentImport.vue'),
        meta: { activeMenuName: 'ecosystem' }
      },
      {
        path: 'block-import',
        name: 'blockImport',
        component: () => import('../ecosystem/material/BlockImport.vue'),
        meta: { activeMenuName: 'ecosystem' }
      },
      {
        path: 'plugin',
        name: 'ecosystemPlugin',
        props: { category: 'plugin' },
        component: () => import('../ecosystem/extension/Main.vue'),
        meta: { activeMenuName: 'ecosystemPlugin' }
      },
      {
        path: 'toolbar',
        name: 'ecosystemToolbar',
        props: { category: 'toolbar' },
        component: () => import('../ecosystem/extension/Main.vue'),
        meta: { activeMenuName: 'ecosystemToolbar' }
      },
      {
        path: 'theme',
        name: 'ecosystemTheme',
        props: { category: 'theme' },
        component: () => import('../ecosystem/extension/Main.vue'),
        meta: { activeMenuName: 'ecosystemTheme' }
      },
      {
        path: 'dsl',
        name: 'ecosystemDsl',
        props: { category: 'dsl' },
        component: () => import('../ecosystem/extension/Main.vue'),
        meta: { activeMenuName: 'ecosystemDsl' }
      },
      {
        path: 'app',
        name: 'ecosystemApp',
        props: { category: 'appExtension' },
        component: () => import('../ecosystem/extension/Main.vue'),
        meta: { activeMenuName: 'ecosystemApp' }
      }
    ]
  },
  {
    path: '/help-center',
    name: 'helpCenter',
    component: () => import('../help/Main.vue'),
    redirect: '/help-center/index',
    meta: { activeMenuName: 'help' },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('../help/home/Main.vue'),
        meta: { activeMenuName: 'help' }
      },
      {
        path: 'changelog',
        name: 'changelog',
        component: () => import('../help/markdownRender/Main.vue'),
        props: { changelogPortal, changelogDesign },
        meta: { activeMenuName: 'help' }
      },
      {
        path: 'vscode',
        name: 'vscode',
        component: () => import('../help/markdownRender/Main.vue'),
        props: { md: vscode },
        meta: { activeMenuName: 'help' }
      },
      {
        path: 'guideline',
        name: 'helpGuideline',
        component: () => import('../help/markdownRender/Main.vue'),
        props: { md: guideline },
        meta: { activeMenuName: 'help' }
      },
      {
        path: 'course/:type',
        name: 'course',
        component: () => import('../help/course/Main.vue'),
        meta: { activeMenuName: 'help' },
        children: [
          {
            path: ':id',
            name: 'courseId',
            component: () => import('../help/course/Main.vue'),
            meta: { activeMenuName: 'help' }
          }
        ]
      },

      {
        path: 'course-detail/:id?',
        name: 'courseDetail',
        component: () => import('../help/course/CourseDetail.vue'),
        meta: { activeMenuName: 'help' }
      },
      {
        path: 'material-panel',
        name: 'helpMaterialPanel',
        component: () => import('../help/markdownRender/Main.vue'),
        props: { md: materialPanel },
        meta: { activeMenuName: 'help' }
      },
      {
        path: 'dom-tree',
        name: 'helpDomTree',
        component: () => import('../help/markdownRender/Main.vue'),
        props: { md: domTree },
        meta: { activeMenuName: 'help' }
      },
      {
        path: 'page',
        name: 'helpPageMana',
        component: () => import('../help/markdownRender/Main.vue'),
        props: { md: page },
        meta: { activeMenuName: 'help' }
      },
      {
        path: 'block',
        name: 'helpBlockMana',
        component: () => import('../help/markdownRender/Main.vue'),
        props: { md: block },
        meta: { activeMenuName: 'help' }
      },
      {
        path: 'data-source',
        name: 'helpDataSource',
        component: () => import('../help/markdownRender/Main.vue'),
        props: { md: dataSource },
        meta: { activeMenuName: 'help' }
      },
      {
        path: 'resource',
        name: 'helpResourceMana',
        component: () => import('../help/markdownRender/Main.vue'),
        props: { md: resource },
        meta: { activeMenuName: 'help' }
      },
      {
        path: 'i18n',
        name: 'helpI18n',
        component: () => import('../help/markdownRender/Main.vue'),
        props: { md: i18n },
        meta: { activeMenuName: 'help' }
      },
      {
        path: 'script',
        name: 'helpScript',
        component: () => import('../help/markdownRender/Main.vue'),
        props: { md: script },
        meta: { activeMenuName: 'help' }
      },
      {
        path: 'state',
        name: 'helpStateMana',
        component: () => import('../help/markdownRender/Main.vue'),
        props: { md: state },
        meta: { activeMenuName: 'help' }
      },
      {
        path: 'schema',
        name: 'helpSchema',
        component: () => import('../help/markdownRender/Main.vue'),
        props: { md: schema },
        meta: { activeMenuName: 'help' }
      },
      {
        path: 'toolbar',
        name: 'helpDesignCoreToolbar',
        component: () => import('../help/markdownRender/Main.vue'),
        props: { md: toolbar },
        meta: { activeMenuName: 'help' }
      },
      {
        path: 'setting',
        name: 'helpSetting',
        component: () => import('../help/markdownRender/Main.vue'),
        props: { md: setting },
        meta: { activeMenuName: 'help' }
      },
      {
        path: 'upload-material',
        name: 'helpUploadMaterial',
        component: () => import('../common/components/PageBlank.vue'),
        meta: { activeMenuName: 'help' }
      },
      {
        path: 'build-material',
        name: 'helpBuildMaterial',
        component: () => import('../help/markdownRender/Main.vue'),
        props: { md: buildMaterial },
        meta: { activeMenuName: 'help' }
      },
      {
        path: 'build-platform',
        name: 'helpBuildPlatform',
        component: () => import('../help/markdownRender/Main.vue'),
        props: { md: buildPlatform },
        meta: { activeMenuName: 'help' }
      },
      {
        path: 'permission-management',
        name: 'helpPermissionManagement',
        component: () => import('../help/markdownRender/Main.vue'),
        props: { md: permissionManagement },
        meta: { activeMenuName: 'help' }
      },
      {
        path: 'plugin',
        name: 'helpPlugin',
        component: () => import('../common/components/PageBlank.vue'),
        meta: { activeMenuName: 'help' }
      },
      {
        path: 'toolbar',
        name: 'helpToolbar',
        component: () => import('../common/components/PageBlank.vue'),
        meta: { activeMenuName: 'help' }
      },
      {
        path: 'theme',
        name: 'helpTheme',
        component: () => import('../common/components/PageBlank.vue'),
        meta: { activeMenuName: 'help' }
      },
      {
        path: 'dsl',
        name: 'helpDsl',
        component: () => import('../common/components/PageBlank.vue'),
        meta: { activeMenuName: 'help' }
      }
    ]
  },
  {
    path: '/monitor-center',
    name: 'monitorCenter',
    component: () => import('../monitor/Main.vue'),
    meta: { activeMenuName: 'monitor' }
  },
  {
    path: '/personal-center',
    name: 'personalCenter',
    component: () => import('../permission/PersonalCenter.vue'),
    meta: { activeMenuName: 'personalCenter' }
  },
  {
    path: '/permission-setting',
    name: 'permissionSetting',
    redirect: '/permission-setting/permission',
    component: () => import('../permission/Main.vue'),
    meta: { activeMenuName: 'permissionSetting' },
    children: [
      {
        path: 'permission',
        name: 'permissionList',
        component: () => import('../permission/PermissionList.vue'),
        meta: { activeMenuName: 'permissionSetting' }
      },
      {
        path: 'app-template-manage',
        name: 'appTemplateManage',
        component: () => import('../permission/AppTemplateManage.vue'),
        meta: { activeMenuName: 'permissionSetting' }
      },
      {
        path: 'application-list',
        name: 'applicationList',
        component: () => import('../permission/ApplicationList.vue'),
        meta: { activeMenuName: 'permissionSetting' }
      },
      {
        path: 'default-platform-manage',
        name: 'defaultPlatformManage',
        component: () => import('../permission/DefaultPlatformManage.vue'),
        meta: { activeMenuName: 'permissionSetting' }
      },
      {
        path: 'member-apply-list',
        name: 'memberApplyList',
        component: () => import('../permission/MemberApplyList.vue'),
        meta: { activeMenuName: 'permissionSetting' }
      },
      {
        path: 'member-list',
        name: 'memberList',
        component: () => import('../permission/MemberList.vue'),
        meta: { activeMenuName: 'permissionSetting' }
      },
      {
        path: 'application-manage',
        name: 'applicationManage',
        props: true,
        component: () => import('../permission/ApplicationManage.vue'),
        meta: { activeMenuName: 'applicationSetting' }
      },
      {
        path: 'course-manage',
        name: 'courseManage',
        component: () => import('../permission/course/Main.vue'),
        meta: { activeMenuName: 'applicationSetting' }
      },
      {
        path: 'aksk-manage',
        name: 'akskManage',
        component: () => import('../permission/AkskManage.vue'),
        meta: { activeMenuName: 'akskManage' }
      }
    ]
  },
  {
    path: '/protocol',
    name: 'protocol',
    component: () => import('../protocal/ApiDetail.vue')
  },
  {
    path: '/application-setting',
    name: 'applicationSetting',
    redirect: '/application-setting/base',
    component: () => import('../application/ApplicationSetting.vue'),
    meta: { activeMenuName: 'applicationSetting', breadcrumbsName: '设置应用' },
    children: [
      {
        path: 'base',
        name: 'applicationSettingBase',
        component: () => import('../application/ApplicationSettingBase.vue'),
        meta: { activeMenuName: 'applicationSetting', breadcrumbsName: '基础信息' }
      },
      {
        path: 'permission',
        name: 'applicationSettingPermission',
        component: () => import('../application/ApplicationSettingMember.vue'),
        meta: { activeMenuName: 'applicationSetting', breadcrumbsName: '应用权限' }
      },
      {
        path: 'history',
        name: 'applicationSettingHistory',
        component: () => import('../application/ApplicationSettingHistory.vue'),
        meta: { activeMenuName: 'applicationSetting', breadcrumbsName: '历史记录' }
      }
    ]
  },
  {
    path: '/platform-setting',
    name: 'platformSetting',
    redirect: '/platform-setting/base',
    component: () => import('../platform/PlatformSetting.vue'),
    meta: { activeMenuName: 'platformSetting', breadcrumbsName: '设计器设置' },
    children: [
      {
        path: 'base',
        name: 'platformSettingBase',
        component: () => import('../platform/PlatformSettingBase.vue'),
        meta: { activeMenuName: 'platformSetting', breadcrumbsName: '基础信息' }
      },
      {
        path: 'permission',
        name: 'platformSettingPermission',
        component: () => import('../platform/PlatformSettingMember.vue'),
        meta: { activeMenuName: 'platformSetting', breadcrumbsName: '设计器权限' }
      },
      {
        path: 'history',
        name: 'platformSettingHistory',
        component: () => import('../platform/PlatformSettingHistory.vue'),
        meta: { activeMenuName: 'platformSetting', breadcrumbsName: '历史记录' }
      }
    ]
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import('../help/faq/Main.vue'),
    meta: { activeMenuName: 'faq' }
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/home'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 解决addRoute刷新页面空白问题
let hasExtend = true

const addRoute = async (to) => {
  if (hasExtend && to.fullPath.includes('application-setting')) {
    const routes = await getExtendRoute()

    routes.forEach((route) => {
      router.addRoute('applicationSetting', {
        path: route.path,
        name: route.name,
        component: () => import(route.url)
      })

      router.push({ ...to, replace: true })
    })

    hasExtend = false
  }
}

router.beforeEach((to, from, next) => {
  fetchCurrentUser()
    .then((data) => {
      user.current = data || {}

      localStorage.setItem(LOCAL_STORAGE.tenant, JSON.stringify(user.current.tenant))
      refreshHeadMenuList()
      requestEvent({
        event_type: 'portal_router',
        url: window.location.href,
        unit: JSON.stringify({ tenant: user.current.tenant }),
        content: JSON.stringify({ to: to.fullPath, from: from.fullPath })
      })

      const disable =
        data.auths?.every((auth) => routeMap[auth.role?.name] && routeMap[auth.role?.name].includes(to.name)) &&
        !isMaster() &&
        (!isAdmin() || (isAdmin() && routeMap.Tinybuilder_Admin.includes(to.name)))

      if (disable) {
        next('/home')

        return
      }

      addRoute(to)
      next()
    })
    .catch((error) => {
      Notify({ message: `获取当前用户信息失败: ${error.message || error}`, type: 'error', position: 'top-right' })
    })
})

export default router
