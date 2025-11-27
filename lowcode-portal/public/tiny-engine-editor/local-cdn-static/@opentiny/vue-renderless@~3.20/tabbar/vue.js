import "../chunk-G2ADBYYC.js";
import { setActiveItem, onChange, getChildrens, getItems, beforeDestroy, initPage } from './index.js';
import { on } from './../common/deps/dom.js';
const api = ["state", "onChange", "getChildrens"];
const renderless = (props, {
  computed,
  onMounted,
  reactive,
  watch,
  onBeforeUnmount,
  provide
}, {
  vm,
  emit,
  nextTick,
  childrenHandler
}) => {
  const api2 = {};
  const state = reactive({
    height: null,
    children: [],
    fit: computed(() => props.safeAreaInsetBottom ? props.safeAreaInsetBottom : props.fixed),
    activeItem: false,
    showIndex: 0,
    showNumber: computed(() => props.showNumber > 0 ? props.showNumber : -1),
    tabbarWidth: null,
    itemList: computed(() => props.itemList || [])
  });
  Object.assign(api2, {
    state,
    onChange: onChange({
      emit,
      props
    }),
    parent: computed(() => api2.getParent()),
    setActiveItem: setActiveItem({
      props,
      state
    }),
    getChildrens: getChildrens({
      childrenHandler,
      api: api2
    }),
    getItems: getItems(state),
    beforeDestroy: beforeDestroy({
      vm,
      api: api2
    }),
    initPage: initPage({
      state,
      vm
    })
  });
  onMounted(() => {
    on(window, "resize", api2.initPage);
    state.tabbarWidth = vm.$refs.tabbar && vm.$refs.tabbar.offsetWidth;
    if (props.placeholder && props.fixed) {
      nextTick(() => {
        state.height = vm.$refs.tabbar.getBoundingClientRect().height;
      });
    }
    state.itemList.forEach(item => {
      if (item.customIcon) {
        provide("customIcon", item.customIcon);
      }
    });
  });
  vm.$on("updateItems", api2.getItems);
  vm.$on("activeItem", api2.onChange);
  vm.$on("showIndex", () => {
    state.showIndex++;
  });
  watch(() => props.modelValue, () => {
    setTimeout(() => {
      api2.setActiveItem();
    }, 100);
  }, {
    immediate: true
  });
  watch(() => state.children, api2.setActiveItem, {
    immediate: true
  });
  onBeforeUnmount(api2.beforeDestroy);
  return api2;
};
export { api, renderless };