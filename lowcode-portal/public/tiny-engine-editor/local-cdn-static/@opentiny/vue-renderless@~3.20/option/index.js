import "../chunk-G2ADBYYC.js";
import { getObj } from './../common/object.js';
const escapeRegexpString = (value = "") => String(value).replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
const isEqual = ({
  select,
  state
}) => (a, b) => {
  if (!state.isObject) {
    return a === b;
  } else {
    const valueKey = select.valueKey;
    return getObj(a, valueKey) === getObj(b, valueKey);
  }
};
const contains = ({
  select,
  state
}) => (arr = [], target = null) => {
  if (!state.isObject) {
    return arr && arr.includes(target);
  } else {
    const valueKey = select.valueKey;
    return arr && arr.some(item => {
      return getObj(item, valueKey) === getObj(target, valueKey);
    });
  }
};
const handleGroupDisabled = ({
  state,
  vm
}) => val => {
  state.groupDisabled = val;
  vm.groupDisabled = val;
};
const hoverItem = ({
  select,
  props,
  state
}) => () => {
  if (!props.disabled && !state.groupDisabled && !select.state.disabledOptionHover) {
    select.state.hoverIndex = select.state.optionIndexArr.indexOf(state.index);
  }
};
const selectOptionClick = ({
  props,
  state,
  select,
  constants,
  vm
}) => () => {
  if (props.disabled !== true && state.groupDisabled !== true) {
    if (select.multiple && props.required === true) return;
    select.state.selectEmitter.emit(constants.EVENT_NAME.handleOptionClick, vm, true);
  }
};
const queryChange = ({
  select,
  props,
  state
}) => query => {
  const oldVisible = state.visible;
  const newVisible = state.currentLabel.toLowerCase().includes(query.toLowerCase()) || !!props.created;
  if (oldVisible !== newVisible) {
    state.visible = newVisible;
    select.state.filteredOptionsCount += newVisible ? 1 : -1;
  }
};
const toggleEvent = ({
  props,
  vm,
  type
}) => {
  const optionEl = vm.$refs.option;
  for (let ev in props.events) {
    optionEl[type + "EventListener"](ev, props.events[ev]);
  }
};
const initValue = ({
  select,
  props,
  constants,
  vm
}) => () => {
  if (select.multiple && props.required) {
    select.state.selectEmitter.emit(constants.EVENT_NAME.initValue, vm);
  }
};
export { contains, escapeRegexpString, handleGroupDisabled, hoverItem, initValue, isEqual, queryChange, selectOptionClick, toggleEvent };