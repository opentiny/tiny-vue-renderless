import "../chunk-G2ADBYYC.js";
const doDestroy = ({ vm }) => () => {
  vm.$refs.popper && vm.$refs.popper.doDestroy();
};
const show = ({ state }) => () => {
  state.visible = true;
};
const hide = ({ state }) => () => {
  state.visible = false;
};
const togglePanel = ({ props, state }) => () => {
  if (props.disabled)
    return;
  state.visible = !state.visible;
};
const popoverShow = ({ state, emit }) => () => {
  emit("visible-change", state.visible);
};
const popoverHide = ({ state, emit }) => () => {
  emit("visible-change", state.visible);
};
const handleClear = ({ emit }) => () => {
  emit("handle-clear");
};
const handleDocumentClick = ({ state, vm }) => (event) => {
  const filterBox = vm.$refs.filterBox.$el;
  const popper = document.querySelector(".tiny-filter-panel__popover");
  if (!filterBox || !popper || filterBox.contains(event.target) || popper.contains(event.target)) {
    return;
  }
  state.visible = false;
};
export {
  doDestroy,
  handleClear,
  handleDocumentClick,
  hide,
  popoverHide,
  popoverShow,
  show,
  togglePanel
};
