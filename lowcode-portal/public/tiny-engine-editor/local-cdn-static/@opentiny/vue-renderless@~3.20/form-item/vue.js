import "../chunk-G2ADBYYC.js";
import { validate, clearValidate, resetField, getRules, getFilteredRule, onFieldBlur, onFieldChange, updateComputedLabelWidth, addValidateEvents, removeValidateEvents, mounted, unmounted, watchError, watchValidateStatus, computedLabelStyle, computedValueStyle, computedContentStyle, computedForm, computedIsRequired, computedFieldValue, computedGetValidateType, computedValidateIcon, computedIsErrorInline, computedIsErrorBlock, updateTip, wrapValidate, getDisplayedValue, clearDisplayedValue, handleLabelMouseenter, handleMouseenter, handleMouseleave } from './index.js';
const api = ["state", "validate", "clearValidate", "resetField", "getRules", "getFilteredRule", "onFieldBlur", "onFieldChange", "updateComputedLabelWidth", "addValidateEvents", "removeValidateEvents", "updateTip", "getDisplayedValue", "handleLabelMouseenter", "handleMouseenter", "handleMouseleave"];
const initState = ({
  reactive,
  computed,
  api: api2,
  mode,
  inject,
  props
}) => {
  const state = reactive({
    mode,
    validateState: "",
    validateMessage: "",
    validateDisabled: false,
    validator: {},
    isNested: false,
    computedLabelWidth: "",
    initialValue: null,
    canShowTip: false,
    // 兼容 2.0 validation 的 required
    validationRequired: false,
    validateType: "text",
    tooltip: "",
    displayedValue: "",
    isBasicComp: false,
    showTooltip: false,
    typeName: "",
    formInstance: inject("form"),
    labelFor: computed(() => props.for || props.prop || ""),
    labelStyle: computed(() => api2.computedLabelStyle()),
    valueStyle: computed(() => api2.computedValueStyle()),
    contentStyle: computed(() => api2.computedContentStyle()),
    form: computed(() => api2.computedForm()),
    fieldValue: computed(() => api2.computedFieldValue()),
    isRequired: computed(() => api2.computedIsRequired()),
    formInline: computed(() => state.formInstance.inline),
    formSize: computed(() => state.formInstance.size),
    formItemSize: computed(() => props.size || state.formSize),
    isDisplayOnly: computed(() => state.formInstance.displayOnly),
    labelPosition: computed(() => state.formInstance.labelPosition),
    hideRequiredAsterisk: computed(() => state.formInstance.state.hideRequiredAsterisk),
    labelSuffix: computed(() => state.formInstance.labelSuffix),
    labelWidth: computed(() => state.formInstance.labelWidth),
    showMessage: computed(() => state.formInstance.showMessage),
    sizeClass: computed(() => state.formItemSize),
    getValidateType: computed(() => api2.computedGetValidateType()),
    validateIcon: computed(() => api2.computedValidateIcon()),
    isErrorInline: computed(() => api2.computedIsErrorInline()),
    isErrorBlock: computed(() => api2.computedIsErrorBlock()),
    disabled: computed(() => state.formInstance.disabled),
    tooltipType: computed(() => state.formInstance.state.tooltipType),
    // 标记表单项下是否有多个子节点
    isMultiple: false
  });
  return state;
};
const initApi = ({
  api: api2,
  state,
  dispatch,
  broadcast,
  props,
  constants,
  vm,
  t,
  nextTick,
  slots
}) => {
  Object.assign(api2, {
    state,
    dispatch,
    broadcast,
    watchError: watchError(state),
    updateTip: updateTip({
      vm,
      state
    }),
    watchValidateStatus: watchValidateStatus(state),
    computedLabelStyle: computedLabelStyle({
      props,
      state
    }),
    computedValueStyle: computedValueStyle({
      props,
      state
    }),
    computedContentStyle: computedContentStyle({
      props,
      state
    }),
    computedForm: computedForm({
      constants,
      vm,
      state
    }),
    computedFieldValue: computedFieldValue({
      props,
      state
    }),
    computedGetValidateType: computedGetValidateType({
      props,
      state
    }),
    computedValidateIcon: computedValidateIcon({
      props,
      state
    }),
    computedIsErrorInline: computedIsErrorInline({
      props,
      state
    }),
    computedIsErrorBlock: computedIsErrorBlock({
      props,
      state
    }),
    clearValidate: clearValidate(state),
    getRules: getRules({
      props,
      state
    }),
    updateComputedLabelWidth: updateComputedLabelWidth(state),
    removeValidateEvents: removeValidateEvents(vm),
    unmounted: unmounted({
      api: api2,
      vm,
      state
    }),
    mounted: mounted({
      api: api2,
      vm,
      props,
      state
    }),
    computedIsRequired: computedIsRequired({
      api: api2,
      state
    }),
    resetField: resetField({
      api: api2,
      nextTick,
      props,
      state
    }),
    getFilteredRule: getFilteredRule(api2),
    onFieldBlur: onFieldBlur(api2),
    onFieldChange: onFieldChange({
      api: api2,
      state
    }),
    addValidateEvents: addValidateEvents({
      api: api2,
      vm,
      props,
      state
    }),
    validate: wrapValidate({
      validateFunc: validate({
        api: api2,
        props,
        state,
        t
      }),
      props
    }),
    getDisplayedValue: getDisplayedValue({
      state
    }),
    clearDisplayedValue: clearDisplayedValue({
      state
    }),
    handleLabelMouseenter: handleLabelMouseenter({
      props,
      state,
      slots
    }),
    handleMouseenter: handleMouseenter({
      state
    }),
    handleMouseleave: handleMouseleave(state)
  });
};
const initWatch = ({
  watch,
  api: api2,
  props,
  state
}) => {
  watch(() => props.error, api2.watchError, {
    immediate: true
  });
  watch(() => props.validateStatus, api2.watchValidateStatus);
  watch(() => state.formInstance.displayOnly, api2.clearDisplayedValue);
};
const renderless = (props, {
  computed,
  inject,
  onMounted,
  onUnmounted,
  provide,
  reactive,
  watch
}, {
  vm,
  constants,
  t,
  nextTick,
  broadcast,
  dispatch,
  mode,
  slots
}) => {
  const api2 = {};
  const state = initState({
    reactive,
    computed,
    api: api2,
    mode,
    inject,
    props
  });
  provide("formItem", vm);
  initApi({
    api: api2,
    state,
    dispatch,
    broadcast,
    props,
    constants,
    vm,
    t,
    nextTick,
    slots
  });
  initWatch({
    watch,
    api: api2,
    props,
    state
  });
  onMounted(api2.mounted);
  vm.$on("displayed-value-changed", param => {
    api2.getDisplayedValue(param);
  });
  onUnmounted(api2.unmounted);
  return api2;
};
export { api, renderless };