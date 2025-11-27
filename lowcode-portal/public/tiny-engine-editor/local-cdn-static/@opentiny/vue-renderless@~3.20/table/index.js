import "../chunk-G2ADBYYC.js";
const computedCheckableData = ({ props }) => () => props.data.filter((item) => !item.disabled);
const computedSelectedKeys = ({ props, state }) => () => {
  const keys = [];
  state.checkableData.forEach((item) => keys.push(item[props.keys]));
  return keys;
};
const computedSelectCls = ({ state }) => () => {
  if (state.selected.length > 0 && state.selected.length >= state.checkableData.length) {
    return "checked-sur";
  } else if (state.selected.length > 0 && state.selected.length < state.checkableData.length) {
    return "halfselect";
  }
  return "check";
};
const watchDefaultChecked = ({ props, state }) => (value, oldvalue) => {
  if (oldvalue && value.length === oldvalue.length && value.every((item) => oldvalue.includes(item))) {
    return;
  }
  const checked = [];
  state.checkableData.forEach((item) => {
    const index = value.indexOf(item[props.keys]);
    if (~index) {
      checked.push(item);
    }
  });
  state.selected = checked;
  state.checkedChangeByUser = false;
};
const watchSelected = ({ emit, props, state }) => (value, oldvalue) => {
  const keys = [];
  value.forEach((item) => keys.push(item[props.keys]));
  if (state.checkedChangeByUser) {
    const movedKeys = value.concat(oldvalue).filter((item) => !value.includes(item) || !oldvalue.includes(item));
    emit("checked-change", keys, false, movedKeys);
  } else {
    emit("checked-change", keys, false);
    state.checkedChangeByUser = true;
  }
};
const selectRow = ({ emit, state }) => (row) => {
  state.selectedRow = row;
  emit("radio-change", row);
};
const togeSelected = ({ state }) => (row) => {
  if (row.disabled) {
    return;
  }
  const index = state.selected.indexOf(row);
  if (index !== -1) {
    state.selected.splice(index, 1);
  } else {
    state.selected.push(row);
  }
  state.selected = state.selected.slice();
};
const togeSelectAll = ({ emit, props, state }) => () => {
  let data = [];
  if (state.selectCls === "checked-sur") {
    state.selected = [];
    data = [];
  } else {
    data = state.checkableData.map((item) => item[props.keys]);
    state.selected = state.checkableData;
  }
  emit("checked-change", data, true);
};
export {
  computedCheckableData,
  computedSelectCls,
  computedSelectedKeys,
  selectRow,
  togeSelectAll,
  togeSelected,
  watchDefaultChecked,
  watchSelected
};
