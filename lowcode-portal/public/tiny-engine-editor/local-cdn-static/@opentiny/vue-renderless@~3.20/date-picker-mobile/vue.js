import "../chunk-G2ADBYYC.js";
import { initPanel, formatDate, getCurrentDate, getSelectedPosition, getWeeksByMonth, getDaysByWeek, getDate, watchVisible, scrollToCurrentDate, watchModelValue, selectOption, timeToggle, timeConfirm, selectedComputed, loadingDate, scrollStart, scrollEnd, clear, close, confirm } from './index.js';
import { initYearMonthPanel, getOffsetMonth, loadYearMonth } from './year-month.js';
const api = ["state", "getDate", "getWeeksByMonth", "getDaysByWeek", "getSelectedPosition", "selectOption", "confirm", "timeToggle", "timeConfirm", "scrollStart", "scrollEnd", "loadingDate", "clear", "close", "formatDate"];
const renderless = (props, {
  computed,
  reactive,
  watch,
  onMounted
}, {
  emit,
  vm,
  nextTick,
  constants
}) => {
  const {
    DATE_RANGE,
    DATE_TIME_RANGE,
    YEAR_MONTH_RANGE,
    YEAR_MONTH
  } = constants.TYPE;
  const api2 = {};
  const state = reactive({
    scrollerHeight: window.innerHeight || 1e3,
    toggle: false,
    date: null,
    loading: false,
    ready: false,
    dateList: {},
    timeVisible: false,
    showTimeIndex: 0,
    time: ["00", "00", "00"],
    timeList: [["00", "00", "00"], ["00", "00", "00"]],
    years: [],
    isYearMonthPanel: computed(() => [YEAR_MONTH_RANGE, YEAR_MONTH].includes(props.type)),
    yearNum: computed(() => [YEAR_MONTH, YEAR_MONTH_RANGE].includes(props.type) ? 40 : 10),
    itemSize: computed(() => [YEAR_MONTH, YEAR_MONTH_RANGE].includes(props.type) ? 150 : 300),
    buffer: 200,
    selected: computed(() => api2.selectedComputed()),
    months: computed(() => Object.keys(state.dateList).map(item => ({
      id: item,
      yearMonth: item
    }))),
    btnDisabled: computed(() => [DATE_RANGE, DATE_TIME_RANGE, YEAR_MONTH_RANGE].includes(props.type) && state.date && state.date.length === 1),
    computedYears: computed(() => Object.keys(state.years).map(item => ({
      id: item,
      year: item
    })))
  });
  Object.assign(api2, {
    state,
    initPanel: initPanel({
      state,
      api: api2
    }),
    initYearMonthPanel: initYearMonthPanel({
      state,
      props
    }),
    getCurrentDate: getCurrentDate({
      api: api2,
      props
    }),
    getWeeksByMonth: getWeeksByMonth({
      state
    }),
    getDate: getDate({
      state
    }),
    getDaysByWeek: getDaysByWeek({
      state,
      api: api2
    }),
    getSelectedPosition: getSelectedPosition({
      state,
      api: api2
    }),
    confirm: confirm({
      state,
      emit,
      props,
      api: api2,
      constants
    }),
    timeConfirm: timeConfirm({
      state,
      emit
    }),
    scrollStart: scrollStart({
      state,
      api: api2,
      props,
      constants
    }),
    scrollEnd: scrollEnd({
      state,
      api: api2,
      props,
      constants
    }),
    selectOption: selectOption({
      state,
      emit,
      props,
      constants
    }),
    timeToggle: timeToggle({
      state
    }),
    watchVisible: watchVisible({
      emit,
      api: api2,
      state
    }),
    scrollToCurrentDate: scrollToCurrentDate({
      state,
      vm,
      nextTick
    }),
    watchModelValue: watchModelValue({
      props,
      state,
      constants
    }),
    selectedComputed: selectedComputed({
      props,
      state,
      constants,
      api: api2
    }),
    loadingDate: loadingDate({
      state,
      api: api2
    }),
    loadYearMonth: loadYearMonth({
      state,
      api: api2
    }),
    getOffsetMonth: getOffsetMonth(),
    formatDate: formatDate({
      props,
      constants
    }),
    clear: clear({
      state,
      emit,
      api: api2
    }),
    close: close({
      emit,
      vm
    })
  });
  watch(() => props.visible, api2.watchVisible);
  watch(() => props.modelValue, api2.watchModelValue, {
    immediate: true
  });
  onMounted(() => {
    state.isYearMonthPanel ? api2.initYearMonthPanel({
      isInit: true
    }) : api2.initPanel({
      isInit: true
    });
    props.visible && api2.scrollToCurrentDate({
      date: (Array.isArray(state.date) ? state.date[0] : state.date) || /* @__PURE__ */new Date()
    });
    nextTick(() => {
      state.ready = true;
    });
  });
  return api2;
};
export { api, renderless };