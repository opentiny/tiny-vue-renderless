import "../chunk-G2ADBYYC.js";
import { setActiveNames, handleItemClick } from './index.js';
const api = ["state"];
const renderless = (props, {
  reactive,
  watch
}, {
  parent,
  emit,
  constants
}) => {
  const eventName = constants.EVENT_NAME.CollapseItemClick;
  const state = reactive({
    activeNames: []
  });
  const api2 = {
    state,
    setActiveNames: setActiveNames({
      emit,
      props,
      state
    })
  };
  api2.handleItemClick = handleItemClick({
    api: api2,
    props,
    state
  });
  watch(() => props.modelValue, value => {
    state.activeNames = value || value === 0 ? [].concat(value) : [];
  }, {
    immediate: true,
    deep: true
  });
  parent.$on(eventName, api2.handleItemClick);
  return api2;
};
export { api, renderless };