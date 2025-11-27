import "../chunk-G2ADBYYC.js";
const switchIndex = (index, state, emit) => {
  if (index === state.index) {
    return;
  }
  emit("select", index);
  state.index = index;
  if (index < state.childrenAnchor.length) {
    const item = state.childrenAnchor[index];
    document.documentElement.scrollTop = item.offsetTop;
  }
};
const handleTouchDown = ({ state }) => () => {
  state.isMouseDown = true;
};
const handleTouchMove = ({ emit, state }) => (e) => {
  if (state.isMouseDown && e.target.id) {
    switchIndex(Number(e.target.id), state, emit);
  }
};
const handleTouchUp = ({ state }) => () => {
  state.isMouseDown = false;
};
const handleIndexClick = ({ emit, state }) => (value) => {
  switchIndex(value.index, state, emit);
};
const updateAnchorChildren = ({ state, refs }) => () => {
  const node = refs.indexBarContent;
  if (node) {
    state.childrenAnchor = [];
    getAnchorChildren(node, state);
  }
};
const getAnchorChildren = (node, state) => {
  node.childNodes.forEach((ele) => {
    if (ele.className === "tiny-mobile-index-bar-anchor") {
      state.childrenAnchor.push(ele);
    } else {
      getAnchorChildren(ele, state);
    }
  });
};
const handleScroll = ({ state }) => () => {
  findTopAnchor(state);
};
const findTopAnchor = (state) => {
  const scrollTop = document.documentElement.scrollTop;
  for (let index = 0; index < state.childrenAnchor.length; index++) {
    const item = state.childrenAnchor[index];
    if (item.offsetTop + item.offsetHeight > scrollTop) {
      state.index = index;
      break;
    }
  }
};
export {
  findTopAnchor,
  getAnchorChildren,
  handleIndexClick,
  handleScroll,
  handleTouchDown,
  handleTouchMove,
  handleTouchUp,
  switchIndex,
  updateAnchorChildren
};
