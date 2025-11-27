import "../chunk-G2ADBYYC.js";
import { omitText } from './../common/string.js';
const updateStartIndex = ({
  state,
  props
}) => () => {
  const {
    visibleNum,
    active
  } = props;
  const maxStartIndex = Math.min(props.data.length - visibleNum, active - Math.floor(visibleNum / 2));
  state.startIndex = Math.max(0, maxStartIndex);
};
const isVisibleHandler = ({
  state,
  props
}) => index => {
  if (index < state.startIndex) {
    return "hidden-left";
  } else if (index >= state.startIndex + props.visibleNum) {
    return "hidden-right";
  } else {
    return "visible";
  }
};
const computedRightNodePos = ({
  state,
  props
}) => () => {
  const {
    data
  } = props;
  const {
    endIndex
  } = state;
  const dataLength = data.length;
  const nodesLength = dataLength - 1 - endIndex;
  return Array.from({
    length: nodesLength
  }).map((item, index) => ({
    zIndex: dataLength - index,
    right: -(index + 1) * 4 + "px"
  }));
};
const handleMouseenter = ({
  state,
  vm
}) => (e, placement) => {
  const ele = e.target;
  const text = ele.textContent;
  const font = window.getComputedStyle(ele).font;
  const rect = ele.getBoundingClientRect();
  const res = omitText(text, font, rect.width);
  const popover = vm.$refs.popover;
  if (res.o) {
    popover.state.referenceElm = ele;
    popover.state.popperElm && (popover.state.popperElm.style.display = "none");
    popover.doDestroy();
    state.popoverContent = text;
    state.popoverVisible = true;
    state.popoverPlacement = placement;
    setTimeout(popover.updatePopper, 20);
  }
};
const handleMouseleave = state => () => {
  state.popoverVisible = false;
};
const computedSpace = ({
  props
}) => {
  const {
    space = ""
  } = props;
  if (/^\d+$/.test(String(space))) {
    return `${space}px`;
  }
  return space;
};
export { computedRightNodePos, computedSpace, handleMouseenter, handleMouseleave, isVisibleHandler, updateStartIndex };