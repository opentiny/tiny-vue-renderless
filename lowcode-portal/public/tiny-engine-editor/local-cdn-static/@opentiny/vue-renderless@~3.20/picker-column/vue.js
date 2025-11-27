import "../chunk-G2ADBYYC.js";
import { computedWrapperStyle, computedBaseOffset, onClickItem, setIndex, adjustIndex, mountedHandler, momentum, onTransitionEnd, getOptionText, setValue, getValue, setOptions, deepClone, beforeUnmountHandler, onTouchstart, onTouchmove, onTouchend } from './index.js';
const api = ["state", "onClickItem", "onTransitionEnd", "setValue", "getValue", "setOptions", "setIndex"];
const initState = ({
  reactive,
  computed,
  props,
  api: api2
}) => {
  const state = reactive({
    columnsItem: props.columnsItem,
    columnsItemArr: props.columnsItem.values,
    currentIndex: props.defaultIndex,
    itemHeight: props.itemHeight,
    visibleItemCount: props.visibleItemCount,
    offset: 0,
    duration: 0,
    startOffset: 0,
    moving: false,
    defaultDuration: 200,
    momentumLimitTime: 300,
    momentumLimitDistance: 15,
    touchStartTime: null,
    momentumOffset: 0,
    direction: "",
    deltaX: 0,
    deltaY: 0,
    offsetX: 0,
    offsetY: 0,
    count: props.columnsItem.values.length,
    transitionEndTrigger: null,
    clumnsWrapHeight: null,
    maskStyle: null,
    wrapperStyle: computed(() => api2.computedWrapperStyle()),
    baseOffset: computed(() => api2.computedBaseOffset())
  });
  return state;
};
const initApi = ({
  api: api2,
  props,
  state,
  vm,
  emit
}) => {
  Object.assign(api2, {
    state,
    getValue: getValue(state),
    adjustIndex: adjustIndex(state),
    onTouchmove: onTouchmove({
      state
    }),
    onTouchstart: onTouchstart({
      state
    }),
    getOptionText: getOptionText({
      state,
      props
    }),
    onTransitionEnd: onTransitionEnd(state),
    computedBaseOffset: computedBaseOffset({
      state,
      props
    }),
    computedWrapperStyle: computedWrapperStyle(state),
    setValue: setValue({
      api: api2,
      state
    }),
    onTouchend: onTouchend({
      api: api2,
      state
    }),
    setOptions: setOptions({
      api: api2,
      state,
      props
    }),
    momentum: momentum({
      api: api2,
      state,
      props
    }),
    setIndex: setIndex({
      api: api2,
      state,
      emit
    }),
    onClickItem: onClickItem({
      api: api2,
      state
    }),
    mountedHandler: mountedHandler({
      api: api2,
      state,
      vm
    }),
    beforeUnmountHandler: beforeUnmountHandler({
      api: api2,
      vm
    })
  });
};
const initWatch = ({
  watch,
  props,
  state,
  api: api2
}) => {
  watch(() => props.defaultIndex, api2.setIndex, {
    immediate: true
  });
  watch(() => props.columnsItem, value => {
    state.columnsItem = value;
  }, {
    immediate: true
  });
  watch(() => props.columnsItem.values, value => {
    state.count = value.length;
  }, {
    immediate: true
  });
};
const renderless = (props, {
  computed,
  onMounted,
  reactive,
  watch,
  onBeforeUnmount
}, {
  emit,
  vm
}) => {
  const api2 = {};
  const state = initState({
    reactive,
    computed,
    props,
    api: api2
  });
  initApi({
    api: api2,
    props,
    state,
    vm,
    emit
  });
  api2.setIndex(state.currentIndex);
  state.columnsItem = deepClone(props.columnsItem);
  initWatch({
    watch,
    props,
    state,
    api: api2
  });
  onMounted(api2.mountedHandler);
  onBeforeUnmount(api2.beforeUnmountHandler);
  return api2;
};
export { api, renderless };