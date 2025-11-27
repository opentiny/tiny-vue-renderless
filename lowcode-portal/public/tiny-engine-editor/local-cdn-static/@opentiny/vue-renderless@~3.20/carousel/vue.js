import "../chunk-G2ADBYYC.js";
import { onComplete, handleMouseEnter, handleMouseLeave, itemInStage, handleButtonEnter, handleButtonLeave, resetItemPosition, playSlides, pauseTimer, startTimer, setActiveItem, prev, next, handleIndicatorClick, handleIndicatorHover, watchItems, watchActiveIndex, watchAutoplay, throttledArrowClick, throttledIndicatorHover, computedHasLabel, touchstart, touchmove, touchend, computedStyle, simulateTouch, computedHasButtons, computedHasIndicators, canActive } from './index.js';
import { addResizeListener, removeResizeListener } from './../common/deps/resize-event.js';
const api = ["state", "items", "activeIndex", "containerWidth", "hover", "hasLabel", "onComplete", "handleMouseEnter", "handleMouseLeave", "itemInStage", "handleButtonEnter", "handleButtonLeave", "updateItems", "resetItemPosition", "playSlides", "pauseTimer", "startTimer", "setActiveItem", "prev", "next", "handleIndicatorClick", "handleIndicatorHover", "throttledArrowClick", "throttledIndicatorHover", "touchstart", "touchmove", "touchend"];
const initState = ({
  reactive,
  computed,
  api: api2
}) => {
  const state = reactive({
    itemsTranslate: [],
    items: [],
    timer: null,
    hover: false,
    activeIndex: -1,
    completed: false,
    delta: 0,
    containerWidth: 0,
    deltaPos: {
      X: 0,
      Y: 0
    },
    startPos: {
      X: 0,
      Y: 0
    },
    offsetPos: {
      X: 0,
      Y: 0
    },
    touchTime: 0,
    size: 0,
    direction: "",
    moving: false,
    isCorrectDirection: false,
    moveDisable: false,
    noTouchNode: ["svg", "BUTTON", "path", "g"],
    style: computed(() => api2.computedStyle()),
    hasLabel: computed(() => api2.computedHasLabel(state.items)),
    hasButtons: computed(() => api2.computedHasButtons()),
    hasIndicators: computed(() => api2.computedHasIndicators())
  });
  return state;
};
const initApi = ({
  vm,
  api: api2,
  state,
  props,
  emit,
  mode
}) => {
  Object.assign(api2, {
    state,
    computedHasLabel,
    touchend: touchend({
      props,
      state,
      api: api2
    }),
    touchstart: touchstart({
      props,
      state,
      api: api2
    }),
    touchmove: touchmove({
      props,
      state,
      vm
    }),
    playSlides: playSlides({
      api: api2,
      props,
      state
    }),
    onComplete: onComplete({
      api: api2,
      count: 0,
      emit,
      props,
      state
    }),
    pauseTimer: pauseTimer(state),
    itemInStage: itemInStage(state),
    resetItemPosition: resetItemPosition(state),
    watchItems: watchItems({
      api: api2,
      props
    }),
    handleButtonLeave: handleButtonLeave(state),
    handleIndicatorClick: handleIndicatorClick({
      api: api2,
      state
    }),
    handleIndicatorHover: handleIndicatorHover({
      api: api2,
      props,
      state
    }),
    watchActiveIndex: watchActiveIndex({
      api: api2,
      emit
    }),
    watchAutoplay: watchAutoplay(api2),
    startTimer: startTimer({
      api: api2,
      props,
      state
    }),
    prev: prev({
      api: api2,
      state
    }),
    next: next({
      api: api2,
      state
    }),
    throttledArrowClick: throttledArrowClick(api2),
    setActiveItem: setActiveItem({
      api: api2,
      props,
      state
    }),
    handleMouseEnter: handleMouseEnter({
      api: api2,
      state
    }),
    handleMouseLeave: handleMouseLeave({
      api: api2,
      state
    }),
    throttledIndicatorHover: throttledIndicatorHover(api2),
    handleButtonEnter: handleButtonEnter({
      api: api2,
      state
    }),
    computedStyle: computedStyle({
      props
    }),
    simulateTouch: simulateTouch({
      props,
      vm
    }),
    computedHasButtons: computedHasButtons({
      props,
      state,
      mode
    }),
    computedHasIndicators: computedHasIndicators({
      props,
      state,
      mode
    }),
    canActive: canActive(props)
  });
};
const initWatch = ({
  watch,
  props,
  api: api2,
  state
}) => {
  watch(() => props.autoplay, api2.watchAutoplay);
  watch(() => props.loop, () => api2.setActiveItem(state.activeIndex));
};
const renderless = (props, {
  computed,
  onMounted,
  onBeforeUnmount,
  reactive,
  watch,
  provide
}, {
  vm,
  parent,
  emit,
  mode
}) => {
  const api2 = {};
  const state = initState({
    reactive,
    computed,
    api: api2
  });
  initApi({
    vm,
    api: api2,
    state,
    props,
    emit,
    mode
  });
  const {
    updateItems
  } = useItems({
    api: api2,
    vm,
    onMounted,
    state,
    watch
  });
  api2.updateItems = updateItems;
  useActiveIndex({
    api: api2,
    parent,
    props,
    state,
    watch
  });
  useResizeListener({
    api: api2,
    onBeforeUnmount,
    onMounted,
    parent
  });
  provide("CarouselVm", vm);
  initWatch({
    watch,
    props,
    api: api2,
    state
  });
  onMounted(() => {
    api2.startTimer();
    api2.onComplete(state.items.length);
    api2.simulateTouch();
  });
  parent.$on("updateItems", api2.updateItems);
  parent.$on("complete", () => {
    api2.onComplete(state.items.length);
  });
  return api2;
};
const useItems = ({
  api: api2,
  onMounted,
  state,
  watch
}) => {
  const updateItems = carouselItemVm => {
    if (carouselItemVm && !state.items.includes(carouselItemVm)) {
      state.items.push(carouselItemVm);
    }
  };
  watch(() => state.items, value => state.completed && api2.watchItems(value));
  onMounted(updateItems);
  return {
    updateItems
  };
};
const useActiveIndex = ({
  api: api2,
  state,
  watch
}) => {
  watch(() => state.activeIndex, (value, oldValue) => api2.watchActiveIndex({
    value,
    oldValue
  }), {
    immediate: true
  });
};
const useResizeListener = ({
  api: api2,
  onBeforeUnmount,
  onMounted,
  parent
}) => {
  onMounted(() => {
    addResizeListener(parent.$el, api2.resetItemPosition);
  });
  onBeforeUnmount(() => {
    if (parent.$el) {
      removeResizeListener(parent.$el, api2.resetItemPosition);
    }
  });
};
export { api, renderless, useActiveIndex, useItems, useResizeListener };