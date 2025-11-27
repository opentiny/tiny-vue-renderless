import "../chunk-G2ADBYYC.js";
import { btnSaveHandle, nodeClick, submitHandle, lastStepHandle, nextStepHandle, showNode, timelineflowData, setTimelineflowNodeStatus } from './index.js';
const api = ["state", "btnSaveHandle", "nodeClick", "submitHandle", "lastStepHandle", "nextStepHandle", "showNode"];
const renderless = (props, {
  onMounted,
  reactive
}, {
  emit,
  constants,
  designConfig
}) => {
  var _a;
  const state = reactive({
    datas: props.data,
    submitShow: false,
    doing: constants.DOING_STATUS,
    ready: constants.READY_STATUS,
    wait: constants.WAIT_STATUS,
    iconYes: ((_a = designConfig == null ? void 0 : designConfig.icons) == null ? void 0 : _a.IconYes) || "tiny-icon-successful"
  });
  const api2 = {
    state,
    nodeClick: nodeClick(emit),
    showNode: showNode(emit),
    nextStepHandle: nextStepHandle({
      state,
      emit
    }),
    lastStepHandle: lastStepHandle({
      state,
      emit
    }),
    submitHandle: submitHandle({
      state,
      emit
    }),
    btnSaveHandle: btnSaveHandle({
      state,
      emit
    }),
    setTimelineflowNodeStatus: setTimelineflowNodeStatus(state)
  };
  api2.timelineflowData = timelineflowData({
    state,
    props,
    api: api2
  });
  onMounted(api2.timelineflowData);
  return api2;
};
export { api, renderless };