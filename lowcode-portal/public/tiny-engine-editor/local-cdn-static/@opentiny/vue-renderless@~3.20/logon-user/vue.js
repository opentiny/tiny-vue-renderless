import "../chunk-G2ADBYYC.js";
import { init, initService } from './index.js';
const api = ["state"];
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
    userName: ""
  });
  const api2 = {
    state,
    init: init({
      service: $service,
      state
    })
  };
  api2.init();
  return api2;
};
export { api, renderless };