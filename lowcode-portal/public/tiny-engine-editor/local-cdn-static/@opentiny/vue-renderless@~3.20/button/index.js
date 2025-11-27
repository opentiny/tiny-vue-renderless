import "../chunk-G2ADBYYC.js";
import { xss } from './../common/xss.js';
const handleClick = ({
  emit,
  props,
  state,
  designConfig
}) => event => {
  var _a, _b;
  const urlHref = xss.filterUrl(props.href);
  const DEFAULT_RESETTIME = 1e3;
  let resetTime = DEFAULT_RESETTIME;
  if (props.resetTime !== DEFAULT_RESETTIME) {
    resetTime = props.resetTime;
  } else {
    resetTime = (_b = (_a = designConfig == null ? void 0 : designConfig.props) == null ? void 0 : _a.resetTime) != null ? _b : props.resetTime;
  }
  if (urlHref) {
    location.href = urlHref;
  } else if (props.nativeType === "button" && resetTime > 0) {
    state.disabled = true;
    state.timer = window.setTimeout(() => {
      state.disabled = false;
    }, resetTime);
  }
  emit("click", event);
};
const clearTimer = state => () => clearTimeout(state.timer);
export { clearTimer, handleClick };