import "../chunk-G2ADBYYC.js";
import { DATEPICKER } from './../common/index.js';
import { handleQuarterTableClick, showYearPicker, handleYearPick, cusPrevYear, cusNextYear, getYearLabel, getCellStyle } from './index.js';
const api = ["state", "handleQuarterTableClick", "showYearPicker", "handleYearPick", "cusPrevYear", "cusNextYear", "getCellStyle"];
const renderless = (props, {
  reactive,
  computed
}, {
  emit,
  t
}) => {
  const api2 = {};
  const state = reactive({
    date: /* @__PURE__ */new Date(),
    visible: false,
    currentView: DATEPICKER.Quarter,
    yearLabel: computed(() => api2.getYearLabel()),
    startYear: Math.floor(( /* @__PURE__ */new Date()).getFullYear() / 10) * 10,
    rows: [{
      text: "Q1"
    }, {
      text: "Q2"
    }, {
      text: "Q3"
    }, {
      text: "Q4"
    }]
  });
  Object.assign(api2, {
    state,
    handleQuarterTableClick: handleQuarterTableClick({
      state,
      emit
    }),
    showYearPicker: showYearPicker({
      state
    }),
    handleYearPick: handleYearPick({
      state
    }),
    cusPrevYear: cusPrevYear({
      state
    }),
    cusNextYear: cusNextYear({
      state
    }),
    getYearLabel: getYearLabel({
      state,
      t
    }),
    getCellStyle: getCellStyle({
      api: api2,
      props,
      state
    })
  });
  return api2;
};
export { api, renderless };