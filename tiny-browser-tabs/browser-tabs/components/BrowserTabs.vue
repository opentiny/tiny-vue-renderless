<template>
  <div class="browser-tabs">
    <div class="tabs-bar">
      <tiny-popover placement="bottom-start" :append-to-body="false">
        <div>
          <div class="dropdown-search">
            <span class="dropdown-search-icon">
              <img :src="searchIcon" alt="search" />
            </span>
            <input class="dropdown-search-input" v-model="dropdownSearch" placeholder="搜索标签页" @click.stop />
          </div>
          <div class="dropdown-search-divider"></div>
          <div class="dropdown-tab-list">
            <div
              v-for="tab in filteredTabs"
              :key="tab.name"
              class="dropdown-tab-item"
              :class="{ active: tab.name === activeName }"
              @click="selectTab(tab.name)"
            >
              <img :src="tab.icon || chromeIcon" class="dropdown-tab-icon" />
              <div class="dropdown-tab-info">
                <div class="dropdown-tab-title">{{ tab.title }}</div>
                <div class="dropdown-tab-url">{{ tab.url }}</div>
              </div>
              <div class="dropdown-tab-close" @click.stop="close(tab)" title="关闭">&times;</div>
            </div>
          </div>
        </div>
        <template #reference>
          <button class="dropdown-btn" title="标签页列表">
            <TinyIconChevronDown />
          </button>
        </template>
      </tiny-popover>
      <div class="tab-list" ref="tabListRef">
        <div
          v-for="(tab, i) in tabs"
          :key="tab.name"
          class="tab-item"
          :class="{ active: tab.name === activeName, narrow: isNarrowAll }"
          :ref="(el) => (tabRefs[i] = el)"
          :draggable="drug === true"
          @click="handleTabClick(tab, i)"
          @dragstart="drug === true ? () => onDragStart(i) : undefined"
          @dragover.prevent="drug === true"
          @drop.prevent="drug === true ? () => onDrop(i) : undefined"
          :title="tab.title"
          @mouseenter="hoverIndex = i"
          @mouseleave="hoverIndex = null"
        >
          <div class="tab-header-content">
            <img v-if="tab.name === activeName" class="tab-arc arc-left" :src="arcLeft" />

            <!-- Icon: Visible when not narrow, OR when narrow and inactive -->
            <span class="tab-icon" v-if="!isNarrowAll || tab.name !== activeName">
              <slot name="tab-icon" :tab="tab" :index="i" :isActive="tab.name === activeName">
                <img :src="tab?.icon || chromeIcon" alt="icon" class="tab-header-icon" />
              </slot>
            </span>

            <span class="tab-title" v-if="!isNarrowAll">
              <slot name="tab-title" :tab="tab" :index="i" :isActive="tab.name === activeName">
                {{ tab.title }}
              </slot>
            </span>

            <div class="custom-close" v-if="!isNarrowAll || tab.name === activeName">
              <!-- <span">&times;</span> -->
              <TinyIconDelete class="tab-close" @mousedown.stop @click.stop="close(tab)" />
            </div>

            <img v-if="tab.name === activeName" class="tab-arc arc-right" :src="arcRight" />
          </div>
        </div>
      </div>
      <button class="tab-add" @click="handleAddTab">+</button>
      <div class="window-controls">
        <button class="window-btn min" @click="onMinimize" title="最小化">
          <TinyIconMinus />
        </button>
        <button class="window-btn max" @click="onMaximize" title="窗口化">
          <img :src="ic_public_copy" />
        </button>
        <button class="window-btn close" @click="onWindowClose" title="关闭">
          <TinyIconDelete />
        </button>
      </div>
    </div>
    <div class="address-bar">
      <div class="address-left">
        <button class="nav-btn" @click="goBack" :disabled="!canGoBack" title="后退">
          <TinyIconArrowLeft />
        </button>
        <button class="nav-btn" @click="goForward" :disabled="!canGoForward" title="前进">
          <TinyIconArrowRight />
        </button>
        <button class="nav-btn" @click="refresh" title="刷新">
          <TinyIconRefresh />
        </button>
      </div>
      <div class="address-url">
        <span class="address-site-icon">
          <img :src="currentTab?.icon || defaultSiteIcon" alt="site" />
        </span>
        <input class="address-input" v-model="currentUrl" @keydown.enter="onAddressEnter" :readonly="addressEditable" />
        <button class="star-btn" :class="{ starred }" @click="toggleStar" title="收藏">
          <TinyIconStarActive v-if="starred" />
          <TinyIconStarO v-else class="stared" />
        </button>
      </div>
      <div class="address-right">
        <button class="nav-btn addressbar-btn-tool" title="扩展">
          <img :src="extIcon" alt="extension" />
        </button>
        <div class="delivider"></div>
        <!-- 用户按钮 -->
        <button class="nav-btn addressbar-btn-user" title="用户">
          <img :src="userIcon" alt="user" />
        </button>
        <!-- 设置按钮 -->
        <button class="nav-btn addressbar-btn-setting" title="设置">
          <TinyIconMore />
        </button>
      </div>
      <!-- 插件按钮 -->
    </div>

    <div class="tab-content">
      <template v-if="$slots.default">
        <slot :tab="currentTab" :tabs="tabs" :activeName="activeName" />
      </template>
      <template v-else>
        <div v-if="currentTab">
          <iframe
            v-if="currentTab.url"
            :src="currentTab.url"
            frameborder="0"
            style="width: 100%; height: calc(100vh - 110px)"
          ></iframe>
          <div v-else class="empty-content">
            <p>No URL provided for this tab.</p>
            <p>You can use slots to display custom content.</p>
          </div>
        </div>
        <div v-else class="empty-content">
          <p>No tab selected.</p>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import '@opentiny/icons/style/base.css'
