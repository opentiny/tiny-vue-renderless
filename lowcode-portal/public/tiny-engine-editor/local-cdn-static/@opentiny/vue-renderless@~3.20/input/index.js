import "../chunk-G2ADBYYC.js";
import { omitText } from './../common/string.js';
const HIDDEN_STYLE = `
height:0 !important;visibility:hidden !important;overflow:hidden !important;
position:absolute !important;z-index:-1000 !important;top:0 !important;right:0 !important
`;
const CONTEXT_STYLE = ["width", "line-height", "padding-top", "padding-bottom", "padding-left", "padding-right", "border-width", "box-sizing", "letter-spacing", "font-family", "font-weight", "font-size", "text-rendering", "text-transform", "text-indent"];
const STYLE = {
  BoxSizing: "box-sizing",
  BorderBox: "border-box",
  ContentBox: "content-box",
  PaddingTop: "padding-top",
  PaddingBottom: "padding-bottom",
  BorderTopWidth: "border-top-width",
  BorderBottomWidth: "border-bottom-width"
};
const isServer = typeof window === "undefined";
const isKorean = text => /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi.test(text);
const showBox = state => () => {
  if (state.inputDisabled) {
    return false;
  }
  state.boxVisibility = true;
};
const inputStyle = ({
  props
}) => () => {
  return {
    textAlign: props.textAlign
  };
};
const calculateNodeStyling = () => targetElement => {
  const style = window.getComputedStyle(targetElement);
  const boxSizing = style.getPropertyValue(STYLE.BoxSizing);
  const paddingSize = parseFloat(style.getPropertyValue(STYLE.PaddingBottom)) + parseFloat(style.getPropertyValue(STYLE.PaddingTop));
  const borderSize = parseFloat(style.getPropertyValue(STYLE.BorderBottomWidth)) + parseFloat(style.getPropertyValue(STYLE.BorderTopWidth));
  const contextStyle = CONTEXT_STYLE.map(name => `${name}:${style.getPropertyValue(name)}`).join(";");
  return {
    contextStyle,
    paddingSize,
    borderSize,
    boxSizing
  };
};
const calcTextareaHeight = ({
  api,
  hiddenTextarea,
  props,
  state,
  mode,
  constants
}) => (targetElement, minRows = 1, maxRows = null) => {
  if (!targetElement) {
    return {
      minHeight: "",
      height: ""
    };
  }
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement("textarea");
    document.body.appendChild(hiddenTextarea);
  }
  const {
    paddingSize,
    borderSize,
    boxSizing,
    contextStyle
  } = api.calculateNodeStyling(targetElement);
  hiddenTextarea.setAttribute("style", `${contextStyle};${HIDDEN_STYLE}`);
  hiddenTextarea.value = targetElement.value || targetElement.placeholder || "";
  let height = hiddenTextarea.scrollHeight;
  const textareaStyle = {};
  if (mode === "mobile") {
    height = Math.max(hiddenTextarea.scrollHeight, constants.TEXTAREA_HEIGHT_MOBILE);
  }
  if (boxSizing === STYLE.BorderBox) {
    height = height + borderSize * 2 + paddingSize;
  } else if (boxSizing === STYLE.ContentBox) {
    height = height - paddingSize;
  }
  hiddenTextarea.value = "";
  const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
  if (minRows !== null) {
    let minHeight = singleRowHeight * minRows;
    if (boxSizing === STYLE.BorderBox) {
      minHeight = minHeight + paddingSize + borderSize;
    }
    if (props.size) {
      minHeight = props.size === "mini" ? minHeight * 0.67 : props.size === "small" ? minHeight : minHeight * 1.17;
    }
    if (props.height) {
      minHeight = props.height;
    }
    if (!state.isDisplayOnly) {
      height = Math.max(minHeight, height);
      textareaStyle.minHeight = `${minHeight}px`;
    } else {
      textareaStyle.minHeight = `0px`;
    }
  }
  if (maxRows !== null) {
    let maxHeight = singleRowHeight * maxRows;
    if (boxSizing === STYLE.BorderBox) {
      maxHeight += borderSize + paddingSize;
    }
    height = Math.min(maxHeight, height);
  }
  textareaStyle.height = `${height}px`;
  hiddenTextarea.parentNode && hiddenTextarea.parentNode.removeChild(hiddenTextarea);
  hiddenTextarea = null;
  return textareaStyle;
};
const getInput = vm => () => vm.$refs.input || vm.$refs.textarea;
const blur = api => () => api.getInput().blur();
const focus = api => () => api.getInput().focus();
const select = api => () => api.getInput().select();
const handleBlur = ({
  api,
  componentName,
  eventName,
  emit,
  props,
  state,
  vm
}) => event => {
  state.focused = false;
  emit("blur", event);
  api.isMemoryStorage.value = false;
  if (props.validateEvent) {
    api.dispatch(componentName, eventName, [props.modelValue]);
  }
  if (props.hoverExpand) {
    vm.$refs.textarea.scrollTop = 0;
  }
};
const handleFocus = ({
  api,
  emit,
  state
}) => event => {
  state.focused = true;
  emit("focus", event);
  api.searchMemory(event.target.value);
};
const handleInput = ({
  api,
  emit,
  nextTick,
  state
}) => event => {
  if (state.isComposing) {
    return;
  }
  if (event.target.value === state.nativeInputValue) {
    return;
  }
  emit("update:modelValue", event.target.value);
  emit("input", event);
  api.searchMemory(event.target.value);
  nextTick(api.setNativeInputValue);
};
const handleChange = emit => event => emit("change", event.target.value);
const resizeTextarea = ({
  api,
  parent,
  vm,
  state,
  props
}) => () => {
  if (isServer) {
    return;
  }
  const {
    autosize,
    type
  } = parent;
  if (type !== "textarea" || !vm.$refs.textarea) {
    return;
  }
  if (props.hoverExpand && !state.enteredTextarea) {
    state.textareaCalcStyle = {
      minHeight: state.textareaHeight,
      height: state.textareaHeight
    };
    return;
  }
  if (!autosize || state.isDisplayOnly) {
    state.textareaCalcStyle = {
      minHeight: api.calcTextareaHeight(vm.$refs.textarea).minHeight
    };
    return;
  }
  const minRows = autosize.minRows;
  const maxRows = autosize.maxRows;
  state.textareaCalcStyle = api.calcTextareaHeight(vm.$refs.textarea, minRows, maxRows);
};
const setNativeInputValue = ({
  api,
  state
}) => () => {
  const input = api.getInput();
  if (!input) {
    return;
  }
  if (input.value === state.nativeInputValue) {
    return;
  }
  input.value = state.nativeInputValue;
};
const handleCompositionStart = state => () => state.isComposing = true;
const handleCompositionUpdate = state => event => {
  const text = event.target.value;
  const lastCharacter = text[text.length - 1] || "";
  state.isComposing = !isKorean(lastCharacter);
};
const handleCompositionEnd = ({
  api,
  state
}) => event => {
  if (state.isComposing) {
    state.isComposing = false;
    api.handleInput(event);
  }
};
const calcIconOffset = ({
  vm,
  parent
}) => place => {
  const elList = vm.$refs[place] ? [vm.$refs[place]] : [];
  if (!elList.length) {
    return;
  }
  let el = null;
  for (let i = 0, len = elList.length; i < len; i++) {
    if (elList[i].parentNode === parent.$el) {
      el = elList[i];
      break;
    }
  }
  if (!el) {
    return;
  }
  const pendantMap = {
    suffix: "append",
    prefix: "prepend"
  };
  const pendant = pendantMap[place];
  if (parent.$slots[pendant]) {
    const dom = vm.$refs[pendant];
    let transform;
    if (place === "suffix") {
      transform = `translateX(-${dom.offsetWidth}px) translateY(-50%)`;
    } else if (place === "prefix") {
      transform = `translate(${dom.offsetWidth}px, -50%)`;
    }
    el.style.transform = transform;
  } else {
    el.removeAttribute("style");
  }
};
const updateIconOffset = api => () => {
  api.calcIconOffset("prefix");
  api.calcIconOffset("suffix");
};
const clear = emit => () => {
  emit("update:modelValue", "");
  emit("change", "");
  emit("clear");
};
const handlePasswordVisible = ({
  api,
  nextTick,
  state
}) => () => {
  state.passwordVisible = !state.passwordVisible;
  nextTick(api.focus);
};
const getSuffixVisible = ({
  parent,
  props,
  state
}) => () => parent.$slots.suffix || props.suffixIcon || state.showClear || props.showPassword || state.isWordLimitVisible || state.validateState && state.needStatusIcon || props.mask && state.inputDisabled;
const textLength = value => {
  if (typeof value === "number") {
    return String(value).length;
  }
  return (value || "").length;
};
const watchFormSelect = ({
  emit,
  props,
  state
}) => value => {
  if (props.isSelect) {
    emit("update:modelValue", value);
    emit("change", value);
    const filterData = props.selectMenu.length && props.selectMenu.filter(item => item.id === value).shift();
    state.checkedLabel = filterData ? filterData.label : "";
  }
};
const hasSelection = api => () => {
  const input = api.getInput();
  return input && input.selectionStart !== input.selectionEnd;
};
const handleEnterDisplayOnlyContent = ({
  state,
  props
}) => ($event, type) => {
  if (type === "textarea" && props.popupMore) return;
  const target = type === "textarea" ? $event.target.querySelector(".text-box") : $event.target;
  state.displayOnlyTooltip = "";
  if (!target) {
    return;
  }
  const isOverText = target.scrollWidth > target.offsetWidth || type === "textarea" && target.scrollHeight > target.offsetHeight;
  if (isOverText) {
    state.displayOnlyTooltip = props.displayOnlyContent || state.nativeInputValue;
  } else {
    let isOverTextWhenMask = false;
    if (props.mask && state.maskValueVisible) {
      const text = target.textContent;
      const font = window.getComputedStyle(target).font;
      const rect = target.getBoundingClientRect();
      const iconWidth = 16 + 15;
      const calcText = (text == null ? void 0 : text.trim()) || "";
      isOverTextWhenMask = omitText(calcText, font, rect.width - iconWidth).o;
    }
    if (isOverTextWhenMask) {
      state.displayOnlyTooltip = props.displayOnlyContent || state.nativeInputValue;
    }
  }
};
const hiddenPassword = ({
  state,
  props
}) => () => {
  let str = "";
  const password = props.displayOnlyContent || state.nativeInputValue;
  for (let i = 0; i < password.length; i++) {
    str += "*";
  }
  return str;
};
const getDisplayedMaskValue = ({
  state
}) => () => {
  if (state.maskValueVisible) {
    return state.nativeInputValue;
  } else {
    return state.nativeInputValue && state.maskSymbol;
  }
};
const setInputDomValue = ({
  state,
  props,
  nextTick,
  vm
}) => type => {
  nextTick(() => {
    const input = vm.$refs.input;
    if (props.mask && state.nativeInputValue && input) {
      input.value = state.maskValueVisible || !state.inputDisabled ? state.nativeInputValue : state.maskSymbol;
    }
    if (type === "mask" && !props.mask && input) {
      input.value = state.nativeInputValue;
    }
  });
};
const handleEnterTextarea = ({
  api,
  state,
  props,
  nextTick
}) => () => {
  if (state.isDragging) {
    return;
  }
  if (props.hoverExpand && !state.isDisplayOnly) {
    state.enteredTextarea = true;
    nextTick(api.resizeTextarea);
  }
};
const handleLeaveTextarea = ({
  api,
  state,
  props,
  nextTick,
  vm
}) => () => {
  if (state.isDragging) {
    return;
  }
  if (props.hoverExpand && !state.isDisplayOnly) {
    state.enteredTextarea = false;
    nextTick(() => {
      api.resizeTextarea();
      vm.$refs.textarea.scrollTop = 0;
    });
  }
};
const getDisplayOnlyText = ({
  parent,
  state,
  props
}) => () => {
  const text = props.displayOnlyContent || state.nativeInputValue;
  const showEmptyValue = typeof props.showEmptyValue === "boolean" ? props.showEmptyValue : (parent.tinyForm || {}).showEmptyValue;
  return showEmptyValue ? text : text || "-";
};
const setShowMoreBtn = ({
  state,
  vm
}) => init => {
  if (state.timer) clearTimeout(state.timer);
  state.timer = setTimeout(() => {
    const textBox = vm.$refs && vm.$refs.textBox;
    if (!textBox) return;
    if (init && textBox.offsetHeight === 0) {
      let textBoxClone = textBox.cloneNode(true);
      textBoxClone.style.visibility = "hidden";
      textBoxClone.style.position = "absolute";
      textBoxClone.style.left = "-9999px";
      document.body.appendChild(textBoxClone);
      if (textBoxClone.scrollHeight > textBoxClone.offsetHeight) {
        state.showMoreBtn = true;
      }
      document.body.removeChild(textBoxClone);
      textBoxClone = null;
    } else if (textBox.scrollHeight > textBox.offsetHeight) {
      state.showMoreBtn = true;
    } else {
      state.showMoreBtn = false;
    }
  }, 100);
};
const handleTextareaMouseDown = ({
  state
}) => () => state.isDragging = true;
const handleTextareaMouseUp = ({
  state,
  api
}) => isOutside => {
  state.isDragging = false;
  if (isOutside) {
    api.handleLeaveTextarea();
  }
};
export { blur, calcIconOffset, calcTextareaHeight, calculateNodeStyling, clear, focus, getDisplayOnlyText, getDisplayedMaskValue, getInput, getSuffixVisible, handleBlur, handleChange, handleCompositionEnd, handleCompositionStart, handleCompositionUpdate, handleEnterDisplayOnlyContent, handleEnterTextarea, handleFocus, handleInput, handleLeaveTextarea, handlePasswordVisible, handleTextareaMouseDown, handleTextareaMouseUp, hasSelection, hiddenPassword, inputStyle, resizeTextarea, select, setInputDomValue, setNativeInputValue, setShowMoreBtn, showBox, textLength, updateIconOffset, watchFormSelect };