import { __spreadProps, __spreadValues } from "../chunk-G2ADBYYC.js";
import { find } from './../common/array.js';
import { getObj, isEqual } from './../common/object.js';
import { isKorean } from './../common/string.js';
import scrollIntoView from './../common/deps/scroll-into-view.js';
import PopupManager from './../common/deps/popup-manager.js';
import debounce from './../common/deps/debounce.js';
import { getDataset } from './../common/dataset/index.js';
import Memorize from './../common/deps/memorize.js';
import { isEmptyObject } from './../common/type.js';
import { addResizeListener, removeResizeListener } from './../common/deps/resize-event.js';
import { extend } from './../common/object.js';
import { BROWSER_NAME } from './../common/index.js';
import browserInfo from './../common/browser.js';
import { isNull } from './../common/type.js';
import { fastdom } from './../common/deps/fastdom/index.js';
import { deepClone } from './../picker-column/index.js';
import { escapeRegexpString } from './../option/index.js';
const handleComposition = ({
  api,
  nextTick,
  state
}) => event => {
  const text = event.target.value;
  if (event.type === "compositionend") {
    state.isOnComposition = false;
    const isChange = false;
    const isInput = true;
    nextTick(() => api.handleQueryChange(text, isChange, isInput));
  } else {
    const lastCharacter = text[text.length - 1] || "";
    state.isOnComposition = !isKorean(lastCharacter);
  }
};
const showTip = ({
  props,
  state,
  vm
}) => show => {
  if (!props.showOverflowTooltip) {
    return;
  }
  let overflow;
  if (!show) {
    clearTimeout(state.tipTimer);
    state.tipTimer = setTimeout(() => {
      state.showTip = state.tipHover;
    }, vm.$refs.popover.closeDelay);
  } else {
    if (!props.multiple) {
      const reference = vm.$refs.reference.$el;
      overflow = reference.querySelector("input").scrollWidth > reference.scrollWidth;
    } else {
      overflow = vm.$refs.tags.scrollHeight > vm.$refs.tags.getBoundingClientRect().height;
    }
    state.showTip = show && overflow && !!state.tips && !state.visible;
  }
};
const defaultOnQueryChange = ({
  props,
  state,
  constants,
  api,
  nextTick
}) => (value, isInput) => {
  if (props.remote && (typeof props.remoteMethod === "function" || typeof props.initQuery === "function")) {
    state.hoverIndex = -1;
    props.remoteMethod && props.remoteMethod(value, props.extraQueryParams);
  } else if (typeof props.filterMethod === "function") {
    props.filterMethod(value);
    state.selectEmitter.emit(constants.COMPONENT_NAME.OptionGroup, constants.EVENT_NAME.queryChange);
  } else {
    api.queryChange(value, isInput);
  }
  setFilteredSelectCls(nextTick, state, props);
  api.getOptionIndexArr();
  state.magicKey = state.magicKey > 0 ? -1 : 1;
};
const queryChange = ({
  props,
  state,
  constants
}) => (value, isInput) => {
  if (props.optimization && isInput) {
    const filterDatas = state.initDatas.filter(item => new RegExp(escapeRegexpString(value), "i").test(item.label));
    state.datas = filterDatas;
  } else {
    state.selectEmitter.emit(constants.EVENT_NAME.queryChange, value);
  }
};
const setFilteredSelectCls = (nextTick, state, props) => {
  nextTick(() => {
    if (props.multiple && props.showAlloption && props.filterable && state.query && !props.remote) {
      const filterSelectedVal = state.options.filter(item => item.state.visible && item.state.itemSelected).map(opt => opt.value);
      const visibleOptions = state.options.filter(item => item.state.visible);
      if (filterSelectedVal.length === visibleOptions.length) {
        state.filteredSelectCls = "checked-sur";
      } else if (filterSelectedVal.length === 0) {
        state.filteredSelectCls = "check";
      } else {
        state.filteredSelectCls = "halfselect";
      }
    }
  });
};
const handleQueryChange = ({
  api,
  constants,
  nextTick,
  props,
  vm,
  state
}) => (value, isChange = false, isInput = false) => {
  if (state.previousQuery === value && !isChange || state.isOnComposition) {
    return;
  }
  if (state.previousQuery === null && !isChange && (typeof props.filterMethod === "function" || typeof props.remoteMethod === "function" || typeof props.initQuery === "function")) {
    state.previousQuery = value;
    return;
  }
  state.query = value;
  state.previousQuery = value;
  window.requestAnimationFrame(() => {
    if (state.visible) {
      state.selectEmitter.emit(constants.EVENT_NAME.updatePopper);
      state.showWarper = true;
    }
  });
  state.hoverIndex = -1;
  if (props.multiple && props.filterable && !props.shape) {
    nextTick(() => {
      const length = vm.$refs.input.value.length * 15 + 20;
      state.inputLength = state.collapseTags ? Math.min(50, length) : length;
      api.managePlaceholder();
      api.resetInputHeight();
    });
  }
  state.triggerSearch = true;
  api.defaultOnQueryChange(value, isInput);
};
const scrollToOption = ({
  vm,
  constants
}) => option => {
  const target = Array.isArray(option) && option[0] && option[0].state ? option[0].state.el : option.state ? option.state.el : "";
  if (vm.$refs.popper && target) {
    const menu = vm.$refs.popper.$el.querySelector(constants.CLASS.SelectDropdownWrap);
    setTimeout(() => scrollIntoView(menu, target));
  }
  vm.$refs.scrollbar && vm.$refs.scrollbar.handleScroll();
};
const handleMenuEnter = ({
  api,
  nextTick,
  state,
  props
}) => () => {
  if (!props.optimization) {
    nextTick(() => api.scrollToOption(state.selected));
  }
};
const emitChange = ({
  emit,
  props,
  state,
  constants
}) => (value, changed) => {
  if (state.device === "mb" && props.multiple && !changed) return;
  if (!isEqual(props.modelValue, state.compareValue)) {
    emit("change", value);
  }
};
const directEmitChange = ({
  emit,
  props,
  state
}) => (value, key) => {
  if (state.device === "mb" && props.multiple) return;
  emit("change", value, key);
};
const getOption = ({
  props,
  state,
  api
}) => value => {
  let option;
  const isObject = Object.prototype.toString.call(value).toLowerCase() === "[object object]";
  const isNull2 = Object.prototype.toString.call(value).toLowerCase() === "[object null]";
  const isUndefined = Object.prototype.toString.call(value).toLowerCase() === "[object undefined]";
  if (state.cachedOptions.length !== 0) {
    for (let i = state.cachedOptions.length - 1; i >= 0; i--) {
      const cachedOption = state.cachedOptions[i];
      const isEqual2 = isObject ? getObj(cachedOption.value, props.valueKey) === getObj(value, props.valueKey) : cachedOption.value === value;
      if (isEqual2) {
        option = cachedOption;
        break;
      }
    }
    if (option) {
      return option;
    }
  } else if (!isEmptyObject(state.selected)) {
    return state.selected;
  }
  if (props.optimization) {
    option = api.getSelectedOption(value);
    if (option) {
      return {
        value: option.value,
        currentLabel: option.label || option.currentLabel
      };
    }
    option = state.datas.find(v => getObj(v, props.valueKey) === value);
    if (option) {
      return {
        value: option.value,
        currentLabel: option.label || option.currentLabel
      };
    }
  }
  const label = !isObject && !isNull2 && !isUndefined && !props.clearNoMatchValue ? value : "";
  let newOption = {
    value,
    currentLabel: label
  };
  if (props.multiple) {
    newOption.hitState = false;
  }
  return newOption;
};
const getSelectedOption = ({
  props,
  state
}) => value => {
  let option;
  if (props.multiple) {
    option = state.selected.find(v => getObj(v, props.valueKey) === value);
  } else {
    if (!isEmptyObject(state.selected) && getObj(state.selected, props.valueKey) === value) {
      option = state.selected;
    }
  }
  return option;
};
const getOptionOfSetSelected = ({
  api,
  props
}) => {
  const option = api.getOption(props.modelValue) || {};
  if (!option.state) {
    option.state = {};
  }
  if (option.created) {
    option.createdLabel = option.state.currentLabel;
    option.createdSelected = true;
  } else {
    option.createdSelected = false;
  }
  if (!option.state.currentLabel) {
    api.clearNoMatchValue("");
  }
  return option;
};
const getResultOfSetSelected = ({
  state,
  api,
  props
}) => {
  let result = [];
  const newModelValue = [];
  if (Array.isArray(state.modelValue)) {
    state.modelValue.forEach(value => {
      const option = api.getOption(value);
      if (!props.clearNoMatchValue || props.clearNoMatchValue && option.label) {
        result.push(option);
        newModelValue.push(value);
      }
    });
  }
  api.clearNoMatchValue(newModelValue);
  return result;
};
const setSelected = ({
  api,
  nextTick,
  props,
  vm,
  state
}) => () => {
  var _a, _b, _c, _d;
  if (!props.multiple) {
    const option = getOptionOfSetSelected({
      api,
      props
    });
    state.selected = option;
    state.selectedLabel = option.state.currentLabel || option.currentLabel;
    props.filterable && !props.shape && (state.query = state.selectedLabel);
  } else {
    const result = getResultOfSetSelected({
      state,
      props,
      api
    });
    state.selectCls = result.length ? result.length === state.options.length ? "checked-sur" : "halfselect" : "check";
    if (!((_b = (_a = state.selected) == null ? void 0 : _a[0]) == null ? void 0 : _b.isTree) && !((_d = (_c = state.selected) == null ? void 0 : _c[0]) == null ? void 0 : _d.isGrid)) {
      state.selected = result;
    }
    state.selected.length && (state.selectedLabel = "");
    state.tips = state.selected.map(item => item.state ? item.state.currentLabel : item.currentLabel).join(",");
    setFilteredSelectCls(nextTick, state, props);
    nextTick(api.resetInputHeight);
  }
};
const getPluginOption = ({
  props,
  state
}) => value => {
  const isRemote = props.filterable && props.remote && (typeof props.remoteMethod === "function" || typeof props.initQuery === "function");
  const {
    textField,
    valueField
  } = props;
  const sourceData = isRemote ? state.remoteData : state.gridData;
  const selNode = find(sourceData, item => item[valueField] === value);
  const items = [];
  if (selNode) {
    selNode.currentLabel = selNode[textField];
    items.push(selNode);
  }
  return items;
};
const toggleCheckAll = ({
  api,
  state
}) => filtered => {
  let value = [];
  const enabledValues = state.options.filter(op => !op.state.disabled && !op.state.groupDisabled && !op.required && op.state.visible).map(op => op.value);
  if (filtered) {
    if (state.filteredSelectCls === "check" || state.filteredSelectCls === "halfselect") {
      value = [... /* @__PURE__ */new Set([...state.modelValue, ...enabledValues])];
    } else {
      value = state.modelValue.filter(val => !enabledValues.includes(val));
    }
  } else {
    if (state.selectCls === "check") {
      value = enabledValues;
    } else if (state.selectCls === "halfselect") {
      const unchecked = state.options.filter(item => !item.state.disabled && item.state.selectCls === "check");
      unchecked.length ? value = enabledValues : value = [];
    } else if (state.selectCls === "checked-sur") {
      value = [];
    }
  }
  const requiredValue = state.options.filter(op => op.required).map(op => op.value);
  const disabledSelectedValues = state.options.filter(op => (op.state.disabled || op.state.groupDisabled) && op.state.selectCls === "checked-sur").map(op => op.value);
  value = [...value, ...requiredValue, ...disabledSelectedValues];
  api.setSoftFocus();
  state.isSilentBlur = true;
  api.updateModelValue(value);
  api.directEmitChange(value);
};
const handleFocus = ({
  emit,
  props,
  state
}) => event => {
  if (!state.softFocus) {
    if (props.automaticDropdown || props.filterable) {
      state.visible = true;
      state.softFocus = true;
    }
    emit("focus", event);
  } else {
    if (state.searchSingleCopy && state.selectedLabel) {
      emit("focus", event);
    }
    state.softFocus = false;
  }
};
const focus = ({
  vm,
  state
}) => () => {
  if (!state.softFocus) {
    vm.$refs.reference.focus();
  }
};
const blur = ({
  vm,
  state
}) => () => {
  state.visible = false;
  vm.$refs.reference.blur();
};
const handleBlur = ({
  constants,
  dispatch,
  emit,
  state,
  designConfig
}) => event => {
  var _a;
  clearTimeout(state.timer);
  state.timer = setTimeout(() => {
    var _a2;
    if (state.isSilentBlur) {
      state.isSilentBlur = false;
    } else {
      emit("blur", event);
    }
    if ((_a2 = designConfig == null ? void 0 : designConfig.state) == null ? void 0 : _a2.delayBlur) {
      dispatch(constants.COMPONENT_NAME.FormItem, constants.EVENT_NAME.formBlur, event.target.value);
    }
  }, 200);
  if (!((_a = designConfig == null ? void 0 : designConfig.state) == null ? void 0 : _a.delayBlur)) {
    dispatch(constants.COMPONENT_NAME.FormItem, constants.EVENT_NAME.formBlur, event.target.value);
  }
  state.softFocus = false;
};
const handleClearClick = api => event => {
  api.deleteSelected(event);
};
const doDestroy = vm => () => {
  var _a;
  if ((_a = vm == null ? void 0 : vm.$refs) == null ? void 0 : _a.popper) {
    vm.$refs.popper.doDestroy();
  }
};
const handleClose = state => () => {
  state.visible = false;
};
const toggleLastOptionHitState = ({
  state
}) => hit => {
  if (!Array.isArray(state.selected)) {
    return;
  }
  const option = state.selected[state.selected.length - 1];
  if (!option) {
    return;
  }
  if (option.required) {
    return true;
  }
  const hitTarget = option.state || option;
  if (hit === true || hit === false) {
    hitTarget.hitState = hit;
    return hit;
  }
  hitTarget.hitState = !hitTarget.hitState;
  return hitTarget.hitState;
};
const deletePrevTag = ({
  api,
  state
}) => event => {
  if (event.target.value.length <= 0 && !api.toggleLastOptionHitState()) {
    const value = state.modelValue.slice();
    value.pop();
    state.compareValue = deepClone(value);
    api.updateModelValue(value);
    api.emitChange(value);
  }
};
const managePlaceholder = ({
  vm,
  state
}) => () => {
  if (state.currentPlaceholder !== "") {
    state.currentPlaceholder = vm.$refs.input.value ? "" : state.cachedPlaceHolder;
  }
};
const resetInputState = ({
  api,
  vm,
  state
}) => event => {
  if (event.keyCode !== 8) {
    api.toggleLastOptionHitState(false);
  }
  state.inputLength = vm.$refs.input.value.length * 15 + 20;
  api.resetInputHeight();
};
const resetInputHeight = ({
  constants,
  nextTick,
  props,
  vm,
  state,
  api,
  designConfig
}) => () => {
  if (state.collapseTags && !props.filterable) {
    return;
  }
  nextTick(() => {
    var _a;
    if (!vm.$refs.reference) {
      return;
    }
    let input = vm.$refs.reference.type === "text" && vm.$refs.reference.$el.querySelector("input");
    const tags = vm.$refs.tags;
    const limitText = vm.$refs.reference.$el.querySelector("span.tiny-select__limit-txt");
    if (!input) {
      return;
    }
    if (!state.isDisplayOnly && (props.hoverExpand || props.clickExpand) && !props.disabled) {
      api.calcCollapseTags();
    }
    const sizeInMap = (designConfig == null ? void 0 : designConfig.state.initialInputHeight) || state.initialInputHeight || 32;
    const noSelected = state.selected.length === 0;
    const spacingHeight = designConfig ? (_a = designConfig.state) == null ? void 0 : _a.spacingHeight : constants.SPACING_HEIGHT;
    if (!state.isDisplayOnly) {
      if (!noSelected && tags) {
        fastdom.measure(() => {
          const tagsClientHeight = tags.clientHeight;
          fastdom.mutate(() => {
            input.style.height = Math.max(tagsClientHeight + spacingHeight, sizeInMap) + "px";
          });
        });
      } else {
        input.style.height = noSelected ? sizeInMap + "px" : Math.max(0, sizeInMap) + "px";
      }
    } else {
      input.style.height = "auto";
    }
    if (limitText && props.multipleLimit) {
      const {
        width,
        marginLeft,
        marginRight
      } = getComputedStyle(limitText);
      vm.$refs.tags.style.paddingRight = `${Math.ceil(parseFloat(width) + parseFloat(marginLeft) + parseFloat(marginRight))}px`;
    }
    if (state.visible && state.emptyText !== false) {
      state.selectEmitter.emit(constants.EVENT_NAME.updatePopper, true);
    }
  });
};
const resetHoverIndex = ({
  props,
  state
}) => () => {
  if (!props.showOverflowTooltip) {
    state.hoverIndex = -1;
  } else if (!props.multiple) {
    state.hoverIndex = state.options.indexOf(state.selected);
  } else {
    if (state.selected.length > 0) {
      state.hoverIndex = Math.min.apply(null, state.selected.map(item => state.options.indexOf(item)));
    } else {
      state.hoverIndex = -1;
    }
  }
};
const resetDatas = ({
  props,
  state
}) => () => {
  if (props.optimization && !props.remote && !props.filterMethod) {
    state.datas = state.initDatas;
  }
};
const handleOptionSelect = ({
  api,
  nextTick,
  props,
  vm,
  state
}) => (option, byClick) => {
  state.memorize && state.memorize.updateByKey(option[state.memorize._dataKey] || option.value);
  if (props.multiple) {
    const value = (state.modelValue || []).slice();
    const optionIndex = api.getValueIndex(value, option.value);
    if (optionIndex > -1) {
      value.splice(optionIndex, 1);
    } else if (state.multipleLimit <= 0 || value.length < state.multipleLimit) {
      value.push(option.value);
    }
    state.compareValue = deepClone(value);
    api.updateModelValue(value);
    api.emitChange(value);
    if (option.created) {
      const isChange = false;
      const isInput = true;
      state.query = "";
      api.handleQueryChange("", isChange, isInput);
      state.inputLength = 20;
    }
    if (props.filterable) {
      vm.$refs.input.focus();
    }
    if (props.autoClose) {
      state.visible = false;
    }
  } else {
    state.compareValue = deepClone(option.value);
    api.updateModelValue(option.value);
    api.emitChange(option.value);
    if (option.created) {
      state.createdSelected = true;
      state.createdLabel = option.value;
    }
    state.visible = false;
  }
  state.isSilentBlur = byClick;
  api.setSoftFocus();
  if (state.visible) {
    return;
  }
  nextTick(() => {
    api.scrollToOption(option);
  });
};
const initValue = ({
  state
}) => vm => {
  const isExist = state.initValue.find(val => val === vm.value);
  !isExist && state.initValue.push(vm.value);
};
const setSoftFocus = ({
  vm,
  state
}) => () => {
  state.softFocus = true;
  const input = vm.$refs.input || vm.$refs.reference;
  if (input) {
    input.focus();
  }
  state.softFocus = false;
};
const getValueIndex = props => (arr = [], value = null) => {
  const isObject = Object.prototype.toString.call(value).toLowerCase() === "[object object]";
  if (!isObject) {
    return arr.indexOf(value);
  } else {
    const valueKey = props.valueKey;
    let index = -1;
    arr.some((item, i) => {
      if (getObj(item, valueKey) === getObj(value, valueKey)) {
        index = i;
        return true;
      }
      return false;
    });
    return index;
  }
};
const toggleMenu = ({
  vm,
  state,
  props,
  api
}) => e => {
  if (props.keepFocus && state.visible && props.filterable) {
    return;
  }
  const event = e || window.event;
  const enterCode = 13;
  const nodeName = event.target && event.target.nodeName;
  const toggleVisible = props.ignoreEnter ? event.keyCode !== enterCode && nodeName === "INPUT" : true;
  if (!props.displayOnly) {
    event.stopPropagation();
  }
  if (!state.selectDisabled) {
    toggleVisible && !state.softFocus && (state.visible = !state.visible);
    state.softFocus = false;
    if (state.visible) {
      if (!(props.filterable && props.shape)) {
        const dom = vm.$refs.input || vm.$refs.reference;
        (dom == null ? void 0 : dom.focus) && dom.focus();
        api.setOptionHighlight();
      }
    }
  }
};
const selectOption = ({
  api,
  state,
  props
}) => e => {
  if (!state.visible || props.hideDrop) {
    api.toggleMenu(e);
  } else {
    let option = "";
    if (state.query || props.remote) {
      option = state.options.find(item => item.state.index === state.hoverValue);
    } else {
      option = state.options[state.hoverIndex];
    }
    option && api.handleOptionSelect(option);
  }
};
const deleteSelected = ({
  api,
  emit,
  props,
  state
}) => event => {
  event && event.stopPropagation();
  let selectedValue = [];
  if (props.multiple) {
    const requireOptions = state.options.filter(opt => opt.required && opt.value);
    selectedValue = state.modelValue.slice().filter(v => requireOptions.find(opt => opt.value === v));
  }
  const value = props.multiple ? selectedValue : "";
  state.showTip = false;
  state.compareValue = deepClone(value);
  api.updateModelValue(value, true);
  api.emitChange(value, true);
  state.visible = false;
  emit("clear");
};
const deleteTag = ({
  api,
  constants,
  emit,
  props,
  state,
  nextTick,
  vm
}) => (event, tag) => {
  if (tag.required) return;
  const index = state.selected.indexOf(tag);
  if (index > -1 && !state.selectDisabled) {
    const value = state.modelValue.slice();
    value.splice(index, 1);
    state.compareValue = deepClone(value);
    api.updateModelValue(value);
    api.emitChange(value);
    emit(constants.EVENT_NAME.removeTag, tag[props.valueField]);
    nextTick(() => state.key++);
  }
  event && event.stopPropagation();
};
const onInputChange = ({
  api,
  props,
  state,
  constants,
  nextTick
}) => () => {
  if (!props.delay) {
    if (props.filterable && state.query !== state.selectedLabel) {
      const isChange = false;
      const isInput = true;
      state.query = state.selectedLabel;
      api.handleQueryChange(state.query, isChange, isInput);
      nextTick(() => {
        state.selectEmitter.emit(constants.EVENT_NAME.updatePopper);
      });
    }
  } else {
    api.debouncRquest();
  }
  nextTick(() => {
    state.selectEmitter.emit(constants.EVENT_NAME.updatePopper);
  });
};
const onOptionDestroy = state => index => {
  if (index > -1) {
    state.optionsCount--;
    state.filteredOptionsCount--;
    state.options.splice(index, 1);
  }
};
const resetInputWidth = ({
  vm,
  state
}) => () => {
  if (vm.$refs.reference && vm.$refs.reference.$el) {
    state.inputWidth = vm.$refs.reference.$el.getBoundingClientRect().width;
  }
};
const handleResize = ({
  api,
  props,
  state
}) => () => {
  api.resetInputWidth();
  if (props.multiple && !state.isDisplayOnly) {
    api.resetInputHeight();
  }
};
const setOptionHighlight = state => () => {
  for (let i = 0; i < state.options.length; ++i) {
    const option = state.options[i];
    if (!option.disabled && !option.groupDisabled && !option.state.created && option.state.visible && option.state.itemSelected) {
      state.hoverIndex = i;
      break;
    }
  }
};
const checkDefaultFirstOption = state => () => {
  state.hoverIndex = -1;
  let hasCreated = false;
  const visibleOptions = state.options.filter(item => item.visible && item.state.visible);
  for (let i = visibleOptions.length - 1; i >= 0; i--) {
    if (visibleOptions[i].created) {
      hasCreated = true;
      state.hoverIndex = i;
      state.hoverValue = state.optionIndexArr[i];
      break;
    }
  }
  if (hasCreated) {
    return;
  }
  for (let i = 0; i < visibleOptions.length; i++) {
    const option = visibleOptions[i];
    if (state.query) {
      if (!option.disabled && !option.groupDisabled && option.state.visible && option.visible) {
        state.hoverIndex = i;
        state.hoverValue = state.optionIndexArr[i];
        break;
      }
    } else {
      if (option.itemSelected) {
        state.hoverIndex = i;
        state.hoverValue = state.optionIndexArr[i];
        break;
      }
    }
  }
};
const getValueKey = props => item => {
  if (!item) return;
  if (Object.prototype.toString.call(item.value).toLowerCase() !== "[object object]") {
    return item.value || item[props.valueField];
  }
  return getObj(item.value, props.valueKey);
};
const navigateOptions = ({
  api,
  state,
  props,
  nextTick
}) => direction => {
  const {
    optimization
  } = props;
  if (optimization) {
    return;
  }
  const len = state.options.filter(item => item.visible && item.state.visible).length;
  if (!state.visible) {
    state.visible = true;
    return;
  }
  if (len === 0 || state.filteredOptionsCount === 0) {
    return;
  }
  state.disabledOptionHover = true;
  setTimeout(() => {
    state.disabledOptionHover = false;
  }, 100);
  if (state.hoverIndex < -1 || state.hoverIndex >= len) {
    state.hoverIndex = 0;
  }
  if (!state.optionsAllDisabled) {
    if (direction === "next") {
      state.hoverIndex++;
      if (state.hoverIndex === len) {
        state.hoverIndex = 0;
      }
    } else if (direction === "prev") {
      state.hoverIndex--;
      if (state.hoverIndex < 0) {
        state.hoverIndex = len - 1;
      }
    }
    let option = {};
    state.hoverValue = state.optionIndexArr[state.hoverIndex];
    if (state.query || props.remote) {
      option = state.options.find(item => item.state.index === state.hoverValue);
    } else {
      option = state.options[state.hoverIndex];
    }
    if (option.disabled === true || option.groupDisabled === true || !option.state.visible || option.state.limitReached) {
      api.navigateOptions(direction);
    }
    nextTick(() => api.scrollToOption(state.hoverIndex === -9 ? {} : option || {}));
  }
};
const emptyFlag = ({
  props,
  state
}) => () => {
  if (props.optimization) {
    if (props.allowCreate) {
      return state.query === "" && state.datas.length === 0;
    } else {
      return state.datas.length === 0;
    }
  } else {
    return state.options.length === 0;
  }
};
const recycleScrollerHeight = ({
  state,
  props,
  recycle
}) => () => {
  const {
    ITEM_HEIGHT,
    SAFE_MARGIN,
    SAAS_HEIGHT,
    AURORA_HEIGHT
  } = recycle;
  let length = state.datas.length;
  if (state.showNewOption) {
    length += 1;
  }
  if (length === 0 || props.loading) {
    return 0;
  } else if (length < 6) {
    return length * ITEM_HEIGHT + (state.isSaaSTheme ? SAFE_MARGIN * 2 : 0);
  } else {
    return state.isSaaSTheme ? SAAS_HEIGHT : AURORA_HEIGHT;
  }
};
const emptyText = ({
  I18N,
  props,
  state,
  t,
  isMobileFirstMode
}) => () => {
  if (props.loading) {
    return props.loadingText || t(I18N.loading);
  }
  if (props.remote && state.query === "" && props.renderType) {
    return remoteEmptyText(props, state);
  }
  if (props.remote && state.query === "" && state.emptyFlag && !state.triggerSearch) {
    return props.shape === "filter" || isMobileFirstMode ? "" : false;
  }
  if (props.filterable && state.query && (props.remote && state.emptyFlag || !state.options.some(option => option.visible && option.state.visible))) {
    return props.noMatchText || t(I18N.noMatch);
  }
  if (state.emptyFlag) {
    return props.noDataText || t(I18N.noData);
  }
  return null;
};
const remoteEmptyText = function (props, state) {
  if (props.multiple) {
    return state.selected.length > 0 || state.remoteData.length >= 0;
  }
  return state.selected[props.valueField] || state.remoteData.length >= 0;
};
const watchValue = ({
  api,
  constants,
  dispatch,
  props,
  vm,
  state
}) => (value, oldValue) => {
  if (props.multiple) {
    api.resetInputHeight();
    if (value && value.length > 0 || vm.$refs.input && state.query !== "") {
      state.currentPlaceholder = "";
    } else {
      state.currentPlaceholder = state.cachedPlaceHolder;
    }
    if (props.filterable && !props.reserveKeyword) {
      !props.searchable && (state.query = "");
    }
  }
  api.setSelected();
  !state.isClickChoose && api.initQuery({
    init: true
  }).then(() => api.setSelected());
  state.isClickChoose = false;
  if (props.filterable && !props.multiple) {
    state.inputLength = 20;
  }
  if (state.completed && !isEqual(value, oldValue)) {
    dispatch(constants.COMPONENT_NAME.FormItem, constants.EVENT_NAME.formChange, value);
  }
  props.optimization && optmzApis.setValueIndex({
    props,
    state
  });
};
const calcOverFlow = ({
  vm,
  props,
  state
}) => height => {
  if (props.multiple && props.showOverflowTooltip) {
    state.overflow = false;
    const tagDom = vm.$refs.tags;
    const tags = tagDom.querySelectorAll('[data-tag="tiny-tag"]');
    if (tags.length) {
      tagDom.scrollTo && tagDom.scrollTo({
        top: 0
      });
      let {
        x,
        width
      } = tags[0].getBoundingClientRect();
      if (width >= tagDom.getBoundingClientRect().width) {
        state.overflow = 0;
      } else {
        for (let i = 1; i < tags.length; i++) {
          let tx = tags[i].getBoundingClientRect().x;
          if (tx === x) {
            state.overflow = i - 1;
            break;
          }
        }
      }
    }
    vm.$refs.select.style.height = vm.$refs.select.style.height || height;
    vm.$refs.reference.$el.style.position = "absolute";
    const inputWidth = vm.$refs.select.getBoundingClientRect().width;
    const position = state.visible ? "absolute" : "";
    state.selectFiexd = {
      height,
      position,
      width: inputWidth + "px",
      zIndex: PopupManager.nextZIndex()
    };
    state.inputWidth = inputWidth;
  }
};
const postOperOfToVisible = ({
  props,
  state,
  constants
}) => {
  if (props.multiple) {
    return;
  }
  if (state.selected) {
    if (props.filterable && props.allowCreate && state.createdSelected && state.createdLabel) {
      state.selectedLabel = state.createdLabel;
    } else {
      state.selectedLabel = state.selected.state.currentLabel || state.selected.currentLabel;
    }
    if (props.filterable) {
      state.query = state.selectedLabel;
    }
    if (props.filterable) {
      state.currentPlaceholder = state.cachedPlaceHolder;
    }
  }
};
const toVisible = ({
  constants,
  state,
  props,
  vm,
  api,
  nextTick
}) => () => {
  state.selectEmitter.emit(constants.EVENT_NAME.destroyPopper);
  props.remote && props.dropOnlySearch && (state.showWarper = false);
  if (vm.$refs.input) {
    vm.$refs.input.blur();
  }
  state.query = "";
  state.selectedLabel = "";
  state.inputLength = 20;
  state.previousQuery !== state.query && api.initQuery().then(() => api.setSelected());
  state.previousQuery = null;
  api.resetHoverIndex();
  api.resetDatas();
  nextTick(() => {
    if (vm.$refs.input && vm.$refs.input.value === "" && state.selected.length === 0) {
      state.currentPlaceholder = state.cachedPlaceHolder;
    }
  });
  postOperOfToVisible({
    props,
    state,
    constants
  });
};
const toHide = ({
  constants,
  state,
  props,
  vm,
  api
}) => () => {
  const {
    filterable,
    remote,
    remoteConfig,
    shape,
    multiple,
    valueField
  } = props;
  state.selectEmitter.emit(constants.COMPONENT_NAME.SelectDropdown, constants.EVENT_NAME.updatePopper);
  if (filterable) {
    state.query = remote || shape ? "" : state.selectedLabel;
    const isChange = remote && remoteConfig.autoSearch && (state.firstAutoSearch || remoteConfig.clearData);
    state.firstAutoSearch = false;
    api.handleQueryChange(state.query, isChange);
    if (multiple) {
      vm.$refs.input.focus();
    } else {
      if (!remote) {
        state.selectEmitter.emit(constants.EVENT_NAME.queryChange, "");
        state.selectEmitter.emit(constants.COMPONENT_NAME.OptionGroup, constants.EVENT_NAME.queryChange);
      }
      if (state.selectedLabel && !shape) {
        state.currentPlaceholder = state.selectedLabel;
        state.selectedLabel = "";
      }
    }
  }
};
const watchVisible = ({
  api,
  constants,
  emit,
  state,
  vm,
  props
}) => value => {
  if ((props.filterable || props.remote) && !value) {
    vm.$refs.reference.blur();
  }
  if (api.onCopying()) {
    return;
  }
  if (value && props.multiple && state.device === "mb") {
    state.selectedCopy = state.selected.slice();
  }
  setTimeout(() => {
    if (!value && !state.selectedLabel) {
      state.cachedOptions.forEach(item => {
        item.state.visible = true;
      });
    }
  }, 200);
  value ? api.toHide() : api.toVisible();
  emit(constants.EVENT_NAME.visibleChange, value);
  setTimeout(() => {
    state.selectEmitter.emit(constants.EVENT_NAME.updatePopper);
    if (value && vm.$refs.scrollbar) {
      if (props.optimization) {
        optmzApis.setScrollTop({
          refs: vm.$refs,
          state
        });
        vm.$refs.scrollbar.updateVisibleItems(true, true);
      } else {
        vm.$refs.scrollbar.handleScroll();
      }
    }
  }, props.updateDelay);
  if (!value && props.shape === "filter") {
    state.softFocus = false;
  }
};
const watchOptions = ({
  api,
  constants,
  nextTick,
  parent,
  props,
  state
}) => () => {
  if (typeof window === "undefined") {
    return;
  }
  nextTick(() => {
    state.selectEmitter.emit(constants.EVENT_NAME.updatePopper);
  });
  if (props.multiple) {
    api.resetInputHeight();
  }
  nextTick(() => {
    if (parent.$el.querySelector("input") !== document.activeElement) {
      api.setSelected();
    }
  });
  api.getOptionIndexArr();
};
const getOptionIndexArr = ({
  props,
  state,
  api
}) => () => {
  setTimeout(() => {
    state.optionIndexArr = api.queryVisibleOptions().map(item => Number(item.getAttribute("data-index")));
    if (props.defaultFirstOption && (props.filterable || props.remote) && state.filteredOptionsCount) {
      if (props.optimization) {
        optmzApis.checkDefaultFirstOption({
          state
        });
      } else {
        api.checkDefaultFirstOption();
      }
    }
  });
};
const queryVisibleOptions = ({
  props,
  vm,
  isMobileFirstMode
}) => () => {
  if (props.optimization) {
    return optmzApis.queryVisibleOptions(vm, isMobileFirstMode);
  } else {
    return vm.$refs.scrollbar ? Array.from(vm.$refs.scrollbar.$el.querySelectorAll('[data-index]:not([style*="display: none"])')) : [];
  }
};
const handleCopyClick = ({
  parent,
  props,
  state
}) => () => {
  const input = document.createElement("input");
  input.style.height = 0;
  input.style.border = "none";
  input.style.position = "absolute";
  parent.$el.appendChild(input);
  input.value = state.selected.map(item => item.state ? item.state.currentLabel : item.currentLabel).join(props.textSplit);
  input.select();
  document.execCommand("copy");
  parent.$el.removeChild(input);
};
const debouncRquest = ({
  api,
  state,
  props
}) => debounce(props.delay, () => {
  if (props.filterable && state.query !== state.selectedLabel) {
    const isChange = false;
    const isInput = true;
    state.query = state.selectedLabel;
    api.handleQueryChange(state.query, isChange, isInput);
  }
});
const getChildValue = () => (data, key) => {
  const ids = [];
  const getChild = nodes => {
    nodes.forEach(node => {
      ids.push(node.data[key]);
      if (node.childNodes.length > 0) {
        getChild(node.childNodes);
      }
    });
  };
  getChild(data);
  return ids;
};
const watchPropsOption = ({
  constants,
  parent,
  props,
  state
}) => () => {
  const dataset = {
    dataset: props.options || props.dataset,
    service: parent.$service
  };
  getDataset(dataset).then(data => {
    let sortData = data.slice();
    if (props.multiple) {
      const requiredData = [];
      sortData = sortData.filter(item => {
        if (item.required) {
          requiredData.push(item);
          return false;
        }
        return true;
      });
      sortData = requiredData.concat(sortData);
    }
    if (props.cacheOp && props.cacheOp.key) {
      state.memorize = new Memorize(props.cacheOp);
      state.datas = state.memorize.assemble(sortData.slice());
    } else {
      state.datas = sortData;
      state.initDatas = sortData;
    }
  });
};
const onMouseenterNative = ({
  state
}) => () => {
  state.inputHovering = true;
  if (state.searchSingleCopy && state.selectedLabel) {
    state.softFocus = true;
  }
};
const onMouseleaveNative = ({
  state
}) => e => {
  if (e.target === e.currentTarget) return;
  state.inputHovering = false;
  if (state.searchSingleCopy && state.selectedLabel) {
    state.softFocus = false;
  }
};
const onCopying = ({
  state,
  vm
}) => () => {
  return state.searchSingleCopy && state.selectedLabel && vm.$refs.reference && vm.$refs.reference.hasSelection && vm.$refs.reference.hasSelection();
};
const watchHoverIndex = ({
  state
}) => value => {
  if (value === -1 || value === -9) {
    state.hoverValue = -1;
  } else {
    state.hoverValue = state.optionIndexArr[value];
  }
};
const handleDropdownClick = ({
  vm,
  state,
  props,
  emit
}) => $event => {
  if (props.allowCopy && vm.$refs.reference) {
    vm.$refs.reference.$el.querySelector("input").selectionEnd = 0;
  }
  state.softFocus = false;
  emit("dropdown-click", $event);
};
const handleEnterTag = ({
  state
}) => ($event, key) => {
  const target = $event.target;
  if (target && target.scrollWidth > target.offsetWidth) {
    state.tooltipContent = __spreadProps(__spreadValues({}, state.tooltipContent), {
      [key]: target.innerText
    });
  }
};
const calcCollapseTags = ({
  state,
  vm,
  props
}) => () => {
  if (state.inputHovering && !props.clickExpand) {
    return state.isHidden = true;
  }
  const tags = vm.$refs.tags;
  const collapseTag = tags && tags.querySelector('[data-tag="tags-collapse"]');
  if (!collapseTag || !tags) {
    return;
  }
  const {
    width: tagsContentWidth,
    paddingLeft,
    paddingRight
  } = window.getComputedStyle(tags);
  const tagsWidth = parseFloat(tagsContentWidth) - parseFloat(paddingLeft) - parseFloat(paddingRight);
  const {
    width: collapseTagContentWidth,
    marginRight
  } = collapseTag && window.getComputedStyle(collapseTag);
  const collapseTagWidth = collapseTag && parseFloat(collapseTagContentWidth) + parseFloat(marginRight);
  const tagList = Array.from(tags.querySelectorAll('[data-tag="tiny-tag"]'));
  let [dom, idx, currentRowWidth, currentTagIndex] = [null, 0, 0, 0];
  for (let rowNum = 0; rowNum < props.maxVisibleRows; rowNum++) {
    currentRowWidth = 0;
    let currentTagWidth = 0;
    for (currentTagIndex; currentTagIndex < tagList.length; currentTagIndex++) {
      const tag = tagList[currentTagIndex];
      if (tag !== collapseTag) {
        const {
          width: tagContentWidth,
          marginRight: marginRight2,
          marginLeft
        } = tag && window.getComputedStyle(tag);
        currentTagWidth = parseFloat(tagContentWidth) + parseFloat(marginRight2) + parseFloat(marginLeft);
        currentRowWidth += currentTagWidth;
      }
      if (tag !== collapseTag && currentRowWidth > tagsWidth) {
        if (!dom && rowNum === props.maxVisibleRows - 1) {
          if (currentRowWidth - currentTagWidth + collapseTagWidth < tagsWidth) {
            dom = tag;
            idx = currentTagIndex;
          } else {
            dom = tagList[currentTagIndex - 1];
            idx = currentTagIndex - 1;
          }
        }
        break;
      }
    }
    if (currentTagIndex === tagList.length - 1) {
      break;
    }
  }
  if (idx === 0) {
    state.exceedMaxVisibleRow = false;
    state.showCollapseTag = false;
    return state.isHidden = true;
  }
  if (dom) {
    dom.before(collapseTag);
    state.isHidden = false;
  } else {
    state.isHidden = true;
  }
  state.collapseTagsLength = tagList.length - idx;
  state.exceedMaxVisibleRow = true;
  state.toHideIndex = idx;
};
const watchInputHover = ({
  vm
}) => newVal => {
  const [inputHovering, visible] = newVal;
  if (!inputHovering && !visible) {
    const tags = vm.$refs.tags;
    const content = vm.$refs["tags-content"];
    tags && content && tags.scrollTo({
      top: content
    });
  }
};
const initQuery = ({
  props,
  state,
  constants,
  vm
}) => ({
  init
} = {}) => {
  const isRemote = props.filterable && props.remote && (typeof props.remoteMethod === "function" || typeof props.initQuery === "function");
  let selected;
  if (isRemote && props.initQuery) {
    let initData = props.initQuery(props.modelValue, props.extraQueryParams, !!init);
    if (initData.then) {
      return new Promise(resolve => {
        initData.then(selected2 => {
          state.remoteData = selected2;
          resolve(selected2);
        });
      });
    }
    selected = initData;
    state.remoteData = selected;
  }
  return Promise.resolve(selected);
};
const mounted = ({
  api,
  parent,
  state,
  props,
  vm,
  designConfig
}) => () => {
  var _a;
  const parentEl = parent.$el;
  const inputEl = parentEl.querySelector('input[data-tag="tiny-input-inner"]');
  const inputClientRect = inputEl && inputEl.getBoundingClientRect() || {};
  if (inputEl === document.activeElement) {
    document.activeElement.blur();
  }
  state.completed = true;
  const defaultSizeMap = {
    medium: 40,
    default: 32,
    small: 28,
    mini: 24
  };
  const sizeMap = ((_a = designConfig == null ? void 0 : designConfig.state) == null ? void 0 : _a.sizeMap) || defaultSizeMap;
  if (props.multiple && Array.isArray(props.modelValue) && props.modelValue.length > 0) {
    state.currentPlaceholder = "";
  }
  state.initialInputHeight = state.isDisplayOnly ? sizeMap[state.selectSize || "default"] : inputClientRect.height || sizeMap[state.selectSize];
  addResizeListener(parentEl, api.handleResize);
  if (vm.$refs.tags) {
    addResizeListener(vm.$refs.tags, api.resetInputHeight);
  }
  if (props.remote && props.multiple) {
    api.resetInputHeight();
  }
  state.inputWidth = inputClientRect.width;
  api.initQuery({
    init: true
  }).then(() => api.setSelected());
  if (props.dataset) {
    api.watchPropsOption();
  }
};
const unMount = ({
  api,
  parent,
  vm,
  state
}) => () => {
  if (parent.$el && api.handleResize) {
    removeResizeListener(parent.$el, api.handleResize);
  }
  if (vm.$refs.tags) {
    removeResizeListener(vm.$refs.tags, api.resetInputHeight);
  }
  state.popperElm = null;
};
const optmzApis = {
  exist: (val, multiple) => multiple ? Array.isArray(val) && val.length : val,
  getValueIndex: props => {
    const {
      options,
      valueField,
      modelValue,
      multiple
    } = props;
    const contain = (val, arr) => Array.isArray(arr) && ~arr.indexOf(val);
    const equal = (val, opt) => multiple ? contain(opt[valueField], [val]) : opt[valueField] === val;
    let start = 0;
    if (optmzApis.exist(modelValue, multiple) && options) {
      const lastVal = multiple ? modelValue[modelValue.length - 1] : modelValue;
      for (let i = 0; i < options.length; i++) {
        if (!equal(lastVal, options[i])) continue;
        return i;
      }
    }
    return start;
  },
  queryVisibleOptions: (vm, isMobileFirstMode) => {
    const querySelectKey = isMobileFirstMode ? ".cursor-not-allowed" : ".is-disabled";
    return Array.from(vm.$refs.scrollbar.$el.querySelectorAll('.tiny-recycle-scroller__slot, .tiny-recycle-scroller__item-view:not([style*="transform: translateY(-9999px) translateX(0px)"])')).map(item => item.querySelector(`[data-tag="tiny-option"]:not(${querySelectKey})`)).filter(v => v);
  },
  setScrollTop: ({
    refs,
    state
  }) => {
    const {
      optimizeStore
    } = state;
    refs.scrollbar.scrollToItem(optimizeStore.valueIndex);
  },
  setValueIndex: ({
    props,
    state
  }) => {
    state.optimizeStore.valueIndex = optmzApis.getValueIndex(props);
  },
  natural: val => val < 0 ? 0 : val,
  checkDefaultFirstOption: ({
    state
  }) => {
    state.hoverIndex = 0;
    state.hoverValue = state.optionIndexArr[0];
  }
};
const computeOptimizeOpts = ({
  props,
  designConfig
}) => () => {
  const {
    optimization
  } = props;
  const baseOpts = (designConfig == null ? void 0 : designConfig.baseOpts) ? designConfig.baseOpts : {
    gt: 20,
    rSize: 10,
    optionHeight: 30,
    limit: 20
  };
  let optOpts;
  if (optimization) {
    if (typeof optimization === "boolean") {
      optOpts = extend(true, {}, baseOpts);
    } else {
      optOpts = extend(true, {}, baseOpts, optimization);
    }
    return optOpts;
  }
};
const watchOptimizeOpts = ({
  props,
  state
}) => () => {
  const {
    optimizeOpts,
    optimizeStore
  } = state;
  if (optimizeOpts) {
    if (props.optimization) {
      optimizeStore.valueIndex = optmzApis.getValueIndex(props);
    }
  }
};
const computeCollapseTags = props => () => props.collapseTags;
const computeMultipleLimit = ({
  props,
  state
}) => () => {
  const {
    multipleLimit,
    multiple,
    optimization
  } = props;
  const {
    optimizeOpts
  } = state;
  return optmzApis.natural(multiple && optimization ? multipleLimit || optimizeOpts.limit : multipleLimit);
};
const updateModelValue = ({
  props,
  emit,
  state
}) => (value, needUpdate) => {
  state.isClickChoose = true;
  if (state.device === "mb" && props.multiple && !needUpdate) {
    state.modelValue = value;
  } else {
    emit("update:modelValue", value);
  }
};
const getLabelSlotValue = ({
  props,
  state
}) => item => {
  const datas = state.datas;
  const value = item.state ? item.state.currentValue : item.value;
  const data = datas.find(data2 => data2.value === value);
  const obj = __spreadProps(__spreadValues({}, data), {
    label: item.state ? item.state.currentLabel : item.currentLabel,
    value
  });
  return obj;
};
const computedTagsStyle = ({
  props,
  parent,
  state,
  vm
}) => () => {
  const isReadonly = props.disabled || (parent.form || {}).disabled || props.displayOnly;
  let tagsStyle = {
    "max-width": isReadonly ? "" : state.inputWidth - state.inputPaddingRight + "px",
    width: "100%"
  };
  if (props.clickExpand && !state.exceedMaxVisibleRow || state.visible) {
    Object.assign(tagsStyle, {
      height: "auto"
    });
  }
  if (props.clickExpand && state.exceedMaxVisibleRow && !state.showCollapseTag) {
    const tags = vm.$refs.tags;
    const {
      paddingTop: tagsPaddingTop,
      paddingBottom: tagsPaddingBottom
    } = window.getComputedStyle(tags);
    const tagsPaddingVertical = parseFloat(tagsPaddingTop) + parseFloat(tagsPaddingBottom);
    const tag = tags == null ? void 0 : tags.querySelector('[data-tag="tiny-tag"]');
    if (tag) {
      const {
        height: tagHeight,
        marginTop,
        marginBottom
      } = window.getComputedStyle(tag);
      const rowHeight = (parseFloat(tagHeight) + parseFloat(marginTop) + parseFloat(marginBottom)) * props.maxVisibleRows;
      Object.assign(tagsStyle, {
        "height": `${rowHeight + tagsPaddingVertical}px`
      });
    }
  }
  return tagsStyle;
};
const computedReadonly = ({
  props,
  state
}) => () => state.device === "mb" || props.readonly || !props.filterable || props.multiple || browserInfo.name !== BROWSER_NAME.IE && browserInfo.name !== BROWSER_NAME.Edge && !state.visible;
const computedShowClose = ({
  props,
  state
}) => () => props.clearable && !state.selectDisabled && (state.inputHovering || props.multiple && state.visible) && (props.multiple ? Array.isArray(props.modelValue) && props.modelValue.length > 0 : !isNull(props.modelValue) && props.modelValue !== "");
const computedCollapseTagSize = state => () => state.selectSize;
const computedShowNewOption = ({
  props,
  state
}) => () => {
  const query = state.device === "mb" ? state.queryValue : state.query;
  return props.filterable && props.allowCreate && query && !state.options.filter(option => !option.created).some(option => option.state.currentLabel === state.query);
};
const computedShowCopy = ({
  props,
  state
}) => () => props.multiple && props.copyable && state.inputHovering && state.selected.length;
const computedOptionsAllDisabled = state => () => state.options.filter(option => option.visible).every(option => option.disabled);
const computedDisabledTooltipContent = state => () => state.selected.map(item => item.state ? item.state.currentLabel : item.currentLabel).join("\uFF1B");
const computedSelectDisabled = ({
  props,
  parent
}) => () => props.disabled || (parent.form || {}).disabled || props.displayOnly || (parent.form || {}).displayOnly;
const computedIsExpand = ({
  props,
  state
}) => () => {
  const hoverExpanded = (state.selectHover || state.visible) && props.hoverExpand && !props.disabled;
  const clickExpanded = props.clickExpand && state.exceedMaxVisibleRow && state.showCollapseTag;
  return hoverExpanded || clickExpanded;
};
const watchInitValue = ({
  props,
  emit
}) => value => {
  if (props.multiple) {
    let modelValue = props.modelValue.slice();
    value.forEach(val => {
      modelValue = modelValue.filter(item => item !== val);
    });
    emit("update:modelValue", value.concat(modelValue));
  }
};
const watchShowClose = ({
  nextTick,
  state,
  parent
}) => () => {
  nextTick(() => {
    const parentEl = parent.$el;
    const inputEl = parentEl.querySelector('input[data-tag="tiny-input-inner"]');
    if (inputEl) {
      const {
        paddingRight
      } = getComputedStyle(inputEl);
      const COPY_ICON_WIDTH = 16;
      state.inputPaddingRight = parseFloat(paddingRight) + COPY_ICON_WIDTH;
    }
  });
};
const computedShowTagText = ({
  state
}) => () => state.isDisplayOnly;
const isTagClosable = () => item => !item.required;
const computedGetIcon = ({
  designConfig,
  props
}) => () => {
  return props.dropdownIcon ? {
    icon: props.dropdownIcon
  } : {
    icon: (designConfig == null ? void 0 : designConfig.icons.dropdownIcon) || "icon-delta-down",
    isDefault: true
  };
};
const computedGetTagType = ({
  designConfig,
  props
}) => () => {
  var _a;
  if (((_a = designConfig == null ? void 0 : designConfig.props) == null ? void 0 : _a.tagType) && !props.tagType) {
    return designConfig.props.tagType;
  }
  return props.tagType;
};
const clearSearchText = ({
  state,
  api
}) => () => {
  state.query = "";
  state.previousQuery = void 0;
  api.handleQueryChange(state.query);
};
const clearNoMatchValue = ({
  props,
  emit
}) => newModelValue => {
  if (!props.clearNoMatchValue) {
    return;
  }
  if (props.multiple && props.modelValue.length !== newModelValue.length || !props.multiple && props.modelValue !== newModelValue) {
    emit("update:modelValue", newModelValue);
  }
};
const handleDebouncedQueryChange = ({
  state,
  api
}) => debounce(state.debounce, value => {
  api.handleQueryChange(value);
});
const onClickCollapseTag = ({
  state,
  props,
  nextTick,
  api
}) => event => {
  event.stopPropagation();
  if (props.clickExpand && !props.disabled && !state.isDisplayOnly) {
    state.showCollapseTag = !state.showCollapseTag;
    nextTick(api.resetInputHeight);
  }
};
const updateSelectedData = ({
  state
}) => data => {
  state.selected = data;
};
const hidePanel = ({
  state
}) => () => {
  state.visible = false;
};
export { blur, calcCollapseTags, calcOverFlow, checkDefaultFirstOption, clearNoMatchValue, clearSearchText, computeCollapseTags, computeMultipleLimit, computeOptimizeOpts, computedCollapseTagSize, computedDisabledTooltipContent, computedGetIcon, computedGetTagType, computedIsExpand, computedOptionsAllDisabled, computedReadonly, computedSelectDisabled, computedShowClose, computedShowCopy, computedShowNewOption, computedShowTagText, computedTagsStyle, debouncRquest, defaultOnQueryChange, deletePrevTag, deleteSelected, deleteTag, directEmitChange, doDestroy, emitChange, emptyFlag, emptyText, focus, getChildValue, getLabelSlotValue, getOption, getOptionIndexArr, getPluginOption, getSelectedOption, getValueIndex, getValueKey, handleBlur, handleClearClick, handleClose, handleComposition, handleCopyClick, handleDebouncedQueryChange, handleDropdownClick, handleEnterTag, handleFocus, handleMenuEnter, handleOptionSelect, handleQueryChange, handleResize, hidePanel, initQuery, initValue, isTagClosable, managePlaceholder, mounted, navigateOptions, onClickCollapseTag, onCopying, onInputChange, onMouseenterNative, onMouseleaveNative, onOptionDestroy, queryChange, queryVisibleOptions, recycleScrollerHeight, resetDatas, resetHoverIndex, resetInputHeight, resetInputState, resetInputWidth, scrollToOption, selectOption, setOptionHighlight, setSelected, setSoftFocus, showTip, toHide, toVisible, toggleCheckAll, toggleLastOptionHitState, toggleMenu, unMount, updateModelValue, updateSelectedData, watchHoverIndex, watchInitValue, watchInputHover, watchOptimizeOpts, watchOptions, watchPropsOption, watchShowClose, watchValue, watchVisible };