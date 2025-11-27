import { __spreadProps, __spreadValues } from "../chunk-G2ADBYYC.js";
import { on, off } from './../common/deps/dom.js';
import { formatNumber } from './../common/decimal.js';
import { getMiniDecimal, equalsDecimal } from './../common/bigInt.js';
import { isNumber } from './../common/type.js';
const initService = service => {
  const {
    utils = {}
  } = service || {};
  const noopFn = () => null;
  return {
    getCurrencyPrecision: utils.getCurrencyPrecision || noopFn,
    getNumberFormat: utils.getNumberFormat || noopFn
  };
};
const getDecimal = props => value => getMiniDecimal(value, props.plugin);
const closePopper = state => () => {
  state.visible = false;
  state.editorPhase = "close";
};
const popInput = ({
  editorState,
  props,
  state,
  api
}) => value => {
  value = api.onInputPreprocess(value);
  const {
    fraction,
    groupSeparator
  } = state.format;
  value = value.replace(/^-+/, "-");
  const groups = value.split(groupSeparator).map(val => val.trim());
  value = groups.join("");
  if (value !== "-" && api.getDecimal(value).isNaN()) {
    value = editorState.lastInput;
  } else {
    value = value.split(".").map((a, i) => i && props.strictInput && typeof fraction === "number" ? a.substr(0, fraction) : a).join(".");
  }
  editorState.lastInput = value;
  editorState.amount = value;
};
const toggleVisible = ({
  api,
  props,
  state,
  editorState,
  uiMode,
  isMobileFirstMode: mf
}) => () => {
  if (state.disabled || !props.popUp) {
    return;
  }
  state.lock = true;
  state.visible = !state.visible;
  if (state.visible) {
    const {
      date,
      currency
    } = state;
    if (!state.clearValues) {
      Object.assign(editorState, {
        amount: state.amount,
        date,
        currency
      });
    }
    if (props.date || props.dateAllowEmpty) {
      state.editorPhase = "selection";
    } else {
      state.editorPhase = "currency";
    }
    if (!mf || uiMode.value !== "default") {
      api.addOutSideEvent(state.visible);
    }
  } else {
    state.editorPhase = "close";
  }
};
const openDetailEditor = ({
  state
}) => (option, index) => {
  const optionPhase = ["currency", "date"];
  state.editorPhase = optionPhase[index];
  state.visible = true;
};
const closeDetailEidtor = ({
  state,
  props,
  api
}) => triggerCondition => {
  if (!triggerCondition) {
    return;
  }
  const inSelectionPhase = state.editorPhase === "selection";
  const isMultipleStep = props.date || props.dateAllowEmpty;
  if (!inSelectionPhase && isMultipleStep) {
    state.editorPhase = "selection";
    state.visible = true;
  } else {
    api.toggleVisible();
  }
  setTimeout(() => {
    api.save(true);
  }, 0);
};
const innerFormat = ({
  state,
  props
}) => value => {
  const {
    fraction,
    zeroize,
    rounding
  } = state.format;
  const {
    modelTruncation
  } = props;
  const fractionLen = (value.split(".")[1] || "").length;
  if (value === "-") {
    return 0;
  }
  if (!modelTruncation && fractionLen > fraction) {
    return value;
  }
  return formatNumber(value, {
    fraction,
    zeroize,
    groupSeparator: "",
    decimalSeparator: ".",
    rounding
  });
};
const save = ({
  api,
  state,
  editorState
}) => keepOpen => {
  const {
    amount,
    date,
    currency
  } = editorState;
  Object.assign(state, {
    amount,
    date,
    currency
  });
  if (keepOpen !== true) {
    api.closePopper();
  }
  let num = api.innerFormat(state.amount + "");
  state.amount = isNaN(num) ? 0 : num;
  if (!equalsDecimal(state.lastInput, state.amount) || state.lastCurrency !== currency || state.lastDate !== date) {
    api.emitChange();
  }
  state.lastInput = state.amount;
  state.lastCurrency = currency;
  state.lastDate = date;
  api.initText();
};
const reset = ({
  state,
  editorState
}) => () => {
  const {
    amount,
    date,
    currency
  } = state;
  Object.assign(editorState, {
    amount,
    date,
    currency
  });
};
const emitChange = ({
  emit,
  state,
  props,
  api
}) => () => {
  const {
    date,
    currency
  } = state;
  let emitAmount = props.stringMode ? api.getDecimal(state.amount).toString() : Number(state.amount);
  if (props.numAllowEmpty && state.amount === "") {
    emitAmount = state.amount;
  }
  state.amount && (state.clearValues = false);
  !state.clearValues && emit("update:modelValue", emitAmount);
  emit("update:currency", currency);
  emit("update:date", date);
  emit("change", {
    amount: emitAmount,
    date,
    currency
  });
};
const inputFocus = ({
  state,
  props
}) => () => {
  let amount = state.amount + "";
  state.isFocus = true;
  state.lock = false;
  const {
    fraction
  } = state.format;
  const fractionLen = (amount.split(".")[1] || "").length;
  if (fractionLen < fraction && props.holdZero) {
    amount = formatNumber(amount, {
      fraction
    });
  }
  state.amountText = amount;
};
const inputBlur = ({
  api,
  state,
  props
}) => () => {
  if (state.amountText !== "") {
    let amount = api.innerFormat(state.amountText + "");
    if (isNaN(amount)) {
      state.amount = "";
    }
    state.amount = props.holdZero ? amount : api.getDecimal(amount).toString();
  }
  state.isFocus = false;
  state.amountText = formatNumber(state.amount, state.format);
  if (!equalsDecimal(state.lastInput, state.amount)) {
    api.emitChange();
  }
  state.lastInput = state.amount;
};
const handelClick = ({
  api,
  vm
}) => e => {
  const contains = vm.$refs.root.contains(e.target);
  if (!contains) {
    api.closePopper();
  }
};
const addOutSideEvent = api => visible => {
  if (visible) {
    on(document, "click", api.handelClick);
  } else {
    off(document, "click", api.handelClick);
  }
};
const initText = ({
  state
}) => () => {
  let amount = state.amount + "";
  state.amountText = amount ? state.isFocus ? amount : formatNumber(state.amount, state.format) : "";
};
const onInputPreprocess = props => value => {
  const inputElem = event.target;
  if (value) {
    const i = value.lastIndexOf("-");
    if (i === 0 && !props.negative || i > 0) {
      const tmpArr = value.split("");
      tmpArr.splice(i, 1);
      inputElem.value = value = tmpArr.join("");
      inputElem.selectionStart = inputElem.selectionEnd = i;
    }
  }
  return value;
};
const onInput = ({
  state,
  props,
  api
}) => value => {
  value = api.onInputPreprocess(value);
  const {
    fraction,
    groupSeparator
  } = state.format;
  value = event.target.value !== void 0 ? event.target.value.replace(/^-+/, "-") : value.replace(/^-+/, "-");
  const groups = value.split(groupSeparator).map(val => val.trim());
  value = groups.join("");
  if (value !== "-" && api.getDecimal(value).isNaN()) {
    value = state.lastInput;
  } else {
    value = value.split(".").map((a, i) => i && props.strictInput && typeof fraction === "number" ? a.substr(0, fraction) : a).join(".");
  }
  event.target.value = value;
  state.amount = value;
  state.amountText = value;
};
const getPrecision = ({
  service,
  props,
  currency
}) => {
  const {
    format = {},
    rounding: r,
    digits,
    type
  } = props;
  let fraction;
  let rounding = format.rounding;
  const {
    getCurrencyPrecision,
    getNumberFormat
  } = service;
  const serFra = getCurrencyPrecision(type, currency) || {};
  const serFmt = getNumberFormat() || {};
  const defaultFmt = {
    groupSeparator: ",",
    groupSize: 3,
    decimalSeparator: ".",
    zeroize: props.holdZero
  };
  fraction = isNumber(format.fraction) ? format.fraction : isNumber(serFra.fraction) ? serFra.fraction : digits;
  if (r === false) {
    rounding = 0;
  } else {
    rounding = isNumber(rounding) ? rounding : isNumber(serFra.rounding) ? serFra.rounding : 5;
  }
  return __spreadValues(__spreadValues(__spreadProps(__spreadValues({}, defaultFmt), {
    fraction,
    rounding
  }), serFmt), format);
};
const getAmountText = ({
  state,
  props
}) => () => {
  const isFilter = props.shape === "filter" && props.filter;
  if (props.hideCurrency && typeof state.amountText === "string") {
    return isFilter ? state.radioVal + state.amountText.replace(state.currency, "") : state.amountText.replace(state.currency, "");
  } else {
    return isFilter ? state.radioVal + state.amountText : state.amountText;
  }
};
const getAmountTextWithoutCurrncy = ({
  state
}) => () => {
  return state.amountText.replace(state.currency, "");
};
const watchModelValue = ({
  api,
  state
}) => () => {
  let value = api.initAmount();
  state.amount = value;
  state.lastInput = value;
  api.initText();
};
const watchCurrency = ({
  api,
  state,
  editorState
}) => value => {
  state.currency = value;
  editorState.currency = value;
  state.lastCurrency = value;
  api.initText();
};
const watchUiMode = ({
  api,
  isMobileFirstMode: mf
}) => value => {
  if (mf && value === "default") {
    api.addOutSideEvent(false);
  }
};
const initAmount = ({
  props,
  api
}) => () => {
  let value = props.modelValue;
  value = value === null || isNaN(Number(value)) ? "" : value;
  if (!props.negative && value && Number(value) < 0) {
    if (props.stringMode) {
      value = api.getDecimal(String(value).replace(/^-/, "")).toString();
    } else {
      value -= 0;
      value = Math.abs(value);
    }
  }
  return value;
};
const handleClearClick = ({
  state,
  emit,
  editorState
}) => event2 => {
  event2.stopPropagation();
  state.amountText = "";
  state.radioVal = "";
  editorState.amount = "";
  state.clearValues = true;
  emit("clear");
};
const handleChange = ({
  state,
  emit
}) => () => {
  emit("filter-change", state.radioVal);
};
export { addOutSideEvent, closeDetailEidtor, closePopper, emitChange, getAmountText, getAmountTextWithoutCurrncy, getDecimal, getPrecision, handelClick, handleChange, handleClearClick, initAmount, initService, initText, innerFormat, inputBlur, inputFocus, onInput, onInputPreprocess, openDetailEditor, popInput, reset, save, toggleVisible, watchCurrency, watchModelValue, watchUiMode };