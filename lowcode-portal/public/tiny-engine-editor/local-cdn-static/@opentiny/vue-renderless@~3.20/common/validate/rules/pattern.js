import "../../../chunk-G2ADBYYC.js";
import * as util from './../util.js';
function pattern_default(rule, checkValue, source, errors, options) {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      rule.pattern.lastIndex = 0;
      if (!rule.pattern.test(checkValue)) {
        errors.push(util.format(options.messages.pattern.mismatch, "", checkValue, rule.pattern));
      }
    } else if (typeof rule.pattern === "string") {
      const _pattern = new RegExp(rule.pattern);
      if (!_pattern.test(checkValue)) {
        errors.push(util.format(options.messages.pattern.mismatch, "", checkValue, rule.pattern));
      }
    }
  }
}
export { pattern_default as default };