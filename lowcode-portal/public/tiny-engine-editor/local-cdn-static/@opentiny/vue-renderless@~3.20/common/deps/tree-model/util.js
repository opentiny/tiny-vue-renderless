import "../../../chunk-G2ADBYYC.js";
const NODE_KEY = "$treeNodeId";
const getNodeKey = function(key, data) {
  if (!key) {
    return data[NODE_KEY];
  }
  return data[key];
};
const markNodeData = function(node, data) {
  if (!data || data[NODE_KEY]) {
    return;
  }
  Object.defineProperty(data, NODE_KEY, {
    value: node.id,
    enumerable: false,
    configurable: false,
    writable: false
  });
};
export {
  NODE_KEY,
  getNodeKey,
  markNodeData
};
