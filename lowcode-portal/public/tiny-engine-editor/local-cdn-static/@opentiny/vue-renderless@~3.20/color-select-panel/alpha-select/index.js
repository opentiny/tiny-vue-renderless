import "../../chunk-G2ADBYYC.js";
import { getClientXY } from './../utils/getClientXY.js';
const initState = ({
  ref,
  reactive
}) => {
  const background = ref("");
  const left = ref(0);
  const state = reactive({
    background,
    left
  });
  return state;
};
const useEvent = (state, slider, alphaWrapper, alphaThumb, props) => {
  const onDrag = event => {
    if (!slider.value || !alphaThumb.value) {
      return;
    }
    const el = alphaWrapper.value;
    const rect = el.getBoundingClientRect();
    const {
      clientX
    } = getClientXY(event);
    let left = clientX - rect.left;
    left = Math.max(alphaThumb.value.offsetWidth / 2, left);
    left = Math.min(left, rect.width - alphaThumb.value.offsetWidth / 2);
    const alpha = Math.round((left - alphaThumb.value.offsetWidth / 2) / (rect.width - alphaThumb.value.offsetWidth) * 100);
    props.color.set("alpha", alpha);
  };
  const onClick = event => {
    if (event.target !== alphaThumb.value) {
      onDrag(event);
    }
  };
  const getLeft = () => {
    const thumb = alphaThumb.value;
    if (!thumb) {
      return 0;
    }
    const el = alphaWrapper.value;
    if (!el) {
      return 0;
    }
    const alpha = props.color.get("alpha");
    return alpha * (el.offsetWidth - thumb.offsetWidth / 2) / 100;
  };
  const getBackground = () => {
    if (props.color && props.color.value) {
      const {
        r,
        g,
        b
      } = props.color.toRgb();
      return `linear-gradient(to right, rgba(${r}, ${g}, ${b}, 0) 0%, rgba(${r}, ${g}, ${b}, 1) 100%)`;
    }
    return "";
  };
  const update = () => {
    state.left = getLeft();
    state.background = getBackground();
  };
  return {
    onDrag,
    onClick,
    update
  };
};
const initWatch = (props, update, {
  watch
}) => {
  watch(() => props.color.get("alpha"), () => update(), {
    deep: true
  });
  watch(() => props.color, () => update(), {
    deep: true
  });
};
export { initState, initWatch, useEvent };