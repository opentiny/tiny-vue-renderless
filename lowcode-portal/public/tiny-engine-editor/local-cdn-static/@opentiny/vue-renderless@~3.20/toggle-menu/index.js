import "../chunk-G2ADBYYC.js";
import { xss } from './../common/xss.js';
import { isObject } from './../common/type.js';
const filterNode = props => (value, data) => {
  const node = data[props.props.label || "label"] || "";
  return node.includes(value);
};
const searchNodeText = ({
  state,
  refs,
  nextTick
}) => () => {
  nextTick(() => refs.tree.filter(state.filterText));
};
const hideNodeText = state => () => {
  if (state.toggleIcon && state.showNode) {
    state.toggleIcon = false;
    state.showNode = false;
  } else {
    state.toggleIcon = true;
    state.showNode = true;
  }
};
const initData = ({
  state,
  props,
  service,
  api
}) => () => {
  if (props.data) {
    state.datas = props.data;
    return;
  }
  if (typeof service.getMenuDataSync === "function") {
    const menuData = service.getMenuDataSync();
    state.datas = api.setMenuKey({
      newData: [],
      menuData
    });
  } else if (typeof service.getMenuDataAsync === "function") {
    const asyncMenuData = service.getMenuDataAsync();
    if (isObject(asyncMenuData) && asyncMenuData.then) {
      asyncMenuData.then(data => {
        state.datas = api.setMenuKey({
          newData: [],
          menuData: data
        });
      });
    }
  }
};
const computedPlaceholder = ({
  constants,
  props,
  t
}) => () => props.placeholder || t(constants.LOCALE_PLACEHOLDER);
const nodeClick = emit => (nodeData, node) => {
  emit("node-click", nodeData, node);
};
const nodeExpand = emit => (nodeData, node, instance) => {
  emit("node-expand", nodeData, node, instance);
};
const nodeDragStart = emit => (node, event) => {
  emit("node-drag-start", node, event);
};
const nodeCollapse = emit => (nodeData, node) => {
  emit("node-collapse", nodeData, node);
};
const nodeDragEnter = emit => (dragNode, dropNode, event) => {
  emit("node-drag-enter", dragNode, dropNode, event);
};
const nodeDragOver = emit => (dragNode, dropNode, event) => {
  emit("node-drag-over", dragNode, dropNode, event);
};
const nodeDragLeave = emit => (dragNode, dropNode, event) => {
  emit("node-drag-leave", dragNode, dropNode, event);
};
const nodeDragEnd = emit => (dragNode, dropNode, dropType, event) => {
  emit("node-drag-end", dragNode, dropNode, dropType, event);
};
const nodeDrop = emit => (dragNode, dropNode, dropType, event) => {
  emit("node-drop", dragNode, dropNode, dropType, event);
};
const clickA = href => {
  href = xss.filterUrl(href);
  return href && (location.href = href);
};
export { clickA, computedPlaceholder, filterNode, hideNodeText, initData, nodeClick, nodeCollapse, nodeDragEnd, nodeDragEnter, nodeDragLeave, nodeDragOver, nodeDragStart, nodeDrop, nodeExpand, searchNodeText };