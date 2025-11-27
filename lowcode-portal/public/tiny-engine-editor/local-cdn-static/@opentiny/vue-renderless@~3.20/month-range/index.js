import "../chunk-G2ADBYYC.js";
import { isDate, modifyWithTimeString, prevYear, nextYear, nextMonth } from './../common/deps/date-util.js';
const calcDefaultValue = defaultValue => {
  if (Array.isArray(defaultValue)) {
    return [new Date(defaultValue[0]), new Date(defaultValue[1])];
  } else if (defaultValue) {
    return [new Date(defaultValue), nextMonth(new Date(defaultValue))];
  }
  return [/* @__PURE__ */new Date(), nextMonth( /* @__PURE__ */new Date())];
};
const watchValue = ({
  state
}) => val => {
  if (!val) {
    state.maxDate = null;
    state.minDate = null;
  } else if (Array.isArray(val)) {
    if (isDate(val[0])) {
      state.minDate = new Date(val[0]);
    } else {
      state.minDate = null;
    }
    if (isDate(val[1])) {
      state.maxDate = new Date(val[1]);
    } else {
      state.maxDate = null;
    }
    if (state.minDate) {
      state.leftDate = state.minDate;
      if (state.maxDate && state.unlinkPanels) {
        const maxDateYear = state.maxDate.getFullYear();
        const minDateYear = state.minDate.getFullYear();
        state.rightDate = maxDateYear === minDateYear ? nextYear(state.maxDate) : state.maxDate;
      } else {
        state.rightDate = nextYear(state.leftDate);
      }
    } else {
      state.leftDate = calcDefaultValue(state.defaultValue)[0];
      state.rightDate = nextYear(state.leftDate);
    }
  }
};
const watchDefaultValue = ({
  state
}) => value => {
  if (!Array.isArray(state.value)) {
    const [left, right] = calcDefaultValue(value);
    state.leftDate = left;
    state.rightDate = value && value[1] && left.getFullYear() !== right.getFullYear() && state.unlinkPanels ? right : nextYear(state.leftDate);
  }
};
const handleClear = ({
  emit,
  state
}) => () => {
  state.minDate = null;
  state.maxDate = null;
  state.leftDate = calcDefaultValue(state.defaultValue)[0];
  state.rightDate = nextYear(state.leftDate);
  emit("pick", null);
};
const handleChangeRange = state => val => {
  state.minDate = val.minDate;
  state.maxDate = val.maxDate;
  state.rangeState = val.rangeState;
};
const handleRangePick = ({
  api,
  state,
  t
}) => (val, close = true) => {
  const defaultTime = state.defaultTime || [];
  const max = modifyWithTimeString(val.maxDate, defaultTime[1], t);
  const min = modifyWithTimeString(val.minDate, defaultTime[0], t);
  if (state.minDate === min && state.maxDate === max) {
    return;
  }
  if (state.onPick) {
    state.onPick(val);
  }
  state.minDate = min;
  state.maxDate = max;
  setTimeout(() => {
    state.minDate = min;
    state.maxDate = max;
  }, 10);
  if (!close) {
    return;
  }
  api.handleConfirm();
};
const handleShortcutClick = api => shortcutObj => {
  if (shortcutObj.onClick) {
    const choose = {
      $emit: (type, [start, end]) => {
        api.doPick(start, end);
      }
    };
    shortcutObj.onClick(choose);
  }
};
const doPick = emit => (begin, end) => {
  emit("pick", [begin, end], false);
};
const leftPrevYear = state => () => {
  state.leftDate = prevYear(state.leftDate);
  if (!state.unlinkPanels) {
    state.rightDate = prevYear(state.rightDate);
  }
};
const rightNextYear = state => () => {
  if (!state.unlinkPanels) {
    state.leftDate = nextYear(state.leftDate);
  }
  state.rightDate = nextYear(state.rightDate);
};
const leftNextYear = state => () => state.leftDate = nextYear(state.leftDate);
const rightPrevYear = state => () => state.rightDate = prevYear(state.rightDate);
const handleConfirm = ({
  api,
  emit,
  state
}) => (visible = false) => {
  if (api.isValidValue([state.minDate, state.maxDate])) {
    emit("pick", [state.minDate, state.maxDate], visible);
  }
};
const isValidValue = state => value => Array.isArray(value) && value && value[1] && value[0] && isDate(value[1]) && isDate(value[0]) && value[0].getTime() <= value[1].getTime() && (typeof state.disabledDate === "function" ? !state.disabledDate(value[1]) && !state.disabledDate(value[0]) : true);
const resetView = state => () => {
  state.minDate = state.value && isDate(state.value[0]) ? new Date(state.value[0]) : null;
  state.maxDate = state.value && isDate(state.value[0]) ? new Date(state.value[1]) : null;
};
export { calcDefaultValue, doPick, handleChangeRange, handleClear, handleConfirm, handleRangePick, handleShortcutClick, isValidValue, leftNextYear, leftPrevYear, resetView, rightNextYear, rightPrevYear, watchDefaultValue, watchValue };