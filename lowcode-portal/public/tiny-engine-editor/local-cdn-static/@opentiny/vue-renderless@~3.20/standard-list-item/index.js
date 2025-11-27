import {
  __spreadProps,
  __spreadValues
} from "../chunk-G2ADBYYC.js";
const handleEnterDesc = ({ state, props }) => ($event) => {
  const target = $event.target;
  if (target && target.scrollHeight > target.offsetHeight) {
    state.descTooltip = props.data.desc;
  } else {
    state.descTooltip = "";
  }
};
const handelIconClick = ({ emit }) => (item, index, event) => {
  if (item.disabled)
    return;
  emit("icon-click", item, index, event);
};
const handleTitleClick = ({ props }) => () => {
  if (!props.titleOption.click)
    return;
  props.titleOption.click();
};
const computedOptions = ({ props }) => () => {
  return props.options.filter((item) => {
    const hidden = typeof item.hidden === "function" ? item.hidden(props.data) : item.hidden;
    return !hidden;
  }).map((op) => {
    return __spreadProps(__spreadValues({}, op), {
      disabled: typeof op.disabled === "function" ? op.disabled(props.data) : op.disabled
    });
  });
};
export {
  computedOptions,
  handelIconClick,
  handleEnterDesc,
  handleTitleClick
};
