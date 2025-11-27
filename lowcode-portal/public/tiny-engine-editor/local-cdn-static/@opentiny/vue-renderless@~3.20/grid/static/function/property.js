import "../../../chunk-G2ADBYYC.js";
import isNull from './../base/isNull.js';
const property = (key, defs) => object => isNull(object) ? defs : object[key];
var property_default = property;
export { property_default as default };