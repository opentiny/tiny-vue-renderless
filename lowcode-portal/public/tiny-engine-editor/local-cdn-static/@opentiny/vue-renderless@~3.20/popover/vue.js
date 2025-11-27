import "../chunk-G2ADBYYC.js";
import { mounted, computedTooltipId, destroyed, doToggle, doShow, doClose, handleFocus, handleClick, handleBlur, handleKeydown, handleAfterEnter, handleAfterLeave, handleMouseEnter, handleMouseLeave, handleDocumentClick, cleanup, wrapMounted, handleItemClick, observeCallback } from './index.js';
import userPopper from './../common/deps/vue-popper.js';
const api = ["state", "handleAfterEnter", "handleAfterLeave", "doToggle", "doShow", "doClose", "doDestroy", "handleItemClick", "handleDocumentClick"];
const initState = ({
  reactive,
  computed,
  api: api2,
  popperElm,
  showPopper,
  referenceElm
}) => {
  const state = reactive({
    popperElm,
    referenceElm,
    /** popper 元素是否显示。 它是通过v-show 绑定到页面上，造成隐藏时，popperJs并没有destory,有一定的性能影响 */
    showPopper,
    timer: 0,
    mounted: false,
    xPlacement: "bottom",
    tooltipId: computed(() => api2.computedTooltipId()),
    webCompEventTarget: null
  });
  return state;
};
const initApi = ({
  api: api2,
  props,
  state,
  emit,
  doDestroy,
  constants,
  nextTick,
  vm,
  mode
}) => {
  Object.assign(api2, {
    state,
    mounted: mounted({
      api: api2,
      state,
      constants,
      props,
      nextTick,
      mode
    }),
    cleanup: cleanup({
      state,
      props
    }),
    destroyed: destroyed({
      state,
      api: api2
    }),
    doDestroy,
    computedTooltipId: computedTooltipId(constants),
    doShow: doShow(state),
    doClose: doClose(state),
    doToggle: doToggle(state),
    handleClick: handleClick(state),
    handleAfterEnter: handleAfterEnter(emit),
    handleBlur: handleBlur({
      props,
      state
    }),
    handleFocus: handleFocus({
      props,
      state
    }),
    handleKeydown: handleKeydown({
      api: api2,
      props
    }),
    handleMouseLeave: handleMouseLeave({
      props,
      state
    }),
    handleAfterLeave: handleAfterLeave(emit),
    handleMouseEnter: handleMouseEnter({
      props,
      state
    }),
    handleDocumentClick: handleDocumentClick({
      vm,
      state
    }),
    wrapMounted: wrapMounted({
      api: api2,
      props,
      vm,
      state
    }),
    handleItemClick: handleItemClick({
      emit,
      state
    }),
    observeCallback: observeCallback({
      vm,
      state
    })
  });
};
const initWatch = ({
  watch,
  props,
  state,
  emit,
  api: api2,
  nextTick,
  updatePopper,
  mode
}) => {
  watch(() => state.showPopper, val => {
    if (props.disabled) {
      return;
    }
    if (val) {
      nextTick(() => updatePopper());
    }
    val ? emit("show") : emit("hide");
  });
  watch(() => props.reference, (val, oldVal) => {
    if (val !== oldVal) {
      api2.destroyed();
      nextTick(() => {
        api2.wrapMounted();
      });
    }
  });
  watch(() => props.modelValue, val => {
    if (props.trigger === "manual") {
      state.showPopper = val;
      emit("update:modelValue", val);
    }
  });
};
const renderless = (props, {
  reactive,
  computed,
  watch,
  toRefs,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  onActivated,
  onDeactivated
}, {
  $prefix,
  emit,
  vm,
  slots,
  nextTick,
  mode
}) => {
  const api2 = {};
  const constants = {
    IDPREFIX: `${$prefix.toLowerCase()}-popover`
  };
  const options = {
    emit,
    onBeforeUnmount,
    nextTick,
    reactive,
    props,
    watch,
    onDeactivated,
    vm,
    slots,
    toRefs
  };
  const {
    showPopper,
    popperElm,
    referenceElm,
    doDestroy,
    updatePopper
  } = userPopper(options);
  const state = initState({
    reactive,
    computed,
    api: api2,
    popperElm,
    showPopper,
    referenceElm
  });
  initApi({
    api: api2,
    constants,
    props,
    state,
    emit,
    doDestroy,
    nextTick,
    vm,
    mode
  });
  onDeactivated(() => {
    api2.destroyed();
    api2.cleanup();
  });
  onMounted(() => {
    api2.wrapMounted();
    if (props.genArrowByHtml) {
      const config = {
        attributes: true,
        childList: false,
        subtree: false
      };
      api2.observer = new MutationObserver(api2.observeCallback);
      api2.observer.observe(vm.$refs.popper, config);
    }
  });
  onActivated(api2.mounted);
  onUnmounted(() => {
    api2.destroyed();
    api2.observer && api2.observer.disconnect();
  });
  onBeforeUnmount(api2.cleanup);
  initWatch({
    watch,
    props,
    state,
    emit,
    api: api2,
    nextTick,
    updatePopper,
    mode
  });
  return api2;
};
export { api, renderless };