import "../../chunk-G2ADBYYC.js";
import { getClientXY } from './../utils/getClientXY.js';
const initState = (props, {
  ref,
  computed,
  reactive
}) => {
  const cursorTop = ref(0);
  const cursorLeft = ref(0);
  const bg = ref("hsl(0, 100%, 50%)");
  const colorValue = computed(() => {
    const hue = props.color.get("hue");
    const value = props.color.get("value");
    return {
      hue,
      value
    };
  });
  const state = reactive({
    colorValue,
    bg,
    cursorLeft,
    cursorTop
  });
  return state;
};
const useUpdate = (state, props, wrapper) => {
  return () => {
    const el = wrapper.value;
    if (!el) {
      return;
    }
    const sat = props.color.get("sat");
    const value = props.color.get("value");
    const {
      clientWidth: width,
      clientHeight: height
    } = el;
    state.cursorLeft = sat * width / 100;
    state.cursorTop = (100 - value) * height / 100;
    state.bg = `hsl(${props.color.get("hue")}, 100%, 50%)`;
  };
};
const useDrag = (state, wrapper, props, {
  emit
}) => {
  return event => {
    const el = wrapper.value;
    const rect = el.getBoundingClientRect();
    const {
      clientX,
      clientY
    } = getClientXY(event);
    let left = clientX - rect.left;
    let top = clientY - rect.top;
    left = Math.max(0, left);
    left = Math.min(left, rect.width);
    top = Math.max(0, top);
    top = Math.min(top, rect.height);
    state.cursorLeft = Math.max(left, 0);
    state.cursorTop = Math.max(top, 0);
    const s = left / rect.width * 100;
    const v = 100 - top / rect.height * 100;
    emit("svUpdate", {
      s,
      v
    });
    props.color.set({
      sat: s,
      value: v
    });
  };
};
const initWatch = (state, update, {
  watch
}) => {
  watch(() => state.colorValue.value, () => update(), {
    deep: true
  });
};
export { initState, initWatch, useDrag, useUpdate };