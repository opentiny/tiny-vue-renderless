import { __spreadProps, __spreadValues } from "../chunk-G2ADBYYC.js";
import { format } from './../common/date.js';
const getDate = dateTime => ({
  date: format(dateTime, "yyyy-MM-dd"),
  time: format(dateTime, "hh:mm")
});
const getStatus = ({
  state,
  t
}) => value => {
  const status = state.current - value;
  return status > 0 ? t("ui.steps.done") : status === 0 ? t("ui.steps.doing") : t("ui.steps.wait");
};
const computedSpace = ({
  props
}) => () => {
  const {
    space
  } = props;
  if (/^\d+$/.test(space)) {
    return `${space}px`;
  }
  return space;
};
const handleClick = ({
  emit,
  state
}) => ({
  index,
  node
}) => {
  if (!node.disabled) {
    emit("click", state.isReverse ? state.nodes.length - index - 1 : index, node);
  }
};
const getStatusCls = ({
  constants,
  state
}) => (index, node) => {
  const {
    PROCESS_DONE_CLS,
    PROCESS_CUR_CLS,
    PROCESS_WAIT_CLS,
    PROCESS_DISABLED_CLS,
    PROCESS_ERROR_CLS
  } = constants;
  const cls = {};
  const reverse = state.isReverse;
  if (node == null ? void 0 : node.disabled) {
    cls[PROCESS_DISABLED_CLS] = true;
  } else if (node == null ? void 0 : node.error) {
    cls[PROCESS_ERROR_CLS] = true;
  } else {
    cls[PROCESS_DONE_CLS] = reverse ? index > state.current : index < state.current;
    cls[PROCESS_CUR_CLS] = index === state.current;
    cls[PROCESS_WAIT_CLS] = reverse ? index < state.current : index > state.current;
  }
  return cls;
};
const computedData = ({
  props,
  state
}) => () => {
  if (props.data && props.data.length > 0) {
    return state.isReverse ? props.data.map((item, i) => __spreadProps(__spreadValues({}, props.data[props.data.length - 1 - i]), {
      _$index: i
    })) : props.data.map((item, i) => __spreadProps(__spreadValues({}, item), {
      _$index: i
    }));
  }
  return state.itemsArray;
};
const computedCurrent = ({
  props,
  state
}) => () => state.isReverse ? state.nodes.length - props.active - 1 : props.active;
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
const computedWrapperClass = ({
  props
}) => () => {
  const {
    vertical,
    reverse,
    textPosition,
    showDivider
  } = props;
  const wrapperClass = [];
  if (vertical) {
    wrapperClass.push("tiny-steps-timeline", {
      reverse,
      "tiny-timeline__shape-dot": props.shape === "dot"
    });
  } else {
    wrapperClass.push("tiny-steps-normal", textPosition === "right" ? "text-right" : "text-bottom");
  }
  if (showDivider && textPosition === "right") {
    wrapperClass.push("show-divider");
  }
  return wrapperClass;
};
const toggleFold = ({
  props
}) => node => {
  const isFold = !props.data[node.index].fold;
  props.data[node.index].fold = isFold;
  return isFold;
};
export { changeStatus, computedCurrent, computedData, computedIsReverse, computedSpace, computedStackNodes, computedWrapperClass, getDate, getStatus, getStatusCls, handleClick, toggleFold };