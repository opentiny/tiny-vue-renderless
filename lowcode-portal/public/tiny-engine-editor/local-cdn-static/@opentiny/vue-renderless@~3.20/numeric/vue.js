import "../chunk-G2ADBYYC.js";
import { watchValue, toPrecision, getPrecision, internalIncrease, internalDecrease, focus, decrease, handleBlur, handleFocus, setCurrentValue, handleInput, handleInputChange, select, mounted, updated, increase, displayValue, getNumPecision, mouseEvent, getUnitPrecision, getDecimal, unmounted, initService, getDisplayOnlyText, filterValue, handleClear, handleChange } from './index.js';
const api = ["state", "decrease", "increase", "handleBlur", "handleFocus", "handleInput", "handleInputChange", "mouseEvent", "focus", "select", "handleClear", "handleChange"];
const initState = ({
  reactive,
  computed,
  props,
  api: api2,
  $service,
  constants,
  parent
}) => {
  const state = reactive({
    currentValue: props.modelValue,
    userInput: props.modelValue,
    lastInput: props.modelValue,
    inputStatus: false,
    decimal: null,
    strictInput: computed(() => props.strictInput),
    inputSize: computed(() => props.size || state.formSize),
    formSize: computed(() => (parent.tinyForm || {}).size),
    formDisabled: computed(() => (parent.tinyForm || {}).disabled),
    inputDisabled: computed(() => props.disabled || state.formDisabled),
    displayValue: computed(() => api2.displayValue()),
    numPrecision: computed(() => api2.getNumPecision()),
    minDisabled: computed(() => !props.circulate && state.currentValue <= props.min || state.formDisabled),
    maxDisabled: computed(() => !props.circulate && state.currentValue >= props.max || state.formDisabled),
    controlsAtRight: computed(() => props.controls && props.controlsPosition === "right"),
    format: computed(() => getUnitPrecision({
      service: $service,
      props
    })),
    filterMenu: constants.FILTER_OPTION,
    filterValue: computed(() => api2.filterValue()),
    handleClear: computed(() => api2.handleClear()),
    handleChange: computed(() => api2.handleClear()),
    isDisplayOnly: computed(() => props.displayOnly || (parent.tinyForm || {}).displayOnly),
    displayOnlyText: computed(() => api2.getDisplayOnlyText()),
    controls: props.controls
  });
  return state;
};
const initApi = ({
  api: api2,
  props,
  state,
  parent,
  vm,
  emit,
  dispatch,
  constants,
  nextTick
}) => {
  Object.assign(api2, {
    state,
    focus: focus(vm),
    select: select(vm),
    getPrecision: getPrecision(),
    toPrecision: toPrecision(state),
    updated: updated({
      constants,
      parent,
      state
    }),
    mounted: mounted({
      constants,
      parent,
      props,
      state
    }),
    unmounted: unmounted({
      parent,
      state
    }),
    getDecimal: getDecimal(props),
    handleFocus: handleFocus({
      emit,
      state,
      props,
      api: api2,
      vm
    }),
    decrease: decrease({
      api: api2,
      props,
      state
    }),
    increase: increase({
      api: api2,
      props,
      state
    }),
    handleInput: handleInput({
      state,
      api: api2,
      emit,
      props
    }),
    getNumPecision: getNumPecision({
      api: api2,
      props
    }),
    displayValue: displayValue({
      props,
      state,
      api: api2
    }),
    internalDecrease: internalDecrease({
      api: api2,
      state
    }),
    internalIncrease: internalIncrease({
      api: api2,
      state
    }),
    handleInputChange: handleInputChange({
      api: api2,
      state,
      props
    }),
    mouseEvent: mouseEvent({
      api: api2,
      props,
      state
    }),
    handleBlur: handleBlur({
      constants,
      dispatch,
      emit,
      props,
      state,
      api: api2
    }),
    watchValue: watchValue({
      api: api2,
      props,
      state
    }),
    setCurrentValue: setCurrentValue({
      api: api2,
      constants,
      dispatch,
      emit,
      props,
      state
    }),
    getDisplayOnlyText: getDisplayOnlyText({
      parent,
      props,
      state
    }),
    filterValue: filterValue({
      state
    }),
    handleClear: handleClear({
      state,
      emit
    }),
    handleChange: handleChange({
      state,
      emit
    })
  });
  api2.getDecimal(0);
};
const initWatch = ({
  watch,
  props,
  api: api2
}) => {
  watch(() => [props.max, props.min], ([curMax, curMin]) => {
    if (curMax < curMin) {
      throw new Error("[Numeric]: The maximum value should not be less than to the minimum value");
    }
  }, {
    immediate: true
  });
  watch(() => props.modelValue, api2.watchValue, {
    immediate: true
  });
};
const renderless = (props, {
  computed,
  onMounted,
  onUpdated,
  onUnmounted,
  reactive,
  watch,
  inject
}, {
  parent,
  emit,
  vm,
  constants,
  dispatch,
  service,
  nextTick
}) => {
  const api2 = {};
  const $service = initService(service);
  const state = initState({
    reactive,
    computed,
    props,
    api: api2,
    constants,
    $service,
    parent
  });
  parent.tinyForm = parent.tinyForm || inject("form", null);
  initApi({
    api: api2,
    props,
    state,
    parent,
    vm,
    emit,
    dispatch,
    constants,
    nextTick
  });
  initWatch({
    watch,
    props,
    api: api2
  });
  onMounted(api2.mounted);
  onUpdated(api2.updated);
  onUnmounted(api2.unmounted);
  return api2;
};
export { api, renderless };