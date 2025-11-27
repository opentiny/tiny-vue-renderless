import "../chunk-G2ADBYYC.js";
const mounted = ({ selectEmitter, constants, state, selectVm, updatePopper, destroyPopper, parent }) => () => {
  selectEmitter.on(constants.EVENT_NAME.updatePopper, (keepZIndex) => {
    let hideDrop = false;
    if (!state.referenceElm || state.referenceElm.nodeType !== 1) {
      state.referenceElm = selectVm.$refs.reference ? selectVm.$refs.reference.$el : selectVm.$refs.select;
      selectVm.popperElm = selectVm.state.popperElm = state.popperElm = parent.$el;
    }
    if (parent.select.state.visible && !hideDrop) {
      updatePopper(keepZIndex);
      hideDrop = true;
    }
  });
  selectEmitter.on(constants.EVENT_NAME.destroyPopper, destroyPopper);
};
const closeModal = ({ selectVm, state, props }) => ($event, isMask) => {
  if (!props.closeByMask && isMask)
    return;
  selectVm.multiple && selectVm.updateModelValue(state.originValue);
  selectVm.state.visible = false;
  selectVm.state.softFocus = false;
};
const handleQueryChange = ({ selectVm }) => (value) => {
  selectVm.handleQueryChange(value);
};
const toggleSelectedBox = ({ state }) => (show) => {
  if (show) {
    state.selectedArr = state.selected.slice(0);
    state.deletedArr = [];
  }
  state.showSelectedBox = show;
};
const deleteSelected = ({ state }) => (option, clear) => {
  if (clear) {
    state.deletedArr = state.selectedArr.slice(0);
    state.selectedArr = [];
  } else {
    state.selectedArr = state.selectedArr.filter((item) => item[state.valueField] !== option[state.valueField]);
    state.deletedArr.push(option);
  }
};
const selectedBoxConfirm = ({ state, selectVm }) => () => {
  if (state.deletedArr.length) {
    if (state.deletedArr.length === state.selected.length) {
      selectVm.updateModelValue([]);
    } else {
      selectVm.updateModelValue(state.selectedArr.map((item) => item[state.valueField]));
    }
  }
  state.showSelectedBox = false;
};
const selectDropdownConfirm = ({ selectVm }) => () => {
  selectVm.multiple && selectVm.updateModelValue(selectVm.state.modelValue, true);
  selectVm.state.visible = false;
  selectVm.state.softFocus = false;
  selectVm.$emit("confirm", selectVm.state.modelValue);
  selectVm.emitChange(selectVm.state.modelValue, true);
};
const cancelSearch = ({ api, state }) => () => {
  state.query = "";
  api.debouncedQueryChange("");
};
const handleClear = ({ selectVm }) => () => {
  selectVm.deleteSelected();
};
export {
  cancelSearch,
  closeModal,
  deleteSelected,
  handleClear,
  handleQueryChange,
  mounted,
  selectDropdownConfirm,
  selectedBoxConfirm,
  toggleSelectedBox
};
