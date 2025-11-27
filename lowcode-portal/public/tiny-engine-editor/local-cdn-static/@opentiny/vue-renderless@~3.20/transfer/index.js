import "../chunk-G2ADBYYC.js";
import { copyArray } from './../common/object.js';
const getObj = props => () => props.data.reduce((o, cur) => (o[cur[props.props.key]] = cur) && o, {});
const getSourceData = ({
  props,
  Tree
}) => () => {
  if (props.render && props.render.plugin.name === Tree) {
    return props.data;
  }
  return props.data.filter(item => !props.modelValue.includes(item[props.props.key]));
};
const getFlatData = (data, hasChildren) => {
  const nodes = [];
  const getChild = data2 => {
    data2.forEach(node => {
      nodes.push(node);
      if (node.children && node.children.length > 0) {
        getChild(node.children);
      }
    });
  };
  getChild(data);
  if (hasChildren) {
    nodes.forEach(item => {
      if (item.children) {
        delete item.children;
      }
    });
  }
  return nodes;
};
const getTargetData = ({
  props,
  state,
  Tree,
  Table
}) => () => {
  if (props.render && props.render.plugin.name === Tree) {
    const nodes = getFlatData(copyArray(props.data), true);
    const rightData = nodes.filter(item => props.modelValue.includes(item[props.props.key]));
    const sortAry = [];
    props.modelValue.forEach(value => {
      sortAry.push(rightData.filter(item => item[props.props.key] === value)[0]);
    });
    sortAry.flag = "sort";
    return sortAry;
  }
  if (props.targetOrder === "original") {
    return props.data.filter(item => props.modelValue.includes(item[props.props.key]));
  } else {
    const data = props.modelValue.reduce((arr, cur) => {
      const val = state.dataObj[cur];
      if (val) {
        arr.push(val);
      }
      return arr;
    }, []);
    if (props.render && props.render.plugin.name === Table) {
      data.flag = "table";
    }
    return data;
  }
};
const onSourceCheckedChange = ({
  emit,
  state
}) => (val, movedKeys) => {
  state.leftChecked = val;
  if (movedKeys === void 0) {
    return;
  }
  emit("left-check-change", val, movedKeys);
};
const onTargetCheckedChange = ({
  emit,
  state
}) => (val, movedKeys) => {
  state.rightChecked = val;
  if (movedKeys === void 0) {
    return;
  }
  emit("right-check-change", val, movedKeys);
};
const addToLeft = ({
  emit,
  props,
  state
}) => value => {
  const change = () => {
    state.isToLeft = true;
    let currentValue = props.modelValue.slice();
    if (value === "all") {
      state.rightChecked = state.rightData.map(item => item[props.props.key]);
    }
    state.rightChecked.forEach(item => {
      const index = currentValue.indexOf(item);
      if (index > -1) {
        currentValue.splice(index, 1);
      }
    });
    state.rightChecked = state.rightChecked.slice(0);
    emit("update:modelValue", currentValue);
    emit("change", currentValue, "left", state.rightChecked);
  };
  props.beforeTransfer ? props.beforeTransfer(change) : change();
};
const addToRight = ({
  emit,
  refs,
  props,
  state,
  Tree
}) => value => {
  const change = () => {
    state.isToLeft = false;
    let currentValue = props.modelValue.slice();
    const itemsToBeMoved = [];
    const key = props.props.key;
    if (props.render && props.render.plugin.name === Tree) {
      if (!props.treeOp.checkStrictly) {
        currentValue = refs.leftPanel.$refs.plugin.getCheckedKeys();
      } else {
        state.leftChecked.forEach(item => !currentValue.includes(item) && currentValue.push(item));
      }
    } else {
      if (value === "all") {
        state.leftData.forEach(item => {
          const itemKey = item[key];
          if (!props.modelValue.includes(itemKey)) {
            itemsToBeMoved.push(itemKey);
          }
        });
        state.leftChecked = itemsToBeMoved.slice();
      } else {
        props.data.forEach(item => {
          const itemKey = item[key];
          if (state.leftChecked.includes(itemKey) && !props.modelValue.includes(itemKey)) {
            itemsToBeMoved.push(itemKey);
          }
        });
      }
      currentValue = props.targetOrder === "unshift" ? itemsToBeMoved.concat(currentValue) : currentValue.concat(itemsToBeMoved);
    }
    state.rightDisabled = false;
    emit("update:modelValue", currentValue);
    emit("change", currentValue, "right", state.leftChecked);
  };
  props.beforeTransfer ? props.beforeTransfer(change) : change();
};
const clearQuery = refs => which => {
  if (which === "left") {
    refs.leftPanel.state.query = "";
  } else if (which === "right") {
    refs.rightPanel.state.query = "";
  }
};
const logicFun = ({
  props,
  emit,
  state,
  vm
}) => ({
  event,
  isAdd,
  pullMode
}) => {
  let currentValue = props.modelValue.slice();
  let movedKeys = [];
  if (pullMode) {
    currentValue.splice(event.newIndex, 0, currentValue.splice(event.oldIndex, 1)[0]);
  } else {
    const rightPanel = vm.$refs.rightPanel;
    const leftPanel = vm.$refs.leftPanel;
    const key = isAdd ? rightPanel.state.filteredData[event.oldIndex][props.props.key] : leftPanel.state.filteredData[event.oldIndex][props.props.key];
    const index = isAdd ? state.rightChecked.indexOf(key) : state.leftChecked.indexOf(key);
    const valueIndex = currentValue.indexOf(key);
    if (isAdd) {
      ~valueIndex && currentValue.splice(valueIndex, 1);
    } else {
      !~valueIndex && currentValue.splice(event.newIndex, 0, key);
    }
    if (~index) {
      isAdd ? state.rightChecked.splice(index, 1) : state.leftChecked.splice(index, 1);
    }
    movedKeys = [key];
  }
  state.rightChecked = state.rightChecked.slice(0);
  emit("update:modelValue", currentValue);
  emit("change", currentValue, "left", movedKeys);
};
const sortableEvent = ({
  api,
  droppanel,
  props,
  queryDom,
  refs
}) => () => {
  if (props.dropConfig) {
    const leftPanel = refs.leftPanel.$el.querySelector(droppanel);
    const Sortable = props.dropConfig.plugin;
    new Sortable(leftPanel, {
      group: "sorting",
      handle: queryDom,
      sort: false,
      filter: ".is-disabled",
      onAdd(event) {
        api.logicFun({
          event,
          isAdd: true
        });
      },
      onRemove(event) {
        api.logicFun({
          event,
          isAdd: false
        });
      }
    });
    const rightPanle = refs.rightPanel.$el.querySelector(droppanel);
    new Sortable(rightPanle, {
      group: "sorting",
      handle: queryDom,
      sort: true,
      filter: ".is-disabled",
      onUpdate(event) {
        if (event.pullMode) {
          return;
        }
        api.logicFun({
          event,
          pullMode: "sort"
        });
      }
    });
  }
};
const getLeftCheckedData = ({
  props,
  state
}) => () => state.sourceData.filter(item => !item[props.props.disabled]);
const getRightCheckedData = ({
  props,
  state
}) => () => state.targetData.filter(item => !item[props.props.disabled]);
export { addToLeft, addToRight, clearQuery, getFlatData, getLeftCheckedData, getObj, getRightCheckedData, getSourceData, getTargetData, logicFun, onSourceCheckedChange, onTargetCheckedChange, sortableEvent };