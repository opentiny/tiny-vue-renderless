<template>
  <div class="left-menu-root">
    <div class="left-menu-top">
      <div class="left-menu-top-title">{{ props.title }}</div>
      <tiny-input :prefix-icon="TinyIconSearch" placeholder="搜索" v-model="menuSearchValue" clearable> </tiny-input>
    </div>

    <tiny-tree-menu
      :data="displayMenus"
      show-title
      ref="menuRef"
      ellipsis
      only-check-children
      :show-filter="false"
      :indent="24"
      node-key="key"
      :default-expand-all="expandedAll || !!menuSearchValue"
      :node-height="40"
      @node-click="handleNodeClick"
      :key="expandedAll ? 'expanded' : menuSearchValue ? 'searched' : 'all'"
      :class="isDeepMenu ? 'deep-menu' : ''"
    >
      <template #default="{ data: { label, link, key, children } }">
        <span class="menu-label" v-if="children?.length">
          {{ label }}
        </span>
        <a class="menu-label" v-else :href="getRoutePath(link) || link || key" @click="$event.preventDefault()">
          {{ label }}
        </a>
        <tiny-icon-outer-link v-if="link" class="menu-link-icon" />
      </template>
    </tiny-tree-menu>
  </div>
</template>

<script setup lang="jsx">
import { computed, watch, ref, onMounted, effectScope, onBeforeUnmount, nextTick, shallowRef } from 'vue'

import { TreeMenu as TinyTreeMenu } from '@opentiny/vue'
import { Input as TinyInput } from '@opentiny/vue'
import { iconSearch, iconOuterLink, iconChevronRight } from '@opentiny/vue-icon'

import { currentMenus, menuPathMap } from '@/shared/menus'
import { router } from '@/router.js'
import { searchMenuItem, getRoutePath, debounce } from '@/tools'
import { menuDisplayToView } from './layoutData.js'

const props = defineProps({
  title: {
    type: String
  }
})

const menuRef = shallowRef(null)
const menuSideKey = computed(() => router.currentRoute?.value?.path || '')
const menuSearchValue = ref('')
const TinyIconSearch = iconSearch()
const TinyIconOuterLink = iconOuterLink()
const clickKeySet = new Set()

const displayMenus = ref(currentMenus.value)
const expandedAll = ref(false)
const isDeepMenu = computed(() => displayMenus.value.some((item) => item?.children?.length))

const handleNodeClick = (node) => {
  if (node?.children?.length) {
    return
  }
  const routerLink = node.link && getRoutePath(node.link)
  if (node.key !== menuSideKey.value) {
    clickKeySet.add(node.key)
  }
  if (routerLink) {
    window.open(routerLink, '_target', 'noopener=yes,noreferrer=yes')
  } else if (node.link) {
    window.open(node.link, '_target', 'noopener=yes,noreferrer=yes')
  } else {
    router.push({
      path: node.key
    })
  }
}

const scope = effectScope()

const scrollToCurMenu = debounce(async () => {
  const start = Date.now()
  const renderTime = 800
  let consumedTime = 0
  while (consumedTime < renderTime) {
    await new Promise((r) =>
      (typeof requestIdleCallback === 'function' ? requestIdleCallback : requestAnimationFrame)(r)
    )
    menuDisplayToView()
    consumedTime = Date.now() - start
  }
}, 200)

const expandCurMenu = async () => {
  if (clickKeySet.has(menuSideKey.value)) {
    clickKeySet.delete(menuSideKey.value)
    return
  }
  const nodeData = menuPathMap.value.get(menuSideKey.value)
  const node = menuRef.value?.$refs?.tree?.getNode(nodeData)
  node?.expand(null, true)
  await nextTick()
  scrollToCurMenu()
}

onMounted(() => {
  scope.run(() => {
    watch(
      menuSideKey,
      async () => {
        await nextTick()
        menuRef.value?.setCurrentKey(menuSideKey.value)
        await nextTick()
        menuDisplayToView()
        expandCurMenu()
      },
      { immediate: true }
    )
    watch(
      () => [currentMenus.value, menuSearchValue.value?.trim()],
      async ([menu, searchValue], [oldMenu, oldSearchValue] = []) => {
        if (menu !== oldMenu) {
          menuSearchValue.value = ''
          displayMenus.value = menu
          await nextTick()
          expandCurMenu()
        } else if (searchValue !== oldSearchValue) {
          displayMenus.value = searchMenuItem(menu, searchValue)
          await nextTick()
          menuRef.value?.setCurrentKey(menuSideKey.value)
          await nextTick()
          expandCurMenu()
        }
      },
      { immediate: true }
    )
    watch(
      () => menuRef.value?.getCurrentKey(),
      (value) => {
        if (value !== menuSideKey.value) {
          menuRef.value?.setCurrentKey(menuSideKey.value)
        }
      }
    )
  })
})

