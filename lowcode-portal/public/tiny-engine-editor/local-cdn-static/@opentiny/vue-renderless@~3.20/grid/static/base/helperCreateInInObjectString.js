import "../../../chunk-G2ADBYYC.js";
let objectToString = Object.prototype.toString;
function helperCreateInInObjectString(type) {
  return function(obj) {
    return "[object " + type + "]" === objectToString.call(obj);
  };
}
var helperCreateInInObjectString_default = helperCreateInInObjectString;
export {
  helperCreateInInObjectString_default as default
};
