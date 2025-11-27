import { __spreadProps, __spreadValues } from "../chunk-G2ADBYYC.js";
import { px2percent, getComputedThresholdValue, getleftTopMin, getrightBottomMin, getAnotherOffset, handleMove, handleUp, handleMousedown, buttonMousedown, buttonLeftTopClick, buttonRightBottomClick, computeOffset } from './index.js';
import { on, off } from './../common/deps/dom.js';
const api = ["state", "handleMousedown", "buttonMousedown", "buttonLeftTopClick", "buttonRightBottomClick"];
const renderless = (props, hooks, {
  vm,
  nextTick,
  emit,
  constants,
  designConfig
}) => {
  var _a;
  const api2 = {};
  const {
    computed,
    reactive
  } = hooks;
  const getUseOffset = useOffset({
    nextTick,
    props,
    vm,
    constants,
    hooks
  });
  const state = reactive(__spreadValues({
    lastClickOffset: 50,
    lastmodelValue: 0.5,
    oldOffset: 0,
    initOffset: 0,
    isMoving: false,
    prefix: constants.PREFIX,
    computedleftTopMin: computed(() => api2.getComputedThresholdValue("leftTopMin")),
    computedrightBottomMin: computed(() => api2.getComputedThresholdValue("rightBottomMin")),
    wrapperClasses: computed(() => [`${state.prefix}-wrapper`, state.isMoving ? "no-select" : "", props.border ? "" : "no-border"]),
    paneClasses: computed(() => [`${state.prefix}-pane ${props.scrollable ? "tiny-split-scroll" : ""}`, {
      [`${state.prefix}-pane-moving`]: state.isMoving
    }]),
    triggerBarConWithLine: (_a = designConfig == null ? void 0 : designConfig.triggerBarConWithLine) != null ? _a : true
  }, getUseOffset.state));
  Object.assign(api2, __spreadProps(__spreadValues({
    state,
    getleftTopMin: getleftTopMin(state),
    getrightBottomMin: getrightBottomMin(state)
  }, getUseOffset.api), {
    handleUp: handleUp({
      api: api2,
      emit,
      off,
      state
    }),
    getAnotherOffset: getAnotherOffset({
      vm,
      state
    }),
    handleMove: handleMove({
      api: api2,
      emit,
      props,
      vm,
      state
    }),
    handleMousedown: handleMousedown({
      api: api2,
      emit,
      on,
      props,
      state,
      vm
    }),
    buttonMousedown: buttonMousedown(),
    buttonLeftTopClick: buttonLeftTopClick({
      emit,
      props,
      state
    }),
    buttonRightBottomClick: buttonRightBottomClick({
      emit,
      props,
      state
    }),
    getComputedThresholdValue: getComputedThresholdValue({
      api: api2,
      props,
      vm,
      state
    })
  }));
  return api2;
};
const useOffset = ({
  nextTick,
  props,
  vm,
  constants,
  hooks
}) => {
  const api2 = {};
  const {
    computed,
    onMounted,
    onUnmounted,
    reactive,
    toRefs,
    watch
  } = hooks;
  const state = reactive({
    offset: 0,
    anotherOffset: computed(() => 100 - state.offset),
    valueIsPx: computed(() => typeof props.modelValue === "string"),
    isHorizontal: computed(() => props.mode === constants.HORIZONTAL),
    offsetSize: computed(() => state.isHorizontal ? "offsetWidth" : "offsetHeight"),
    leftTopPane: 0,
    totalPane: 0
  });
  Object.assign(api2, {
    px2percent,
    computeOffset: computeOffset({
      api: api2,
      nextTick,
      props,
      vm,
      state
    }),
    getAnotherOffset: getAnotherOffset({
      vm,
      state
    })
  });
  watch(() => props.modelValue, api2.computeOffset, {
    immediate: true
  });
  onMounted(() => {
    on(window, "resize", api2.computeOffset);
  });
  onUnmounted(() => {
    off(window, "resize", api2.computeOffset);
  });
  return {
    api: api2,
    state: toRefs(state)
  };
};
export { api, renderless, useOffset };