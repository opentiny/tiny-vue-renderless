import "../chunk-G2ADBYYC.js";
import { watchActionSheetVisible, close, confirm, columnStyle, clear } from './index.js';
import { usePicker } from './usePicker.js';
const api = ["state", "close", "confirm", "clear", "columnsType", "columnsList", "columnFieldNames", "changeHandler", "defaultValues", "isDisabled", "selectedOptions", "columnStyle"];
const renderless = (props, {
  reactive,
  computed,
  watch,
  ref,
  toRefs
}, {
  emit,
  vm
}) => {
  const state = reactive({
    actionSheetVisible: false,
    visibleOptionNum: 5
  });
  const {
    changeHandler,
    defaultValues,
    columnsList,
    columnsType,
    columnFieldNames,
    selectedOptions,
    setValue,
    isDisabled
  } = usePicker({
    ref,
    reactive,
    watch,
    computed,
    toRefs,
    props,
    emit
  });
  const api2 = {
    state
  };
  Object.assign(api2, {
    close: close(state),
    clear: clear({
      api: api2,
      emit
    }),
    confirm: confirm({
      api: api2,
      emit,
      props,
      state,
      defaultValues,
      selectedOptions,
      isDisabled,
      vm
    }),
    watchActionSheetVisible: watchActionSheetVisible({
      emit,
      api: api2,
      props
    }),
    columnsType,
    columnsList,
    columnFieldNames,
    changeHandler,
    defaultValues,
    selectedOptions,
    setValue,
    isDisabled,
    columnStyle: columnStyle({
      props,
      computed
    })
  });
  watch(() => props.visible, value => state.actionSheetVisible = value);
  watch(() => state.actionSheetVisible, value => api2.watchActionSheetVisible(value));
  return api2;
};
export { api, renderless };