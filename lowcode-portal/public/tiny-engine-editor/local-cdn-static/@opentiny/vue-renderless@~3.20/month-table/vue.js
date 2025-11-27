import "../chunk-G2ADBYYC.js";
import { getRows, getMonthTimestamp, markRange, watchDate, handleMouseMove, handleMonthTableClick, cellMatchesDate, getCellStyle, getMonthOfCell } from './index.js';
import { DATEPICKER } from './../common/index.js';
const api = ["state", "handleMonthTableClick", "handleMouseMove", "getCellStyle"];
const renderless = (props, {
  computed,
  reactive,
  watch
}, {
  t,
  vm,
  emit
}) => {
  const api2 = {};
  const {
    MonhtList
  } = DATEPICKER;
  const state = reactive({
    months: MonhtList,
    tableRows: [[], [], []],
    lastRow: null,
    lastColumn: null,
    rows: computed(() => api2.getRows())
  });
  Object.assign(api2, {
    t,
    state,
    getMonthOfCell: getMonthOfCell(props),
    cellMatchesDate: cellMatchesDate(props),
    markRange: markRange({
      api: api2,
      props,
      state
    }),
    watchDate: watchDate({
      api: api2,
      props
    }),
    getMonthTimestamp: getMonthTimestamp(api2),
    handleMouseMove: handleMouseMove({
      api: api2,
      emit,
      props,
      state
    }),
    handleMonthTableClick: handleMonthTableClick({
      api: api2,
      emit,
      props
    }),
    getCellStyle: getCellStyle({
      api: api2,
      props
    }),
    getRows: getRows({
      props,
      state,
      vm
    })
  });
  watch(() => props.rangeState, value => api2.markRange(props.minDate, value.endDate), {
    deep: true
  });
  watch(() => props.minDate, api2.watchDate);
  watch(() => props.maxDate, api2.watchDate);
  return api2;
};
export { api, renderless };