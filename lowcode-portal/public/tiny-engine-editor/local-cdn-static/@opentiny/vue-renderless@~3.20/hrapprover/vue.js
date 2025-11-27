import "../chunk-G2ADBYYC.js";
import { getHrList, selectedDept, resetPerson, hrChange, initService, getDisplay, cancel } from './index.js';
const api = ["state", "hrChange", "selectedDept", "resetPerson", "getDisplay", "cancel"];
const initState = ({
  reactive,
  props
}) => {
  const state = reactive({
    hrList: [],
    lastHrList: [],
    dept: props.modelValue,
    current: "",
    approvalPerson: props.approvalPerson,
    overdueData: "",
    loading: false
  });
  return state;
};
const initApi = ({
  api: api2,
  state,
  emit,
  props,
  $service
}) => {
  Object.assign(api2, {
    state,
    hrChange: hrChange({
      emit,
      state
    }),
    resetPerson: resetPerson({
      props,
      state
    }),
    fetchHrapprover: $service.fetchHrapprover,
    cancel: cancel({
      state
    }),
    getHrList: getHrList({
      api: api2,
      props,
      state
    }),
    selectedDept: selectedDept({
      api: api2,
      state
    }),
    getDisplay: getDisplay({
      api: api2,
      state
    })
  });
};
const initWatch = ({
  watch,
  state,
  api: api2,
  props
}) => {
  watch(() => props.modelValue, value => {
    state.dept = value;
    api2.getDisplay(value);
  }, {
    immediate: true
  });
  watch(() => props.approvalPerson, value => {
    state.overdueData = value;
    state.approvalPerson = value;
  }, {
    immediate: true
  });
};
const renderless = (props, {
  reactive,
  watch
}, {
  service,
  emit
}) => {
  const api2 = {};
  const $service = initService({
    props,
    service
  });
  const state = initState({
    reactive,
    props
  });
  initApi({
    api: api2,
    state,
    emit,
    props,
    $service
  });
  initWatch({
    watch,
    state,
    api: api2,
    props
  });
  return api2;
};
export { api, renderless };