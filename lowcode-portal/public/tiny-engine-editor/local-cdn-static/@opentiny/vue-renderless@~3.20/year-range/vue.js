import "../chunk-G2ADBYYC.js";
import { handleChangeRange, resetView, rightNextYear, isValidValue, handleConfirm, leftPrevYear, watchValue, handleShortcutClick, watchDefaultValue, handleRangePick, handleClear, doPick } from './index.js';
import { DATEPICKER } from './../common/index.js';
import { nextYear } from './../common/deps/date-util.js';
const api = ["state", "rightNextYear", "handleRangePick", "handleShortcutClick", "handleChangeRange", "leftPrevYear"];
const initState = ({
  reactive,
  computed,
  api: api2,
  t
}) => {
  const state = reactive({
    selectionMode: DATEPICKER.YearRange,
    popperClass: "",
    value: [],
    defaultValue: null,
    defaultTime: null,
    minDate: "",
    maxDate: "",
    leftDate: /* @__PURE__ */new Date(),
    rightDate: nextYear( /* @__PURE__ */new Date()),
    rangeState: {
      startDate: null,
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
    leftStartYear: Math.floor(( /* @__PURE__ */new Date()).getFullYear() / 10) * 10,
    rightStartYear: computed(() => state.leftStartYear + DATEPICKER.PanelYearNum),
    btnDisabled: computed(() => !(state.minDate && state.maxDate && !state.selecting && api2.isValidValue([state.minDate, state.maxDate]))),
    leftLabel: computed(() => `${state.leftStartYear} ${t("ui.datepicker.year")} - ${state.leftStartYear + DATEPICKER.PanelYearNum - 1} ${t("ui.datepicker.year")}`),
    rightLabel: computed(() => `${state.rightStartYear} ${t("ui.datepicker.year")} - ${state.rightStartYear + DATEPICKER.PanelYearNum - 1} ${t("ui.datepicker.year")}`)
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
  const emit = props.emitter ? props.emitter.emit : $emit;
  const api2 = {};
  const state = initState({
    reactive,
    computed,
    api: api2,
    t
  });
  Object.assign(api2, {
    state,
    doPick: doPick(emit),
    resetView: resetView(state),
    watchValue: watchValue({
      state
    }),
    isValidValue: isValidValue(state),
    leftPrevYear: leftPrevYear(state),
    rightNextYear: rightNextYear(state),
    handleClear: handleClear({
      emit,
      state
    }),
    handleChangeRange: handleChangeRange(state),
    handleShortcutClick: handleShortcutClick(api2),
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
    })
  });
  watch(() => state.value, api2.watchValue);
  watch(() => state.defaultValue, api2.watchDefaultValue);
  return api2;
};
export { api, renderless };