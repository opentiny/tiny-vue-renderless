import "../../../chunk-G2ADBYYC.js";
const helperCreateToNumber = (handle) => (str) => {
  if (str) {
    let num = handle(str);
    if (!isNaN(num)) {
      return num;
    }
  }
  return 0;
};
var helperCreateToNumber_default = helperCreateToNumber;
export {
  helperCreateToNumber_default as default
};
