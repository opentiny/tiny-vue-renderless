import "../chunk-G2ADBYYC.js";
const watchActionSheetVisible = ({ emit, api, props }) => (visible) => {
  emit("update:visible", visible);
  if (!visible)
    return;
  api.setValue(props.modelValue);
};
const close = (state) => () => state.actionSheetVisible && (state.actionSheetVisible = false);
const confirm = ({ api, emit, defaultValues, selectedOptions, isDisabled, vm }) => () => {
  if (isDisabled.value)
    return;
  let refs = vm.$refs.swipeRef;
  let moving = false;
  if (!Array.isArray(vm.$refs.swipeRef)) {
    refs = [refs];
  }
  defaultValues.value = refs.map((comp) => {
    if (comp.state.moving) {
      moving = true;
    }
    return comp.state.currentValue;
  });
  if (moving)
    return;
  emit("confirm", {
    selectedValue: defaultValues.value.slice(),
    selectedOptions: selectedOptions.value.slice()
  });
  emit("update:modelValue", defaultValues.value.slice());
  api.close();
};
const clear = ({ api, emit }) => (value) => {
  emit("update:modelValue", value);
  api.close();
};
const columnStyle = ({ props, computed }) => computed(() => {
  return {
    height: `${+props.visibleOptionNum * +props.optionHeight}px`,
    "--lineHeight": `${+props.optionHeight}px`
  };
});
export {
  clear,
  close,
  columnStyle,
  confirm,
  watchActionSheetVisible
};
