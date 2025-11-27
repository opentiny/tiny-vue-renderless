import { __spreadValues } from "../chunk-G2ADBYYC.js";
import { emitEvent } from './../common/event.js';
const computedShowPager = ({
  props,
  state
}) => () => {
  const hidePager = props.hideOnSinglePage && (!state.internalPageCount || state.internalPageCount === 1);
  return state.internalLayout.length > 0 && !hidePager;
};
const computedInternalLayout = ({
  props
}) => () => {
  let layout = "";
  if (props.mode && !props.layout) {
    props.mode === "number" && (layout = "total, sizes, prev, pager, next, jumper");
    props.mode === "simple" && (layout = "sizes, total, prev, current, next");
    props.mode === "complete" && (layout = "sizes, total, prev, pager, next, jumper");
    props.mode === "fixed" && (layout = "prev,pager,next");
    props.mode === "simplest" && (layout = "total, prev, simplest-pager, next");
  } else if (!props.mode && props.layout || props.mode && props.layout) {
    layout = props.layout;
  } else {
    layout = "total, prev, pager, next, jumper";
  }
  if (!layout) {
    return [];
  } else {
    const components = layout.split(",").map(item => item.trim());
    return components;
  }
};
const computedTotalText = ({
  props,
  t
}) => () => {
  if (typeof props.customTotal === "string") return props.customTotal;
  const totals = Number(props.total);
  if (isNaN(totals)) return "0";
  const HUNDRED_THOUSAND = 1e5;
  const MILLION = 1e6;
  const TEN_MILLION = 1e7;
  if (totals < HUNDRED_THOUSAND) {
    return String(totals);
  } else if (totals < MILLION) {
    return t("ui.page.hundredThousand");
  } else if (totals < TEN_MILLION) {
    return t("ui.page.million");
  } else {
    return t("ui.page.tenMillion");
  }
};
const computedInternalPageCount = ({
  props,
  state
}) => () => {
  if (typeof props.total === "number") {
    return Math.max(1, Math.ceil(props.total / state.internalPageSize));
  } else if (typeof props.pageCount === "number") {
    return Math.max(1, props.pageCount);
  }
  return null;
};
const computedSimplestPagerOption = ({
  props,
  state
}) => () => {
  const itemSizes = Math.max(1, Math.ceil(props.total / state.internalPageSize));
  return Array.from({
    length: itemSizes
  }).map((item, index) => ({
    value: index + 1,
    label: `${index + 1}/${itemSizes}`
  }));
};
const computedSimplestPagerWidth = ({
  state
}) => () => {
  const baseWidth = 60;
  const num = String(state.internalCurrentPage).length + String(state.simplestPagerOption.length).length;
  return baseWidth + num * 8;
};
const computedPageSizeText = ({
  props,
  designConfig
}) => () => {
  if (props.pageSizeText) {
    return props.pageSizeText;
  }
  if ((designConfig == null ? void 0 : designConfig.state) && Object.hasOwnProperty.call(designConfig.state, "pageSizeText")) {
    return designConfig.state.pageSizeText;
  }
  return "";
};
const handleJumperFocus = ({
  state
}) => e => {
  var _a;
  state.jumperBackup = (_a = e.target) == null ? void 0 : _a.value;
};
const watchInternalCurrentPage = ({
  state,
  emit
}) => currentPage => {
  const value = String(currentPage);
  if (state.jumperValue !== value) {
    state.jumperValue = value;
  }
  emit("update:current-page", currentPage);
  emit("current-change", currentPage);
  state.lastEmittedPage = -1;
};
const watchPageSizes = ({
  state,
  props
}) => newVal => {
  if (Array.isArray(newVal)) {
    state.internalPageSize = newVal.includes(props.pageSize) ? props.pageSize : newVal[0];
  }
};
const watchCurrentPage = ({
  state,
  api
}) => curPage => {
  state.internalCurrentPage = api.getValidCurrentPage(curPage);
};
const watchInternalPageCount = ({
  state,
  api
}) => pageCount => {
  const oldCurPage = state.internalCurrentPage;
  if (pageCount && pageCount > 0 && oldCurPage === 0) {
    state.internalCurrentPage = 1;
  } else if (oldCurPage > Number(pageCount)) {
    state.internalCurrentPage = pageCount || 1;
    state.userChangePageSize && api.emitChange();
  }
  state.userChangePageSize = false;
};
const watchPageSize = ({
  state
}) => pageSize => {
  state.internalPageSize = isNaN(pageSize) ? 10 : pageSize;
};
const watchTotal = ({
  state
}) => total => {
  state.internalTotal = total;
};
const watchShowSizes = ({
  nextTick,
  vm
}) => newVal => {
  if (newVal) {
    nextTick(() => {
      const width = vm.$refs.pageSize[0].getBoundingClientRect().width;
      const popover = document.querySelectorAll(".tiny-pager__selector");
      Array.from(popover).forEach(ele => {
        ele.style.width = width + "px";
      });
    });
  }
};
const handleSizeChange = ({
  props,
  state,
  api,
  emit,
  vm
}) => val => {
  val = Number(val);
  if (val !== state.internalPageSize) {
    const callback = () => {
      if (!api.beforeChangeHandler()) {
        return;
      }
      state.internalPageSize = val;
      state.userChangePageSize = true;
      state.showSizes = false;
      emit("update:pageSize", val);
      emit("size-change", val);
      emit("page-change", {
        currentPage: state.internalCurrentPage,
        pageSize: val,
        total: state.internalTotal
      });
      vm.$refs.sizesList[0].state.showPopper = false;
    };
    if (props.isBeforePageChange) {
      let newPageSize = val;
      let currentPageSize = state.internalPageSize;
      let params = {
        newPageSize,
        currentPageSize,
        callback
      };
      api.beforeSizeChangeHandler(params);
    } else {
      callback();
    }
  }
};
const handleJumperInput = ({
  state
}) => e => {
  const target = e.target;
  if (!target.value) {
    state.jumperValue = "";
  } else if (/^\d+$/.test(target.value)) {
    state.jumperValue = target.value || "1";
  }
  target.value = state.jumperValue;
};
const handleJumperChange = ({
  props,
  state,
  api
}) => () => {
  api.parseValueNumber();
  const callback = () => {
    api.handleJumperClick();
  };
  const rollback = () => {
    state.jumperValue = String(state.jumperBackup);
  };
  const newPage = state.jumperValue;
  const currentPage = state.jumperBackup;
  if (props.isBeforePageChange && newPage !== currentPage) {
    const params = {
      newPage,
      currentPage,
      callback,
      rollback
    };
    api.beforePagerChangeHandler(params);
  } else {
    callback();
  }
};
const handleJumperClick = ({
  props,
  state,
  api
}) => () => {
  if (!api.canJumperGo() || props.disabled) return;
  state.internalCurrentPage = api.getValidCurrentPage(state.jumperValue);
  api.emitChange();
};
const isValueNumber = ({
  state
}) => () => {
  return !isNaN(Number(state.jumperValue));
};
const parseValueNumber = ({
  state
}) => () => {
  let value = Number(String(state.jumperValue).split(/[^0-9-+.]/).join(""));
  if (isNaN(value)) {
    value = 1;
  }
  value = Number(value.toFixed(0));
  const min = 1;
  const max = state.internalPageCount || 1;
  if (value >= max) {
    state.jumperValue = String(max);
  } else if (value <= min) {
    state.jumperValue = String(min);
  } else {
    state.jumperValue = String(value);
  }
};
const handleSizeShowPopover = ({
  state,
  props
}) => () => {
  if (props.disabled) {
    state.showSizes = false;
    return;
  }
  state.showSizes = true;
};
const handleSizeHidePopover = ({
  state
}) => () => {
  state.showSizes = false;
};
const canJumperGo = ({
  props,
  state,
  vm
}) => () => {
  const inputValue = Number(vm.$refs.jumperInput[0].value || 0);
  const currentPage = Number(state.internalCurrentPage || 0);
  return props.accurateJumper ? inputValue !== currentPage : true;
};
const beforeSizeChangeHandler = ({
  state,
  emit
}) => params => {
  const {
    newPageSize,
    currentPageSize,
    callback
  } = params;
  const newPage = 1;
  const currentPage = state.internalCurrentPage;
  const temp = {
    newPage,
    newPageSize,
    currentPage,
    currentPageSize,
    callback
  };
  emit("before-page-change", temp);
};
const beforePagerChangeHandler = ({
  state,
  emit
}) => params => {
  const {
    newPage,
    currentPage,
    callback,
    rollback
  } = params;
  const newPageSize = state.internalPageSize;
  const currentPageSize = state.internalPageSize;
  const temp = {
    newPage,
    newPageSize,
    currentPage,
    currentPageSize,
    callback,
    rollback
  };
  emit("before-page-change", temp);
};
const beforeJumperChangeHandler = ({
  state,
  emit
}) => params => {
  const {
    newPage,
    currentPage,
    callback,
    rollback
  } = params;
  const newPageSize = state.internalPageSize;
  const currentPageSize = state.internalPageSize;
  const temp = {
    newPage,
    newPageSize,
    currentPage,
    currentPageSize,
    callback,
    rollback
  };
  emit("before-page-change", temp);
};
const copyEmit = ({
  emit
}) => (...args) => {
  emit(args[0], ...args.slice(1));
};
const beforeChangeHandler = ({
  state,
  api
}) => (val = -1) => {
  return emitEvent(api.copyEmit, "before-change", state.internalCurrentPage, void 0, val);
};
const handleCurrentChange = ({
  state,
  api
}) => val => {
  if (!api.beforeChangeHandler(val)) {
    return;
  }
  state.internalCurrentPage = api.getValidCurrentPage(val);
  state.userChangePageSize = true;
  api.emitChange();
};
const prev = ({
  state,
  props,
  api,
  emit
}) => () => {
  const callback = () => {
    if (props.disabled || !api.beforeChangeHandler(state.internalCurrentPage - 1)) {
      return;
    }
    const newVal = state.internalCurrentPage - 1;
    state.internalCurrentPage = api.getValidCurrentPage(newVal);
    emit("prev-click", state.internalCurrentPage);
    api.emitChange();
  };
  if (props.isBeforePageChange) {
    const newPage = state.internalCurrentPage - 1;
    const temp = api.buildBeforePageChangeParam({
      newPage,
      callback
    });
    emit("before-page-change", temp);
  } else {
    callback();
  }
};
const next = ({
  props,
  state,
  api,
  emit
}) => () => {
  const callback = () => {
    if (props.disabled || !api.beforeChangeHandler(state.internalCurrentPage + 1)) {
      return;
    }
    const newVal = state.internalCurrentPage + 1;
    state.internalCurrentPage = api.getValidCurrentPage(newVal);
    emit("next-click", state.internalCurrentPage);
    api.emitChange();
  };
  if (props.isBeforePageChange) {
    const newPage = state.internalCurrentPage + 1;
    const temp = api.buildBeforePageChangeParam({
      newPage,
      callback
    });
    emit("before-page-change", temp);
  } else {
    callback();
  }
};
const buildBeforePageChangeParam = ({
  state
}) => param => {
  const currentPage = state.internalCurrentPage;
  const newPageSize = state.internalPageSize;
  const currentPageSize = state.internalPageSize;
  return __spreadValues({
    currentPage,
    newPageSize,
    currentPageSize
  }, param);
};
const getValidCurrentPage = ({
  state
}) => val => {
  const parseVal = Number(val);
  const hasPageCount = typeof state.internalPageCount === "number";
  let resetVal;
  if (hasPageCount) {
    if (parseVal < 1) {
      resetVal = 1;
    } else if (parseVal > (state.internalPageCount || 0)) {
      resetVal = state.internalPageCount;
    }
  } else {
    if (isNaN(parseVal) || parseVal < 1) {
      resetVal = 1;
    }
  }
  if (resetVal === void 0 && isNaN(parseVal)) {
    resetVal = 1;
  } else if (resetVal === 0) {
    resetVal = 1;
  }
  return resetVal === void 0 ? parseVal : resetVal;
};
const emitChange = ({
  state,
  nextTick,
  emit
}) => () => {
  nextTick(() => {
    if (state.internalCurrentPage !== state.lastEmittedPage || state.userChangePageSize) {
      emit("update:current-page", state.internalCurrentPage);
      emit("page-change", {
        currentPage: state.internalCurrentPage,
        pageSize: state.internalPageSize,
        total: state.internalTotal
      });
      state.lastEmittedPage = state.internalCurrentPage;
      state.userChangePageSize = false;
    }
  });
};
const setTotal = ({
  state
}) => val => {
  state.internalTotal = val;
};
const clickSizes = () => e => e.stopPropagation();
export { beforeChangeHandler, beforeJumperChangeHandler, beforePagerChangeHandler, beforeSizeChangeHandler, buildBeforePageChangeParam, canJumperGo, clickSizes, computedInternalLayout, computedInternalPageCount, computedPageSizeText, computedShowPager, computedSimplestPagerOption, computedSimplestPagerWidth, computedTotalText, copyEmit, emitChange, getValidCurrentPage, handleCurrentChange, handleJumperChange, handleJumperClick, handleJumperFocus, handleJumperInput, handleSizeChange, handleSizeHidePopover, handleSizeShowPopover, isValueNumber, next, parseValueNumber, prev, setTotal, watchCurrentPage, watchInternalCurrentPage, watchInternalPageCount, watchPageSize, watchPageSizes, watchShowSizes, watchTotal };