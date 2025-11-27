import "../chunk-G2ADBYYC.js";
import { handleExpand, handleMouseMove, clearHoverZone } from './index.js';
import { CASCADER } from './../common/index.js';
import { random } from './../common/string.js';
const api = ["state", "handleMouseMove", "handleExpand"];
const renderless = (props, {
  computed,
  reactive
}, {
  vm,
  parent
}) => {
  const api2 = {};
  const state = reactive({
    activeNode: null,
    hoverTimer: null,
    id: Math.floor(random() * 1e4),
    isEmpty: computed(() => !props.nodes.length),
    menuId: computed(() => `${CASCADER.MenuConnector}${state.id}-${props.index}`)
  });
  Object.assign(api2, {
    state,
    clearHoverZone: clearHoverZone({
      vm
    }),
    handleExpand: handleExpand(state),
    handleMouseMove: handleMouseMove({
      api: api2,
      parent,
      vm,
      state,
      svg: CASCADER.SvgStr
    })
  });
  return api2;
};
export { api, renderless };