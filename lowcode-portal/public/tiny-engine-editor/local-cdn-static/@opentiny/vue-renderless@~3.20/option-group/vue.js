import "../chunk-G2ADBYYC.js";
import { queryChange, observeCallback } from './index.js';
const api = ["state", "queryChange"];
const renderless = (props, {
  onMounted,
  onBeforeUnmount,
  reactive,
  watch,
  inject
}, {
  broadcast,
  vm
}) => {
  const select = inject("select");
  const constants = select._constants;
  const state = reactive({
    visible: true,
    timer: null
  });
  const api2 = {};
  Object.assign(api2, {
    state,
    queryChange: queryChange({
      select,
      state,
      vm
    }),
    observeCallback: observeCallback({
      state,
      api: api2
    })
  });
  watch(() => props.disabled, value => {
    broadcast(constants.COMPONENT_NAME.Option, constants.EVENT_NAME.handleGroupDisabled, value);
  }, {
    immediate: true
  });
  onMounted(() => {
    if (select.filterable) {
      const config = {
        attributes: false,
        childList: true,
        subtree: false
      };
      api2.observer = new MutationObserver(api2.observeCallback);
      if (vm.$refs.selectGroup) {
        api2.observer.observe(vm.$refs.selectGroup, config);
      }
    }
    if (props.disabled) {
      broadcast(constants.COMPONENT_NAME.Option, constants.EVENT_NAME.handleGroupDisabled, props.disabled);
    }
    select.state.selectEmitter.on(constants.EVENT_NAME.queryChange, api2.queryChange);
  });
  onBeforeUnmount(() => {
    api2.observer && api2.observer.disconnect();
  });
  return api2;
};
export { api, renderless };