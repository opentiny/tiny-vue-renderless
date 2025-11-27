import { __spreadProps, __spreadValues } from "../chunk-G2ADBYYC.js";
import { clear, handleChange, handleInput, showSelector, changeKey, searchClick, clickOutside, beforeDestroy, mounted, formatSearchTypes, setDefaultType, searchEnterKey, emitInput } from './index.js';
const api = ["state", "handleChange", "handleInput", "showSelector", "changeKey", "searchClick", "searchEnterKey", "inputStyle", "formatSearchTypes", "setDefaultType", "clear"];
const useFormatSearchTypes = ({
  computed,
  props,
  reactive,
  toRefs,
  watch
}) => {
  const api2 = {
    setDefaultType,
    formatSearchTypes
  };
  const state = reactive({
    searchValue: props.typeValue,
    types: computed(() => api2.formatSearchTypes(props.searchTypes))
  });
  watch(() => props.typeValue, () => {
    state.searchValue = api2.setDefaultType(props.searchTypes, props.typeValue);
  }, {
    immediate: true
  });
  return {
    api: api2,
    state: toRefs(state)
  };
};
const renderless = (props, {
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
  toRefs,
  watch
}, {
  vm,
  parent,
  emit,
  nextTick
}) => {
  const formatSearchTypes2 = useFormatSearchTypes({
    computed,
    props,
    reactive,
    toRefs,
    watch
  });
  const state = reactive(__spreadProps(__spreadValues({
    show: false,
    focus: false,
    hovering: false,
    collapse: props.mini,
    currentValue: props.modelValue
  }, formatSearchTypes2.state), {
    showClear: computed(() => props.clearable && (state.focus || state.hovering) && state.currentValue),
    formItemSize: computed(() => (parent.formItem || {}).formItemSize),
    searchSize: computed(() => props.size || state.formItemSize)
  }));
  const api2 = __spreadValues({
    state,
    changeKey: changeKey({
      state,
      emit
    }),
    handleChange: handleChange({
      emit,
      state
    }),
    showSelector: showSelector({
      vm,
      state
    }),
    searchClick: searchClick({
      emit,
      props,
      state
    }),
    clickOutside: clickOutside({
      parent,
      props,
      state
    }),
    emitInput: emitInput({
      emit
    })
  }, formatSearchTypes2.api);
  Object.assign(api2, {
    clear: clear({
      api: api2,
      emit,
      vm,
      state
    }),
    handleInput: handleInput({
      api: api2,
      props,
      state
    }),
    searchEnterKey: searchEnterKey({
      api: api2,
      props,
      vm,
      nextTick
    })
  });
  onMounted(mounted({
    api: api2
  }));
  onBeforeUnmount(beforeDestroy({
    api: api2
  }));
  watch(() => props.modelValue, value => state.currentValue = value);
  return api2;
};
export { api, renderless, useFormatSearchTypes };