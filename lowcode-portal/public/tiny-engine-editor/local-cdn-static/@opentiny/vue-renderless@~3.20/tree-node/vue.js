import "../chunk-G2ADBYYC.js";
import debounce from './../common/deps/debounce.js';
import { created, handleDragEnd, handleDrop, handleDragOver, handleDragStart, handleContentClick, handleChildNodeExpand, handleCheckChange, handleExpandIconClick, handleExpandClick, handleContextMenu, handleClick, handleSelectChange, getNodeKey, watchIndeterminate, watchChecked, watchExpanded, closeMenu, openEdit, addNode, saveEdit, deleteNode, onSiblingToggleExpand, watchExpandedChange, computedExpandIcon, computedIndent } from './index.js';
const api = ["state", "getNodeKey", "handleClick", "handleContentClick", "closeMenu", "handleDragEnd", "handleDrop", "handleDragOver", "handleDragStart", "handleChildNodeExpand", "handleSelectChange", "handleContextMenu", "handleExpandIconClick", "openEdit", "addNode", "saveEdit", "deleteNode", "handleCheckChange"];
const initState = ({
  reactive,
  treeRoot,
  props,
  emitter,
  $parentEmitter,
  vm,
  api: api2,
  TreeAdapter,
  computed
}) => {
  const state = reactive({
    tree: treeRoot,
    expanded: false,
    oldChecked: null,
    indeterminate: null,
    oldIndeterminate: null,
    expandIcon: props.expandIcon,
    childNodeRendered: false,
    showMenu: false,
    menuposition: {
      position: "absolute",
      top: 0,
      left: 0
    },
    shrinkIcon: props.shrinkIcon,
    expandIconColor: props.expandIconColor,
    shrinkIconColor: props.shrinkIconColor,
    emitter: emitter(),
    parentEmitter: $parentEmitter,
    isSaaSTheme: (props.theme || vm.theme) === "saas",
    props: treeRoot.props,
    renderedChildNodes: computed(() => {
      return props.node.childNodes.filter(childNode => TreeAdapter ? TreeAdapter.shouldRender(childNode) : true);
    }),
    computedExpandIcon: computed(() => api2.computedExpandIcon(treeRoot, state)),
    computedIndent: computed(() => api2.computedIndent(props, state))
  });
  return state;
};
const initApi = ({
  api: api2,
  state,
  dispatch,
  broadcast,
  vm,
  props,
  treeRoot,
  nextTick,
  emit,
  designConfig
}) => {
  Object.assign(api2, {
    state,
    dispatch,
    broadcast,
    watchExpanded: debounce(20, watchExpanded({
      state
    })),
    created: created({
      props,
      state
    }),
    getNodeKey: getNodeKey(state),
    closeMenu: closeMenu(state),
    handleSelectChange: handleSelectChange({
      props,
      state
    }),
    handleContextMenu: handleContextMenu({
      vm,
      treeRoot,
      props,
      state,
      nextTick
    }),
    handleExpandClick: handleExpandClick({
      emit,
      vm,
      props,
      state
    }),
    handleCheckChange: handleCheckChange({
      nextTick,
      props,
      state
    }),
    handleDragStart: handleDragStart({
      state,
      vm
    }),
    handleDragOver: handleDragOver({
      state,
      vm
    }),
    handleDrop: handleDrop(),
    handleDragEnd: handleDragEnd({
      state,
      vm
    }),
    handleContentClick: handleContentClick({
      nextTick,
      props,
      state,
      emit
    }),
    onSiblingToggleExpand: onSiblingToggleExpand({
      state,
      props
    }),
    watchExpandedChange: watchExpandedChange({
      state,
      props
    }),
    handleClick: handleClick({
      api: api2,
      vm,
      props,
      state
    }),
    watchIndeterminate: watchIndeterminate({
      api: api2,
      props
    }),
    watchChecked: watchChecked({
      api: api2,
      props
    }),
    openEdit: openEdit({
      state,
      vm
    }),
    addNode: debounce(500, true, addNode({
      state,
      props,
      api: api2
    })),
    saveEdit: saveEdit({
      state
    }),
    deleteNode: deleteNode({
      state
    }),
    handleChildNodeExpand: handleChildNodeExpand(state),
    handleExpandIconClick: handleExpandIconClick({
      api: api2,
      state
    }),
    computedExpandIcon: computedExpandIcon({
      designConfig
    }),
    computedIndent: computedIndent()
  });
};
const initWatcher = ({
  watch,
  state,
  api: api2,
  props
}) => {
  watch(() => state.expanded, api2.watchExpandedChange);
  watch(() => props.node.indeterminate, api2.watchIndeterminate, {
    deep: true
  });
  watch(() => props.node.checked, api2.watchChecked, {
    deep: true
  });
  watch(() => props.node.expanded, api2.watchExpanded, {
    deep: true
  });
};
const renderless = (props, {
  reactive,
  watch,
  inject,
  provide,
  computed
}, {
  vm,
  nextTick,
  emit,
  broadcast,
  dispatch,
  emitter,
  designConfig
}, {
  isVue2
}) => {
  const api2 = {};
  const treeRoot = inject("TreeRoot");
  const $parentEmitter = inject("parentEmitter");
  const TreeAdapter = inject("TreeAdapter", null);
  const state = initState({
    reactive,
    treeRoot,
    props,
    emitter,
    $parentEmitter,
    vm,
    api: api2,
    TreeAdapter,
    computed
  });
  if (state.tree.accordion) {
    state.parentEmitter.on("sibling-node-toggle-expand", event => api2.onSiblingToggleExpand(event));
  }
  provide("parentEmitter", state.emitter);
  initApi({
    api: api2,
    state,
    dispatch,
    broadcast,
    vm,
    props,
    treeRoot,
    nextTick,
    emit,
    designConfig
  });
  initWatcher({
    watch,
    state,
    api: api2,
    props
  });
  api2.created(childrenKey => {
    watch(() => props.node.data[childrenKey], () => {
      props.node.updateChildren();
    });
    if (!isVue2) {
      props.node.updateMethod = (node, field) => {
        field === "expanded" && api2.watchExpanded(node[field]);
      };
    }
  });
  state.parentEmitter.on("closeMenu", () => {
    api2.closeMenu();
    state.emitter.emit("closeMenu");
  });
  return api2;
};
export { api, renderless };