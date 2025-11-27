import "../chunk-G2ADBYYC.js";
const hexToRgb = (hex) => {
  if (hex.includes("var")) {
    hex = hex.replace(/var\(|\)/g, "");
    hex = getComputedStyle(document.documentElement).getPropertyValue(hex);
  }
  hex = hex.replace(/\s*#/g, "");
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16)
  };
};
const handleClick = ({ emit }) => ({ index, node }) => {
  emit("click", index, node);
};
const flagOperate = ({ constants, refs, state }) => ({ event, over, text }) => {
  const tooltip = refs.tooltip;
  if (over) {
    const textEl = event.target.querySelector(constants.FLAG_CONTENT_CLS);
    state.tipContent = text;
    tooltip.state.referenceElm = event.target;
    tooltip.doDestroy();
    tooltip.setExpectedState(true);
    textEl && textEl.scrollWidth > textEl.clientWidth && tooltip.handleShowPopper();
  } else {
    tooltip.setExpectedState(false);
    tooltip.handleClosePopper();
  }
};
const getMileIcon = ({ constants, props }) => (node) => {
  const smbConstants = {
    STATUS_COLOR_MAP: {
      DEFAULT: {
        BORDER_COLOR: "#C2C2C2",
        BACKGROUND_COLOR: "#FFFFFF",
        COLOR: "#191919",
        BOX_SHADOW_PX: "0px 0px 0px 4px",
        FLAG_CONTENT_CLS: ".content"
      },
      COMPLETED: {
        BORDER_COLOR: "#191919",
        BACKGROUND_COLOR: "#FFFFFF",
        COLOR: "#191919",
        BOX_SHADOW_PX: "0px 0px 0px 4px",
        FLAG_CONTENT_CLS: ".content"
      },
      DOING: {
        BORDER_COLOR: "#191919",
        BACKGROUND_COLOR: "#191919",
        COLOR: "#FFFFFF",
        BOX_SHADOW_PX: "0px 0px 0px 4px",
        FLAG_CONTENT_CLS: ".content"
      }
    }
  };
  const status = node[props.statusField];
  const statusColor = props.milestonesStatus[status];
  if (props.solid || status === constants.STATUS_MAP.DOING) {
    return {
      "background-color": statusColor || smbConstants.STATUS_COLOR_MAP.DOING.BACKGROUND_COLOR + "!important",
      color: smbConstants.STATUS_COLOR_MAP.DOING.COLOR + "!important",
      "border-color": statusColor || smbConstants.STATUS_COLOR_MAP.DOING.BORDER_COLOR,
      boxShadow: "unset"
    };
  }
  if (status === constants.STATUS_MAP.COMPLETED) {
    return {
      "background-color": smbConstants.STATUS_COLOR_MAP.COMPLETED.BACKGROUND_COLOR + "!important",
      color: statusColor || smbConstants.STATUS_COLOR_MAP.COMPLETED.COLOR + "!important",
      "border-color": statusColor || smbConstants.STATUS_COLOR_MAP.COMPLETED.BORDER_COLOR,
      boxShadow: "unset"
    };
  }
  return {
    background: smbConstants.STATUS_COLOR_MAP.DEFAULT.BACKGROUND_COLOR + "!important",
    color: statusColor || smbConstants.STATUS_COLOR_MAP.DEFAULT.COLOR + "!important",
    "border-color": statusColor || smbConstants.STATUS_COLOR_MAP.DEFAULT.BORDER_COLOR,
    boxShadow: "unset"
  };
};
const getMileContent = (props) => ({ data, index }) => {
  const content = data[props.flagBefore ? index : index + 1][props.flagField];
  return Array.isArray(content) ? content : [];
};
const getLineColor = (props) => (status) => {
  let background = "";
  if (status) {
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(props.lineStyle)) {
      background = props.lineStyle;
    }
    if (props.lineStyle === 2) {
      background = props.milestonesStatus[status];
    } else if (props.lineStyle === 1) {
      background = status === props.completedField ? props.milestonesStatus[status] : "";
    }
    background += " !important";
  }
  return { background };
};
const handleFlagClick = (emit) => ({ idx, flag }) => {
  emit("flagclick", idx, flag);
  emit("flag-click", idx, flag);
};
const getFlagStyle = (props) => ({ index, idx }) => {
  return {
    left: `calc(${100 / props.data[props.flagBefore ? index : index + 1][props.flagField].length * idx}%  + ${idx * 8}px)`
  };
};
export {
  flagOperate,
  getFlagStyle,
  getLineColor,
  getMileContent,
  getMileIcon,
  handleClick,
  handleFlagClick,
  hexToRgb
};
