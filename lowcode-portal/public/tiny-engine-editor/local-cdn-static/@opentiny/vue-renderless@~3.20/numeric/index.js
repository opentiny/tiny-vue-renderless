import { __spreadProps, __spreadValues } from "../chunk-G2ADBYYC.js";
import { formatNumber, roundFixed } from './../common/decimal.js';
import { getMiniDecimal, lessEquals, equalsDecimal } from './../common/bigInt.js';
import { isNumber, isNull } from './../common/type.js';
import { MOUSEDELTA } from './../common/index.js';
import { on, off } from './../common/deps/dom.js';
const initService = service => {
  const {
    utils = {}
  } = service || {};
  const noopFn = () => null;
  return {
    getUnitPrecision: utils.getUnitPrecision || noopFn,
    getNumberFormat: utils.getNumberFormat || noopFn
  };
};
const getDecimal = props => value => getMiniDecimal(value, props.plugin);
const watchValue = ({
  api,
  props,
  state
}) => value => {
  if (value === state.currentValue) {
    return;
  }
  api.setCurrentValue(value, props.changeCompat);
};
const toPrecision = state => ({
  num,
  precision
}) => {
  if (precision === void 0) {
    precision = state.numPrecision;
  }
  return parseFloat(Math.round(num * 10 ** precision) / 10 ** precision);
};
const getPrecision = () => value => {
  if (value === void 0) {
    return 0;
  }
  const valueString = value.toString();
  const dotPosition = valueString.indexOf(".");
  let precision = 0;
  if (dotPosition !== -1) {
    precision = valueString.length - dotPosition - 1;
  }
  return precision;
};
const internalIncrease = ({
  api,
  state
}) => ({
  val,
  step
}) => {
  const decimal = api.getDecimal(val);
  if (decimal.isNaN() && val !== void 0) {
    return state.currentValue;
  }
  const addValue = decimal.add(step).toString();
  return addValue;
};
const internalDecrease = ({
  api,
  state
}) => ({
  val,
  step
}) => {
  const decimal = api.getDecimal(val);
  if (decimal.isNaN() && val !== void 0) {
    return state.currentValue;
  }
  const decreaseValue = decimal.add(`-${step}`).toString();
  return decreaseValue;
};
const increase = ({
  api,
  props,
  state
}) => () => {
  var _a, _b;
  if (state.inputDisabled || state.maxDisabled) {
    return;
  }
  const userInput = props.stringMode ? state.userInput : Number(state.userInput);
  const value = (props.mouseWheel ? state.displayValue : userInput) || 0;
  if (value.toString().includes("e")) {
    return;
  }
  let newVal = api.internalIncrease({
    val: value,
    step: (_b = (_a = props.step) == null ? void 0 : _a.value) != null ? _b : props.step
  });
  if (!props.circulate || !isFinite(props.max) || !isFinite(props.min)) {
    api.setCurrentValue(newVal);
    return;
  }
  if (!lessEquals(newVal, props.max) || lessEquals(newVal, props.min)) {
    newVal = props.min;
  }
  api.setCurrentValue(newVal);
};
const decrease = ({
  api,
  props,
  state
}) => () => {
  var _a, _b;
  if (state.inputDisabled || state.minDisabled) {
    return;
  }
  const userInput = props.stringMode ? state.userInput : Number(state.userInput);
  const value = (props.mouseWheel ? state.displayValue : userInput) || 0;
  if (value.toString().includes("e")) {
    return;
  }
  let newVal = api.internalDecrease({
    val: value,
    step: (_b = (_a = props.step) == null ? void 0 : _a.value) != null ? _b : props.step
  });
  if (!props.circulate || !isFinite(props.max) || !isFinite(props.min)) {
    api.setCurrentValue(newVal);
    return;
  }
  if (!lessEquals(props.min, newVal) || lessEquals(props.max, newVal)) {
    newVal = props.max;
  }
  api.setCurrentValue(newVal);
};
const handleBlur = ({
  constants,
  dispatch,
  emit,
  props,
  state,
  api
}) => event => {
  state.inputStatus = false;
  api.setCurrentValue(event.target.value);
  emit("blur", event);
  if (props.validateEvent) {
    dispatch(constants.COMPONENT_NAME, constants.EVENT_NAME.blur, [state.displayValue]);
  }
};
const handleFocus = ({
  emit,
  state,
  props,
  api,
  vm
}) => event => {
  if (props.disabled) {
    vm.$refs.input.blur();
  }
  state.inputStatus = true;
  const currentValue = api.getDecimal(state.currentValue);
  if (!currentValue.isNaN() && !isNull(state.currentValue)) {
    const fractionLen = (currentValue.toString().split(".")[1] || "").length;
    if (fractionLen < state.format.fraction && props.holdZero) {
      state.currentValue = formatNumber(state.currentValue, {
        fraction: state.format.fraction
      });
      state.userInput = state.currentValue;
      state.lastInput = state.currentValue;
    }
  }
  emit("focus", event);
};
const focus = vm => () => {
  vm.$refs.input.focus();
};
const getEmitValue = args => {
  let {
    newVal,
    emitValue,
    allowEmpty,
    defaultVal,
    bigNew,
    oldVal,
    emptyValue
  } = args;
  let {
    max,
    min,
    api,
    props,
    format,
    plugin,
    stringMode
  } = args;
  if (!newVal && newVal !== 0) {
    emitValue = allowEmpty ? emptyValue : defaultVal;
  } else if (bigNew.isNaN()) {
    emitValue = oldVal;
  } else {
    if (isFinite(max) && lessEquals(max, newVal)) {
      newVal = max;
    }
    if (isFinite(min) && lessEquals(newVal, min)) {
      newVal = min;
    }
    emitValue = api.getDecimal(newVal).toString();
    if (props.modelTruncation) {
      emitValue = roundFixed(emitValue, format.fraction, format.rounding, plugin);
    }
    if (!props.holdZero) {
      emitValue = api.getDecimal(emitValue).toString();
    }
    if (!stringMode) {
      emitValue = Number(emitValue);
    }
  }
  return {
    newVal,
    emitValue
  };
};
const setCurrentValue = ({
  api,
  constants,
  dispatch,
  emit,
  props,
  state
}) => (newVal, emitChangeFlag = true) => {
  var _a, _b;
  const {
    max,
    min,
    allowEmpty,
    validateEvent,
    stringMode,
    plugin,
    emptyValue
  } = props;
  const {
    format
  } = state;
  const oldVal = state.currentValue;
  const bigNew = api.getDecimal(newVal);
  const defaultVal = isFinite(min) ? min : 0;
  let emitValue = bigNew.toString();
  if (equalsDecimal(state.currentValue, newVal)) {
    state.userInput = state.currentValue;
    return;
  }
  let args = {
    newVal,
    emitValue,
    allowEmpty,
    defaultVal,
    bigNew,
    oldVal,
    emptyValue
  };
  Object.assign(args, {
    max,
    min,
    api,
    props,
    format,
    plugin,
    stringMode
  });
  let ret = getEmitValue(args);
  newVal = ret.newVal;
  emitValue = ret.emitValue;
  state.userInput = emitValue;
  state.lastInput = emitValue;
  if (emitValue !== oldVal) {
    emit("update:modelValue", emitValue);
    if (emitChangeFlag) {
      emit("change", emitValue, oldVal);
    }
    state.currentValue = emitValue;
    state.userInput = emitValue;
    if (validateEvent && oldVal === "") {
      dispatch(constants.COMPONENT_NAME, constants.EVENT_NAME.blur, [state.currentValue]);
    }
    if (validateEvent) {
      dispatch(constants.COMPONENT_NAME, constants.EVENT_NAME.change, [state.currentValue]);
    }
    if (props.step instanceof Object && ((_a = props.step) == null ? void 0 : _a.mode) === "restore" && ((_b = props.step) == null ? void 0 : _b.value)) {
      const stepValue = Number(props.step.value);
      if (stepValue > 1 && newVal % stepValue !== 0) {
        state.currentValue = oldVal;
        state.userInput = oldVal;
      }
    }
  }
};
const handleInput = ({
  state,
  api,
  emit,
  props
}) => event => {
  if (event.isComposing) {
    return;
  }
  const {
    fraction
  } = state.format;
  const emitError = () => {
    if (state.pasting) {
      emit("paste-error", event.target.value);
    }
  };
  let value = event.target.value.replace(/^-+/, "-");
  if (value !== "-" && api.getDecimal(value).isNaN()) {
    emitError();
    if (!(value === "" && props.allowEmpty)) {
      value = state.lastInput;
    }
  } else {
    value = value.split(".").map((a, i) => {
      if (i && a.length > fraction) {
        emitError();
      }
      return i && state.strictInput && typeof fraction === "number" ? a.substr(0, fraction) : a;
    }).join(".");
  }
  event.target.value = isNull(value) ? "" : value;
  state.lastInput = value;
  state.userInput = value;
};
const handleInputChange = ({
  api,
  state,
  props
}) => event => {
  var _a, _b, _c;
  const value = ((_a = event.target) == null ? void 0 : _a.value) === "-" ? 0 : (_b = event.target) == null ? void 0 : _b.value;
  if (props.stepStrictly || typeof props.step === "object" && ((_c = props.step) == null ? void 0 : _c.mode) === "strictly") {
    const previousValue = Number((props.mouseWheel ? state.displayValue : props.modelValue) || 0);
    if (Math.abs(previousValue - value) % Number(props.step) === 0 || Math.abs(previousValue - value) % Number(props.step.value) === 0) return api.setCurrentValue(value);
    const step = Number(props.step) || Number(props.step.value);
    const difference = value - previousValue;
    const sign = difference >= 0 ? 1 : -1;
    return api.setCurrentValue(sign * Math.round(Math.abs(difference) / step) * step + previousValue);
  }
  api.setCurrentValue(value);
};
const select = vm => () => vm.$refs.input.select();
const mounted = ({
  constants,
  parent,
  props,
  state
}) => () => {
  if (props.shape === "filter") {
    state.controls = false;
  }
  if (isNumber(state.currentValue) && state.currentValue < props.min) {
    state.currentValue = props.min;
    state.lastInput = props.min;
    state.userInput = props.min;
  }
  if (isNumber(state.currentValue) && state.currentValue > props.max) {
    state.currentValue = props.max;
    state.lastInput = props.max;
    state.userInput = props.max;
  }
  const innerInput = parent.$el.querySelector("input");
  innerInput.setAttribute(constants.KEY, constants.VALUE);
  innerInput.setAttribute(constants.MAX, props.max);
  innerInput.setAttribute(constants.MIN, props.min);
  innerInput.setAttribute(constants.VALUENOW, state.currentValue);
  innerInput.setAttribute(constants.DISABLED, state.inputDisabled);
  state.onPase = () => {
    state.pasting = true;
    setTimeout(() => state.pasting = false);
  };
  on(innerInput, "paste", state.onPase);
};
const unmounted = ({
  parent,
  state
}) => () => {
  const innerInput = parent.$el.querySelector("input");
  off(innerInput, "paste", state.onPase);
};
const updated = ({
  constants,
  parent,
  state
}) => () => {
  const innerInput = parent.$el.querySelector("input");
  innerInput && innerInput.setAttribute(constants.VALUENOW, state.currentValue);
};
const displayValue = ({
  props,
  state,
  api
}) => () => {
  const {
    currentValue,
    inputStatus,
    userInput
  } = state;
  if (props.shape === "filter" && props.filter) {
    api.filterValue();
  }
  if (inputStatus) {
    return userInput;
  }
  if (props.allowEmpty && currentValue === "") {
    return "";
  }
  return formatNumber(currentValue, state.format);
};
const getNumPecision = ({
  api,
  props
}) => () => {
  var _a, _b;
  const stepValue = (_b = (_a = props.step) == null ? void 0 : _a.value) != null ? _b : props.step;
  const stepPrecision = api.getPrecision(stepValue);
  if (props.precision !== void 0) {
    return props.precision;
  } else {
    return Math.max(api.getPrecision(props.modelValue), stepPrecision);
  }
};
const mouseEvent = ({
  api,
  props,
  state
}) => event => {
  if (props.mouseWheel && state.inputStatus) {
    let delta = 0;
    if (event.wheelDelta) {
      delta = event.wheelDelta / MOUSEDELTA;
    }
    delta > 0 ? api.increase() : api.decrease();
    return false;
  }
};
const getUnitPrecision = ({
  service,
  props
}) => {
  let fraction, rounding;
  const {
    format = {},
    precision,
    unit
  } = props;
  const defaultFmt = {
    groupSeparator: "",
    decimalSeparator: ".",
    zeroize: props.holdZero
  };
  const {
    getUnitPrecision: getUnitPrecision2,
    getNumberFormat
  } = service;
  const serFra = getUnitPrecision2(unit) || {};
  const serFmt = getNumberFormat() || {};
  fraction = isNumber(precision) ? precision : isNumber(format.fraction) ? format.fraction : serFra.fraction;
  rounding = isNumber(format.rounding) ? format.rounding : serFra.rounding;
  return __spreadValues(__spreadValues(__spreadProps(__spreadValues({}, defaultFmt), {
    fraction,
    rounding
  }), serFmt), format);
};
const getDisplayOnlyText = ({
  parent,
  state,
  props
}) => () => {
  const showEmptyValue = props.showEmptyValue || (parent.tinyForm || {}).showEmptyValue;
  if (showEmptyValue) {
    return state.displayValue;
  } else {
    if (state.displayValue || state.displayValue === 0) {
      return state.displayValue;
    } else {
      return "-";
    }
  }
};
const filterValue = ({
  state
}) => () => {
  return (state.radioVal || "") + state.lastInput;
};
const handleClear = ({
  state,
  emit
}) => () => {
  state.currentValue = "";
  state.userInput = "";
  state.lastInput = "";
  state.radioVal = "";
  emit("clear");
};
const handleChange = ({
  state,
  emit
}) => () => {
  emit("filter-change", state.radioVal);
};
export { decrease, displayValue, filterValue, focus, getDecimal, getDisplayOnlyText, getNumPecision, getPrecision, getUnitPrecision, handleBlur, handleChange, handleClear, handleFocus, handleInput, handleInputChange, increase, initService, internalDecrease, internalIncrease, mounted, mouseEvent, select, setCurrentValue, toPrecision, unmounted, updated, watchValue };