import "../chunk-G2ADBYYC.js";
import { getCalendarDays, computedData, computedCurrentRow, computedFilteredCalendarDays, handleDraggerClick, handleClickDay, calcCalendarItemHeight, computedTotalRows, handleDraggerMousedown, handleMouseup, handleMousemove, handleDraggerTouchstart, handleDraggerTouchend, handleDraggerTouchmove, setCascaderVisible, handleCascaderChange, computeCascaderOptions, getAllDatesOfCurrWeek, updateCalendarDays, showWeekChange, getWeekOfDate, getPrevWeek, getNextWeek, i18nYearMonth, touchstart, touchmove, touchend } from './index.js';
import throttle from './../common/deps/throttle.js';
const api = ["state", "handleDraggerClick", "handleClickDay", "handleDraggerMousedown", "handleDraggerTouchstart", "handleDraggerTouchend", "throttledHandleDraggerTouchmove", "setCascaderVisible", "handleCascaderChange", "i18nYearMonth", "touchstart", "touchmove", "touchend"];
const initWatch = ({
  watch,
  api: api2,
  state,
  emit
}) => {
  watch(() => state.weekDates, (value, oldValue) => {
    if (state.dragging || state.touching) return;
    state.prevWeekDates = api2.getWeekOfDate("prev", state.weekDates[3].dateStr);
    state.nextWeekDates = api2.getWeekOfDate("next", state.weekDates[3].dateStr);
    state.copyWeekDates = state.weekDates.slice(0);
    emit("week-change", value, oldValue);
  }, {
    deep: true
  });
  watch(() => state.showWeek, value => {
    api2.showWeekChange(value);
  });
};
const renderless = (props, {
  reactive,
  computed,
  onBeforeMount,
  onMounted,
  watch
}, {
  emit,
  vm,
  t
}) => {
  const state = reactive({
    minSize2: "min-width: 3rem; min-height: 2rem",
    minSize3: "min-width: 3rem; min-height: 3rem",
    dayOfWeek: 7,
    showRows: 0,
    weekDays: [],
    prevWeekDates: [],
    weekDates: [],
    nextWeekDates: [],
    lastCalendarDays: [],
    calendarDays: [],
    nextCalendarDays: [],
    threeMonthDays: [],
    copyWeekDates: [],
    calendarDaysCopy: [],
    currentYear: "",
    currentMonth: "",
    data: computed(() => api2.computedData()),
    currentRow: computed(() => api2.computedCurrentRow()),
    filteredCalendarDays: computed(() => api2.computedFilteredCalendarDays()),
    visibleRows: [],
    itemHeight: 0,
    totalRows: computed(() => api2.computedTotalRows()),
    showWeek: true,
    dragging: false,
    touching: false,
    delta: 0,
    duration: 300,
    offsetPos: {
      X: 0,
      Y: 0
    },
    deltaPos: {
      X: 0,
      Y: 0
    },
    startPos: {
      X: 0,
      Y: 0
    },
    activeRow: 0,
    activeDate: "",
    cascaderCurrent: [],
    cascaderOptions: computed(() => api2.computeCascaderOptions()),
    cascaderVisible: false
  });
  const api2 = {
    state,
    touchstart: touchstart({
      state
    }),
    touchmove: touchmove({
      state
    }),
    getCalendarDays: getCalendarDays(state),
    computedData: computedData(state),
    computedCurrentRow: computedCurrentRow(state),
    computedFilteredCalendarDays: computedFilteredCalendarDays(state),
    handleDraggerClick: handleDraggerClick(state, emit),
    calcCalendarItemHeight: calcCalendarItemHeight({
      state,
      vm
    }),
    computedTotalRows: computedTotalRows(state),
    throttledHandleMousemove: throttle(20, handleMousemove({
      state,
      vm
    })),
    handleDraggerTouchstart: handleDraggerTouchstart({
      state,
      vm
    }),
    handleDraggerTouchend: handleDraggerTouchend({
      state,
      vm,
      emit
    }),
    throttledHandleDraggerTouchmove: throttle(20, handleDraggerTouchmove({
      state,
      vm
    })),
    setCascaderVisible: setCascaderVisible(state),
    computeCascaderOptions: computeCascaderOptions(t),
    i18nYearMonth: i18nYearMonth({
      state,
      t
    })
  };
  Object.assign(api2, {
    getPrevWeek: getPrevWeek({
      props,
      emit,
      api: api2,
      state
    }),
    getNextWeek: getNextWeek({
      props,
      emit,
      api: api2,
      state
    }),
    showWeekChange: showWeekChange({
      props,
      state
    }),
    updateCalendarDays: updateCalendarDays({
      props,
      state,
      api: api2,
      emit
    }),
    getAllDatesOfCurrWeek: getAllDatesOfCurrWeek({
      state,
      props
    }),
    getWeekOfDate: getWeekOfDate({
      api: api2
    }),
    touchend: touchend({
      props,
      state,
      api: api2,
      vm,
      emit
    }),
    handleClickDay: handleClickDay({
      api: api2,
      emit,
      props,
      state
    }),
    handleDraggerMousedown: handleDraggerMousedown({
      api: api2,
      state,
      vm
    }),
    handleMouseup: handleMouseup({
      api: api2,
      state,
      vm,
      emit
    }),
    handleCascaderChange: handleCascaderChange({
      api: api2,
      emit,
      props,
      state
    })
  });
  initWatch({
    watch,
    api: api2,
    state,
    emit
  });
  onBeforeMount(() => {
    api2.getCalendarDays(props.modelValue, props.config, "cur");
    api2.getCalendarDays(props.modelValue, props.config, "last");
    api2.getCalendarDays(props.modelValue, props.config, "next");
    state.weekDates = api2.getAllDatesOfCurrWeek(props.modelValue || /* @__PURE__ */new Date());
  });
  onMounted(() => {
    api2.calcCalendarItemHeight();
  });
  return api2;
};
export { api, renderless };