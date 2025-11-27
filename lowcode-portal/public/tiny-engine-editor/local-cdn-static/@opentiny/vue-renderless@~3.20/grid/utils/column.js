import "../../chunk-G2ADBYYC.js";
import { isBoolean } from './../static/index.js';
import { initFilter } from './common.js';
let columnUniqueId = 0;
const setColumnFormat = (column, props) => column.format = props.formatConfig;
function setBasicProperty(column, context) {
  column.id = `col_${++columnUniqueId}`;
  column.type = context.type;
  column.prop = context.prop;
  column.rules = context.rules;
  column.required = context.required;
  column.property = context.field || context.prop;
  column.title = context.title;
  column.label = context.label;
  column.width = context.width;
  column.minWidth = context.minWidth;
  column.resizable = context.resizable;
  column.fixed = context.fixed;
  column.align = context.align;
  column.headerAlign = context.headerAlign;
  column.footerAlign = context.footerAlign;
  column.showOverflow = context.showOverflow;
  column.showHeaderOverflow = context.showHeaderOverflow;
  column.showTip = context.showTip;
  column.showHeaderTip = context.showHeaderTip;
  column.className = context.class || context.className;
  column.headerClassName = context.headerClassName;
  column.footerClassName = context.footerClassName;
  column.indexMethod = context.indexMethod;
  column.formatText = context.formatText;
  column.formatValue = context.formatValue;
  setColumnFormat(column, context);
  column.sortable = context.sortable;
  column.sortBy = context.sortBy;
  column.sortMethod = context.sortMethod;
  column.remoteSort = context.remoteSort;
  column.filterMultiple = isBoolean(context.filterMultiple) ? context.filterMultiple : true;
  column.filterMethod = context.filterMethod;
  column.filterRender = context.filterRender;
  column.filter = context.filter && initFilter(context.filter);
  column.treeNode = context.treeNode;
  column.renderer = context.renderer;
  column.editor = context.editor;
  column.operationConfig = context.operationConfig;
  column.equals = context.equals;
}
function ColumnConfig(context, {
  renderHeader,
  renderCell,
  renderData
} = {}, config = {}) {
  setBasicProperty(this, context);
  this.params = context.params;
  this.visible = true;
  this.level = 1;
  this.rowSpan = 1;
  this.colSpan = 1;
  this.order = null;
  this.renderWidth = 0;
  this.renderHeight = 0;
  this.resizeWidth = 0;
  this.renderLeft = 0;
  this.model = {};
  this.renderHeader = renderHeader || context.renderHeader;
  this.renderCell = renderCell || context.renderCell;
  this.renderData = renderData;
  this.showIcon = isBoolean(context.showIcon) ? context.showIcon : true;
  this.loading = false;
  this.slots = context.slots;
  this.own = context;
  this.asyncPrefix = config.constant.asyncPrefix;
}
const getColumnConfig = (context, options, config) => context instanceof ColumnConfig ? context : new ColumnConfig(context, options, config);
export { getColumnConfig, setColumnFormat };