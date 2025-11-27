import "../chunk-G2ADBYYC.js";
import afterLeave from './../common/deps/after-leave.js';
import { removeClass } from './../common/deps/dom.js';
const handleAfterLeave = emit => () => {
  emit("after-leave");
};
const setText = state => text => {
  state.text = text;
};
const close = ({
  state,
  constants,
  vm
}) => () => {
  afterLeave(vm, () => {
    const target = state.fullscreen || state.body ? document.body : state.target;
    if (vm.$el && vm.$el.parentNode) {
      removeClass(target, constants.PARENT_RELATIVE_CLS);
      removeClass(target, constants.PARENT_HIDDEN_CLS);
      vm.$el.parentNode.removeChild(vm.$el);
    }
    state.closed = true;
  }, 300);
  state.visible = false;
};
export { close, handleAfterLeave, setText };