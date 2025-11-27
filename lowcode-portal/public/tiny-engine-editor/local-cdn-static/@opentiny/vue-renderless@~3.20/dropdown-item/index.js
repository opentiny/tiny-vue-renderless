import "../chunk-G2ADBYYC.js";
import { on, off } from './../common/deps/dom.js';
const getTitle = props => () => {
  if (props.title) {
    return props.title;
  }
  const match = props.options.filter(option => option.value === props.modelValue);
  return match.length ? match[0].text : "";
};
const bindScroll = ({
  api,
  parent
}) => value => {
  const action = value ? on : off;
  action(parent.state.scroller, "scroll", api.onScroll, true);
};
const toggle = ({
  parent,
  props,
  state
}) => show => {
  if (show === state.showPopup) {
    return;
  }
  state.transition = !props.options.immediate;
  state.showPopup = show;
  if (show) {
    parent.updateOffset();
    state.showWrapper = true;
  }
};
const onScroll = parent => () => parent.updateOffset();
const clickWrapper = parent => event => parent.$el && event.stopPropagation();
const clickItem = ({
  emit,
  props,
  state
}) => value => {
  state.showPopup = false;
  if (value !== props.modelValue) {
    emit("update:modelValue", value);
    emit("change", value);
  }
};
const getItemStyle = ({
  parent,
  state
}) => () => ({
  zIndex: parent.zIndex,
  top: parent.direction === "down" ? state.offset + "px" : "",
  bottom: parent.direction !== "down" ? state.offset + "px" : ""
});
const getOptionStyle = state => (tag, tags) => {
  if (tags.includes(tag.value)) {
    return {
      color: state.activeColor ? state.activeColor : "#f36f64",
      border: `1px solid ${state.activeColor ? state.activeColor : "#f36f64"}`
    };
  } else {
    return {
      color: "#333"
    };
  }
};
const closed = ({
  emit,
  state
}) => () => {
  state.showWrapper = false;
  emit("closed");
};
const open = emit => () => emit("open");
const opened = emit => () => emit("opened");
const close = emit => () => emit("close");
const tagClick = ({
  emit,
  props
}) => (key, tag, event) => {
  event.preventDefault();
  event.stopPropagation();
  const filterValue = props.modelValue.slice();
  const value = filterValue[key];
  const index = value.indexOf(tag.value);
  if (index === -1) {
    value.push(tag.value);
  } else {
    value.splice(index, 1);
  }
  filterValue[key] = value;
  emit("update:modelValue", filterValue);
};
const confirm = ({
  emit,
  props,
  state
}) => () => {
  state.showPopup = false;
  emit("confirm", props.modelValue);
};
const reset = ({
  emit,
  props
}) => () => {
  const len = props.modelValue.length;
  const array = [];
  for (let i = 0; i < len; i++) {
    array.push([]);
  }
  emit("update:modelValue", array);
  emit("reset", array);
};
const clickOutside = parent => () => {
  if (parent.closeOnClickOutside && parent.closeOnClickOverlay) {
    parent.state.children.forEach(item => {
      item.toggle(false);
    });
  }
};
const handleClick = ({
  state,
  props,
  dispatch,
  vm,
  emit
}) => event => {
  event.stopPropagation();
  state.currentIndex = `${props.currentIndex}`;
  const data = {
    itemData: props.itemData,
    vm,
    disabled: props.disabled
  };
  if (!props.disabled) {
    emit("item-click", data);
  }
  dispatch("TinyDropdown", "menu-item-click", data);
  dispatch("TinyDropdown", "is-disabled", [props.disabled]);
  dispatch("TinyDropdown", "selected-index", [state.currentIndex]);
};
const computedGetIcon = ({
  constants,
  designConfig
}) => (name = "leftWardArrow") => {
  return (designConfig == null ? void 0 : designConfig.icons[name]) || (constants == null ? void 0 : constants.ICON_MAP[name]);
};
const computedTip = ({
  props,
  vm
}) => () => {
  if (props.tip && typeof props.tip === "function") {
    return props.tip({
      itemData: props.itemData,
      vm
    });
  }
  return props.tip || "";
};
export { bindScroll, clickItem, clickOutside, clickWrapper, close, closed, computedGetIcon, computedTip, confirm, getItemStyle, getOptionStyle, getTitle, handleClick, onScroll, open, opened, reset, tagClick, toggle };