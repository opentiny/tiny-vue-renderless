import "../chunk-G2ADBYYC.js";
import { computedClassName, computedStyle } from './index.js';
const api = ["state"];
const renderless = (props, {
  computed,
  reactive
}) => {
  const api2 = {
    computedStyle,
    computedClassName
  };
  const state = reactive({
    style: computed(() => api2.computedStyle(props.gutter)),
    className: computed(() => api2.computedClassName({
      flex: props.flex,
      justify: props.justify,
      align: props.align
    }))
  });
  api2.state = state;
  return api2;
};
export { api, renderless };