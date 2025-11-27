import "../chunk-G2ADBYYC.js";
import { computedGetIcon, computedGetTitle, computedStyle, computedClass, handleClose, handleHeaderClick, watchAutoHide, handlerTargetNode } from './index.js';
const api = ["handleClose", "state", "handleHeaderClick"];
const initState = ({
  api: api2,
  computed,
  constants,
  reactive
}) => {
  return reactive({
    show: true,
    contentVisible: false,
    contentDescribeHeight: 0,
    contentDefaultHeight: 0,
    contentMaxHeight: constants.CONTENT_MAXHEUGHT,
    scrollStatus: false,
    getIcon: computed(() => api2.computedGetIcon()),
    getTitle: computed(() => api2.computedGetTitle()),
    alertClass: computed(() => api2.computedClass()),
    alertStyle: computed(() => api2.computedStyle())
  });
};
const initApi = ({
  api: api2,
  state,
  constants,
  props,
  designConfig,
  t,
  emit,
  vm,
  parent,
  nextTick,
  mode
}) => {
  Object.assign(api2, {
    state,
    computedGetIcon: computedGetIcon({
      constants,
      props,
      designConfig
    }),
    computedGetTitle: computedGetTitle({
      constants,
      props,
      t
    }),
    computedClass: computedClass({
      props,
      mode
    }),
    computedStyle: computedStyle({
      props,
      mode
    }),
    handleClose: handleClose({
      emit,
      state
    }),
    handleHeaderClick: handleHeaderClick({
      state,
      props,
      vm
    }),
    watchAutoHide: watchAutoHide({
      api: api2,
      props
    }),
    handlerTargetNode: handlerTargetNode({
      props,
      parent,
      vm,
      nextTick
    })
  });
};
const initWatcher = ({
  watch,
  props,
  api: api2
}) => {
  watch(() => props.autoHide, api2.watchAutoHide, {
    immediate: true
  });
  watch(() => props.target, api2.handlerTargetNode, {
    immediate: true
  });
};
const renderless = (props, {
  computed,
  reactive,
  watch
}, {
  t,
  emit,
  constants,
  vm,
  designConfig,
  parent,
  nextTick,
  mode
}) => {
  const api2 = {};
  const state = initState({
    api: api2,
    computed,
    constants,
    reactive
  });
  initApi({
    api: api2,
    state,
    constants,
    props,
    designConfig,
    t,
    emit,
    vm,
    parent,
    nextTick,
    mode
  });
  initWatcher({
    watch,
    props,
    api: api2
  });
  return api2;
};
export { api, renderless };