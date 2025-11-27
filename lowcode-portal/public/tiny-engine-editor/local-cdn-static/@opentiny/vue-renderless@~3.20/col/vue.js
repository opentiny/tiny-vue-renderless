import "../chunk-G2ADBYYC.js";
import { setSubitemAttrValue, setGlobalAttrValue, getClassName, getStyle, row } from './index.js';
const api = ["state"];
const renderless = (props, {
  computed,
  reactive,
  inject
}, {
  parent
}) => {
  const api2 = {};
  const state = reactive({
    row: computed(() => api2.row()),
    style: computed(() => api2.getStyle()),
    className: computed(() => api2.getClassName()),
    layout: inject("layout", {})
  });
  Object.assign(api2, {
    state,
    row: row(parent),
    setGlobalAttrValue,
    setSubitemAttrValue,
    getStyle: getStyle({
      props,
      state
    }),
    getClassName: getClassName({
      api: api2,
      props,
      state
    })
  });
  return api2;
};
export { api, renderless };