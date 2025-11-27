import "../chunk-G2ADBYYC.js";
import { handleClick, moreNodeClick, handleChange, getItemClass } from './index.js';
const api = ["state", "handleClick", "moreNodeClick", "handleChange", "getItemClass"];
const renderless = (props, {
  computed,
  reactive,
  watch,
  inject
}, {
  emit,
  parent
}) => {
  var _a, _b;
  parent.tinyForm = parent.tinyForm || inject("form", null);
  const state = reactive({
    value: props.modelValue,
    buttonData: ((_a = props.data) == null ? void 0 : _a.slice(0, props.showMore)) || [],
    moreData: ((_b = props.data) == null ? void 0 : _b.slice(props.showMore, props.data.length)) || [],
    formDisabled: computed(() => (parent.tinyForm || {}).disabled),
    disabled: computed(() => props.disabled || state.formDisabled)
  });
  watch(() => props.modelValue, value => {
    if (!state.disabled && state.value !== value) {
      state.value = value;
    }
  }, {
    immediate: true
  });
  watch(() => state.value, () => api2.handleChange());
  const api2 = {
    state,
    handleClick: handleClick({
      emit,
      props,
      state
    }),
    moreNodeClick: moreNodeClick({
      emit,
      props,
      state
    }),
    handleChange: handleChange({
      emit,
      state
    }),
    getItemClass: getItemClass({
      props,
      state
    })
  };
  return api2;
};
export { api, renderless };