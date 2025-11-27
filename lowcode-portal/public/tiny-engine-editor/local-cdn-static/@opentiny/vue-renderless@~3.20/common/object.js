import "../chunk-G2ADBYYC.js";
import { hasOwn, typeOf, isObject, isPlainObject, isNull } from './type.js';
const each = (obj, handle) => {
  if (typeof handle !== "function") {
    return;
  }
  for (const name in obj) {
    if (hasOwn.call(obj, name)) {
      if (handle(name, obj[name]) === false) {
        break;
      }
    }
  }
};
let extend;
const getObj = (data, names, isExceptRoot) => {
  if (!data || !isPlainObject(data) || !names || typeof names !== "string") {
    return;
  }
  const nameArr = names.split(".");
  let obj = data;
  const len = nameArr.length;
  if (len > 1) {
    const startIndex = isExceptRoot ? 1 : 0;
    for (let i = startIndex; i < len; i++) {
      obj = obj[nameArr[i]];
      if (isNull(obj)) {
        return obj;
      }
    }
    return obj;
  } else {
    return obj[nameArr[0]];
  }
};
const setObj = (data, names, value, isMerge) => {
  if (!data || !isPlainObject(data) || !names || typeof names !== "string") {
    return data;
  }
  const nameArr = names.split(".");
  const obj = data;
  let len = nameArr.length;
  let item = nameArr[0];
  if (len > 1) {
    len--;
    let tmpl = obj;
    let name, target;
    for (let i = 0; i < len; i++) {
      name = nameArr[i];
      target = tmpl[name];
      if (target === null || !isPlainObject(target)) {
        tmpl[name] = {};
        target = tmpl[name];
      }
      tmpl = target;
    }
    item = nameArr[len];
    isMerge ? isPlainObject(tmpl[item]) ? extend(true, tmpl[item], value) : tmpl[item] = value : tmpl[item] = value;
  } else {
    isMerge ? isPlainObject(obj[item]) ? extend(true, obj[item], value) : obj[item] = value : obj[item] = value;
  }
  return obj;
};
const copyField = (data, fields, isMerge, isExclude) => {
  const setValue = (obj, result, name, key, isMerge2) => {
    const include = key.indexOf(name) === 0;
    const keySplit = key.split(name);
    const hasNextDot = keySplit[1] && keySplit[1].indexOf(".") === 0;
    if (name === key || include && hasNextDot) {
      if (name !== key) {
        each(getObj(obj, name), field => {
          setValue(obj, result, `${name}.${field}`, key);
          return true;
        });
      }
    } else {
      if (fields && !fields.includes(name)) {
        setObj(result, name, getObj(obj, name), isMerge2);
      }
    }
  };
  const innerCopyFields = (obj, fields2, isMerge2, isExclude2) => {
    const result = {};
    if (isExclude2) {
      each(obj, name => fields2.forEach(key => setValue(obj, result, name, key, isMerge2)));
    } else {
      fields2.forEach(field => setObj(result, field, getObj(obj, field), isMerge2));
    }
    return result;
  };
  if (isPlainObject(data)) {
    return Array.isArray(fields) ? innerCopyFields(data, fields, isMerge, isExclude) : extend(isMerge !== false, {}, data);
  }
  return data;
};
const copyArray = arr => {
  return Array.isArray(arr) ? arr.map(item => copyField(item)) : arr;
};
const deepCopy = (target, name, deep, copy, src) => {
  let copyIsArray;
  if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
    if (copyIsArray) {
      copyIsArray = false;
      target[name] = copyArray(copy);
    } else {
      const clone = src && isPlainObject(src) ? src : {};
      target[name] = extend(deep, clone, copy);
    }
  } else if (copy !== void 0) {
    try {
      target[name] = copy;
    } catch (e) {}
  }
};
extend = function (...args) {
  const length = args.length;
  let target = args[0] || {};
  let i = 1;
  let deep = false;
  if (typeOf(target) === "boolean") {
    deep = target;
    target = args[i] || {};
    i++;
  }
  if (!isObject(target) && typeOf(target) !== "function") {
    target = {};
  }
  for (; i < length; i++) {
    const options = args[i];
    if (options !== null && isObject(options)) {
      const names = Object.keys(options);
      for (const name of names) {
        const src = target[name];
        const copy = options[name];
        if (target !== copy) {
          deepCopy(target, name, deep, copy, src);
        }
      }
    }
  }
  return target;
};
let isEachEqual;
const isEqual = (sourceData, targetData, deep, fields) => {
  if (typeOf(sourceData) === typeOf(targetData)) {
    deep = deep !== false;
    if (Array.isArray(fields)) {
      const _sourceData = copyField(sourceData, fields);
      const _targetData = copyField(targetData, fields);
      return isEqual(_sourceData, _targetData, deep);
    }
    const source = isEachEqual(sourceData, targetData, deep);
    const target = isEachEqual(targetData, sourceData, deep);
    return source && target;
  }
  return false;
};
isEachEqual = (data1, data2, deep) => {
  if (!isPlainObject(data1)) {
    if (!Array.isArray(data1)) {
      return data1 === data2;
    }
    if (data1.length !== data2.length) {
      return false;
    }
    for (let i = 0, length = data1.length; i < length; i++) {
      const result = isEqual(data1[i], data2[i], deep);
      if (!result) {
        return false;
      }
    }
    return true;
  }
  let bEqual = true;
  const names = Object.keys(data1);
  for (const name of names) {
    if (hasOwn.call(data2, name)) {
      const _data1 = data1[name];
      const _data2 = data2[name];
      if (deep && isObject(_data1) || Array.isArray(_data1)) {
        bEqual = isEachEqual(_data1, _data2, deep);
      } else {
        bEqual = _data1 === _data2;
      }
    } else {
      bEqual = false;
    }
    if (bEqual === false) {
      break;
    }
  }
  return bEqual;
};
const toJsonStr = obj => {
  try {
    return JSON.stringify(obj);
  } catch (e) {
    return void 0;
  }
};
const merge = function (target, ...rest) {
  for (let i = 0, len = rest.length; i < len; i++) {
    const source = rest[i] || {};
    for (const prop in source) {
      if (hasOwn.call(source, prop)) {
        const value = source[prop];
        if (value !== void 0) {
          target[prop] = value;
        }
      }
    }
  }
  return target;
};
export { copyArray, copyField, each, extend, getObj, isEachEqual, isEqual, merge, setObj, toJsonStr };