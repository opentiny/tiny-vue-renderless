import "../chunk-G2ADBYYC.js";
import { linkClick } from './index.js';
const api = ["linkClick", "state"];
const renderless = (props, {
  reactive,
  inject,
  computed
}, {
  refs,
  router,
  emit,
  designConfig
}) => {
  const breadcrumbEmitter = inject("breadcrumbEmitter");
  const breadcrumb = inject("breadcrumb");
  const constants = breadcrumb._constants;
  const state = reactive({
    size: inject("size", null),
    separator: computed(() => breadcrumb.separator || (designConfig == null ? void 0 : designConfig.separator) || "/")
  });
  const api2 = {
    state,
    linkClick: linkClick({
      props,
      refs,
      router,
      emit,
      breadcrumbEmitter,
      constants
    })
  };
  return api2;
};
export { api, renderless };