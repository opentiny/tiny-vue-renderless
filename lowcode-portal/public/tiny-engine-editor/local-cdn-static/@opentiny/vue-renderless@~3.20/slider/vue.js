import "../chunk-G2ADBYYC.js";
import { bindKeyDown, bindMouseDown, bindMouseMove, bindMouseUp, bindEvent, unBindEvent, bindResize, setTipStyle, getActiveButtonIndex, setActiveButtonValue, setBarStyle, setButtonStyle, initSlider, calculateValue, changeActiveValue, formatTipValue, getActiveButtonValue, displayTip, hideTip, autoSlider, customBeforeAppearHook, customAppearHook, customAfterAppearHook, watchActiveValue, watchModelValue, getPoints, getLabels, inputValueChange, inputOnChange, handleSlotInputFocus, handleSlotInputBlur, handleSlotInput, getMarkList, updateSlotValue } from './index.js';
const api = ["state", "bindKeyDown", "bindMouseDown", "bindMouseMove", "bindMouseUp", "bindEvent", "unBindEvent", "bindResize", "setTipStyle", "getActiveButtonIndex", "setActiveButtonValue", "setBarStyle", "setButtonStyle", "initSlider", "calculateValue", "changeActiveValue", "formatTipValue", "getActiveButtonValue", "displayTip", "hideTip", "autoSlider", "customBeforeAppearHook", "customAppearHook", "customAfterAppearHook", "inputValueChange", "inputOnChange", "handleSlotInputFocus", "handleSlotInputBlur", "handleSlotInput"];
const initState = ({
  reactive,
  computed,
  props,
  api: api2,
  parent,
  inject
}) => {
  const state = reactive({
    showAutoWidth: inject("showAutoWidth", null),
    tipStyle: {},
    barStyle: {},
    moveStyle: [],
    points: [],
    labels: [],
    markList: computed(() => api2.getMarkList()),
    inputValue: [0, 0],
    isDrag: false,
    sliderSize: 0,
    showTip: false,
    activeValue: 0,
    activeIndex: 0,
    isDouble: false,
    leftBtnValue: 0,
    sliderOffset: {},
    rightBtnValue: 0,
    leftBtnStyle: {},
    leftBtnPercent: 0,
    leftBtnShow: true,
    rightBtnStyle: "",
    rightBtnPercent: 0,
    rightBtnShow: false,
    innerTrigger: false,
    changeCompat: computed(() => props.changeCompat),
    rangeDiff: computed(() => props.max - props.min),
    tipValue: computed(() => api2.formatTipValue(state.activeValue)),
    formDisabled: computed(() => (parent.tinyForm || {}).disabled),
    disabled: computed(() => props.disabled || state.formDisabled),
    slotValue: "",
    isSlotTyping: false,
    mouseOuterBtn: false
  });
  return state;
};
const renderless = (props, {
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
  watch,
  inject
}, {
  vm,
  parent,
  constants,
  nextTick,
  emit,
  mode
}) => {
  const api2 = {};
  const state = initState({
    reactive,
    computed,
    props,
    api: api2,
    parent,
    inject
  });
  parent.tinyForm = parent.tinyForm || inject("form", null);
  Object.assign(api2, {
    state,
    hideTip: hideTip(state),
    formatTipValue: formatTipValue(props),
    setBarStyle: setBarStyle({
      props,
      state
    }),
    changeActiveValue: changeActiveValue(state),
    bindResize: bindResize({
      vm,
      props,
      state
    }),
    setButtonStyle: setButtonStyle({
      props,
      state
    }),
    calculateValue: calculateValue({
      vm,
      props,
      state
    }),
    getActiveButtonValue: getActiveButtonValue(state),
    getActiveButtonIndex: getActiveButtonIndex({
      constants,
      mode,
      state
    }),
    setTipStyle: setTipStyle({
      vm,
      constants,
      mode,
      props,
      state
    }),
    customAfterAppearHook: customAfterAppearHook({
      state,
      props
    }),
    customBeforeAppearHook: customBeforeAppearHook(props),
    customAppearHook: customAppearHook(),
    bindEvent: bindEvent(api2),
    autoSlider: autoSlider(api2),
    unBindEvent: unBindEvent(api2),
    displayTip: displayTip({
      api: api2,
      nextTick,
      state
    }),
    bindKeyDown: bindKeyDown({
      api: api2,
      props,
      state
    }),
    bindMouseUp: bindMouseUp({
      api: api2,
      emit,
      state,
      props
    }),
    bindMouseMove: bindMouseMove({
      api: api2,
      nextTick,
      state
    }),
    bindMouseDown: bindMouseDown({
      api: api2,
      constants,
      mode,
      emit,
      state,
      props
    }),
    setActiveButtonValue: setActiveButtonValue({
      api: api2,
      emit,
      props,
      state
    }),
    initSlider: initSlider({
      api: api2,
      props,
      state
    }),
    watchModelValue: watchModelValue({
      api: api2,
      state
    }),
    watchActiveValue: watchActiveValue({
      api: api2,
      emit,
      props,
      state
    }),
    getPoints: getPoints({
      props,
      state
    }),
    getLabels: getLabels({
      props,
      state
    }),
    inputValueChange: inputValueChange({
      props,
      api: api2,
      state,
      emit
    }),
    handleSlotInputFocus: handleSlotInputFocus(state),
    handleSlotInputBlur: handleSlotInputBlur({
      state,
      api: api2
    }),
    handleSlotInput: handleSlotInput({
      state,
      api: api2
    }),
    getMarkList: getMarkList({
      props
    }),
    updateSlotValue: updateSlotValue({
      state
    }),
    inputOnChange: inputOnChange({
      api: api2,
      emit,
      props,
      state
    })
  });
  watch(() => props.modelValue, value => {
    if (props.max < props.min) {
      throw new Error("Slider min should not be greater than max.");
    }
    api2.watchModelValue(value);
  }, {
    immediate: true
  });
  props.changeCompat && watch(() => state.activeValue, api2.watchActiveValue, {
    immediate: true
  });
  watch(() => state.activeValue, api2.watchActiveValue, {
    immediate: true
  });
  watch(() => props.min, min => {
    const value = Math.max(props.modelValue, min);
    api2.initSlider(value);
    api2.setActiveButtonValue(value);
  });
  watch(() => props.max, max => {
    const value = Math.min(props.modelValue, max);
    api2.initSlider(Math.min(props.modelValue, max));
    api2.setActiveButtonValue(value);
  });
  watch(() => state.leftBtnValue, newVal => {
    state.inputValue[0] = newVal;
  }, {
    immediate: true
  });
  watch(() => state.rightBtnValue, newVal => {
    state.inputValue[1] = newVal;
  }, {
    immediate: true
  });
  onMounted(() => {
    api2.bindEvent();
    api2.getPoints();
    api2.getLabels();
  });
  onBeforeUnmount(api2.unBindEvent);
  return api2;
};
export { api, renderless };