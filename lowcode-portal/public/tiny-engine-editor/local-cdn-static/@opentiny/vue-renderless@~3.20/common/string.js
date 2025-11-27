import "../chunk-G2ADBYYC.js";
import { isPlainObject, isNumber, isNumeric, isNull } from './type.js';
import { getObj, toJsonStr } from './object.js';
import { toFixed, Decimal } from './decimal.js';
const formatTypes = {
  text: "text",
  url: "url",
  html: "html",
  tmpl: "tmpl"
};
const escapeChars = {
  "&": "&#38;",
  "<": "&#60;",
  ">": "&#62;",
  '"': "&#34;",
  "'": "&#x27;",
  "[": "&#91;",
  "]": "&#93;"
};
const isNullOrEmpty = value => value === null || value === void 0 || typeof value === "string" && value.trim().length === 0;
function cached(fn) {
  let cache = /* @__PURE__ */Object.create(null);
  return function cachedFn(str) {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
const camelizeRE = /-(\w)/g;
const camelize = cached(str => str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : ""));
const capitalize = cached(str => str.charAt(0).toUpperCase() + str.slice(1));
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cached(str => str.replace(hyphenateRE, "-$1").toLowerCase());
const toJson = string => {
  try {
    return JSON.parse(string);
  } catch (e) {
    return void 0;
  }
};
function getLengthInUtf16(string) {
  const len = string.length;
  let count = 0;
  for (let i = 0; i < len; i++) {
    let charCode = string.charCodeAt(i);
    if (charCode <= 65535) {
      count += 2;
    } else {
      count += 4;
    }
  }
  return count;
}
function getLengthInUtf8(string) {
  const len = string.length;
  let count = 0;
  for (let i = 0; i < len; i++) {
    let charCode = string.charCodeAt(i);
    if (charCode <= 127) {
      count += 1;
    } else if (charCode <= 2047) {
      count += 2;
    } else if (charCode <= 65535) {
      count += 3;
    } else {
      count += 4;
    }
  }
  return count;
}
function getLengthDefault(string) {
  const len = string.length;
  let count = 0;
  for (let i = 0; i < len; i++) {
    count++;
    if (string.charCodeAt(i) >> 8) {
      count++;
    }
  }
  return count;
}
const getLength = (string, regular) => {
  if (!string || typeof string !== "string") {
    return 0;
  }
  let count = 0;
  if (typeof regular === "string") {
    regular = regular.toLowerCase();
    if (regular === "utf-16" || regular === "utf16") {
      count = getLengthInUtf16(string);
    } else if (regular === "utf-8" || regular === "utf8") {
      count = getLengthInUtf8(string);
    } else {
      count = string.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "_").length;
    }
  } else if (typeof regular === "function") {
    return regular(string);
  } else {
    count = getLengthDefault(string);
  }
  return count;
};
const fillChar = (string, length, append, chr = "0") => {
  if (typeof string === "string" && typeof chr === "string" && isNumber(length)) {
    let len = string.length - length;
    if (len > 0) {
      return append ? string.substr(0, length) : string.substr(len, length);
    } else {
      const appendStr = [];
      len = Math.abs(len) / chr.length;
      for (; len > 0; len--) {
        appendStr.push(chr);
      }
      const s = appendStr.join("");
      return append ? string + s : s + string;
    }
  }
};
const random = () => {
  let MAX_UINT32_PLUS_ONE = 4294967296;
  return window.crypto.getRandomValues(new window.Uint32Array(1))[0] / MAX_UINT32_PLUS_ONE;
};
const guid = (prefix = "", length = 8) => prefix + random().toString().substr(2, length);
const escapeHtml = (string, isReplaceSpace) => {
  if (!string || typeof string !== "string") {
    return string;
  }
  string = string.replace(/[&<>"']/g, chr => escapeChars[chr]);
  return isReplaceSpace ? string.replace(/\s/g, "&#160;") : string;
};
const escape = (string, escapeType, isReplaceSpace) => {
  if (!string || typeof string !== "string") {
    return string;
  }
  if (typeof escapeType === "boolean") {
    isReplaceSpace = !!escapeType;
  }
  if (escapeType === "uri") {
    return encodeURIComponent(string);
  } else if (escapeType === "html") {
    return escapeHtml(string, isReplaceSpace);
  } else if (escapeType === "prop") {
    string = escapeHtml(string, isReplaceSpace);
    return string.replace(/[[\]]/g, chr => escapeChars[chr]);
  }
  string = string.replace(/[<>"]/g, chr => escapeChars[chr]);
  return isReplaceSpace ? string.replace(/\s/g, "&#160;") : string;
};
const getFormat = ({
  sign,
  format: format2,
  hasSign
}) => {
  switch (sign) {
    case "#":
      format2 = formatTypes.text;
      break;
    case "@":
      format2 = formatTypes.url;
      break;
    case "$":
      format2 = formatTypes.html;
      break;
    case "%":
      format2 = formatTypes.tmpl;
      break;
    default:
      hasSign = false;
      break;
  }
  return {
    format: format2,
    hasSign
  };
};
const fieldFormat = (string, data, type = "html") => {
  if (typeof string === "string") {
    return string.replace(/(\/)?\{\{([\s\S]*?)}}/g, (match, slash = "", offset = "") => {
      const sign = offset.substr(0, 1);
      let hasSign = true;
      let format2 = formatTypes.html;
      let ret = getFormat({
        sign,
        format: format2,
        hasSign
      });
      format2 = ret.format;
      hasSign = ret.hasSign;
      if (hasSign) {
        offset = (offset || "").substring(1);
      } else if (type) {
        format2 = type;
      }
      let value = getObj(data, offset);
      if (isNull(value)) {
        value = "";
      }
      if (format2 === formatTypes.tmpl) {
        value = `{{${value}}}`;
      } else {
        if (format2 === formatTypes.url) {
          value = encodeURIComponent(value);
        } else {
          value = format2 === formatTypes.html ? escapeHtml(value) : value;
        }
      }
      return format2 === formatTypes.url && value.length === 0 ? "" : slash + value;
    });
  }
};
const getFormatText = () => (str, reg, args, format2) => str.replace(reg, (m, i, j, k) => {
  if (!isNullOrEmpty(i) && !isNullOrEmpty(k)) {
    return `{${j}}`;
  }
  const value = args[j];
  const string = isPlainObject(value) ? toJsonStr(value) : value;
  if (isNullOrEmpty(value)) {
    return "";
  }
  return typeof value === "string" && typeof format2 === "function" ? format2(string) : string;
});
const getResult = ({
  type,
  res,
  formatText,
  string,
  reg,
  args
}) => {
  if (type === formatTypes.url) {
    res = formatText(string, reg, args, encodeURIComponent);
  } else if (type === formatTypes.html) {
    res = formatText(string, reg, args, escapeHtml);
  } else {
    res = formatText(string, reg, args);
  }
  return res;
};
const judgForFunc = (args, formatTypes2, type) => {
  const lastArg = args[args.length - 1];
  if (lastArg !== formatTypes2.text && lastArg !== formatTypes2.url && lastArg !== formatTypes2.html) {
    args = Array.prototype.slice.call(args, 1);
  } else {
    args = Array.prototype.slice.call(args, 1, args.length - 1);
    type = lastArg;
  }
  return {
    args,
    type
  };
};
const checkParam = ({
  data,
  args,
  type,
  _arguments
}) => {
  if (Array.isArray(data)) {
    args = data;
  } else {
    const judgObj = judgForFunc(_arguments, formatTypes, type);
    args = judgObj.args;
    type = judgObj.type;
  }
  return {
    args,
    type
  };
};
const format = function (string, data, type = "text") {
  if (typeof string !== "string" || arguments.length < 2) {
    return string;
  }
  let args, res;
  if (isPlainObject(data)) {
    return fieldFormat(string, data, type);
  }
  const ret = checkParam({
    data,
    args,
    type,
    _arguments: arguments
  });
  args = ret.args;
  type = ret.type;
  const reg = /(\\)?\{(\d+)(\\)?}/g;
  const formatText = getFormatText();
  res = getResult({
    type,
    res,
    formatText,
    string,
    reg,
    args
  });
  return res;
};
const getTruthyValue = ({
  string,
  length,
  ellipsis
}) => {
  const flag = typeof string === "string" && isNumber(length) && length < string.length;
  const truthyValue = flag && format(ellipsis, string.substr(0, length));
  return {
    flag,
    truthyValue
  };
};
const truncate = (string, length, ellipsis = "{0}...") => {
  const {
    flag,
    truthyValue
  } = getTruthyValue({
    string,
    length,
    ellipsis
  });
  return flag ? truthyValue : string;
};
const tryToConvert = (convert, defaultValue, ...args) => {
  const result = convert.apply(null, args);
  return isNaN(result) ? defaultValue : result;
};
const toInt = value => isNumber(value) ? Number(value.toFixed(0)) : typeof value === "string" ? parseInt(value, 10) : NaN;
const tryToInt = (value, defaultValue) => tryToConvert(toInt, defaultValue, value);
const toNumber = value => isNumber(value) ? value : typeof value === "string" ? parseFloat(value) : NaN;
const tryToNumber = (value, defaultValue) => tryToConvert(toNumber, defaultValue, value);
const toDecimal = (value, fraction = 2, isTruncate = false) => {
  let result = NaN;
  if (isNumber(value)) {
    result = value;
  }
  if (typeof value === "string") {
    const val = parseFloat(value);
    if (!isNaN(val)) {
      result = val;
    }
  }
  if (isNumber(result)) {
    if (isTruncate) {
      result = toFixed(value.toString().split(".").slice(0, 2).map((str, index) => index ? str.slice(0, fraction) : str).join("."), fraction);
    } else {
      result = toFixed(result, fraction);
    }
  }
  return result;
};
const tryToDecimal = (value, fraction, isTruncate, defaultValue) => tryToConvert(toDecimal, defaultValue, value, fraction, isTruncate);
const toCurrency = (value, fraction, placeholder, isTruncate) => {
  if (isNumeric(value)) {
    let val = toDecimal(Number(value), fraction, isTruncate);
    val = String(val).replace(/(^|[^\w.])(\d{4,})/g, ($0, $1, $2) => $1 + $2.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, "$&,"));
    return placeholder ? format(placeholder, val) : val;
  }
  return NaN;
};
const tryToCurrency = (value, fraction, placeholder, defaultValue) => isNaN(toNumber(value)) ? defaultValue : toCurrency(value, fraction, placeholder);
const toBoolValue = value => {
  if (isNumber(value)) {
    return value ? 1 : 0;
  } else if (isNull(value) || value === "false") {
    return false;
  } else if (value === "true") {
    return true;
  } else if (typeof value === "boolean") {
    return value;
  }
  return !!value;
};
const toRate = (value, total = 1, fraction = 2) => isNumber(value) && isNumber(total) ? toDecimal(Decimal(value).mul(100).div(total).toNumber(), fraction) + "%" : value;
const toFileSize = (value, unit, currUnit) => {
  if (isNumeric(value)) {
    value = Number(value);
    if (value === 0) {
      return `0${currUnit || unit || "B"}`;
    }
    const fileSize = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    let index = fileSize.indexOf(currUnit);
    if (index > -1) {
      for (let i = 0; i < index; i++) {
        value *= 1024;
      }
    }
    index = fileSize.indexOf(unit);
    if (index < 0) {
      index = fileSize.length - 1;
    }
    let level = 0;
    for (let i = 0; i < index && (value <= -1024 || value >= 1024); i++) {
      value /= 1024;
      level++;
    }
    return toDecimal(value, 2) + fileSize[level];
  }
  return value;
};
const formatFileSize = (size, baseUnit = "") => {
  if ([void 0, null].includes(size)) {
    return "";
  } else if (!isNumber(size) || size <= 0) {
    return size + baseUnit;
  }
  const unitArr = ["B", "K", "M", "G", "T", "P", "E", "Z", "Y"];
  let unitIndex = Math.max(unitArr.indexOf((baseUnit + "").toLocaleUpperCase()), 0);
  while (size >= 1024 && unitIndex < unitArr.length - 1) {
    size = size / 1024;
    unitIndex++;
  }
  while (size < 1 && unitIndex > 0) {
    size = size * 1024;
    unitIndex--;
  }
  return parseFloat(toDecimal(size, 2, true)) + unitArr[unitIndex];
};
const isKorean = text => /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi.test(text);
const omitText = (text, font, w) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.font = font;
  let metric = ctx.measureText(text);
  let t;
  if (metric.width < w) {
    return {
      t: text,
      o: false
    };
  } else {
    for (let i = -1;; i--) {
      t = text.slice(0, i) + "...";
      metric = ctx.measureText(t);
      if (metric.width < w) {
        return {
          t,
          o: true
        };
      }
    }
  }
};
export { camelize, capitalize, escape, escapeChars, escapeHtml, fieldFormat, fillChar, format, formatFileSize, formatTypes, getLength, guid, hyphenate, isKorean, isNullOrEmpty, omitText, random, toBoolValue, toCurrency, toDecimal, toFileSize, toInt, toJson, toNumber, toRate, truncate, tryToConvert, tryToCurrency, tryToDecimal, tryToInt, tryToNumber };