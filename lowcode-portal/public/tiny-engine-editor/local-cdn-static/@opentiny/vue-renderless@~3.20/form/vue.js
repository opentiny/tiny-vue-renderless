import "../chunk-G2ADBYYC.js";
import { watchRules, computedAutoLabelWidth, computedHideRequiredAsterisk, computedValidateIcon, computedIsErrorInline, computedIsErrorBlock, created, resetFields, clearValidate, validate, validateField, getLabelWidthIndex, registerLabelWidth, deregisterLabelWidth, updateTip, bindDialogEvent, showTooltip, hideTooltip } from './index.js';
const api = ["state", "resetFields", "clearValidate", "validate", "validateField", "getLabelWidthIndex", "registerLabelWidth", "deregisterLabelWidth", "updateTip", "showTooltip", "hideTooltip"];
const renderless = (props, {
  computed,
  inject,
  provide,
  reactive,
  watch,
  onBeforeUnmount
}, {
  vm,
  parent,
  designConfig
}) => {
  const api2 = {};
  const dialog = inject("dialog", null);
  const state = reactive({
    showAutoWidth: props.showAutoWidth,
    fields: [],
    timer: 0,
    tooltipVisible: false,
    displayedValue: "",
    potentialLabelWidthArr: [],
    autoLabelWidth: computed(() => api2.computedAutoLabelWidth()),
    hideRequiredAsterisk: computed(() => api2.computedHideRequiredAsterisk()),
    validateIcon: computed(() => api2.computedValidateIcon()),
    isErrorInline: computed(() => api2.computedIsErrorInline()),
    isErrorBlock: computed(() => api2.computedIsErrorBlock()),
    isDisplayOnly: computed(() => props.displayOnly),
    hasRequired: computed(() => {
      if (props.rules) {
        return Object.values(props.rules).find(ruleOrRules => {
          if (Array.isArray(ruleOrRules)) {
            return ruleOrRules.some(r => r.required);
          } else {
            return ruleOrRules.required;
          }
        });
      } else {
        return false;
      }
    }),
    labelWidth: computed(() => {
      var _a;
      return props.labelWidth || ((_a = designConfig == null ? void 0 : designConfig.state) == null ? void 0 : _a.labelWidth) || "84px";
    }),
    tooltipType: computed(() => {
      var _a;
      return ((_a = designConfig == null ? void 0 : designConfig.state) == null ? void 0 : _a.tooltipType) || "normal";
    })
  });
  Object.assign(api2, {
    state,
    updateTip: updateTip({
      props,
      state
    }),
    computedAutoLabelWidth: computedAutoLabelWidth({
      state
    }),
    computedHideRequiredAsterisk: computedHideRequiredAsterisk({
      props,
      designConfig
    }),
    computedValidateIcon: computedValidateIcon({
      props,
      designConfig
    }),
    computedIsErrorInline: computedIsErrorInline({
      props,
      designConfig
    }),
    computedIsErrorBlock: computedIsErrorBlock({
      props,
      designConfig
    }),
    created: created({
      parent,
      state
    }),
    resetFields: resetFields({
      props,
      state
    }),
    clearValidate: clearValidate(state),
    validate: validate({
      props,
      state
    }),
    validateField: validateField(state),
    getLabelWidthIndex: getLabelWidthIndex(state),
    registerLabelWidth: registerLabelWidth({
      api: api2,
      state
    }),
    deregisterLabelWidth: deregisterLabelWidth({
      api: api2,
      state
    }),
    watchRules: watchRules({
      api: api2,
      props,
      state
    }),
    showTooltip: showTooltip({
      vm,
      state
    }),
    hideTooltip: hideTooltip({
      state
    })
  });
  api2.created();
  provide("form", parent);
  provide("showAutoWidth", state.showAutoWidth);
  const unbindDialogEvent = bindDialogEvent({
    api: api2,
    dialog,
    state
  });
  onBeforeUnmount(unbindDialogEvent);
  watch(() => props.rules, api2.watchRules);
  return api2;
};
export { api, renderless };