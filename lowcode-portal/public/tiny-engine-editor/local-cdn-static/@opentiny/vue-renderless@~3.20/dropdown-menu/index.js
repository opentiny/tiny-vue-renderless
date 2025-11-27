import { __spreadValues } from "../chunk-G2ADBYYC.js";
import userPopper from './../common/deps/vue-popper.js';
const toggleItem = state => (active, item) => {
  if (item.disabled) {
    return;
  }
  if (item.type === "sort") {
    if (!item.modelValue || item.modelValue === "desc") {
      item.state.sort = "asc";
      item.$emit("update:modelValue", "asc");
      item.$emit("click", "asc");
    } else {
      item.state.sort = "desc";
      item.$emit("update:modelValue", "desc");
      item.$emit("click", "desc");
    }
  } else {
    const singleton = state.children.length === 1 && item.state.showPopup;
    state.children.forEach((item2, index) => {
      if (index === active && !singleton) {
        item2.toggle(true);
      } else if (item2.state.showPopup) {
        item2.toggle(false, {
          immediate: true
        });
      }
    });
  }
};
const updateOffset = ({
  props,
  state,
  vm
}) => () => {
  if (!vm.$refs.menu) {
    return;
  }
  const rect = vm.$refs.menu.getBoundingClientRect();
  if (props.direction === "down") {
    state.offset = rect.bottom;
  } else {
    state.offset = window.innerHeight - rect.top;
  }
};
const clickOutside = ({
  props,
  state
}) => () => {
  if (props.closeOnClickOutside && props.closeOnClickOverlay) {
    state.children.forEach(item => {
      item.type !== "filter" && item.toggle(false);
    });
  }
};
const getScroller = (el, root) => {
  const overflowScrollReg = /scroll|auto/i;
  let node = el;
  let getComputedStyle = window.getComputedStyle;
  while (node && node.tagName !== "HTML" && node.nodeType === 1 && node !== root) {
    const {
      overflowY
    } = getComputedStyle(node);
    if (overflowScrollReg.test(overflowY)) {
      if (node.tagName !== "BODY") {
        return node;
      }
      const {
        overflowY: htmlOverflowY
      } = getComputedStyle(node.parentNode);
      if (overflowScrollReg.test(htmlOverflowY)) {
        return node;
      }
    }
    node = node.parentNode;
  }
  return root || null;
};
const useVuePopper = ({
  api,
  props,
  hooks,
  instance,
  state,
  dropdownVm,
  designConfig
}) => {
  var _a, _b;
  const {
    nextTick,
    onBeforeUnmount,
    onDeactivated,
    onMounted,
    reactive,
    toRefs,
    watch
  } = hooks;
  const {
    emit,
    slots,
    vm,
    parent
  } = instance;
  const designProps = {
    placement: props.placement || ((_a = designConfig == null ? void 0 : designConfig.props) == null ? void 0 : _a.placement) || "bottom-end",
    visibleArrow: props.visibleArrow || ((_b = designConfig == null ? void 0 : designConfig.props) == null ? void 0 : _b.visibleArrow) || false
  };
  const popper = userPopper({
    emit,
    nextTick,
    onBeforeUnmount,
    onDeactivated,
    props: __spreadValues(__spreadValues({
      popperOptions: {
        boundariesPadding: 0,
        gpuAcceleration: false
      },
      offset: 0,
      boundariesPadding: 5
    }, props), designProps),
    reactive,
    vm,
    slots,
    toRefs,
    watch
  });
  onMounted(() => {
    if (!dropdownVm) return;
    if (popper.popperElm) {
      dropdownVm.popperElm = popper.popperElm.value = vm.$el;
      nextTick(() => {
        if (popper.referenceElm) {
          popper.referenceElm.value = dropdownVm.$el;
        }
      });
      !props.multiStage && dropdownVm.initDomOperation();
    }
    if (dropdownVm.inheritWidth && popper.popperElm) {
      dropdownVm.popperElm.style.minWidth = dropdownVm.$el.clientWidth + "px";
    }
  });
  onBeforeUnmount(() => {
    popper.destroyPopper("remove");
    popper.popperElm = null;
    popper.referenceElm = null;
  });
  api.doDestroy = popper.doDestroy;
  state.size = (dropdownVm == null ? void 0 : dropdownVm.size) || "";
  state.showPopper = popper.showPopper.value;
  parent.$on("updatePopper", () => {
    if (state.showPopper) {
      popper.updatePopper();
    }
  });
  parent.$on("visible", value => {
    state.showPopper = value;
    popper.showPopper.value = value;
    if (state.showPopper) {
      state.initShowPopper = true;
    }
  });
  watch(() => props.placement, value => {
    popper.currentPlacement.value = value;
  });
};
const mounted = ({
  api,
  parent,
  state
}) => () => {
  parent.$on("menu-selected-index", selectedIndex => {
    state.selectedIndex = selectedIndex;
  });
  parent.$on("menu-item-click", api.handleMenuItemClick);
  parent.$on("mouseenter-tips", (showContent, label) => {
    state.label = label;
    state.showContent = showContent;
  });
  parent.$on("mouseleave-tips", (showContent, label) => {
    state.label = label;
    state.showContent = showContent;
  });
};
const handleMenuItemClick = ({
  state,
  dispatch
}) => ({
  itemData,
  vm,
  label,
  showContent,
  disabled
}) => {
  state.label = label;
  state.showContent = showContent;
  const data = {
    itemData,
    vm,
    disabled
  };
  dispatch("TinyDropdown", "current-item-click", data);
};
const handleMouseenter = emit => $event => {
  emit("mouseenter", $event);
};
const handleMouseleave = emit => $event => {
  emit("mouseleave", $event);
};
export { clickOutside, getScroller, handleMenuItemClick, handleMouseenter, handleMouseleave, mounted, toggleItem, updateOffset, useVuePopper };