import "../chunk-G2ADBYYC.js";
const setSheetStyle = ({ state, props }) => () => {
  if (props.contentPosition) {
    state.sheetMaskStyle = {
      "position": "absolute"
    };
    state.sheetContentStyle = {
      "max-height": props.height
    };
  } else {
    state.sheetMaskStyle = {
      "position": "fixed"
    };
    state.sheetContentStyle = {
      "position": "fixed",
      "max-height": props.height
    };
  }
  state.contentStyle = props.contentStyle ? props.contentStyle : "";
};
const initScrollMenu = ({ state, nextTick, refs, BScroll }) => () => {
  nextTick(() => {
    const { scrollMenu } = refs;
    if (!scrollMenu) {
      return;
    }
    if (!state.scroll) {
      state.scroll = new BScroll(scrollMenu, {
        probeType: 3,
        tap: "tap"
      });
    } else {
      state.scroll.refresh();
    }
  });
};
const visibleHandle = ({ emit, state }) => () => {
  state.scroll = null;
  emit("update:visible", false);
  emit("close", false);
};
const watchVisible = ({ emit, state }) => (bool) => {
  setTimeout(() => {
    state.toggle = bool;
  }, 0);
  emit("update:visible", bool);
};
const menuHandle = ({ emit, state }) => (item) => {
  state.active = item.id;
  state.scroll = null;
  emit("update:visible", false);
  emit("update:modelValue", item.id);
  emit("click", item);
};
const close = ({ api }) => () => {
  api.handleClose("close", false);
};
const hide = ({ api }) => () => {
  api.handleClose("hide", false);
};
const selectOption = ({ emit, props }) => (option) => {
  const { valueField } = props;
  emit("update:visible", false);
  emit("update:modelValue", option[valueField]);
  emit("click", option);
};
const confirm = ({ state, api }) => () => {
  api.handleClose("confirm", state);
};
const actionSelectOption = ({ emit }) => (option, index) => {
  emit("update:visible", false);
  emit("click", option, index);
};
const handleClose = ({ vm, emit, props }) => (type, show) => {
  if (typeof props.beforeClose === "function" && props.beforeClose(type) === false)
    return;
  if (type === "close") {
    vm.$refs.drawer.close(true);
  } else {
    emit("update:visible", false);
  }
  emit(type, show);
};
export {
  actionSelectOption,
  close,
  confirm,
  handleClose,
  hide,
  initScrollMenu,
  menuHandle,
  selectOption,
  setSheetStyle,
  visibleHandle,
  watchVisible
};
