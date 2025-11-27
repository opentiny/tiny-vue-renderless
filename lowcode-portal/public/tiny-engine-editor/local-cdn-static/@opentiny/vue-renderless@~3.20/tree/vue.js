import "../chunk-G2ADBYYC.js";
import debounce from './../common/deps/debounce.js';
import { computedShowEmptyText, closeMenu, setChildren, getChildren, computedTreeItemArray, computedIsEmpty, watchDefaultCheckedKeys, watchDefaultExpandedKeys, watchData, watchCheckboxItems, watchCheckStrictly, created, mounted, updated, filter, getNode, remove, append, getNodeKey, getNodePath, getHalfCheckedNodes, getHalfCheckedKeys, getCheckedNodes, getCheckedKeys, getCurrentNode, getCurrentKey, setCheckedNodes, setCheckedKeys, setChecked, setCurrentNode, setCurrentKey, insertBefore, insertAfter, handleNodeExpand, updateKeyChildren, initTabIndex, handleKeydown, setCurrentRadio, expandAllNodes, dragStart, dragOver, dragEnd, clearCurrentStore, initIsCurrent, beforeUnmount, wrapMounted, switchToggle, initTreeStore, getSameDataIndex, loopGetTreeData, cancelDelete, deleteAction, deleteConfirm, openEdit, saveNode, addNode, editNode, closeEdit, saveEdit, setAddDisabledKeys, setEditDisabledKeys, setDeleteDisabledKeys, initPlainNodeStore, handleCheckPlainNode, handleClickPlainNode, setCheckedByNodeKey } from './index.js';
import { random } from './../common/string.js';
const api = ["state", "closeMenu", "filter", "getNodeKey", "getNodePath", "getCheckedNodes", "getCheckedKeys", "getCurrentNode", "getCurrentKey", "setCheckedNodes", "setCheckedKeys", "setChecked", "getHalfCheckedNodes", "getHalfCheckedKeys", "setCurrentNode", "setCurrentKey", "getNode", "remove", "append", "insertBefore", "insertAfter", "handleNodeExpand", "updateKeyChildren", "initTabIndex", "handleKeydown", "setCurrentRadio", "expandAllNodes", "clearCurrentStore", "switchToggle", "initTreeStore", "getSameDataIndex", "loopGetTreeData", "cancelDelete", "deleteAction", "deleteConfirm", "openEdit", "saveNode", "addNode", "editNode", "closeEdit", "saveEdit", "setAddDisabledKeys", "setEditDisabledKeys", "setDeleteDisabledKeys", "handleCheckPlainNode", "handleClickPlainNode", "setCheckedByNodeKey"];
const initState = ({
  reactive,
  emitter,
  props,
  computed,
  api: api2,
  TreeAdapter
}) => {
  const state = reactive({
    loaded: !props.lazy,
    checkEasily: false,
    root: null,
    store: null,
    treeItems: null,
    currentNode: null,
    checkboxItems: [],
    isEmpty: computed(() => api2.computedIsEmpty(props, state)),
    emitter: emitter(),
    expandIcon: props.expandIcon,
    shrinkIcon: props.shrinkIcon,
    expandIconColor: props.expandIconColor,
    shrinkIconColor: props.shrinkIconColor,
    dragState: {
      showDropIndicator: false,
      draggingNode: null,
      dropNode: null,
      allowDrop: true
    },
    currentRadio: {
      value: null
    },
    children: computed({
      get: () => api2.getChildren(props, state),
      set: data => api2.setChildren(data)
    }),
    treeItemArray: computed(() => api2.computedTreeItemArray(props, state)),
    showEmptyText: computed(() => api2.computedShowEmptyText(props, state)),
    currentStore: {
      flag: false,
      node: null
    },
    action: {
      deleteDisabled: [],
      editDisabled: [],
      addDisabled: [],
      show: false,
      node: null,
      data: [],
      label: "",
      type: "",
      isLeaf: false,
      isSaveChildNode: false,
      referenceElm: null,
      popoverVisible: false
    },
    treeEdit: {
      addData: [],
      deleteData: [],
      editData: []
    },
    newNodeId: Math.floor(random() * 1e4),
    plainNodeStore: {},
    allNodeKeys: [],
    renderedChildNodes: computed(() => {
      return state.root.childNodes.filter(childNode => TreeAdapter ? TreeAdapter.shouldRender(childNode) : true);
    }),
    // tiny 新增
    filterText: ""
    // 记录当前过滤的内容
  });
  return state;
};
const initApi = ({
  state,
  dispatch,
  broadcast,
  props,
  vm,
  constants,
  t,
  emit,
  api: api2,
  TreeAdapter
}) => ({
  state,
  dispatch,
  broadcast,
  setChildren: setChildren(props),
  getChildren: getChildren(),
  computedTreeItemArray: computedTreeItemArray(),
  computedIsEmpty: computedIsEmpty(),
  watchDefaultCheckedKeys: watchDefaultCheckedKeys(state),
  watchData: watchData({
    state
  }),
  watchCheckboxItems: watchCheckboxItems(),
  watchCheckStrictly: watchCheckStrictly(state),
  updated: updated({
    vm,
    state
  }),
  filter: filter({
    props,
    state,
    api: api2
  }),
  getNodeKey: getNodeKey(props),
  getNodePath: getNodePath({
    props,
    state
  }),
  getCheckedNodes: getCheckedNodes(state),
  getCheckedKeys: getCheckedKeys(state),
  getCurrentNode: getCurrentNode(state),
  setCheckedNodes: setCheckedNodes({
    props,
    state
  }),
  setCheckedKeys: setCheckedKeys({
    props,
    state,
    api: api2
  }),
  setChecked: setChecked(state),
  getHalfCheckedNodes: getHalfCheckedNodes(state),
  getHalfCheckedKeys: getHalfCheckedKeys(state),
  setCurrentNode: setCurrentNode({
    props,
    state
  }),
  setCurrentKey: setCurrentKey({
    props,
    state
  }),
  getNode: getNode(state),
  remove: remove(state),
  append: append(state),
  insertBefore: insertBefore(state),
  insertAfter: insertAfter(state),
  updateKeyChildren: updateKeyChildren({
    props,
    state
  }),
  initTabIndex: initTabIndex({
    vm,
    state
  }),
  handleKeydown: handleKeydown({
    vm,
    state,
    TreeAdapter
  }),
  computedShowEmptyText: computedShowEmptyText({
    constants,
    t
  }),
  setCurrentRadio: setCurrentRadio({
    props,
    state
  }),
  expandAllNodes: expandAllNodes({
    state
  }),
  dragStart: dragStart({
    props,
    state,
    emit
  }),
  dragOver: dragOver({
    props,
    state,
    emit,
    vm
  }),
  dragEnd: dragEnd({
    state,
    emit
  }),
  clearCurrentStore: clearCurrentStore(state),
  initIsCurrent: debounce(20, initIsCurrent({
    props,
    state
  })),
  setCheckedByNodeKey: setCheckedByNodeKey({
    props,
    state
  })
});
const initWatcher = ({
  watch,
  props,
  api: api2,
  state,
  isVue2
}) => {
  watch(() => props.defaultCheckedKeys, api2.watchDefaultCheckedKeys);
  watch(() => props.defaultExpandedKeys, api2.watchDefaultExpandedKeys);
  watch(() => props.defaultExpandedKeysHighlight, api2.initIsCurrent);
  watch(() => props.data, api2.watchData, {
    deep: !isVue2
  });
  watch(() => props.checkboxItems, api2.watchCheckboxItems);
  watch(() => props.checkStrictly, api2.watchCheckStrictly);
  watch(() => props.defaultCheckedKeys, api2.setCurrentRadio, {
    immediate: true
  });
  watch(() => props.deleteDisabledKeys, value => state.action.deleteDisabled = value || [], {
    immediate: true
  });
  watch(() => props.editDisabledKeys, value => state.action.editDisabled = value || [], {
    immediate: true
  });
  watch(() => props.addDisabledKeys, value => state.action.addDisabled = value || [], {
    immediate: true
  });
};
const renderless = (props, {
  computed,
  onMounted,
  onUpdated,
  reactive,
  watch,
  provide,
  onBeforeUnmount,
  inject
}, {
  vm,
  t,
  emit,
  constants,
  broadcast,
  dispatch,
  service,
  emitter,
  nextTick
}, {
  isVue2
}) => {
  const api2 = {};
  const TreeAdapter = inject("TreeAdapter", null);
  const state = initState({
    reactive,
    emitter,
    props,
    computed,
    api: api2,
    TreeAdapter
  });
  provide("parentEmitter", state.emitter);
  Object.assign(api2, initApi({
    state,
    dispatch,
    broadcast,
    props,
    vm,
    constants,
    t,
    emit,
    api: api2,
    TreeAdapter
  }), {
    closeMenu: closeMenu(state),
    mounted: mounted({
      api: api2,
      vm
    }),
    created: created({
      api: api2,
      props,
      state
    }),
    getCurrentKey: getCurrentKey({
      api: api2,
      props
    }),
    handleNodeExpand: handleNodeExpand(emit),
    beforeUnmount: beforeUnmount({
      api: api2,
      vm,
      state
    }),
    wrapMounted: wrapMounted({
      api: api2,
      props,
      service
    }),
    initTreeStore: initTreeStore({
      api: api2,
      props,
      state,
      emit
    }),
    deleteAction: deleteAction({
      state,
      api: api2,
      emit
    }),
    deleteConfirm: deleteConfirm({
      state,
      props,
      api: api2
    }),
    getSameDataIndex,
    loopGetTreeData,
    cancelDelete: cancelDelete({
      state
    }),
    openEdit: openEdit({
      props,
      state,
      api: api2,
      emit
    }),
    saveNode: saveNode({
      state,
      emit,
      api: api2
    }),
    addNode: addNode({
      api: api2,
      props,
      state
    }),
    editNode: editNode({
      state
    }),
    closeEdit: closeEdit({
      props,
      state,
      api: api2,
      emit
    }),
    saveEdit: saveEdit({
      props,
      state,
      emit
    }),
    setAddDisabledKeys: setAddDisabledKeys({
      state
    }),
    setEditDisabledKeys: setEditDisabledKeys({
      state
    }),
    setDeleteDisabledKeys: setDeleteDisabledKeys({
      state
    }),
    watchDefaultExpandedKeys: watchDefaultExpandedKeys({
      state,
      api: api2,
      nextTick
    }),
    switchToggle: switchToggle({
      state
    }),
    initPlainNodeStore: initPlainNodeStore({
      props,
      state
    }),
    handleCheckPlainNode: handleCheckPlainNode({
      props,
      emit
    }),
    handleClickPlainNode: handleClickPlainNode(emit)
  });
  api2.created();
  initWatcher({
    watch,
    props,
    api: api2,
    state,
    isVue2
  });
  onMounted(api2.wrapMounted);
  onUpdated(api2.updated);
  onBeforeUnmount(api2.beforeUnmount);
  return api2;
};
export { api, renderless };