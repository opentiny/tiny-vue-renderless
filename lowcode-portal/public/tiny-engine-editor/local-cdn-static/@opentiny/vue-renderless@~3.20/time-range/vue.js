import "../chunk-G2ADBYYC.js";
import { handleKeydown, isValidValue, changeSelectionRange, handleConfirm, setMaxSelectionRange, setMinSelectionRange, handleChange, handleMaxChange, handleMinChange, handleCancel, handleClear, watchVisible, watchValue, minTimeOfDay, maxTimeOfDay, advanceTime, compuAmPmMode, adjustSpinners } from './index.js';
import { parseDate } from './../common/deps/date-util.js';
const api = ["state", "handleMinChange", "handleConfirm", "setMinSelectionRange", "handleCancel", "setMaxSelectionRange", "handleMaxChange"];
const initState = ({
  reactive,
  computed,
  vm,
  api: api2
}) => {
  const state = reactive({
    popperClass: "",
    defaultValue: null,
    format: "HH:mm:ss",
    visible: false,
    value: [],
    oldValue: [/* @__PURE__ */new Date(), /* @__PURE__ */new Date()],
    selectionRange: [0, 2],
    arrowControl: false,
    maxDate: /* @__PURE__ */new Date(),
    minDate: /* @__PURE__ */new Date(),
    showTimePickerRangeButton: false,
    showSeconds: computed(() => (state.format || "").includes("ss")),
    offset: computed(() => state.showSeconds ? 11 : 8),
    spinner: computed(() => state.selectionRange[0] < state.offset ? vm.$refs.minSpinner : vm.$refs.maxSpinner),
    btnDisabled: computed(() => state.minDate.getTime() > state.maxDate.getTime()),
    amPmMode: computed(() => api2.compuAmPmMode())
  });
  return state;
};
const renderless = (props, {
  computed,
  reactive,
  watch,
  nextTick
}, {
  t,
  vm,
  emit: $emit,
  designConfig
}) => {
  var _a;
  const api2 = {};
  const emit = props.emitter ? props.emitter.emit : $emit;
  const MIN_TIME = parseDate("00:00:00", "HH:mm:ss", t);
  const MAX_TIME = parseDate("23:59:59", "HH:mm:ss", t);
  const state = initState({
    reactive,
    computed,
    vm,
    api: api2
  });
  state.showTimePickerRangeButton = (_a = designConfig == null ? void 0 : designConfig.showTimePickerRangeButton) != null ? _a : true;
  Object.assign(api2, {
    t,
    state,
    handleClear: handleClear(emit),
    compuAmPmMode: compuAmPmMode(state),
    maxTimeOfDay: maxTimeOfDay({
      MAX_TIME
    }),
    minTimeOfDay: minTimeOfDay({
      MIN_TIME
    }),
    changeSelectionRange: changeSelectionRange({
      vm,
      state
    }),
    setMaxSelectionRange: setMaxSelectionRange({
      emit,
      state
    }),
    setMinSelectionRange: setMinSelectionRange({
      emit,
      state
    }),
    isValidValue: isValidValue({
      vm,
      state
    }),
    handleConfirm: handleConfirm({
      emit,
      vm,
      state
    }),
    handleCancel: handleCancel({
      emit,
      api: api2,
      state
    }),
    watchVisible: watchVisible({
      nextTick,
      api: api2,
      state
    }),
    advanceTime: advanceTime(api2),
    watchValue: watchValue({
      api: api2,
      state
    }),
    handleKeydown: handleKeydown({
      api: api2,
      state
    }),
    handleChange: handleChange({
      api: api2,
      emit,
      vm,
      state
    }),
    handleMinChange: handleMinChange({
      api: api2,
      state
    }),
    handleMaxChange: handleMaxChange({
      api: api2,
      state
    }),
    adjustSpinners: adjustSpinners({
      vm
    })
  });
  watch(() => state.value, api2.watchValue);
  watch(() => state.visible, api2.watchVisible);
  return api2;
};
export { api, renderless };