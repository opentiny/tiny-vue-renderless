import { __spreadProps, __spreadValues } from "../chunk-G2ADBYYC.js";
import { isNull } from './../common/type.js';
const handelIconClick = ({
  emit
}) => (item, index, event) => {
  if (item.disabled) return;
  emit("icon-click", item, index, event);
};
const handleChange = ({
  constants,
  dispatch,
  emit,
  state,
  nextTick
}) => () => {
  nextTick(() => {
    emit("change", state.model);
    state.isGroup && dispatch(constants.COLUMN_GROUP, "change", [state.model]);
  });
};
const getIsGroup = ({
  constants,
  parent: $parent,
  state
}) => () => {
  let parent = $parent;
  while (parent) {
    if (parent.$options.componentName !== constants.COLUMN_GROUP) {
      parent = parent.$parent;
    } else {
      state.columnGroup = parent;
      return true;
    }
  }
  return false;
};
const getSize = ({
  props,
  state
}) => () => state.isGroup ? state.columnGroup.size || props.size : props.size;
const isDisabled = ({
  props,
  state
}) => () => props.disabled || state.columnGroup.disabled;
const getModel = ({
  props,
  state
}) => () => {
  const model = state.isGroup ? state.store : props.modelValue !== void 0 ? props.modelValue : state.selfModel;
  if (state.showCheckbox) {
    return isNull(model) ? [] : model;
  } else {
    return state.store;
  }
};
const setModel = ({
  constants,
  dispatch,
  emit,
  state
}) => val => {
  if (state.isGroup) {
    dispatch(constants.COLUMN_GROUP, "update:modelValue", [val]);
  } else {
    emit("update:modelValue", val);
    state.showCheckbox && (state.selfModel = val);
  }
};
const computedStore = ({
  state,
  props
}) => () => state.isGroup ? state.columnGroup.modelValue : props.modelValue;
const getItemChecked = ({
  props,
  state
}) => () => {
  if (!state.showCheckbox || !state.showRadio) return;
  if (state.showCheckbox) {
    return state.isGroup || Array.isArray(state.model) ? ~state.model.indexOf(props.label) : state.model;
  } else {
    return state.model === props.label;
  }
};
const computedOptions = ({
  props
}) => () => {
  return props.options.filter(item => {
    const hidden = typeof item.hidden === "function" ? item.hidden(props.data) : item.hidden;
    return !hidden;
  }).map(opt => {
    return __spreadProps(__spreadValues({}, opt), {
      disabled: typeof opt.disabled === "function" ? opt.disabled(props.data) : opt.disabled
    });
  });
};
const getType = ({
  props,
  state
}) => () => state.isGroup ? state.columnGroup.type || props.type : props.type;
export { computedOptions, computedStore, getIsGroup, getItemChecked, getModel, getSize, getType, handelIconClick, handleChange, isDisabled, setModel };