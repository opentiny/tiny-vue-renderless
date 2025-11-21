<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import type { PropType } from 'vue'
import type { ICommonOption } from '../index'

import headerInfo from '../config/header.ts'
import MenuCollapse from '../assets/menu-collapse.svg'

// 4个副标题，通过分析path, 自动匹配上
import TinyCliLogo from '../assets/sublogo-tinycli.svg?raw'
import TinyEngineLogo from '../assets/sublogo-tinyengine.svg?raw'
import TinyProLogo from '../assets/sublogo-tinypro.svg?raw'
import TinyThemeLogo from '../assets/sublogo-tinytheme.svg?raw'
import TinyVueLogo from '../assets/sublogo-tinyvue.svg?raw'
import TinyChartsLogo from '../assets/sublogo-tinycharts.svg?raw'

// userIcon
import UserIcon1 from '../assets/userIcon/userIcon_1.png'
import UserIcon2 from '../assets/userIcon/userIcon_2.png'
import UserIcon3 from '../assets/userIcon/userIcon_3.png'

// theme svg
import SunSvg from '../assets/theme-icon/sun.svg'
import MoonSvg from '../assets/theme-icon/moon.svg'
import { useDark, useToggle } from "@vueuse/core"

import useClickOutside from './useClickOutside'

// 来自环境变量
const envName = import.meta.env.VITE_EnvName
const serverHost = import.meta.env.VITE_ServerHost

const props = defineProps({
  options: {
    type: Object as PropType<ICommonOption>
  }
})

// 通过url, 读取当前app
type AppRoute = 'tiny-cli' | 'designtheme' | 'pro' | 'tiny-engine' // 四个生态
  | 'tiny-vue' | 'tiny-charts' | 'tiny-vue-mobile'
const currApp: AppRoute = location.pathname.split('/')[1] as AppRoute
const githubMap = {
  'tiny-cli': 'https://github.com/opentiny/tiny-cli',
  'pro': 'https://github.com/opentiny/tiny-cli',
  'tiny-engine': 'https://github.com/opentiny/tiny-engine',
  'tiny-vue': 'https://github.com/opentiny/tiny-vue',
  'tiny-charts': 'https://github.com/opentiny/tiny-charts',
  'tiny-vue-mobile': 'https://github.com/opentiny/tiny-vue',
}

/** 增加根据路由，判断显示哪个二级Logo.  只有四个生态才显示二级logo */
const subLogoConfig = {
  'tiny-cli': TinyCliLogo,
  'tiny-engine': TinyEngineLogo,
  'pro': TinyProLogo,
  'designtheme': TinyThemeLogo,
  'tiny-vue': TinyVueLogo,
  'tiny-charts': TinyChartsLogo,
}
const subLogo = subLogoConfig[currApp] || null

interface UserInfo { userId: string; userIcon: string }
const state = reactive({
  headerInfo: props.options?.customMenus || headerInfo,
  // isLogin: true,
  // userInfo: { userId: 'shenjunjian', userIcon: UserIcon1 } as unknown as UserInfo
  isLogin: false,
  userInfo: null as unknown as UserInfo,
  mobileMenuActive: false,
  menuCollapseActive: false
})

// 进入或离开顶级菜单，切换显示下拉面板
let _lastHoverItem: any
function enterTopMenu(item: any) {
  if (_lastHoverItem) {
    _lastHoverItem.active = false
  }

  item.active = true
  _lastHoverItem = item
}
function leaveTopMenu(item: any) {
  item.active = false
  _lastHoverItem = null
}

function jumpToApp(app) {
 window.open(app.href, '_blank', 'noopener,noreferrer')
}

// 根据path 判断当前应该有下划线的一级菜单
function checkUnderlineMenu() {
  setTimeout(() => {
    state.headerInfo.forEach(level1 => {
      level1.underlined = level1.isUnderline()
    })
  }, 200);
}

onMounted(() => checkUnderlineMenu())

// 登录与登出。  
const userInfoUrl = `${serverHost}designtheme/api/user/userInfo`,
  loginUrl = `${serverHost}designtheme/api/user/login?thirdLoginType=third-platform`,
  logoutUrl = `${serverHost}designtheme/api/user/logout`;
function _queryUrl(url: string, type: 'json' | 'text') {
  return new Promise(resolve => {
    fetch(url, {
      method: 'GET',
      mode: "cors",
      credentials: 'include',
      headers: { "Content-Type": type === 'json' ? "application/json" : 'text/html', }
    }).then(response => {
      const promise = type === 'json' ? response.json() : response.text()
      promise.then(res => {
        resolve({ response: res, error: null })
      })
    }).catch(error => {
      resolve({ response: null, error: error })
    })
  })
}

