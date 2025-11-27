import "../../../chunk-G2ADBYYC.js";
import * as util from './../util.js';
function whitespace_default(rule, checkValue, source, errors, options) {
  if (/^\s+$/.test(checkValue) || checkValue === "") {
    errors.push(util.format(options.messages.whitespace, ""));
  }
}
export { whitespace_default as default };