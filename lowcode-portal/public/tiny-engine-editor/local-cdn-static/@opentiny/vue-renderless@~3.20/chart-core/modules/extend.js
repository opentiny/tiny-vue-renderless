import { __spreadValues } from "../../chunk-G2ADBYYC.js";
import { set, isObject, merge } from './../deps/utils.js';
const isArr = Array.isArray;
var extend_default = ({
  options,
  extend
}) => {
  if (!extend) {
    return;
  }
  Object.keys(extend).forEach(key => {
    const value = extend[key];
    if (~key.indexOf(".")) {
      set(options, key, value);
    } else if (typeof value === "function") {
      options[key] = value(options[key]);
    } else if (isArr(options[key]) && isArr(value)) {
      const attrList = ["series", "yAxis", "xAxis", "color", "dataZoom", "legend", "toolbox", "grid", "graphic", "timeline", "visualMap", "brush"];
      if (~attrList.indexOf(key)) {
        options[key] = merge(options[key], value);
      }
    } else {
      if (isArr(options[key]) && isObject(options[key][0])) {
        options[key].forEach((option, i) => options[key][i] = __spreadValues(__spreadValues({}, option), value));
      } else if (isObject(options[key])) {
        let optionBase = options[key];
        options[key] = __spreadValues(__spreadValues({}, optionBase), value);
      } else {
        options[key] = value;
      }
    }
  });
};
export { extend_default as default };