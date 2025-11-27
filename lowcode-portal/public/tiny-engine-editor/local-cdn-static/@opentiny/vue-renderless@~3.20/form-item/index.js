import "../chunk-G2ADBYYC.js";
import { POSITION, VALIDATE_STATE } from './../common/index.js';
import { omitText } from './../common/string.js';
import { merge } from './../common/object.js';
import Validator from './../common/validate/index.js';
import { isNull } from './../common/type.js';
import debounce from './../common/deps/debounce.js';
const watchError = state => value => {
  if (!isNull(value) && state.getValidateType === "tip") {
    state.canShowTip = true;
  }
  state.validateMessage = value;
  state.validateState = value ? VALIDATE_STATE.Error : "";
};
const watchValidateStatus = state => value => {
  state.validateState = value;
};
const computedGetValidateType = ({
  props,
  state
}) => () => props.validateType || (state.formInstance ? state.formInstance.validateType : "");
const computedValidateIcon = ({
  props,
  state
}) => () => {
  var _a, _b, _c, _d;
  return (_d = (_c = props.validateIcon) != null ? _c : (_b = (_a = state == null ? void 0 : state.formInstance) == null ? void 0 : _a.state) == null ? void 0 : _b.validateIcon) != null ? _d : null;
};
const computedIsErrorInline = ({
  props,
  state
}) => () => {
  var _a, _b, _c;
  if (props.messageType) {
    return props.messageType === "inline";
  }
  if (typeof props.inlineMessage === "boolean") {
    return props.inlineMessage;
  }
  return (_c = (_b = (_a = state == null ? void 0 : state.formInstance) == null ? void 0 : _a.state) == null ? void 0 : _b.isErrorInline) != null ? _c : false;
};
const computedIsErrorBlock = ({
  props,
  state
}) => () => {
  var _a, _b, _c;
  if (props.messageType) {
    return props.messageType === "block";
  }
  return (_c = (_b = (_a = state == null ? void 0 : state.formInstance) == null ? void 0 : _a.state) == null ? void 0 : _b.isErrorBlock) != null ? _c : false;
};
const computedLabelStyle = ({
  props,
  state
}) => () => {
  const result = {
    width: ""
  };
  if (state.form.labelPosition === POSITION.Top) {
    return result;
  }
  const labelWidth = props.labelWidth || state.form.state.labelWidth;
  if (labelWidth) {
    result.width = labelWidth;
  }
  return result;
};
const computedValueStyle = ({
  props,
  state
}) => () => {
  const result = {
    width: ""
  };
  if (state.form.labelPosition === POSITION.Top) {
    result.width = "100%";
    return result;
  }
  const labelWidth = props.labelWidth || state.form.state.labelWidth;
  if (labelWidth) {
    if (labelWidth === "auto") {
      result.width = labelWidth;
    } else {
      result.width = `calc(100% - ${labelWidth})`;
    }
  }
  return result;
};
const computedContentStyle = ({
  props,
  state
}) => () => {
  const result = {};
  const label = props.label;
  if (state.form.labelPosition === POSITION.Top || state.form.inline) {
    return result;
  }
  if (!label && !props.labelWidth && state.isNested) {
    return result;
  }
  const labelWidth = props.labelWidth || state.form.state.labelWidth;
  if (labelWidth === "auto") {
    if (props.labelWidth === "auto") {
      result.marginLeft = state.computedLabelWidth;
    } else if (state.form.state.labelWidth === "auto") {
      result.marginLeft = state.formInstance.state.autoLabelWidth;
    }
  } else {
    result.marginLeft = labelWidth;
  }
  return result;
};
const computedForm = ({
  constants,
  vm,
  state
}) => () => {
  var _a, _b, _c;
  const {
    FORM_NAME,
    FORM_ITEM_NAME
  } = constants;
  let parent = (_a = vm.$parent) == null ? void 0 : _a.$parent;
  let parentName = (_b = parent == null ? void 0 : parent.$options) == null ? void 0 : _b.componentName;
  while (parent && parentName !== FORM_NAME) {
    if (parentName === FORM_ITEM_NAME) {
      state.isNested = true;
    }
    parent = parent == null ? void 0 : parent.$parent;
    parentName = (_c = parent == null ? void 0 : parent.$options) == null ? void 0 : _c.componentName;
  }
  return parent;
};
const computedIsRequired = ({
  api,
  state
}) => () => {
  if (state.validationRequired) {
    return true;
  }
  let rules = api.getRules();
  let isRequired = false;
  if (rules && rules.length) {
    rules.every(rule => {
      if (rule.required) {
        isRequired = true;
        return false;
      }
      return true;
    });
  }
  return isRequired;
};
const getPropByPath = (obj, path, strict) => {
  let findObj = obj;
  path = path.replace(/\[(\w+)\]/g, ".$1");
  path = path.replace(/^\./, "");
  let index = 0;
  let keys = path.split(".");
  for (let len = keys.length; index < len - 1; ++index) {
    if (!findObj && !strict) {
      break;
    }
    let key = keys[index];
    if (findObj && key in findObj) {
      findObj = findObj[key];
    } else {
      if (strict) {
        throw new Error("[Tiny Form] please transfer a valid prop path to form item!");
      }
      break;
    }
  }
  return {
    o: findObj,
    k: keys[index],
    v: findObj ? findObj[keys[index]] : null
  };
};
const computedFieldValue = ({
  props,
  state
}) => () => {
  const model = state.form.model;
  if (!model || !props.prop) {
    return;
  }
  let path = props.prop;
  if (path.includes(":")) {
    path = path.replace(/:/, ".");
  }
  return getPropByPath(model, path, true).v;
};
const mounted = ({
  api,
  vm,
  props,
  state
}) => () => {
  const tooltip = vm.$refs.tooltip;
  if (tooltip) {
    const content = vm.$refs.content;
    tooltip.state.referenceElm = state.isMultiple ? content : content == null ? void 0 : content.children[0];
    state.tooltip = tooltip;
  }
  if (props.prop) {
    api.dispatch("Form", "form:addField", vm);
    let initialValue = state.fieldValue;
    if (Array.isArray(initialValue)) {
      initialValue = [].concat(initialValue);
    }
    state.initialValue = initialValue;
    api.addValidateEvents();
  }
};
const unmounted = ({
  api,
  vm,
  state
}) => () => {
  state.canShowTip = false;
  api.dispatch("Form", "form:removeField", vm);
  api.removeValidateEvents();
};
const validate = ({
  api,
  props,
  state,
  t
}) => (trigger, callback = () => void 0) => {
  state.validateDisabled = false;
  const rules = api.getFilteredRule(trigger);
  if ((!rules || rules.length === 0) && props.required === void 0 || props.validateDisabled) {
    callback();
    return;
  }
  state.validateState = VALIDATE_STATE.Validating;
  const descriptor = {};
  if (rules && rules.length > 0) {
    rules.forEach(rule => {
      delete rule.trigger;
    });
  }
  descriptor[props.prop || ""] = rules;
  const validator = new Validator(descriptor, t);
  const model = {};
  model[props.prop || ""] = state.fieldValue;
  validator.validate(model, {
    firstFields: true
  }, (errors, invalidFields) => {
    api.clearValidate();
    const handlerError = () => {
      state.validateState = !errors ? VALIDATE_STATE.Success : VALIDATE_STATE.Error;
      if (errors && props.error) {
        errors[0].message = props.error;
      }
      state.validateMessage = errors ? errors[0].message : "";
      state.canShowTip = Boolean(errors);
      callback(state.validateMessage, invalidFields);
      state.formInstance && state.formInstance.$emit("validate", props.prop, !errors, state.validateMessage || null);
    };
    handlerError();
  });
};
const clearValidate = state => () => {
  state.validateState = "";
  state.validateMessage = "";
  state.validateDisabled = false;
};
const resetField = ({
  api,
  nextTick,
  props,
  state
}) => () => {
  if (state.getValidateType === "tip") {
    state.canShowTip = false;
  }
  state.validateState = "";
  state.validateMessage = "";
  let model = state.form.model || {};
  let value = state.fieldValue;
  let path = props.prop || "";
  if (path && path.includes(":")) {
    path = path.replace(/:/, ".");
  }
  let prop = getPropByPath(model, path, true);
  state.validateDisabled = true;
  if (Array.isArray(value)) {
    prop.o[prop.k] = [].concat(state.initialValue);
  } else {
    prop.o[prop.k] = state.initialValue;
  }
  nextTick(() => {
    state.validateDisabled = false;
  });
  setTimeout(() => state.validateState && (state.validateState = ""));
  api.broadcast("timeSelect", "fieldReset", state.initialValue);
};
const getRules = ({
  props,
  state
}) => () => {
  let formRules = state.form.rules || {};
  const selfRules = props.rules;
  const requiredRule = props.required !== void 0 ? {
    required: Boolean(props.required)
  } : [];
  const prop = getPropByPath(formRules, props.prop || "");
  formRules = formRules ? prop.o[props.prop || ""] || prop.v : [];
  return [].concat(selfRules || formRules || []).concat(requiredRule);
};
const getFilteredRule = api => trigger => {
  const rules = api.getRules();
  return rules.filter(rule => {
    if (!rule.trigger || trigger === "") {
      return true;
    }
    if (Array.isArray(rule.trigger)) {
      return rule.trigger.includes(trigger);
    }
    return rule.trigger === trigger;
  }).map(rule => merge({}, rule));
};
const onFieldBlur = api => () => {
  api.validate("blur");
};
const onFieldChange = ({
  api,
  state
}) => () => {
  if (state.validateDisabled) {
    state.validateDisabled = false;
    return;
  }
  api.validate("change");
};
const updateComputedLabelWidth = state => width => {
  state.computedLabelWidth = width ? `${width}px` : "";
};
const addValidateEvents = ({
  api,
  vm,
  props,
  state
}) => () => {
  const rules = api.getRules();
  if (rules.length || props.required !== void 0) {
    const manual = props.manual || (state.formInstance ? state.formInstance.manual : false);
    if (!manual) {
      vm.$on("form.blur", api.onFieldBlur);
      vm.$on("form.change", api.onFieldChange);
    }
  }
};
const removeValidateEvents = vm => () => {
  vm.$off("form.blur");
  vm.$off("form.change");
  vm.$off("displayed-value-changed");
};
const updateTip = ({
  vm,
  state
}) => () => {
  if (state.getValidateType !== "tip" && !state.canShowTip) {
    return;
  }
  const tooltip = vm.$refs.tooltip;
  if (!tooltip) {
    return;
  }
  tooltip.updatePopper();
};
const getValueByPath = (object, prop) => {
  prop = prop || "";
  const paths = prop.split(".");
  let current = object;
  let result = null;
  for (let i = 0, len = paths.length; i < len; i++) {
    const path = paths[i];
    if (!current) {
      break;
    }
    if (i === len - 1) {
      result = current[path];
      break;
    }
    current = current[path];
  }
  return result;
};
const wrapValidate = ({
  validateFunc,
  props
}) => {
  if (props.validateDebounce) {
    return debounce(500, validateFunc);
  } else {
    return validateFunc;
  }
};
const handleMouseenter = ({
  state
}) => e => {
  if (!state.isDisplayOnly || !state.typeName || !state.form) return;
  const dom = e.target;
  const text = dom.textContent;
  const font = window.getComputedStyle(dom).font;
  const rect = dom.getBoundingClientRect();
  let res = {};
  let overHeight = false;
  if (["text", "password", "number"].includes(state.typeName)) {
    res = omitText(text, font, rect.width);
  }
  if (state.typeName === "textarea" && dom && dom.scrollHeight > dom.offsetHeight) {
    overHeight = true;
  }
  if (res.o || overHeight) {
    state.form.showTooltip(dom, state.displayedValue);
  }
};
const handleLabelMouseenter = ({
  props,
  state,
  slots
}) => e => {
  if (!state.form.overflowTitle || !state.form || slots.label) return;
  const label = e.target;
  if (label && label.scrollWidth > label.offsetWidth) {
    state.form.showTooltip(label, props.label + state.form.labelSuffix);
  }
};
const handleMouseleave = state => () => {
  state.form && state.form.hideTooltip();
};
const getDisplayedValue = ({
  state
}) => param => {
  if (!state.formInstance.displayOnly) return;
  state.typeName = param.type;
  state.isBasicComp = true;
  state.displayedValue = param.val;
};
const clearDisplayedValue = ({
  state
}) => () => {
  state.typeName = "";
  state.isBasicComp = false;
  state.displayedValue = "";
};
export { addValidateEvents, clearDisplayedValue, clearValidate, computedContentStyle, computedFieldValue, computedForm, computedGetValidateType, computedIsErrorBlock, computedIsErrorInline, computedIsRequired, computedLabelStyle, computedValidateIcon, computedValueStyle, getDisplayedValue, getFilteredRule, getPropByPath, getRules, getValueByPath, handleLabelMouseenter, handleMouseenter, handleMouseleave, mounted, onFieldBlur, onFieldChange, removeValidateEvents, resetField, unmounted, updateComputedLabelWidth, updateTip, validate, watchError, watchValidateStatus, wrapValidate };