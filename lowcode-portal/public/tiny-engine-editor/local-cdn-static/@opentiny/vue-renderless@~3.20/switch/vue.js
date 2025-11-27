import "../chunk-G2ADBYYC.js";
import { toggle, computedWarpClasses, computedInnerClasses, computedStyle } from './index.js';
const api = ["toggle", "state"];
const renderless = (props, {
  computed,
  watch,
  reactive,
  inject
}, {
  parent,
  constants,
  mode,
  emit,
  designConfig
}) => {
  const prefixCls = constants.prefixcls(mode);
  parent.tinyForm = parent.tinyForm || inject("form", null);
  const state = reactive({
    currentValue: props.modelValue,
    innerClasses: computed(() => api2.computedInnerClasses()),
    wrapClasses: computed(() => api2.computedWarpClasses()),
    style: computed(() => api2.computedStyle()),
    formDisabled: computed(() => (parent.tinyForm || {}).disabled),
    disabled: computed(() => props.disabled || state.formDisabled || state.isDisplayOnly || props.loading),
    isDisplayOnly: computed(() => props.displayOnly || (parent.tinyForm || {}).displayOnly),
    showText: computed(() => {
      if (props.showText === void 0) {
        return (designConfig == null ? void 0 : designConfig.showText) || false;
      } else {
        return props.showText;
      }
    })
  });
  const api2 = {
    state,
    computedInnerClasses: computedInnerClasses({
      prefixCls
    }),
    computedStyle: computedStyle({
      props,
      state
    }),
    computedWarpClasses: computedWarpClasses({
      prefixCls,
      props,
      state
    }),
    toggle: toggle({
      emit,
      props,
      state
    })
  };
  watch(() => props.modelValue, value => {
    state.currentValue = typeof props.falseValue !== "boolean" || typeof props.trueValue !== "boolean" ? value : Boolean(value);
  }, {
    immediate: true
  });
  return api2;
};
export { api, renderless };