// 内部登录 designtheme下的接口， 外部跳转 /tiny-login/login
async function login() {
  if (envName === 'inner') {
    const res: any = await _queryUrl(loginUrl, 'json')
    if (res.response) {
      if (res.response.status === 401) {
        location.href = res.response['x-login-url']
      }
    }
  } else {
    location.href = `${location.origin}/tiny-login/login`;
  }
}

async function logout() {
  const res: any = await _queryUrl(logoutUrl, 'text')
  if (res.response) {
    state.isLogin = false
    state.userInfo = {} as UserInfo
  }
}

const userIconMap = { 'userIcon_1.png': UserIcon1, 'userIcon_2.png': UserIcon2, 'userIcon_3.png': UserIcon3 }
async function getUserInfo() {
  const res: any = await _queryUrl(userInfoUrl, 'json')
  if (res?.response?.data) {
    // 已登录返回 data:{userId, userIcon}  未登录，返回data:{}
    state.userInfo = res.response.data
    state.isLogin = !!state.userInfo.userId

    // 外部登录，返回 data:{userIcon} 的值为：  ['userIcon_1.png', 'userIcon_2.png', 'userIcon_3.png']
    if (userIconMap[state.userInfo.userIcon]) {
      state.userInfo.userIcon = userIconMap[state.userInfo.userIcon] as string
    }
  }
}

// onMounted(() => getUserInfo())

// 移动端
function clickMobileMenu(level1) {
  if (level1 !== _lastHoverItem) {
    if (_lastHoverItem) {
      _lastHoverItem.m_active = false
    }
    level1.m_active = true
    _lastHoverItem = level1
  } else {
    level1.m_active = !level1.m_active
  }

  checkUnderlineMenu()
}

useClickOutside(['.nav-mobile'], () => {
  state.mobileMenuActive = false
})

// 收缩菜单
let menuEl: HTMLElement
if (props?.options?.menuCollapse?.useCollapse) {
  // 由于用户应用和common-header不是同一个应用，无法得知用户的menu什么时候加载出来
  // 用户也不可能页面显示的第1时间，就能点左上角的图标展开菜单，所以把这个时间留大一些。
  setTimeout(() => {
    let menuId = props?.options?.menuCollapse?.menuId

    if (!menuId) return

    if (menuId.startsWith("#")) {
      menuId = menuId.slice(1)
    }
    menuEl = document.getElementById(menuId)
    if (!menuEl) return

    // resize时，给menu添加或移除 .common-user-menu-fixed 类名
    const checkClass = () => {
      const winWidth = window.innerWidth;
      menuEl.classList.toggle('common-user-menu-fixed', winWidth <= 814)
    }
    window.addEventListener('resize', checkClass)
    checkClass()

    // 监听document点击，如果不在MenuCollapse,且不在menuEl内部时，要关闭菜单
    useClickOutside(['.is-menu-collapse', '#' + menuId], () => {
      state.menuCollapseActive = false
      menuEl.classList.toggle('active', state.menuCollapseActive)
    })
  }, 1000)
}

function toggleMenuCollapse() {
  state.menuCollapseActive = !state.menuCollapseActive
  menuEl?.classList.toggle('active', state.menuCollapseActive)
}

// 主题切换 
const isDark = props.options?.allowDarkTheme ? useDark() : ref(false);
const toggleDark = useToggle(isDark)

const switchThemeClick = (ev: MouseEvent) => {
  toggleTheme(ev)
}
const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(`
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

.dark::view-transition-old(root) {
  z-index: 1;
}
.dark::view-transition-new(root) {
  z-index: 999;
}

::view-transition-old(root) {
  z-index: 999;
}
::view-transition-new(root) {
  z-index: 1;
}
`);
document.adoptedStyleSheets.push(styleSheet);

const toggleTheme = (event: MouseEvent) => {
  const x = event.clientX;
  const y = event.clientY;
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  );

  let isDarkCls: boolean;
  const root = document.documentElement;

  const transition = document.startViewTransition(() => {
    toggleDark()
    isDarkCls = root.classList.contains("dark");
    root.classList.remove(isDarkCls ? "dark" : "light");
    root.classList.add(isDarkCls ? "light" : "dark");
  });

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ];
    root.animate(
      {
        clipPath: isDarkCls ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 500,
        easing: "ease-in",
        pseudoElement: isDarkCls
          ? "::view-transition-old(root)"
          : "::view-transition-new(root)",
      }
    );
  });
}
</script>

