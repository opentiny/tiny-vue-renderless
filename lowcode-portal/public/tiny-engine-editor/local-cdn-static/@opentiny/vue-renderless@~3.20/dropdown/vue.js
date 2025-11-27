import "../chunk-G2ADBYYC.js";
import { guid } from './../common/string.js';
import { watchVisible, watchFocusing, show, hide, handleClick, handleTriggerKeyDown, handleItemKeyDown, resetTabindex, removeTabindex, initAria, initEvent, handleMenuItemClick, handleMainButtonClick, triggerElmFocus, initDomOperation, mounted, beforeDistory, clickOutside } from './index.js';
const api = ["state", "handleMainButtonClick", "hide", "show", "initDomOperation", "handleClick", "clickOutside"];
const renderless = (props, {
  reactive,
  watch,
  provide,
  onMounted,
  computed
}, {
  emit,
  parent,
  broadcast,
  vm,
  nextTick,
  mode,
  designConfig
}) => {
  const api2 = {};
  const state = reactive({
    visible: false,
    timeout: null,
    focusing: false,
    menuItems: [],
    menuItemsArray: [],
    triggerElm: null,
    dropdownElm: null,
    listId: `dropdown-menu-${guid()}`,
    showIcon: props.showIcon,
    showSelfIcon: props.showSelfIcon,
    designConfig,
    trigger: computed(() => {
      var _a;
      return props.trigger || ((_a = designConfig == null ? void 0 : designConfig.props) == null ? void 0 : _a.trigger) || "hover";
    })
  });
  provide("dropdownVm", vm);
  Object.assign(api2, {
    state,
    watchVisible: watchVisible({
      broadcast,
      emit,
      nextTick
    }),
    watchFocusing: watchFocusing(parent),
    show: show({
      props,
      state
    }),
    hide: hide({
      api: api2,
      props,
      state
    }),
    mounted: mounted({
      api: api2,
      vm,
      state,
      broadcast
    }),
    handleClick: handleClick({
      api: api2,
      props,
      state,
      emit
    }),
    handleTriggerKeyDown: handleTriggerKeyDown({
      api: api2,
      state
    }),
    handleItemKeyDown: handleItemKeyDown({
      api: api2,
      props,
      state
    }),
    resetTabindex: resetTabindex(api2),
    removeTabindex: removeTabindex(state),
    initAria: initAria({
      state,
      props
    }),
    initEvent: initEvent({
      api: api2,
      props,
      state,
      vm,
      mode
    }),
    handleMenuItemClick: handleMenuItemClick({
      props,
      state,
      emit
    }),
    handleMainButtonClick: handleMainButtonClick({
      api: api2,
      emit
    }),
    triggerElmFocus: triggerElmFocus(state),
    initDomOperation: initDomOperation({
      api: api2,
      state,
      vm
    }),
    beforeDistory: beforeDistory({
      vm,
      api: api2,
      state
    }),
    clickOutside: clickOutside({
      props,
      api: api2
    })
  });
  watch(() => state.visible, api2.watchVisible);
  watch(() => state.focusing, api2.watchFocusing);
  onMounted(api2.mounted);
  return api2;
};
export { api, renderless };