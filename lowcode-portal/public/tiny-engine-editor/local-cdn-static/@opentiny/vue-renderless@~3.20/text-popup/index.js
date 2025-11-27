import "../chunk-G2ADBYYC.js";
const computedWidth = ({ props }) => () => {
  if (typeof props.width === "number" || !Number.isNaN(Number(props.width))) {
    return props.width + "px";
  }
  return props.width;
};
const watchValue = ({ api, props, state }) => (newValue) => {
  newValue = newValue.toString();
  if (state.type === "textarea") {
    state.textAreaValue = api.jointText(newValue, props.separtor);
  } else {
    state.text && (state.text.value = newValue);
  }
};
const mounted = ({ props, refs, state }) => () => {
  state.text = refs.text;
  state.popup = refs.popup;
  state.text.value = props.modelValue.toString();
};
const onFocus = ({ api, emit, props, nextTick, state }) => () => {
  state.type = "textarea";
  nextTick(() => {
    state.popup.focus();
    state.text.placeholder && (state.popup.placeholder = state.text.placeholder);
    state.textAreaValue = api.jointText(state.text.value, props.separtor);
    emit("popup", true);
  });
};
const onBlur = ({ api, emit, props, state }) => () => {
  state.type = "input";
  state.text.value = api.separteText(state.textAreaValue, props.separtor);
  emit("popup", false);
};
const onInput = ({ api, emit, props }) => (event) => {
  const value = api.separteText(event.target.value, props.separtor);
  emit("update:modelValue", value);
};
const separteText = (str, separtor) => str.replace(/\n/g, separtor);
const jointText = (str, separtor) => {
  if (separtor === "]") {
    separtor = "\\" + separtor;
  }
  return str.replace(new RegExp(`[${separtor}]`, "g"), "\n");
};
export {
  computedWidth,
  jointText,
  mounted,
  onBlur,
  onFocus,
  onInput,
  separteText,
  watchValue
};
