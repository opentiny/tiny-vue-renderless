import "../chunk-G2ADBYYC.js";
import { find } from './../common/array.js';
import { typeOf, isNull } from './../common/type.js';
import { getDataset } from './../common/dataset/index.js';
import { isNullOrEmpty } from './../common/string.js';
import { isEqual } from './../common/object.js';
import { eachTree } from './../grid/static/index.js';
import { on, off } from './../common/deps/dom.js';
const computedGetTitle = ({
  constants,
  props,
  t
}) => props.title || t(constants.TITLE);
const computedModalWidth = ({
  constants,
  props
}) => {
  let modalWidth = 0;
  if (props.multi) {
    modalWidth = parseInt(props.width, 10) > constants.MODAL_WIDTH.multi ? `${parseInt(props.width, 10)}px` : `${constants.MODAL_WIDTH.multi}px`;
  } else {
    modalWidth = parseInt(props.width, 10) > constants.MODAL_WIDTH.radio ? `${parseInt(props.width, 10)}px` : `${constants.MODAL_WIDTH.radio}px`;
  }
  return modalWidth;
};
const createSearchForm = props => isRest => props.conditions.reduce((acc, item) => {
  if (typeof item.field === "string") {
    if (isRest) {
      acc[item.field] = "";
    } else {
      acc[item.field] = item.defaultValue ? item.defaultValue : "";
    }
  }
  return acc;
}, {});
const getColumns = ({
  constants,
  props
}) => {
  const {
    columns: preColumns
  } = props.gridOp;
  const columns = preColumns.slice(0);
  const selectionCol = find(columns, col => col.type === constants.COLUMNS_TYPE.selection || col.type === constants.COLUMNS_TYPE.radio);
  if (selectionCol) {
    selectionCol.type = props.multi ? constants.COLUMNS_TYPE.selection : constants.COLUMNS_TYPE.radio;
  } else {
    const indexCol = find(columns, col => col.type === constants.COLUMNS_TYPE.index);
    const index = indexCol ? 1 : 0;
    columns.splice(index, 0, {
      type: props.multi ? constants.COLUMNS_TYPE.selection : constants.COLUMNS_TYPE.radio,
      width: columns.length ? constants.COLUMNS_TYPE.width : ""
    });
  }
  return columns;
};
const getDisplay = ({
  constants,
  props,
  state
}) => () => {
  if (props.popseletor === constants.TYPE_TREE) {
    return state.treeSelectList.map(node => node.value).join(props.textSplit);
  } else if (props.multi) {
    const displayTxt = [];
    state.selectedValues.forEach(val => {
      const item = find(state.selectedDatas, data => String(val) === String(data[props.valueField]));
      if (item) {
        displayTxt.push(item[props.textField]);
      } else {
        displayTxt.push(val);
      }
    });
    return displayTxt.join(props.textSplit);
  } else {
    if (isNull(state.selectedDatas)) {
      return "";
    } else {
      return typeOf(state.selectedDatas) === "object" ? state.selectedDatas[props.textField] : state.selectedDatas;
    }
  }
};
const getMultiSelectedData = ({
  props,
  state
}) => () => {
  const values = [];
  state.selectedDatas.forEach(item => {
    item[props.valueField] && values.push(item[props.valueField]);
  });
  state.commitValue = Array.isArray(props.modelValue) ? values : values.join(props.valueSplit);
};
const getRadioSelectedData = ({
  constants,
  props,
  state,
  vm
}) => () => {
  const refs = vm.$refs;
  const table = props.showHistory && state.activeName === "history" ? refs[constants.GRID_REF.history] : refs[constants.GRID_REF.source];
  const radioRow = table && table.getRadioRow();
  if (radioRow) {
    state.selectedDatas = radioRow;
  }
  state.commitValue = state.selectedDatas ? state.selectedDatas[props.valueField] : "";
};
const handleClear = ({
  constants,
  emit,
  props,
  state
}) => () => {
  if (state.disabled) {
    return;
  }
  state.display = "";
  state.commitValue = Array.isArray(props.modelValue) ? [] : "";
  state.treeSelectList = [];
  state.selectedDatas = [];
  state.selectedValues = [];
  state.cacheStore.treeSelectList = [];
  if (!isEqual(state.commitValue, props.modelValue)) {
    emit("update:modelValue", state.commitValue);
    emit("change", state.commitValue, props.popseletor === constants.TYPE_GRID ? state.treeSelectList : state.selectedDatas);
  }
};
const handleConfirm = ({
  api,
  constants,
  emit,
  props,
  state
}) => skipBeforeClose => {
  if (skipBeforeClose !== true && typeof props.beforeClose === "function" && props.beforeClose("confirm") === false) {
    return;
  }
  if (props.autoReset) {
    handleReset({
      api,
      state,
      props
    })();
  }
  if (props.popseletor === constants.TYPE_GRID) {
    props.multi ? api.getMultiSelectedData({
      props,
      state
    }) : api.getRadioSelectedData();
    if (!isNull(state.commitValue)) {
      state.display = api.getDisplay({
        props,
        state
      });
      if (!isEqual(state.commitValue, props.modelValue)) {
        state.display = "";
        emit("update:modelValue", state.commitValue);
        emit("change", state.commitValue, state.selectedDatas);
      }
    }
  }
  if (props.popseletor === constants.TYPE_TREE) {
    const commitValue = state.treeSelectList.map(item => item.id).join(props.valueSplit);
    state.cacheStore = {
      treeSelectList: state.treeSelectList.slice(0)
    };
    if (!isEqual(commitValue, props.modelValue)) {
      emit("update:modelValue", commitValue);
      emit("change", commitValue, state.treeSelectList);
    }
  }
  state.open = false;
};
const handleReset = ({
  api,
  state,
  props
}) => () => {
  state.search = api.createSearchForm(true);
  if (state.filterText) {
    state.filterText = "";
  }
  if (!props.beforeReset || typeof props.beforeReset === "function" && props.beforeReset(state.conditions) !== false) {
    api.handleSearch();
  }
};
const handleOpen = ({
  api,
  constants,
  props,
  state
}) => event => {
  if (event.target.tagName === constants.TAG_NAME && state.readonly) {
    api.openDialog({
      api,
      props,
      state
    });
  }
};
const handleSearch = ({
  api,
  vm,
  constants
}) => () => {
  const sourcetable = vm.$refs[constants.GRID_REF.source];
  sourcetable && sourcetable.clearRadioRow();
  api.query();
};
const cancelOrClose = ({
  props,
  state,
  constants
}) => {
  state.open = false;
  if (props.popseletor === constants.TYPE_TREE) {
    const {
      treeSelectList
    } = state.cacheStore;
    state.treeSelectList = treeSelectList.slice(0);
  } else {
    if (props.multi) {
      const {
        selectedDatas,
        selectedValues
      } = state.cacheStore;
      state.selectedDatas = selectedDatas.slice(0);
      state.selectedValues = selectedValues.slice(0);
    }
  }
};
const handleCancel = ({
  props,
  state,
  constants
}) => () => {
  if (typeof props.beforeClose === "function" && props.beforeClose("cancel") === false) {
    return;
  }
  cancelOrClose({
    props,
    state,
    constants
  });
};
const handleBeforeClose = ({
  props,
  state,
  constants
}) => () => {
  if (typeof props.beforeClose === "function" && props.beforeClose("close") === false) {
    return false;
  }
  cancelOrClose({
    props,
    state,
    constants
  });
};
const handleSizeChange = ({
  api,
  emit,
  state
}) => val => {
  state.pagerConfig.currentPage = val;
  api.handlePager();
  emit("page-change", val);
};
const renderTextHandler = ({
  state,
  props,
  datas,
  dataset,
  value
}) => {
  const rows = [];
  let arrValues;
  if (Array.isArray(value)) {
    arrValues = value.slice(0);
  } else {
    arrValues = value && ~["string", "number"].indexOf(typeof value) ? value.toString().split(props.valueSplit) : [];
  }
  arrValues.forEach(val => {
    const item = find(dataset, data => String(val) === String(data[props.valueField])) || find(datas, data => String(val) === String(data[props.valueField]));
    item && rows.push(item);
  });
  if (props.multi) {
    state.selectedValues = arrValues;
    state.selectedDatas = rows;
    state.cacheStore = {
      selectedDatas: rows.slice(0),
      selectedValues: arrValues.slice(0)
    };
  } else {
    state.selectedDatas = rows[0];
    state.commitValue = state.selectedDatas ? state.selectedDatas[props.valueField] : "";
  }
};
const getTreeSelectList = ({
  value,
  state,
  props
}) => {
  value = typeOf(value) === "number" ? isNaN(value) ? "" : String(value) : value;
  let treeSelectList = [];
  if (!isNullOrEmpty(value)) {
    const values = value.split(props.valueSplit);
    const selectdTreeNodeList = [];
    const {
      id,
      label,
      children
    } = state.treeOp.props;
    eachTree(state.treeOp.data, node => {
      if (values.includes(String(node[id]))) {
        selectdTreeNodeList.push({
          id: node[id],
          value: node[label]
        });
      }
    }, {
      children
    });
    if (selectdTreeNodeList.length) {
      treeSelectList = selectdTreeNodeList;
    }
  }
  return treeSelectList;
};
const initDisplay = ({
  api,
  constants,
  props,
  state,
  nextTick
}) => value => {
  const dataset = props.remoteSearch || props.dataset ? state.sourceGridDataset.concat(state.selectedDatas || "") : props.gridOp && props.gridOp.data || [];
  const getRenderTextData = props.textRenderSource || (() => Promise.resolve([]));
  if (props.popseletor !== constants.TYPE_TREE && (props.multi || props.textRenderSource)) {
    getRenderTextData(value).then(datas => {
      renderTextHandler({
        state,
        props,
        datas,
        dataset,
        value
      });
      nextTick(() => {
        state.display = api.getDisplay({
          props,
          state
        });
      });
    });
  } else {
    const item = find(dataset, data => String(value) === String(data[props.valueField]));
    state.selectedDatas = item || value;
    if (props.popseletor === constants.TYPE_GRID) {
      state.commitValue = state.selectedDatas ? state.selectedDatas[props.valueField] : "";
    } else if (props.popseletor === constants.TYPE_TREE) {
      const treeSelectList = getTreeSelectList({
        value,
        state,
        props
      });
      state.treeSelectList = treeSelectList;
      state.cacheStore = {
        treeSelectList: treeSelectList.slice(0)
      };
    }
    nextTick(() => {
      state.display = api.getDisplay({
        props,
        state
      });
    });
  }
};
const openDialog = ({
  api,
  props,
  state,
  emit,
  nextTick
}) => () => {
  if (state.disabled) {
    return;
  }
  state.closeSuggestPanelInvoker = "openDialog";
  api.closeSuggestPanel(true);
  state.open = true;
  state.showContent = true;
  emit("popup");
  props.autoLookup && props.alwaysLoad && api.query();
  nextTick(() => {
    api.computedTreeMaxHeight();
  });
};
const localFilter = ({
  props,
  state
}) => {
  const keys = Object.keys(state.search);
  const dataset = props.gridOp && props.gridOp.data || [];
  return dataset.filter(item => keys.every(key => item[key] && item[key].toString().toLowerCase().includes(state.search[key].toLowerCase())));
};
const query = ({
  props,
  state,
  parent,
  constants
}) => page => {
  const {
    remoteSearch,
    dataset
  } = props;
  page || (state.pagerConfig.currentPage = 1);
  return new Promise(resolve => {
    state.loading = true;
    if (remoteSearch || dataset) {
      const {
        currentPage,
        pageSize
      } = state.pagerConfig;
      let final = true;
      const onFinally = () => {
        if (final) {
          final = false;
          state.loading = false;
        }
      };
      if (remoteSearch) {
        props.remoteSearch({
          page: {
            currentPage,
            pageSize
          },
          conditions: state.search
        }).then(data => {
          state.sourceGridDataset = data.data;
          state.pagerConfig.total = data.total;
          state.loading = false;
          resolve();
        }).then(onFinally).catch(onFinally);
      } else {
        getDataset({
          dataset,
          service: parent.$service,
          tree: props.treeOp
        }, {
          pageVO: {
            curPage: currentPage,
            pageSize
          }
        }).then(data => {
          const {
            result,
            pageVO = {}
          } = data;
          if (props.popseletor === constants.TYPE_TREE) {
            props.treeOp.data = result || data;
          } else {
            state.sourceGridDataset = result || data;
            state.pagerConfig.total = pageVO.totalRows || 0;
          }
          state.loading = false;
          resolve();
        }).then(onFinally).catch(onFinally);
      }
    } else {
      state.fullGridData = localFilter({
        state,
        props
      });
      state.loading = false;
      resolve();
    }
  });
};
const selectedGridSelectAll = ({
  constants,
  vm,
  state
}) => ({
  checked
}) => {
  const refs = vm.$refs;
  if (!checked) {
    const sourcetable = refs[constants.GRID_REF.source];
    const historytable = refs[constants.GRID_REF.history];
    sourcetable && sourcetable.clearSelection();
    historytable && historytable.clearSelection();
    state.selectedValues = [];
    state.selectedDatas = [];
  }
};
const copySelectDatas = state => {
  state.selectedValues = state.selectedValues.slice(0);
  state.selectedDatas = state.selectedDatas.slice(0);
};
const selectedGridSelectChange = ({
  constants,
  props,
  vm,
  state
}) => ({
  checked,
  row
}, event) => {
  const refs = vm.$refs;
  if (!checked) {
    const len = state.selectedValues.length;
    event && (event.target.checked = !checked);
    for (let i = 0; i < len; i++) {
      if (String(state.selectedValues[i]) === String(row[props.valueField])) {
        state.selectedValues.splice(i, 1);
        state.selectedDatas.splice(i, 1);
        const sourcetable = refs[constants.GRID_REF.source];
        const historytable = refs[constants.GRID_REF.history];
        sourcetable && sourcetable.setSelection(sourcetable.data.filter(lrow => String(lrow[props.valueField]) === String(row[props.valueField])), false);
        historytable && historytable.setSelection(historytable.data.filter(lrow => String(lrow[props.valueField]) === String(row[props.valueField])), false);
        break;
      }
    }
    copySelectDatas(state);
  }
};
const sourceGridSelectAll = ({
  props,
  state,
  api
}) => ({
  selection,
  checked
}) => {
  if (checked) {
    selection.forEach(item => {
      if (!find(state.selectedValues, val => String(val) === String(item[props.valueField]))) {
        state.selectedValues.push(item[props.valueField]);
        state.selectedDatas.push(item);
      }
    });
  } else {
    const len = state.sourceGridDataset.length;
    for (let i = 0; i < len; i++) {
      const sourceGridItem = state.sourceGridDataset[i][props.valueField];
      const selectedItem = find(state.selectedValues, val => String(val) === String(sourceGridItem));
      const index = state.selectedValues.indexOf(selectedItem);
      if (index !== -1) {
        state.selectedValues.splice(index, 1);
        state.selectedDatas.splice(index, 1);
      }
    }
  }
  if (state.showSuggestPanel) {
    if (!checked) {
      state.selectedValues = [];
      state.selectedDatas = [];
    }
    api.handleConfirm();
  }
  copySelectDatas(state);
  api.selectedBoxInit();
};
const sourceGridSelectChange = ({
  props,
  state,
  api
}) => ({
  checked,
  row,
  confirm
}) => {
  if (checked) {
    state.selectedValues.push(row[props.valueField]);
    state.selectedDatas.push(row);
  } else {
    state.selectedValues.forEach((item, index) => {
      if (String(row[props.valueField]) === String(item)) {
        state.selectedValues.splice(index, 1);
        state.selectedDatas.splice(index, 1);
      }
    });
  }
  if (state.showSuggestPanel && confirm !== false) {
    api.handleConfirm();
  }
  copySelectDatas(state);
  api.selectedBoxInit();
};
const filterNode = () => (value, data) => {
  if (!value) {
    return true;
  }
  return data.label.includes(value);
};
const watchFilterText = vm => value => {
  const refs = vm.$refs;
  if (refs.tree) {
    refs.tree.filter(value);
  }
};
const computedTreeOp = ({
  api,
  constants
}) => (props, state) => {
  let treeOp = props.treeOp;
  if (typeof treeOp.showCheckbox === "undefined" && typeof treeOp.showRadio === "undefined") {
    treeOp.showCheckbox = true;
  }
  if (typeof treeOp.defaultExpandAll === "undefined") {
    treeOp.defaultExpandAll = true;
  }
  treeOp.showCheckbox = treeOp.showCheckbox === true;
  treeOp.showRadio = treeOp.showRadio === true;
  treeOp.filterNodeMethod = treeOp.filterNodeMethod || api.filterNode;
  treeOp.defaultExpandAll = treeOp.defaultExpandAll === true;
  treeOp.checkStrictly = treeOp.checkStrictly !== false;
  treeOp.expandOnClickNode = false;
  treeOp.nodeKey = treeOp.nodeKey || constants.ID;
  treeOp.defaultCheckedKeys = state.cacheStore.treeSelectList && state.cacheStore.treeSelectList.map(item => item.id);
  const defaultLabel = props.textField || constants.LABEL;
  const defaultId = props.valueField || constants.ID;
  const defaultChildren = "children";
  if (!treeOp.props) {
    treeOp.props = {
      label: defaultLabel,
      id: defaultId,
      children: defaultChildren
    };
  } else {
    const {
      label,
      id,
      children
    } = treeOp.props;
    treeOp.props.label = label || defaultLabel;
    treeOp.props.id = id || defaultId;
    treeOp.props.children = children || defaultChildren;
  }
  return treeOp;
};
const treeCheckChange = ({
  constants,
  state,
  props
}) => (data, checked) => {
  if (state.treeOp.showRadio) {
    const valueField = props.valueField || constants.ID;
    const textField = props.textField || constants.LABEL;
    const treeSelectList = [{
      id: data[valueField],
      value: data[textField]
    }];
    state.treeSelectList = treeSelectList;
  } else {
    if (checked) {
      addTreeSelectNode(data, state);
    } else {
      state.removedNodeId = [];
      getRemovedNodeId(data, state);
      state.treeSelectList = state.treeSelectList.filter(item => !state.removedNodeId.includes(item.id));
    }
  }
};
const addTreeSelectNode = (node, state) => {
  if (!state.treeSelectList.some(item => item.id === node[state.treeOp.props.id])) {
    state.treeSelectList.push({
      id: node[state.treeOp.props.id],
      value: node[state.treeOp.props.label]
    });
  }
  if (!node.expanded && Array.isArray(node.children)) {
    node.children.forEach(child => {
      addTreeSelectNode(child, state);
    });
  }
};
const getRemovedNodeId = (node, state) => {
  state.removedNodeId.push(node[state.treeOp.props.id]);
  if (!node.expanded && Array.isArray(node.children)) {
    node.children.forEach(child => {
      getRemovedNodeId(child, state);
    });
  }
};
const handleNumberPageChange = ({
  api,
  emit,
  state
}) => size => {
  state.pagerConfig.currentPage = 1;
  state.pagerConfig.pageSize = size;
  api.handlePager();
  emit("size-change", size);
};
const doSearch = ({
  api,
  state,
  props
}) => params => {
  const conditions = props.conditions;
  for (let i = 0; i < conditions.length; i++) {
    const condition = conditions[i];
    if (typeof params === "object" && typeof params[condition.field] !== "undefined") {
      state.searchOp[condition.field] = params[condition.field] ? params[condition.field] : "";
      state.search[condition.field] = params[condition.field] ? params[condition.field] : "";
    } else {
      state.search[condition.field] = state.searchOp[condition.field];
    }
  }
  api.handleSearch();
};
const doClear = ({
  api,
  state,
  props
}) => params => {
  const conditions = props.conditions;
  for (let i = 0; i < conditions.length; i++) {
    const condition = conditions[i];
    if (typeof params === "object" && typeof params[condition.field] !== "undefined") {
      params[condition.field] = "";
    }
    state.searchOp[condition.field] = "";
    state.search[condition.field] = "";
  }
  api.handleSearch();
};
const getSuggestParam = ({
  state,
  props,
  api
}) => input => {
  if (typeof input !== "string") {
    input = state.display;
  }
  if (!props.bypass) {
    const texts = api.getDisplay().split(props.textSplit);
    const inputs = input.split(props.textSplit).filter(s => !!s);
    const removed = texts.filter(str => !~inputs.indexOf(str));
    const addtions = inputs.filter(str => !~texts.indexOf(str));
    return {
      addtions,
      removed
    };
  }
  return input;
};
const updateSuggestWidth = ({
  vm
}) => () => {
  const $input = vm.$refs.reference.getInput();
  vm.$refs.popper.style.width = $input.clientWidth + "px";
};
const doSuggesst = ({
  state,
  props,
  popper,
  api,
  nextTick
}) => event => {
  if (!props.suggest) {
    return;
  }
  let query2 = event;
  off(window, "resize", api.updateSuggestWidth);
  off(document, "click", api.closeSuggestPanel);
  on(document, "click", api.closeSuggestPanel);
  on(window, "resize", api.updateSuggestWidth);
  api.updateSuggestWidth();
  if (typeof event !== "string") {
    if (props.multi && !state.suggestList.length) {
      state.suggestList = [].concat(state.selectedDatas);
    }
    state.showSuggestPanel = true;
    setTimeout(popper.updatePopper);
  }
  if (props.remoteSearch) {
    const doQuery = query3 => {
      state.showSuggestPanel = true;
      props.remoteSearch({
        query: query3
      }).then(data => {
        state.suggestList = data.data;
        nextTick(() => {
          popper.updatePopper();
        });
      });
    };
    if (!props.bypass && props.multi) {
      const {
        removed,
        addtions
      } = api.getSuggestParam(event);
      query2 = addtions;
      removed.forEach(text => {
        const row = find(state.selectedDatas, node => text === node[props.textField]);
        api.sourceGridSelectChange({
          checked: false,
          row,
          confirm: false
        });
      });
      if (!state.suggestList.length || addtions.length) {
        doQuery(query2);
      }
    } else {
      doQuery(state.display);
    }
  }
};
const closeSuggestPanel = ({
  state,
  api,
  vm
}) => (event = false) => {
  const reference = vm.$refs.reference;
  const popper = vm.$refs.popper;
  let keep = !event;
  if (event.target && reference) {
    keep = reference.$el.contains(event.target) || popper.contains(event.target);
  }
  if (!keep) {
    off(document, "click", api.closeSuggestPanel);
    off(window, "resize", api.updateSuggestWidth);
    api.handleConfirm(state.closeSuggestPanelInvoker === "openDialog");
    state.closeSuggestPanelInvoker = null;
    state.showSuggestPanel = false;
  }
};
const suggestRadioChange = ({
  state,
  api
}) => ({
  row
}) => {
  state.selectedDatas = row;
  state.showSuggestPanel = false;
  api.handleConfirm();
};
const radioChangeFn = ({
  props,
  api
}) => () => {
  if (props.radioChangeClose) {
    api.handleConfirm();
  }
};
const handlePager = ({
  api,
  props,
  state
}) => () => {
  if (!props.showPager) {
    state.sourceGridDataset = state.fullGridData;
    return;
  }
  const data = state.fullGridData;
  const {
    pageSize,
    currentPage
  } = state.pagerConfig;
  if (!props.remoteSearch && !props.dataset) {
    state.sourceGridDataset = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    state.pagerConfig.total = data.length;
  } else {
    api.query(true);
  }
};
const initSearchOption = ({
  api,
  state
}) => conditions => {
  for (let i = 0; i < conditions.length; i++) {
    const condition = conditions[i];
    state.searchOp[condition.field] = "";
  }
  state.searchOp.doSearch = api.doSearch;
  state.searchOp.doClear = api.doClear;
};
const mounted = ({
  api,
  props
}) => () => {
  if (props.autoLookup) {
    api.query().then(() => {
      api.initDisplay(props.modelValue);
    });
  } else {
    api.initDisplay(props.modelValue);
  }
};
const doDestroy = ({
  popper
}) => () => {
  popper.doDestroy();
};
const selectedBoxInit = vm => () => vm.$refs.selectedBox && vm.$refs.selectedBox.init();
const selectedBoxClear = api => () => api.selectedGridSelectAll({
  checked: false
});
const selectedBoxDelete = api => ({
  option: row
}) => api.selectedGridSelectChange({
  checked: false,
  row
});
const selectedBoxDrag = ({
  props,
  state
}) => ({
  state: {
    select
  }
}) => {
  const {
    valueField
  } = props;
  const {
    selectedDatas
  } = state;
  if (select && select.length) {
    const datas = select.map(opt => String(opt[valueField])).map(strVal => selectedDatas.find(opt => strVal === String(opt[valueField])));
    const values = datas.map(opt => opt[valueField]);
    state.selectedDatas = datas;
    state.selectedValues = values;
  }
};
const computedTreeMaxHeight = ({
  vm,
  state
}) => () => {
  var _a;
  const dialogBoxEl = vm.$refs.popeditorDialogBox.$el;
  const searchInputBottom = 20;
  const searchInputHeight = ((_a = dialogBoxEl.querySelector(".tiny-popeditor__filter-input")) == null ? void 0 : _a.clientHeight) || 0;
  state.treeWrapperMaxHeight = `${dialogBoxEl.querySelector(".tiny-dialog-box__body").clientHeight - searchInputHeight - searchInputBottom}px`;
};
export { closeSuggestPanel, computedGetTitle, computedModalWidth, computedTreeMaxHeight, computedTreeOp, createSearchForm, doClear, doDestroy, doSearch, doSuggesst, filterNode, getColumns, getDisplay, getMultiSelectedData, getRadioSelectedData, getSuggestParam, handleBeforeClose, handleCancel, handleClear, handleConfirm, handleNumberPageChange, handleOpen, handlePager, handleReset, handleSearch, handleSizeChange, initDisplay, initSearchOption, mounted, openDialog, query, radioChangeFn, selectedBoxClear, selectedBoxDelete, selectedBoxDrag, selectedBoxInit, selectedGridSelectAll, selectedGridSelectChange, sourceGridSelectAll, sourceGridSelectChange, suggestRadioChange, treeCheckChange, updateSuggestWidth, watchFilterText };