import "../chunk-G2ADBYYC.js";
const toString = Object.prototype.toString;
const hasOwn = Object.prototype.hasOwnProperty;
const getProto = Object.getPrototypeOf;
const fnToString = hasOwn.toString;
const ObjectFunctionString = fnToString.call(Object);
const class2type = {
  "[object Error]": "error",
  "[object Object]": "object",
  "[object RegExp]": "regExp",
  "[object Date]": "date",
  "[object Array]": "array",
  "[object Function]": "function",
  "[object AsyncFunction]": "asyncFunction",
  "[object String]": "string",
  "[object Number]": "number",
  "[object Boolean]": "boolean"
};
const isNull = (x) => x === null || x === void 0;
const typeOf = (obj) => isNull(obj) ? String(obj) : class2type[toString.call(obj)] || "object";
const isObject = (obj) => typeOf(obj) === "object";
const isFunction = (fn) => ["asyncFunction", "function"].includes(typeOf(fn));
const isPlainObject = (obj) => {
  if (!obj || toString.call(obj) !== "[object Object]") {
    return false;
  }
  const proto = getProto(obj);
  if (!proto) {
    return true;
  }
  const Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
  return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
};
const isEmptyObject = (obj) => {
  const type = typeOf(obj);
  if (type === "object" || type === "array") {
    for (const name in obj) {
      if (hasOwn.call(obj, name)) {
        return false;
      }
    }
  }
  return true;
};
const isNumber = (value) => typeof value === "number" && isFinite(value);
const isNumeric = (value) => value - parseFloat(value) >= 0;
const isDate = (value) => typeOf(value) === "date";
const isSame = (x, y) => x === y || typeof x === "number" && typeof y === "number" && isNaN(x) && isNaN(y);
const isRegExp = (value) => typeOf(value) === "regExp";
const isPromise = (val) => isObject(val) && isFunction(val.then) && isFunction(val.catch);
export {
  hasOwn,
  isDate,
  isEmptyObject,
  isFunction,
  isNull,
  isNumber,
  isNumeric,
  isObject,
  isPlainObject,
  isPromise,
  isRegExp,
  isSame,
  toString,
  typeOf
};
