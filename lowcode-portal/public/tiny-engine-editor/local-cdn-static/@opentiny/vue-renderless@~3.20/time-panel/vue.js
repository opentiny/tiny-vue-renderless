import "../chunk-G2ADBYYC.js";
import { handleKeydown, isValidValue, scrollDown, handleMenuEnter, scrollToOption, handleClear, handleClick, parseTime, formatTime, nextTime, compareTime, watchValue, computItems, emitPick, emitDestroy } from './index.js';
import { DATEPICKER } from './../common/index.js';
const api = ["state", "handleMenuEnter", "handleClick", "handleClear", "emitDestroy"];
const initState = ({
  reactive,
  computed,
  api: api2
}) => {
  const {
    Start,
    End,
    Step
  } = DATEPICKER;
  const state = reactive({
    popperClass: "",
    start: Start,
    end: End,
    step: Step,
    realValue: "",
    defaultValue: "",
    defaultTime: "",
    visible: false,
    minTime: "",
    maxTime: "",
    width: 0,
    lastEmitValue: "",
    items: computed(() => api2.computItems()),
    default: computed(() => state.defaultValue || state.defaultTime || ""),
    value: computed({
      get: () => state.realValue || state.default,
      set: value => {
        const valid = state.items.some(item => item.value === value);
        state.realValue = state.lastEmitValue = valid ? value : "";
      }
    })
  });
  return state;
};
const renderless = (props, {
  computed,
  reactive,
  watch,
  nextTick
}, {
  vm,
  emit: $emit
}) => {
  const api2 = {};
  const emit = props.emitter ? props.emitter.emit : $emit;
  const state = initState({
    reactive,
    computed,
    api: api2
  });
  Object.assign(api2, {
    state,
    parseTime: parseTime(),
    formatTime: formatTime(),
    isValidValue: isValidValue(state),
    scrollToOption: scrollToOption({
      vm
    }),
    emitPick: emitPick({
      emit,
      state
    }),
    emitDestroy: emitDestroy(emit),
    nextTime: nextTime(api2),
    compareTime: compareTime(api2),
    handleClick: handleClick(api2),
    scrollDown: scrollDown({
      api: api2,
      state
    }),
    handleClear: handleClear({
      api: api2,
      state
    }),
    watchValue: watchValue({
      api: api2,
      nextTick
    }),
    handleKeydown: handleKeydown({
      api: api2
    }),
    computItems: computItems({
      api: api2,
      state
    }),
    handleMenuEnter: handleMenuEnter({
      api: api2,
      nextTick,
      state
    })
  });
  watch(() => state.value, api2.watchValue);
  watch(() => state.visible, () => setTimeout(() => state.fnUpdatePopper && state.fnUpdatePopper()));
  return api2;
};
export { api, renderless };