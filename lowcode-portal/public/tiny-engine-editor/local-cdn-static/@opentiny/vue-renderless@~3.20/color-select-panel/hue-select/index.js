import "../../chunk-G2ADBYYC.js";
import { getClientXY } from './../utils/getClientXY.js';
const initState = (props, {
  reactive,
  ref,
  computed
}) => {
  const hueValue = computed(() => props.color.get("hue"));
  const thumbTop = ref(0);
  const state = reactive({
    hueValue,
    thumbTop
  });
  return state;
};
const initDom = ({
  ref
}) => {
  return {
    thumb: ref(),
    bar: ref(),
    wrapper: ref()
  };
};
const useEvent = ({
  thumb,
  bar
}, state, props, {
  emit
}) => {
  const onSvReady = update2 => {
    emit("svReady", update2);
  };
  const getThumbTop = () => {
    if (!thumb.value) {
      return 0;
    }
    const hue = props.color.get("hue");
    if (!bar.value) {
      return 0;
    }
    return hue * (bar.value.offsetHeight - thumb.value.offsetHeight / 2) / 360;
  };
  const update = () => {
    state.thumbTop = getThumbTop();
  };
  const onDrag = event => {
    if (!bar.value || !thumb.value) {
      return;
    }
    const el = bar.value;
    if (!el) {
      return;
    }
    const rect = el == null ? void 0 : el.getBoundingClientRect();
    const {
      clientY
    } = getClientXY(event);
    let top = clientY - rect.top;
    top = Math.min(top, rect.height - thumb.value.offsetHeight / 2);
    top = Math.max(thumb.value.offsetHeight / 2, top);
    const hue = Math.round((top - thumb.value.offsetHeight / 2) / (rect.height - thumb.value.offsetHeight) * 360);
    state.thumbTop = top;
    emit("hueUpdate", hue);
    props.color.set("hue", hue);
  };
  return {
    update,
    onDrag,
    onSvReady
  };
};
export { initDom, initState, useEvent };