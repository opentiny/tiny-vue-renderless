import "../chunk-G2ADBYYC.js";
import { handleClick, clearTimer } from './index.js';
const api = ["state", "handleClick"];
const renderless = (props, {
  computed,
  onBeforeUnmount,
  reactive,
  watch,
  inject
}, {
  emit,
  parent,
  designConfig
}) => {
  parent.tinyForm = parent.tinyForm || inject("form", null);
  const state = reactive({
    timer: 0,
    disabled: props.disabled,
    plain: computed(() => props.plain || (parent.buttonGroup || {}).plain),
    round: computed(() => {
      var _a, _b, _c;
      return (_c = (_b = props.round) != null ? _b : (_a = designConfig == null ? void 0 : designConfig.props) == null ? void 0 : _a.round) != null ? _c : false;
    }),
    formDisabled: computed(() => (parent.tinyForm || {}).disabled),
    buttonDisabled: computed(() => props.disabled || state.disabled || (parent.buttonGroup || {}).disabled || state.formDisabled)
  });
  watch(() => props.disabled, value => {
    state.disabled = value;
  }, {
    immediate: true
  });
  const api2 = {
    state,
    clearTimer: clearTimer(state),
    handleClick: handleClick({
      emit,
      props,
      state,
      designConfig
    })
  };
  onBeforeUnmount(api2.clearTimer);
  return api2;
};
export { api, renderless };