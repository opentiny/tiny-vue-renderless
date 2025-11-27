import "../chunk-G2ADBYYC.js";
import { xss } from './../common/xss.js';
import { handleClick } from './index.js';
const api = ["state", "handleClick"];
const renderless = (props, {
  inject,
  reactive,
  computed
}, {
  emit,
  parent
}) => {
  parent.tinyForm = parent.tinyForm || inject("form", null);
  const state = reactive({
    formDisabled: computed(() => (parent.tinyForm || {}).disabled),
    disabled: computed(() => props.disabled || state.formDisabled),
    href: computed(() => xss.filterUrl(props.href))
  });
  return {
    state,
    handleClick: handleClick({
      emit,
      props,
      state
    })
  };
};
export { api, renderless };