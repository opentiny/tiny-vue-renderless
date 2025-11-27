import "../chunk-G2ADBYYC.js";
import { logout, initService } from './index.js';
const api = ["state", "logout"];
const renderless = (props, {
  reactive
}, {
  service
}) => {
  const $service = initService({
    props,
    service
  });
  const state = reactive({
    logout: $service.isGuestUser()
  });
  const api2 = {
    state,
    logout: logout({
      service: $service,
      state,
      props
    })
  };
  return api2;
};
export { api, renderless };