import "../chunk-G2ADBYYC.js";
import { computedCanvasStyle, computedChartColor, dataHandler, nextTickResize, resize, echartsResize, optionsHandler, judgeWidthHandler, resizeableHandler, init, addResizeListener, removeResizeListener, addWatchToProps, createEventProxy, themeChange, clean, mounted, changeHandler, resizeHandler, computedInitColor, getDefaultThemeColors } from './index.js';
import { camelToKebab } from './deps/utils.js';
const api = ["state", "camelToKebab", "dataHandler", "nextTickResize", "resize", "echartsResize", "optionsHandler", "judgeWidthHandler", "resizeableHandler", "init", "addResizeListener", "removeResizeListener", "addWatchToProps", "createEventProxy", "themeChange", "clean", "mounted", "changeHandler", "resizeHandler", "getDefaultThemeColors"];
const renderless = (props, {
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
  watch,
  markRaw
}, {
  t,
  vm,
  emit,
  nextTick
}, {
  echartsLib
}) => {
  const state = reactive({
    chartColor: computed(() => api2.computedInitColor()),
    canvasStyle: computed(() => api2.computedCanvasStyle())
  });
  const api2 = {
    state,
    camelToKebab,
    computedChartColor: computedChartColor(props),
    computedCanvasStyle: computedCanvasStyle(props),
    computedInitColor: computedInitColor(props)
  };
  onMounted(() => api2.mounted());
  onBeforeUnmount(() => api2.clean());
  return Object.assign(api2, {
    resize: resize({
      props,
      vm,
      api: api2
    }),
    echartsResize: echartsResize(state),
    clean: clean({
      props,
      state,
      api: api2
    }),
    themeChange: themeChange({
      api: api2,
      state
    }),
    changeHandler: changeHandler({
      api: api2,
      props
    }),
    resizeHandler: resizeHandler({
      api: api2,
      props
    }),
    nextTickResize: nextTickResize({
      api: api2,
      nextTick
    }),
    init: init({
      state,
      props,
      api: api2,
      vm,
      echartsLib,
      markRaw
    }),
    createEventProxy: createEventProxy({
      api: api2,
      props,
      state
    }),
    addResizeListener: addResizeListener({
      state,
      api: api2
    }),
    resizeableHandler: resizeableHandler({
      api: api2,
      state
    }),
    mounted: mounted({
      api: api2,
      state,
      vm,
      props,
      watch,
      t
    }),
    removeResizeListener: removeResizeListener({
      state,
      api: api2
    }),
    addWatchToProps: addWatchToProps({
      vm,
      props,
      watch,
      api: api2
    }),
    dataHandler: dataHandler({
      api: api2,
      props,
      state,
      echartsLib,
      t,
      vm
    }),
    judgeWidthHandler: judgeWidthHandler({
      props,
      api: api2,
      vm,
      nextTick
    }),
    getDefaultThemeColors: getDefaultThemeColors(),
    optionsHandler: optionsHandler({
      props,
      state,
      emit,
      echartsLib,
      api: api2,
      vm
    })
  });
};
export { api, renderless };