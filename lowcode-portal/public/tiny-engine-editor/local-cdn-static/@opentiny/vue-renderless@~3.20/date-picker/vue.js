import "../chunk-G2ADBYYC.js";
import { getBoundary, clearDisplayValue, showPickerAndLockScroll, hookMounted, getMonthEndDay, getDisplayValue, getRanges, onConfirm, onCancel, getOriginColumns, getColumns, updateInnerValue, formatValue, onChange, updateColumnValue } from './index.js';
import { DATE } from './../common/index.js';
const api = ["state", "clearDisplayValue", "showPickerAndLockScroll", "hookMounted", "onConfirm", "onCancel", "onChange"];
const setWatchFn = ({
  api: api2,
  watch,
  props,
  state,
  emit
}) => {
  watch(() => props.minDate, () => api2.updateInnerValue(), {
    lazy: true
  });
  watch(() => props.visible, value => state.visible = value, {
    lazy: true
  });
  watch(() => props.maxDate, () => api2.updateInnerValue(), {
    lazy: true
  });
  watch(() => props.modelValue, value => {
    if (value) {
      const val = api2.formatValue(new Date(value));
      if (val.valueOf() !== state.innerValue.valueOf()) {
        state.innerValue = val;
      }
      state.displayValue = api2.getDisplayValue();
    }
  }, {
    immediate: true
  });
  watch(() => state.columns, () => api2.updateColumnValue(), {
    lazy: true
  });
  watch(() => state.innerValue, value => emit("input", value), {
    lazy: true
  });
};
const renderless = (props, {
  computed,
  onMounted,
  reactive,
  watch
}, {
  constants,
  emit,
  nextTick,
  refs,
  parent
}) => {
  const api2 = {
    formatValue: formatValue(props),
    getMonthEndDay: getMonthEndDay(constants),
    hookMounted: hookMounted({
      constants,
      parent,
      refs,
      nextTick
    })
  };
  const state = reactive({
    visible: false,
    innerValue: formatValue(props)(props.modelValue),
    ranges: computed(() => api2.getRanges()),
    originColumns: computed(() => api2.getOriginColumns()),
    columns: computed(() => api2.getColumns()),
    displayValue: "",
    isReadonly: false,
    clearable: props.clearable
  });
  Object.assign(api2, {
    state,
    getOriginColumns: getOriginColumns(state),
    onCancel: onCancel({
      emit,
      state
    }),
    getColumns: getColumns({
      props,
      state
    }),
    clearDisplayValue: clearDisplayValue(state),
    getDisplayValue: getDisplayValue({
      constants,
      DATE,
      props,
      state
    }),
    showPickerAndLockScroll: showPickerAndLockScroll({
      constants,
      state
    }),
    updateColumnValue: updateColumnValue({
      constants,
      nextTick,
      props,
      refs,
      state
    })
  });
  api2.getBoundary = getBoundary({
    api: api2,
    constants,
    props
  });
  api2.updateInnerValue = updateInnerValue({
    api: api2,
    constants,
    props,
    refs,
    state
  });
  api2.getRanges = getRanges({
    api: api2,
    constants,
    props,
    state
  });
  setWatchFn({
    api: api2,
    watch,
    props,
    state,
    emit
  });
  onMounted(() => {
    api2.updateColumnValue();
    nextTick(() => {
      api2.updateInnerValue();
    });
  });
  return Object.assign(api2, {
    onConfirm: onConfirm({
      api: api2,
      emit,
      state
    }),
    onChange: onChange({
      api: api2,
      emit,
      refs,
      nextTick
    })
  });
};
export { api, renderless };