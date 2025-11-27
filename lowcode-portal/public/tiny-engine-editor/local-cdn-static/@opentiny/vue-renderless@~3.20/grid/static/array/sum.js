import "../../../chunk-G2ADBYYC.js";
import each from './../base/each.js';
import isFunction from './../base/isFunction.js';
import toNumber from './../number/toNumber.js';
const sum = (array, iterate, context) => {
  let result = 0;
  let eachCallback;
  if (iterate) {
    if (isFunction(iterate)) {
      eachCallback = (...args) => {
        result += toNumber(iterate.apply(context, args));
      };
    } else {
      eachCallback = val => {
        result += toNumber(val[iterate]);
      };
    }
  } else {
    eachCallback = val => {
      result += toNumber(val);
    };
  }
  each(array, eachCallback);
  return result;
};
var sum_default = sum;
export { sum_default as default };