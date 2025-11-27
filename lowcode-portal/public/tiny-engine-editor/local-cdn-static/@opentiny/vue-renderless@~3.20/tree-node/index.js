import { __spreadValues } from "../chunk-G2ADBYYC.js";
import { getNodeKey as getTreeNodeKey } from './../common/deps/tree-model/util.js';
const watchIndeterminate = ({
  api,
  props
}) => value => api.handleSelectChange(props.node.checked, value);
const watchChecked = ({
  api,
  props
}) => value => api.handleSelectChange(value, props.node.indeterminate);
const watchExpanded = ({
  state
}) => value => {
  state.expanded = value;
  if (value) {
    state.childNodeRendered = true;
  }
};
const getNodeKey = state => node => getTreeNodeKey(state.tree.nodeKey, node.data);
const getVisibleNodes = (treeNode, tree) => {
  if (treeNode.visible) {
    const childNodes = treeNode.childNodes;
    Object.assign(tree, {
      checked: treeNode.checked,
      expanded: treeNode.expanded,
      level: treeNode.level,
      isLeaf: treeNode.isLeaf
    }, treeNode.data, {
      children: []
    });
    childNodes.forEach(node => {
      if (node.visible) {
        const child = {};
        getVisibleNodes(node, child);
        tree.children.push(child);
      }
    });
    if (!tree.children.length) {
      delete tree.children;
    }
  }
};
const handleSelectChange = ({
  props,
  state
}) => (checked, indeterminate) => {
  state.tree.state.store.setCurrentNode(props.node);
  if (state.oldChecked !== checked && state.oldIndeterminate !== indeterminate) {
    const treeNodes = {};
    getVisibleNodes(props.node, treeNodes);
    state.tree.$emit("check-change", treeNodes, checked, indeterminate);
  }
  state.oldChecked = checked;
  state.indeterminate = indeterminate;
};
const handleClick = ({
  api,
  vm,
  props,
  state
}) => e => {
  const contentElm = vm.$refs.content;
  if (contentElm && !contentElm.contains(e == null ? void 0 : e.target)) {
    return;
  }
  const store = state.tree.state.store;
  if (!state.tree.onlyCheckChildren) {
    state.tree.clearCurrentStore(props.node);
    store.setCurrentNode(props.node);
    !props.node.disabled && state.tree.$emit("current-change", store.currentNode ? store.currentNode.data : null, store.currentNode, e);
  } else if (props.node.isLeaf && !props.node.disabled) {
    state.tree.clearCurrentStore(props.node);
    store.setCurrentNode(props.node);
    state.tree.$emit("current-change", store.currentNode ? store.currentNode.data : null, store.currentNode, e);
  }
  state.tree.currentNode = vm;
  if (state.tree.checkOnClickNode && !props.node.disabled) {
    e.target.checked = !props.node.checked;
    api.handleCheckChange(null, e);
  }
  const isCheck = props.showCheckbox ? vm.$refs.checkbox && !vm.$refs.checkbox.$el.contains(e.target) : true;
  if (state.tree.onlyCheckChildren) {
    if (props.node.isLeaf && !props.node.disabled) {
      state.tree.$emit("node-click", props.node.data, props.node, vm);
      return;
    }
    api.handleExpandClick(false);
  } else {
    if (!state.tree.collapsible || !state.tree.expandOnClickNode) {
      !props.node.disabled && state.tree.$emit("node-click", props.node.data, props.node, vm);
      return;
    }
    if (state.tree.expandOnClickNode && isCheck) {
      api.handleExpandClick(isCheck);
    }
  }
};
const closeMenu = state => () => {
  state.showMenu = false;
};
const handleContextMenu = ({
  treeRoot,
  vm,
  props,
  state,
  nextTick
}) => event => {
  const listeners = treeRoot.vm.$listeners;
  if (treeRoot.showContextmenu || listeners["node-contextmenu"]) {
    event.stopPropagation();
    event.preventDefault();
  }
  state.tree.$parent.$emit("node-contextmenu", event, props.node.data, props.node, vm);
  if (!treeRoot.showContextmenu) {
    return;
  }
  state.showMenu = true;
  state.tree.$parent.menuInstance = vm;
  nextTick(() => {
    const menuWidth = vm.$refs.menuContext.offsetWidth;
    const treeWidth = state.tree.$parent.$el.offsetWidth;
    if (event.clientY > -10) {
      state.menuposition.top = `${vm.$refs.node.offsetTop + vm.$refs.content.offsetHeight / 2}px`;
    }
    if (event.clientX > -10) {
      if (menuWidth > treeWidth) {
        state.menuposition.left = 0;
      } else {
        state.menuposition.left = event.offsetX + menuWidth > treeWidth ? `${treeWidth - menuWidth}px` : `${event.offsetX}px`;
      }
    }
  });
};
const handleExpandIconClick = ({
  api,
  state
}) => (event, node) => {
  if (!node.isLeaf) {
    state.tree.iconTriggerClickNode ? api.handleExpandClick(true) : api.handleExpandClick(false);
    event.stopPropagation();
  }
};
const handleExpandClick = ({
  emit,
  vm,
  props,
  state
}) => nodeClickFlag => {
  if (nodeClickFlag) {
    state.tree.$parent.$emit("node-click", props.node.data, props.node, vm);
  }
  if (props.node.isLeaf) {
    return;
  }
  if (state.expanded) {
    state.tree.$parent.$emit("node-collapse", props.node.data, props.node, vm);
    props.node.collapse();
  } else {
    props.node.expand();
    emit("node-expand", props.node.data, props.node, vm);
  }
};
const handleCheckChange = ({
  nextTick,
  props,
  state
}) => (value, event = {}) => {
  if (event.type === "click" || event.type === "mousedown") {
    props.node.setChecked(event.target.checked, !state.tree.checkStrictly);
  }
  if (props.checkEasily && state.tree.checkStrictly) {
    !state.tree.checkOnClickNode && props.node.setChecked(event.target.checked, true, false, false, true);
  } else {
    !state.tree.checkOnClickNode && props.node.setChecked(event.target.checked, !state.tree.checkStrictly);
  }
  nextTick(() => {
    const store = state.tree.state.store;
    state.tree.$emit("check", props.node.data, {
      checkedNodes: store.getCheckedNodes(),
      checkedKeys: store.getCheckedKeys(),
      halfCheckedNodes: store.getHalfCheckedNodes(),
      halfCheckedKeys: store.getHalfCheckedKeys()
    });
  });
};
const handleContentClick = ({
  nextTick,
  props,
  state,
  emit
}) => (currentNode, currentRadio) => {
  if (props.showRadio) {
    if (!currentNode.disabled && currentRadio.value !== currentNode.id) {
      emit("radio-change", currentNode.id);
      nextTick(() => {
        const param = __spreadValues({}, currentNode.data);
        state.tree.$emit("check-change", param);
      });
    }
  }
};
const handleChildNodeExpand = state => (nodeData, node, instance) => {
  state.tree.$emit("node-expand", nodeData, node, instance);
};
const handleDragStart = ({
  state,
  vm
}) => event => {
  if (!state.tree.draggable) {
    return;
  }
  state.tree.state.emitter.emit("tree-node-drag-start", event, vm);
};
const handleDragOver = ({
  state,
  vm
}) => event => {
  if (!state.tree.draggable) {
    return;
  }
  state.tree.state.emitter.emit("tree-node-drag-over", event, vm);
  event.preventDefault();
};
const handleDrop = () => event => event.preventDefault();
const handleDragEnd = ({
  state,
  vm
}) => event => {
  if (!state.tree.draggable) {
    return;
  }
  state.tree.state.emitter.emit("tree-node-drag-end", event, vm);
};
const created = ({
  props,
  state
}) => fn => {
  const tree = state.tree;
  const property = tree.props || {};
  const childrenKey = property.children || "children";
  fn(childrenKey);
  if (props.node.expanded) {
    state.expanded = true;
    state.childNodeRendered = true;
  }
};
const onSiblingToggleExpand = ({
  state,
  props
}) => ({
  isExpand,
  sibling
}) => {
  if (state.tree.accordion && isExpand && props.node && sibling && props.node.id !== sibling.id) {
    props.node.collapse();
  }
};
const watchExpandedChange = ({
  state,
  props
}) => () => {
  if (state.tree.accordion) {
    state.parentEmitter.emit("sibling-node-toggle-expand", {
      isExpand: props.node.expanded,
      sibling: props.node
    });
  }
};
const openEdit = ({
  state,
  vm
}) => node => {
  state.tree.state.emitter.emit("tree-node-edit", node);
  setTimeout(() => {
    const inputRef = vm.$refs.editInput || vm.$el.querySelector("input");
    inputRef && inputRef.focus();
  }, 300);
};
const closeEdit = ({
  state
}) => () => {
  state.tree.state.emitter.emit("tree-node-edit", null);
};
const saveEdit = ({
  state
}) => event => {
  event.stopPropagation();
  state.tree.state.emitter.emit("tree-node-save");
};
const deleteNode = ({
  state
}) => (event, node) => {
  state.tree.state.emitter.emit("tree-node-delete", event, node);
};
const addNode = ({
  state,
  props,
  api
}) => (event, node) => {
  props.node.expand();
  api.openEdit();
  state.tree.state.emitter.emit("tree-node-add", event, node);
};
const computedExpandIcon = ({
  designConfig
}) => (treeRoot, state) => {
  var _a, _b;
  if (state.tree.icon) {
    return state.tree.icon;
  }
  if (treeRoot.showLine) {
    const expandIcon = ((_a = designConfig == null ? void 0 : designConfig.icons) == null ? void 0 : _a.expanded) || "icon-expand";
    const collapseIcon = ((_b = designConfig == null ? void 0 : designConfig.icons) == null ? void 0 : _b.collapse) || "icon-put-away";
    return state.expanded ? expandIcon : collapseIcon;
  }
  return "icon-chevron-right";
};
const computedIndent = () => ({
  node,
  showLine
}, {
  tree
}) => {
  return (node.level > 1 ? 1 : 0) * (parseInt(tree.indent) + (showLine ? 8 : 0)) + parseInt(tree.baseIndent) + "px";
};
export { addNode, closeEdit, closeMenu, computedExpandIcon, computedIndent, created, deleteNode, getNodeKey, handleCheckChange, handleChildNodeExpand, handleClick, handleContentClick, handleContextMenu, handleDragEnd, handleDragOver, handleDragStart, handleDrop, handleExpandClick, handleExpandIconClick, handleSelectChange, onSiblingToggleExpand, openEdit, saveEdit, watchChecked, watchExpanded, watchExpandedChange, watchIndeterminate };