import "../chunk-G2ADBYYC.js";
import { computedShowPager, computedInternalLayout, computedTotalText, computedInternalPageCount, computedSimplestPagerOption, computedSimplestPagerWidth, computedPageSizeText, handleJumperFocus, handleSizeChange, handleJumperInput, handleJumperChange, handleJumperClick, isValueNumber, parseValueNumber, handleSizeShowPopover, handleSizeHidePopover, canJumperGo, beforeSizeChangeHandler, beforePagerChangeHandler, copyEmit, beforeChangeHandler, handleCurrentChange, prev, next, buildBeforePageChangeParam, getValidCurrentPage, emitChange, setTotal, clickSizes, watchInternalCurrentPage, watchPageSizes, watchCurrentPage, watchInternalPageCount, watchPageSize, watchTotal, watchShowSizes } from './index.js';
const api = ["state", "handleJumperFocus", "handleSizeChange", "handleJumperInput", "handleJumperChange", "handleJumperClick", "isValueNumber", "parseValueNumber", "handleSizeShowPopover", "handleSizeHidePopover", "canJumperGo", "beforeSizeChangeHandler", "beforePagerChangeHandler", "beforeJumperChangeHandler", "beforeChangeHandler", "handleCurrentChange", "prev", "next", "buildBeforePageChangeParam", "getValidCurrentPage", "emitChange", "setTotal", "clickSizes"];
const renderless = (props, {
  reactive,
  computed,
  watch
}, {
  emit,
  vm,
  nextTick,
  t,
  designConfig
}) => {
  var _a, _b, _c, _d;
  const api2 = {};
  const state = reactive({
    showSizes: false,
    internalCurrentPage: 1,
    internalPageSize: props.pageSize,
    lastEmittedPage: -1,
    userChangePageSize: false,
    internalTotal: props.total,
    jumperValue: "1",
    jumperBackup: "1",
    simplestPagerOption: computed(() => api2.computedSimplestPagerOption()),
    simplestPagerWidth: computed(() => api2.computedSimplestPagerWidth()),
    showPager: computed(() => api2.computedShowPager()),
    internalLayout: computed(() => api2.computedInternalLayout()),
    totalText: computed(() => api2.computedTotalText()),
    internalPageCount: computed(() => api2.computedInternalPageCount()),
    showJumperSuffix: (_b = (_a = designConfig == null ? void 0 : designConfig.state) == null ? void 0 : _a.showJumperSuffix) != null ? _b : true,
    align: props.align || ((_c = designConfig == null ? void 0 : designConfig.state) == null ? void 0 : _c.align) || "right",
    totalI18n: ((_d = designConfig == null ? void 0 : designConfig.state) == null ? void 0 : _d.totalI18n) || "totals",
    totalFixedLeft: computed(() => {
      var _a2, _b2, _c2, _d2;
      return (_d2 = (_c2 = (_b2 = props.totalFixedLeft) != null ? _b2 : (_a2 = designConfig == null ? void 0 : designConfig.state) == null ? void 0 : _a2.totalFixedLeft) != null ? _c2 : props.mode !== "simplest") != null ? _d2 : true;
    }),
    pageSizeText: computed(() => api2.computedPageSizeText())
  });
  Object.assign(api2, {
    state,
    computedShowPager: computedShowPager({
      props,
      state
    }),
    computedInternalLayout: computedInternalLayout({
      props
    }),
    computedTotalText: computedTotalText({
      props,
      t
    }),
    computedInternalPageCount: computedInternalPageCount({
      props,
      state
    }),
    computedSimplestPagerOption: computedSimplestPagerOption({
      props,
      state
    }),
    computedSimplestPagerWidth: computedSimplestPagerWidth({
      state
    }),
    computedPageSizeText: computedPageSizeText({
      props,
      designConfig
    }),
    getValidCurrentPage: getValidCurrentPage({
      state
    }),
    handleJumperFocus: handleJumperFocus({
      state
    }),
    handleSizeChange: handleSizeChange({
      props,
      state,
      api: api2,
      emit,
      vm
    }),
    handleJumperInput: handleJumperInput({
      state
    }),
    handleJumperChange: handleJumperChange({
      props,
      state,
      api: api2
    }),
    handleJumperClick: handleJumperClick({
      props,
      state,
      api: api2
    }),
    isValueNumber: isValueNumber({
      state
    }),
    parseValueNumber: parseValueNumber({
      state
    }),
    handleSizeShowPopover: handleSizeShowPopover({
      state,
      props
    }),
    handleSizeHidePopover: handleSizeHidePopover({
      state
    }),
    canJumperGo: canJumperGo({
      props,
      state,
      vm
    }),
    beforeSizeChangeHandler: beforeSizeChangeHandler({
      state,
      emit
    }),
    beforePagerChangeHandler: beforePagerChangeHandler({
      state,
      emit
    }),
    copyEmit: copyEmit({
      emit
    }),
    beforeChangeHandler: beforeChangeHandler({
      state,
      api: api2
    }),
    handleCurrentChange: handleCurrentChange({
      state,
      api: api2
    }),
    prev: prev({
      state,
      props,
      api: api2,
      emit
    }),
    next: next({
      props,
      state,
      api: api2,
      emit
    }),
    buildBeforePageChangeParam: buildBeforePageChangeParam({
      state
    }),
    emitChange: emitChange({
      state,
      nextTick,
      emit
    }),
    setTotal: setTotal({
      state
    }),
    clickSizes: clickSizes(),
    // watch
    watchInternalCurrentPage: watchInternalCurrentPage({
      state,
      emit
    }),
    watchPageSizes: watchPageSizes({
      state,
      props
    }),
    watchCurrentPage: watchCurrentPage({
      state,
      api: api2
    }),
    watchInternalPageCount: watchInternalPageCount({
      state,
      api: api2
    }),
    watchPageSize: watchPageSize({
      state
    }),
    watchTotal: watchTotal({
      state
    }),
    watchShowSizes: watchShowSizes({
      nextTick,
      vm
    })
  });
  state.internalCurrentPage = api2.getValidCurrentPage(props.currentPage);
  watch(() => state.internalCurrentPage, api2.watchInternalCurrentPage);
  watch(() => props.pageSizes, api2.watchPageSizes, {
    immediate: true
  });
  watch(() => props.currentPage, api2.watchCurrentPage);
  watch(() => state.internalPageCount, api2.watchInternalPageCount);
  watch(() => props.pageSize, api2.watchPageSize, {
    immediate: true
  });
  watch(() => props.total, api2.watchTotal);
  watch(() => state.showSizes, api2.watchShowSizes);
  return api2;
};
export { api, renderless };