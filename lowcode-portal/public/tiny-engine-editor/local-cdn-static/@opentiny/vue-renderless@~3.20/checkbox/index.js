import "../chunk-G2ADBYYC.js";
import { isNull } from './../common/type.js';
const addToStore = ({
  state,
  props
}) => () => {
  if (Array.isArray(state.model) && !state.model.includes(props.label)) {
    state.model.push(props.label);
  } else {
    state.model = props.trueLabel || true;
  }
};
const removeFromStore = ({
  state,
  props
}) => () => {
  if (Array.isArray(state.model)) {
    const index = state.model.indexOf(props.label);
    index !== -1 && state.model.splice(index, 1);
  } else {
    state.model = props.falseLabel !== void 0 && props.falseLabel;
  }
};
const handleChange = ({
  state,
  props,
  emit,
  nextTick,
  dispatch,
  constants
}) => event => {
  if (state.isLimitExceeded) {
    return;
  }
  let moduleValue;
  const {
    trueLabel,
    falseLabel
  } = props;
  if (event.target.checked) {
    moduleValue = trueLabel === void 0 ? true : trueLabel;
  } else {
    moduleValue = falseLabel === void 0 ? false : falseLabel;
  }
  emit("change", moduleValue, event);
  nextTick(() => {
    state.isGroup && dispatch(constants.CHECKBOX_GROUP, "change", [state.checkboxGroup.modelValue]);
  });
};
const computedGetModelGet = ({
  state,
  props
}) => () => {
  const model = state.isGroup ? state.store : props.modelValue !== void 0 ? props.modelValue : state.selfModel;
  return isNull(model) ? state.isGroup ? [] : "" : model;
};
const computedGetModelSet = ({
  state,
  dispatch,
  emit,
  constants
}) => value => {
  if (state.isGroup) {
    state.isLimitExceeded = false;
    state.checkboxGroup.min !== void 0 && value.length < state.checkboxGroup.min && (state.isLimitExceeded = true);
    state.checkboxGroup.max !== void 0 && value.length > state.checkboxGroup.max && (state.isLimitExceeded = true);
    state.isLimitExceeded === false && dispatch(constants.CHECKBOX_GROUP, "update:modelValue", [value]);
  } else {
    emit("update:modelValue", value);
    state.selfModel = value;
  }
};
const computedIsChecked = ({
  state,
  props
}) => () => {
  if (typeof state.model === "boolean") {
    return state.model;
  } else if (Array.isArray(state.model)) {
    return state.model.includes(props.label);
  } else if (!isNull(state.model)) {
    return state.model === props.trueLabel;
  }
  return false;
};
const computedIsGroup = ({
  state,
  parent,
  constants
}) => () => {
  let parentObj = parent.$parent;
  while (parentObj) {
    if (parentObj.$options.componentName !== constants.CHECKBOX_GROUP) {
      parentObj = parentObj.$parent;
    } else {
      state.checkboxGroup = parentObj;
      return true;
    }
  }
  return false;
};
const computedStore = ({
  state,
  props
}) => () => state.checkboxGroup ? state.checkboxGroup.modelValue : props.modelValue;
const computedIsLimitDisabled = state => () => {
  const {
    max,
    min
  } = state.checkboxGroup;
  return !!(max || min) && state.model.length >= max && !state.isChecked || state.model.length <= min && state.isChecked;
};
const computedIsDisabled = ({
  state,
  props
}) => () => (state.isGroup ? state.checkboxGroup.disabled || state.checkboxGroup.displayOnly || props.disabled || props.displayOnly || state.isLimitDisabled : props.disabled) || state.formDisabled;
const computedFormItemSize = props => () => (props.formItem || {}).formItemSize;
const computedCheckboxSize = ({
  state,
  props,
  formItemSize
}) => () => {
  const tempCheckboxSize = props.size || formItemSize.value;
  return state.isGroup ? state.checkboxGroup.state.checkboxGroupSize || tempCheckboxSize : tempCheckboxSize;
};
const mounted = ({
  props,
  emit,
  api,
  parent
}) => () => {
  props.checked && api.addToStore();
  props.indeterminate && parent.$el.setAttribute("aria-controls", props.controls);
  emit("complete", true);
};
const toggleEvent = ({
  parent,
  props,
  type
}) => {
  const inputEl = parent.$el;
  for (let ev in props.events) {
    inputEl[type + "EventListener"](ev, props.events[ev]);
  }
};
const computedIsDisplayOnly = ({
  state,
  props
}) => () => props.displayOnly || state.formDisplayOnly;
const computedIsGroupDisplayOnly = ({
  state
}) => () => state.isGroup && (state.checkboxGroup.displayOnly || state.formDisplayOnly);
const computedDisplayLabel = ({
  state,
  props,
  t
}) => () => {
  state.showLabel = true;
  if (props.trueLabel !== void 0 && props.falseLabel !== void 0) {
    return props.modelValue;
  } else {
    return props.modelValue ? t("yes") : t("no");
  }
};
const computedIsShowText = ({
  props
}) => () => !isNull(props.text) || !isNull(props.label);
const computedShowText = ({
  props
}) => () => {
  if (props.text || !isNull(props.text)) {
    return props.text;
  } else {
    return props.label;
  }
};
export { addToStore, computedCheckboxSize, computedDisplayLabel, computedFormItemSize, computedGetModelGet, computedGetModelSet, computedIsChecked, computedIsDisabled, computedIsDisplayOnly, computedIsGroup, computedIsGroupDisplayOnly, computedIsLimitDisabled, computedIsShowText, computedShowText, computedStore, handleChange, mounted, removeFromStore, toggleEvent };