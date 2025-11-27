import "../chunk-G2ADBYYC.js";
import { pxCheck, stopMomentum, setRollerStyle, onTouchStart, onTouchMove, onTouchEnd, momentum, isHidden, setTransform, setMove, setChooseValue, modifyStatus, OptionStyle } from './column-index.js';
import { useTouch } from './useTouch.js';
const api = ["state", "touch", "OptionStyle", "setRollerStyle", "isHidden", "onTouchStart", "onTouchMove", "onTouchEnd", "setMove", "stopMomentum", "pxCheck"];
const renderless = (props, {
  reactive,
  computed,
  watch,
  ref,
  onMounted
}, {
  emit,
  vm
}) => {
  const touch = useTouch({
    ref
  });
  const state = reactive({
    touchParams: {
      startY: 0,
      endY: 0,
      startTime: 0,
      endTime: 0,
      lastY: 0,
      lastTime: 0
    },
    currIndex: 1,
    defaultIndex: 1,
    transformY: 0,
    scrollDistance: 0,
    rotation: 20,
    moving: false,
    touchDeg: 0,
    touchTime: 0,
    currentValue: computed(() => props.column[state.currIndex - 1][props.fieldNames.value]),
    touchTileStyle: computed(() => {
      const {
        optionHeight
      } = props;
      return {
        transition: `transform ${state.touchTime}ms cubic-bezier(0.17, 0.89, 0.45, 1)`,
        transform: `translate3d(0, ${state.scrollDistance}px, 0)`,
        top: `calc(50% - ${+optionHeight / 2}px)`,
        height: `${optionHeight}px`
      };
    }),
    touchRollerStyle: computed(() => {
      return {
        transition: `transform ${state.touchTime}ms cubic-bezier(0.17, 0.89, 0.45, 1)`,
        transform: `rotate3d(1, 0, 0, ${state.touchDeg})`,
        top: `calc(50% - ${+props.optionHeight / 2}px)`
      };
    }),
    maskStyles: computed(() => {
      return {
        backgroundSize: `100% ${(+props.visibleOptionNum - 1) * +props.optionHeight / 2}px`
      };
    })
  });
  const api2 = {};
  Object.assign(api2, {
    state,
    touch,
    OptionStyle: OptionStyle({
      props,
      state
    }),
    setRollerStyle: setRollerStyle({
      state
    }),
    isHidden: isHidden({
      state
    }),
    onTouchStart: onTouchStart({
      state,
      props,
      touch,
      vm
    }),
    onTouchMove: onTouchMove({
      state,
      api: api2,
      touch
    }),
    onTouchEnd: onTouchEnd({
      state,
      props,
      api: api2,
      touch
    }),
    setMove: setMove({
      state,
      props,
      api: api2
    }),
    stopMomentum: stopMomentum({
      state,
      api: api2
    }),
    setTransform: setTransform({
      state
    }),
    setChooseValue: setChooseValue({
      props,
      state,
      emit
    }),
    modifyStatus: modifyStatus({
      state,
      props,
      api: api2
    }),
    pxCheck,
    momentum
  });
  watch(() => props.column, () => {
    if (props.column && props.column.length > 0) {
      state.transformY = 0;
      api2.modifyStatus(false);
    }
  }, {
    deep: true
  });
  watch(() => [props.value, props.defaultValue], val => {
    if ((val || val === 0) && props.visible) {
      state.transformY = 0;
      api2.modifyStatus(false);
    }
  }, {
    deep: true
  });
  onMounted(() => {
    api2.modifyStatus(false);
  });
  return api2;
};
export { api, renderless };