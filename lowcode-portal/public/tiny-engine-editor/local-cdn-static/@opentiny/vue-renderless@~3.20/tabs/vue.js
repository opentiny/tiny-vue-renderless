import "../chunk-G2ADBYYC.js";
import { calcMorePanes, calcExpandPanes, calcPaneInstances, handleTabClick, handleTabAdd, handleTabRemove, setCurrentName, changeCurrentName, created, changeDirection, handleTabDragStart, handleTabDragOver, handleTabDragEnd } from './index.js';
const api = ["state", "handleTabAdd", "calcPaneInstances", "handleTabRemove", "handleTabClick", "handleTabDragStart", "handleTabDragOver", "handleTabDragEnd", "setCurrentName", "getNavRefs"];
const initState = ({
  reactive,
  props
}) => reactive({
  panes: [],
  currentName: props.modelValue || props.activeName,
  currentIndex: -1,
  showPanesCount: -1,
  startX: 0,
  startY: 0,
  deltaX: 0,
  deltaY: 0,
  offsetX: 0,
  offsetY: 0,
  direction: "",
  expandPanesWidth: "",
  activeIndex: 1,
  separator: props.separator
});
const initWatcher = ({
  watch,
  props,
  api: api2,
  state,
  nextTick,
  refs
}) => {
  watch(() => props.modelValue, api2.setCurrentName);
  watch(() => props.activeName, api2.setCurrentName);
  watch(() => state.currentName, () => {
    nextTick(() => {
      refs.nav.scrollToActiveTab();
    });
  }, {
    deep: true
  });
  watch(() => props.showMoreTabs, value => {
    if (!value) {
      state.morePanes = [];
      state.showPanesCount = -1;
    }
  }, {
    immediate: true
  });
};
const renderless = (props, {
  onMounted,
  onUpdated,
  provide,
  reactive,
  watch,
  onUnmounted
}, {
  vm,
  refs,
  parent,
  emit,
  constants,
  nextTick,
  childrenHandler
}) => {
  const api2 = {};
  const state = initState({
    reactive,
    props
  });
  Object.assign(api2, {
    state,
    handleTabAdd: handleTabAdd(emit),
    handleTabRemove: handleTabRemove({
      emit,
      props
    }),
    changeDirection: changeDirection({
      props,
      state
    }),
    changeCurrentName: changeCurrentName({
      emit,
      state
    }),
    calcMorePanes: calcMorePanes({
      parent,
      props,
      state,
      refs
    }),
    calcExpandPanes: calcExpandPanes({
      parent,
      props,
      state
    }),
    calcPaneInstances: calcPaneInstances({
      constants,
      parent,
      state,
      childrenHandler
    }),
    handleTabDragStart: handleTabDragStart({
      emit
    }),
    handleTabDragOver: handleTabDragOver({
      emit
    }),
    handleTabDragEnd: handleTabDragEnd({
      state,
      emit
    }),
    handleTabClick: handleTabClick({
      api: api2,
      emit,
      props,
      refs
    }),
    setCurrentName: setCurrentName({
      api: api2,
      props,
      refs,
      state
    }),
    created: created({
      api: api2,
      parent,
      state
    })
  });
  api2.created();
  provide("rootTabs", parent);
  provide("separator", state.separator);
  initWatcher({
    watch,
    props,
    api: api2,
    state,
    nextTick,
    refs
  });
  onMounted(() => {
    api2.calcPaneInstances();
    api2.calcMorePanes();
    api2.calcExpandPanes();
  });
  onUpdated(() => {
    api2.calcPaneInstances();
    api2.calcMorePanes();
    api2.calcExpandPanes();
  });
  onUnmounted(() => {
    vm.$off("tab-nav-update");
  });
  return api2;
};
export { api, renderless };