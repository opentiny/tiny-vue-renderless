import { __spreadProps, __spreadValues } from "../chunk-G2ADBYYC.js";
import { find } from './../common/array.js';
const filter = ({
  vm
}) => value => {
  vm.$refs.treeRef.filter(value);
};
const nodeClick = ({
  props,
  vm,
  emit
}) => data => {
  if (!props.multiple) {
    vm.$refs.baseSelectRef.updateSelectedData(__spreadProps(__spreadValues({}, data), {
      currentLabel: data[props.textField],
      value: data[props.valueField],
      state: {
        currentLabel: data[props.textField]
      }
    }));
    emit("change", data[props.valueField]);
    emit("update:modelValue", data[props.valueField]);
    vm.$refs.baseSelectRef.hidePanel();
  }
};
const check = ({
  props,
  vm,
  emit
}) => (data, {
  checkedNodes
}) => {
  if (props.multiple) {
    const currentValue = [];
    vm.$refs.baseSelectRef.updateSelectedData(checkedNodes.map(node => {
      currentValue.push(node[props.valueField]);
      return __spreadProps(__spreadValues({}, node), {
        currentLabel: node[props.textField],
        value: node[props.valueField],
        isTree: true
      });
    }));
    emit("change", currentValue);
    emit("update:modelValue", currentValue);
  }
};
const getTreeData = ({
  props,
  state
}) => data => {
  const nodes = [];
  const getChild = (data2, pId) => {
    data2.forEach(node => {
      node.pId = pId;
      nodes.push(node);
      if (node[state.childrenName] && node[state.childrenName].length > 0) {
        getChild(node[state.childrenName], node[props.valueField]);
      }
    });
  };
  getChild(data, null);
  return nodes;
};
const getPluginOption = ({
  api,
  props,
  state
}) => value => {
  const isRemote = (props.filterable || props.searchable) && props.remote && (typeof props.remoteMethod === "function" || typeof props.initQuery === "function");
  const {
    textField,
    valueField
  } = props;
  const sourceData = isRemote ? state.remoteData : api.getTreeData(state.treeData);
  const selNode = find(sourceData, item => item[valueField] === value);
  const items = [];
  if (selNode) {
    selNode.currentLabel = selNode[textField];
    items.push(selNode);
  }
  return items;
};
const getCheckedData = ({
  props,
  state
}) => () => {
  const checkedKey = [];
  if (!Array.isArray(state.selected)) {
    return props.modelValue ? [props.modelValue] : [state.selected[props.valueField]];
  } else {
    state.selected.length > 0 && state.selected.forEach(item => {
      checkedKey.push(item[props.valueField]);
    });
    return checkedKey;
  }
};
const mounted = ({
  api,
  state,
  props,
  vm
}) => () => {
  if (!state.value || state.value.length === 0) return;
  if (props.multiple) {
    let initialNodes = [];
    if (Array.isArray(state.value)) {
      state.value.forEach(value => {
        const option = api.getPluginOption(value);
        initialNodes = initialNodes.concat(option);
      });
    }
    vm.$refs.baseSelectRef.updateSelectedData(initialNodes.map(node => {
      return __spreadProps(__spreadValues({}, node), {
        currentLabel: node[props.textField],
        value: node[props.valueField],
        isTree: true
      });
    }));
    state.defaultCheckedKeys = api.getCheckedData()[0];
  } else {
    const data = api.getPluginOption(state.value)[0];
    vm.$refs.baseSelectRef.updateSelectedData(__spreadProps(__spreadValues({}, data), {
      currentLabel: data[props.textField],
      value: data[props.valueField],
      state: {
        currentLabel: data[props.textField]
      }
    }));
    state.currentKey = data[props.valueField];
  }
};
export { check, filter, getCheckedData, getPluginOption, getTreeData, mounted, nodeClick };