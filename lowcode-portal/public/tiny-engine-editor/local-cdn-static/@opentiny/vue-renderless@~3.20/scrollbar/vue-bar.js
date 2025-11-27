import "../chunk-G2ADBYYC.js";
import { BAR_MAP, renderThumbStyle, clickThumbHandler, clickTrackHandler, startDrag, mouseMoveDocumentHandler, mouseUpDocumentHandler } from './index.js';
import { on, off } from './../common/deps/dom.js';
const api = ["state", "startDrag", "renderThumbStyle", "clickTrackHandler", "clickThumbHandler", "mouseUpDocumentHandler", "mouseMoveDocumentHandler"];
const renderless = (props, {
  computed,
  onUnmounted,
  reactive
}, {
  vm,
  parent
}) => {
  const state = reactive({
    bar: computed(() => BAR_MAP[props.vertical ? "vertical" : "horizontal"]),
    wrap: computed(() => parent.$refs.wrap)
  });
  const api2 = {
    state,
    renderThumbStyle,
    clickTrackHandler: clickTrackHandler({
      vm,
      state
    }),
    mouseMoveDocumentHandler: mouseMoveDocumentHandler({
      vm,
      state
    })
  };
  onUnmounted(() => off(document, "mouseup", api2.mouseUpDocumentHandler));
  return Object.assign(api2, {
    startDrag: startDrag({
      api: api2,
      on,
      state
    }),
    clickThumbHandler: clickThumbHandler({
      api: api2,
      state
    }),
    mouseUpDocumentHandler: mouseUpDocumentHandler({
      api: api2,
      off,
      state
    })
  });
};
export { api, renderless };