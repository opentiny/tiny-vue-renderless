import "../../../chunk-G2ADBYYC.js";
import eachTree from './eachTree.js';
const filterTree = (obj, iterate, options, context) => {
  let result = [];
  if (obj && iterate) {
    eachTree(obj, (...args) => {
      if (iterate.apply(context, args)) {
        result.push(args[0]);
      }
    }, options);
  }
  return result;
};
var filterTree_default = filterTree;
export { filterTree_default as default };