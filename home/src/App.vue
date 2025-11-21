<script lang="jsx" setup>
import { onMounted } from 'vue'
import { ConfigProvider } from '@opentiny/vue'
import designSmbConfig from '@opentiny/vue-design-smb'
import hljs from 'highlight.js/lib/core'
// 示例中代码高亮
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
import html from 'highlight.js/lib/languages/xml'

import { findParent, getRoutePath } from './tools'
import { router } from './router'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('css', css)
hljs.registerLanguage('html', html)
const jumpByRouter = (event) => {
  const isRouterDom = (parent) => {
    const { tagName, href, target } = parent
    if (tagName?.toLowerCase() === 'a' && href?.startsWith?.(location.origin) && target !== '_blank') {
      const routerPath = getRoutePath(href)
      if (routerPath) {
        event.preventDefault()
        router.push(routerPath)
        return true
      }
    }
    return false
  }
  if (!isRouterDom(event.target)) {
    findParent(event.target, isRouterDom)
  }
}

onMounted(() => {
  document.querySelector('#header').addEventListener('click', jumpByRouter, true)
})
</script>

<template>
  <div class="hp100">
    <config-provider :design="designSmbConfig" class="hp100">
      <router-view />
    </config-provider>
  </div>
</template>
