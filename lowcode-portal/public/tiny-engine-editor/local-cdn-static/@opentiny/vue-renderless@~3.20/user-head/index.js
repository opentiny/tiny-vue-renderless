import "../chunk-G2ADBYYC.js";
const computedStyle = ({ state, props }) => () => {
  return {
    fill: state.color,
    color: state.color,
    backgroundColor: state.backgroundColor,
    backgroundImage: /^(image)$/.test(props.type) && state.internalValue ? `url(${state.internalValue})` : "none"
  };
};
const computedMessage = ({ props }) => () => {
  let result = "";
  const total = Math.floor(props.messageTotal || NaN);
  if (props.messageType === "details" && !isNaN(total) && total > 0) {
    result = String(total);
    if (props.messageUpperLimit && total > props.messageUpperLimit) {
      result = `${props.messageUpperLimit}+`;
    }
  }
  return result;
};
const computedFontSize = ({ props, state, mode }) => () => {
  let fontSize = "";
  if (props.type === "label" && state.label && !props.min) {
    const length = state.label.length;
    const sizeMap = {
      1: "40px",
      2: "30px",
      3: "22px",
      4: "20px",
      5: "18px",
      6: "16px"
    };
    const mfsizeMap = {
      1: `${state.size / 2}px`,
      2: `${state.size / 3}px`,
      3: `${state.size / 4.5}px`,
      4: `${state.size / 6}px`,
      5: `${state.size / 7.5}px`,
      6: `${state.size / 9}px`
    };
    if (mode === "mobile-first") {
      fontSize = mfsizeMap[length];
    } else {
      fontSize = sizeMap[length];
    }
  }
  return { fontSize };
};
const computedLabel = ({ state, props }) => () => props.min ? state.internalValue.substr(0, 2) : state.internalValue.substr(0, 6);
const getInternalValue = ({ props }) => () => {
  if (props.modelValue === null) {
    let result = "";
    if (props.type === "icon") {
      result = "icon-user";
    } else if (props.type === "label") {
      result = "U";
    }
    return result || props.value;
  } else {
    return props.modelValue;
  }
};
const handleClick = (emit) => (event) => emit("click", event);
const mouseEnter = (emit) => (event) => emit("mouseenter", event);
export {
  computedFontSize,
  computedLabel,
  computedMessage,
  computedStyle,
  getInternalValue,
  handleClick,
  mouseEnter
};
