import "../chunk-G2ADBYYC.js";
import { format } from './../common/date.js';
import { copyArray, extend } from './../common/object.js';
import { isObject } from './../common/type.js';
const lastStepHandle = ({
  state,
  emit
}) => () => {
  if (state.datas[0].status === state.doing) {
    return;
  }
  for (let i = 0; i < state.datas.length; i++) {
    if (state.datas[i].status === state.doing) {
      state.datas[i].status = state.wait;
      state.datas[i - 1].status = state.doing;
      state.submitShow = false;
    }
  }
  emit("btnPrev", state.datas);
};
const nextStepHandle = ({
  state,
  emit
}) => () => {
  for (let i = 0; i < state.datas.length; i++) {
    if (state.datas[state.datas.length - 1].status === state.doing) {
      return;
    }
    if (state.datas[i].status === state.doing) {
      state.datas[i].status = state.ready;
      state.datas[i + 1].status = state.doing;
      state.submitShow = i + 2 === state.datas.length;
      break;
    }
  }
  emit("btnNext", state.datas);
};
const btnSaveHandle = ({
  state,
  emit
}) => () => {
  emit("btnSave", state.datas);
};
const submitHandle = ({
  state,
  emit
}) => () => {
  emit("btnSubmit", state.datas);
};
const showNode = emit => (node, index, event) => {
  node.showNode = !node.showNode;
  emit("node-click", node, index, event);
};
const nodeClick = emit => (node, index, event) => {
  emit("node-click", node, index, event);
};
const cloneDeep = data => {
  if (isObject(data)) {
    return extend(true, data);
  } else if (Array.isArray(data)) {
    return copyArray(data);
  } else {
    return data;
  }
};
const timelineflowData = ({
  state,
  props,
  api
}) => () => {
  if (!props.timeLineFlow) {
    return;
  }
  let timelineData = cloneDeep(state.datas).map(item => {
    item._dateTime = new Date(typeof item.date === "string" ? item.date.replace(/-/g, "/") : item.date);
    return item;
  }).sort((a, b) => a._dateTime.getTime() - b._dateTime.getTime()).map(item => {
    item.date = format(item._dateTime, typeof state.datas[0].date === "string" && ~state.datas[0].date.indexOf("/") ? "yyyy/MM/dd" : "yyyy-MM-dd");
    item.time = format(item._dateTime, "hh:mm");
    delete item._dateTime;
    return item;
  });
  let newArr = [];
  timelineData.forEach((item, i) => {
    if (i > 0 && item.date === timelineData[i - 1].date) {
      newArr[newArr.length - 1].value.push(item);
    } else {
      newArr.push({
        showNode: true,
        value: [item],
        date: item.date
      });
    }
  });
  api.setTimelineflowNodeStatus(newArr);
  state.datas = newArr;
};
const setTimelineflowNodeStatus = state => nodes => {
  const isNormalArray = arr => Array.isArray(arr) && arr.length;
  if (isNormalArray(nodes)) {
    nodes.forEach(node => {
      if (isNormalArray(node.value)) {
        node.nodeStatus = node.value[0].status;
      } else {
        node.nodeStatus = state.wait;
      }
    });
  }
};
export { btnSaveHandle, cloneDeep, lastStepHandle, nextStepHandle, nodeClick, setTimelineflowNodeStatus, showNode, submitHandle, timelineflowData };