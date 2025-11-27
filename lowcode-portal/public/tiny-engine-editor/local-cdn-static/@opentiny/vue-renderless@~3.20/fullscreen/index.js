import "../chunk-G2ADBYYC.js";
import { on, off } from './../common/deps/dom.js';
const toggle = ({
  state,
  api
}) => value => {
  if (value === void 0) {
    if (state.isFullscreen) {
      api.exit();
    } else {
      api.request();
    }
  } else {
    value ? api.request() : api.exit();
  }
};
const request = ({
  props,
  state,
  vm,
  sf,
  api
}) => () => {
  const change = () => {
    if (state.isPageOnly) {
      state.isFullscreen = true;
      api.onChangeFullScreen();
      off(document, "keyup", api.keypressCallback);
      on(document, "keyup", api.keypressCallback);
    } else {
      sf.off("change", api.fullScreenCallback);
      sf.on("change", api.fullScreenCallback);
      sf.request(props.teleport ? document.body : vm.$el);
    }
    if (props.teleport) {
      if (vm.$el.parentNode === document.body) {
        return;
      }
      state.__parentNode = vm.$el.parentNode;
      state.__token = document.createComment("fullscreen-token");
      state.__parentNode.insertBefore(state.__token, vm.$el);
      document.body.appendChild(vm.$el);
    }
  };
  props.beforeChange ? props.beforeChange(change) : change();
};
const exit = ({
  state,
  api,
  sf,
  props
}) => () => {
  const change = () => {
    if (!state.isFullscreen) {
      return;
    }
    if (state.isPageOnly) {
      state.isFullscreen = false;
      api.onChangeFullScreen();
      off(document, "keyup", api.keypressCallback);
    } else {
      sf.exit();
    }
  };
  props.beforeChange ? props.beforeChange(change) : change();
};
const shadeClick = ({
  props,
  vm,
  api
}) => e => {
  if (e.target === vm.$el) {
    if (props.exitOnClickWrapper) {
      api.exit();
    }
  }
};
const fullScreenCallback = ({
  state,
  sf,
  api
}) => () => {
  if (!sf.isFullscreen) {
    sf.off("change", api.fullScreenCallback);
  }
  state.isFullscreen = sf.isFullscreen;
  api.onChangeFullScreen();
};
const keypressCallback = api => e => {
  if (e.key === "Escape") {
    api.exit();
  }
};
const onChangeFullScreen = ({
  props,
  state,
  vm,
  emit
}) => () => {
  if (!state.isFullscreen) {
    if (props.teleport && state.__parentNode) {
      state.__parentNode.insertBefore(vm.$el, state.__token);
      state.__parentNode.removeChild(state.__token);
    }
  }
  emit("change", state.isFullscreen);
  emit("update:fullscreen", state.isFullscreen);
};
const enter = api => () => {
  api.request();
};
const getState = state => () => state.isFullscreen;
const computeWrapperStyle = ({
  props,
  state
}) => () => {
  let style = {};
  if ((state.isPageOnly || props.teleport) && state.isFullscreen) {
    Object.assign(style, {
      position: "fixed",
      left: "0",
      top: "0",
      width: "100%",
      height: "100%"
    });
  }
  if (style && props.zIndex) {
    style.zIndex = props.zIndex;
  }
  return style;
};
export { computeWrapperStyle, enter, exit, fullScreenCallback, getState, keypressCallback, onChangeFullScreen, request, shadeClick, toggle };