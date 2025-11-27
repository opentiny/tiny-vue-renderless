import "../../../chunk-G2ADBYYC.js";
const slice = (array, startIndex, endIndex) => {
  let result = [];
  if (array) {
    for (startIndex = startIndex || 0, endIndex = endIndex || array.length; startIndex < endIndex; startIndex++) {
      result.push(array[startIndex]);
    }
  }
  return result;
};
var slice_default = slice;
export {
  slice_default as default
};
