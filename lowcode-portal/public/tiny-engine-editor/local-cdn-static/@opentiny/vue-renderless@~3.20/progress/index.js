import "../chunk-G2ADBYYC.js";
const computedBarStyle = ({ api, props }) => () => ({
  width: props.percentage + "%",
  backgroundColor: api.getCurrentColor(props.percentage)
});
const computedRelativeStrokeWidth = ({ constants, state }) => () => {
  if (state.width === 0 || state.strokeWidth === 0)
    return constants.REL_STROKE_WIDTH;
  return Number((state.strokeWidth / state.width * 100).toFixed(1));
};
const computedRadius = ({ constants, props, state }) => () => props.type === constants.PROGRESS_TYPE.CIRCLE || props.type === constants.PROGRESS_TYPE.DASHBOARD ? parseInt(String(50 - parseFloat(state.relativeStrokeWidth) / 2), 10) : 0;
const computedTrackPath = ({ constants, props, state }) => () => {
  const radiusValue = state.radius;
  const isDashboardType = props.type === constants.PROGRESS_TYPE.DASHBOARD;
  return `
    M 50 50
    m 0 ${isDashboardType ? "" : "-"}${radiusValue}
    a ${radiusValue} ${radiusValue} 0 1 1 0 ${isDashboardType ? "-" : ""}${radiusValue * 2}
    a ${radiusValue} ${radiusValue} 0 1 1 0 ${isDashboardType ? "" : "-"}${radiusValue * 2}
    `;
};
const computedPerimeter = ({ state }) => () => 2 * Math.PI * state.radius;
const computedRate = ({ constants, props }) => () => props.type === constants.PROGRESS_TYPE.DASHBOARD ? 0.75 : 1;
const computedStrokeDashoffset = ({ state }) => () => `${-1 * state.perimeter * (1 - state.rate) / 2}px`;
const computedTrailPathStyle = ({ state }) => () => ({
  strokeDasharray: `${state.perimeter * state.rate}px, ${state.perimeter}px`,
  strokeDashoffset: state.strokeDashoffset
});
const computedCircleStyle = ({ state }) => () => state.width ? { height: state.width + "px", width: state.width + "px" } : {};
const computedCirclePathStyle = ({ props, state }) => () => ({
  strokeDasharray: `${state.perimeter * state.rate * (props.percentage / 100)}px, ${state.perimeter}px`,
  strokeDashoffset: state.strokeDashoffset,
  transition: "stroke-dasharray 0.6s ease 0s, stroke 0.6s ease"
});
const computedStroke = ({ api, constants, props }) => () => props.color && api.getCurrentColor(props.percentage) || constants.STATUS_TO_COLOR[props.status] || constants.STATUS_DEFAULT_COLOR;
const computedIconClass = ({ constants, props, mode }) => () => {
  if (props.status === constants.PROGRESS_STATUS.SUCCESS) {
    const iconClasses = props.type === constants.PROGRESS_TYPE.LINE ? [constants.ICON_SUCCESS, constants.ICON_CIRCLE_SUCCESS] : [constants.ICON_CIRCLE_SUCCESS, constants.ICON_SUCCESS];
    return mode === "mobile-first" ? iconClasses[1] : iconClasses[0];
  } else if (props.status === constants.PROGRESS_STATUS.WARNING) {
    return props.type === constants.PROGRESS_TYPE.LINE ? constants.ICON_WARNING : constants.ICON_CIRCLE_WARNING;
  } else if (props.status === constants.PROGRESS_STATUS.EXCEPTION) {
    const iconClasses = props.type === constants.PROGRESS_TYPE.LINE ? [constants.ICON_EXCEPTION, constants.ICON_CIRCLE_EXCEPTION] : [constants.ICON_CIRCLE_EXCEPTION, constants.ICON_EXCEPTION];
    return mode === "mobile-first" ? iconClasses[1] : iconClasses[0];
  } else {
    return "";
  }
};
const computedIconStyle = ({ constants, props, state }) => () => {
  if (props.type === constants.PROGRESS_TYPE.LINE) {
    return state.strokeWidth ? {
      width: constants.TEXT_XS + state.strokeWidth * constants.STROKE_WIDTH_RATE,
      height: constants.TEXT_XS + state.strokeWidth * constants.STROKE_WIDTH_RATE
    } : {};
  } else {
    return state.width ? { width: state.width / constants.WIDTH_RATE_TWO, height: state.width / constants.WIDTH_RATE_TWO } : {};
  }
};
const computedProgressTextSize = ({ constants, props, state, mode }) => () => {
  if (mode === "mobile-first") {
    let fontSize = constants.TEXT_XS;
    const sizeWidthMap = {
      small: constants.PROGRESS_SIZE_WIDTH.SMALL,
      medium: constants.PROGRESS_SIZE_WIDTH.MEDIUM,
      large: constants.PROGRESS_SIZE_WIDTH.LARGE
    };
    if (props.type === constants.PROGRESS_TYPE.LINE) {
      fontSize = state.strokeWidth ? constants.TEXT_XS + state.strokeWidth * constants.STROKE_WIDTH_RATE : props.size === constants.PROGRESS_SIZE.SMALL ? constants.TEXT_XS : constants.TEXT_SM;
    } else {
      const width = state.width ? state.width : sizeWidthMap[props.size];
      fontSize = width / constants.WIDTH_RATE_THREE;
      state.percentTextSize = width / constants.WIDTH_RATE_SIX;
    }
    return fontSize;
  } else {
    return props.type === constants.PROGRESS_TYPE.LINE ? constants.TEXT_XS + state.strokeWidth * constants.STROKE_WIDTH_RATE : state.width * 0.111111 + 2;
  }
};
const computedContent = ({ props }) => () => typeof props.format === "function" ? props.format() || "" : `${props.percentage}%`;
const getCurrentColor = ({ api, props }) => (percentage) => {
  if (typeof props.color === "function") {
    return props.color(percentage);
  } else if (typeof props.color === "string") {
    return props.color;
  } else {
    return api.getLevelColor(percentage);
  }
};
const getLevelColor = ({ api }) => (percentage) => {
  const colorArray = api.getColorArray().sort((a, b) => a.percentage - b.percentage);
  for (let i = 0; i < colorArray.length; i++) {
    if (colorArray[i].percentage > percentage) {
      return colorArray[i].color;
    }
  }
  return colorArray[colorArray.length - 1].color;
};
const getColorArray = ({ props }) => () => {
  const color = props.color;
  const span = 100 / color.length;
  return color.map((seriesColor, index) => {
    if (typeof seriesColor === "string") {
      return {
        color: seriesColor,
        progress: (index + 1) * span
      };
    }
    return seriesColor;
  });
};
const customBeforeAppearHook = ({ props, state }) => (el) => {
  if (props.type === "line") {
    el.style.width = String(0);
  } else if (props.type === "circle") {
    el.style.strokeDasharray = String(state.perimeter * state.content);
    el.style.strokeDashoffset = state.perimeter;
  }
};
const customAppearHook = (el) => {
  el.style.transition = "all 0.5s";
};
const customAfterAppearHook = ({ state, props }) => (el) => {
  if (props.type === "line") {
    el.style.width = state.barStyle.width;
  } else if (props.type === "circle") {
    el.style.strokeDashoffset = String(0);
  }
};
export {
  computedBarStyle,
  computedCirclePathStyle,
  computedCircleStyle,
  computedContent,
  computedIconClass,
  computedIconStyle,
  computedPerimeter,
  computedProgressTextSize,
  computedRadius,
  computedRate,
  computedRelativeStrokeWidth,
  computedStroke,
  computedStrokeDashoffset,
  computedTrackPath,
  computedTrailPathStyle,
  customAfterAppearHook,
  customAppearHook,
  customBeforeAppearHook,
  getColorArray,
  getCurrentColor,
  getLevelColor
};
