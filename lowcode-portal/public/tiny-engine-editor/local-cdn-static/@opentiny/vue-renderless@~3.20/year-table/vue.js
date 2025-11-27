import "../chunk-G2ADBYYC.js";
import { getRows, handleYearTableClick, watchDate, markRange, handleMouseMove, getIsDisabled, getIsCurrent, getIsDefault } from './index.js';
const api = ["state", "handleYearTableClick", "handleMouseMove", "getIsDisabled", "getIsCurrent", "getIsDefault"];
const renderless = (props, {
  computed,
  reactive,
  watch
}, {
  emit,
  vm
}) => {
  const api2 = {};
  const state = reactive({
    tableRows: [[], [], []],
    rows: computed(() => api2.getRows()),
    currentYear: ( /* @__PURE__ */new Date()).getFullYear()
  });
  Object.assign(api2, {
    state,
    handleYearTableClick: handleYearTableClick({
      emit,
      props,
      state
    }),
    markRange: markRange({
      props,
      state
    }),
    watchDate: watchDate({
      api: api2,
      props
    }),
    getRows: getRows({
      props,
      state,
      vm
    }),
    handleMouseMove: handleMouseMove({
      api: api2,
      emit,
      props,
      state
    }),
    getIsDisabled: getIsDisabled({
      props
    }),
    getIsCurrent: getIsCurrent({
      props
    }),
    getIsDefault: getIsDefault({
      props
    })
  });
  watch(() => props.rangeState, (value, oldValue) => value !== oldValue && api2.markRange(props.minDate, value.endDate), {
    deep: true
  });
  watch(() => props.minDate, api2.watchDate);
  watch(() => props.maxDate, api2.watchDate);
  return api2;
};
export { api, renderless };