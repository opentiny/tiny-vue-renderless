import "../chunk-G2ADBYYC.js";
const handleExpand = (state) => (e) => state.activeNode = e.target;
const handleMouseMove = ({
  api,
  parent,
  vm,
  state,
  svg
}) => (e) => {
  const hoverZone = vm.$refs.hoverZone;
  if (!state.activeNode || !hoverZone) {
    return;
  }
  if (state.activeNode.contains(e.target)) {
    if (state.hoverTimer) {
      clearTimeout(state.hoverTimer);
    }
    const { left } = vm.$refs.cascaderMenu.$parent.$el.getBoundingClientRect();
    const startX = e.clientX - left;
    const { offsetWidth, offsetHeight } = vm.$refs.cascaderMenu.$parent.$el;
    const top = state.activeNode.offsetTop;
    const bottom = top + state.activeNode.offsetHeight;
    hoverZone.innerHTML = `
      ${svg}${startX} ${top} L${offsetWidth} 0 V${top} Z" />
      ${svg}${startX} ${bottom} L${offsetWidth} ${offsetHeight} V${bottom} Z" />
    `;
  } else if (!state.hoverTimer) {
    state.hoverTimer = setTimeout(api.clearHoverZone, parent.$parent.state.config.hoverThreshold);
  }
};
const clearHoverZone = ({ vm }) => () => {
  const { hoverZone } = vm.$refs.hoverZone;
  if (!hoverZone) {
    return;
  }
  hoverZone.innerHTML = "";
};
export {
  clearHoverZone,
  handleExpand,
  handleMouseMove
};
