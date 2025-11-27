import "../chunk-G2ADBYYC.js";
import { breadcrumbItemSelect } from './index.js';
const api = ["breadcrumbItemSelect", "state"];
const renderless = (props, {
  reactive,
  provide
}, {
  emit,
  constants,
  emitter
}) => {
  const state = reactive({
    breadcrumbEmitter: emitter(),
    size: props.size,
    currentBreadcrumbItem: {}
  });
  const api2 = {
    state,
    breadcrumbItemSelect: () => breadcrumbItemSelect({
      api: api2,
      emit,
      state,
      constants
    })
  };
  provide("size", state.size);
  provide("breadcrumbEmitter", state.breadcrumbEmitter);
  api2.breadcrumbItemSelect();
  return api2;
};
export { api, renderless };