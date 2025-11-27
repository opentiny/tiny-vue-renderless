import "../../../chunk-G2ADBYYC.js";
import arrayEach from './../array/arrayEach.js';
import keys from './../base/keys.js';
import clone from './../base/clone.js';
let objectAssignFns = Object.assign;
const handleAssign = (destination, args, isClone) => {
  let len = args.length;
  for (let source, index = 1; index < len; index++) {
    source = args[index];
    let eachCallback;
    if (isClone) {
      eachCallback = key => {
        destination[key] = clone(source[key], isClone);
      };
    } else {
      eachCallback = key => {
        destination[key] = source[key];
      };
    }
    arrayEach(keys(args[index]), eachCallback);
  }
  return destination;
};
const assign = function (target) {
  if (target) {
    let args = arguments;
    if (target === true) {
      if (args.length > 1) {
        target = Array.isArray(target[1]) ? [] : {};
        return handleAssign(target, args, true);
      }
    } else {
      return objectAssignFns ? objectAssignFns.apply(Object, args) : handleAssign(target, args);
    }
  }
  return target;
};
var assign_default = assign;
export { assign_default as default };