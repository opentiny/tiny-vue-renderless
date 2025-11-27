import "../../../chunk-G2ADBYYC.js";
import toValString from './toString.js';
import get from './../base/get.js';
const template = (str, obj) => {
  let rest = toValString(str);
  if (rest && obj) {
    return rest.replace(/\{{2}([.\w[\]\s]+)\}{2}/g, (match, keys) => get(obj, keys));
  }
  return rest;
};
var template_default = template;
export { template_default as default };