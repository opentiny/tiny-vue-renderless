import "../chunk-G2ADBYYC.js";
import { initData, computedPlaceholder, hideNodeText, filterNode, searchNodeText, nodeClick, nodeExpand, nodeCollapse, nodeDragEnd, nodeDragEnter, nodeDragLeave, nodeDragOver, nodeDragStart, nodeDrop, clickA } from './index.js';
import { setMenuKey } from './../tree-menu/index.js';
const api = ["state", "setMenuKey", "initData", "hideNodeText", "filterNode", "searchNodeText", "nodeClick", "nodeExpand", "nodeCollapse", "nodeDragEnd", "nodeDragEnter", "nodeDragLeave", "nodeDragOver", "nodeDragStart", "nodeDrop", "clickA"];
const renderless = (props, {
  reactive,
  watch,
  computed,
  onMounted
}, {
  t,
  service,
  nextTick,
  constants,
  emit,
  refs
}) => {
  const api2 = {};
  const state = reactive({
    datas: [],
    toggleIcon: true,
    showNode: true,
    filterText: "",
    placeholder: computed(() => api2.computedPlaceholder())
  });
  service = service || {
    base: {}
  };
  service = {
    getMenuDataSync: props.getMenuDataSync || service.base.getMenuDataSync,
    // deprecated v3.4.0废弃, v3.16.0移除；移除原因：如果是同步数据则和:data功能重复
    getMenuDataAsync: props.getMenuDataAsync
  };
  Object.assign(api2, {
    state,
    clickA,
    nodeDrop: nodeDrop(emit),
    filterNode: filterNode(props),
    nodeClick: nodeClick(emit),
    nodeExpand: nodeExpand(emit),
    nodeDragEnd: nodeDragEnd(emit),
    hideNodeText: hideNodeText(state),
    nodeDragOver: nodeDragOver(emit),
    nodeCollapse: nodeCollapse(emit),
    nodeDragStart: nodeDragStart(emit),
    nodeDragLeave: nodeDragLeave(emit),
    nodeDragEnter: nodeDragEnter(emit),
    searchNodeText: searchNodeText({
      state,
      refs,
      nextTick
    }),
    computedPlaceholder: computedPlaceholder({
      constants,
      props,
      t
    }),
    setMenuKey: setMenuKey(api2),
    initData: initData({
      state,
      props,
      service,
      api: api2
    })
  });
  watch(() => state.filterText, value => {
    if (props.automaticFiltering) {
      nextTick(() => refs.tree.filter(value));
    }
  });
  onMounted(api2.initData);
  return api2;
};
export { api, renderless };