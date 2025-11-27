import "../chunk-G2ADBYYC.js";
import debounce from './../common/deps/debounce.js';
import { on, off } from './../common/deps/dom.js';
const getBoundingPosition = ({
  state
}) => () => {
  const {
    slideMainPostion,
    positionList
  } = state;
  const list = positionList.slice();
  const len = list.length;
  state.boundingIndex = {
    left: -1,
    right: -1
  };
  for (let i = 0; i < len; i++) {
    if (list[i].right > slideMainPostion.right + 2) {
      state.boundingIndex.right = i;
      break;
    }
  }
  for (let i = len - 1; i >= 0; i--) {
    if (list[i].left < slideMainPostion.left) {
      state.boundingIndex.left = i;
      break;
    }
  }
};
const leftSlideHandler = ({
  state,
  api: api2
}) => () => {
  const {
    canLeftScroll,
    slideMainPostion,
    positionList,
    boundingIndex
  } = state;
  if (!canLeftScroll || state.timer) {
    return;
  }
  const position = boundingIndex.left !== -1 && positionList[boundingIndex.left];
  if (position) {
    api2.animationHandler(position.left - slideMainPostion.left);
  }
};
const rightSlideHandler = ({
  state,
  api: api2
}) => () => {
  const {
    canRightScroll,
    slideMainPostion,
    positionList,
    boundingIndex
  } = state;
  if (!canRightScroll || state.timer) {
    return;
  }
  const position = boundingIndex.right !== -1 && positionList[boundingIndex.right];
  if (position) {
    api2.animationHandler(position.right - slideMainPostion.right);
  }
};
const updatePosition = ({
  state,
  vm,
  props,
  api: api2
}) => debounce(10, isInit => {
  state.positionList = props.data.map((item, index) => {
    const blockRef = vm.$refs["block" + index];
    let position = {};
    if (blockRef) {
      if (Array.isArray(blockRef)) {
        position = blockRef[0] && blockRef[0].getBoundingClientRect();
      } else {
        position = blockRef.getBoundingClientRect();
      }
    }
    return Object.assign(position, {
      index
    });
  });
  state.slideMainPostion = vm.$refs.slideMain.getBoundingClientRect();
  api2.getBoundingPosition();
  isInit === true && api2.updatePosition();
});
const animationLoop = ({
  state,
  api: api2,
  vm
}) => (offset, delay, scorllLeft, cb) => {
  const elScrollLeft = vm.$refs.slideMain.scrollLeft;
  clearTimeout(state.timer);
  if (elScrollLeft !== state.oldScrollLeft && Math.abs(elScrollLeft - scorllLeft) > Math.abs(offset)) {
    state.timer = setTimeout(() => {
      vm.$refs.slideMain.scrollLeft += offset;
      state.oldScrollLeft = elScrollLeft;
      api2.animationLoop(offset, delay, scorllLeft, cb);
    }, delay);
  } else {
    state.timer = null;
    vm.$refs.slideMain.scrollLeft = scorllLeft;
    cb && cb();
  }
};
const animationHandler = ({
  api: api2,
  vm,
  props
}) => allOffset => {
  const {
    duration,
    delay
  } = props;
  const mathFn = allOffset > 0 ? Math.ceil : Math.floor;
  const offsetInt = mathFn(allOffset);
  if (!duration) {
    vm.$refs.slideMain.scrollLeft += offsetInt;
    api2.updatePosition();
    return;
  }
  const offset = mathFn(offsetInt / (duration / delay));
  const scorllLeft = vm.$refs.slideMain.scrollLeft + offsetInt;
  api2.animationLoop(offset, delay, scorllLeft, () => {
    api2.updatePosition();
  });
};
const api = ["slideBarState", "leftSlideHandler", "rightSlideHandler", "updatePosition"];
const renderless = (props, {
  reactive,
  onMounted,
  onUnmounted,
  computed
}, {
  vm
}) => {
  const state = reactive({
    timer: null,
    oldScrollLeft: -1,
    slideMainPostion: {},
    positionList: [],
    canLeftScroll: computed(() => !props.noArrow && state.boundingIndex.left !== -1),
    canRightScroll: computed(() => !props.noArrow && state.boundingIndex.right !== -1),
    boundingIndex: {
      left: -1,
      right: -1
    }
  });
  const api2 = {};
  Object.assign(api2, {
    slideBarState: state,
    // 内部 state 重命名，避免使用插槽时 state 覆盖问题
    leftSlideHandler: leftSlideHandler({
      state,
      api: api2
    }),
    rightSlideHandler: rightSlideHandler({
      state,
      api: api2
    }),
    animationHandler: animationHandler({
      api: api2,
      vm,
      props
    }),
    animationLoop: animationLoop({
      state,
      api: api2,
      vm
    }),
    getBoundingPosition: getBoundingPosition({
      state,
      api: api2,
      vm
    }),
    updatePosition: updatePosition({
      state,
      vm,
      props,
      api: api2
    })
  });
  onMounted(() => {
    api2.updatePosition(true);
    on(window, "resize", api2.updatePosition);
  });
  onUnmounted(() => {
    off(window, "resize", api2.updatePosition);
  });
  return api2;
};
export { api, renderless };