import "../chunk-G2ADBYYC.js";
import { getWidth, getMinHeight, getHorizontalWidth, getHorizontalLeft, handleClick, mouseEnter } from './index.js';
const api = ["state", "handleClick", "mouseEnter"];
const renderless = (props, {
  reactive,
  provide,
  computed
}, {
  emit
}) => {
  const state = reactive({
    groupSize: props.groupSize,
    list: props.list,
    width: computed(() => api2.getWidth()),
    minHeight: computed(() => api2.getMinHeight()),
    horizontalWidth: computed(() => api2.getHorizontalWidth()),
    horizontalLeft: computed(() => api2.getHorizontalLeft())
  });
  const api2 = {
    state,
    getWidth: getWidth(props),
    getMinHeight: getMinHeight(props),
    getHorizontalWidth: getHorizontalWidth(props),
    getHorizontalLeft: getHorizontalLeft(props),
    handleClick: handleClick(emit),
    mouseEnter: mouseEnter(emit)
  };
  provide("groupSize", state.groupSize);
  provide("color", props.color);
  provide("backgroundColor", props.backgroundColor);
  return api2;
};
export { api, renderless };