<template>
  <div class="opentiny-design-header" id="tinyuiDesignHeader">
    <!-- 1、大屏菜单左侧， 图片大小来自于svg自身-->
    <div class="nav-left flex-center">
      <img v-if="props.options?.menuCollapse?.useCollapse" :src="MenuCollapse" class="is-menu-collapse"
        @click="toggleMenuCollapse" />
      <a href="/">
        <svg class="main-logo" width="162" height="28" viewBox="0 0 162 28" fill="none" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink">
          <path
            d="M24.89 17.38L29.18 6.27C29.4 5.71 29.94 5.33 30.55 5.33L33.48 5.33C38.25 5.33 42.12 9.24 42.12 14.06C42.12 18.84 38.02 22.66 33.28 22.66L23.47 22.66C23.03 22.66 22.64 22.93 22.5 23.35L21.28 26.8C21.25 26.89 21.32 27 21.42 27L34.03 27C41.05 26.88 46.42 21.16 46.42 14.06C46.42 6.86 40.91 1.01 33.78 1L35.24 1L33.78 1C33.77 1 33.75 1 33.74 1L27.76 1L13 1C5.82 1 0 6.82 0 14C0 21.08 5.67 26.85 12.73 26.99L12.98 27L14.53 27L15.31 27C15.91 27 16.46 26.62 16.68 26.06L18 22.66L12.99 22.66C8.21 22.66 4.33 18.78 4.33 14C4.33 9.21 8.21 5.33 13 5.33L19.23 5.33C19.81 5.2 20.29 4.78 20.5 4.21L21.67 1L27.76 1C27.03 1 26.37 1.45 26.11 2.12L19.89 18.12C19.85 18.22 19.92 18.32 20.02 18.32L23.51 18.31C24.12 18.31 24.67 17.94 24.89 17.38Z"
            fill="#1476FF" fill-opacity="1" fill-rule="evenodd" />
          <path
            d="M131.8 7.32Q132.17 7.53 132.67 7.53Q133.05 7.53 133.36 7.4Q133.46 7.37 133.55 7.32Q133.73 7.22 133.87 7.08Q134.04 6.92 134.17 6.71Q134.24 6.59 134.28 6.47Q134.4 6.17 134.4 5.83Q134.4 5.4 134.22 5.06Q134.1 4.82 133.91 4.63Q133.73 4.46 133.51 4.35Q133.14 4.16 132.67 4.16Q132.16 4.16 131.77 4.38Q131.59 4.48 131.44 4.63Q131.28 4.79 131.17 4.98Q130.96 5.35 130.96 5.83Q130.96 6.31 131.16 6.67Q131.27 6.88 131.44 7.05Q131.61 7.21 131.8 7.32ZM58.92 21.16Q60.78 22.23 63.33 22.23Q65.98 22.23 67.95 21.14Q68.84 20.64 69.55 19.95Q70.39 19.13 70.97 18.03Q72.03 16.02 72.03 13.29Q72.03 10.76 71.06 8.83Q70.54 7.82 69.78 7.04Q69.11 6.35 68.23 5.85Q66.38 4.79 63.82 4.79Q61.13 4.79 59.16 5.89Q58.19 6.42 57.45 7.18Q56.67 7.96 56.13 8.99Q55.08 11 55.08 13.69Q55.08 16.24 56.07 18.17Q56.59 19.18 57.35 19.96Q58.03 20.66 58.92 21.16ZM115.59 7.48L120.85 7.48L120.85 22L123.78 22L123.78 7.48L128.78 7.48L129.05 5.03L115.85 5.03L115.59 7.48ZM66.46 19.12Q65.25 19.91 63.51 19.91Q61.76 19.91 60.57 19.1Q60.54 19.08 60.52 19.07Q60.15 18.8 59.83 18.48Q59.13 17.77 58.73 16.77Q58.14 15.32 58.14 13.48Q58.14 11.73 58.76 10.28Q59.16 9.36 59.8 8.68Q60.17 8.29 60.63 7.97Q60.71 7.91 60.8 7.86Q61.99 7.11 63.65 7.11Q65.51 7.11 66.7 7.96Q67.12 8.27 67.47 8.65Q68.08 9.32 68.42 10.24Q68.96 11.67 68.96 13.5Q68.96 15.36 68.35 16.81Q67.94 17.79 67.25 18.48Q66.91 18.81 66.51 19.08Q66.49 19.1 66.46 19.12ZM75.1 9.35Q75.19 11.04 75.19 12.44L75.19 27.28L78.09 27.03L78.09 21.81Q79.04 22.14 80.02 22.22Q80.32 22.24 80.63 22.24Q82.24 22.24 83.51 21.58Q83.64 21.51 83.77 21.43Q84.07 21.26 84.33 21.05Q85.3 20.28 85.89 19.05Q86.64 17.48 86.64 15.27Q86.64 13.15 85.98 11.77Q85.32 10.39 84.24 9.75Q83.74 9.46 83.2 9.3Q82.58 9.12 81.9 9.12Q81.25 9.12 80.65 9.28Q79.22 9.66 78.03 10.96Q77.97 10.14 77.82 9.35L75.1 9.35ZM91.5 16.04L99.77 16.04L99.77 15.27Q99.77 13.58 99.19 12.19Q98.84 11.35 98.27 10.72Q97.89 10.29 97.41 9.95Q96.21 9.12 94.41 9.12Q92.91 9.12 91.72 9.72Q91.54 9.81 91.37 9.91Q91.07 10.1 90.8 10.32Q89.88 11.06 89.32 12.22Q88.58 13.73 88.58 15.83Q88.58 17.85 89.27 19.28Q89.64 20.02 90.19 20.58Q90.69 21.1 91.35 21.47Q92.74 22.23 94.75 22.23Q97.4 22.23 99.52 21.2L98.89 19.22Q98.03 19.58 97.1 19.8Q96.17 20.01 95.28 20.01Q93.68 20.01 92.76 19.23Q91.61 18.24 91.5 16.04ZM102.49 9.35Q102.58 10.8 102.58 12.57L102.58 22L105.46 22L105.46 13.19Q106.24 12.37 107.03 11.89Q107.49 11.61 107.98 11.49Q108.35 11.4 108.75 11.4Q109.48 11.4 109.95 11.75Q110.77 12.38 110.77 14.1L110.77 22L113.64 22L113.64 13.9Q113.64 11.55 112.62 10.33Q112.33 9.99 111.98 9.74Q111.07 9.12 109.74 9.12Q108.75 9.12 107.95 9.43Q107.16 9.74 106.58 10.2Q106 10.66 105.42 11.32Q105.39 10.93 105.33 10.34Q105.27 9.75 105.19 9.35L102.49 9.35ZM137.75 9.35Q137.84 10.8 137.84 12.57L137.84 22L140.73 22L140.73 13.19Q141.5 12.37 142.3 11.89Q142.75 11.61 143.25 11.49Q143.62 11.4 144.01 11.4Q144.74 11.4 145.21 11.75Q146.03 12.38 146.03 14.1L146.03 22L148.91 22L148.91 13.9Q148.91 11.55 147.89 10.33Q147.6 9.99 147.24 9.74Q146.34 9.12 145 9.12Q144.01 9.12 143.22 9.43Q142.42 9.74 141.85 10.2Q141.27 10.66 140.68 11.32Q140.66 10.93 140.59 10.34Q140.53 9.75 140.46 9.35L137.75 9.35ZM134.12 9.35L131.23 9.35L131.23 22L134.12 22L134.12 9.35ZM151.13 27.17Q151.77 27.28 152.49 27.28Q153.96 27.28 154.99 26.74Q156.03 26.2 156.79 25.09Q157.55 23.98 158.21 22.16L162.86 9.35L159.94 9.35L157.57 16.53Q157.12 17.91 156.79 19.28Q156.63 18.3 156.05 16.48L153.71 9.35L150.6 9.35L155.27 22.1L155.08 22.57Q154.37 24.39 153.14 24.87Q152.7 25.04 152.2 25.04Q151.8 25.04 151.35 24.97Q150.91 24.89 150.62 24.81L150.09 26.92Q150.5 27.06 151.13 27.17ZM96.18 11.93Q96.86 12.69 96.94 14.2L91.58 14.2Q91.8 12.7 92.53 11.94Q92.85 11.61 93.23 11.42Q93.74 11.18 94.37 11.18Q95.12 11.18 95.68 11.51Q95.96 11.68 96.18 11.93ZM82.11 19.58Q81.34 20.1 80.23 20.1Q79.67 20.1 79.1 19.97Q78.52 19.85 78.09 19.64L78.09 12.87Q78.73 12.2 79.45 11.8Q79.72 11.65 80.01 11.55Q80.48 11.4 81.01 11.4Q81.64 11.4 82.14 11.66Q82.6 11.89 82.96 12.36Q83.69 13.31 83.69 15.43Q83.69 17.72 82.81 18.91Q82.5 19.31 82.11 19.58Z"
            fill="currentColor" fill-opacity="1" fill-rule="evenodd" />
        </svg>

      </a>
      <template v-if="subLogo">
        <!-- 绝对定位是方便中间的文字能相对居中 -->
        <div class="is-sublogo line" style="left:180px"></div>
        <!-- <img class='is-sublogo' :src="subLogo" style="left:228px" /> -->
        <div class='is-sublogo' v-html="subLogo" style="left:228px"></div>
      </template>
    </div>
    <!-- 2、大屏菜单中间 -->
    <div class="nav-center">
      <!-- 居中渲染一级目录 -->
      <template v-for="level1 in state.headerInfo">
        <div class="top-menu flex-center" :class="{ active: level1.active, underlined: level1.underlined }"
          v-if="!level1.hide" :key="level1.name" @mouseenter="enterTopMenu(level1)" @mouseleave="leaveTopMenu(level1)"
          @click="checkUnderlineMenu">
          <a v-if="level1.url" :href="level1.url"> {{ level1.name }} </a>
          <span v-else>{{ level1.name }} </span>
          <svg v-if="level1.children?.length" class="top-menu-svg hand" width="20" height="20" viewBox="0 0 20 20"
            fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <path id="Fill" d="M10 13.75L3.75 7.5L4.62 6.62L10 12L15.37 6.62L16.25 7.5L10 13.75Z" fill="currentColor"
              fill-opacity="1" fill-rule="evenodd" />
          </svg>

          <div v-show="level1.children?.length" class="dropdown-menu">
            <div class="dropdown-content flex-center">
              <div class="dropdown-app hand" v-for="app in level1.children.filter(lv => !lv.hide)" :key="app.title"
                @click="jumpToApp(app)">
                <img class="app-logo" :src="app.logo"></img>
                <div>
                  <div class="app-title"> {{ app.title }} </div>
                  <div class="app-desc"> {{ app.desc }} </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <!-- 3、大屏菜单右边，github + 头像 + 登录 -->
    <div class="nav-right flex-center">
      <component v-if="props.options?.rightVue" :is="props.options?.rightVue" />
      <template v-else>
        <div v-if="props.options?.allowDarkTheme" class="switch-theme-box" @click="switchThemeClick">
          <img class="switch-theme-icon" :src="isDark ? MoonSvg : SunSvg">
        </div>
        <a :href="githubMap[currApp] || '//github.com/opentiny'" target="_blank" rel="noopener noreferrer">
          <svg class="github-img" width="34px" height="34px" viewBox="0 0 34 34" version="1.1"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g transform="translate(-358, -265)" fill="currentColor" fill-rule="nonzero">
                <g transform="translate(24, 14)">
                  <g transform="translate(334, 251.971429)">
                    <path
                      d="M16.9985217,0 C7.61156522,0 0,7.80224591 0,17.4292595 C0,25.1314767 4.8693913,31.6636599 11.6265218,33.9703847 C12.4750435,34.1264902 12.744087,33.612706 12.744087,33.1504516 C12.744087,32.7351806 12.7529565,31.5787872 12.744087,30.1238228 C8.01660872,31.1756407 7.03652175,27.8277074 7.03652175,27.8277074 C6.26339131,25.8134911 5.15173915,25.2784887 5.15173915,25.2784887 C3.60695653,24.196359 5.26556523,24.2190928 5.26556523,24.2190928 C6.97000002,24.3403399 7.8702609,26.0135487 7.8702609,26.0135487 C9.38695654,28.677952 11.8482609,27.9080334 12.8165217,27.4624507 C12.9732174,26.3378844 13.4107826,25.5664503 13.8971304,25.1345078 C10.1216522,24.6919562 6.15400002,23.1991023 6.15400002,16.5168757 C6.15400002,14.614813 6.8162609,13.0598199 7.90426088,11.8397718 C7.72982608,11.4017669 7.14443478,9.62701362 8.06982611,7.22783816 C8.06982611,7.22783816 9.49930437,6.75952155 12.744087,9.01623174 C14.1316451,8.62823659 15.5632402,8.4304989 17.0014783,8.4281837 C18.4442609,8.43576162 19.8988696,8.62824129 21.2588696,9.01623174 C24.5036521,6.76103711 25.9286956,7.22783813 25.9286956,7.22783816 C26.8555653,9.62701362 26.2716521,11.4017669 26.0972174,11.8397718 C27.1852175,13.0598199 27.846,14.614813 27.846,16.5168757 C27.846,23.2157738 23.8709564,24.6874094 20.0836522,25.1163207 C20.6926956,25.6573856 21.2470434,26.7031411 21.2470434,28.329367 L21.2470434,33.1549983 C21.2470434,33.6217995 21.522,34.1355837 22.3853044,33.9673534 C29.1350435,31.6591132 34,25.1284454 34,17.4292595 C34,7.80224591 26.389913,0 16.9985217,0 Z">
                    </path>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </a>
        <!-- <div class="login-wrap">
          <div v-if="state.isLogin" class="login-avatar">
            <img :src="state.userInfo?.userIcon" class="hand" />
            <div class="login-menu">
              <div class="text text-second" style="height: 18px;line-height: 18px;">我的账号</div>
              <div class="text text-disabled">{{ state.userInfo?.userId }}</div>
              <div class="line"></div>
              <div class="exit-login text text-main hand" @click="logout">退出登录</div>
            </div>
          </div>
          <div v-else class="login-button hand " @click="login">登录</div>
        </div> -->
      </template>
    </div>
    <!-- 4、移动端菜单 -->
    <div class="nav-mobile" :class="{ active: state.mobileMenuActive }">
      <svg class="mobile-menu-btn" @click="state.mobileMenuActive = !state.mobileMenuActive" width="18" height="14"
        viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <path
          d="M17.36 6.37C17.77 6.37 18.11 6.71 18 7.12C18.11 7.53 17.77 7.87 17.36 7.87L4.69 7.87C4.28 7.87 3.94 7.53 3.94 7.12C3.94 6.71 4.28 6.37 4.69 6.37L17.36 6.37ZM17.36 0.37C17.77 0.37 18 0.71 18 1.12C18 1.53 17.77 1.87 17.36 1.87L4.69 1.87C4.28 1.87 3.94 1.53 3.94 1.12C3.94 0.71 4.28 0.37 4.69 0.37L17.36 0.37ZM17.36 12.37C17.77 12.37 18 12.71 18 13.12C18.11 13.53 17.77 13.87 17.36 13.87L4.69 13.87C4.28 13.87 3.94 13.53 3.94 13.12C3.94 12.71 4.28 12.37 4.69 12.37L17.36 12.37ZM1.12 12C1.74 12 2.25 12.5 2.25 13.12C2.25 13.74 1.74 14.25 1.12 14.25C0.5 14.25 0 13.74 0 13.12C0 12.5 0.5 12 1.12 12ZM1.12 6C1.74 6 2.25 6.5 2.25 7.12C2.25 7.74 1.74 8.25 1.12 8.25C0.5 8.25 0 7.74 0 7.12C0 6.5 0.5 6 1.12 6ZM1.12 0C1.74 0 2.25 0.5 2.25 1.12C2.25 1.74 1.74 2.25 1.12 2.25C0.5 2.25 0 1.74 0 1.12C0 0.5 0.5 0 1.12 0Z"
          fill="currentColor" fill-opacity="1.000000" fill-rule="nonzero" />
      </svg>


      <div class="mobile-menu-wrapper">
        <!-- 渲染一级目录 -->
        <div v-for="level1 in state.headerInfo" class="mobile-menu " :class="{ active: level1.m_active }"
          :key="level1.name" @click="clickMobileMenu(level1)">
          <div class="mobile-menu-level1 flex-center">
            <div class="mobile-title text-main">
              <a v-if="level1.url" :href="level1.url"> {{ level1.name }} </a>
              <span v-else>{{ level1.name }} </span>
            </div>
            <svg v-if="level1.children?.length" class="mobile-menu-svg hand" width="20" height="20" viewBox="0 0 20 20"
              fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <path id="Fill" d="M10 13.75L3.75 7.5L4.62 6.62L10 12L15.37 6.62L16.25 7.5L10 13.75Z" fill="currentColor"
                fill-opacity="1" fill-rule="evenodd" />
            </svg>
          </div>
          <div v-if="level1.children?.length" class="dropdown-menu">
            <div class="dropdown-app  hand" v-for="app in level1.children.filter(lv => !lv.hide)" :key="app.title"
              @click="jumpToApp(app)">
              {{ app.title }}
            </div>
          </div>
          <div class="line"></div>
        </div>

        <div class="mobile-menu">
          <div class="mobile-menu-level1 flex-center">
            <div class="mobile-title text-main"> <a :href="githubMap[currApp] || '//github.com/opentiny'" target="_blank"
                rel="noopener noreferrer">
                Github
              </a>
            </div>
          </div>
          <div class="line"></div>
        </div>
        <div class="mobile-menu">
          <component v-if="props.options?.mobileRightVue" :is="props.options?.mobileRightVue" />
          <template v-else>
            <!-- <div v-if="state.isLogin" class="login-avatar">
              <img :src="state.userInfo?.userIcon" class="hand" />
              <div class="login-menu">
                <div class="text text-second" style="height: 18px;line-height: 18px;">我的账号</div>
                <div class="text text-disabled">{{ state.userInfo?.userId }}</div>
                <div class="line"></div>
                <div class="exit-login text text-main hand" @click="logout">退出登录</div>
              </div>
            </div>
            <div v-else class="login-button hand " @click="login">登录</div> -->
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
// 大区间
@media screen and (min-width: 815px) {
  .opentiny-design-header {
    .nav-mobile {
      display: none !important;
    }

    .nav-center,
    .nav-right {
      display: flex !important;
    }
  }
}

