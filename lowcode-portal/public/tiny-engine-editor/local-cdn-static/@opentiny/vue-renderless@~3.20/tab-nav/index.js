import "../chunk-G2ADBYYC.js";
import { KEY_CODE, POSITION } from './../common/index.js';
import { capitalize } from './../common/string.js';
import { addResizeListener, removeResizeListener } from './../common/deps/resize-event.js';
import { on, off } from './../common/deps/dom.js';
const computedNavStyle = state => {
  const dir = ~[POSITION.Top, POSITION.Bottom].indexOf(state.rootTabs.position) ? "X" : "Y";
  if (state.mode === "mobile") {
    const {
      offset,
      width
    } = state.lineStyle;
    return {
      width: `${width}px`,
      transform: `translate${dir}(${offset}px) translate${dir}(-50%)`
    };
  } else {
    return {
      transform: `translate${dir}(-${state.navOffset}px)`
    };
  }
};
const scrollIntoView = ({
  parent,
  vm,
  state
}) => () => {
  if (!state.scrollable) {
    return;
  }
  const nav = vm.$refs.nav;
  const activeTab = parent.$el.querySelector(".is-active");
  if (!activeTab) {
    return;
  }
  const to = activeTab.offsetLeft - (nav.offsetWidth - activeTab.offsetWidth) / 2;
  const from = nav.scrollLeft;
  if (state.mode === "mobile") {
    nav.scrollLeft += to - from;
    const nameHtml = activeTab.querySelector(".tiny-mobile-tabs__name");
    state.lineStyle.width = nameHtml.offsetWidth;
    state.lineStyle.offset = activeTab.offsetLeft + activeTab.offsetWidth / 2;
  }
};
const computedSizeName = state => ~[POSITION.Top, POSITION.Bottom].indexOf(state.rootTabs.position) ? "width" : "height";
const updated = ({
  api,
  vm,
  state
}) => () => {
  if (!vm.$refs.nav || state.dragging) {
    return;
  }
  let navSize = vm.$refs.nav[`offset${capitalize(state.sizeName)}`];
  if (state.mode === "mobile") {
    Array.prototype.forEach.call(vm.$refs.nav.children, item => {
      if (item.classList && item.classList.contains("tiny-mobile-tabs__item")) {
        navSize += item.offsetWidth;
      }
      if (item.classList && item.classList.contains("is-active")) {
        const nameHtml = item.querySelector(".tiny-mobile-tabs__name");
        state.isActive = true;
        state.lineStyle.width = nameHtml.offsetWidth;
        state.lineStyle.offset = item.offsetLeft + item.offsetWidth / 2;
      }
    });
  }
  const containerSize = vm.$refs.navScroll[`offset${capitalize(state.sizeName)}`];
  const currentOffset = state.navOffset;
  if (containerSize < navSize) {
    const currentOffset2 = state.navOffset;
    if (!state.scrollable) {
      state.scrollable = {
        prev: currentOffset2,
        next: currentOffset2 + containerSize < navSize
      };
    }
    if (navSize - currentOffset2 < containerSize) {
      state.navOffset = navSize - containerSize;
    }
  } else {
    state.scrollable = false;
    if (currentOffset > 0) {
      state.navOffset = 0;
    }
  }
  state.isActive && api.scrollIntoView();
  if (vm.$refs.tabBar) {
    vm.$refs.tabBar.state.barStyle = vm.$refs.tabBar.computedBarStyle(vm.$refs.tabBar, state);
  } else {
    const line = vm.$refs.nav.querySelector("tiny-mobile-tabs__line");
    line && line.style && (line.style.transform = api.computedNavStyle(state).transform);
  }
};
const mounted = ({
  api,
  parent
}) => {
  const el = parent.$refs.nav.$el;
  addResizeListener(el, api.updated);
  on(document, "visibilitychange", api.visibilityChangeHandler);
  on(window, "blur", api.windowBlurHandler);
  on(window, "focus", api.windowFocusHandler);
  api.scrollToActiveTab();
  api.scrollIntoView();
  api.sortableEvent();
};
const beforeUnmount = ({
  api,
  parent
}) => {
  const el = parent.$refs.nav && parent.$refs.nav.$el;
  if (el && api.updated) {
    removeResizeListener(el, api.updated);
  }
  off(document, "visibilitychange", api.visibilityChangeHandler);
  off(window, "blur", api.windowBlurHandler);
  off(window, "focus", api.windowFocusHandler);
};
const visibilityChangeHandler = state => () => {
  const visibility = document.visibilityState;
  if (visibility === "hidden") {
    state.focusable = false;
  } else if (visibility === "visible") {
    setTimeout(() => {
      state.focusable = true;
    }, 50);
  }
};
const windowBlurHandler = state => () => {
  state.focusable = false;
};
const windowFocusHandler = state => () => {
  setTimeout(() => {
    state.focusable = true;
  }, 50);
};
const scrollToActiveTab = ({
  parent,
  vm,
  state
}) => () => {
  if (!state.scrollable) {
    return;
  }
  const nav = vm.$refs.nav;
  const activeTab = parent.$el.querySelector(".is-active");
  if (!activeTab) {
    return;
  }
  const navScroll = vm.$refs.navScroll;
  const activeTabBounding = activeTab.getBoundingClientRect();
  const navScrollBounding = navScroll.getBoundingClientRect();
  let maxOffset = nav.offsetWidth - navScrollBounding.width;
  if (state.mode === "mobile") {
    if (activeTabBounding.left > navScrollBounding.width) {
      maxOffset = activeTabBounding.left - navScrollBounding.width + activeTabBounding.width;
    } else {
      maxOffset = activeTabBounding.width;
    }
  }
  const currentOffset = state.navOffset;
  let newOffset = currentOffset;
  if (activeTabBounding.left < navScrollBounding.left) {
    newOffset = currentOffset - (navScrollBounding.left - activeTabBounding.left);
  }
  if (activeTabBounding.right > navScrollBounding.right) {
    newOffset = currentOffset + activeTabBounding.right - navScrollBounding.right;
  }
  newOffset = Math.max(newOffset, 0);
  state.navOffset = Math.min(newOffset, maxOffset);
};
const scrollPrev = ({
  vm,
  state
}) => () => {
  const containerSize = vm.$refs.navScroll[`offset${capitalize(state.sizeName)}`];
  const currentOffset = state.navOffset;
  if (!currentOffset) {
    return;
  }
  const newOffset = currentOffset > containerSize ? currentOffset - containerSize : 0;
  state.navOffset = newOffset;
};
const scrollNext = ({
  vm,
  state
}) => () => {
  const navSize = vm.$refs.nav[`offset${capitalize(state.sizeName)}`];
  const containerSize = vm.$refs.navScroll[`offset${capitalize(state.sizeName)}`];
  const currentOffset = state.navOffset;
  if (navSize - currentOffset <= containerSize) {
    return;
  }
  const newOffset = navSize - currentOffset > containerSize * 2 ? currentOffset + containerSize : navSize - containerSize;
  state.navOffset = newOffset;
};
const changeTab = api => event => {
  const keyCode = event.keyCode;
  let nextIndex;
  let currentIndex, tabList;
  if (~[KEY_CODE.ArrowLeft, KEY_CODE.ArrowRight, KEY_CODE.ArrowUp, KEY_CODE.ArrowDown].indexOf(keyCode) && event.currentTarget) {
    const target = event.currentTarget;
    tabList = target.querySelectorAll("[role=tab]");
    currentIndex = Array.prototype.indexOf.call(tabList, event.target);
  } else {
    return;
  }
  if (keyCode === KEY_CODE.ArrowLeft || keyCode === KEY_CODE.ArrowUp) {
    if (currentIndex === 0) {
      nextIndex = tabList.length - 1;
    } else {
      nextIndex = currentIndex - 1;
    }
  } else {
    if (currentIndex < tabList.length - 1) {
      nextIndex = currentIndex + 1;
    } else {
      nextIndex = 0;
    }
  }
  tabList[nextIndex].focus();
  tabList[nextIndex].click();
  api.setFocus();
};
const setFocus = state => () => {
  if (state.focusable) {
    state.isFocus = true;
  }
};
const removeFocus = state => () => {
  state.isFocus = true;
};
const moreTabShow = state => () => {
  if (state.showMoreItem) {
    state.showMoreItem = false;
  } else {
    state.showMoreItem = true;
  }
};
const expandTabShow = ({
  api,
  state
}) => () => {
  state.showExpandItem = !state.showExpandItem;
  if (state.showExpandItem) {
    api.computedHeaderStyle();
  }
};
const expandTabHide = state => () => state.showExpandItem = false;
const computedHeaderStyle = ({
  vm,
  state
}) => () => {
  if (vm.$refs.nav) {
    state.expandHeaderStyle[state.sizeName] = vm.$refs.nav[`offset${capitalize(state.sizeName)}`] + "px";
  }
  return state.expandHeaderStyle;
};
const handleTabDragStart = ({
  state,
  vm,
  emit
}) => event => {
  state.dragging = true;
  if (![POSITION.Top, POSITION.Bottom].includes(state.rootTabs.position)) {
    emit("tab-drag-start", event);
    return;
  }
  const navContainer = vm.$refs.navScroll;
  const nav = vm.$refs.nav;
  const containerWidth = navContainer.offsetWidth;
  const navWidth = nav.offsetWidth;
  if (navWidth > containerWidth) {
    const navHeight = nav.offsetHeight;
    navContainer.style.height = navHeight + "px";
    nav.style.transition = "none";
    nav.style.transform = "";
    nav.style.width = containerWidth + "px";
    nav.style.overflowX = "scroll";
    nav.scrollTo(state.navOffset, 0);
  }
  emit("tab-drag-start", event);
};
const handleTabDragEnd = ({
  vm,
  state,
  nextTick
}) => () => {
  state.dragging = false;
  if (![POSITION.Top, POSITION.Bottom].includes(state.rootTabs.position)) {
    return;
  }
  const nav = vm.$refs.nav;
  if (nav.style.width) {
    const navOffset = nav.scrollLeft;
    const navContainer = vm.$refs.navScroll;
    navContainer.style.height = "";
    nav.style.width = "";
    nav.style.overflowX = "";
    state.navOffset = navOffset;
    nextTick(() => {
      nav.style.transition = "";
    });
  }
};
const sortableEvent = ({
  api,
  props,
  state,
  vm,
  emit,
  markRaw
}) => () => {
  if (!props.dropConfig || typeof props.dropConfig.plugin !== "function") {
    return;
  }
  const navSortableObj = new props.dropConfig.plugin(vm.$refs.nav, {
    sort: true,
    draggable: ".tiny-tabs__item",
    onUpdate(event) {
      emit("tab-drag-end", event);
    },
    onMove(event) {
      emit("tab-drag-over", event);
    },
    onStart(event) {
      api.handleTabDragStart(event);
    },
    onEnd() {
      api.handleTabDragEnd();
    }
  });
  state.navSortableObj = markRaw(navSortableObj);
};
const watchCurrentName = ({
  nextTick,
  vm,
  state
}) => () => {
  nextTick(() => {
    const tabBarVnode = vm.$refs.tabBar;
    if (tabBarVnode) {
      tabBarVnode.state.barStyle = tabBarVnode.computedBarStyle(tabBarVnode, state);
    }
  });
};
const handleTitleMouseenter = ({
  state,
  vm,
  props
}) => (e, title) => {
  const dom = e.target;
  const el = title == null ? void 0 : title.el;
  if (props.tooltipConfig) {
    return;
  }
  if (dom && el && el.scrollWidth > el.offsetWidth) {
    const tooltip = vm.$refs.tooltip;
    tooltip.state.referenceElm = dom;
    tooltip.state.popperElm && (tooltip.state.popperElm.style.display = "none");
    tooltip.doDestroy();
    state.tooltipContent = title;
    state.tooltipVisible = true;
    setTimeout(tooltip.updatePopper, 20);
  }
};
const handleTitleMouseleave = ({
  state
}) => () => {
  state.tooltipVisible = false;
};
export { beforeUnmount, changeTab, computedHeaderStyle, computedNavStyle, computedSizeName, expandTabHide, expandTabShow, handleTabDragEnd, handleTabDragStart, handleTitleMouseenter, handleTitleMouseleave, moreTabShow, mounted, removeFocus, scrollIntoView, scrollNext, scrollPrev, scrollToActiveTab, setFocus, sortableEvent, updated, visibilityChangeHandler, watchCurrentName, windowBlurHandler, windowFocusHandler };