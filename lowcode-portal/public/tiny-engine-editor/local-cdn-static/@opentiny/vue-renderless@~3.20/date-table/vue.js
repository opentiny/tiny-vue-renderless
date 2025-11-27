import "../chunk-G2ADBYYC.js";
import { getOffsetDay, getWeeks, getRows, handleClick, watchMinDate, watchMaxDate, cellMatchesDate, getCellClasses, getCssToken, getDateOfCell, isWeekActive, markRange, handleMouseMove, getCellRangeClasses, getCell } from './index.js';
import { getStartDateOfMonth } from './../common/deps/date-util.js';
const api = ["state", "getCellClasses", "getCssToken", "isWeekActive", "handleMouseMove", "handleClick"];
const initState = ({
  reactive,
  computed,
  api: api2,
  props
}) => {
  const state = reactive({
    tableRows: [[], [], [], [], [], []],
    lastRow: null,
    lastColumn: null,
    constWeeks: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
    rows: computed(() => api2.getRows()),
    weeks: computed(() => api2.getWeeks()),
    month: computed(() => !Array.isArray(props.date) && props.date.getMonth()),
    offsetDay: computed(() => api2.getOffsetDay()),
    year: computed(() => !Array.isArray(props.date) && props.date.getFullYear()),
    startDate: computed(() => getStartDateOfMonth(state.year, state.month, state.offsetDay)),
    date: props.value
  });
  return state;
};
const initApi = ({
  api: api2,
  state,
  props,
  emit,
  t,
  vm
}) => {
  Object.assign(api2, {
    t,
    state,
    getOffsetDay: getOffsetDay(props),
    getWeeks: getWeeks({
      props,
      state
    }),
    markRange: markRange({
      props,
      state
    }),
    cellMatchesDate: cellMatchesDate(state),
    getDateOfCell: getDateOfCell({
      props,
      state
    }),
    getCell: getCell({
      state,
      props
    }),
    isWeekActive: isWeekActive({
      props,
      state
    }),
    watchMaxDate: watchMaxDate({
      api: api2,
      props
    }),
    watchMinDate: watchMinDate({
      api: api2,
      props
    }),
    handleMouseMove: handleMouseMove({
      api: api2,
      emit,
      props,
      state
    }),
    getRows: getRows({
      api: api2,
      props,
      state,
      t,
      vm
    }),
    handleClick: handleClick({
      api: api2,
      emit,
      props,
      state
    }),
    getCellClasses: getCellClasses({
      api: api2,
      props,
      state
    }),
    getCssToken: getCssToken({
      api: api2
    }),
    getCellRangeClasses: getCellRangeClasses({
      props
    })
  });
};
const initWatch = ({
  watch,
  props,
  api: api2
}) => {
  watch(() => props.rangeState, value => api2.markRange(props.minDate, value.endDate), {
    deep: true
  });
  watch(() => props.minDate, api2.watchMinDate);
  watch(() => props.maxDate, api2.watchMaxDate);
};
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
  const state = initState({
    reactive,
    computed,
    api: api2,
    props
  });
  initApi({
    api: api2,
    state,
    props,
    emit,
    t,
    vm
  });
  initWatch({
    watch,
    props,
    api: api2
  });
  return api2;
};
export { api, renderless };