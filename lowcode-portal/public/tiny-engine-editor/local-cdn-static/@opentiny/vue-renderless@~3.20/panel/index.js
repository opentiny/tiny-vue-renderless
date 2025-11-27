import "../chunk-G2ADBYYC.js";
import { emitEvent } from './../common/event.js';
const toggle = ({
  api,
  state
}) => () => {
  state.isShow ? api.collapse() : api.expand();
};
const expand = ({
  emit,
  state
}) => () => {
  if (!emitEvent(emit, "before-expand")) {
    return;
  }
  state.isShow = true;
  emit("expand", true);
};
const collapse = ({
  emit,
  state
}) => () => {
  if (!emitEvent(emit, "before-collapse")) {
    return;
  }
  state.isShow = false;
  emit("collapse", false);
};
export { collapse, expand, toggle };