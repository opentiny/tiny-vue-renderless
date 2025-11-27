import { __spreadValues } from "../../chunk-G2ADBYYC.js";
import { isNull } from './../../common/type.js';
import { find } from './../../common/array.js';
import { get, isFunction, set } from './../static/index.js';
const gridSize = ["medium", "small", "mini"];
const getSize = ({
  size,
  $parent
}) => size || ($parent && gridSize.includes($parent.size) ? $parent.size : null);
const getFuncText = content => isFunction(content) ? content() : content;
const getRowkey = $table => $table.rowId;
const getRowid = ($table, row) => {
  const rowId = get(row, getRowkey($table));
  return rowId ? encodeURIComponent(rowId) : "";
};
const getColumnList = columns => {
  const result = [];
  columns.forEach(column => {
    if (column.children && column.children.length) {
      result.push(...getColumnList(column.children));
    } else {
      result.push(column);
    }
  });
  return result;
};
const getClass = (property, params) => property ? isFunction(property) ? property(params) : property : "";
const getFilters = filters => (filters || []).map(({
  label,
  value,
  data,
  checked
}) => ({
  label,
  value,
  data,
  _data: data,
  checked: !!checked
}));
const initFilter = filter => {
  return __spreadValues({
    condition: {
      input: "",
      relation: "equals",
      empty: null,
      type: null,
      value: []
    },
    hasFilter: false,
    custom: null
  }, filter);
};
const formatText = value => `${isNull(value) ? "" : value}`;
const setCellValue = (row, column, value) => {
  const {
    format,
    property
  } = column;
  if (format && format.async && Array.isArray(format.data) && format.data.length > 0 && value) {
    let labelText = "";
    const {
      enabled,
      valueSplit,
      textSplit
    } = format.async.splitConfig || {};
    const findCellValue = optionValue => find(format.data, col => {
      if (typeof col === "object") {
        const colLabel = get(col, format.async.text || "label");
        const colValue = get(col, format.async.value || "value");
        col.label = colLabel;
        return optionValue === colValue || optionValue === colLabel;
      }
      return optionValue === col;
    });
    if (enabled) {
      const labelTexts = [];
      value.split(valueSplit || ",").forEach(item => {
        const findValue = findCellValue(item);
        if (findValue) {
          labelTexts.push(findValue.label);
        }
      });
      labelText = labelTexts.join(textSplit || ",");
    } else {
      labelText = findCellValue(value);
    }
    set(row, column.asyncPrefix + property, labelText ? labelText.label : labelText);
  }
  set(row, property, value);
};
const hasChildrenList = item => item && item.children && item.children.length > 0;
const emitEvent = (vm, type, args) => {
  if (vm.tableListeners[type]) {
    const params = [].concat(args);
    vm.$emit(type, ...params);
  }
};
const assemColumn = $table => {
  const collectColumn = [];
  const assem = (columnVms, columns) => {
    if (Array.isArray(columnVms)) {
      columnVms.forEach(columnVm => {
        const column = columnVm.columnConfig;
        const children = [];
        if (column) {
          columns.push(column);
          assem(columnVm.childColumns, children);
          column.children = children.length > 0 ? children : null;
        }
      });
    }
  };
  assem($table.childColumns, collectColumn);
  $table.collectColumn = collectColumn;
};
const getCellValue = (row, column) => get(row, column.own.field);
const getListeners = ($attrs, $listeners) => {
  const regHyphenate = /\B([A-Z])/g;
  const regEventPrefix = /^on[A-Z]/;
  const listeners = {};
  if ($listeners) {
    return $listeners;
  }
  Object.keys($attrs).forEach(name => {
    const event = $attrs[name];
    if (regEventPrefix.test(name) && typeof event === "function") {
      listeners[name.slice(2).replace(regHyphenate, "-$1").toLowerCase()] = event;
    }
  });
  return listeners;
};
export { assemColumn, emitEvent, formatText, getCellValue, getClass, getColumnList, getFilters, getFuncText, getListeners, getRowid, getRowkey, getSize, gridSize, hasChildrenList, initFilter, setCellValue };