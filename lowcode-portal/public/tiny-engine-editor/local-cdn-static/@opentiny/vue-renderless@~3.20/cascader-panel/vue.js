import { __spreadValues } from "../chunk-G2ADBYYC.js";
import { initStore, checkNode, getMenuIndex, isLeaf, focusNode, getCheckedNodes, clearCheckedNodes, getFlattedNodes, getNodeByValue, scrollIntoView, calculateMultiCheckedValue, lazyLoad, handleCheckChange, handleExpand, handleKeyDown, calculateCheckedNodePaths, expandNodes, syncActivePath, watchCheckedValue, syncCheckedValue, syncMenuState, syncMultiCheckState } from './index.js';
import { merge } from './../common/object.js';
import { isEmpty } from './../cascader/index.js';
import Store from "./store.js";
const api = ["state", "handleKeyDown", "getCheckedNodes", "clearCheckedNodes", "scrollIntoView", "handleExpand", "handleCheckChange", "getNodeByValue", "calculateMultiCheckedValue", "lazyLoad", "getFlattedNodes"];
const initDefaultProps = () => ({
  expandTrigger: "click",
  multiple: false,
  checkStrictly: false,
  emitPath: true,
  lazy: false,
  lazyLoad: () => void 0,
  value: "value",
  label: "label",
  children: "children",
  leaf: "leaf",
  disabled: "disabled",
  hoverThreshold: 500
});
const initState = ({
  reactive,
  props,
  computed,
  parent,
  slots
}) => {
  const DefaultProps = initDefaultProps();
  const state = reactive({
    checkedValue: null,
    checkedNodePaths: [],
    store: [],
    menus: [],
    activePath: [],
    loadCount: 0,
    config: computed(() => merge(__spreadValues({}, DefaultProps), props.props || {})),
    multiple: computed(() => state.config.multiple),
    checkStrictly: computed(() => state.config.checkStrictly),
    leafOnly: computed(() => !state.checkStrictly),
    isHoverMenu: computed(() => state.config.expandTrigger === "hover"),
    renderLabelFn: computed(() => {
      var _a;
      return props.renderLabel || slots.default || ((_a = parent.$parent) == null ? void 0 : _a.$options.componentName) === "TinyCascader" && parent.$parent.$scopedSlots.default;
    })
  });
  return state;
};
const initApi = ({
  api: api2,
  state,
  menus,
  props,
  nextTick,
  parent,
  emit
}) => {
  Object.assign(api2, {
    state,
    isLeaf: isLeaf(),
    getMenuIndex: getMenuIndex(),
    getNodeByValue: getNodeByValue(state),
    getFlattedNodes: getFlattedNodes(state),
    handleCheckChange: handleCheckChange(state),
    scrollIntoView: scrollIntoView({
      menus
    }),
    syncActivePath: syncActivePath({
      api: api2,
      state
    }),
    initStore: initStore({
      api: api2,
      props,
      state,
      Store
    }),
    syncMenuState: syncMenuState({
      api: api2,
      nextTick,
      state
    }),
    syncMultiCheckState: syncMultiCheckState({
      api: api2,
      state
    }),
    calculateCheckedNodePaths: calculateCheckedNodePaths({
      api: api2,
      state
    }),
    lazyLoad: lazyLoad({
      api: api2,
      $parent: parent,
      state,
      Store,
      emit
    }),
    syncCheckedValue: syncCheckedValue({
      api: api2,
      props,
      state
    }),
    focusNode: focusNode(api2),
    checkNode: checkNode(api2),
    expandNodes: expandNodes(api2),
    handleExpand: handleExpand({
      emit,
      state
    }),
    getCheckedNodes: getCheckedNodes({
      api: api2,
      state
    }),
    clearCheckedNodes: clearCheckedNodes({
      api: api2,
      state
    }),
    calculateMultiCheckedValue: calculateMultiCheckedValue({
      api: api2,
      state
    }),
    watchCheckedValue: watchCheckedValue({
      api: api2,
      emit,
      props,
      state
    }),
    handleKeyDown: handleKeyDown({
      api: api2,
      emit,
      menus
    })
  });
};
const initWatch = ({
  watch,
  state,
  props,
  api: api2
}) => {
  watch(() => props.options, () => api2.initStore(), {
    deep: true,
    immediate: true
  });
  watch(() => props.modelValue, () => {
    api2.syncCheckedValue();
    state.checkStrictly && api2.calculateCheckedNodePaths();
  });
  watch(() => state.checkedValue, value => {
    api2.watchCheckedValue(value);
  }, {
    deep: true
  });
};
const renderless = (props, {
  computed,
  onMounted,
  reactive,
  watch
}, {
  nextTick,
  emit,
  parent,
  childrenHandler,
  slots
}) => {
  const api2 = {};
  const menus = [];
  const state = initState({
    reactive,
    props,
    computed,
    parent,
    slots
  });
  childrenHandler(({
    vm
  }) => {
    menus.push(vm);
  });
  initApi({
    api: api2,
    state,
    menus,
    props,
    nextTick,
    parent,
    emit
  });
  initWatch({
    watch,
    state,
    props,
    api: api2
  });
  onMounted(() => !isEmpty(props.modelValue) && api2.syncCheckedValue());
  return api2;
};
export { api, renderless };