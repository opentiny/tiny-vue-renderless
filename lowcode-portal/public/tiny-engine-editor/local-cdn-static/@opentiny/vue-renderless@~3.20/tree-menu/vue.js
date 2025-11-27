import "../chunk-G2ADBYYC.js";
import { initData, setMenuKey, filterNode, watchFilterText, nodeDragStart, nodeDragEnter, nodeDragOver, nodeDragEnd, nodeDrop, nodeExpand, nodeCollapse, nodeClick, checkChange, check, currentChange, getTitle, collapseChange, collapseMenu, expandMenu, setCurrentKey, getCurrentKey, setCurrentNode, getCurrentNode, handleToggleMenu, computedTreeStyle } from './index.js';
const api = ["state", "t", "initData", "setMenuKey", "filterNode", "nodeDragStart", "nodeDragEnter", "nodeDragOver", "nodeDragEnd", "nodeDrop", "nodeExpand", "nodeCollapse", "nodeClick", "checkChange", "check", "currentChange", "getTitle", "collapseChange", "collapseMenu", "expandMenu", "setCurrentKey", "getCurrentKey", "setCurrentNode", "getCurrentNode", "handleToggleMenu"];
const renderless = (props, {
  computed,
  watch,
  reactive,
  onMounted
}, {
  t,
  service,
  emit,
  vm
}) => {
  service = service || {
    base: {}
  };
  service = {
    getMenuDataSync: props.getMenuDataSync || service.base.getMenuDataSync
  };
  const api2 = {};
  const state = reactive({
    data: [],
    filterText: "",
    isExpand: false,
    isCollapsed: false,
    nodeKey: null,
    currentKey: [],
    treeStyle: computed(() => api2.computedTreeStyle()),
    defaultExpandedKeys: computed(() => props.defaultExpandedKeys && props.defaultExpandedKeys.length ? props.defaultExpandedKeys : state.currentKey),
    clearable: computed(() => props.clearable)
  });
  Object.assign(api2, {
    t,
    state,
    check: check(emit),
    filterNode: filterNode(props),
    nodeDrop: nodeDrop(emit),
    nodeClick: nodeClick({
      emit,
      props,
      state
    }),
    nodeExpand: nodeExpand(emit),
    nodeDragEnd: nodeDragEnd(emit),
    checkChange: checkChange(emit),
    nodeCollapse: nodeCollapse(emit),
    nodeDragOver: nodeDragOver(emit),
    nodeDragStart: nodeDragStart(emit),
    nodeDragEnter: nodeDragEnter(emit),
    currentChange: currentChange(emit),
    watchFilterText: watchFilterText({
      vm
    }),
    getTitle: getTitle(props),
    setMenuKey: setMenuKey(api2),
    initData: initData({
      state,
      props,
      service,
      api: api2
    }),
    collapseChange: collapseChange({
      state,
      props,
      emit
    }),
    collapseMenu: collapseMenu({
      state,
      props,
      api: api2
    }),
    expandMenu: expandMenu({
      state,
      props,
      api: api2
    }),
    setCurrentKey: setCurrentKey({
      vm
    }),
    getCurrentKey: getCurrentKey({
      vm
    }),
    setCurrentNode: setCurrentNode({
      vm
    }),
    getCurrentNode: getCurrentNode({
      vm
    }),
    handleToggleMenu: handleToggleMenu({
      state,
      vm
    }),
    computedTreeStyle: computedTreeStyle({
      props
    })
  });
  watch(() => props.data, value => state.data = value, {
    immediate: true
  });
  watch(() => state.filterText, api2.watchFilterText, {
    deep: true
  });
  onMounted(api2.initData);
  return api2;
};
export { api, renderless };