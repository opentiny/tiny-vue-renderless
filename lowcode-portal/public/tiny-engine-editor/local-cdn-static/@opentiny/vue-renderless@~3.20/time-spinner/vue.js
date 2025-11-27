import "../chunk-G2ADBYYC.js";
import { getArrowHourList, getArrowMinuteList, bindScrollEvent, typeItemHeight, scrollBarHeight, amPm, scrollDown, adjustSpinners, adjustSpinner, adjustCurrentSpinner, handleScroll, getArrowSecondList, increase, decrease, modifyDateField, handleClick, emitSelectRange, selectDateScroll } from './index.js';
import { getRangeHours, getRangeMinutes } from './../common/deps/date-util.js';
const api = ["state", "emitSelectRange", "adjustCurrentSpinner", "handleClick", "decrease", "increase", "amPm", "adjustSpinners"];
const initState = ({
  reactive,
  computed,
  props,
  api: api2
}) => {
  const state = reactive({
    selectableRange: [],
    currentScrollbar: null,
    hours: computed(() => props.date.getHours()),
    minutes: computed(() => props.date.getMinutes()),
    seconds: computed(() => props.date.getSeconds()),
    hoursList: computed(() => Array.from(getRangeHours(state.selectableRange)).map((disabled, hour) => ({
      disabled,
      hour
    })).filter(({
      hour
    }) => !(hour % state.step.hours))),
    minutesList: computed(() => Array.from(getRangeMinutes(state.selectableRange, state.hours)).map((disabled, minute) => ({
      disabled,
      minute
    })).filter(({
      minute
    }) => !(minute % state.step.minutes))),
    secondsList: computed(() => Array.from(new Array(60)).map((item, second) => ({
      second
    })).filter(({
      second
    }) => !(second % state.step.seconds))),
    arrowHourList: computed(() => api2.getArrowHourList()),
    arrowMinuteList: computed(() => api2.getArrowMinuteList()),
    arrowSecondList: computed(() => api2.getArrowSecondList()),
    animationName: "",
    step: computed(() => ({
      hours: props.step.hour * 1 || 1,
      minutes: props.step.minute * 1 || 1,
      seconds: props.step.second * 1 || 1
    }))
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
  emit,
  vm,
  designConfig,
  constants
}) => {
  const api2 = {};
  const state = initState({
    reactive,
    computed,
    props,
    api: api2
  });
  onMounted(() => {
    !props.arrowControl && api2.bindScrollEvent();
  });
  Object.assign(api2, {
    state,
    amPm: amPm(props),
    typeItemHeight: typeItemHeight({
      vm,
      designConfig
    }),
    scrollBarHeight: scrollBarHeight(vm),
    getArrowHourList: getArrowHourList(state),
    getArrowSecondList: getArrowSecondList(state),
    getArrowMinuteList: getArrowMinuteList(state),
    emitSelectRange: emitSelectRange({
      emit,
      state
    }),
    modifyDateField: modifyDateField({
      emit,
      props,
      state
    }),
    bindScrollEvent: bindScrollEvent({
      api: api2,
      vm
    }),
    adjustSpinners: adjustSpinners({
      api: api2,
      state,
      vm
    }),
    adjustSpinner: adjustSpinner({
      api: api2,
      props,
      vm,
      state
    }),
    increase: increase({
      api: api2,
      state
    }),
    decrease: decrease({
      api: api2,
      state
    }),
    handleClick: handleClick(api2),
    scrollDown: scrollDown({
      api: api2,
      state
    }),
    handleScroll: handleScroll({
      api: api2,
      vm,
      state
    }),
    adjustCurrentSpinner: adjustCurrentSpinner({
      api: api2,
      state
    }),
    selectDateScroll: selectDateScroll({
      state,
      props
    })
  });
  watch(() => props.date, () => {
    const timeType = ["hours", "minutes", "seconds"];
    timeType.forEach(type => {
      api2.modifyDateField(type, Math.round(state[type] / state.step[type]) * state.step[type]);
    });
    nextTick(api2.adjustSpinners);
  }, {
    immediate: true
  });
  watch(() => state.hoursList, () => {
    state.animationName = constants.ANIMATIONNAME;
  }, {
    immediate: true
  });
  return api2;
};
export { api, renderless };