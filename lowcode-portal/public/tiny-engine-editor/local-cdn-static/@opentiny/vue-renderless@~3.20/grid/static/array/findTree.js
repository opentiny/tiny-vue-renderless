import "../../../chunk-G2ADBYYC.js";
import helperCreateTreeFunc from './helperCreateTreeFunc.js';
const findTreeItem = ({
  parent,
  obj,
  iterate,
  context,
  path,
  node,
  parseChildren,
  opts
}) => {
  if (obj) {
    for (let index = 0, len = obj.length; index < len; index++) {
      const item = obj[index];
      const paths = path.concat([`${index}`]);
      const nodes = node.concat([item]);
      if (iterate.call(context, item, index, obj, paths, parent, nodes)) {
        return {
          index,
          item,
          path,
          items: obj,
          parent,
          nodes
        };
      }
      if (parseChildren && item) {
        const newPath = paths.concat([parseChildren]);
        const match = findTreeItem({
          parent: item,
          obj: item[parseChildren],
          iterate,
          context,
          path: newPath,
          node: nodes,
          parseChildren,
          opts
        });
        if (match) {
          return match;
        }
      }
    }
  }
};
const findTree = helperCreateTreeFunc(findTreeItem);
var findTree_default = findTree;
export { findTree_default as default };