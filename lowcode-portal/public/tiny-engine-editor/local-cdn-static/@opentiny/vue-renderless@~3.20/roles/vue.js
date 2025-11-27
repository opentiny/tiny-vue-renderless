import "../chunk-G2ADBYYC.js";
import { showList, show, hide, getRoleList, changeRole, initService } from './index.js';
const api = ["state", "showList", "show", "hide", "changeRole"];
const renderless = (props, {
  computed,
  reactive
}, {
  emit,
  service,
  constants
}) => {
  const $service = initService(service, props);
  let api2 = {};
  const state = reactive({
    currentRole: "",
    currentId: "",
    showPopover: true,
    showIcon: true,
    roleList: computed(() => api2.getRoleList())
  });
  api2 = {
    state,
    show: show(state),
    hide: hide(state),
    showList: showList(state),
    getRoleList: getRoleList({
      constants,
      service: $service,
      state
    }),
    changeRole: changeRole({
      constants,
      emit,
      props,
      service: $service,
      state
    })
  };
  return api2;
};
export { api, renderless };