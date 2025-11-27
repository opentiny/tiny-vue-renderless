import "../chunk-G2ADBYYC.js";
import { off } from './../common/deps/dom.js';
const setActiveItem = ({
  props,
  state
}) => () => {
  state.children.forEach((item, index) => {
    item.state ? item.state.index = index : item.index = index;
    item.state && (item.state.active = (item.name || index) === props.modelValue);
  });
};
const onChange = ({
  emit,
  props
}) => active => {
  if (active !== props.modelValue) {
    emit("update:modelValue", active);
    emit("change", active);
  }
};
const getChildrens = ({
  childrenHandler,
  api
}) => () => {
  const $children = [];
  childrenHandler(({
    options,
    vm
  }) => {
    options.componentName === "TabbarItem" && $children.push(vm);
  });
  api.setActiveItem();
  return $children;
};
const getItems = state => item => {
  if (state.showIndex >= state.showNumber) {
    item.state.showVm = false;
  }
  state.children.push(item);
  if (state.showNumber) {
    item.getTabbarItemsWidth(state.tabbarWidth, state.showNumber);
  } else if (state.children.length >= 5) {
    item.getTabbarItemsWidth(state.tabbarWidth, 5);
  } else {
    item.getTabbarItemsWidth(state.tabbarWidth, state.children.length);
  }
};
const initPage = ({
  vm,
  state
}) => () => {
  state.tabbarWidth = vm.$refs.tabbar && vm.$refs.tabbar.offsetWidth;
  state.children.forEach(item => {
    if (state.showNumber) {
      item.getTabbarItemsWidth(state.tabbarWidth, state.showNumber);
    } else if (state.children.length >= 5) {
      item.getTabbarItemsWidth(state.tabbarWidth, 5);
    } else {
      item.getTabbarItemsWidth(state.tabbarWidth, state.children.length);
    }
  });
};
const beforeDestroy = ({
  vm,
  api
}) => () => {
  off(window, "resize", api.initPage);
  vm.$off("updateItems");
  vm.$off("activeItem");
  vm.$off("showIndex");
};
export { beforeDestroy, getChildrens, getItems, initPage, onChange, setActiveItem };