import { ref, watch, computed, nextTick, onMounted, defineEmits, defineProps, defineOptions } from 'vue'
import TinyPopover from '@opentiny/vue-popover'
import {
  IconArrowLeft,
  IconArrowRight,
  IconRefresh,
  IconChevronDown,
  IconDelete,
  IconMinus,
  IconStarO,
  IconStarActive,
  IconMore
} from '@opentiny/vue-icon'

// 引入SVG资源
import arcLeft from '../assets/arc-left.svg'
import arcRight from '../assets/arc-right.svg'
import chromeIcon from '../assets/chrome.svg'
import defaultSiteIcon from '../assets/default-site-icon.svg'
import searchIcon from '../assets/search.svg'
import extIcon from '../assets/extension.svg'
import userIcon from '../assets/user.svg'
import ic_public_copy from '../assets/ic_public_copy.svg'

const TinyIconArrowLeft = IconArrowLeft()
const TinyIconArrowRight = IconArrowRight()
const TinyIconRefresh = IconRefresh()
const TinyIconChevronDown = IconChevronDown()
const TinyIconDelete = IconDelete()
const TinyIconMinus = IconMinus()
const TinyIconMore = IconMore()
const TinyIconStarO = IconStarO()
const TinyIconStarActive = IconStarActive()

defineOptions({ name: 'TinyBrowserTabs' })

interface Tab {
  title: string
  name: string
  url?: string
  icon?: string
}

const props = defineProps<{
  tabs: Tab[]
  modelValue: string
  drug?: boolean
  canGoBack?: { type: boolean; default(): true }
  canGoForward?: { type: boolean; default(): true }
  addressEditable?: boolean
}>()

const emit = defineEmits([
  'change',
  'close',
  'tab-drag-end',
  'add',
  'address-enter',
  'go-back',
  'go-forward',
  'refresh',
  'minimize',
  'maximize',
  'window-close',
  'star'
])

const activeName = ref<string>(props.modelValue)
const tabs = ref<Tab[]>(props.tabs)
const dragIndex = ref<number | null>(null)
const hoverIndex = ref<number | null>(null)
const tabListRef = ref<HTMLElement | null>(null)
const tabRefs = ref<(HTMLElement | null)[]>([])
const narrowThreshold = 55
const isNarrowAll = ref(false)
const dropdownSearch = ref('')
const filteredTabs = computed<Tab[]>(() =>
  tabs.value.filter(
    (tab: Tab) =>
      tab.title.toLowerCase().includes(dropdownSearch.value.toLowerCase()) ||
      (tab.url && tab.url.toLowerCase().includes(dropdownSearch.value.toLowerCase()))
  )
)

// 便于模板直接使用 props
const drug = props.drug
const canGoBack = props.canGoBack
const canGoForward = props.canGoForward
const addressEditable = props.addressEditable

