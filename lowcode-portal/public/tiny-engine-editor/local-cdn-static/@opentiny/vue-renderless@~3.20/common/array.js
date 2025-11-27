import { __spreadValues } from "../chunk-G2ADBYYC.js";
import { SORT } from './index.js';
import { isSame } from './type.js';
import { getObj } from './object.js';
const indexOf = (arr, data, predicate = isSame) => {
  if (Array.isArray(arr) && typeof predicate === "function") {
    for (let i = 0, len = arr.length; i < len; i++) {
      if (predicate(arr[i], data)) {
        return i;
      }
    }
  }
  return -1;
};
const find = (arr, predicate) => {
  const index = indexOf(arr, void 0, predicate);
  return index !== -1 ? arr[index] : void 0;
};
const remove = (arr, data, count = 1) => {
  if (Array.isArray(arr) && arr.length) {
    const index = indexOf(arr, data);
    if (index > -1) {
      arr.splice(index, count);
    }
  }
  return arr;
};
const sort = (arr, field, sort2 = SORT.Asc) => {
  if (Array.isArray(arr) && arr.length > 1) {
    arr.sort((x, y) => {
      const compare = sort2 === SORT.Asc ? [1, -1] : [-1, 1];
      const xField = getObj(x, field);
      const yField = getObj(y, field);
      if (isNaN(xField)) {
        return sort2 === SORT.Asc ? 1 : -1;
      } else if (isNaN(yField)) {
        return -1;
      }
      return xField > yField ? compare[0] : compare[1];
    });
  }
  return arr;
};
const push = (arr, data) => {
  if (Array.isArray(arr) && !arr.some(value => isSame(value, data))) {
    arr.push(data);
  }
  return arr;
};
const unique = arr => {
  if (Array.isArray(arr)) {
    const array = [];
    for (let i = 0, len = arr.length; i < len; i++) {
      const value = arr[i];
      if (indexOf(array, value) === -1) {
        array.push(value);
      }
    }
    return array;
  }
  return arr;
};
const extend = (to, _from) => {
  Object.keys(_from).forEach(key => to[key] = _from[key]);
  return to;
};
const toObject = arr => {
  const res = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
};
const transformPidToChildren = (data, pidName = "pId", childrenName = "children", idName = "id") => {
  const result = [];
  Array.isArray(data) && data.forEach(item => {
    if (item[pidName] == "0") {
      result.push(item);
    } else {
      const parent = find(data, i => i[idName] == item[pidName]);
      if (!parent) {
        return;
      }
      if (!parent[childrenName]) {
        parent[childrenName] = [];
      }
      parent[childrenName].push(item);
    }
    delete item[pidName];
  });
  return result;
};
const transformTreeData = (data, key = "id", parentKey = "pId") => {
  if (!Array.isArray(data)) {
    data = [data];
  }
  data = data.map(item => __spreadValues({}, item));
  const treeData = transformPidToChildren(data, parentKey, "children", key);
  return treeData;
};
export { find, indexOf, push, remove, sort, toObject, transformPidToChildren, transformTreeData, unique };