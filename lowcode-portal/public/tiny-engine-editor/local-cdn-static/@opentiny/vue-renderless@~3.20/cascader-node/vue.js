import "../chunk-G2ADBYYC.js";
import { comptCheckPath, handleExpand, isInPath, handleCheckChange, handleMultiCheckChange, handleNodeClick } from './index.js';
const api = ["state", "handleMultiCheckChange", "handleCheckChange", "handleExpand", "handleNodeClick"];
const renderless = (props, {
  computed,
  reactive,
  inject
}, {
  dispatch
}) => {
  const parent = inject("panel");
  const api2 = {};
  const state = reactive({
    config: computed(() => parent.state.config),
    isLeaf: computed(() => props.node.isLeaf),
    isDisabled: computed(() => props.node.isDisabled),
    checkedValue: computed(() => parent.state.checkedValue),
    isChecked: computed(() => props.node.isSameNode(state.checkedValue)),
    inActivePath: computed(() => api2.isInPath(parent.state.activePath)),
    inCheckedPath: computed(() => api2.comptCheckPath()),
    value: computed(() => props.node.getValueByOption()),
    nodeLabel: computed(() => {
      return parent.state.renderLabelFn ? parent.state.renderLabelFn({
        node: props.node,
        data: props.node.data
      }) : props.node.label;
    })
  });
  Object.assign(api2, {
    state,
    isInPath: isInPath(props),
    handleExpand: handleExpand({
      api: api2,
      props,
      parent,
      state
    }),
    comptCheckPath: comptCheckPath({
      api: api2,
      parent,
      state
    }),
    handleCheckChange: handleCheckChange({
      api: api2,
      parent,
      dispatch,
      state
    }),
    handleMultiCheckChange: handleMultiCheckChange({
      parent,
      props
    }),
    handleNodeClick: handleNodeClick({
      state,
      api: api2
    })
  });
  return api2;
};
export { api, renderless };