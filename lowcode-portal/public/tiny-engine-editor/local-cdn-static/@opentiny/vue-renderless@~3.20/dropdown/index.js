import "../chunk-G2ADBYYC.js";
import { KEY_CODE } from './../common/index.js';
import { addClass, removeClass, on, off } from './../common/deps/dom.js';
const watchVisible = ({
  broadcast,
  emit,
  nextTick
}) => value => {
  broadcast("TinyDropdownMenu", "visible", value);
  nextTick(() => emit("visible-change", value));
};
const watchFocusing = parent => value => {
  const selfDefine = parent.$el.querySelector(".tiny-dropdown-selfdefine");
  if (selfDefine) {
    value ? addClass(selfDefine, "focusing") : removeClass(selfDefine, "focusing");
  }
};
const show = ({
  props,
  state
}) => () => {
  if (props.disabled) {
    return;
  }
  clearTimeout(Number(state.timeout));
  state.timeout = setTimeout(() => {
    state.visible = true;
  }, state.trigger === "click" ? 0 : props.showTimeout);
};
const hide = ({
  api,
  props,
  state
}) => () => {
  if (props.disabled) {
    return;
  }
  api.removeTabindex();
  if (props.tabindex >= 0 && state.triggerElm) {
    api.resetTabindex(state.triggerElm);
  }
  clearTimeout(Number(state.timeout));
  state.timeout = setTimeout(() => {
    state.visible = false;
  }, state.trigger === "click" ? 0 : props.hideTimeout);
};
const handleClick = ({
  api,
  props,
  state,
  emit
}) => () => {
  if (props.disabled) {
    return;
  }
  emit("handle-click", state.visible);
  state.visible ? api.hide() : api.show();
};
const handleTriggerKeyDown = ({
  api,
  state
}) => event => {
  const keyCode = event.keyCode;
  if (~[KEY_CODE.ArrowUp, KEY_CODE.ArrowDown].indexOf(keyCode)) {
    api.removeTabindex();
    if (state.menuItems) {
      api.resetTabindex(state.menuItems[0]);
      state.menuItems[0].focus();
    }
    event.preventDefault();
    event.stopPropagation();
  } else if (keyCode === KEY_CODE.Enter) {
    api.handleClick();
  } else if (~[KEY_CODE.Tab, KEY_CODE.Escape].indexOf(keyCode)) {
    api.hide();
  }
};
const handleItemKeyDown = ({
  api,
  props,
  state
}) => event => {
  const keyCode = event.keyCode;
  const target = event.target;
  const currentIndex = state.menuItemsArray.indexOf(target);
  const max = state.menuItemsArray.length - 1;
  let nextIndex;
  if (~[KEY_CODE.ArrowUp, KEY_CODE.ArrowDown].indexOf(keyCode)) {
    if (keyCode === KEY_CODE.ArrowUp) {
      nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0;
    } else {
      nextIndex = currentIndex < max ? currentIndex + 1 : max;
    }
    api.removeTabindex();
    if (state.menuItems) {
      api.resetTabindex(state.menuItems[nextIndex]);
      state.menuItems[nextIndex].focus();
    }
    event.preventDefault();
    event.stopPropagation();
  } else if (keyCode === KEY_CODE.Enter) {
    api.triggerElmFocus();
    target == null ? void 0 : target.click();
    if (props.hideOnClick) {
      state.visible = false;
    }
  } else if (~[KEY_CODE.Tab, KEY_CODE.Escape].indexOf(keyCode)) {
    api.hide();
    api.triggerElmFocus();
  }
};
const resetTabindex = api => el => {
  api.removeTabindex();
  el.setAttribute("tabindex", "0");
};
const removeTabindex = state => () => {
  var _a, _b;
  (_a = state.triggerElm) == null ? void 0 : _a.setAttribute("tabindex", "-1");
  (_b = state.menuItemsArray) == null ? void 0 : _b.forEach(item => {
    item.setAttribute("tabindex", "-1");
  });
};
const initAria = ({
  state,
  props
}) => () => {
  var _a, _b, _c, _d, _e;
  (_a = state.dropdownElm) == null ? void 0 : _a.setAttribute("id", state.listId);
  (_b = state.triggerElm) == null ? void 0 : _b.setAttribute("aria-haspopup", "list");
  (_c = state.triggerElm) == null ? void 0 : _c.setAttribute("aria-controls", state.listId);
  if (!props.splitButton || !props.singleButton) {
    (_d = state.triggerElm) == null ? void 0 : _d.setAttribute("role", "button");
    (_e = state.triggerElm) == null ? void 0 : _e.setAttribute("tabindex", String(props.tabindex));
    addClass(state.triggerElm, "tiny-dropdown-selfdefine");
  }
};
const toggleFocus = ({
  state,
  value
}) => () => {
  state.focusing = value;
};
const initEvent = ({
  api,
  props,
  state,
  vm,
  mode
}) => () => {
  var _a;
  let buttonValue = props.splitButton || props.singleButton;
  state.triggerElm = buttonValue ? vm.$refs.trigger.$el : props.border ? vm.$refs.trigger.$el : vm.$refs.trigger;
  on(state.triggerElm, "keydown", api.handleTriggerKeyDown);
  (_a = state.dropdownElm) == null ? void 0 : _a.addEventListener("keydown", api.handleItemKeyDown, true);
  if (!props.splitButton || !props.singleButton) {
    on(state.triggerElm, "focus", toggleFocus({
      state,
      value: true
    }));
    on(state.triggerElm, "blur", toggleFocus({
      state,
      value: false
    }));
    on(state.triggerElm, "click", toggleFocus({
      state,
      value: false
    }));
  }
  if (state.trigger === "hover") {
    on(state.triggerElm, "mouseenter", api.show);
    on(state.triggerElm, "mouseleave", api.hide);
    on(state.dropdownElm, "mouseenter", api.show);
    on(state.dropdownElm, "mouseleave", api.hide);
  } else if (state.trigger === "click") {
    on(state.triggerElm, "click", api.handleClick);
  }
  if (mode === "mobile-first") {
    if (props.splitButton || props.singleButton) {
      on(state.triggerElm, "click", api.handleClick);
    }
  }
};
const handleMenuItemClick = ({
  props,
  state,
  emit
}) => ({
  itemData,
  vm,
  disabled
}) => {
  if (props.hideOnClick && !disabled) {
    state.visible = false;
  }
  if (!disabled) {
    const data = {
      itemData,
      vm
    };
    emit("item-click", data);
  }
};
const triggerElmFocus = state => () => {
  var _a;
  ((_a = state.triggerElm) == null ? void 0 : _a.focus) && state.triggerElm.focus();
};
const initDomOperation = ({
  api,
  state,
  vm
}) => () => {
  var _a;
  state.dropdownElm = vm.popperElm;
  state.menuItems = (_a = state.dropdownElm) == null ? void 0 : _a.querySelectorAll('[tabindex="-1"]');
  state.menuItemsArray = [].slice.call(state.menuItems);
  api.initEvent();
  api.initAria();
};
const handleMainButtonClick = ({
  api,
  emit
}) => event => {
  emit("button-click", event);
  api.hide();
};
const mounted = ({
  api,
  vm,
  state,
  broadcast
}) => () => {
  if (state.showSelfIcon) {
    state.showIcon = false;
  }
  vm.$on("menu-item-click", api.handleMenuItemClick);
  vm.$on("current-item-click", api.handleMenuItemClick);
  vm.$on("selected-index", selectedIndex => {
    broadcast("TinyDropdownMenu", "menu-selected-index", selectedIndex);
  });
  vm.$on("is-disabled", api.clickOutside);
};
const beforeDistory = ({
  vm,
  api,
  state
}) => () => {
  if (state.triggerElm) {
    off(state.triggerElm, "keydown", api.handleTriggerKeyDown);
    off(state.triggerElm, "focus", toggleFocus({
      state,
      value: true
    }));
    off(state.triggerElm, "blur", toggleFocus({
      state,
      value: false
    }));
    off(state.triggerElm, "click", toggleFocus({
      state,
      value: false
    }));
    off(state.triggerElm, "mouseenter", api.show);
    off(state.triggerElm, "mouseleave", api.hide);
    off(state.triggerElm, "click", api.handleClick);
    state.triggerElm = null;
  }
  if (state.dropdownElm) {
    state.dropdownElm.removeEventListener("keydown", api.handleItemKeyDown, true);
    off(state.dropdownElm, "mouseenter", api.show);
    off(state.dropdownElm, "mouseleave", api.hide);
    state.dropdownElm = null;
  }
  vm.$off("menu-item-click");
  vm.$off("current-item-click");
  vm.$off("selected-index");
  vm.$off("is-disabled");
};
const clickOutside = ({
  props,
  api
}) => disabled => {
  if (props.hideOnClick) {
    disabled ? api.show() : api.hide();
  }
};
export { beforeDistory, clickOutside, handleClick, handleItemKeyDown, handleMainButtonClick, handleMenuItemClick, handleTriggerKeyDown, hide, initAria, initDomOperation, initEvent, mounted, removeTabindex, resetTabindex, show, triggerElmFocus, watchFocusing, watchVisible };