onBeforeUnmount(() => {
  scope.stop()
})
</script>

<style lang="less" scoped>
.left-menu-root {
  position: relative;
  :deep(a) {
    text-decoration: none;
  }
  .all-expand-container {
    font-size: 14px;
    position: absolute;
    line-height: 16px;
    top: 80px;
    left: 32px;
    transform: translateY(-50%);
    display: flex;
    cursor: pointer;
    .all-expand-icon {
      transform-origin: center;
      width: 16px;
      height: 16px;
      fill: #191919;
      transition: all 0.2s;
      &.expanded {
        transform: rotate(90deg);
      }
    }
  }
  .left-menu-top {
    padding: 24px 24px 24px 32px;
    height: 120px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-top: none;
  }
  .left-menu-top-title {
    font-size: 16px;
    color: #191919;
    font-weight: bold;
    padding-bottom: 16px;
  }
  :deep(.tiny-input) {
    .tiny-input__inner {
      border: 1px solid #c2c2c2;
      border-radius: 17px;
      height: 32px;
      font-size: 14px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      color: #595959;
      &::placeholder {
        color: #808080;
      }
    }
    .tiny-input__prefix {
      left: 10px;
      svg {
        fill: #808080;
      }
    }
    .tiny-input__suffix {
      right: 36px;
      svg {
        fill: #808080;
      }
    }
  }
  ::v-deep(> .tiny-tree-menu) {
    width: 276px;
    &::before {
      display: none;
    }
    .tiny-tree {
      padding: 12px 24px 20px;
      height: calc(100vh - 184px);
      overflow: hidden auto;
      .tiny-tree-node {
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Medium;
        .tiny-tree-node__content {
          margin-bottom: 4px;

          &::before {
            display: none;
          }

          .tiny-tree-node__content-left {
            display: flex;
            flex-direction: row-reverse;
            padding-left: 8px;
            &::before {
              display: none;
            }
            .tree-node-icon {
              margin-right: 8px;
              svg {
                margin: 0;
                width: 16px;
                height: 16px;
                fill: #191919;
              }
            }
            .tiny-tree-node__content-box {
              background-color: unset;
            }
          }
          .tree-node-name {
            border-left: 0;
            padding-left: 0;
            color: #595959;
            display: flex;
            .menu-link-icon {
              margin: 0;
              font-size: 16px;
              margin-left: 5px;
              flex-shrink: 0;
            }
            .menu-label {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: inherit;
            }
          }
        }
        .tiny-svg {
          margin-left: 24px;
        }
        &:not(.is-leaf) > .tiny-tree-node__content {
          background-color: #fff;
          &:hover {
            background-color: #fff;
          }
          .tiny-tree-node__content-box {
            .tree-node-name {
              color: #191919;
              font-weight: 600;
            }
          }
        }
        &:not(.is-current).is-leaf > .tiny-tree-node__content {
          &:hover {
            background-color: #f8f8f8;
            border-radius: 20px;
            .tree-node-name {
              color: #393939;
            }
          }
        }
        &.is-current.is-leaf > .tiny-tree-node__content {
          background-color: #f0f0f0;
          border-radius: 20px;
          .tree-node-name {
            font-weight: 500;
            color: #191919 !important;
          }
        }
      }
    }
    &.deep-menu,
    & {
      > .tiny-tree
        > .tiny-tree-node__wrapper
        > .tiny-tree-node.is-leaf
        > .tiny-tree-node__content
        .tree-node-body
        .tree-node-name {
        color: #191919;
        font-weight: 600;
        padding-left: 4px;
      }
    }
  }

  ::v-deep(.tiny-tree) {
    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }

    &::-webkit-scrollbar-track-piece {
      background: 0 0;
      border: 0;
    }

    &::-webkit-scrollbar-thumb {
      background: #bfbfbf;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:active,
    &::-webkit-scrollbar-thumb:hover {
      background: #999;
    }
  }
}
</style>
