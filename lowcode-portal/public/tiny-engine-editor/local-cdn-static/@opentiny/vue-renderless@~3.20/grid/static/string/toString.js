import "../../../chunk-G2ADBYYC.js";
import eqNull from './../base/eqNull.js';
import isNumber from './../base/isNumber.js';
const toValString = obj => {
  if (isNumber(obj)) {
    if (String(obj).includes("e-")) {
      let isNegative = obj < 0;
      return (isNegative ? "-" : "") + "0" + String((isNegative ? Math.abs(obj) : obj) + 1).substr(1);
    }
  }
  return String(eqNull(obj) ? "" : obj);
};
var toString_default = toValString;
export { toString_default as default };