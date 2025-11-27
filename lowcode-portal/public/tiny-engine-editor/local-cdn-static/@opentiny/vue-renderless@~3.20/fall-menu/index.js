import "../chunk-G2ADBYYC.js";
import { REFRESH_INTERVAL } from './../common/index.js';
import { on, off } from './../common/deps/dom.js';
import PopupManager from './../common/deps/popup-manager.js';
import { xss } from './../common/xss.js';
const arrowClick = state => opt => {
  state.pager += opt;
};
const overContent = state => on2 => {
  state.isActive = on2;
};
const clickActive = state => index => {
  state.active = index;
};
const mouseover = ({
  fall,
  props,
  state
}) => index => {
  const popupBox = fall.value;
  state.activeNode = index;
  let level2Array = props.data[index].children || [];
  level2Array.forEach(level2 => {
    let level3Array = level2.children || [];
    level3Array.forEach(level3 => {
      level3.url = xss.filterUrl(level3.url);
    });
  });
  state.level2data = level2Array;
  if (popupBox && state.level2data.length > 0) {
    popupBox.style.zIndex = PopupManager.nextZIndex();
    state.isActive = true;
  }
};
const mouseout = state => () => {
  state.isActive = false;
  state.activeNode = null;
};
const computePx = ({
  props,
  refs,
  state
}) => () => {
  const list = refs.list;
  const width = list.parentElement.clientWidth;
  const arr = list.querySelectorAll("li");
  const set = {
    data: [],
    offset: [],
    index: []
  };
  const liWidth = [];
  let innerwidth = 0;
  let start = 0;
  for (let i = 0, len = arr.length; i < len; i++) {
    innerwidth += arr[i].clientWidth;
    liWidth.push(arr[i].clientWidth);
    if (innerwidth > width || i === len - 1) {
      set.data.push(props.data.slice(start, i));
      set.offset.push(`-${arr[start].offsetLeft}px`);
      set.index.push(i);
      innerwidth = arr[i].clientWidth;
      start = i;
    }
  }
  const pagers = set.index.length;
  const lastRange = set.data.length === 1 ? liWidth : liWidth.slice(set.index[pagers - 2], set.index[pagers]);
  if (lastRange.reduce((a, b) => a + b) > width) {
    set.data.push(props.data[start]);
    set.offset.push(`-${arr[start].offsetLeft}px`);
  }
  set.size = set.data.length;
  state.pagerData = set;
};
const reRender = ({
  api,
  state,
  timeout
}) => () => {
  timeout && clearTimeout(timeout);
  timeout = setTimeout(() => {
    api.computePx();
  }, REFRESH_INTERVAL);
  state.pager = 1;
};
const mounted = ({
  api
}) => () => {
  api.computePx();
  on(window, "resize", api.reRender);
};
const beforeDestroy = api => () => off(window, "resize", api.reRender);
const computeLeft = ({
  state
}) => () => state.pagerData.offset[state.pager - 1];
const computeData = ({
  props
}) => () => {
  if (Array.isArray(props.data) && props.data.length) {
    props.data.forEach(level1 => {
      level1.url = xss.filterUrl(level1.url);
    });
  }
  return props.data;
};
export { arrowClick, beforeDestroy, clickActive, computeData, computeLeft, computePx, mounted, mouseout, mouseover, overContent, reRender };