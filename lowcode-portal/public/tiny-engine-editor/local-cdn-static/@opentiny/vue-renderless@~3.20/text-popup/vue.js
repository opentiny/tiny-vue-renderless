import "../chunk-G2ADBYYC.js";
import { computedWidth, watchValue, mounted, onFocus, onBlur, onInput, separteText, jointText } from './index.js';
const api = ["state", "onFocus", "onBlur", "onInput"];
const renderless = (props, {
  computed,
  onMounted,
  reactive,
  watch,
  inject
}, {
  emit,
  nextTick,
  refs
}) => {
  const api2 = {};
  const state = reactive({
    showAutoWidth: inject("showAutoWidth", null),
    type: "input",
    textAreaValue: "",
    text: null,
    popup: null,
    width: computed(() => api2.computedWidth())
  });
  Object.assign(api2, {
    state,
    jointText,
    separteText,
    computedWidth: computedWidth({
      props
    }),
    mounted: mounted({
      props,
      refs,
      state
    }),
    onInput: onInput({
      api: api2,
      emit,
      props
    }),
    watchValue: watchValue({
      api: api2,
      props,
      state
    }),
    onBlur: onBlur({
      api: api2,
      emit,
      props,
      state
    }),
    onFocus: onFocus({
      api: api2,
      emit,
      props,
      nextTick,
      state
    })
  });
  watch(() => props.modelValue, api2.watchValue, {
    immediate: true
  });
  onMounted(api2.mounted);
  return api2;
};
export { api, renderless };