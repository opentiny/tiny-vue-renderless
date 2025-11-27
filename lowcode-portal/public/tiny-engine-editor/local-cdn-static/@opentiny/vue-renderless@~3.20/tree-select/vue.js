import "../chunk-G2ADBYYC.js";
import { check, filter, getCheckedData, getPluginOption, getTreeData, mounted, nodeClick } from './index.js';
const api = ["state", "check", "filter", "nodeClick"];
const renderless = (props, {
  reactive,
  computed,
  watch,
  onMounted
}, {
  vm,
  emit
}) => {
  const api2 = {};
  const state = reactive({
    childrenName: computed(() => props.treeOp.props && props.treeOp.props.children || "children"),
    currentKey: props.modelValue,
    defaultCheckedKeys: [],
    remoteData: [],
    treeData: props.treeOp.data,
    value: computed(() => props.modelValue)
  });
  Object.assign(api2, {
    state,
    check: check({
      props,
      vm,
      emit
    }),
    filter: filter({
      vm
    }),
    getCheckedData: getCheckedData({
      props,
      state
    }),
    getPluginOption: getPluginOption({
      api: api2,
      props,
      state
    }),
    getTreeData: getTreeData({
      props,
      state
    }),
    mounted: mounted({
      api: api2,
      state,
      props,
      vm
    }),
    nodeClick: nodeClick({
      props,
      vm,
      emit
    })
  });
  watch(() => props.treeOp.data, data => data && (state.treeData = data), {
    immediate: true,
    deep: true
  });
  onMounted(api2.mounted);
  return api2;
};
export { api, renderless };