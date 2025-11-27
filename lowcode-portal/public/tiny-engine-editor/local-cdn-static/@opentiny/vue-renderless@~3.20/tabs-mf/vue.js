import "../chunk-G2ADBYYC.js";
import { random } from './../common/string.js';
import { useRelation } from './../common/deps/useRelation.js';
import { setActive, addItem, addNav, scrollTo, clickMore, removeItem, changeCurrentName, beforeCarouselSwipe, canLeave, clearOtherTabSwipeScroll, computedSwipeable, observeTabSwipeSize, unobserveTabSwipeSize, sortItem, onRelationChange } from './index.js';
const api = ["state", "setActive", "addItem", "addNav", "scrollTo", "clickMore", "removeItem", "beforeCarouselSwipe", "canLeave", "clearOtherTabSwipeScroll"];
let uniqueId = 0;
const renderless = (props, hooks, {
  vm,
  emit,
  nextTick
}) => {
  const {
    onMounted,
    onBeforeUnmount,
    provide,
    reactive,
    watch,
    computed,
    getCurrentInstance
  } = hooks;
  const instance = getCurrentInstance().proxy;
  const state = reactive({
    items: [],
    navs: [],
    currentItem: computed(() => state.items.find(item => item.selected)),
    key: computed(() => state.currentItem ? state.currentItem.name : random()),
    separator: props.separator,
    swipeable: computed(() => api2.computedSwipeable()),
    maxTabSwipeHeight: 0,
    itemOrderKey: "",
    tabsId: ++uniqueId
  });
  const api2 = {};
  Object.assign(api2, {
    state,
    setActive: setActive({
      state,
      api: api2
    }),
    addItem: addItem(state),
    addNav: addNav(state),
    scrollTo: scrollTo({
      vm,
      state
    }),
    removeItem: removeItem({
      props,
      state,
      emit
    }),
    changeCurrentName: changeCurrentName({
      state,
      emit
    }),
    clickMore: clickMore(api2),
    beforeCarouselSwipe: beforeCarouselSwipe({
      api: api2,
      state,
      vm
    }),
    canLeave: canLeave(props),
    clearOtherTabSwipeScroll: clearOtherTabSwipeScroll({
      state,
      vm
    }),
    computedSwipeable: computedSwipeable({
      props,
      state
    }),
    observeTabSwipeSize: observeTabSwipeSize({
      state,
      vm
    }),
    unobserveTabSwipeSize: unobserveTabSwipeSize({
      state,
      vm
    }),
    sortItem: sortItem(state),
    useRelation: useRelation(hooks),
    onRelationChange: onRelationChange({
      api: api2,
      instance,
      nextTick,
      state
    })
  });
  provide("tabs", vm);
  provide("tabsId", state.tabsId);
  api2.useRelation({
    relationKey: `tabs-${state.tabsId}`,
    childrenKey: "childTabs",
    relationContainer: () => vm.$el.querySelector("[data-tag=tiny-tabs-hidden]"),
    onChange: () => api2.onRelationChange()
  });
  watch(() => props.activeName, name => name && api2.setActive(name));
  watch(() => props.modelValue, name => name && api2.setActive(name));
  onMounted(() => {
    nextTick(() => api2.observeTabSwipeSize());
    props.activeName && api2.scrollTo(props.activeName);
    props.modelValue && api2.scrollTo(props.modelValue);
  });
  onBeforeUnmount(() => {
    api2.unobserveTabSwipeSize();
    state.navs.forEach((n, i) => state.navs[i] = null);
    state.navs.length = 0;
  });
  provide("separator", state.separator);
  return api2;
};
export { api, renderless };