// 1150 特殊区间，隐藏副logo 否则会挤压
@media screen and (max-width: 1150px) {
  .opentiny-design-header {
    .nav-left .is-sublogo {
      display: none !important;
    }
  }
}

// 移动区间
@media screen and (max-width: 814px) {
  .opentiny-design-header {
    --top-height: 60px !important;

    .is-menu-collapse {
      display: block !important;

    }

    .nav-mobile {
      display: block !important;
    }

    .nav-center,
    .nav-right {
      display: none !important;
    }
  }
}

// flex-center
.flex-center {
  display: flex;
  justify-items: center;
  align-items: center;
}

// 分隔线
.line {
  height: 1px;
  width: 1px;
  background-color: #e8e8e8;
}

.text-main {
  color: #191919;
}

.text-second {
  color: #808080;
}

.text-disabled {
  color: #c2c2c2;
}

.hand {
  cursor: pointer;
}

.opentiny-design-header {
  --top-height: 64px;
  // 关键指标
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 999;

  box-sizing: border-box;
  width: 100vw;
  height: var(--top-height);
  padding: 0 32px;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  // 通用样式
  font-family: PingFangSC;
  font-size: 14px;
  line-height: 22px;
  font-weight: 400;
  transition: all 0.3s;

  * {
    box-sizing: border-box;
  }

  .nav-left {
    .main-logo {
      color: #000;
    }

    .is-menu-collapse {
      display: none;
      width: 22px;
      margin-right: 12px;
    }

    .is-sublogo {
      position: absolute;
    }

    .line {
      height: 21px;
      background-color: #808080;
      margin: 0 24px;
    }

    img {
      display: block;
    }
  }

  .nav-center {
    display: flex;
    align-items: center;

    .top-menu {
      height: var(--top-height);
      margin-right: 48px;
      border-bottom: 2px solid transparent; // 占位

      a {
        text-decoration: none;
        color: black;
      }

      .top-menu-svg {
        height: 20px;
        width: 20px;
        margin-left: 4px;

        transition: all 0.4s;
      }

      // 下拉面板 默认撑满宽度
      .dropdown-menu {
        display: flex;
        justify-content: center;
        position: absolute;
        left: 0;
        top: var(--top-height);
        width: 100vw;
        background-color: #fff;
        box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.08);
        overflow: hidden;
        max-height: 0;
        transition: max-height 0.3s linear;

        .dropdown-content {
          padding: 40px 0;
          max-width: 70vw;
          flex-wrap: wrap;
          justify-content: flex-start;
          gap: 24px;


          .dropdown-app {
            display: flex;
            flex-direction: row;
            align-items: center;
            width: 240px;
            height: 54px;
            padding: 8px;
            border-radius: 8px;

            .app-logo {
              width: 40px;
              height: 40px;
              margin-right: 16px;
            }

            .app-title {
              color: #191919;
              font-size: 16px;
              font-weight: 600;
              line-height: 24px;
            }

            .app-desc {
              color: rgb(89, 89, 89);
              font-size: 12px;
              font-weight: 400;
              line-height: 18px;
            }

            &:hover {
              background-color: #f5f5f5;
            }
          }
        }
      }

      &.active {
        // border-bottom: 2px solid #000;

        .dropdown-menu {
          max-height: 290px;
        }

        .top-menu-svg {
          transform: rotateZ(180deg);
        }
      }

      &.underlined {
        border-bottom: 2px solid #000;
      }
    }
  }

  .nav-right {
    // width: 128px;

    .github-img {
      color: #000;
      width: 28px;
      height: 28px;
    }

    .login-wrap {
      position: relative;
      margin-left: 32px;


      .login-button {
        padding: 0 18px;
        line-height: 26px;
        border-radius: 14px;
        border: 1px solid #191919;
      }

      .login-avatar {
        img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }

        .login-menu {
          display: none;
          position: absolute;
          right: 0;
          padding: 10px 0 8px 0;
          width: 186px;
          border-radius: 6px;
          background-color: #fff;
          box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);

          font-size: 12px;
          font-weight: 400;

          .text {
            height: 32px;
            padding: 0 16px;
            line-height: 32px;
          }

          .line {
            width: 100%;
            margin: 0;
          }

          .exit-login:hover {
            background-color: #f5f5f5;
          }
        }

        &:hover {
          .login-menu {
            display: block;
          }
        }
      }
    }
  }

  .nav-mobile {
    position: relative;
    padding-left: 20px; // 防止区域太小，一离开就收起下拉菜单

    .mobile-menu-btn {
      color: #191919;
      width: 18px;
      height: 15px;
    }

    .mobile-menu-wrapper {
      display: none;
      position: absolute;

      width: 230px;
      padding: 24px 0;
      right: 0;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);

      .mobile-menu {
        flex-wrap: wrap;

        .mobile-menu-level1 {
          height: 32px;
          padding-left: 16px;

          .mobile-title {
            font-size: 14px;
            font-weight: 600;
            line-height: 22px;
            margin-right: 8px;

            a {
              text-decoration: none;
              color: black;
            }
          }

          img {
            transition: all 0.4s;
          }
        }

        .dropdown-menu {
          display: none;
          width: 100%;
          color: #595959;
          font-size: 14px;
          font-weight: 400;
          line-height: 22px;
        }

        .dropdown-app {
          height: 38px;
          line-height: 38px;
          margin: 0 16px;

          &:hover {
            background: #f5f5f5;
          }
        }

        .login-button {
          width: 72px;
          padding: 0 18px;
          line-height: 26px;
          margin-left: 10px;
          border: 1px solid #595959;
          border-radius: 14px;
        }

        &.active {
          .dropdown-menu {
            display: block;
          }

          img {
            transform: rotateZ(180deg);
          }
        }
      }

      .line {
        width: 204px;
        margin: 10px;
      }

    }

    &:hover,
    &.active {
      .mobile-menu-wrapper {
        display: block;
      }
    }

  }
}
</style>

