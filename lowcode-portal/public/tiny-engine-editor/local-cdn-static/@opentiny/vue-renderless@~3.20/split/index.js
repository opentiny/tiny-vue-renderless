import "../chunk-G2ADBYYC.js";
const px2percent = ({ numerator, denominator }) => parseFloat(numerator) / parseFloat(denominator);
const getComputedThresholdValue = ({ api, props, vm, state }) => (type) => {
  const size = vm.$refs.outerWrapper[state.offsetSize];
  if (state.valueIsPx) {
    return typeof props[type] === "string" ? props[type] : size * props[type];
  } else {
    return typeof props[type] === "string" ? api.px2percent({ numerator: props[type], denominator: size }) : props[type];
  }
};
const getleftTopMin = (state) => ({ oldvalue, newvalue }) => state.valueIsPx ? `${Math.min(parseFloat(oldvalue), parseFloat(newvalue))}px` : Math.min(oldvalue, newvalue);
const getrightBottomMin = (state) => ({ oldvalue, newvalue }) => state.valueIsPx ? `${Math.max(parseFloat(oldvalue), parseFloat(newvalue))}px` : Math.max(oldvalue, newvalue);
const getAnotherOffset = ({ vm, state }) => (value, isPercent) => {
  return isPercent ? 100 - value : state.valueIsPx ? `${vm.$refs.outerWrapper[state.offsetSize] - parseFloat(value)}px` : 1 - value;
};
const handleMove = ({ api, emit, props, vm, state }) => (event) => {
  const pageOffset = state.isHorizontal ? event.pageX : event.pageY;
  const offset = pageOffset - state.initOffset;
  const outerWidth = vm.$refs.outerWrapper[state.offsetSize];
  let value = state.valueIsPx ? `${parseFloat(state.oldOffset) + offset}px` : api.px2percent({ numerator: outerWidth * state.oldOffset + offset, denominator: outerWidth });
  const anotherValue = props.rightBottomValue ? value : api.getAnotherOffset(value);
  if (props.rightBottomValue) {
    value = api.getAnotherOffset(value);
  }
  if (parseFloat(value) <= parseFloat(state.computedleftTopMin)) {
    value = api.getrightBottomMin({
      oldvalue: value,
      newvalue: state.computedleftTopMin
    });
  }
  if (parseFloat(anotherValue) <= parseFloat(state.computedrightBottomMin)) {
    value = api.getAnotherOffset(
      api.getrightBottomMin({
        oldvalue: anotherValue,
        newvalue: state.computedrightBottomMin
      })
    );
  }
  event.atMin = props.modelValue === state.computedleftTopMin;
  event.atMax = state.valueIsPx ? api.getAnotherOffset(props.modelValue) === state.computedrightBottomMin : api.getAnotherOffset(props.modelValue).toFixed(5) === state.computedrightBottomMin.toFixed(5);
  state.leftTopPane = outerWidth * value;
  emit("update:modelValue", value);
  emit("moving", event);
};
const handleUp = ({ api, emit, off, state }) => () => {
  state.isMoving = false;
  off(document, "mousemove", api.handleMove);
  off(document, "mouseup", api.handleUp);
  emit("moveend");
};
const handleMousedown = ({ api, emit, on, props, state, vm }) => (event) => {
  if (!props.disabled) {
    state.initOffset = state.isHorizontal ? event.pageX : event.pageY;
    if (state.offset === 0) {
      state.oldOffset = 0;
    } else if (state.offset === 100) {
      state.oldOffset = 1;
    } else {
      if (props.threeAreas) {
        state.totalPane = vm.$refs.outerWrapper[state.offsetSize];
        let val = api.px2percent({ numerator: state.leftTopPane, denominator: state.totalPane });
        state.oldOffset = val;
        emit("update:modelValue", val);
      } else {
        state.oldOffset = props.rightBottomValue ? api.getAnotherOffset(props.modelValue) : props.modelValue;
      }
    }
    state.isMoving = true;
    on(document, "mousemove", api.handleMove);
    on(document, "mouseup", api.handleUp);
    emit("movestart");
  }
};
const buttonMousedown = () => (event) => {
  event.stopPropagation();
};
const buttonLeftTopClick = ({ emit, props, state }) => () => {
  if (state.offset === 100) {
    state.offset = state.lastClickOffset;
    emit("update:modelValue", state.lastmodelValue);
  } else if (state.offset !== 0) {
    state.lastClickOffset = state.offset;
    state.offset = props.rightBottomValue ? 100 : 0;
    state.lastmodelValue = props.modelValue;
    emit("update:modelValue", props.rightBottomValue ? 1 : 0);
  }
  emit("left-top-click");
};
const buttonRightBottomClick = ({ emit, props, state }) => () => {
  if (state.offset === 0) {
    state.offset = state.lastClickOffset;
    emit("update:modelValue", state.lastmodelValue);
  } else if (state.offset !== 100) {
    state.lastClickOffset = state.offset;
    state.offset = props.rightBottomValue ? 0 : 100;
    state.lastmodelValue = props.modelValue;
    emit("update:modelValue", props.rightBottomValue ? 0 : 1);
  }
  emit("right-bottom-click");
};
const computeOffset = ({ api, nextTick, props, vm, state }) => () => {
  setTimeout(() => {
    if (state) {
      state.totalPane = vm.$refs.outerWrapper[state.offsetSize];
      state.leftTopPane = state.totalPane * (state.offset / 100);
    }
  });
  if (state.valueIsPx) {
    nextTick(() => {
      const offset = api.px2percent({
        numerator: props.modelValue,
        denominator: vm.$refs.outerWrapper && vm.$refs.outerWrapper[state.offsetSize]
      }) * 1e4 / 100;
      state.offset = props.rightBottomValue ? api.getAnotherOffset(offset, true) : offset;
    });
  } else {
    const offset = props.modelValue * 1e4 / 100;
    state.offset = props.rightBottomValue ? api.getAnotherOffset(offset, true) : offset;
  }
};
export {
  buttonLeftTopClick,
  buttonMousedown,
  buttonRightBottomClick,
  computeOffset,
  getAnotherOffset,
  getComputedThresholdValue,
  getleftTopMin,
  getrightBottomMin,
  handleMousedown,
  handleMove,
  handleUp,
  px2percent
};
