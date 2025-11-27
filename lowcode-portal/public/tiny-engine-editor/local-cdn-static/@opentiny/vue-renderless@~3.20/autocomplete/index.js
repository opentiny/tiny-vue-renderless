import "../chunk-G2ADBYYC.js";
import { FORM_ITEM, FORM_EVENT } from './../common/form/const.js';
const getData = ({
  props,
  state,
  updatePopper,
  nextTick
}) => queryString => {
  var _a;
  if (state.suggestionDisabled) {
    return;
  }
  state.loading = true;
  (_a = props == null ? void 0 : props.fetchSuggestions) == null ? void 0 : _a.call(props, queryString, suggestions => {
    state.loading = false;
    if (state.suggestionDisabled) {
      return;
    }
    if (Array.isArray(suggestions)) {
      state.suggestions = suggestions;
      state.highlightedIndex = props.highlightFirstItem ? 0 : -1;
    } else {
      throw new TypeError("[TINY Error][Autocomplete]autocomplete suggestions must be an array");
    }
    nextTick(updatePopper);
  });
};
const handleChange = ({
  api,
  emit,
  state,
  props,
  dispatch
}) => value => {
  state.activated = true;
  emit("update:modelValue", value);
  state.suggestionDisabled = false;
  if (state.validateEvent) {
    dispatch(FORM_ITEM, FORM_EVENT.change, [value]);
  }
  if (!props.triggerOnFocus && !value) {
    state.suggestionDisabled = true;
    state.suggestions = [];
    return;
  }
  api.debouncedGetData(value);
};
const handleFocus = ({
  api,
  emit,
  props,
  state
}) => event => {
  state.activated = true;
  emit("focus", event);
  if (props.triggerOnFocus) {
    state.suggestions = [];
    state.highlightedIndex = -1;
    state.suggestionDisabled = false;
    api.debouncedGetData(props.modelValue);
  }
};
const handleBlur = ({
  emit,
  state,
  dispatch,
  props
}) => () => {
  state.suggestionDisabled = true;
  emit("blur");
  if (state.validateEvent) {
    dispatch(FORM_ITEM, FORM_EVENT.blur, [props.modelValue]);
  }
};
const handleClear = ({
  emit,
  state
}) => () => {
  state.activated = false;
  emit("clear");
};
const close = state => () => {
  state.activated = false;
};
const open = api => () => {
  api.handleFocus();
};
const handleKeyEnter = ({
  api,
  emit,
  nextTick,
  props,
  state
}) => event => {
  if (state.suggestionVisible && state.highlightedIndex >= 0 && state.highlightedIndex < state.suggestions.length) {
    event.preventDefault();
    api.select(state.suggestions[state.highlightedIndex]);
  } else if (props.selectWhenUnmatched) {
    emit("select", {
      value: props.modelValue
    });
    nextTick(() => {
      state.suggestions = [];
      state.highlightedIndex = -1;
    });
  }
};
const select = ({
  emit,
  nextTick,
  props,
  state,
  dispatch
}) => item => {
  const value = item[props.valueKey];
  emit("update:modelValue", value);
  emit("select", item);
  if (state.validateEvent) {
    dispatch(FORM_ITEM, FORM_EVENT.change, [value]);
  }
  nextTick(() => {
    state.activated = false;
    state.suggestions = [];
    state.highlightedIndex = -1;
  });
};
const highlight = ({
  constants,
  vm,
  state
}) => index => {
  if (!state.suggestionVisible || state.loading) {
    return;
  }
  if (index < 0) {
    state.highlightedIndex = -1;
    return;
  }
  if (index >= state.suggestions.length) {
    index = state.suggestions.length - 1;
  }
  const suggestion = vm.$refs.popper.querySelector(constants.WARP_CLS);
  const suggestionList = suggestion.querySelectorAll(constants.ITEM_CLS);
  let highlightItem = suggestionList[index];
  let scrollTop = suggestion.scrollTop;
  let offsetTop = highlightItem.offsetTop;
  if (offsetTop + highlightItem.scrollHeight > scrollTop + suggestion.clientHeight) {
    suggestion.scrollTop += highlightItem.scrollHeight;
  }
  if (offsetTop < scrollTop) {
    suggestion.scrollTop -= highlightItem.scrollHeight;
  }
  state.highlightedIndex = index;
  let $input = vm.$refs.input.getInput();
  $input.setAttribute("aria-activedescendant", `${state.id}-item-${state.highlightedIndex}`);
};
const computedVisible = state => {
  const suggestions = state.suggestions;
  let isValidData = Array.isArray(suggestions) && suggestions.length > 0;
  return (isValidData || state.loading) && state.activated;
};
const watchVisible = ({
  suggestionState,
  vm
}) => val => {
  let $input = vm.$refs.input.getInput();
  if ($input) {
    suggestionState.dropdownWidth = $input.offsetWidth + "px";
    suggestionState.showPopper = val;
  }
};
const mounted = ({
  vm,
  state,
  suggestionState
}) => () => {
  const input = vm.$refs.input;
  const $input = input.getInput();
  suggestionState.popperElm = state.popperElm = vm.$refs.popper;
  suggestionState.referenceElm = $input;
  $input.setAttribute("role", "textbox");
  $input.setAttribute("aria-autocomplete", "list");
  $input.setAttribute("aria-controls", "id");
  $input.setAttribute("aria-activedescendant", `${state.id}-item-${state.highlightedIndex}`);
};
export { close, computedVisible, getData, handleBlur, handleChange, handleClear, handleFocus, handleKeyEnter, highlight, mounted, open, select, watchVisible };