import "../chunk-G2ADBYYC.js";
import { on, off } from './../common/deps/dom.js';
import PopupManager from './../common/deps/popup-manager.js';
import { isObject, typeOf } from './../common/type.js';
const emitInput = ({
  emit
}) => (...args) => {
  emit("update:modelValue", ...args);
  emit("input", ...args);
};
const handleChange = ({
  emit,
  state
}) => event => {
  const value = event.target.value;
  emit("change", state.searchValue, value);
};
const handleInput = ({
  api,
  props,
  state
}) => event => {
  const value = event.target ? event.target.value : event;
  api.emitInput(value, state.searchValue);
};
const showSelector = ({
  vm,
  state
}) => () => {
  vm.$refs.selector.style.zIndex = PopupManager.nextZIndex();
  state.show = true;
};
const changeKey = ({
  emit,
  state
}) => key => {
  state.searchValue = key;
  state.show = false;
  emit("select", key);
};
const searchClick = ({
  emit,
  props,
  state
}) => event => {
  event.preventDefault();
  if (props.mini && state.collapse) {
    state.collapse = false;
  } else {
    emit("search", state.searchValue, state.currentValue);
  }
};
const searchEnterKey = ({
  api,
  props,
  vm,
  nextTick
}) => event => {
  if (props.isEnterSearch) {
    api.searchClick(event);
    nextTick(() => vm.$refs.input.blur());
  }
};
const clickOutside = ({
  parent,
  props,
  state
}) => event => {
  if (!parent.$el.contains(event.target)) {
    state.show = false;
    props.mini && !state.currentValue && (state.collapse = true);
  }
};
const setDefaultType = (searchTypes, typeValue) => {
  if (typeValue && searchTypes.includes(typeValue)) {
    return typeValue;
  }
  let type = {};
  for (let i = 0, len = searchTypes.length; i < len; i++) {
    if (isObject(searchTypes[i]) && typeOf(searchTypes[i].value) !== "undefined" && typeOf(searchTypes[i].text) !== "undefined") {
      type = searchTypes[i];
      break;
    }
  }
  return type;
};
const formatSearchTypes = searchTypes => {
  const types = [];
  for (let i = 0, len = searchTypes.length; i < len; i++) {
    if (isObject(searchTypes[i]) && typeOf(searchTypes[i].value) !== "undefined" && typeOf(searchTypes[i].text) !== "undefined") {
      types.push(searchTypes[i]);
    }
  }
  return types;
};
const mounted = ({
  api
}) => () => {
  on(document.body, "click", api.clickOutside);
};
const beforeDestroy = ({
  api
}) => () => {
  off(document.body, "click", api.clickOutside);
};
const clear = ({
  api,
  emit,
  vm,
  state
}) => event => {
  event.preventDefault();
  state.currentValue = "";
  vm.$refs.input.focus();
  state.focus = true;
  api.emitInput("", state.searchValue);
  emit("change", [], "");
  emit("clear");
};
export { beforeDestroy, changeKey, clear, clickOutside, emitInput, formatSearchTypes, handleChange, handleInput, mounted, searchClick, searchEnterKey, setDefaultType, showSelector };