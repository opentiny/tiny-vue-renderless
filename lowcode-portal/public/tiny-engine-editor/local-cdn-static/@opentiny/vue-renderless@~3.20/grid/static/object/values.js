import "../../../chunk-G2ADBYYC.js";
import objectEach from './objectEach.js';
const values = (obj, iterator, ctx) => {
  const objectValues = [];
  objectEach(obj, val => {
    objectValues.push(val);
  }, ctx);
  return objectValues;
};
var values_default = values;
export { values_default as default };