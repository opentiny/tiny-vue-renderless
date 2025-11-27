import "../../chunk-G2ADBYYC.js";
import { draggable } from './../utils/use-drag.js';
import { initDom, initState, useEvent } from './index.js';
const api = ["state", "onSvReady", "bar", "thumb", "wrapper"];
const renderless = (props, hooks, utils) => {
  const {
    onMounted
  } = hooks;
  const {
    emit
  } = utils;
  const {
    thumb,
    bar,
    wrapper
  } = initDom(hooks);
  const state = initState(props, hooks);
  const {
    onSvReady,
    onDrag,
    update
  } = useEvent({
    thumb,
    bar,
    wrapper
  }, state, props, utils);
  const api2 = {
    state,
    onSvReady,
    bar,
    thumb,
    wrapper
  };
  onMounted(() => {
    if (!bar.value || !thumb.value) {
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
    draggable(bar.value, dragConfig);
    draggable(thumb.value, dragConfig);
    emit("hueReady", update);
    update();
  });
  return api2;
};
export { api, renderless };