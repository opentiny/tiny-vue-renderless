import {
  __objRest,
  __spreadProps,
  __spreadValues
} from "../chunk-G2ADBYYC.js";
const kebab = (key) => String(key).replace(/\B([A-Z])/g, "-$1").toLowerCase();
const fromProps = (props) => {
  const treeOp = props.treeOp || {};
  const { nodeKey: treeNodeKey, props: treeProps, data = [], defaultExpandedKeys } = treeOp;
  const _a = treeOp, { defaultExpandAll, events = {} } = _a, others = __objRest(_a, ["defaultExpandAll", "events"]);
  const nodeKey = treeNodeKey || "id";
  const childrenKey = treeProps && treeProps.children || "children";
  return { data, nodeKey, childrenKey, defaultExpandedKeys, defaultExpandAll, events, others };
};
const flattenTreeData = ({ expandeds, data, nodeKey, childrenKey }) => {
  const chart = [];
  const stack = [];
  const flatChart = (treeData) => {
    if (Array.isArray(treeData) && treeData.length > 0) {
      treeData.forEach((item) => {
        chart.push([...stack, item]);
        if (expandeds.includes(item[nodeKey])) {
          stack.push(item);
          flatChart(item[childrenKey]);
          stack.pop(item);
        }
      });
    }
  };
  flatChart(data);
  return chart;
};
const computeVsBoxOptions = ({ props, expandeds, data, nodeKey, childrenKey }) => {
  const width = +props.width;
  const height = +props.height;
  const rowHeight = +props.rowHeight;
  const scrollbarSize = +props.scrollbarSize;
  const rows = flattenTreeData({ expandeds, data, nodeKey, childrenKey });
  const rowSizes = rows.map(() => rowHeight);
  const vsBoxOptions = {
    width,
    height,
    columns: ["c-1"],
    columnSizes: [width - scrollbarSize],
    rows,
    rowSizes,
    fixedColumns: [[], []],
    fixedRows: [[], []],
    spanConfig: [[]],
    scrollbarSize: props.scrollbarSize
  };
  return vsBoxOptions;
};
const computeState = ({ props, state }) => () => {
  const { data, nodeKey, childrenKey, defaultExpandedKeys, defaultExpandAll, events, others } = fromProps(props);
  let expandeds = [];
  if (!state._expandedsInited) {
    if (defaultExpandAll) {
      const traverse = (arr) => {
        arr.forEach((item) => {
          const key = item[nodeKey];
          const children = item[childrenKey];
          if (Array.isArray(children) && children.length) {
            expandeds.push(key);
            traverse(children);
          }
        });
      };
      if (Array.isArray(data) && data.length) {
        traverse(data);
      }
    } else if (Array.isArray(defaultExpandedKeys) && defaultExpandedKeys.length) {
      expandeds = [...defaultExpandedKeys];
    }
  }
  expandeds = state._expandedsInited ? state.expandeds : expandeds;
  const defaultProps = { showCheckEasily: false, willChangeView: false };
  const treeOptions = __spreadValues(__spreadProps(__spreadValues({}, others), { nodeKey, defaultExpandedKeys: expandeds }), defaultProps);
  const treeEvents = {};
  for (let key in events) {
    const eventKey = kebab(key);
    treeEvents[eventKey] = events[key];
  }
  const vsBoxOptions = computeVsBoxOptions({ props, expandeds, data, nodeKey, childrenKey });
  state.expandeds = expandeds;
  state.treeOptions = treeOptions;
  state.treeEvents = treeEvents;
  state.vsBoxOptions = vsBoxOptions;
  if (!state._expandedsInited) {
    state._expandedsInited = true;
  }
};
const shouldRender = (state) => (node) => {
  return node && node.data && state.renderRows.includes(node.data);
};
const onVsBoxChange = ({ props, state }) => ({ viewRows }) => {
  const rowHeight = +props.rowHeight;
  const renderRows = [];
  viewRows.forEach((viewRow) => {
    viewRow.info.raw.forEach((treeRow) => {
      if (!renderRows.includes(treeRow)) {
        renderRows.push(treeRow);
      }
    });
  });
  state.renderRows = renderRows;
  const firstViewRow = viewRows[0];
  if (firstViewRow) {
    const translateYValue = firstViewRow.info.offset - (firstViewRow.info.raw.length - 1) * rowHeight;
    state.treeStyle = { transform: `translateY(${translateYValue}px)` };
  }
};
const onTreeChange = ({ nextTick, props, state, vm }) => () => {
  const vsBoxVm = vm.$refs.vsBox;
  const treeVm = vm.$refs.tree;
  const { data, nodeKey, childrenKey } = fromProps(props);
  nextTick(() => {
    const expandeds = [];
    const traverse = (childNodes) => {
      if (Array.isArray(childNodes) && childNodes.length > 0) {
        childNodes.forEach((node) => {
          if (node.expanded) {
            expandeds.push(node.data[nodeKey]);
            traverse(node.childNodes);
          }
        });
      }
    };
    traverse(treeVm.state.root.childNodes);
    state.expandeds = expandeds;
    state.treeOptions = __spreadProps(__spreadValues({}, state.treeOptions), { defaultExpandedKeys: expandeds });
    state.vsBoxOptions = computeVsBoxOptions({ props, expandeds, data, nodeKey, childrenKey });
    setTimeout(() => vsBoxVm.refresh({ isKeepScrollTop: true }));
  });
};
const getTreeInstance = (vm) => () => vm.$refs.tree;
const keepExpandStatus = (state) => () => {
  state._keepExpandStatus = true;
};
const keepScrollTop = (state) => () => {
  state._keepScrollTop = true;
};
const refresh = ({ api, state, vm }) => () => {
  const isKeepExpandStatus = state._keepExpandStatus || false;
  const isKeepScrollTop = state._keepScrollTop || false;
  if (!isKeepExpandStatus) {
    state._expandedsInited = false;
  }
  api.computeState();
  const vsBoxVm = vm.$refs.vsBox;
  if (vsBoxVm) {
    setTimeout(() => vsBoxVm.refresh({ isKeepScrollTop }));
  }
  if (state._keepExpandStatus)
    state._keepExpandStatus = false;
  if (state._keepScrollTop)
    state._keepScrollTop = false;
};
export {
  computeState,
  getTreeInstance,
  keepExpandStatus,
  keepScrollTop,
  onTreeChange,
  onVsBoxChange,
  refresh,
  shouldRender
};
