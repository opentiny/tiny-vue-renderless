import "../../../chunk-G2ADBYYC.js";
import keys from './keys.js';
import slice from './../array/slice.js';
import assign from './../object/assign.js';
import includes from './../array/includes.js';
import arrayEach from './../array/arrayEach.js';
const destructuring = function (destination, sources) {
  if (destination && sources) {
    let rest = assign.apply(this, [{}].concat(slice(arguments, 1)));
    let restKeys = keys(rest);
    arrayEach(keys(destination), key => {
      if (includes(restKeys, key)) {
        destination[key] = rest[key];
      }
    });
  }
  return destination;
};
var destructuring_default = destructuring;
export { destructuring_default as default };