const updateNarrowState = () => {
  isNarrowAll.value =
    tabs.value.length === 1
      ? false
      : !!(
          tabRefs.value.length > 0 &&
          tabRefs.value.some((el) => el && (el as HTMLElement).offsetWidth < narrowThreshold)
        )
}

onMounted(() => {
  nextTick(updateNarrowState)
  window.addEventListener('resize', updateNarrowState)
})

watch(
  () => tabs.value,
  () => {
    console.info(2)
    nextTick(updateNarrowState)
  },
  { deep: true }
)

watch(activeName, () => {
  nextTick(updateNarrowState)
})

const scrollTabIntoView = (index: number) => {
  nextTick(() => {
    const tabEl = tabRefs.value[index] as HTMLElement | null
    const listEl = tabListRef.value
    if (!tabEl || !listEl) return
    const tabRect = tabEl.getBoundingClientRect()
    const listRect = listEl.getBoundingClientRect()
    const scrollOffset = 42 // 偏移量，可根据实际tab宽度调整
    // tab左侧被遮挡
    if (tabRect.left < listRect.left) {
      listEl.scrollLeft -= listRect.left - tabRect.left + scrollOffset
    }
    // tab右侧被遮挡
    else if (tabRect.right > listRect.right) {
      listEl.scrollLeft += tabRect.right - listRect.right + scrollOffset
    }
    // 可见时不滚动
  })
}
const handleTabClick = (tab: Tab, index: number) => {
  emit('change', tab)
  setActive(tab.name)
  scrollTabIntoView(index)
}
const handleAddTab = () => {
  emit('add')
  nextTick(() => {
    scrollTabIntoView(tabs.value.length - 1)
  })
}

watch(
  () => props.modelValue,
  (val: string) => {
    activeName.value = val
  }
)
watch(
  () => props.tabs,
  (val: Tab[]) => {
    tabs.value = val
  }
)
const currentTab = computed<Tab | undefined>(() => tabs.value.find((tab: Tab) => tab.name === activeName.value))
const currentUrl = ref<string>(currentTab.value?.url || '')
watch(currentTab, (tab: Tab | undefined) => {
  currentUrl.value = tab?.url || ''
})
const onAddressEnter = () => {
  emit('address-enter', currentUrl.value, currentTab.value)
  const idx = tabs.value.findIndex((tab: Tab) => tab.name === activeName.value)
  if (idx !== -1) {
    tabs.value[idx].url = currentUrl.value
  }
}

const setActive = (name: string) => {
  activeName.value = name
}
const close = (tab: Tab) => {
  emit('close', tab)
}
const onDragStart = (index: number) => {
  dragIndex.value = index
}
const onDrop = (index: number) => {
  if (dragIndex.value === null || dragIndex.value === index) return
  const moved = tabs.value.splice(dragIndex.value, 1)[0]
  tabs.value.splice(index, 0, moved)
  emit('tab-drag-end', { from: dragIndex.value, to: index, tabs: tabs.value })
  dragIndex.value = null
}
const goBack = () => {
  emit('go-back', currentTab.value)
}
const goForward = () => {
  emit('go-forward', currentTab.value)
}
const refresh = () => {
  emit('refresh', currentTab.value)
}
const onMinimize = () => {
  emit('minimize')
}
const onMaximize = () => {
  emit('maximize')
}
const onWindowClose = () => {
  emit('window-close')
}
const selectTab = (name: string) => {
  activeName.value = name
  nextTick(updateNarrowState)
}
const starred = ref(false)
const toggleStar = () => {
  starred.value = !starred.value
  emit('star', currentTab.value, starred.value)
}
</script>
<style scoped>
.browser-tabs {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
.tab-header-title {
  display: flex;
  align-items: center;
  justify-content: flex-start; /* 改为flex-start */
  gap: 5px;
  flex: 1; /* 填充可用空间 */
  min-width: 0; /* 允许收缩 */
  overflow: hidden; /* 保证省略号生效 */
}
.tab-list {
  display: flex;
  align-items: center;
  max-width: calc(100% - 95px);
  overflow: hidden;
  padding: 0 10px;
  height: 42px;
  margin-top: 8px;
}
.tab-header-icon {
  width: 18px;
  height: 18px;
  min-width: 18px;
}
.tab-header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  line-height: 26px;
  padding: 0 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 24px;
  gap: 5px;
}
.tabs-bar {
  display: flex;
  align-items: center;
  background: #d3e3fd;
  padding: 0px 150px 0px 40px;
  height: 50px;
  user-select: none;
  position: relative;
}
.tab-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 8px 8px;
  line-height: 34px;
  height: 42px;
  background: #d3e3fd;
  cursor: pointer;
  position: relative;
  color: #000000;
  flex: 1 1 0;
  overflow: visible;
  min-width: 30px;
  max-width: 300px;
  width: 300px;
  gap: 5px;
  box-sizing: border-box;
}

