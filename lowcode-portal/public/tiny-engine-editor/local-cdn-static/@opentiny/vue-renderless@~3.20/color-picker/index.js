import "../chunk-G2ADBYYC.js";
const updateModelValue = (val, emit) => {
  emit("update:modelValue", val);
};
const toggleVisible = (isShow) => {
  return (val) => {
    isShow.value = val;
  };
};
const useEvent = (state, emit, changeVisible, color) => {
  const onConfirm = (val) => {
    color.fromString(val);
    updateModelValue(val, emit);
    emit("confirm", val);
    changeVisible(false);
  };
  const onCancel = () => {
    changeVisible(false);
    emit("cancel");
  };
  return {
    onConfirm,
    onCancel
  };
};
export {
  toggleVisible,
  updateModelValue,
  useEvent
};
