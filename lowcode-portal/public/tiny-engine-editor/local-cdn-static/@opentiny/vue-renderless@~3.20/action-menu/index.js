import "../chunk-G2ADBYYC.js";
const computedMaxShowNum = ({ props, state }) => () => {
  if (props.maxShowNum !== void 0) {
    return props.maxShowNum;
  }
  if (state.isCardMode) {
    return 3;
  } else {
    return 2;
  }
};
const computedSpacing = ({ props, state, designConfig }) => () => {
  if (props.spacing !== void 0) {
    return String(props.spacing).includes("px") ? props.spacing : props.spacing + "px";
  }
  if (state.isCardMode) {
    return "10px";
  } else {
    return (designConfig == null ? void 0 : designConfig.props.spacing) || "8px";
  }
};
const computedMoreText = ({ props, state, t }) => () => {
  if (props.moreText !== void 0) {
    return props.moreText;
  }
  if (state.isCardMode) {
    return "";
  } else {
    return t("ui.actionMenu.moreText");
  }
};
const computedSuffixIcon = ({ props, state }) => () => {
  if (props.suffixIcon) {
    return props.suffixIcon;
  }
  if (state.isCardMode) {
    return "tiny-icon-ellipsis";
  } else {
    return "";
  }
};
const handleMoreClick = (emit) => () => {
  emit("more-click");
};
const handleItemClick = (emit) => (data) => {
  emit("item-click", data);
};
const visibleChange = (emit) => (status) => {
  emit("visible-change", status);
};
export {
  computedMaxShowNum,
  computedMoreText,
  computedSpacing,
  computedSuffixIcon,
  handleItemClick,
  handleMoreClick,
  visibleChange
};
