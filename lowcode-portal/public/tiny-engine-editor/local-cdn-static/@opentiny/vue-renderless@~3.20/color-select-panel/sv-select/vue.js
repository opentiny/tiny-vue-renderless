import "../../chunk-G2ADBYYC.js";
import { draggable } from './../utils/use-drag.js';
import { initState, initWatch, useDrag, useUpdate } from './index.js';
const api = ["state", "wrapper", "cursor"];
const renderless = (props, hooks, utils) => {
  const state = initState(props, hooks);
  const {
    ref,
    onMounted
  } = hooks;
  const {
    emit
  } = utils;
  const wrapper = ref();
  const update = useUpdate(state, props, wrapper);
  const onDrag = useDrag(state, wrapper, props, utils);
  initWatch(state, update, hooks);
  onMounted(() => {
    const drag = {
      drag: event => {
        onDrag(event);
      },
      end: event => {
        onDrag(event);
      }
    };
    draggable(wrapper.value, drag);
    update();
    emit("ready", update);
  });
  const api2 = {
    state,
    wrapper
  };
  return api2;
};
export { api, renderless };