import "../chunk-G2ADBYYC.js";
import { getMiniDecimal, toFixed as roundFixed } from './bigInt.js';
const DECIMAL_SEPARATOR = ".";
const asInteger = number => {
  const tokens = number.split(DECIMAL_SEPARATOR);
  const integer = tokens[0];
  const fractional = tokens[1];
  let value;
  let exp;
  if (fractional) {
    value = parseInt(number.split(DECIMAL_SEPARATOR).join(""), 10);
    exp = fractional.length * -1;
  } else {
    const trailingZeros = integer.match(/0+$/);
    if (trailingZeros) {
      const length = trailingZeros[0].length;
      value = integer.substr(0, integer.length - length);
      exp = length;
    } else {
      value = integer;
      exp = 0;
    }
  }
  return {
    value,
    exp
  };
};
const zero = exp => {
  let result;
  if (exp <= 0) {
    result = "";
  } else if (String.prototype.repeat) {
    result = "0".repeat(exp);
  } else {
    result = (times => {
      const zeros = [];
      for (let i = 0; i < times; i++) {
        zeros.push(0);
      }
      return zeros.join("");
    })(exp);
  }
  return result;
};
const negExp = (str, position) => {
  position = Math.abs(position);
  const offset = position - str.length;
  let sep = DECIMAL_SEPARATOR;
  if (offset >= 0) {
    str = zero(offset) + str;
    sep = "0.";
  }
  const length = str.length;
  const dif = length - position;
  const head = str.substr(0, dif);
  const tail = str.substring(dif, length);
  return head + sep + tail;
};
const posExp = (str, exp) => String(str + zero(exp));
const format = (num, exp) => (exp >= 0 ? posExp : negExp)(String(num), exp);
function Decimal(num) {
  if (!this || this.constructor !== Decimal) {
    return new Decimal(num);
  }
  if (num instanceof Decimal) {
    return num;
  }
  this.internal = String(num);
  this.asInt = asInteger(this.internal);
  this.add = target => {
    const operands = [this, new Decimal(target)];
    operands.sort((x2, y2) => x2.asInt.exp - y2.asInt.exp);
    const smallest = operands[0].asInt.exp;
    const biggest = operands[1].asInt.exp;
    const x = Number(format(operands[1].asInt.value, biggest - smallest));
    const y = Number(operands[0].asInt.value);
    return new Decimal(format(String(x + y), smallest));
  };
  this.sub = target => new Decimal(this.add(target * -1));
  this.mul = target => {
    target = new Decimal(target);
    const result = String(this.asInt.value * target.asInt.value);
    const exp = this.asInt.exp + target.asInt.exp;
    return new Decimal(format(result, exp));
  };
  this.div = target => {
    target = new Decimal(target);
    const smallest = Math.min(this.asInt.exp, target.asInt.exp);
    const absSmallest = 10 ** Math.abs(smallest);
    const x = Decimal.mul(absSmallest, this);
    const y = Decimal.mul(absSmallest, target);
    return new Decimal(x / y);
  };
  this.toString = () => this.internal;
  this.toNumber = () => Number(this.internal);
}
Decimal.add = (a, b) => new Decimal(a).add(b);
Decimal.mul = (a, b) => new Decimal(a).mul(b);
Decimal.sub = (a, b) => new Decimal(a).sub(b);
Decimal.div = (a, b) => new Decimal(a).div(b);
const toFixed = (num, fraction = 0) => {
  const sign = num < 0 ? "-" : "";
  num = Math.abs(num);
  const npmPow = num.toString().length < (2 ** 53).toString().length - 1 ? 10 ** fraction : 10 ** (fraction - 1);
  const result = new Decimal(Math.round(new Decimal(num).mul(npmPow))).div(npmPow).toString();
  const numResult = Number(result);
  return numResult ? sign + numResult.toFixed(fraction) : numResult.toFixed(fraction);
};
const formatInteger = (value, {
  secondaryGroupSize = 3,
  groupSize = 0,
  groupSeparator = ","
}) => {
  const negative = /^-\d+/.test(value);
  let result = negative ? value.slice(1) : value;
  const secSize = secondaryGroupSize || groupSize;
  if (groupSize && result.length > groupSize) {
    let left = result.slice(0, 0 - groupSize);
    const right = result.slice(0 - groupSize);
    left = left.replace(new RegExp(`\\B(?=(\\d{${secSize}})+(?!\\d))`, "g"), groupSeparator);
    result = `${left}${groupSeparator}${right}`;
  }
  return `${negative ? "-" : ""}${result}`;
};
const reverseString = str => {
  const arr = [];
  for (let i = 0; i < str.length; i++) {
    arr.push(str[i]);
  }
  return arr.reverse().join("");
};
const formatDecimal = (num, {
  fractionGroupSize = 0,
  fractionGroupSeparator = "\xA0"
}) => {
  const RE = new RegExp(`\\B(?=(\\d{${fractionGroupSize}})+(?!\\d))`, "g");
  return reverseString(reverseString(num).replace(RE, fractionGroupSeparator));
};
const formatNumber = (value, format2 = {}) => {
  const {
    fraction,
    rounding,
    prefix = "",
    decimalSeparator = ".",
    suffix = ""
  } = format2;
  let reslut = getMiniDecimal(value);
  if (reslut.isNaN() || !reslut.toString()) {
    return value;
  }
  reslut = roundFixed(reslut.toString(), fraction, rounding);
  format2.zeroize === false && reslut.match(/\./) && (reslut = reslut.replace(/\.?0+$/g, ""));
  const number = reslut.toString().split(".").slice(0, 2).map((str, index) => index ? formatDecimal(str, format2) : formatInteger(str, format2)).join(decimalSeparator);
  return `${prefix}${number}${suffix}`;
};
const recoverNumber = (number, format2 = {}) => {
  const {
    prefix = "",
    suffix = "",
    decimalSeparator = "."
  } = format2;
  let result = number;
  if (typeof number === "string") {
    result = number.replace(new RegExp(`^${prefix}(.+)${suffix}$`), ($1, $2) => $2).split(decimalSeparator).map(s => s.replace(/[^\d]/g, "")).join(".");
  }
  return Number(result);
};
export { Decimal, formatNumber, recoverNumber, roundFixed, toFixed };