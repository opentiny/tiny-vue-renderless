import "../chunk-G2ADBYYC.js";
const handleScroll = ({ props, state }) => {
  if (props.element) {
    const beforeHeight = props.element.scrollTop || document.documentElement.scrollTop || document.body.scrollTop;
    if (beforeHeight <= props.visibilityHeight) {
      state.show = false;
    }
    props.element.onscroll = function() {
      state.show = true;
      const height = props.element.scrollTop || document.documentElement.scrollTop || document.body.scrollTop;
      if (height <= props.visibilityHeight) {
        state.show = false;
      }
    };
  }
};
const handleClick = ({ emit, props, state }) => (event) => {
  var _a;
  if (props.trigger === "click" && props.resetTime > 0 && !props.backTop) {
    state.disabled = true;
    state.open = !state.open;
    state.timer = window.setTimeout(() => {
      state.disabled = false;
    }, props.resetTime);
  }
  if (!props.trigger && (props.href || props.target) && !props.backTop) {
    window.open(props.href, props.target);
  }
  if (props.backTop) {
    (_a = props.element) == null ? void 0 : _a.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  emit("click", event);
};
const clearTimer = (state) => () => clearTimeout(state.timer);
export {
  clearTimer,
  handleClick,
  handleScroll
};
