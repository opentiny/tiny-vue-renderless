import "../chunk-G2ADBYYC.js";
import { isFunction } from './../common/type.js';
const isNumber = ({
  props
}) => () => {
  return typeof props.value === "number";
};
const getIntegerAndDecimal = ({
  props
}) => () => {
  var _a, _b;
  if (isFunction(props.formatter)) {
    return props.formatter(props.value);
  }
  if (!isNumber(props.value)) {
    return props.value;
  }
  let displayValue = props.value ? String(props.value).split(".") : "";
  let integer = (_a = displayValue[0]) == null ? void 0 : _a.replace(/\B(?=(\d{3})+(?!\d))/g, props.groupSeparator);
  let decimal = (_b = displayValue[1]) == null ? void 0 : _b.padEnd(props.precision, "0").slice(0, props.precision > 0 ? props.precision : 0);
  if (!displayValue) {
    integer = "0";
  }
  if (!decimal && props.precision) {
    let display = "0";
    decimal = display.padEnd(props.precision, "0");
  }
  return [integer, decimal].join(decimal ? "." : "");
};
export { getIntegerAndDecimal, isNumber };