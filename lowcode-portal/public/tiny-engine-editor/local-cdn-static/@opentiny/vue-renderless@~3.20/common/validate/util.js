import { __spreadValues } from "../../chunk-G2ADBYYC.js";
import { hasOwn, isNull } from './../type.js';
import { log } from './../xss.js';
const formatRegExp = /%[sdj%]/g;
const warning = () => void 0;
function convertFieldsError(errors) {
  if (!errors || !errors.length) {
    return null;
  }
  const fields = {};
  errors.forEach(error => {
    const field = error.field;
    fields[field] = fields[field] || [];
    fields[field].push(error);
  });
  return fields;
}
function format(i18nTemplate, ...rest) {
  if (typeof i18nTemplate === "function") {
    return i18nTemplate(...rest);
  }
  if (typeof i18nTemplate === "string") {
    let i = 0;
    const len = rest.length;
    let str = String(i18nTemplate).replace(formatRegExp, matchChar => {
      if (matchChar === "%%") {
        return "%";
      }
      if (i >= len) {
        return matchChar;
      }
      switch (matchChar) {
        case "%j":
          try {
            return JSON.stringify(rest[i++]);
          } catch (e) {
            return "[Circular]";
          }
        case "%d":
          return Number(rest[i++]);
        case "%s":
          return String(rest[i++]);
        default:
          return matchChar;
      }
    });
    return str;
  }
  return i18nTemplate;
}
function isNativeStringType(type) {
  return ["string", "url", "hex", "email", "pattern", "digits", "time", "dateYMD", "longDateTime", "dateTime", "dateYM", "version", "speczh", "specialch", "specialch2", "acceptImg", "acceptFile", "fileSize"].includes(type);
}
function isEmptyValue(data, dataType) {
  if (isNull(data)) {
    return true;
  }
  if (dataType === "array" && Array.isArray(data) && !data.length) {
    return true;
  }
  if (isNativeStringType(dataType) && typeof data === "string" && !data) {
    return true;
  }
  return false;
}
function isEmptyObject(data) {
  return Object.keys(data).length === 0;
}
function asyncParallelArray(arrData, func, callback) {
  let count = 0;
  const results = [];
  const arrLength = arrData.length;
  function checkCount(errors) {
    results.push(...errors);
    count++;
    if (count === arrLength) {
      callback(results);
    }
  }
  arrData.forEach(rule => {
    func(rule, checkCount);
  });
}
function asyncSerialArray(arr, fn, cb) {
  let idx = 0;
  const arrLength = arr.length;
  function checkNext(errorList) {
    if (errorList && errorList.length) {
      cb(errorList);
      return;
    }
    const original = idx;
    idx = idx + 1;
    if (original < arrLength) {
      fn(arr[original], checkNext);
    } else {
      cb([]);
    }
  }
  checkNext([]);
}
function flattenObjArr(objArr) {
  const result = [];
  Object.keys(objArr).forEach(item => {
    result.push(...objArr[item]);
  });
  return result;
}
function asyncMap(objArray, option, func, callback) {
  if (option.first) {
    const pending2 = new Promise((resolve, reject) => {
      const errorFn = reject;
      const next = errors => {
        callback(errors);
        return errors.length ? errorFn({
          errors,
          fields: convertFieldsError(errors)
        }) : resolve();
      };
      const flattenArr = flattenObjArr(objArray);
      asyncSerialArray(flattenArr, func, next);
    });
    pending2.catch(error => error.errors && error.fields || log.logger.error(error));
    return pending2;
  }
  let firstFields = option.firstFields || [];
  if (firstFields === true) {
    firstFields = Object.keys(objArray);
  }
  let total = 0;
  const objArrayKeys = Object.keys(objArray);
  const objArrLength = objArrayKeys.length;
  const results = [];
  const pending = new Promise((resolve, reject) => {
    const errorFn = reject;
    const next = errors => {
      results.push(...errors);
      total++;
      if (total === objArrLength) {
        callback(results);
        return results.length ? errorFn({
          errors: results,
          fields: convertFieldsError(results)
        }) : resolve();
      }
    };
    objArrayKeys.forEach(key => {
      const arr = objArray[key];
      if (firstFields.includes(key)) {
        asyncSerialArray(arr, func, next);
      } else {
        asyncParallelArray(arr, func, next);
      }
    });
  });
  pending.catch(error => error.errors && error.fields || log.logger.error(error));
  return pending;
}
function complementError(rule) {
  return onError => {
    if (onError && onError.message) {
      onError.field = onError.field || rule.fullField;
      return onError;
    }
    return {
      message: typeof onError === "function" ? onError() : onError,
      field: onError.field || rule.fullField
    };
  };
}
function deepMerge(target, sources) {
  if (!sources) {
    return target;
  }
  for (const source in sources) {
    if (hasOwn.call(sources, source)) {
      const value = sources[source];
      if (typeof value === "object" && typeof target[source] === "object") {
        target[source] = __spreadValues(__spreadValues({}, target[source]), value);
      } else {
        target[source] = value;
      }
    }
  }
  return target;
}
export { asyncMap, complementError, convertFieldsError, deepMerge, format, isEmptyObject, isEmptyValue, warning };