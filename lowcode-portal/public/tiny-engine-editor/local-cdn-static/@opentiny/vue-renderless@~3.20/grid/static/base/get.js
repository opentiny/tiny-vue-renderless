import "../../../chunk-G2ADBYYC.js";
import eqNull from './eqNull.js';
import hasOwnProp from './hasOwnProp.js';
import isUndefined from './isUndefined.js';
import helperGetHGSKeys from './helperGetHGSKeys.js';
import staticHGKeyRE from './../static/staticHGKeyRE.js';
const valGet = (obj, key) => {
  const matchs = key ? key.match(staticHGKeyRE) : "";
  return matchs ? matchs[1] ? obj[matchs[1]] ? obj[matchs[1]][matchs[2]] : void 0 : obj[matchs[2]] : obj[key];
};
const pathGet = (obj, property) => {
  if (!obj) {
    return;
  }
  let rest;
  let index = 0;
  const getRest = (len, props) => {
    for (rest = obj; index < len; index++) {
      rest = valGet(rest, props[index]);
      if (eqNull(rest)) {
        return;
      }
    }
  };
  if (obj[property] || hasOwnProp(obj, property)) {
    return obj[property];
  } else {
    const props = helperGetHGSKeys(property);
    const len = props.length;
    if (len) {
      getRest(len, props);
    }
    return rest;
  }
};
const get = (obj, property, defaultValue) => {
  if (eqNull(obj)) {
    return defaultValue;
  }
  const result = pathGet(obj, property);
  return isUndefined(result) ? defaultValue : result;
};
var get_default = get;
export { get_default as default };