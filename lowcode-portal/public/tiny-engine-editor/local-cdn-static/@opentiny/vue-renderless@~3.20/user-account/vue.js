import "../chunk-G2ADBYYC.js";
import { initService } from './../user/index.js';
import { init } from './index.js';
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
    imgUrl: "",
    userName: "",
    roleNumber: ""
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