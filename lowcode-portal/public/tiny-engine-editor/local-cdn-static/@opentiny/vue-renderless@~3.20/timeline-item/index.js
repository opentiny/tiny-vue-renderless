import "../chunk-G2ADBYYC.js";
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
const computedWidth = () => width => {
  return /^\d+$/.test(String(width)) ? `${width}px` : width || "";
};
const handleClick = ({
  emit,
  state,
  props
}) => node => {
  const index = props.nodeIndex;
  if (!node.disabled) {
    emit("click", state.isReverse ? state.nodesLength - index - 1 : index, node);
  }
};
const getStatusCls = ({
  constants,
  state,
  props
}) => node => {
  const index = props.nodeIndex;
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
const computedCurrent = ({
  state,
  api
}) => () => state.isReverse ? state.nodesLength - api.rootProps.active - 1 : api.rootProps.active;
const computedIsReverse = api => () => api.rootProps.reverse && api.rootProps.vertical;
const computedItemCls = ({
  props,
  api,
  state
}) => () => {
  const itemClass = [];
  if (api.rootProps.vertical) {
    itemClass.push("timeline");
    if (props.node.type) {
      itemClass.push(`timeline-item--${props.node.type}`);
    }
  } else {
    itemClass.push("normal");
  }
  if (!props.node.type) {
    itemClass.push(api.getStatusCls(props.node));
  }
  if (state.computedLineWidth) {
    itemClass.push("no-flex");
  }
  return itemClass;
};
const computedIconClass = ({
  props,
  api
}) => () => {
  let iconClass = ["icon", {
    "step-icon": api.rootProps.textPosition === "right"
  }];
  const defaultIcons = ["success", "warning", "error"];
  if (defaultIcons.includes(props.node[props.autoColorField])) {
    iconClass.push(`icon-${props.node[props.autoColorField]}`);
  } else if (props.node[props.autoColorField]) {
    iconClass.push("icon-custom");
  }
  return iconClass;
};
const computedItemStyle = ({
  props,
  state,
  api
}) => () => {
  const index = props.nodeIndex;
  const {
    computedSpace,
    nodesLength
  } = state;
  const {
    textPosition,
    vertical
  } = api.rootProps;
  if (vertical) {
    return {
      height: index === nodesLength - 1 ? "" : computedSpace
    };
  }
  if (textPosition === "right") {
    if (computedSpace && !state.computedLineWidth) {
      return {
        flex: `0 0 ${computedSpace}`
      };
    }
    return null;
  }
  return {
    width: computedSpace || 100 / nodesLength + "%"
  };
};
export { computedCurrent, computedIconClass, computedIsReverse, computedItemCls, computedItemStyle, computedWidth, getDate, getStatus, getStatusCls, handleClick };