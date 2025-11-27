import "../chunk-G2ADBYYC.js";
import { setSelectData, initService, openDialog, setDefaultSearch, closeDialog, resetDeptState, getDisplay, searchMethod, getCurrentList, getDeptList, selectChange, searchChange, confirm, cancel, doConfirm, setDeptState } from './index.js';
const api = ["select", "state", "deptState", "openDialog", "getCurrentList", "confirm", "searchMethod", "searchChange", "selectChange", "closeDialog", "cancel"];
const initState = ({
  reactive,
  computed,
  parent,
  props,
  inject,
  lastDeptState
}) => {
  const state = reactive({
    lastDeptState,
    lastLabels: [],
    labels: [],
    display: "",
    open: false,
    loading: false,
    selectChanged: false,
    searchValue: "",
    searchOptions: [],
    current: "",
    formDisabled: computed(() => (parent.tinyForm || {}).disabled),
    disabled: props.disabled,
    autoSelect: props.autoSelect,
    hrapprover: inject("hrapprover", null)
  });
  return state;
};
const initApi = ({
  api: api2,
  state,
  deptState,
  emit,
  $service,
  props
}) => {
  Object.assign(api2, {
    state,
    deptState,
    closeDialog: closeDialog({
      emit,
      state,
      deptState
    }),
    resetDeptState: resetDeptState(deptState),
    fetchDept: $service.fetchDept,
    fetchDeptList: $service.fetchDeptList,
    fetchDeptByValue: $service.fetchDeptByValue,
    setSelectData: setSelectData({
      deptState,
      state
    }),
    cancel: cancel({
      emit,
      state,
      deptState
    }),
    doConfirm: doConfirm({
      emit,
      props,
      state,
      deptState
    }),
    searchChange: searchChange(api2),
    searchMethod: searchMethod({
      api: api2,
      state
    }),
    openDialog: openDialog({
      api: api2,
      emit,
      props,
      state
    }),
    selectChange: selectChange({
      api: api2,
      emit,
      state,
      deptState
    }),
    setDefaultSearch: setDefaultSearch({
      api: api2,
      state
    }),
    getCurrentList: getCurrentList({
      api: api2,
      deptState
    }),
    confirm: confirm({
      api: api2,
      props,
      state
    }),
    getDeptList: getDeptList({
      api: api2,
      deptState,
      state
    }),
    getDisplay: getDisplay({
      api: api2,
      deptState,
      state
    }),
    setDeptState: setDeptState({
      api: api2,
      state,
      deptState
    })
  });
};
const renderless = (props, {
  onBeforeUnmount,
  reactive,
  watch,
  inject,
  computed
}, {
  service,
  emit,
  parent
}) => {
  parent.tinyForm = parent.tinyForm || inject("form", null);
  const api2 = {};
  const $service = initService({
    props,
    service
  });
  const deptLevels = ["company", "dept1", "dept2", "dept3", "dept4", "dept5", "dept6", "dept7", "dept8"];
  const deptState = deptLevels.map(title => reactive({
    title,
    options: [],
    value: "",
    disable: true
  }));
  const lastDeptState = deptLevels.map(title => reactive({
    title,
    options: [],
    value: "",
    disable: true
  }));
  const state = initState({
    reactive,
    computed,
    parent,
    props,
    inject,
    lastDeptState
  });
  initApi({
    api: api2,
    state,
    deptState,
    emit,
    $service,
    props
  });
  watch(() => props.modelValue, api2.getDisplay, {
    immediate: true
  });
  watch(() => state.open, val => {
    if (!val) {
      state.selectChanged = false;
    }
  });
  onBeforeUnmount(() => {
    state.open = false;
  });
  return api2;
};
export { api, renderless };