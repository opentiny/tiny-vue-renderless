import "../chunk-G2ADBYYC.js";
import { handleAfterLeave, setText, close } from './index.js';
const api = ["state", "handleAfterLeave", "setText", "close"];
const renderless = (props, {
  reactive,
  computed
}, {
  constants,
  vm,
  emit,
  designConfig
}) => {
  const state = reactive({
    text: null,
    spinner: null,
    visible: false,
    customClass: "",
    background: null,
    fullscreen: true,
    closed: false,
    size: "",
    iconSize: "",
    loadingImg: computed(() => {
      var _a;
      return props.loadingImg || ((_a = designConfig == null ? void 0 : designConfig.props) == null ? void 0 : _a.loadingImg);
    }),
    iconStyle: computed(() => state.iconSize ? {
      width: state.iconSize + "px",
      height: state.iconSize + "px"
    } : {})
  });
  const api2 = {
    state,
    setText: setText(state),
    handleAfterLeave: handleAfterLeave(emit),
    close: close({
      state,
      constants,
      vm
    })
  };
  return api2;
};
export { api, renderless };