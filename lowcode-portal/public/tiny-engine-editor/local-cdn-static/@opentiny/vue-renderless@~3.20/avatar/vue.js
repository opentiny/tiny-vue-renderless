import "../chunk-G2ADBYYC.js";
import { computedAvatarClass, handleError } from './index.js';
const api = ["state", "handleError"];
const renderless = (props, {
  computed,
  reactive
}, {
  constants
}) => {
  const api2 = {
    computedAvatarClass: computedAvatarClass(constants)
  };
  const state = reactive({
    isSrcImageExist: true,
    isDefaultImageExist: true,
    avatarClass: computed(() => api2.computedAvatarClass(props))
  });
  Object.assign(api2, {
    state,
    handleError: handleError({
      props,
      state
    })
  });
  return api2;
};
export { api, renderless };