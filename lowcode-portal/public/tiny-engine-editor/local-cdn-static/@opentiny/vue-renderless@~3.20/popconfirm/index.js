import "../chunk-G2ADBYYC.js";
const hide = ({ state, emit }) => () => {
  state.isLock = true;
  setTimeout(() => {
    state.isLock = false;
  }, 300);
  state.showPopover = false;
};
const show = ({ state, props, emit }) => (trigger) => {
  if ((trigger ? props.trigger !== trigger : !props.reference) || state.isLock || state.showPopover) {
    return;
  }
  state.showPopover = true;
};
const confirm = ({ state, api }) => () => {
  state.showPopover = false;
  api.handleEmit("confirm");
};
const handleEmit = ({ state, emit, vm }) => (type) => {
  let { events = {} } = vm;
  if (events[type]) {
    events[type].call(vm, { $modal: vm, type });
  } else {
    emit(type, state);
  }
};
const handleDocumentClick = ({ vm, api }) => (event) => {
  if (vm.$refs.popover.handleDocumentClick(event)) {
    api.hide();
  }
};
export {
  confirm,
  handleDocumentClick,
  handleEmit,
  hide,
  show
};
