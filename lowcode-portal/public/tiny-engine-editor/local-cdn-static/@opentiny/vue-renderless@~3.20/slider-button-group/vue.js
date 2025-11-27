import { __spreadProps, __spreadValues } from "../chunk-G2ADBYYC.js";
import { getChangePosition, watchVisible, watchSliderButtonChange } from './index.js';
const api = ["state"];
const renderless = (props, {
  reactive,
  provide,
  onMounted,
  onBeforeUnmount,
  watch
}, {
  parent,
  vm
}) => {
  const state = reactive({
    tag: "div",
    isActive: false,
    sliderWidth: 0,
    sliderHeight: 0,
    sliderSpace: props.size === "large" ? 4 : 2,
    sliderInfo: [],
    currentIndex: 0,
    mutationObserver: null,
    intersectionObserver: null
  });
  parent.$on("handleChange", value => {
    api2.getChangePosition(value);
    parent.$emit("change", value);
  });
  parent.$on("eachBlock", (left, width, height, value, buttonVm) => {
    const sliderItem = state.sliderInfo.find(item => item.buttonVm === buttonVm);
    if (props.modelValue === value) {
      state.isActive = true;
    }
    if (sliderItem) {
      state.sliderInfo[state.sliderInfo.indexOf(sliderItem)] = __spreadProps(__spreadValues({}, sliderItem), {
        left,
        width,
        value,
        height
      });
    } else {
      state.sliderInfo.push({
        buttonVm,
        left,
        width,
        value,
        height
      });
    }
  });
  parent.$on("delBlock", value => {
    let sliderItem = state.sliderInfo.find(item => item.value === value);
    if (sliderItem) {
      state.sliderInfo.splice(state.sliderInfo.indexOf(sliderItem), 1);
    }
  });
  const api2 = {};
  Object.assign(api2, {
    state,
    getChangePosition: getChangePosition({
      state
    }),
    watchVisible: watchVisible({
      vm,
      api: api2,
      props,
      state
    }),
    watchSliderButtonChange: watchSliderButtonChange({
      vm,
      state,
      api: api2,
      props
    })
  });
  provide("sliderType", props.type);
  provide("sliderSize", props.size);
  provide("disabled", props.disabled);
  onMounted(() => {
    api2.getChangePosition(props.modelValue);
    api2.watchVisible();
    api2.watchSliderButtonChange();
  });
  onBeforeUnmount(() => {
    var _a, _b;
    (_a = state.mutationObserver) == null ? void 0 : _a.disconnect();
    (_b = state.intersectionObserver) == null ? void 0 : _b.disconnect();
  });
  watch(() => props.modelValue, value => {
    api2.getChangePosition(value);
  });
  return api2;
};
export { api, renderless };