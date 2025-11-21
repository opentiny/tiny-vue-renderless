import { computed } from 'vue'

import { router } from '@/router.js'

import { VITE_CONTEXT } from '@/shared/const'
import { menuPathMap, guideMenus } from './data'

const currentMenuPath = computed(() => router.currentRoute?.value?.path || '')

const firtsPath = computed(() => currentMenuPath.value.replace(VITE_CONTEXT, '').split('/')[1])
const secondPath = computed(() => currentMenuPath.value.replace(VITE_CONTEXT, '').split('/')[2])

export const currentMenus = computed(() => {
  switch (firtsPath.value) {
    case 'case-library':
      return []
    case 'guide':
      return guideMenus
    case 'resouce-library':
      return []
    case 'about':
      return []
    default:
      return []
  }
})

export const currentMenuNode = computed(() => menuPathMap.value.get(currentMenuPath.value))

export const currentMenuTitle = computed(() => currentMenuNode.value?.label || '')
