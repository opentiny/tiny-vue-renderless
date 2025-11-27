import "../chunk-G2ADBYYC.js";
const unknownProp = null;
const numericProp = [Number, String];
const truthProp = {
  type: Boolean,
  default: true
};
const makeRequiredProp = (type) => ({
  type,
  required: true
});
const makeArrayProp = () => ({
  type: Array,
  default: () => []
});
const makeNumberProp = (defaultVal) => ({
  type: Number,
  default: defaultVal
});
const makeNumericProp = (defaultVal) => ({
  type: numericProp,
  default: defaultVal
});
const makeStringProp = (defaultVal) => ({
  type: String,
  default: defaultVal
});
const makeStringValidProp = (defaultVal, optionals = []) => ({
  type: String,
  default: defaultVal,
  validator: (val) => optionals.includes(val)
});
export {
  makeArrayProp,
  makeNumberProp,
  makeNumericProp,
  makeRequiredProp,
  makeStringProp,
  makeStringValidProp,
  numericProp,
  truthProp,
  unknownProp
};
