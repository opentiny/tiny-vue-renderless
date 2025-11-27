import "../chunk-G2ADBYYC.js";
import { handleChange, computedGetModelGet, computedGetModelSet, computedCheckboxGroup, computedActiveStyle, computedFormItemSize, computedSize, computedIsDisabled, toggleEvent } from './index.js';
import { addToStore, computedIsChecked, computedStore, computedIsLimitDisabled, computedIsShowText, computedShowText } from './../checkbox/index.js';
const api = ["state", "handleChange"];
const initState = ({
  reactive,
  computed,
  api: api2
}) => {
  const state = reactive({
    focus: false,
    selfModel: false,
    isLimitExceeded: false,
    model: computed({
      get: () => api2.computedGetModelGet(),
      set: value => api2.computedGetModelSet(value)
    }),
    size: computed(() => api2.computedSize()),
    store: computed(() => api2.computedStore()),
    isChecked: computed(() => api2.computedIsChecked()),
    isDisabled: computed(() => api2.computedIsDisabled()),
    activeStyle: computed(() => api2.computedActiveStyle()),
    checkboxGroup: computed(() => api2.computedCheckboxGroup()),
    isLimitDisabled: computed(() => api2.computedIsLimitDisabled()),
    showText: computed(() => api2.computedShowText()),
    isShowText: computed(() => api2.computedIsShowText())
  });
  return state;
};
const initApi = ({
  api: api2,
  state,
  props,
  formItemSize,
  parent,
  constants,
  emit,
  nextTick,
  dispatch
}) => {
  Object.assign(api2, {
    state,
    addToStore: addToStore({
      state,
      props
    }),
    computedStore: computedStore({
      state,
      props
    }),
    computedActiveStyle: computedActiveStyle(state),
    computedFormItemSize: computedFormItemSize(props),
    computedSize: computedSize({
      state,
      formItemSize
    }),
    computedIsChecked: computedIsChecked({
      state,
      props
    }),
    computedIsLimitDisabled: computedIsLimitDisabled(state),
    computedIsDisabled: computedIsDisabled({
      state,
      props
    }),
    computedGetModelGet: computedGetModelGet({
      state,
      props
    }),
    computedCheckboxGroup: computedCheckboxGroup({
      parent,
      constants
    }),
    handleChange: handleChange({
      state,
      props,
      emit,
      nextTick,
      dispatch,
      constants
    }),
    computedGetModelSet: computedGetModelSet({
      state,
      props,
      emit,
      dispatch,
      constants
    }),
    computedIsShowText: computedIsShowText({
      props
    }),
    computedShowText: computedShowText({
      props
    })
  });
};
const renderless = (props, {
  computed,
  onMounted,
  onBeforeUnmount,
  reactive
}, {
  parent,
  emit,
  dispatch,
  constants,
  nextTick
}) => {
  const api2 = {};
  const formItemSize = computed(() => api2.computedFormItemSize());
  const state = initState({
    reactive,
    computed,
    api: api2
  });
  initApi({
    api: api2,
    state,
    props,
    formItemSize,
    parent,
    constants,
    emit,
    nextTick,
    dispatch
  });
  onBeforeUnmount(() => {
    toggleEvent({
      parent,
      props,
      type: "remove"
    });
  });
  onMounted(() => {
    toggleEvent({
      parent,
      props,
      type: "add"
    });
    props.checked && api2.addToStore();
  });
  return api2;
};
export { api, renderless };