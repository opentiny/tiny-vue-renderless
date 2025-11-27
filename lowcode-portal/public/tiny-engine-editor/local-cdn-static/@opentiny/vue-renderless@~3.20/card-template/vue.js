import "../chunk-G2ADBYYC.js";
import { toolClick, computedTools, computedMoreTools } from './index.js';
const api = ["state", "toolClick"];
const renderless = (props, {
  computed,
  reactive
}, {
  t,
  refs,
  constants
}) => {
  const api2 = {
    computedMoreTools: computedMoreTools({
      props
    })
  };
  const state = reactive({
    isEnter: false,
    showMoreTools: false,
    moreTools: computed(() => api2.computedMoreTools(props)),
    currentTools: computed(() => api2.computedTools())
  });
  api2.state = state;
  api2.computedTools = computedTools({
    constants,
    props,
    refs,
    state,
    t
  });
  api2.toolClick = toolClick(state);
  return api2;
};
export { api, renderless };