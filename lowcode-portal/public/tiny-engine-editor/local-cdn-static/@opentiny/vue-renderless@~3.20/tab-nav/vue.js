import "../chunk-G2ADBYYC.js";
import { computedNavStyle, computedSizeName, updated, visibilityChangeHandler, windowBlurHandler, windowFocusHandler, scrollToActiveTab, scrollIntoView, mounted, moreTabShow, expandTabShow, expandTabHide, computedHeaderStyle, beforeUnmount, scrollPrev, scrollNext, changeTab, setFocus, removeFocus, sortableEvent, handleTabDragStart, handleTabDragEnd, watchCurrentName, handleTitleMouseenter, handleTitleMouseleave } from './index.js';
const api = ["state", "setFocus", "removeFocus", "scrollPrev", "scrollNext", "changeTab", "scrollToActiveTab", "scrollIntoView", "moreTabShow", "expandTabShow", "expandTabHide", "computedHeaderStyle", "swiperHandle", "updated", "handleTitleMouseenter", "handleTitleMouseleave"];
const renderless = (props, {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  reactive,
  markRaw
}, {
  parent,
  vm,
  nextTick,
  mode: tinyMode,
  emit
}) => {
  const api2 = {
    mounted,
    beforeUnmount,
    computedNavStyle,
    computedSizeName
  };
  const state = reactive({
    dragging: false,
    navOffset: 0,
    lineStyle: {
      width: 20,
      offset: 0
    },
    scrollable: false,
    isFocus: false,
    focusable: false,
    showMoreItem: false,
    isActive: false,
    tooltipVisible: false,
    tooltipContent: "",
    showMoreTabs: props.showMoreTabs,
    showExpandItem: false,
    showExpandTabs: props.showExpandTabs,
    expandHeaderStyle: {},
    mode: props._mode || parent.$mode || tinyMode || "pc",
    rootTabs: inject("rootTabs"),
    sizeName: computed(() => api2.computedSizeName(state)),
    navStyle: computed(() => api2.computedNavStyle(state)),
    navSortableObj: {},
    separator: inject("separator", null)
  });
  Object.assign(api2, {
    state,
    setFocus: setFocus(state),
    removeFocus: removeFocus(state),
    moreTabShow: moreTabShow(state),
    expandTabShow: expandTabShow({
      api: api2,
      state
    }),
    expandTabHide: expandTabHide(state),
    scrollPrev: scrollPrev({
      vm,
      state
    }),
    scrollNext: scrollNext({
      vm,
      state
    }),
    windowBlurHandler: windowBlurHandler(state),
    windowFocusHandler: windowFocusHandler(state),
    visibilityChangeHandler: visibilityChangeHandler(state),
    scrollToActiveTab: scrollToActiveTab({
      parent,
      vm,
      state
    }),
    scrollIntoView: scrollIntoView({
      parent,
      vm,
      state
    }),
    computedHeaderStyle: computedHeaderStyle({
      vm,
      state
    }),
    watchCurrentName: watchCurrentName({
      nextTick,
      vm,
      state
    }),
    handleTabDragStart: handleTabDragStart({
      state,
      vm,
      emit
    }),
    handleTabDragEnd: handleTabDragEnd({
      state,
      vm,
      nextTick
    }),
    sortableEvent: sortableEvent({
      api: api2,
      props,
      state,
      vm,
      emit,
      markRaw
    }),
    handleTitleMouseenter: handleTitleMouseenter({
      state,
      vm,
      props
    }),
    handleTitleMouseleave: handleTitleMouseleave({
      state
    })
  });
  Object.assign(api2, {
    updated: updated({
      api: api2,
      vm,
      state
    }),
    changeTab: changeTab(api2)
  });
  onUpdated(() => api2.updated());
  onMounted(() => api2.mounted({
    api: api2,
    parent
  }));
  onBeforeUnmount(() => api2.beforeUnmount({
    api: api2,
    parent
  }));
  return api2;
};
export { api, renderless };