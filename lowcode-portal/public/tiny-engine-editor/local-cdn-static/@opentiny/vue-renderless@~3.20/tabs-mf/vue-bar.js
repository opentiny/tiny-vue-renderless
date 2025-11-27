import "../chunk-G2ADBYYC.js";
import { addResizeListener, removeResizeListener } from './../common/deps/resize-event.js';
import { wheelListener, getBoundRect, handleClickDropdownItem, key, emitAdd } from './index.js';
import { getAddWheelListener } from './wheel.js';
const {
  addWheelListener,
  removeWheelListener
} = getAddWheelListener(window, document);
const api = ["state", "wheelListener", "handleClickDropdownItem", "key", "emitAdd"];
const renderless = (props, {
  onMounted,
  onBeforeUnmount,
  reactive,
  watch,
  inject,
  computed
}, {
  vm
}) => {
  const tabs = inject("tabs", null);
  const state = reactive({
    moreList: [],
    moreLeft: false,
    moreRight: false,
    moreOptions: [],
    tabMoreWidth: 0,
    navPaddingRight: 0,
    withAdd: computed(() => tabs.withAdd),
    slotCustom: tabs.slots.custom,
    separator: inject("separator", null)
  });
  const api2 = {
    getBoundRect: getBoundRect(vm),
    handleClickDropdownItem: handleClickDropdownItem(tabs),
    key,
    emitAdd: emitAdd(tabs)
  };
  Object.assign(api2, {
    state,
    wheelListener: wheelListener({
      vm,
      api: api2,
      tabs,
      state
    })
  });
  watch(() => state.moreList, () => {
    state.moreOptions = state.moreList.map(name => tabs.state.items.find(item => item.name === name));
  });
  onMounted(() => {
    addWheelListener(vm.$refs.scroll, api2.wheelListener);
    addResizeListener(vm.$el, api2.wheelListener);
    api2.wheelListener();
  });
  onBeforeUnmount(() => {
    removeWheelListener(vm.$refs.scroll, api2.wheelListener);
    removeResizeListener(vm.$el, api2.wheelListener);
  });
  return api2;
};
export { api, renderless };