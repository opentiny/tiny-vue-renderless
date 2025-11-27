import "../chunk-G2ADBYYC.js";
const ALERT_TIMEOUT = 2e3;
const watchAutoHide = ({ api, props }) => (newVal) => {
  if (props.autoHide && newVal) {
    const timer = setTimeout(() => {
      api.handleClose();
      clearTimeout(timer);
    }, ALERT_TIMEOUT);
  }
};
const computedClass = ({ props, mode }) => () => {
  const { type, size, center } = props;
  if (mode === "mobile") {
    const alertClass = ["tiny-mobile-alert", "tiny-mobile-alert--" + type, "tiny-mobile-alert--" + size];
    if (center) {
      alertClass.push("is-center");
    }
    return alertClass;
  }
  return [];
};
const computedStyle = ({ props, mode }) => () => {
  if (mode === "mobile") {
    const style = {
      top: isNaN(props.offset) ? props.offset : `${props.offset}px`
    };
    return style;
  }
  return null;
};
const handleClose = ({ emit, state }) => () => {
  state.show = false;
  emit("close");
};
const computedGetIcon = ({ constants, props, designConfig }) => () => {
  var _a;
  const designIcon = (_a = designConfig == null ? void 0 : designConfig.icons) == null ? void 0 : _a[props.type];
  return props.icon || designIcon || constants.ICON_MAP[props.type];
};
const computedGetTitle = ({ constants, t, props }) => () => props.title || t(constants.TITLE_MAP[props.type]);
const handleHeaderClick = ({ state, props, vm }) => () => {
  if (props.showFoldable) {
    state.contentVisible = !state.contentVisible;
  }
  if (vm.$refs.ContentDescribe) {
    state.contentDescribeHeight = vm.$refs.ContentDescribe.scrollHeight;
    if (state.contentDescribeHeight > state.contentMaxHeight) {
      state.scrollStatus = true;
    }
  }
  if (vm.$refs.ContentDefault) {
    state.contentDefaultHeight = vm.$refs.ContentDefault.scrollHeight;
    if (state.contentDefaultHeight > state.contentMaxHeight) {
      state.scrollStatus = true;
    }
  }
};
const getEl = (node) => {
  return node.$el || node;
};
const handlerTargetNode = ({ props, parent, vm, nextTick }) => () => {
  const { target } = props;
  const { $parent } = parent;
  nextTick(() => {
    const alertParentNode = $parent == null ? void 0 : $parent.$refs[target];
    if (!target || !alertParentNode) {
      return;
    }
    const targetNode = Array.isArray(alertParentNode) ? alertParentNode[0] : alertParentNode;
    getEl(targetNode).insertBefore(vm.$el, getEl(targetNode).firstChild);
  });
};
export {
  ALERT_TIMEOUT,
  computedClass,
  computedGetIcon,
  computedGetTitle,
  computedStyle,
  handleClose,
  handleHeaderClick,
  handlerTargetNode,
  watchAutoHide
};
