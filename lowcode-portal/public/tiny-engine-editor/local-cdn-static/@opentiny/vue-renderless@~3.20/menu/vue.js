import "../chunk-G2ADBYYC.js";
import { setIsCurrent, filterNodes, getExpandedKeysPath, getActivedKeysPath, setNodeHidden, setAllNodeVisible, filterInput, computeData } from './index.js';
import debounce from './../common/deps/debounce.js';
const api = ["state", "setIsCurrent", "filterNodes", "filterInput"];
const initState = ({
  reactive,
  computed,
  props,
  api: api2
}) => {
  const state = reactive({
    isEmpty: computed(() => props.data.length !== 0 && state.filterValue && state.filterData.length === 0),
    activedNodeId: null,
    filterValue: "",
    currentPaths: [],
    filterData: [],
    data: computed(() => api2.computeData())
  });
  return state;
};
const renderless = (props, {
  reactive,
  watch,
  onMounted,
  computed,
  onUnmounted
}, {
  vm,
  emit,
  nextTick
}) => {
  const api2 = {};
  const state = initState({
    reactive,
    computed,
    props,
    api: api2
  });
  Object.assign(api2, {
    state,
    setIsCurrent: setIsCurrent({
      props,
      vm,
      state,
      emit,
      nextTick
    }),
    filterNodes: debounce(100, filterNodes({
      vm,
      state,
      api: api2,
      nextTick
    })),
    setNodeHidden: setNodeHidden({
      props,
      vm,
      state
    }),
    getActivedKeysPath: getActivedKeysPath({
      state
    }),
    getExpandedKeysPath: getExpandedKeysPath({
      state
    }),
    setAllNodeVisible: setAllNodeVisible({
      vm,
      state
    }),
    filterInput: filterInput({
      state
    }),
    computeData: computeData({
      props,
      vm
    })
  });
  watch(() => props.expandAll, () => {
    props.expandAll && api2.setAllNodeVisible();
  }, {
    immediate: true
  });
  watch(() => state.filterValue, () => {
    api2.filterNodes(state.filterValue);
  });
  watch(() => props.expandedKeys, () => {
    if (props.expandedKeys && props.expandedKeys.length) {
      api2.getExpandedKeysPath(props.expandedKeys);
    }
  }, {
    deep: true,
    immediate: true
  });
  watch(() => props.activedKeys, val => {
    if (val || val === 0) {
      state.activedKeys = props.activedKeys;
      api2.getActivedKeysPath(props.activedKeys);
      api2.setIsCurrent(props.data, {
        id: props.activedKeys
      });
    }
  }, {
    immediate: true
  });
  watch(() => props.data, val => {
    nextTick(() => {
      api2.setIsCurrent(val, {
        id: props.activedKeys
      });
    });
  });
  onMounted(() => {
    vm.$on("node-clicked", param => {
      api2.setNodeHidden(param.id);
      vm.$emit("node-click", param);
    });
    vm.$on("node-changed", param => {
      vm.$emit("current-change", param);
      api2.setIsCurrent(state.data, param);
    });
  });
  onUnmounted(() => {
    vm.$off("node-clicked");
    vm.$off("node-changed");
  });
  return api2;
};
export { api, renderless };