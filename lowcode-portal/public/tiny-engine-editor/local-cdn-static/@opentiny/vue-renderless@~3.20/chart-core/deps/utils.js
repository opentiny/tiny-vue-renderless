import { __spreadProps, __spreadValues } from "../../chunk-G2ADBYYC.js";
import { extend, copyArray } from './../../common/object.js';
import { isObject, typeOf as getType, isNull } from './../../common/type.js';
import _debounce from './../../common/deps/debounce.js';
import _numerify from './numerify.js';
import { escapeHtml } from './../../common/string.js';
import { xss } from './../../common/xss.js';
import { setObj, getObj, isEqual } from './../../common/object.js';
import { typeOf, isObject as isObject2 } from './../../common/type.js';
const debounce = (callback, delay) => _debounce(delay, false, callback);
const camelToKebab = str => str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
const cloneDeep = data => {
  if (isObject(data)) {
    return extend(true, data);
  } else if (Array.isArray(data)) {
    return copyArray(data);
  } else {
    return data;
  }
};
const getFormated = (value, type, digit, defaultVal = "-") => {
  if (isNaN(value)) {
    return defaultVal;
  }
  if (!type) {
    return value;
  }
  if (getType(type) === "function") {
    return type(value, _numerify);
  }
  digit = !isNaN(digit) ? ++digit : 0;
  const digitStr = `.[${new Array(digit).join(0)}]`;
  let formatter = type;
  if (type === "KMB") {
    formatter = digit ? `0,0${digitStr}a` : "0,0a";
  } else if (type === "normal") {
    formatter = digit ? `0,0${digitStr}` : "0,0";
  } else if (type === "percent") {
    formatter = digit ? `0,0${digitStr}%` : "0,0.[00]%";
  }
  return _numerify(value, formatter);
};
const getStackMap = stack => {
  const result = {};
  Object.keys(stack).forEach(item => {
    stack[item].forEach(name => {
      result[name] = item;
    });
  });
  return result;
};
const $get = url => new Promise((resolve, reject) => {
  const http = new XMLHttpRequest();
  url = xss.filterUrl(url);
  http.open("GET", url);
  http.send(null);
  http.onload = () => {
    resolve(JSON.parse(http.responseText));
  };
  http.onerror = () => {
    reject(JSON.parse(http.responseText));
  };
});
const mapPromise = {};
const getMapJSON = ({
  position,
  positionJsonLink,
  beforeRegisterMapOnce,
  mapURLProfix = ""
}) => {
  const link = positionJsonLink || `${mapURLProfix}${position}.json`;
  if (!mapPromise[link]) {
    mapPromise[link] = $get(link).then(res => {
      if (beforeRegisterMapOnce) {
        res = beforeRegisterMapOnce(res);
      }
      return res;
    });
  }
  return mapPromise[link];
};
let {
  amapPromise = null,
  bmapPromise = null
} = {};
const getAmap = ({
  key,
  version,
  url
}) => {
  if (!amapPromise) {
    amapPromise = new Promise(resolve => {
      let cbName = "amap" + Date.now();
      let script = document.createElement("script");
      let ver = version || "1.4.3";
      window[cbName] = resolve;
      script.src = [`${url}?v=${ver}`, `key=${key}`, `callback=${cbName}`].join("&");
      document.body.appendChild(script);
    });
  }
  return amapPromise;
};
const getBmap = ({
  key,
  version,
  url
}) => {
  if (!bmapPromise) {
    bmapPromise = new Promise(resolve => {
      let cbName = "bmap" + Date.now();
      let script = document.createElement("script");
      let ver = version || "2.0";
      window[cbName] = resolve;
      script.src = [`${url}?v=${ver}`, `ak=${key}`, `callback=${cbName}`].join("&");
      document.body.appendChild(script);
    });
  }
  return bmapPromise;
};
const setArrayValue = (arr, index, value) => {
  let store = arr[index];
  if (typeof store === "undefined") {
    arr[index] = [value];
    return;
  }
  store.push(value);
};
const numerify = _numerify;
const merge = (source, other) => {
  if (typeof source !== "object" || typeof other !== "object") {
    return other === void 0 ? source : other;
  }
  return Object.keys(__spreadValues(__spreadValues({}, source), other)).reduce((acc, key) => {
    acc[key] = merge(source[key], other[key]);
    return acc;
  }, Array.isArray(source) ? [] : {});
};
const htmlHandler = data => {
  if (!data || !Array.isArray(data)) {
    return data;
  }
  return cloneDeep(data).map(item => {
    if (typeof item === "string" && /<[a-z]+/i.test(item)) {
      return escapeHtml(item);
    } else if (typeof item === "object") {
      for (let key in item) {
        if (typeof item[key] === "string" && /<[a-z]+/i.test(item[key])) {
          item[key] = escapeHtml(item[key]);
        }
      }
      return item;
    } else {
      return item;
    }
  });
};
const getLegend = (args, legendItemStyle) => {
  const {
    metrics,
    legendName,
    labelMap
  } = args;
  if (!labelMap && !legendName) {
    return {
      data: metrics
    };
  }
  const data = labelMap ? metrics.map(item => isNull(labelMap[item]) ? item : labelMap[item]) : metrics;
  return __spreadProps(__spreadValues({}, legendItemStyle), {
    data,
    formatter(name) {
      return isNull(legendName[name]) ? name : legendName[name];
    }
  });
};
const hexToRgb = hex => {
  const reg = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})/;
  if (!reg.test(hex)) {
    return;
  }
  hex = hex.replace(/#/g, "").toLowerCase();
  let len = hex.length;
  if (len === 3) {
    let t = "";
    for (let i = 0; i < len; i++) {
      t += hex.slice(i, i + 1).concat(hex.slice(i, i + 1));
    }
    hex = t;
  }
  const rgbs = [];
  for (let i = 0; i < 6; i += 2) {
    let s = hex.slice(i, i + 2);
    rgbs.push(parseInt(s, 16));
  }
  return rgbs.join(",");
};
export { $get, camelToKebab, cloneDeep, debounce, getObj as get, getAmap, getBmap, getFormated, getLegend, getMapJSON, getStackMap, typeOf as getType, hexToRgb, htmlHandler, isEqual, isObject2 as isObject, merge, numerify, setObj as set, setArrayValue };