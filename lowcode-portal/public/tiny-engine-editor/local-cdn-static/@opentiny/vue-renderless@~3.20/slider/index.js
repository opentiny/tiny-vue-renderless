import "../chunk-G2ADBYYC.js";
import { KEY_CODE } from './../common/index.js';
import { emitEvent } from './../common/event.js';
import { on, off, hasClass } from './../common/deps/dom.js';
import { toNumber } from './../common/string.js';
const bindEvent = api => () => {
  on(window, "resize", api.bindResize);
  api.bindResize();
};
const unBindEvent = api => () => off(window, "resize", api.bindResize);
const bindResize = ({
  vm,
  props,
  state
}) => () => {
  const handleEl = vm.$refs.slider;
  state.sliderSize = handleEl["client" + (props.vertical ? "Height" : "Width")];
  state.sliderOffset = handleEl.getBoundingClientRect();
};
const bindKeyDown = ({
  api,
  props,
  state
}) => event => {
  if (state.disabled || state.activeIndex < 0) {
    return;
  }
  event.preventDefault();
  let currentValue = 0;
  switch (event.keyCode) {
    case KEY_CODE.Home:
      currentValue = props.min;
      break;
    case KEY_CODE.End:
      currentValue = props.max;
      break;
    case KEY_CODE.PageUp:
      currentValue = state.activeValue + Math.ceil(state.rangeDiff / props.numPages);
      break;
    case KEY_CODE.PageDown:
      currentValue = state.activeValue - Math.ceil(state.rangeDiff / props.numPages);
      break;
    case KEY_CODE.ArrowUp:
    case KEY_CODE.ArrowRight:
      currentValue = state.activeValue + props.step;
      break;
    case KEY_CODE.ArrowDown:
    case KEY_CODE.ArrowLeft:
      currentValue = state.activeValue - props.step;
      break;
    default:
      currentValue = state.activeValue;
      break;
  }
  api.setActiveButtonValue(currentValue);
  api.setButtonStyle();
  api.setBarStyle();
};
const bindMouseDown = ({
  api,
  constants,
  mode,
  emit,
  state,
  props
}) => event => {
  if (event.button !== 0 && event.detail !== 0) {
    state.activeIndex = -1;
    return;
  }
  if (!emitEvent(emit, "start", api.getActiveButtonValue())) {
    state.activeIndex = -1;
    return;
  }
  const handleEl = event.target;
  let isClickBar = false;
  let isClickBtn = false;
  let isClickLabel = false;
  if (mode === "mobile-first") {
    const role = Array.from(handleEl.attributes).find(attr => attr.name === "role");
    const name = role && role.value;
    isClickBar = name === constants.PC_SLIDER_CLS || name === constants.PC_RANGE_CLS;
    isClickBtn = name === constants.PC_BUTTON_CLS;
  } else {
    isClickBar = hasClass(handleEl, constants.sliderCls(mode)) || hasClass(handleEl, constants.rangeCls(mode));
    isClickBtn = hasClass(handleEl, constants.buttonCls(mode)) || hasClass(handleEl, constants.leftSvgCls(mode)) || hasClass(handleEl, constants.rightSvgCls(mode));
    isClickLabel = hasClass(handleEl, constants.PC_LABEL_CLS);
  }
  if (state.disabled || !isClickBtn && !isClickBar && !isClickLabel) {
    state.activeIndex = -1;
    return;
  }
  api.bindResize();
  on(window, "mouseup", api.bindMouseUp);
  on(window, "mousemove", api.bindMouseMove);
  on(window, "touchend", api.bindMouseUp);
  on(window, "touchmove", api.bindMouseMove);
  state.isDrag = isClickBtn;
  isClickBtn && (state.activeIndex = api.getActiveButtonIndex(event));
  if (isClickBar || isClickLabel) {
    const currentValue = api.calculateValue(event);
    if (state.isDouble) {
      if (Math.abs(currentValue - state.leftBtnValue) > Math.abs(state.rightBtnValue - currentValue)) {
        api.changeActiveValue(state.rightBtnValue < state.leftBtnValue);
      } else {
        api.changeActiveValue(state.rightBtnValue > state.leftBtnValue);
      }
    }
    api.setActiveButtonValue(currentValue);
    api.setButtonStyle();
    api.setBarStyle();
    emit("stop", api.getActiveButtonValue());
    if (!props.changeCompat) {
      emit("change", api.getActiveButtonValue());
    }
  }
};
const bindMouseMove = ({
  api,
  nextTick,
  state
}) => event => {
  if (state.disabled || !state.isDrag) {
    return;
  }
  api.setActiveButtonValue(api.calculateValue(event));
  api.setButtonStyle();
  api.setBarStyle();
  nextTick(() => {
    api.setTipStyle();
  });
};
const bindMouseUp = ({
  api,
  emit,
  state,
  props
}) => () => {
  if (state.disabled || !state.isDrag) {
    return;
  }
  if (state.mouseOuterBtn) {
    state.showTip = false;
  }
  state.isDrag = false;
  off(window, "mouseup", api.bindMouseUp);
  off(window, "mousemove", api.bindMouseMove);
  off(window, "touchend", api.bindMouseUp);
  off(window, "touchmove", api.bindMouseMove);
  emit("stop", api.getActiveButtonValue());
  if (!props.changeCompat) {
    emit("change", api.getActiveButtonValue());
  }
};
const displayTip = ({
  api,
  nextTick,
  state
}) => event => {
  state.mouseOuterBtn = false;
  if (!state.showTip) {
    state.showTip = true;
    api.changeActiveValue(api.getActiveButtonIndex(event) === 0);
    nextTick(() => {
      api.setTipStyle();
    });
  }
};
const hideTip = state => () => {
  state.mouseOuterBtn = true;
  !state.isDrag && (state.showTip = false);
};
const setTipStyle = ({
  constants,
  mode,
  vm,
  props,
  state
}) => () => {
  if (!props.showTip) {
    return;
  }
  const tipStyle = {
    top: 0,
    left: 0
  };
  const tipEl = vm.$refs.sliderTip;
  const moveSize = (state.activeValue - props.min) / state.rangeDiff * state.sliderSize;
  if (props.vertical) {
    tipStyle.top = state.sliderSize - moveSize - constants.BUTTON_SIZE - constants.TIP_HEIGHT / 2 + constants.HALF_BAR_HEIGHT;
    tipStyle.left = -tipEl.getBoundingClientRect().width / 2 + constants.HALF_BAR_HEIGHT;
  } else {
    tipStyle.top = -constants.TIP_HEIGHT - constants.BUTTON_SIZE / 2 + constants.HALF_BAR_HEIGHT;
    tipStyle.left = moveSize - tipEl.getBoundingClientRect().width / 2;
  }
  if (mode === "mobile-first") {
    state.tipStyle = {
      left: tipStyle.left + "px"
    };
  } else {
    state.tipStyle = {
      top: tipStyle.top + "px",
      left: tipStyle.left + "px"
    };
  }
};
const getActiveButtonIndexFlag = ({
  state,
  event,
  constants,
  mode
}) => {
  const cls = constants.buttonCls(mode);
  const {
    previousElementSibling
  } = event.target;
  if (mode === "mobile-first") {
    const role = Array.from(previousElementSibling.attributes).find(attr => attr.name === "role");
    const name = role && role.value;
    return state.isDouble && name === constants.PC_BUTTON_CLS;
  } else {
    return state.isDouble && (hasClass(previousElementSibling, cls) || event.target.className.baseVal === "tiny-slider-right-svg");
  }
};
const getActiveButtonIndex = ({
  constants,
  mode,
  state
}) => event => {
  const flag = getActiveButtonIndexFlag({
    state,
    event,
    constants,
    mode
  });
  return flag ? 1 : 0;
};
const calcCurrentValue = ({
  currentValue,
  props,
  state
}) => {
  if (Array.isArray(currentValue)) {
    currentValue = currentValue[state.activeIndex];
  }
  if (currentValue <= props.min) {
    currentValue = props.min;
  } else if (currentValue >= props.max) {
    currentValue = props.max;
  } else {
    const step = props.step > 0 ? props.step : 1;
    let stepPrecision = 0;
    if (step - parseInt(step) > 0) {
      stepPrecision = step.toString().split(".")[1].length;
    }
    const stepValue = (currentValue - props.min) % step;
    if (stepValue) {
      currentValue -= stepValue;
      currentValue += stepValue * 2 > step ? Number(step) : 0;
      if (stepPrecision) {
        currentValue = Number(currentValue.toFixed(stepPrecision));
      }
    }
    if (state.isDouble) {
      if (state.activeIndex === 0 && currentValue >= state.rightBtnValue) {
        currentValue = state.rightBtnValue;
      } else if (state.activeIndex === 1 && currentValue <= state.leftBtnValue) {
        currentValue = state.leftBtnValue;
      }
    }
  }
  return currentValue;
};
const setActiveButtonValue = ({
  api,
  emit,
  props,
  state
}) => value => {
  if (Array.isArray(value)) {
    ;
    [state.leftBtnValue, state.rightBtnValue] = value;
  } else {
    let currentValue = calcCurrentValue({
      currentValue: value,
      props,
      state
    });
    if (!state.isDouble) {
      state.leftBtnValue = currentValue;
    } else {
      if (state.activeIndex === 0) {
        state.leftBtnValue = currentValue;
      } else {
        state.rightBtnValue = currentValue;
      }
    }
    state.activeValue = currentValue;
  }
  state.innerTrigger = true;
  emit("update:modelValue", api.getActiveButtonValue());
};
const setButtonStyle = ({
  props,
  state
}) => () => {
  const percent = (state.activeValue - props.min) / state.rangeDiff * 100;
  const style = (props.vertical ? "bottom" : "left") + ":" + percent + "%";
  if (!state.isDouble || state.activeIndex === 0) {
    state.leftBtnPercent = percent;
    state.leftBtnStyle = style;
  } else {
    state.rightBtnPercent = percent;
    state.rightBtnStyle = style;
  }
};
const setBarStyle = ({
  props,
  state
}) => () => {
  const minSize = Math.abs(state.leftBtnPercent - state.rightBtnPercent);
  const maxSize = Math.max(state.leftBtnPercent, state.rightBtnPercent);
  if (props.vertical) {
    state.barStyle = {
      bottom: maxSize - minSize + "%",
      height: minSize + "%"
    };
  } else {
    state.barStyle = {
      left: maxSize - minSize + "%",
      width: minSize + "%"
    };
  }
};
const initSlider = ({
  api,
  props,
  state
}) => value => {
  if (state.isDrag) return;
  state.isDouble = Array.isArray(value);
  const sliders = state.isDouble ? value : [value];
  sliders.length > 2 && (sliders.length = 2);
  sliders.forEach((item, index) => {
    if (index === 0) {
      state.leftBtnValue = Math.max(Number(item), props.min);
    } else {
      state.rightBtnValue = Math.min(Number(item), props.max);
      state.rightBtnShow = true;
    }
    api.changeActiveValue(index === 0);
    api.setButtonStyle();
  });
  api.setBarStyle();
};
const calculateValue = ({
  props,
  state,
  vm
}) => event => {
  let currentValue = 0;
  if (state.sliderSize === 0) {
    const handleEl = vm.$refs.slider;
    state.sliderSize = handleEl["client" + (props.vertical ? "Height" : "Width")];
    state.sliderOffset = handleEl.getBoundingClientRect();
  }
  const offset = state.sliderOffset;
  if (event.type === "touchmove" || event.type === "touchstart" || event.type === "touchend") {
    if (props.vertical) {
      currentValue = props.max - (event.touches[0].pageY - offset.top) / state.sliderSize * state.rangeDiff;
    } else {
      currentValue = props.min + (event.touches[0].pageX - offset.left) / state.sliderSize * state.rangeDiff;
    }
  } else {
    if (props.vertical) {
      currentValue = props.max - (event.pageY - offset.top) / state.sliderSize * state.rangeDiff;
    } else {
      currentValue = props.min + (event.pageX - offset.left) / state.sliderSize * state.rangeDiff;
    }
  }
  return currentValue;
};
const changeActiveValue = state => isLeft => {
  state.activeIndex = isLeft ? 0 : 1;
  state.activeValue = isLeft ? state.leftBtnValue : state.rightBtnValue;
};
const formatTipValue = props => value => props.formatTooltip instanceof Function ? props.formatTooltip(value) : value;
const getActiveButtonValue = state => () => state.isDouble ? [state.leftBtnValue, state.rightBtnValue] : state.leftBtnValue;
const autoSlider = api => value => {
  api.setActiveButtonValue(value);
  api.setButtonStyle();
  api.setBarStyle();
};
const customBeforeAppearHook = props => el => {
  if (props.vertical) {
    el.style.bottom = "0%";
    el.style.height = "0%";
  } else {
    el.style.left = "0%";
    el.style.width = "0%";
  }
};
const customAppearHook = () => el => {
  el.style.transition = "all 0.5s";
};
const customAfterAppearHook = ({
  state,
  props
}) => el => {
  const minSize = Math.abs(state.leftBtnPercent - state.rightBtnPercent);
  const maxSize = Math.max(state.leftBtnPercent, state.rightBtnPercent);
  if (props.vertical) {
    el.style.bottom = maxSize - minSize + "%";
    el.style.height = minSize + "%";
  } else {
    if (state.isDouble) {
      el.style.left = maxSize - minSize + "%";
      el.style.width = minSize + "%";
    } else {
      el.style.width = minSize + "%";
    }
  }
};
const watchActiveValue = ({
  api,
  emit,
  props,
  state
}) => (newValue, oldValue) => {
  const nNewValue = toNumber(newValue) || 0;
  const nOldValue = toNumber(oldValue) || 0;
  if (nNewValue !== nOldValue) {
    api.autoSlider(nNewValue);
    if (nNewValue <= props.max && nNewValue >= props.min) {
      const value = api.getActiveButtonValue();
      if (state.lastValue && state.lastValue.toString() !== value.toString()) {
        emit("change", value);
      }
      state.lastValue = value;
    }
  } else {
    state.activeValue = nNewValue || 0;
  }
};
const watchModelValue = ({
  api,
  state
}) => value => {
  if (!state.innerTrigger) {
    api.initSlider(value);
    api.setActiveButtonValue(value);
  } else {
    state.innerTrigger = false;
    if (!state.isDouble) {
      api.initSlider(value);
      api.setActiveButtonValue(value);
    }
  }
  if (!state.isSlotTyping) {
    api.updateSlotValue();
  }
};
const getPoints = ({
  props,
  state
}) => () => {
  if (props.showSteps && props.step > 0) {
    state.points = [];
    const num = Math.floor(props.max / props.step);
    for (let i = 1; i < num; i++) {
      const point = {
        position: i / num * 100 + "%",
        value: i / num * props.max
      };
      state.points.push(point);
    }
  }
};
const getLabels = ({
  props,
  state
}) => () => {
  if (props.showLabel) {
    state.labels = [];
    const isFunction = props.formatLabel instanceof Function;
    const num = Math.floor(props.max / props.step);
    for (let i = 0; i <= num; i++) {
      const val = i / num * props.max;
      const label = {
        position: i / num * 100 + "%",
        label: isFunction ? props.formatLabel(val, i) : val,
        value: val
      };
      state.labels.push(label);
    }
  }
};
const getMarkList = ({
  props
}) => () => {
  const markList = [];
  if (!props.marks) {
    return markList;
  }
  for (const [key, label] of Object.entries(props.marks)) {
    const markValue = Number(key);
    if (markValue >= props.min && markValue <= props.max) {
      const percent = (markValue - props.min) / (props.max - props.min);
      markList.push({
        value: markValue,
        label,
        percent,
        positionStyle: {
          [props.vertical ? "bottom" : "left"]: percent * 100 + "%"
        }
      });
    }
  }
  return markList;
};
const inputValueChange = ({
  props,
  state,
  api,
  emit
}) => ($event, pos) => {
  if (props.disabled || !state.isDouble) return;
  if (!/^\d+$/.test($event.target.value)) {
    if (pos === "left") {
      state.inputValue.splice(0, 1, state.leftBtnValue);
    } else {
      state.inputValue.splice(1, 1, state.rightBtnValue);
    }
    return;
  }
  api.initSlider([Math.min(...state.inputValue), Math.max(...state.inputValue)]);
  if (!props.changeCompat) {
    emit("change", api.getActiveButtonValue());
  }
};
const handleSlotInputFocus = state => () => {
  state.isSlotTyping = true;
};
const handleSlotInputBlur = ({
  state,
  api
}) => () => {
  state.isSlotTyping = false;
  api.updateSlotValue();
};
const updateSlotValue = ({
  state
}) => () => {
  if (!state.isDouble) {
    state.slotValue = state.activeValue;
  } else {
    state.slotValue = state.activeIndex === 0 ? [state.activeValue, state.rightBtnValue] : [state.leftBtnValue, state.activeValue];
  }
};
const handleSlotInput = ({
  state,
  api
}) => (event, isLeftInput = true) => {
  const inputValue = event.target.value;
  api.changeActiveValue(state.isDouble ? isLeftInput : true);
  state.activeValue = Number(inputValue);
  api.updateSlotValue();
};
const inputOnChange = ({
  api,
  emit,
  props,
  state
}) => currentValue => {
  if (!props.changeCompat) {
    if (!/^\d+$/.test(currentValue)) {
      state.activeValue = state.leftBtnValue;
      return;
    }
    const value = toNumber(state.activeValue) || 0;
    api.autoSlider(value);
    emit("change", api.getActiveButtonValue());
  }
};
export { autoSlider, bindEvent, bindKeyDown, bindMouseDown, bindMouseMove, bindMouseUp, bindResize, calculateValue, changeActiveValue, customAfterAppearHook, customAppearHook, customBeforeAppearHook, displayTip, formatTipValue, getActiveButtonIndex, getActiveButtonValue, getLabels, getMarkList, getPoints, handleSlotInput, handleSlotInputBlur, handleSlotInputFocus, hideTip, initSlider, inputOnChange, inputValueChange, setActiveButtonValue, setBarStyle, setButtonStyle, setTipStyle, unBindEvent, updateSlotValue, watchActiveValue, watchModelValue };