.tab-item.narrow:not(.active) {
  justify-content: center;
}

.tab-item.narrow.active {
  justify-content: center;
}

.tab-item:not(.active):hover .tab-header-content {
  border-radius: 12px;
  background: #a8c7fa;
  line-height: 30px;
  z-index: 12;
}
.tab-item.active {
  color: #191919;
  background: #fff;
  z-index: 2;
  font-weight: 500;
  border-radius: 8px 8px 0 0;
}
.tab-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}
.tab-title {
  flex-grow: 1;
  flex-shrink: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.custom-close {
  flex-shrink: 0;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.tab-close {
  font-size: 20px;
  color: #474747;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 0px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tab-close:hover {
  opacity: 1;
  color: #474747;
  background: #dcdcdd;
  border-radius: 50%;
}

.tab-item:not(:first-child)::before {
  content: '';
  position: absolute;
  left: 0px;
  top: 17px;
  transform: translateY(-50%);
  width: 2px;
  height: 18px;
  background: #a8c7fa;
  opacity: 1;
  transition: opacity 0.2s;
  z-index: 20;
}
/* hover/active 左右分割线隐藏 */
.tab-item:hover::before,
.tab-item.active::before {
  opacity: 0;
}
.tab-item:hover + .tab-item::before,
.tab-item.active + .tab-item::before {
  opacity: 0;
}
.tab-arc {
  position: absolute;
  bottom: 0px;
  z-index: 10;
  overflow: hidden;
  pointer-events: none;
  width: 15px;
  height: 15px;
}
.tab-arc .dot {
  content: '';
  height: 24px;
  width: 24px;
  border-radius: 999px;
  background: #d3e3fd;
  position: absolute;
  z-index: 10;
  bottom: 0;
}
.arc-left {
  left: -15px;
  transform: rotate(90deg);
}
.arc-left .dot {
  right: 0px;
}
.arc-right {
  right: -15px;
  transform: rotate(180deg);
}
.arc-right .dot {
  left: 0px;
}
.tab-add {
  background: none;
  border: none;
  font-size: 20px;
  color: #000000;
  cursor: pointer;
  height: 28px;
  line-height: 28px;
  width: 28px;
  border-radius: 50%;
  transition: background 0.2s;
  display: flex;
  justify-content: center;
}
.tab-add:hover {
  background: #a8c7fa;
}
.tab-content {
  flex: 1;
  background: #fff;
  min-height: 0;
  overflow: auto;
}
.empty-content {
  padding: 20px;
  text-align: center;
  color: #999;
}
.window-controls {
  display: flex;
  align-items: center;
  position: absolute;
  height: 50px;
  right: 0px;
  top: 0px;
  z-index: 200;
}
.window-btn {
  width: 60px;
  height: 50px;
  border: none;
  background: #d3e3fd;
  color: #000000;
  fill: #000000;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
.window-btn.max svg {
  background: #d3e3fd;
}
.window-btn:hover {
  background: #bdcce3;
}
.window-btn.close:hover {
  background: #e81123;
  fill: #fff;
}

.dropdown.dropdown-left {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 201;
  height: 50px;
  display: flex;
  align-items: center;
}
.dropdown-btn {
  font-size: 20px;
  width: 35px;
  height: 35px;
  background: #ecf3fe;
  border: none;
  color: #000000;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  position: absolute;
  z-index: 50;
  top: 8px;
  left: 8px;
}
:deep(.tiny-popover.tiny-popper) {
  padding: 0;
}
.dropdown-btn:hover {
  background: #a8c7fa;
}
.dropdown-menu {
  position: absolute;
  left: 0;
  top: 100%;
  background: #fff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  min-width: 100px;
  z-index: 999;
}
.dropdown-item {
  padding: 8px 16px;
  cursor: pointer;
  white-space: nowrap;
}
.dropdown-item:hover {
  background: #f5f5f5;
}
.tab-dropdown-menu {
  min-width: 280px;
  max-height: 340px;
  overflow-y: auto;
  padding: 0;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.13);
  background: #fff;
  border: 1px solid #e0e0e0;
}
.dropdown-search {
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px 8px 4px 8px;
  background: #fff;
}
.dropdown-search-icon {
  position: absolute;
  left: 16px;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  pointer-events: none;
}
.dropdown-search-input {
  padding-left: 36px;
  width: 100%;
  height: 40px;
}
.dropdown-search-divider {
  height: 1px;
  background: #e0e0e0;
  margin: 0 8px;
}
.dropdown-tab-list {
  max-height: 270px;
  overflow-y: auto;
  padding-bottom: 6px;
}
.dropdown-tab-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 16px;
  cursor: pointer;
  transition: background 0.2s;
  border-radius: 6px;
  margin: 6px;
}
.dropdown-tab-item.active {
  background: #e3f0fd;
}
.dropdown-tab-item:hover {
  background: #f5f5f5;
}
.dropdown-tab-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  flex-shrink: 0;
}
.dropdown-tab-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.dropdown-tab-title {
  font-size: 14px;
  color: #222;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 130px;
}
.dropdown-tab-url {
  font-size: 12px;
  color: #888;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
}
.dropdown-tab-close {
  margin-left: 12px;
  color: #888;
  font-size: 16px;
  cursor: pointer;
  border-radius: 50%;
  line-height: 14px;
  transition: background 0.2s, color 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
}
.dropdown-tab-close:hover {
  background: #88888854;
}
.dropdown-tab-item {
  position: relative;
}
/* Chrome风格滚动条 */
.tab-dropdown-menu::-webkit-scrollbar-button,
.dropdown-tab-list::-webkit-scrollbar-button {
  width: 0 !important;
  height: 0 !important;
  display: none !important;
  background: transparent !important;
}
.tab-dropdown-menu::-webkit-scrollbar-button:single-button,
.dropdown-tab-list::-webkit-scrollbar-button:single-button {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}
.tab-dropdown-menu,
.dropdown-tab-list {
  scrollbar-width: thin;
  scrollbar-color: #c1c1c1 #fff;
}
.tab-dropdown-menu::-webkit-scrollbar,
.dropdown-tab-list::-webkit-scrollbar {
  width: 7px;
  background: #f5f5f5;
  border-radius: 8px;
}
.tab-dropdown-menu::-webkit-scrollbar-thumb,
.dropdown-tab-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 8px;
}
.tab-dropdown-menu::-webkit-scrollbar-thumb:hover,
.dropdown-tab-list::-webkit-scrollbar-thumb:hover {
  background: #a8c7fa;
}
.address-bar {
  display: flex;
  align-items: center;
  background: #fff;
  height: 58px;
  position: relative;
}
.address-url {
  flex: 1;
  display: flex;
  position: relative;
  align-items: center;
}
.address-left {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 9px;
}
.address-right {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 10px;
}
.nav-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: #333;
  font-size: 18px;
  cursor: pointer;
  margin-right: 4px;
  border-radius: 999px;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav-btn:disabled {
  color: #bbb;
  cursor: not-allowed;
}
.nav-btn:hover:not(:disabled) {
  background: #e0e0e0;
}
.address-input {
  flex: 1;
  height: 42px;
  border-radius: 999px;
  padding: 0 40px;
  color: #000000;
  font-size: 15px;
  background: #edf2fa;
  margin-right: 8px;
  text-overflow: ellipsis;
}
.star-btn {
  width: 17px;
  height: 17px;
  font-size: 18px;
  border: none;
  background: transparent;
  color: #aaa;
  cursor: pointer;
  transition: color 0.2s;
  position: absolute;
  display: flex;
  align-items: center;
  right: 20px;
}
.star-btn.starred {
  fill: #0b57d0;
}
.addressbar-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: #888;
  cursor: pointer;
  margin-left: 6px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}
.addressbar-btn:hover {
  background: #e0e0e0;
}
.address-site-icon {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 6px;
  background: #fff;
  border-radius: 999px;
}
.address-site-icon img {
  width: 18px;
  height: 18px;
  display: block;
}
/* 插件按钮 */
.addressbar-btn-tool {
  position: relative;
}
.delivider {
  width: 2px;
  height: 20px;
  margin: 0px 5px;
  background: #a8c7fa;
}
</style>
