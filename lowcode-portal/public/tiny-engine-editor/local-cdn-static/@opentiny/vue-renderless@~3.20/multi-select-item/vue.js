import "../chunk-G2ADBYYC.js";
import { handleClick, toggleExpand } from './index.js';
const api = ["state", "created", "handleClick", "confirm", "reset", "wheelChange", "clickWheelItem", "loadDefault", "toggleExpand"];
const initApi = ({
  api: api2,
  props,
  state,
  multiSelect
}) => {
  Object.assign(api2, {
    state,
    handleClick: handleClick({
      props,
      multiSelect
    }),
    toggleExpand: toggleExpand({
      props,
      multiSelect
    })
  });
};
const renderless = (props, {
  reactive,
  inject
}, {
  emit,
  nextTick,
  refs,
  vm
}) => {
  const api2 = {};
  const multiSelect = inject("multiSelect");
  const state = reactive({});
  initApi({
    api: api2,
    multiSelect,
    props,
    state
  });
  return api2;
};
export { api, renderless };