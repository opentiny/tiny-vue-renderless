import "../chunk-G2ADBYYC.js";
import { updateModelValue, toggleVisible, useEvent } from './index.js';
import { Color } from './utils/color.js';
const api = ["state", "changeVisible", "onConfirm", "onCancel", "onHueUpdate", "onSVUpdate", "onColorUpdate"];
const renderless = (props, ctx, {
  emit
}) => {
  var _a, _b, _c;
  const {
    modelValue,
    visible,
    predefine,
    size,
    history
  } = ctx.toRefs(props);
  const isShow = ctx.ref(visible.value);
  const hex = ctx.ref((_a = modelValue.value) != null ? _a : "transparent");
  const stack = ctx.ref([...((_b = history == null ? void 0 : history.value) != null ? _b : [])]);
  const predefineStack = ctx.ref([...((_c = predefine == null ? void 0 : predefine.value) != null ? _c : [])]);
  ctx.watch(predefine, newPredefine => {
    predefineStack.value = [...newPredefine];
  }, {
    deep: true
  });
  ctx.watch(history, newHistory => {
    stack.value = [...newHistory];
  }, {
    deep: true
  });
  const state = ctx.reactive({
    isShow,
    hex,
    triggerBg: ctx.ref(modelValue.value),
    size,
    stack,
    predefineStack,
    enablePredefineColor: ctx.computed(() => props.enablePredefineColor),
    enableHistory: ctx.computed(() => props.enableHistory)
  });
  const color = new Color({
    value: props.modelValue,
    format: props.format,
    enableAlpha: props.alpha
  });
  ctx.watch(() => [props.alpha, props.format], () => {
    color.enableAlpha = props.alpha;
    color.format = props.format || color.format;
    color.onChange();
    updateModelValue(color.value, emit);
  });
  ctx.watch(() => props.modelValue, () => {
    color.fromString(props.modelValue);
    const {
      r,
      g,
      b,
      a
    } = color.toRgba();
    state.hex = `rgba(${r}, ${g}, ${b}, ${a})`;
  });
  const changeVisible = toggleVisible(isShow);
  const {
    onConfirm,
    onCancel
  } = useEvent(state, emit, changeVisible, color);
  const api2 = {
    state,
    changeVisible,
    onConfirm,
    onCancel
  };
  return api2;
};
export { api, renderless };