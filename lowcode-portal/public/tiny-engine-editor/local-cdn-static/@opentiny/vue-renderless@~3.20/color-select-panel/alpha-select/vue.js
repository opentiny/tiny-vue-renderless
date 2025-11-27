import "../../chunk-G2ADBYYC.js";
import { draggable } from './../utils/use-drag.js';
import { initState, initWatch, useEvent } from './index.js';
const api = ["state", "color", "slider", "alphaWrapper", "alphaThumb", "onClick"];
const renderless = (props, hooks, utils) => {
  const {
    onMounted,
    ref
  } = hooks;
  const {
    emit
  } = utils;
  const slider = ref();
  const alphaWrapper = ref();
  const alphaThumb = ref();
  const state = initState(hooks);
  const {
    update,
    onClick,
    onDrag
  } = useEvent(state, slider, alphaWrapper, alphaThumb, props);
  onMounted(() => {
    if (!slider.value || !alphaThumb.value) {
      return;
    }
    const dragConfig = {
      drag: event => {
        onDrag(event);
      },
      end: event => {
        onDrag(event);
      }
    };
    draggable(slider.value, dragConfig);
    draggable(alphaThumb.value, dragConfig);
    update();
    emit("ready", update);
  });
  initWatch(props, update, hooks);
  const api2 = {
    state,
    slider,
    alphaWrapper,
    alphaThumb,
    onClick
  };
  return api2;
};
export { api, renderless };