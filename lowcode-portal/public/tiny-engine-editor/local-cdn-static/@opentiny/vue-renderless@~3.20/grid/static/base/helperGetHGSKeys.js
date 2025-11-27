import "../../../chunk-G2ADBYYC.js";
const helperGetHGSKeys = (property) => (
  // 以最快的方式判断数组，可忽略准确性
  property ? property.splice && property.join ? property : String(property).split(".") : []
);
var helperGetHGSKeys_default = helperGetHGSKeys;
export {
  helperGetHGSKeys_default as default
};
