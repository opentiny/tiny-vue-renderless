import "../chunk-G2ADBYYC.js";
import { visibleHandle, watchVisible, formatCascade, format, getDataType, change, setColumnValue, setValues, getColumnValue, confirm, cancel, getColumnIndex, getValues, getIndexes, setIndexes, setColumnIndex, getColumnValues, setColumnValues, onChange, onCascadeChange, emitEvent, getColumn, getChildrenComponent } from './index.js';
const api = ["state", "visibleHandle", "watchVisible", "change", "setValues", "getColumnValue", "confirm", "cancel", "getColumnIndex", "getValues", "getIndexes", "setIndexes", "setColumnIndex", "getColumnValues", "setColumnValues", "onChange", "onCascadeChange", "emitEvent", "getColumn", "setColumnValue"];
const initState = ({
  reactive,
  computed,
  props,
  api: api2
}) => {
  const state = reactive({
    columns: props.columns,
    toggle: false,
    itemHeight: Number(props.itemHeight),
    defaultIndex: props.defaultIndex,
    visibleItemCount: props.visibleItemCount,
    clumnsWrapHeight: null,
    formattedColumns: [],
    dataType: computed(() => api2.getDataType())
  });
  return state;
};
const initApi = ({
  api: api2,
  props,
  state,
  emit,
  childrenPickerRefs
}) => {
  Object.assign(api2, {
    state,
    getColumn: getColumn(childrenPickerRefs),
    getValues: getValues(childrenPickerRefs),
    getIndexes: getIndexes(childrenPickerRefs),
    getDataType: getDataType(state),
    visibleHandle: visibleHandle(emit),
    formatCascade: formatCascade({
      state,
      props
    }),
    getColumnValues: getColumnValues(childrenPickerRefs),
    setColumnValues: setColumnValues(childrenPickerRefs),
    emitEvent: emitEvent({
      api: api2,
      state,
      emit
    }),
    change: change(api2),
    onChange: onChange({
      api: api2,
      state,
      emit
    }),
    cancel: cancel({
      api: api2,
      emit
    }),
    confirm: confirm({
      api: api2,
      childrenPickerRefs
    }),
    format: format({
      state,
      api: api2
    }),
    setValues: setValues(api2),
    setIndexes: setIndexes(api2),
    watchVisible: watchVisible(emit),
    setColumnIndex: setColumnIndex(api2),
    getColumnValue: getColumnValue(api2),
    getColumnIndex: getColumnIndex(api2),
    setColumnValue: setColumnValue(api2),
    onCascadeChange: onCascadeChange({
      api: api2,
      state,
      props
    })
  });
};
const initWatch = ({
  watch,
  props,
  state,
  api: api2
}) => {
  watch(() => props.visible, value => {
    api2.watchVisible({
      state,
      value
    });
  });
  watch(() => props.columns, value => {
    state.columns = value;
    api2.format();
  });
};
const renderless = (props, {
  computed,
  onMounted,
  reactive,
  watch
}, {
  emit,
  nextTick,
  vm,
  constants
}) => {
  const api2 = {};
  const childrenPickerRefs = {
    childrenPicker: null
  };
  const state = initState({
    reactive,
    computed,
    props,
    api: api2
  });
  initApi({
    api: api2,
    props,
    state,
    emit,
    childrenPickerRefs
  });
  initWatch({
    watch,
    props,
    state,
    api: api2
  });
  onMounted(() => {
    nextTick(() => {
      childrenPickerRefs.childrenPicker = getChildrenComponent({
        state,
        vm,
        constants
      });
    });
    api2.format();
    state.clumnsWrapHeight = state.itemHeight * state.visibleItemCount;
  });
  return api2;
};
export { api, renderless };