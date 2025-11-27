import "../chunk-G2ADBYYC.js";
import { handleNavItemClick, getBoundRectNV, handleNavItemClose } from './index.js';
const api = ["state", "handleNavItemClick", "getBoundRect", "handleNavItemClose"];
const renderless = (props, {
  inject,
  markRaw,
  reactive,
  computed
}, {
  vm
}) => {
  const tabs = inject("tabs", null);
  tabs.addNav(markRaw(vm));
  const state = reactive({
    tabSize: computed(() => tabs.size),
    withClose: computed(() => tabs.withClose),
    separator: inject("separator", null)
  });
  const api2 = {
    state,
    handleNavItemClick: handleNavItemClick({
      tabs,
      props,
      vm
    }),
    getBoundRect: getBoundRectNV({
      vm,
      props
    }),
    handleNavItemClose: handleNavItemClose({
      tabs,
      props
    })
  };
  return api2;
};
export { api, renderless };