import "../chunk-G2ADBYYC.js";
import { computedCalendar, computedEventList, toggeModel, selectMonth, selectDay, getEventByDay, getEventByMonth, getTime, getYearList, isToday, isThisMonth, genMonths, toToday, getCurrentDate } from './index.js';
const api = ["state", "renderProxy", "isToday", "isThisMonth", "getEventByMonth", "getEventByDay", "selectDay", "selectMonth", "toggeModel", "getTime", "genMonths", "toToday"];
const initState = ({
  reactive,
  props,
  computed,
  api: api2
}) => {
  const state = reactive({
    index: 0,
    selectedTip: "",
    selectedDate: getCurrentDate(),
    showYear: false,
    showMonth: false,
    activeYear: props.year,
    displayMode: props.mode,
    activeMonth: props.month,
    dropdownYear: computed(() => api2.getYearList()),
    calendar: computed(() => api2.computedCalendar()),
    eventList: computed(() => api2.computedEventList())
  });
  return state;
};
const initWatch = ({
  watch,
  props,
  state,
  emit
}) => {
  watch(() => props.year, (value, oldValue) => {
    if (value !== oldValue) {
      state.activeYear = value;
    }
  }, {
    immediate: true
  });
  watch(() => props.month, (value, oldValue) => {
    if (value !== oldValue) {
      state.activeMonth = value;
    }
  }, {
    immediate: true
  });
  watch(() => state.activeYear, (value, oldValue) => {
    if (value !== oldValue) {
      emit("year-change", value, oldValue);
      emit("update:modelValue", value, oldValue);
    }
  });
  watch(() => state.activeMonth, (value, oldValue) => {
    if (value !== oldValue) {
      emit("month-change", value, oldValue);
    }
  });
};
const initApi = ({
  api: api2,
  state,
  t,
  props
}) => {
  Object.assign(api2, {
    state,
    genMonths,
    computedCalendar: computedCalendar({
      state
    }),
    computedEventList: computedEventList({
      props,
      state
    }),
    getTime: getTime(state),
    isToday: isToday(state),
    selectDay: selectDay(state),
    getYearList: getYearList(t),
    toggeModel: toggeModel(state),
    selectMonth: selectMonth(state),
    isThisMonth: isThisMonth(state),
    getEventByDay: getEventByDay(state),
    getEventByMonth: getEventByMonth({
      props,
      state
    }),
    toToday: toToday(state)
  });
};
const renderless = (props, {
  computed,
  reactive,
  watch
}, {
  t,
  emit
}) => {
  const api2 = {};
  const state = initState({
    reactive,
    props,
    computed,
    api: api2
  });
  initWatch({
    watch,
    props,
    state,
    emit
  });
  initApi({
    api: api2,
    state,
    t,
    props
  });
  return api2;
};
export { api, renderless };