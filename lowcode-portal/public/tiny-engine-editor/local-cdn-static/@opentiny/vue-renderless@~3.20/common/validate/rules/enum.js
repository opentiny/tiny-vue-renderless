import "../../../chunk-G2ADBYYC.js";
import * as util from './../util.js';
const ENUM = "enum";
function enum_default(rule, checkValue, source, errors, options) {
  rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];
  if (!rule[ENUM].includes(checkValue)) {
    errors.push(util.format(options.messages[ENUM], "", rule[ENUM].join(", ")));
  }
}
export { enum_default as default };