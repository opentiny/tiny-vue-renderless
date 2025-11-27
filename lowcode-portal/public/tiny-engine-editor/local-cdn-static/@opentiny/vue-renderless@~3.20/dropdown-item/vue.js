import "../chunk-G2ADBYYC.js";
import { tagClick, confirm, clickOutside, getOptionStyle, reset, getTitle, bindScroll, toggle, onScroll, open, opened, close, closed, clickItem, clickWrapper, getItemStyle, handleClick, computedGetIcon, computedTip } from './index.js';
const api = ["state", "confirm", "clickOutside", "getOptionStyle", "reset", "tagClick", "clickItem", "clickWrapper", "toggle", "open", "opened", "close", "closed", "handleClick", "computedTip"];
const initState = ({
  reactive,
  computed,
  api: api2,
  props,
  parent,
  dropdownMenuVm,
  dropdownVm
}) => {
  const state = reactive({
    checkedStatus: dropdownMenuVm == null ? void 0 : dropdownMenuVm.checkedStatus,
    sort: props.modelValue,
    transition: true,
    getTitle: false,
    showWrapper: false,
    showPopup: false,
    duration: parent.duration,
    overlay: computed(() => parent.overlay),
    offset: computed(() => parent.state.offset),
    direction: computed(() => parent.direction),
    displayTitle: computed(() => api2.getTitle()),
    itemStyle: computed(() => api2.getItemStyle()),
    activeColor: computed(() => parent.activeColor),
    closeOnClickOverlay: computed(() => parent.closeOnClickOverlay),
    dropdownMenuVm,
    currentIndex: props.currentIndex,
    textField: (dropdownMenuVm == null ? void 0 : dropdownMenuVm.textField) || props.textField,
    popperClass: (dropdownMenuVm == null ? void 0 : dropdownMenuVm.popperClass) || "",
    sizeClass: (dropdownVm == null ? void 0 : dropdownVm.size) ? `tiny-dropdown-item--${dropdownVm == null ? void 0 : dropdownVm.size}` : "",
    getIcon: computed(() => api2.computedGetIcon()),
    children: [],
    computedTip: computed(() => api2.computedTip())
  });
  return state;
};
const initApi = ({
  api: api2,
  state,
  emit,
  props,
  parent,
  dispatch,
  vm,
  constants,
  designConfig
}) => {
  Object.assign(api2, {
    state,
    open: open(emit),
    opened: opened(emit),
    close: close(emit),
    getTitle: getTitle(props),
    onScroll: onScroll(parent),
    reset: reset({
      emit,
      props
    }),
    closed: closed({
      emit,
      state
    }),
    clickWrapper: clickWrapper(parent),
    clickOutside: clickOutside(parent),
    tagClick: tagClick({
      emit,
      props
    }),
    getOptionStyle: getOptionStyle(state),
    toggle: toggle({
      parent,
      props,
      state
    }),
    clickItem: clickItem({
      emit,
      props,
      state
    }),
    getItemStyle: getItemStyle({
      parent,
      state
    }),
    bindScroll: bindScroll({
      api: api2,
      parent
    }),
    confirm: confirm({
      emit,
      props,
      state
    }),
    handleClick: handleClick({
      state,
      props,
      dispatch,
      vm,
      emit
    }),
    computedGetIcon: computedGetIcon({
      constants,
      designConfig
    }),
    computedTip: computedTip({
      props,
      vm
    })
  });
};
const renderless = (props, {
  computed,
  onMounted,
  reactive,
  watch,
  inject
}, {
  parent,
  emit,
  vm,
  dispatch,
  constants,
  designConfig
}) => {
  const api2 = {};
  const dropdownMenuVm = inject("dropdownMenuVm", null);
  const dropdownVm = inject("dropdownVm", null);
  const state = initState({
    reactive,
    computed,
    api: api2,
    props,
    parent,
    dropdownMenuVm,
    dropdownVm
  });
  initApi({
    api: api2,
    state,
    emit,
    props,
    parent,
    dispatch,
    vm,
    constants,
    designConfig
  });
  watch(() => state.showPopup, api2.bindScroll);
  onMounted(() => {
    const realParent = parent.$parent.$parent || {};
    if (realParent.state && realParent.state.children) {
      realParent.state.children.push(vm);
    } else {
      if (dropdownMenuVm) {
        dropdownMenuVm.state.children = [...dropdownMenuVm.state.children, vm];
      }
    }
    if (props.disabled) {
      state.checkedStatus = false;
    }
  });
  return api2;
};
export { api, renderless };