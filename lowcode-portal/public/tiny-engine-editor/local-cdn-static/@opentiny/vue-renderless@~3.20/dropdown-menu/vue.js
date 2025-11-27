import "../chunk-G2ADBYYC.js";
import { toggleItem, updateOffset, clickOutside, getScroller, useVuePopper, mounted, handleMenuItemClick, handleMouseenter, handleMouseleave } from './index.js';
const api = ["state", "toggleItem", "updateOffset", "clickOutside", "doDestroy", "handleMouseenter", "handleMouseleave"];
const renderless = (props, hooks, instance) => {
  const api2 = {};
  const {
    reactive,
    provide,
    onMounted,
    inject
  } = hooks;
  const {
    nextTick,
    mode,
    vm,
    parent,
    dispatch,
    emit,
    designConfig
  } = instance;
  provide("dropdownMenuVm", vm);
  provide("multiStage", props.multiStage);
  const dropdownVm = inject("dropdownVm");
  const state = reactive({
    offset: 0,
    scroller: null,
    children: [],
    size: "",
    showPopper: false,
    initShowPopper: !dropdownVm.lazyShowPopper,
    // 辅助变量,
    label: "",
    showContent: false,
    selected: false,
    selectedIndex: -1,
    canvasHeight: inject("change-size", null)
  });
  if (mode === "mobile") {
    nextTick(() => {
      state.scroller = getScroller(vm.$refs.menu);
    });
  } else {
    useVuePopper({
      api: api2,
      hooks,
      props,
      instance,
      state,
      dropdownVm,
      designConfig
    });
  }
  Object.assign(api2, {
    state,
    toggleItem: toggleItem(state),
    clickOutside: clickOutside({
      props,
      state
    }),
    updateOffset: updateOffset({
      props,
      state,
      vm
    }),
    mounted: mounted({
      api: api2,
      parent,
      state
    }),
    handleMouseenter: handleMouseenter(emit),
    handleMouseleave: handleMouseleave(emit),
    handleMenuItemClick: handleMenuItemClick({
      dispatch,
      state
    })
  });
  onMounted(api2.mounted);
  return api2;
};
export { api, renderless };