import "../chunk-G2ADBYYC.js";
import { clearMilliseconds, timeWithinRange, limitTimeRange, modifyDate } from './../common/deps/date-util.js';
const minTimeOfDay = ({
  MIN_TIME
}) => date => modifyDate(MIN_TIME, date.getFullYear(), date.getMonth(), date.getDate());
const maxTimeOfDay = ({
  MAX_TIME
}) => date => modifyDate(MAX_TIME, date.getFullYear(), date.getMonth(), date.getDate());
const advanceTime = api => (date, amount) => new Date(Math.min(date.getTime() + amount, api.maxTimeOfDay(date).getTime()));
const compuAmPmMode = state => () => {
  if ((state.format || "").includes("A")) {
    return "A";
  }
  if ((state.format || "").includes("a")) {
    return "a";
  }
  return "";
};
const watchValue = ({
  api,
  state
}) => value => {
  if (Array.isArray(value)) {
    if (value[0]) {
      state.minDate = new Date(value[0]);
    } else {
      state.minDate = value[1] ? new Date(api.minTimeOfDay(new Date(value[1])).getTime()) : /* @__PURE__ */new Date();
    }
    if (value[1]) {
      state.maxDate = new Date(value[1]);
    } else {
      state.maxDate = value[0] ? api.advanceTime(new Date(value[0]), 60 * 60 * 1e3) : api.advanceTime( /* @__PURE__ */new Date(), 60 * 60 * 1e3);
    }
  } else {
    if (Array.isArray(state.defaultValue)) {
      state.minDate = new Date(state.defaultValue[0]);
      state.maxDate = new Date(state.defaultValue[1]);
    } else if (state.defaultValue) {
      state.minDate = new Date(state.defaultValue);
      state.maxDate = api.advanceTime(new Date(state.defaultValue), 60 * 60 * 1e3);
    } else {
      state.minDate = /* @__PURE__ */new Date();
      state.maxDate = api.advanceTime( /* @__PURE__ */new Date(), 60 * 60 * 1e3);
    }
  }
};
const adjustSpinners = ({
  vm
}) => () => {
  if (vm.$refs.minSpinner) {
    vm.$refs.minSpinner.adjustSpinners("min");
    vm.$refs.maxSpinner.adjustSpinners("max");
  }
};
const setMaxMinData = state => {
  if (Array.isArray(state.oldValue)) {
    state.oldValue[0] && (state.minDate = clearMilliseconds(state.oldValue[0]));
    state.oldValue[1] && (state.maxDate = clearMilliseconds(state.oldValue[1]));
  }
};
const watchVisible = ({
  nextTick,
  api,
  state
}) => value => {
  if (value) {
    state.oldValue = state.value;
    nextTick(() => {
      setMaxMinData(state);
      api.adjustSpinners();
    });
  }
};
const handleClear = emit => () => emit("pick", null);
const handleCancel = ({
  emit,
  api,
  state
}) => () => {
  state.visible = false;
  emit("pick", state.oldValue);
  setMaxMinData(state);
  api.adjustSpinners();
};
const handleMinChange = ({
  api,
  state
}) => date => {
  state.minDate = clearMilliseconds(date);
  api.handleChange();
};
const handleMaxChange = ({
  api,
  state
}) => date => {
  state.maxDate = clearMilliseconds(date);
  api.handleChange();
};
const handleChange = ({
  api,
  emit,
  vm,
  state
}) => () => {
  if (!vm.$refs.minSpinner || !vm.$refs.maxSpinner || !state.visible) return;
  if (api.isValidValue([state.minDate, state.maxDate])) {
    vm.$refs.minSpinner.state.selectableRange = [[api.minTimeOfDay(state.minDate), state.maxDate]];
    vm.$refs.maxSpinner.state.selectableRange = [[state.minDate, api.maxTimeOfDay(state.maxDate)]];
    emit("pick", [state.minDate, state.maxDate], state.visible);
  }
};
const setMinSelectionRange = ({
  emit,
  state
}) => (start, end) => {
  emit("select-range", start, end, "min");
  state.selectionRange = [start, end];
};
const setMaxSelectionRange = ({
  emit,
  state
}) => (start, end) => {
  emit("select-range", start, end, "max");
  state.selectionRange = [start + state.offset, end + state.offset];
};
const handleConfirm = ({
  emit,
  vm,
  state
}) => (visible = false) => {
  const minSelectableRange = vm.$refs.minSpinner.state.selectableRange;
  const maxSelectableRange = vm.$refs.maxSpinner.state.selectableRange;
  state.minDate = limitTimeRange(state.minDate, minSelectableRange, state.format);
  state.maxDate = limitTimeRange(state.maxDate, maxSelectableRange, state.format);
  emit("pick", [state.minDate, state.maxDate], visible);
};
const changeSelectionRange = ({
  vm,
  state
}) => step => {
  const list = state.showSeconds ? [0, 3, 6, 11, 14, 17] : [0, 3, 8, 11];
  const mapping = ["hours", "minutes"].concat(state.showSeconds ? ["seconds"] : []);
  const index = list.indexOf(state.selectionRange[0]);
  const next = (index + step + list.length) % list.length;
  const half = list.length / 2;
  if (next < half) {
    vm.$refs.minSpinner.emitSelectRange(mapping[next]);
  } else {
    vm.$refs.maxSpinner.emitSelectRange(mapping[next - half]);
  }
};
const isValidValue = ({
  vm,
  state
}) => date => Array.isArray(date) && timeWithinRange(state.minDate, vm.$refs.minSpinner.state.selectableRange) && timeWithinRange(state.maxDate, vm.$refs.maxSpinner.state.selectableRange);
const handleKeydown = ({
  api,
  state
}) => event => {
  const keyCode = event.keyCode;
  const mapping = {
    38: -1,
    40: 1,
    37: -1,
    39: 1
  };
  if (keyCode === 37 || keyCode === 39) {
    const step = mapping[keyCode];
    api.changeSelectionRange(step);
    event.preventDefault();
    return;
  }
  if (keyCode === 38 || keyCode === 40) {
    const step = mapping[keyCode];
    state.spinner.scrollDown(step);
    event.preventDefault();
  }
};
export { adjustSpinners, advanceTime, changeSelectionRange, compuAmPmMode, handleCancel, handleChange, handleClear, handleConfirm, handleKeydown, handleMaxChange, handleMinChange, isValidValue, maxTimeOfDay, minTimeOfDay, setMaxSelectionRange, setMinSelectionRange, watchValue, watchVisible };