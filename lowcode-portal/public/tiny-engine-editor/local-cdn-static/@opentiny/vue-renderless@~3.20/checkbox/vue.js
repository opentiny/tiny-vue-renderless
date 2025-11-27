import "../chunk-G2ADBYYC.js";
import { addToStore, removeFromStore, handleChange, computedGetModelGet, computedGetModelSet, computedIsChecked, computedIsGroup, computedStore, computedIsLimitDisabled, computedIsDisabled, computedIsDisplayOnly, computedIsGroupDisplayOnly, computedFormItemSize, computedCheckboxSize, computedDisplayLabel, mounted, toggleEvent, computedIsShowText, computedShowText } from './index.js';
const api = ["state", "handleChange", "computedStore"];
const initState = ({
  reactive,
  computed,
  parent,
  api: api2,
  inject,
  props
}) => {
  const state = reactive({
    size: computed(() => props.size || inject("size", null) || (parent.tinyForm || {}).size),
    vertical: inject("vertical", null),
    iconPosition: props.iconPosition || inject("iconPosition", "center"),
    focus: false,
    selfModel: false,
    showLabel: false,
    isLimitExceeded: false,
    checkboxGroup: null,
    store: computed(() => api2.computedStore()),
    isGroup: computed(() => api2.computedIsGroup()),
    isChecked: computed(() => api2.computedIsChecked()),
    isDisabled: computed(() => api2.computedIsDisabled()),
    checkboxSize: computed(() => api2.computedCheckboxSize()),
    isLimitDisabled: computed(() => api2.computedIsLimitDisabled()),
    formDisabled: computed(() => (parent.tinyForm || {}).disabled),
    formDisplayOnly: computed(() => (parent.tinyForm || {}).displayOnly),
    isDisplayOnly: computed(() => api2.computedIsDisplayOnly()),
    isGroupDisplayOnly: computed(() => api2.computedIsGroupDisplayOnly()),
    displayLabel: computed(() => api2.computedDisplayLabel()),
    inputDisabled: computed(() => state.isDisabled || state.isDisplayOnly || state.isGroupDisplayOnly),
    model: computed({
      get: () => api2.computedGetModelGet(),
      set: value => api2.computedGetModelSet(value)
    }),
    showText: computed(() => api2.computedShowText()),
    isShowText: computed(() => api2.computedIsShowText()),
    shape: inject("shape", null) || props.shape
  });
  return state;
};
const initApi = ({
  api: api2,
  state,
  dispatch,
  props,
  parent,
  constants,
  formItemSize,
  emit,
  nextTick,
  t,
  vm
}) => {
  Object.assign(api2, {
    state,
    addToStore: addToStore({
      state,
      props
    }),
    removeFromStore: removeFromStore({
      state,
      props
    }),
    computedStore: computedStore({
      state,
      props
    }),
    computedFormItemSize: computedFormItemSize(props),
    computedIsChecked: computedIsChecked({
      state,
      props
    }),
    computedIsLimitDisabled: computedIsLimitDisabled(state),
    computedIsDisabled: computedIsDisabled({
      state,
      props
    }),
    computedIsDisplayOnly: computedIsDisplayOnly({
      state,
      props
    }),
    computedIsGroupDisplayOnly: computedIsGroupDisplayOnly({
      state
    }),
    computedGetModelGet: computedGetModelGet({
      state,
      props
    }),
    computedIsGroup: computedIsGroup({
      state,
      parent,
      constants
    }),
    computedCheckboxSize: computedCheckboxSize({
      state,
      props,
      formItemSize
    }),
    computedGetModelSet: computedGetModelSet({
      state,
      dispatch,
      emit,
      constants
    }),
    mounted: mounted({
      emit,
      props,
      api: api2,
      parent
    }),
    handleChange: handleChange({
      state,
      props,
      emit,
      nextTick,
      dispatch,
      constants
    }),
    computedDisplayLabel: computedDisplayLabel({
      state,
      props,
      t
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
  reactive,
  watch,
  inject
}, {
  vm,
  parent,
  emit,
  constants,
  nextTick,
  dispatch,
  t
}) => {
  const api2 = {
    dispatch
  };
  const formItemSize = computed(() => api2.computedFormItemSize());
  const state = initState({
    reactive,
    computed,
    parent,
    api: api2,
    inject,
    props
  });
  parent.tinyForm = parent.tinyForm || inject("form", null);
  initApi({
    api: api2,
    state,
    dispatch,
    props,
    parent,
    constants,
    formItemSize,
    emit,
    nextTick,
    t,
    vm
  });
  watch(() => props.modelValue, value => props.validateEvent && api2.dispatch(constants.FORM_ITEM, constants.FORM_CHANGE, value));
  watch(() => props.checked, value => {
    value ? api2.addToStore() : api2.removeFromStore();
  });
  onBeforeUnmount(() => {
    toggleEvent({
      parent,
      props,
      type: "remove"
    });
  });
  onMounted(() => {
    dispatch("Tooltip", "tooltip-update");
    toggleEvent({
      parent,
      props,
      type: "add"
    });
    api2.mounted();
  });
  return api2;
};
export { api, renderless };