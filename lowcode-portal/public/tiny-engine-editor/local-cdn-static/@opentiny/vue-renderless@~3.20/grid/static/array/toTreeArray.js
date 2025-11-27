import "../../../chunk-G2ADBYYC.js";
import each from './../base/each.js';
import assign from './../object/assign.js';
const defaultOptions = {
  parentKey: "parentId",
  key: "id",
  children: "children"
};
const unTreeList = (result, array, opts) => {
  let optChildren = opts.children;
  let optData = opts.data;
  each(array, item => {
    const children = item[optChildren];
    if (optData) {
      item = item[optData];
    }
    result.push(item);
    children && unTreeList(result, children, opts);
  });
  return result;
};
const toTreeArray = (array, options) => unTreeList([], array, assign({}, defaultOptions, options));
var toTreeArray_default = toTreeArray;
export { toTreeArray_default as default };