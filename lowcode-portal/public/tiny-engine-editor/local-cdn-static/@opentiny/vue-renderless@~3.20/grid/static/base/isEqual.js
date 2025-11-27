import "../../../chunk-G2ADBYYC.js";
import helperEqlCompare from './helperEqualCompare.js';
const isEqual = (obj1, obj2) => helperEqlCompare({
  val1: obj1,
  val2: obj2,
  compare: (v1, v2) => v1 === v2
});
var isEqual_default = isEqual;
export { isEqual_default as default };