<style lang="less">
.common-user-menu-fixed {
  position: fixed;
  z-index: 201;

  display: none;
}

.common-user-menu-fixed.active {
  display: block !important;
}

.switch-theme-box {
  width: 48px;
  height: 24px;
  border-radius: 15px;
  background-color: #317afa;
  padding: 2px;
  margin-right: 34px;
  cursor: pointer;
  transition: all 0.3s;
  user-select: none;


  .switch-theme-icon {
    width: 20px;
    height: 20px;
    border-radius: 15px;
    background-color: #fff;
    float: right;
    transition: all 0.3s;
  }
}

.dark.dark.dark {

  // 暗色时的切换主题
  .switch-theme-box {
    background-color: #484848;

    .switch-theme-icon {
      background-color: #e6e6e6;
      float: left;
    }
  }

  .opentiny-design-header {
    background-color: #1a1a1a;
    border-bottom: 1px solid #000;
    color: #b3b3b3;
  }

  .opentiny-design-header {

    .main-logo,
    .is-sublogo {
      color: #e6e6e6;
    }

    .nav-center {
      .top-menu a {
        color: #b3b3b3;
      }

      .top-menu {
        .dropdown-menu {
          background-color: #1a1a1a;

          .dropdown-app {
            &:hover {
              background-color: #000;
            }

            .app-title {
              color: #e6e6e6;
            }

            .app-desc {
              color: #b3b3b3;
            }
          }
        }

        &.underlined {
          border-bottom: 2px solid #808080;
        }
      }
    }

    .nav-right {
      .github-img {
        color: #b3b3b3;
      }
    }

    .nav-mobile {
      .mobile-menu-btn {
        color: #b3b3b3;
      }

      .mobile-menu-wrapper {
        background-color: #1a1a1a;

        .mobile-menu {
          color: #e6e6e6;

          .mobile-title {
            color: #e6e6e6;

            a {
              color: #e6e6e6;
            }
          }

          .line {
            background-color: #808080;
          }

          .dropdown-app {
            color: #b3b3b3;

            &:hover {
              color: #e6e6e6;
              background: #000;
            }
          }
        }
      }
    }
  }

}
</style>
