import "../chunk-G2ADBYYC.js";
import { changeSelectionRange, adjustSpinners, isValidValue, handleKeydown, watchValue, watchVisible, handleCancel, handleChange, setSelectionRange, displayValue, handleConfirm } from './index.js';
import { compuAmPmMode } from './../time-range/index.js';
import { isDate } from './../common/deps/date-util.js';
const api = ["state", "handleChange", "setSelectionRange", "handleCancel", "handleConfirm", "adjustSpinners"];
const initState = ({
  reactive,
  props,
  computed,
  api: api2
}) => {
  const state = reactive({
    popperClass: "",
    format: "HH:mm:ss",
    value: "",
    defaultValue: null,
    date: props.value || /* @__PURE__ */new Date(),
    oldValue: /* @__PURE__ */new Date(),
    selectableRange: [],
    selectionRange: [0, 2],
    disabled: false,
    arrowControl: false,
    visible: false,
    showTimePickerButton: false,
    needInitAdjust: true,
    displayValue: computed(() => api2.displayValue()),
    showSeconds: computed(() => (state.format || "").includes("ss")),
    useArrow: computed(() => state.arrowControl || props.timeArrowControl || false),
    amPmMode: computed(() => api2.compuAmPmMode())
  });
  return state;
};
const renderless = (props, {
  computed,
  onMounted,
  reactive,
  watch,
  nextTick
}, {
  t,
  emit: $emit,
  vm,
  designConfig
}) => {
  var _a;
  const api2 = {};
  const emit = props.emitter ? props.emitter.emit : $emit;
  const state = initState({
    reactive,
    props,
    computed,
    api: api2
  });
  state.showTimePickerButton = (_a = designConfig == null ? void 0 : designConfig.showTimePickerButton) != null ? _a : true;
  Object.assign(api2, {
    t,
    state,
    compuAmPmMode: compuAmPmMode(state),
    adjustSpinners: adjustSpinners(vm),
    handleCancel: handleCancel({
      state,
      emit
    }),
    setSelectionRange: setSelectionRange({
      state,
      emit
    }),
    watchVisible: watchVisible({
      nextTick,
      vm,
      state,
      api: api2
    }),
    isValidValue: isValidValue({
      state
    }),
    changeSelectionRange: changeSelectionRange({
      vm,
      state
    }),
    handleConfirm: handleConfirm({
      state,
      emit
    }),
    handleKeydown: handleKeydown({
      api: api2,
      vm
    }),
    handleChange: handleChange({
      api: api2,
      emit,
      state
    }),
    displayValue: displayValue({
      state,
      t
    }),
    watchValue: watchValue({
      api: api2,
      nextTick,
      state
    })
  });
  watch(() => state.value, api2.watchValue);
  watch(() => props.show, value => {
    state.visible = value;
  }, {
    immediate: true
  });
  watch(() => state.selectableRange, value => vm.$refs.spinner.state.selectableRange = value);
  watch(() => state.defaultValue, value => !isDate(state.value) && (state.date = value ? new Date(value) : /* @__PURE__ */new Date()));
  onMounted(() => {
    api2.handleConfirm(true, true);
  });
  watch(() => state.visible, api2.watchVisible);
  return api2;
};
export { api, renderless };