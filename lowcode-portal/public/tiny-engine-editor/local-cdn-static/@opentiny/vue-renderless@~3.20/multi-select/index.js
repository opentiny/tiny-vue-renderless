import { __spreadProps, __spreadValues } from "../chunk-G2ADBYYC.js";
import { cloneDeep } from './../chart-core/deps/utils.js';
const initValue = ({
  props,
  emit
}) => () => {
  const {
    modelValue,
    dataSource = [],
    disabled
  } = props;
  if (disabled) {
    return;
  }
  let value = [];
  dataSource == null ? void 0 : dataSource.forEach((data, index) => {
    const isArrayVal = Array.isArray(modelValue[index]);
    if (data.multiple) {
      value.push(isArrayVal ? modelValue[index] : []);
    } else {
      value.push(isArrayVal ? "" : modelValue[index] || "");
    }
  });
  emit("update:modelValue", value);
};
const updateValue = ({
  state,
  props,
  emit
}) => value => {
  const activeIndex = state.headerIndex;
  const values = cloneDeep(props.modelValue);
  if (!values) {
    return;
  }
  if (Array.isArray(values[state.headerIndex])) {
    const currentVal = values[activeIndex];
    values[activeIndex] = currentVal.includes(value) ? currentVal.filter(i => i !== value) : [...currentVal, value];
  } else {
    values[activeIndex] = value;
  }
  emit("update:modelValue", values);
};
const getOption = (options, target) => {
  var _a;
  for (const option of options) {
    if (option.value === target) {
      return option;
    }
    if ((_a = option.children) == null ? void 0 : _a.length) {
      const result = getOption(option.children, target);
      if (result) {
        return result;
      }
    }
  }
  return null;
};
const updateTitle = ({
  props,
  state
}) => () => {
  const {
    modelValue = [],
    dataSource = []
  } = props;
  const {
    headerInfo
  } = state;
  modelValue.forEach((value, index) => {
    var _a;
    if (!dataSource[index].multiple) {
      headerInfo[index].title = ((_a = getOption(dataSource[index].options, value)) == null ? void 0 : _a.label) || headerInfo[index].title;
    }
  });
};
const created = ({
  api,
  emit,
  props,
  state,
  refs,
  nextTick
}) => () => {
  nextTick(() => {
    state.dataSource = cloneDeep(props.dataSource);
    state.defaultSelectedArray = cloneDeep(props.defaultSelectedArray);
    state.labelLevelsInfo = getLabelLevelsInfo(refs);
    state.labelsStyle = getLabelsStyle(state);
    state.headerInfo = state.dataSource.map(item => {
      return {
        isSelected: false,
        title: item.title,
        isUP: false
      };
    });
    api.initValue({
      props,
      emit
    });
    if (props.type === "list") {
      state.dataSource.forEach((item, index) => {
        const {
          flattenData,
          dataMap
        } = getFlatOptions(item.options);
        item.options = flattenData;
        state.optionMap[index] = dataMap;
      });
    }
  });
};
const computedCurrentOptions = ({
  state,
  props
}) => () => {
  const {
    options = [],
    multiple
  } = state.dataSource[state.headerIndex] || {};
  const selectedValue = props.modelValue[state.headerIndex];
  options.forEach(item => {
    var _a;
    item.show = state.isSearching ? item.label.includes(state.searchValue) : ((_a = item.show) != null ? _a : parent == null ? void 0 : parent.expanded) || item.level === 0;
    item.active = multiple ? selectedValue.includes(item.value) : item.value === selectedValue;
  });
  return options.filter(i => i.show);
};
const getFlatOptions = options => {
  const flattenData = [];
  const dataMap = {};
  const getChild = (data, level = 0, parent2) => {
    data.forEach((item, index) => {
      var _a, _b;
      const id = parent2 ? parent2.id + index : String(index);
      const parentId = (parent2 == null ? void 0 : parent2.id) || "";
      const expanded = (parent2 == null ? void 0 : parent2.expanded) && ((_a = item.children) == null ? void 0 : _a.length) && item.expanded || false;
      const currentData = __spreadProps(__spreadValues({}, item), {
        id,
        level,
        expanded,
        parentId
      });
      flattenData.push(currentData);
      if ((_b = item.children) == null ? void 0 : _b.length) {
        getChild(item.children, level + 1, currentData);
      }
      dataMap[currentData.id] = item;
    });
  };
  getChild(options);
  flattenData.forEach(item => {
    if (item.children) {
      item.hasChild = item.children.length > 0;
      delete item.children;
    }
  });
  return {
    flattenData,
    dataMap
  };
};
const handleClick = ({
  api,
  props,
  state
}) => value => {
  var _a, _b, _c;
  if (props.disabled || props.dataSource[value].disabled) {
    return;
  }
  if (props.type === "wheel") {
    state.wheelData = (_a = props.dataSource[value]) == null ? void 0 : _a.options;
  }
  if (state.headerIndex === -1) {
    state.showOptions = true;
    state.headerIndex = value;
    state.headerInfo[value] = getNewHeaderInfo(state.headerInfo, value, true);
    state.defaultSelectedIndexs = (_b = state.defaultSelectedArray[value]) != null ? _b : api.loadDefault(value);
  } else if (state.headerIndex !== value) {
    state.showOptions = true;
    state.headerInfo[state.headerIndex] = getNewHeaderInfo(state.headerInfo, state.headerIndex, false);
    state.headerIndex = value;
    state.headerInfo[value] = getNewHeaderInfo(state.headerInfo, value, true);
    state.defaultSelectedIndexs = (_c = state.defaultSelectedArray[value]) != null ? _c : api.loadDefault(value);
  } else {
    state.showOptions = !state.showOptions;
    const {
      isUP
    } = state.headerInfo[value];
    state.headerInfo[value] = getNewHeaderInfo(state.headerInfo, value, !isUP);
  }
};
const handleOptionSelect = ({
  api,
  state,
  emit
}) => option => {
  api.updateValue(option.value);
  emit("item-click", state.optionMap[state.headerIndex][option.id], state.headerIndex);
  if (!state.dataSource[state.headerIndex].multiple) {
    api.handleClose();
  }
};
const handleSearchInput = ({
  state,
  emit
}) => () => {
  const {
    searchValue
  } = state;
  emit("update:searchValue", searchValue);
};
const toggleChildExpand = (state, parentId, index) => {
  const {
    options
  } = state.dataSource[state.headerIndex];
  for (let i = index + 1; i < options.length; i++) {
    if (options[i].parentId === parentId) {
      options[i].show = !options[i].show;
    } else {
      break;
    }
  }
};
const toggleItemExpand = ({
  state
}) => option => {
  const index = state.dataSource[state.headerIndex].options.findIndex(i => i.id === option.id);
  if (index !== -1) {
    const target = state.dataSource[state.headerIndex].options[index];
    target.expanded = !target.expanded;
    toggleChildExpand(state, target.id, index);
  }
};
const confirm = ({
  state,
  emit
}) => () => {
  const wheelLevelItems = getWheelLevelItems(state.wheelData, state.defaultSelectedIndexs);
  const {
    selectedLabels,
    selectedItems
  } = getSelected(wheelLevelItems, state.defaultSelectedIndexs);
  state.headerInfo[state.headerIndex] = {
    isSelected: true,
    title: selectedLabels,
    isUP: false
  };
  state.defaultSelectedArray[state.headerIndex] = state.defaultSelectedIndexs;
  emit("confirm", selectedItems, state.headerIndex, state.defaultSelectedIndexs);
  state.showOptions = false;
};
const reset = ({
  api,
  props,
  state,
  emit
}) => () => {
  var _a;
  state.headerInfo[state.headerIndex] = {
    isSelected: false,
    title: props.dataSource[state.headerIndex].title || "",
    isUP: false
  };
  state.defaultSelectedIndexs = (_a = props.defaultSelectedArray[state.headerIndex]) != null ? _a : api.loadDefault(state.headerIndex);
  state.defaultSelectedArray[state.headerIndex] = state.defaultSelectedIndexs;
  emit("reset", [], state.headerIndex, state.defaultSelectedIndexs);
  state.showOptions = false;
};
const handleClose = state => () => {
  state.showOptions = false;
  if (state.headerIndex !== -1) {
    state.headerInfo[state.headerIndex].isUP = false;
  }
};
const wheelChange = state => indexs => {
  state.defaultSelectedIndexs = indexs;
};
const clickWheelItem = ({
  state,
  emit
}) => (indexs, text, item) => {
  if (indexs.length === 0) {
    state.defaultSelectedIndexs = [-1];
    state.headerInfo[state.headerIndex] = {
      isSelected: false,
      title: "",
      isUP: false
    };
  } else {
    state.defaultSelectedIndexs = indexs;
    state.headerInfo[state.headerIndex] = {
      isSelected: true,
      title: text,
      isUP: false
    };
  }
  state.defaultSelectedArray[state.headerIndex] = state.defaultSelectedIndexs;
  emit("confirm", item, state.headerIndex, indexs);
  state.showOptions = false;
};
const getWheelLevelItems = (wheelData, newIndexs) => {
  const level_1 = wheelData;
  const level_n = getNextLevel([], wheelData, newIndexs, 0);
  let wheelLevelItems = [];
  if (level_n.length === 0) {
    wheelLevelItems = [level_1];
  } else {
    wheelLevelItems = [level_1, ...level_n];
  }
  return wheelLevelItems;
};
const getNextLevel = (levelItems, children, nextIndexs, start) => {
  var _a, _b;
  let levelItem = (_b = (_a = children[nextIndexs[start]]) == null ? void 0 : _a.children) != null ? _b : [];
  if (start !== nextIndexs.length - 1) {
    levelItems.push(levelItem);
    return getNextLevel(levelItems, levelItem, nextIndexs, ++start);
  } else {
    return levelItems;
  }
};
const getSelected = (wheelLevelItems, selectedIndexs) => {
  const selectedItems = [];
  wheelLevelItems.forEach((levelItem, i) => {
    const index = selectedIndexs[i];
    if (levelItem[index]) {
      selectedItems.push(levelItem[index]);
    }
  });
  const selectedLabels = selectedItems.map(item => item == null ? void 0 : item.label).join(" ");
  return {
    selectedLabels,
    selectedItems
  };
};
const loadDefault = ({
  props,
  state
}) => value => {
  var _a, _b;
  const current = (_a = props.defaultSelectedArray[value]) != null ? _a : [];
  let defaultSelectedIndexs = [];
  if ((_b = state.dataSource[state.headerIndex]) == null ? void 0 : _b.hasFooter) {
    const defaultL = current.length;
    const dataSL = getMaxFloor(state.wheelData);
    if (defaultL <= dataSL) {
      defaultSelectedIndexs = current.concat(new Array(dataSL - defaultL).fill(0));
    } else {
      defaultSelectedIndexs = current.slice(0, dataSL);
    }
  } else {
    defaultSelectedIndexs = current.length > 0 ? current : [-1];
  }
  return defaultSelectedIndexs;
};
const getMaxFloor = treeData => {
  let maxFloor = 0;
  const loop = (data, level) => {
    data.forEach(item => {
      var _a;
      item.level = level;
      if (level > maxFloor) {
        maxFloor = level;
      }
      if (((_a = item == null ? void 0 : item.children) == null ? void 0 : _a.length) > 0) {
        loop(item.children, level + 1);
      }
    });
  };
  loop(treeData, 1);
  return maxFloor;
};
const getNewHeaderInfo = (headerInfo, index, isUP) => {
  var _a, _b;
  return {
    isSelected: (_a = headerInfo[index]) == null ? void 0 : _a.isSelected,
    title: (_b = headerInfo[index]) == null ? void 0 : _b.title,
    isUP
  };
};
const getLabelLevelsInfo = refs => {
  const {
    headerBox,
    label
  } = refs;
  if (!headerBox || !label) return [];
  const totalWidth = getRect(getEl(headerBox)).width;
  const labelWidth = label.map(node => getRect(getEl(node))).map(rect => rect.width);
  return labelWidth.map((labelWidth2, idx) => {
    const isOver25 = totalWidth * 0.25 < labelWidth2;
    return {
      idx,
      labelWidth: labelWidth2,
      totalWidth,
      isOver25
    };
  });
};
const getRect = el => {
  return {
    top: el.offsetTop,
    left: el.offsetLeft,
    width: el.offsetWidth,
    height: el.offsetHeight
  };
};
const getEl = node => {
  return node.$el || node;
};
const getLabelsStyle = state => {
  const len = state.dataSource.length;
  if (len === 1) {
    return [{
      flex: 1,
      justifyContent: "space-between"
    }];
  }
  const over25Labels = state.labelLevelsInfo.filter(i => i && !i.isOver25);
  let widthInfo = over25Labels;
  if (len >= 4) {
    return getStyleConfig(state.labelLevelsInfo, {
      width: `${(1 / len * 100).toFixed(2)}%`
    });
  }
  if (!widthInfo.length || widthInfo.length === state.labelLevelsInfo.length) {
    return getStyleConfig(state.labelLevelsInfo, {
      maxWidth: `${(1 / len * 100).toFixed(2)}%`
    });
  }
  let fillArr;
  if (widthInfo.length === 1) {
    fillArr = getFillArray(state, widthInfo, "37.5%");
  } else if (widthInfo.length === 2) {
    fillArr = getFillArray(state, widthInfo, "50%");
  }
  widthInfo = widthInfo.concat(fillArr);
  return widthInfo.reduce((styles, item) => {
    styles[item.idx] = item.maxWidth ? {
      maxWidth: item.maxWidth
    } : {
      maxWidth: "25%"
    };
    return styles;
  }, {});
};
const getStyleConfig = (data, style) => {
  return data.reduce((styleConfig, _, idx) => {
    styleConfig[idx] = style;
    return styleConfig;
  }, {});
};
const getFillArray = (state, widthInfo, maxWidth) => {
  const labelIndexArr = state.labelLevelsInfo.map((_, idx) => idx);
  const mapWidthInfoArr = widthInfo.map(i => i.idx);
  return labelIndexArr.filter(i => !mapWidthInfoArr.includes(i)).map(i => {
    return {
      idx: i,
      maxWidth
    };
  });
};
const handleSearchBtnClick = ({
  props,
  state,
  nextTick,
  vm
}) => () => {
  if (props.disabled) {
    return;
  }
  state.isSearching = !state.isSearching;
  nextTick(() => {
    if (state.isSearching) {
      vm.$refs.searchInput.focus();
    }
  });
};
export { clickWheelItem, computedCurrentOptions, confirm, created, getEl, getFillArray, getLabelLevelsInfo, getLabelsStyle, getMaxFloor, getNewHeaderInfo, getNextLevel, getOption, getRect, getSelected, getStyleConfig, getWheelLevelItems, handleClick, handleClose, handleOptionSelect, handleSearchBtnClick, handleSearchInput, initValue, loadDefault, reset, toggleItemExpand, updateTitle, updateValue, wheelChange };