import "../chunk-G2ADBYYC.js";
import { handelNodeClick } from './index.js';
const api = ["state", "handelNodeClick"];
const renderless = (props, {
  reactive,
  watch,
  computed
}, {
  dispatch,
  nextTick
}) => {
  const api2 = {};
  const state = reactive({
    renderNodes: false,
    showNodes: false,
    activeNodeId: null,
    allExpandedKeysPath: computed(() => [...props.expandedKeysPath, ...props.activedKeysPath])
  });
  Object.assign(api2, {
    state,
    handelNodeClick: handelNodeClick({
      state,
      dispatch
    })
  });
  watch(() => props.activedKeys, () => {
    if (props.activedKeys && props.nodes.id === props.activedKeys && state.activeNodeId !== props.activedKeys) {
      nextTick(() => {
        state.activeNodeId = props.activedKeys;
        dispatch("Menu", "node-changed", {
          id: props.activedKeys
        });
      });
    }
  }, {
    immediate: true
  });
  watch(() => state.allExpandedKeysPath, () => {
    if (state.allExpandedKeysPath.length) {
      state.showNodes = state.allExpandedKeysPath.includes(props.nodes.id);
    }
  }, {
    deep: true,
    immediate: true
  });
  return api2;
};
export { api, renderless };