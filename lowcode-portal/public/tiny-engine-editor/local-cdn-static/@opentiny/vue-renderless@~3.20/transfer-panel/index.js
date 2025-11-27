import "../chunk-G2ADBYYC.js";
import { copyArray } from './../common/object.js';
import { getFlatData } from './../transfer/index.js';
const showFilterData = (data, sign) => {
  const getChild = (data2, sign2) => data2.filter(node => {
    if (node.children && node.children.length > 0) {
      node.children = getChild(node.children, sign2);
    }
    return node[sign2];
  });
  return getChild(data, sign);
};
const getFilterData = ({
  api,
  props,
  state,
  Table,
  Tree
}) => () => {
  if (state.renderType === Table) {
    let tableData = [];
    if (props.filterMethod) {
      tableData = props.data.filter(item => props.filterMethod(state.query, item));
    } else {
      tableData = props.data;
    }
    state.pagerTotal = tableData;
    if (props.showPager) {
      const pageSize = state.sizes || 10;
      const totalPageCount = Math.ceil(tableData.length / pageSize);
      if (state.internalPage > totalPageCount) {
        api.handlePageChange(totalPageCount);
      }
      if (totalPageCount > 0 && state.internalPage === 0) {
        state.internalPage = 1;
      }
      if (totalPageCount > 0 && state.currentPage === 0) {
        state.currentPage = 1;
      }
      return tableData.slice((state.internalPage - 1) * pageSize, pageSize * state.internalPage);
    } else {
      return tableData;
    }
  } else if (state.renderType === Tree) {
    return showFilterData(api.getFilterTreeData(copyArray(props.data)), "visible");
  } else {
    return props.data.filter(item => {
      if (typeof props.filterMethod === "function") {
        return props.filterMethod(state.query, item);
      } else {
        const label = item[state.labelProp] || item[state.keyProp].toString();
        return label.toLowerCase().includes(state.query.toLowerCase());
      }
    });
  }
};
const getCheckableData = ({
  api,
  state,
  Tree
}) => () => {
  if (state.renderType === Tree) {
    return api.getTreeCheckableData(state.filteredData);
  } else {
    return state.filteredData.filter(item => !item[state.disabledProp]);
  }
};
const getCheckedSummary = ({
  props,
  state,
  Tree
}) => () => {
  const checkedLength = state.checked.length;
  let dataLength = 0;
  if (state.renderType === Tree) {
    dataLength = getFlatData(copyArray(props.data)).length;
  } else {
    dataLength = props.data.length;
  }
  const {
    noChecked,
    hasChecked
  } = props.format;
  if (noChecked && hasChecked) {
    return checkedLength > 0 ? hasChecked.replace(/\${checked}/g, checkedLength).replace(/\${total}/g, dataLength) : noChecked.replace(/\${checked}/g, checkedLength).replace(/\${total}/g, dataLength);
  } else {
    return `${checkedLength} / ${dataLength}`;
  }
};
const getDeteminate = state => () => state.checked.length > 0 && state.checked.length < state.checkableData.length;
const watchChecked = ({
  api,
  emit,
  state
}) => ({
  value,
  oldvalue
}) => {
  api.updateAllChecked();
  if (state.checkChangeByUser) {
    const movedKeys = value.concat(oldvalue).filter(v => !value.includes(v) || !oldvalue.includes(v));
    emit("checked-change", value, movedKeys);
  } else {
    emit("checked-change", value);
    state.checkChangeByUser = true;
  }
};
const watchData = ({
  api,
  props,
  state,
  Tree
}) => value => {
  state.pagerTotal = value;
  const checked = [];
  if (state.renderType === Tree && !props.treeOp.checkStrictly) {
    state.checked = api.getStrictData(state.filteredData).keys;
  } else {
    const filteredDataKeys = state.filteredData.map(item => item[state.keyProp]);
    state.checked.forEach(item => {
      if (filteredDataKeys.includes(item)) {
        checked.push(item);
      }
    });
    state.checkChangeByUser = false;
    state.checked = checked;
  }
};
const watchDefaultCheckded = ({
  api,
  props,
  state,
  Tree
}) => ({
  value,
  oldvalue
}) => {
  if (oldvalue && value.length === oldvalue.length && value.every(item => oldvalue.includes(item))) {
    return;
  }
  if (state.renderType === Tree && !props.treeOp.checkStrictly) {
    if (!state.render) {
      return;
    }
    state.render.defaultCheckedKeys = state.checked = api.getStrictData(state.filteredData).keys;
  } else {
    const checked = [];
    const checkableDataKeys = state.checkableData.map(item => item[state.keyProp]);
    value.forEach(item => {
      if (checkableDataKeys.includes(item)) {
        checked.push(item);
      }
    });
    state.checkChangeByUser = false;
    state.checked = checked;
  }
};
const updateAllChecked = ({
  state,
  Table,
  Tree
}) => () => {
  const checkableDataKeys = state.checkableData.map(item => item[state.keyProp]);
  state.allChecked = checkableDataKeys && checkableDataKeys.length > 0 && checkableDataKeys.every(item => state.checked.includes(item));
  if (state.renderType === Table || state.renderType === Tree) {
    state.render.data = state.filteredData;
    if (state.renderType === Tree) {
      state.render.defaultCheckedKeys = state.checked;
    } else {
      const pageCheckedKeys = [];
      state.filteredData.forEach(data => {
        state.checked.includes(data[state.keyProp]) && pageCheckedKeys.push(data[state.keyProp]);
      });
      state.render.defaultChecked = pageCheckedKeys;
    }
  }
};
const handleAllCheckedChange = ({
  state,
  Table,
  Tree,
  vm
}) => value => {
  state.checked = value ? state.checkableData.map(item => item[state.keyProp]) : [];
  if (state.renderType === Table) {
    state.render.defaultChecked = state.checked;
  } else if (state.renderType === Tree) {
    state.checked.length !== 0 ? state.render.defaultCheckedKeys = state.checked : vm.$refs.plugin.setCheckedKeys(state.checked);
  }
};
const clearQuery = state => () => {
  if (state.inputIcon === "circle-close") {
    state.query = "";
  }
};
const checkedEvent = state => (value, disabled) => {
  if (disabled) {
    return;
  }
  const index = state.checked.indexOf(value);
  let tmpArray = [...state.checked];
  if (~index) {
    tmpArray.splice(index, 1);
    state.checked = tmpArray;
  } else {
    tmpArray.push(value);
    state.checked = tmpArray;
  }
};
const setPosition = ({
  parent,
  state
}) => (trend, event) => {
  event.stopPropagation();
  event.preventDefault();
  const checkedKey = [];
  const uncheckedKey = [];
  state.filteredData.forEach(item => {
    if (~state.checked.indexOf(item[state.keyProp])) {
      checkedKey.push(item[state.keyProp]);
    } else {
      uncheckedKey.push(item[state.keyProp]);
    }
  });
  const result = trend === "up" ? [...checkedKey, ...uncheckedKey] : [...uncheckedKey, ...checkedKey];
  parent.$parent.$emit("update:modelValue", result);
};
const selectChange = state => keys => state.checked = keys;
const handlePageChange = state => currentPage => {
  state.pageChangeData = true;
  state.internalPage = currentPage;
  state.currentPage = currentPage;
};
const getFilterTreeData = ({
  props,
  state
}) => data => {
  const getChild = (data2, query) => {
    data2.forEach(node => {
      const label = node[state.labelProp];
      if (typeof props.treeOp.filterNodeMethod === "function") {
        const result = props.treeOp.filterNodeMethod(state.query, node);
        if (typeof result !== "boolean") {
          node.visible = true;
        } else {
          node.visible = result;
        }
      } else {
        node.visible = label.toLowerCase().includes(query.toLowerCase());
      }
      if (node.children && node.children.length > 0) {
        getChild(node.children, query);
      }
      if (!node.visible && node.children && node.children.length) {
        let allHidden = true;
        allHidden = !node.children.some(child => child.visible);
        node.visible = allHidden === false;
      }
    });
  };
  getChild(data, state.query);
  return data;
};
const getTreeCheckableData = state => data => {
  const nodes = [];
  const getChild = data2 => {
    data2.forEach(node => {
      !node[state.disabledProp] && nodes.push(node);
      if (node.children && node.children.length > 0) {
        getChild(node.children);
      }
    });
  };
  getChild(data);
  return nodes;
};
const getStrictData = ({
  props,
  state
}) => data => {
  const keys = [];
  const strictData = (data2, isStrict) => {
    data2.forEach(node => {
      if (props.defaultChecked.includes(node[state.keyProp])) {
        node.isCheckable = true;
        keys.push(node[state.keyProp]);
      } else {
        node.isCheckable = isStrict;
        isStrict && keys.push(node[state.keyProp]);
      }
      if (node.children && node.children.length > 0) {
        strictData(node.children, node.isCheckable);
      }
    });
  };
  strictData(data, false);
  return {
    data,
    keys
  };
};
const sizesChange = state => sizes => state.sizes = sizes;
const setExpandCache = state => (node, expand) => {
  const {
    expanded,
    keyProp
  } = state;
  const index = state.expanded.indexOf(node[keyProp]);
  if (expand) {
    index === -1 && expanded.push(node[keyProp]);
  } else {
    index !== -1 && expanded.splice(index, 1);
  }
};
export { checkedEvent, clearQuery, getCheckableData, getCheckedSummary, getDeteminate, getFilterData, getFilterTreeData, getStrictData, getTreeCheckableData, handleAllCheckedChange, handlePageChange, selectChange, setExpandCache, setPosition, showFilterData, sizesChange, updateAllChecked, watchChecked, watchData, watchDefaultCheckded };