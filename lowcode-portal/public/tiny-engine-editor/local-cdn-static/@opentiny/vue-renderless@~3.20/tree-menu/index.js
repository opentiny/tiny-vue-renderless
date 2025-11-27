import { __spreadValues } from "../chunk-G2ADBYYC.js";
import { xss } from './../common/xss.js';
const initData = ({
  state,
  props,
  service,
  api
}) => async () => {
  if (props.data) {
    state.data = props.data;
    return;
  }
  if (typeof service.getMenuDataSync === "function") {
    const menuData = await service.getMenuDataSync();
    state.data = api.setMenuKey({
      newData: [],
      menuData
    });
  }
};
const setMenuKey = api => ({
  newData,
  menuData
}) => {
  Array.isArray(menuData) && menuData.forEach(data => {
    const item = {};
    Object.keys(data).forEach(key => {
      if (key === "name") {
        item.label = data[key];
      } else if (key === "siteNodeId") {
        item.id = data[key];
      } else if (key === "url" && data[key]) {
        if (!data[key].includes("#")) {
          item[key] = "#/" + data[key];
        } else {
          item[key] = data[key];
        }
      } else if (key === "children" && data[key]) {
        item.children = api.setMenuKey({
          newData: [],
          menuData: data.children
        });
      } else {
        item[key] = data[key];
      }
    });
    newData.push(__spreadValues(__spreadValues({}, data), item));
  });
  return newData;
};
const filterNode = props => (value, data) => {
  var _a;
  if (!value) {
    return true;
  }
  const propsLabel = ((_a = props.props) == null ? void 0 : _a.label) || "label";
  return data[propsLabel].includes(value);
};
const watchFilterText = ({
  vm
}) => value => {
  vm.$refs.tree.filter(value);
};
const nodeDragStart = emit => (node, event) => {
  emit("node-drag-start", node, event);
};
const nodeDragEnter = emit => (dragNode, dropNode, event) => {
  emit("node-drag-enter", dragNode, dropNode, event);
};
const nodeDragOver = emit => (dragNode, dropNode, event) => {
  emit("node-drag-over", dragNode, dropNode, event);
};
const nodeDragEnd = emit => (dragNode, dropNode, dropType, event) => {
  emit("node-drag-end", dragNode, dropNode, dropType, event);
};
const nodeDrop = emit => (dragNode, dropNode, dropType, event) => {
  emit("node-drop", dragNode, dropNode, dropType, event);
};
const nodeExpand = emit => (nodeData, node) => {
  emit("node-expand", nodeData, node);
};
const nodeCollapse = emit => (nodeData, node) => {
  emit("node-collapse", nodeData, node);
};
const nodeClick = ({
  emit,
  props,
  state
}) => (nodeData, node) => {
  emit("node-click", nodeData, node);
  if (props.showExpand && state.isExpand) {
    state.isExpand = false;
  }
};
const checkChange = emit => (data, checked, indeterminate) => {
  emit("check-change", data, checked, indeterminate);
};
const check = emit => (data, checkedStatus) => {
  emit("check", data, checkedStatus);
};
const currentChange = emit => (data, node, e) => {
  if (data && data.url && e.target.nodeName !== "A" && e.target.nodeName !== "SPAN") {
    window.open(xss.filterUrl(data.url), "_self").opener = null;
  }
  emit("current-change", data, node);
};
const getTitle = props => label => props.showTitle ? label : "";
const collapseChange = ({
  state,
  props,
  emit
}) => () => {
  if (props.menuCollapsible) {
    state.isCollapsed = !state.isCollapsed;
    emit("collapse-change", state.isCollapsed);
  }
};
const collapseMenu = ({
  state,
  props,
  api
}) => () => {
  if (props.menuCollapsible && !state.isCollapsed) {
    api.collapseChange();
  }
};
const expandMenu = ({
  state,
  props,
  api
}) => () => {
  if (props.menuCollapsible && state.isCollapsed) {
    api.collapseChange();
  }
};
const setCurrentKey = ({
  vm
}) => key => {
  vm.$refs.tree.setCurrentKey(key);
};
const getCurrentKey = ({
  vm
}) => () => {
  return vm.$refs.tree.getCurrentKey();
};
const setCurrentNode = ({
  vm
}) => key => {
  vm.$refs.tree.setCurrentKey(key);
};
const getCurrentNode = ({
  vm
}) => () => {
  return vm.$refs.tree.getCurrentNode();
};
const handleToggleMenu = ({
  state,
  vm
}) => type => {
  state.isExpand = !state.isExpand;
  if (type === "expand") {
    state.currentKey = state.nodeKey !== null ? [state.nodeKey] : [];
  } else {
    state.nodeKey = vm.$refs.tree.getCurrentKey();
    vm.$refs.tree.expandAllNodes(false);
  }
};
const computedTreeStyle = ({
  props
}) => () => {
  let minusHeight = 0;
  if (props.showExpand) {
    minusHeight += 64;
  }
  if (props.showFilter) {
    minusHeight += 42;
  }
  return {
    "height": `calc(100% - ${minusHeight}px)`
  };
};
export { check, checkChange, collapseChange, collapseMenu, computedTreeStyle, currentChange, expandMenu, filterNode, getCurrentKey, getCurrentNode, getTitle, handleToggleMenu, initData, nodeClick, nodeCollapse, nodeDragEnd, nodeDragEnter, nodeDragOver, nodeDragStart, nodeDrop, nodeExpand, setCurrentKey, setCurrentNode, setMenuKey, watchFilterText };