import "../chunk-G2ADBYYC.js";
import { handleKeydown, mounted } from './index.js';
const api = ["state", "handleKeydown"];
const renderless = (props, {
  computed,
  onMounted,
  reactive,
  watch,
  provide
}, {
  parent,
  dispatch
}) => {
  const state = reactive({
    radioGroupSize: computed(() => props.size),
    tag: "div",
    activeStyle: props.fill
  });
  parent.$on("handleChange", value => {
    parent.$emit("change", value);
  });
  const api2 = {
    state,
    dispatch,
    onMounted: mounted(parent),
    handleKeydown: handleKeydown(parent)
  };
  watch(() => props.modelValue, value => {
    api2.dispatch("FormItem", "form.change", [value]);
  });
  onMounted(api2.onMounted);
  provide("radioVertical", props.vertical);
  provide("showTips", props.showTips);
  provide("size", props.size);
  return api2;
};
export { api, renderless };