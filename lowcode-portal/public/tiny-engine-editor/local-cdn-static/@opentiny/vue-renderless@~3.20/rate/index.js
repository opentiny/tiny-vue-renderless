import "../chunk-G2ADBYYC.js";
import { KEY_CODE } from './../common/index.js';
const computedActiveColor = props => state => {
  let result = "";
  if (state.currentValue <= props.lowThreshold) {
    result = state.colorMap.lowColor;
  } else if (state.currentValue >= props.highThreshold) {
    result = state.colorMap.highColor;
  } else {
    result = state.colorMap.mediumColor;
  }
  return result;
};
const computedActiveClass = props => state => {
  let result = "";
  if (state.currentValue <= props.lowThreshold) {
    result = state.classMap.lowClass;
  } else if (state.currentValue >= props.highThreshold) {
    result = state.classMap.highClass;
  } else {
    result = state.classMap.mediumClass;
  }
  return result;
};
const getTextStyle = ({
  props,
  state
}) => () => {
  const color = props.radio && state.currentValue ? props.textColor : state.activeColor;
  return {
    color
  };
};
const handelKey = ({
  emit,
  props,
  state
}) => event => {
  let current = state.currentValue;
  const keyCode = event.keyCode;
  if (props.disabled) {
    return;
  }
  if (keyCode === KEY_CODE.ArrowUp || keyCode === KEY_CODE.ArrowRight) {
    current += props.allowHalf ? 0.5 : 1;
    event.stopPropagation();
    event.preventDefault();
  } else if (keyCode === KEY_CODE.ArrowLeft || keyCode === KEY_CODE.ArrowDown) {
    current -= props.allowHalf ? 0.5 : 1;
    event.stopPropagation();
    event.preventDefault();
  }
  current = current < 0 ? 0 : current;
  current = current > props.max ? props.max : current;
  emit("update:modelValue", current);
  emit("change", current);
};
const selectValue = ({
  emit,
  props,
  state
}) => value => {
  if (props.disabled) {
    return;
  }
  if (props.allowHalf && state.pointerAtLeftHalf) {
    value = state.currentValue;
  }
  emit("update:modelValue", value);
  emit("change", value);
};
const setCurrentValue = ({
  constants: {
    RATENODECLS,
    DECIMALCLS,
    ICON_PREFIXCLS
  },
  props,
  state,
  parent,
  api
}) => ({
  event,
  item
}) => {
  if (props.disabled) {
    return;
  }
  if (!parent.$el.contains(state.mouseTarget)) {
    api.resetCurrentValue();
  }
  if (props.allowHalf) {
    let target = event.target;
    let className = target.className;
    let key = target.parentElement ? "parentElement" : "parentNode";
    if (target.nodeName === "svg") {
      className = target[key].className;
      target = target[key];
    }
    if (target.nodeName === "path") {
      for (let i = 0; i < 10; i++) {
        target = target[key];
        if (target.nodeName === "svg") {
          className = target[key].className;
          target = target[key];
          break;
        }
      }
    }
    if (className.includes(RATENODECLS)) {
      target = target.querySelector(ICON_PREFIXCLS);
    }
    if (className.includes(DECIMALCLS)) {
      target = target.parentNode;
    }
    state.pointerAtLeftHalf = event.offsetX * 2 <= target.clientWidth;
    state.currentValue = state.pointerAtLeftHalf ? item - 0.5 : item;
  } else {
    state.currentValue = item;
  }
  state.hoverIndex = item;
};
const resetCurrentValue = ({
  props,
  state
}) => () => {
  if (props.disabled) {
    return;
  }
  if (props.allowHalf) {
    state.pointerAtLeftHalf = props.modelValue !== Math.floor(props.modelValue);
  }
  state.currentValue = props.modelValue;
  state.hoverIndex = -1;
};
const showDecimalIcon = ({
  props,
  state
}) => item => {
  const decimal = props.modelValue * 100 - Math.floor(props.modelValue) * 100;
  const showWhenDisabled = props.disabled && decimal > 0 && item - 1 < props.modelValue && item > props.modelValue;
  const showWhenAllowHalf = props.allowHalf && state.pointerAtLeftHalf && item - 0.5 <= state.currentValue && item > state.currentValue;
  return showWhenDisabled || showWhenAllowHalf;
};
const getIconStyle = ({
  api,
  props,
  state
}) => item => {
  const isHalf = api.showDecimalIcon(item);
  const voidColor = props.disabled ? props.disabledVoidColor : props.voidColor;
  if (props.radio) {
    return {
      fill: item === state.currentValue ? state.activeColor : voidColor,
      "font-size": props.size || "18px"
    };
  }
  return {
    fill: isHalf ? "transparent" : item <= state.currentValue ? state.activeColor : voidColor,
    "font-size": props.size || "18px"
  };
};
const computedText = ({
  props,
  state
}) => {
  let result = "";
  let currentValue = 0;
  if (!isNaN(Number(state.currentValue))) {
    currentValue = Number(state.currentValue) > 0 ? Number(state.currentValue) : 0;
  }
  if (currentValue > props.texts.length) {
    currentValue = props.texts.length;
  }
  if (props.showScore) {
    result = props.scoreTemplate.replace(/\{\s*value\s*\}/, String(currentValue));
    return result;
  }
  if (props.showText && currentValue > 0) {
    currentValue = Math.ceil(currentValue) - 1;
    result = props.texts[currentValue];
  }
  return result;
};
const computedDecimalStyle = ({
  props,
  state
}) => {
  let width = "";
  let clip = "";
  let clipPath = "";
  let fontSize = "";
  if (props.disabled) {
    width = `${props.modelValue * 100 - Math.floor(props.modelValue) * 100 < 50 ? 0 : 100}%`;
  }
  if (props.allowHalf) {
    width = "";
    const reactSize = props.size ? Math.ceil(parseInt(props.size) / 2) + "px" : "6px";
    clip = `rect(0px, ${reactSize}, ${props.size || "14px"}, 0px)`;
    clipPath = "inset(0 50% 0 0)";
    fontSize = props.size || "18px";
  }
  return {
    fill: state.activeColor,
    width,
    clip,
    clipPath,
    fontSize
  };
};
const computedClasses = ({
  props,
  state
}) => {
  let i = 0;
  let result = [];
  let threshold = state.currentValue;
  if (props.radio) {
    result = props.iconClasses;
  } else {
    if (props.allowHalf && state.currentValue !== Math.floor(state.currentValue)) {
      threshold--;
    }
    while (i < threshold) {
      result.push(state.activeClass);
      i++;
    }
    while (i < props.max) {
      result.push(state.voidClass);
      i++;
    }
  }
  return result;
};
const computedClassMap = props => ({
  lowClass: props.iconClasses[0],
  mediumClass: props.iconClasses[1],
  highClass: props.iconClasses[2],
  voidClass: props.voidIconClass,
  disabledVoidClass: props.disabledVoidIconClass
});
const computedColorMap = props => ({
  lowColor: props.colors[0],
  mediumColor: props.colors[1],
  highColor: props.colors[2],
  voidColor: props.voidColor,
  disabledVoidColor: props.disabledVoidColor
});
const computedVoidClass = ({
  props,
  state
}) => props.disabled ? state.classMap.disabledVoidClass : state.classMap.voidClass;
export { computedActiveClass, computedActiveColor, computedClassMap, computedClasses, computedColorMap, computedDecimalStyle, computedText, computedVoidClass, getIconStyle, getTextStyle, handelKey, resetCurrentValue, selectValue, setCurrentValue, showDecimalIcon };