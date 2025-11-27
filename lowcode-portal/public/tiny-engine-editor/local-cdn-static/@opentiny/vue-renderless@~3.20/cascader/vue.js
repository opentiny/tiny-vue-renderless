import { __spreadProps, __spreadValues } from "../chunk-G2ADBYYC.js";
import { getConfig, deleteTag, getCheckedNodes, updateStyle, handleSuggestionClick, handleDelete, handleSuggestionKeyDown, getSuggestions, handleExpandChange, computePresentText, focusFirstNode, handleClear, handleInput, handleBlur, handleFocus, handleKeyDown, handleDropdownLeave, toggleDropDownVisible, computePresentTags, selfMounted, watchCheckedValue, computClearVisible, computePresentContent, watchValue, setInputHeightToTag, presentTextHandler, handleBeforeUpdate, showPlaceholder, calcCollapseTags, watchInputHover, handleMouseenter, handleMouseleave } from './index.js';
import { removeResizeListener } from './../common/deps/resize-event.js';
import userPopper from './../common/deps/vue-popper.js';
import { DATEPICKER } from './../common/index.js';
const api = ["state", "getCheckedNodes", "computePresentText", "handleSuggestionClick", "handleSuggestionKeyDown", "handleExpandChange", "handleDropdownLeave", "handleDelete", "deleteTag", "handleClear", "handleInput", "handleBlur", "handleFocus", "toggleDropDownVisible", "handleKeyDown", "handleMouseenter", "handleMouseleave", "computePresentContent"];
const initState = ({
  reactive,
  props,
  computed,
  parent,
  api: api2,
  t,
  constants,
  vm,
  inject,
  designConfig
}) => {
  const state = reactive({
    showAutoWidth: inject("showAutoWidth", null),
    /** popper 元素是否显示。 它是通过v-show 绑定到页面上，造成隐藏时，popperJs并没有destory,有一定的性能影响 */
    dropDownVisible: false,
    checkedValue: props.modelValue || null,
    inputHover: false,
    inputValue: null,
    presentText: null,
    presentTags: [],
    checkedNodes: [],
    filtering: false,
    suggestions: [],
    inputInitialHeight: 0,
    pressDeleteCount: 0,
    realSize: computed(() => props.size),
    formDisabled: computed(() => (parent.tinyForm || {}).disabled),
    displayOnly: computed(() => props.displayOnly),
    disabled: computed(() => props.disabled || state.isDisplayOnly || state.formDisabled),
    tagSize: computed(() => ~["small", "mini"].indexOf(state.realSize) ? "mini" : "small"),
    isDisabled: computed(() => state.disabled),
    isDisplayOnly: computed(() => state.displayOnly || (parent.tinyForm || {}).displayOnly),
    config: computed(() => api2.getConfig()),
    multiple: computed(() => state.config.multiple),
    leafOnly: computed(() => !state.config.checkStrictly),
    readonly: computed(() => !props.filterable || state.multiple),
    clearBtnVisible: computed(() => api2.computClearVisible()),
    panel: computed(() => vm.$refs.panel),
    placeholder: computed(() => props.placeholder || t(constants.placeholder)),
    inputValues: computed(() => state.multiple ? state.presentText : state.inputValue),
    collapseTagsLength: 0,
    isHidden: false,
    tooltipVisible: false,
    tooltipContent: "",
    tagTypeWhenMultiple: (designConfig == null ? void 0 : designConfig.tagTypeWhenMultiple) || ""
  });
  return state;
};
const initApi = ({
  api: api2,
  state,
  constants,
  dispatch,
  emit,
  vm,
  props,
  updatePopper,
  nextTick,
  parent,
  t
}) => {
  Object.assign(api2, {
    state,
    handleFocus: handleFocus(emit),
    handleClear: handleClear(state),
    getCheckedNodes: getCheckedNodes(state),
    deleteTag: deleteTag({
      emit,
      state,
      api: api2
    }),
    handleDropdownLeave: handleDropdownLeave(state),
    focusFirstNode: focusFirstNode({
      vm,
      state
    }),
    computClearVisible: computClearVisible({
      props,
      state
    }),
    showPlaceholder: showPlaceholder({
      props,
      state,
      t,
      constants
    }),
    updateStyle: updateStyle({
      parent,
      vm,
      state,
      updatePopper,
      nextTick,
      props
    }),
    getSuggestions: getSuggestions({
      nextTick,
      props,
      state,
      updatePopper
    }),
    handleExpandChange: handleExpandChange({
      constants,
      emit,
      dispatch,
      nextTick,
      state,
      updatePopper
    }),
    getConfig: getConfig({
      parent,
      props
    }),
    setInputHeightToTag: setInputHeightToTag({
      nextTick,
      parent,
      state
    }),
    handleSuggestionClick: handleSuggestionClick({
      api: api2,
      state
    }),
    handleDelete: handleDelete({
      api: api2,
      state
    }),
    computePresentText: computePresentText({
      props,
      state
    }),
    handleSuggestionKeyDown: handleSuggestionKeyDown({
      api: api2
    }),
    handleInput: handleInput({
      api: api2,
      state,
      vm
    }),
    handleKeyDown: handleKeyDown({
      api: api2
    }),
    watchValue: watchValue({
      api: api2,
      state
    }),
    computePresentTags: computePresentTags({
      api: api2,
      props,
      state
    }),
    computePresentContent: computePresentContent({
      api: api2,
      state
    }),
    watchCheckedValue: watchCheckedValue({
      constants,
      dispatch,
      api: api2,
      nextTick,
      emit,
      state
    }),
    toggleDropDownVisible: toggleDropDownVisible({
      emit,
      vm,
      state,
      updatePopper
    }),
    selfMounted: selfMounted({
      api: api2,
      parent,
      props,
      vm,
      state
    }),
    handleBeforeUpdate: handleBeforeUpdate({
      props,
      api: api2,
      state
    }),
    handleBlur: handleBlur({
      emit,
      api: api2,
      props
    }),
    calcCollapseTags: calcCollapseTags({
      vm,
      state,
      nextTick
    }),
    watchInputHover: watchInputHover({
      vm
    }),
    handleMouseenter: handleMouseenter({
      vm,
      state
    }),
    handleMouseleave: handleMouseleave({
      state
    })
  });
};
const initWatch = ({
  watch,
  state,
  api: api2,
  props,
  nextTick,
  updatePopper
}) => {
  watch(() => state.disabled, api2.computePresentContent);
  watch(() => props.modelValue, api2.watchValue);
  watch(() => state.checkedValue, api2.watchCheckedValue);
  watch(() => props.options, () => nextTick(api2.computePresentContent), {
    deep: true,
    immediate: true
  });
  watch(() => state.presentText, value => presentTextHandler({
    state,
    value
  }));
  watch(() => state.presentTags, (value, oldvalue) => {
    state.multiple && (value.length || oldvalue.length) && nextTick(() => api2.updateStyle());
  });
  watch(() => state.filtering, () => nextTick(() => updatePopper()));
  watch(() => state.multiple, api2.setInputHeightToTag);
  watch(() => state.dropDownVisible, value => value && setTimeout(() => updatePopper()));
  watch(() => Array.isArray(state.checkedValue) && state.checkedValue.length, () => setTimeout(() => updatePopper()));
  watch([() => state.inputHover, () => state.dropDownVisible], api2.watchInputHover);
};
const renderless = (props, {
  computed,
  onMounted,
  onBeforeUnmount,
  onDeactivated,
  onUpdated,
  onBeforeUpdate,
  reactive,
  toRefs,
  watch,
  inject
}, {
  t,
  emit,
  nextTick,
  constants,
  parent,
  slots,
  dispatch,
  vm,
  designConfig
}) => {
  parent.tinyForm = parent.tinyForm || inject("form", null);
  const {
    updatePopper
  } = userPopper({
    reactive,
    watch,
    emit,
    props: __spreadProps(__spreadValues({}, props), {
      placement: DATEPICKER.PlacementMap.left,
      popperOptions: {
        boundariesPadding: 0,
        gpuAcceleration: false
      },
      visibleArrow: false,
      offset: 0,
      boundariesPadding: 5,
      arrowOffset: 35
    }),
    toRefs,
    vm,
    slots,
    nextTick,
    onBeforeUnmount,
    onDeactivated
  });
  const api2 = {};
  const state = initState({
    reactive,
    props,
    computed,
    parent,
    api: api2,
    t,
    constants,
    vm,
    inject,
    designConfig
  });
  initApi({
    api: api2,
    state,
    constants,
    dispatch,
    emit,
    vm,
    props,
    updatePopper,
    nextTick,
    parent,
    t
  });
  initWatch({
    watch,
    state,
    api: api2,
    props,
    nextTick,
    updatePopper
  });
  onBeforeUpdate(api2.handleBeforeUpdate);
  onUpdated(api2.updateStyle);
  onMounted(api2.selfMounted);
  parent.$on("handle-clear", event => {
    ;
    api2.handleClear(event);
  });
  onBeforeUnmount(() => removeResizeListener(parent.$el, api2.updateStyle));
  return api2;
};
export { api, renderless };