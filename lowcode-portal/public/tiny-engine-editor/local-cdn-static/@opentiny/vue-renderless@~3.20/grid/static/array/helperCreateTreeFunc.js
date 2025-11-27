import "../../../chunk-G2ADBYYC.js";
const helperCreateTreeFunc = (handle) => (obj, iterate, options, context) => {
  let opts = options || {};
  let optChildren = opts.children || "children";
  const params = {
    item: null,
    obj,
    iterate,
    context,
    path: [],
    node: [],
    parseChildren: optChildren,
    opts
  };
  return handle(params);
};
var helperCreateTreeFunc_default = helperCreateTreeFunc;
export {
  helperCreateTreeFunc_default as default
};
