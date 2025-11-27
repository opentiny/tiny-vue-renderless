import "../chunk-G2ADBYYC.js";
const setSubitemAttrValue = ({ className, item, value }) => {
  if (value) {
    if (typeof value === "number") {
      className[`col-${item}-`] = value;
    } else {
      if ("span" in value) {
        className[`col-${item}-`] = value.span;
      }
      if ("offset" in value) {
        className[`col-${item}-offset-`] = value.offset;
      }
      if ("push" in value) {
        className[`col-${item}-push-`] = value.push;
      }
      if ("pull" in value) {
        className[`col-${item}-pull-`] = value.pull;
      }
    }
  }
};
const setGlobalAttrValue = ({ attr, className, value }) => {
  attr = attr ? attr + "-" : "";
  className[`col-xs-${attr}`] = value;
  className[`col-sm-${attr}`] = value;
  className[`col-md-${attr}`] = value;
  className[`col-lg-${attr}`] = value;
  className[`col-xl-${attr}`] = value;
};
const getClassName = ({ api, props, state }) => () => {
  var _a;
  const multiple = 24 / (((_a = state.layout) == null ? void 0 : _a.cols) || 12);
  const span = props.span * multiple;
  const offset = props.offset;
  const push = props.move ? props.move : 0;
  const pull = props.move ? 0 : -props.move;
  const subitems = {
    xs: props.xs * multiple,
    sm: props.sm * multiple,
    md: props.md * multiple,
    lg: props.lg * multiple,
    xl: props.xl * multiple
  };
  const className = {};
  const result = [];
  let item = {};
  if (span) {
    api.setGlobalAttrValue({ attr: "", value: span, className });
  }
  if (offset) {
    api.setGlobalAttrValue({ attr: "offset", value: offset, className });
  }
  if (push) {
    api.setGlobalAttrValue({ attr: "push", value: push, className });
  }
  if (pull) {
    api.setGlobalAttrValue({ attr: "pull", value: pull, className });
  }
  for (item of Object.keys(subitems)) {
    api.setSubitemAttrValue({ item, value: subitems[item], className });
  }
  for (item of Object.keys(className)) {
    result.push(item + className[item]);
  }
  return result.join(" ");
};
const row = (pcontext) => () => {
  const ROW_NAME = "Row";
  const COL_NAME = "Col";
  let parent = pcontext.$parent.$parent;
  let parentName = parent ? parent.$options.componentName : null;
  let depth = 10;
  while (parent && parentName !== ROW_NAME && parentName !== COL_NAME && depth--) {
    parent = parent.$parent;
    parentName = parent && parent.$options ? parent.$options.componentName : null;
  }
  return parentName === ROW_NAME ? parent : null;
};
const getStyle = ({ props, state }) => () => {
  const parent = state.row;
  const no = props.no;
  const styles = [];
  let gutter = parent ? parent.gutter : null;
  let noSpace = parent ? parent.noSpace : null;
  let order = "";
  if (gutter) {
    gutter = gutter / 2;
    styles.push(`padding-left:${gutter}px;padding-right:${gutter}px;`);
  } else if (noSpace) {
    styles.push("padding-left:0;padding-right:0;");
  }
  if (parent && parent.flex && parent.order) {
    order = parent.order === "asc" ? no : -no;
    styles.push(`order:${order};-webkit-order:${order};-ms-order:${order};-moz-order:${order};`);
  }
  return styles.join("");
};
export {
  getClassName,
  getStyle,
  row,
  setGlobalAttrValue,
  setSubitemAttrValue
};
