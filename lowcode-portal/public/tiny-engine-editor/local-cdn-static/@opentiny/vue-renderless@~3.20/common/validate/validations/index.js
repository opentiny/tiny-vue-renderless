import "../../../chunk-G2ADBYYC.js";
import date from './date.js';
import type from './type.js';
import float from './float.js';
import array from './array.js';
import string from './string.js';
import method from './method.js';
import number from './number.js';
import integer from './integer.js';
import pattern from './pattern.js';
import required from './required.js';
import enumValidator from './enum.js';
var validations_default = {
  date,
  float,
  array,
  string,
  method,
  number,
  integer,
  pattern,
  required,
  hex: type,
  url: type,
  time: type,
  email: type,
  digits: type,
  dateYM: type,
  speczh: type,
  dateYMD: type,
  version: type,
  fileSize: type,
  regexp: method,
  object: method,
  dateTime: type,
  specialch: type,
  boolean: method,
  acceptImg: type,
  specialch2: type,
  acceptFile: type,
  longDateTime: type,
  enum: enumValidator
};
export { validations_default as default };