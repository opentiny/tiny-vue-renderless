import "../chunk-G2ADBYYC.js";
import { format } from './../common/date.js';
const getDate = dateTime => {
  return {
    date: format(dateTime, "yyyy/MM/dd"),
    time: format(dateTime, "hh:mm:ss")
  };
};
const getStatus = ({
  state,
  t
}) => value => {
  const status = state.current - value;
  return status > 0 ? t("ui.steps.done") : status === 0 ? t("ui.steps.doing") : t("ui.steps.wait");
};
const handleClick = ({
  emit,
  state
}) => ({
  index,
  node
}) => {
  emit("click", state.isReverse ? state.nodes.length - index - 1 : index, node);
};
const getStatusCls = ({
  constants,
  state
}) => index => {
  const {
    PROCESS_DONE_CLS,
    PROCESS_CUR_CLS,
    PROCESS_WAIT_CLS
  } = constants;
  const cls = {};
  const reverse = state.isReverse;
  cls[PROCESS_DONE_CLS] = reverse ? index > state.current : index < state.current;
  cls[PROCESS_CUR_CLS] = index === state.current;
  cls[PROCESS_WAIT_CLS] = reverse ? index < state.current : index > state.current;
  return cls;
};
const computedData = ({
  props,
  state
}) => () => {
  return state.isReverse ? props.data.map((item, i) => props.data[props.data.length - 1 - i]) : props.data;
};
const computedCurrent = ({
  props,
  state
}) => () => {
  return state.isReverse ? state.nodes.length - props.active - 1 : props.active;
};
const computedIsReverse = props => () => props.reverse && props.vertical;
const computedStackNodes = ({
  state,
  props
}) => () => {
  if (state.nodes.length >= props.nodeMax && !props.foldDisabled) {
    state.showData = true;
    return state.nodes.slice(0, props.limitedNodes);
  }
  return state.nodes;
};
const changeStatus = ({
  state
}) => () => {
  state.showAll = !state.showAll;
  return state.showAll;
};
export { changeStatus, computedCurrent, computedData, computedIsReverse, computedStackNodes, getDate, getStatus, getStatusCls, handleClick };