import "../chunk-G2ADBYYC.js";
import { resetView, isValidValue, handleConfirm, rightPrevYear, leftNextYear, rightNextYear, leftPrevYear, handleClear, watchValue, watchDefaultValue, handleChangeRange, handleRangePick, handleShortcutClick, doPick } from './index.js';
import { nextYear } from './../common/deps/date-util.js';
const api = ["state", "rightNextYear", "rightPrevYear", "handleRangePick", "handleShortcutClick", "handleChangeRange", "leftPrevYear", "leftNextYear", "isValidValue"];
const initState = ({
  reactive,
  computed,
  api: api2,
  t
}) => {
  const state = reactive({
    popperClass: "",
    value: [],
    defaultValue: null,
    defaultTime: null,
    minDate: "",
    maxDate: "",
    leftDate: /* @__PURE__ */new Date(),
    rightDate: nextYear( /* @__PURE__ */new Date()),
    rangeState: {
      endDate: null,
      selecting: false,
      row: null,
      column: null
    },
    shortcuts: "",
    visible: "",
    disabledDate: "",
    format: "",
    arrowControl: false,
    unlinkPanels: false,
    btnDisabled: computed(() => !(state.minDate && state.maxDate && !state.selecting && api2.isValidValue([state.minDate, state.maxDate]))),
    leftLabel: computed(() => state.leftDate.getFullYear() + " " + t("ui.datepicker.year")),
    rightLabel: computed(() => state.rightDate.getFullYear() + " " + t("ui.datepicker.year")),
    leftYear: computed(() => state.leftDate.getFullYear()),
    rightYear: computed(() => state.rightDate.getFullYear() === state.leftDate.getFullYear() ? state.leftDate.getFullYear() + 1 : state.rightDate.getFullYear()),
    enableYearArrow: computed(() => state.unlinkPanels && state.rightYear > state.leftYear + 1)
  });
  return state;
};
const renderless = (props, {
  computed,
  reactive,
  watch
}, {
  t,
  emit: $emit
}) => {
  const api2 = {};
  const emit = props.emitter ? props.emitter.emit : $emit;
  const state = initState({
    reactive,
    computed,
    api: api2,
    t
  });
  Object.assign(api2, {
    state,
    resetView: resetView(state),
    handleChangeRange: handleChangeRange(state),
    isValidValue: isValidValue(state),
    leftNextYear: leftNextYear(state),
    leftPrevYear: leftPrevYear(state),
    doPick: doPick(emit),
    rightNextYear: rightNextYear(state),
    rightPrevYear: rightPrevYear(state),
    watchValue: watchValue({
      state
    }),
    handleClear: handleClear({
      emit,
      state
    }),
    watchDefaultValue: watchDefaultValue({
      state
    }),
    handleConfirm: handleConfirm({
      api: api2,
      emit,
      state
    }),
    handleRangePick: handleRangePick({
      api: api2,
      state,
      t
    }),
    handleShortcutClick: handleShortcutClick(api2)
  });
  watch(() => state.value, api2.watchValue);
  watch(() => state.defaultValue, api2.watchDefaultValue);
  return api2;
};
export { api, renderless };