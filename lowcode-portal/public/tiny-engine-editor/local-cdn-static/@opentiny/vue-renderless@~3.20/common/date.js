import "../chunk-G2ADBYYC.js";
import { isDate, isNumber, isNumeric } from './type.js';
import { fillChar } from './string.js';
const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const yyyymmddReg = new RegExp("^(\\d{4})(/|-)(((0)?[1-9])|(1[0-2]))((/|-)(((0)?[1-9])|([1-2][0-9])|(3[0-1])))?( ((0)?[0-9]|1[0-9]|20|21|22|23):([0-5]?[0-9])((:([0-5]?[0-9]))?(.([0-9]{1,6}))?)?)?$");
const mmddyyyyReg = new RegExp("^(((0)?[1-9])|(1[0-2]))(/|-)(((0)?[1-9])|([1-2][0-9])|(3[0-1]))?(/|-)?(\\d{4})( ((0)?[0-9]|1[0-9]|20|21|22|23):([0-5]?[0-9])((:([0-5]?[0-9]))?(.([0-9]{1,6}))?)?)?$");
const iso8601Reg = new RegExp("^(\\d{4})-(((0)?[1-9])|(1[0-2]))-(((0)?[1-9])|([1-2][0-9])|(3[0-1]))T(((0)?[0-9]|1[0-9]|20|21|22|23):([0-5]?[0-9])((:([0-5]?[0-9]))?(.([0-9]{1,6}))?)?)?(Z|([+-])((0)?[0-9]|1[0-9]|20|21|22|23):?([0-5]?[0-9]))$");
const dateFormatRegs = {
  "y{1,4}": /y{1,4}/,
  "M{1,2}": /M{1,2}/,
  "d{1,2}": /d{1,2}/,
  "h{1,2}": /h{1,2}/,
  "H{1,2}": /H{1,2}/,
  "m{1,2}": /m{1,2}/,
  "s{1,2}": /s{1,2}/,
  "S{1,3}": /S{1,3}/,
  "Z{1,1}": /Z{1,1}/
};
const maxDateValues = {
  YEAR: 9999,
  MONTH: 11,
  DATE: 31,
  HOUR: 23,
  MINUTE: 59,
  SECOND: 59,
  MILLISECOND: 999
};
const timezone1 = "-12:00,-11:00,-10:00,-09:30,-08:00,-07:00,-06:00,-05:00,-04:30,-04:00,-03:30,-02:00,-01:00";
const timezone2 = "-00:00,+00:00,+01:00,+02:00,+03:00,+03:30,+04:00,+04:30,+05:00,+05:30,+05:45,+06:00";
const timezone3 = "+06:30,+07:00,+08:00,+09:00,+10:00,+10:30,+11:00,+11:30,+12:00,+12:45,+13:00,+14:00";
const timezones = [].concat(timezone1.split(","), timezone2.split(","), timezone3.split(","));
const getTimezone = date => {
  const timezoneoffset = 0 - date.getTimezoneOffset() / 60;
  let timezone;
  if (timezoneoffset === 0) {
    timezone = "Z";
  } else if (timezoneoffset > 0) {
    timezone = "+" + (timezoneoffset > 10 ? timezoneoffset : "0" + timezoneoffset) + "00";
  } else {
    timezone = (timezoneoffset < -10 ? timezoneoffset : "-0" + -timezoneoffset) + "00";
  }
  return timezone;
};
const isLeapYear = year => year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
const getMilliseconds = milliseconds => milliseconds > maxDateValues.MILLISECOND ? Number(String(milliseconds).substring(0, 3)) : milliseconds;
const getDateFromData = ({
  year,
  month,
  date,
  hours,
  minutes,
  seconds,
  milliseconds
}) => {
  let daysInMonth = daysInMonths[month];
  if (isLeapYear(year) && month === 1) {
    daysInMonth += 1;
  }
  if (date <= daysInMonth) {
    return new Date(year, month, date, hours, minutes, seconds, getMilliseconds(milliseconds));
  }
};
const yyyymmddDateParser = m => {
  if (m.length === 23) {
    const year = Number(m[1]);
    const month = m[3] - 1;
    const date = Number(m[9] || 1);
    const hours = m[15] || 0;
    const minutes = m[17] || 0;
    const seconds = m[20] || 0;
    const milliseconds = m[22] || 0;
    return getDateFromData({
      date,
      year,
      hours,
      month,
      seconds,
      minutes,
      milliseconds
    });
  }
};
const mmddyyyyDateParser = m => {
  if (m.length === 22) {
    const year = Number(m[12]);
    const month = m[1] - 1;
    const date = Number(m[6] || 1);
    const hours = m[14] || 0;
    const minutes = m[16] || 0;
    const seconds = m[19] || 0;
    const milliseconds = m[21] || 0;
    return getDateFromData({
      year,
      month,
      date,
      hours,
      minutes,
      seconds,
      milliseconds
    });
  }
};
const iso8601DateParser = m => {
  if (m.length !== 25) {
    return;
  }
  const year = Number(m[1]);
  const month = m[2] - 1;
  const date = Number(m[6]);
  const offset = new Date(year, month, date).getTimezoneOffset();
  const hours = m[12] || 0;
  const minutes = m[14] || 0;
  const seconds = m[17] || 0;
  const milliseconds = m[19] || 0;
  let timeZone = m[20];
  const sign = m[21];
  const offsetHours = m[22] || 0;
  const offsetMinutes = m[24] || 0;
  let daysInMonth = daysInMonths[month];
  let actHours;
  let actMinutes;
  if (isLeapYear(year) && month === 1) {
    daysInMonth += 1;
  }
  if (date <= daysInMonth) {
    if (timeZone === "Z") {
      actHours = hours - offset / 60;
      actMinutes = minutes;
    } else {
      if (!timeZone.includes(":")) {
        timeZone = timeZone.substr(0, 3) + ":" + timeZone.substr(3);
      }
      if (!timezones.includes(timeZone)) {
        return;
      }
      actHours = sign === "+" ? hours - offsetHours - offset / 60 : Number(hours) + Number(offsetHours) - offset / 60;
      actMinutes = sign === "+" ? minutes - offsetMinutes : Number(minutes) + Number(offsetMinutes);
    }
    return new Date(year, month, date, actHours, actMinutes, seconds, getMilliseconds(milliseconds));
  }
};
const dateParsers = [[yyyymmddReg, yyyymmddDateParser], [mmddyyyyReg, mmddyyyyDateParser], [iso8601Reg, iso8601DateParser]];
const parseDate = str => {
  for (let i = 0, len = dateParsers.length; i < len; i++) {
    const m = dateParsers[i][0].exec(str);
    if (m && m.length > 0) {
      return dateParsers[i][1](m);
    }
  }
};
const matchDateArray = (arr, value, text) => {
  if (text) {
    switch (text) {
      case "yyyy":
      case "yy":
        arr[0] = value;
        break;
      case "M":
      case "MM":
        arr[1] = value - 1;
        break;
      case "d":
      case "dd":
        arr[2] = value;
        break;
      case "h":
      case "hh":
        arr[3] = value;
        break;
      case "m":
      case "mm":
        arr[4] = value;
        break;
      case "s":
      case "ss":
        arr[5] = value;
        break;
      case "S":
      case "SS":
      case "SSS":
        arr[6] = value;
        break;
      default:
        break;
    }
  }
};
const getDateArray = (str, dateFormat) => {
  const arr = [0, -1, 0, 0, 0, 0];
  if (str.length !== dateFormat.length) {
    return arr;
  }
  let valuePos = 0;
  let textPos = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    const charValue = str.substr(i, 1);
    const notNum = isNaN(Number(charValue)) || charValue.trim() === "";
    if (notNum && charValue === dateFormat.substr(i, 1) || i === len - 1) {
      let value;
      let text;
      if (notNum) {
        value = str.substring(valuePos, i);
        valuePos = i + 1;
        const end = dateFormat.indexOf(charValue, textPos);
        text = dateFormat.substring(textPos, end === -1 ? dateFormat.length : end);
        textPos = end + 1;
      } else {
        value = str.substring(valuePos, len);
        text = dateFormat.substring(textPos, len);
      }
      if (value.length === text.length || value) {
        matchDateArray(arr, value, text);
      }
    }
  }
  return arr;
};
const invalideTime = (time, min, max) => isNaN(time) || time < min || time > max;
const invalideValue = ({
  year,
  month,
  date,
  hours,
  minutes,
  seconds,
  milliseconds
}) => invalideTime(year, 0, maxDateValues.YEAR) || invalideTime(month, 0, maxDateValues.MONTH) || invalideTime(date, 0, maxDateValues.DATE) || invalideTime(hours, 0, maxDateValues.HOUR) || invalideTime(minutes, 0, maxDateValues.MINUTE) || invalideTime(seconds, 0, maxDateValues.SECOND) || invalideTime(milliseconds, 0, maxDateValues.MILLISECOND);
const innerParse = (value, dateFormat) => {
  if (typeof dateFormat === "string") {
    const arr = getDateArray(value, dateFormat);
    const year = Number(arr[0]);
    const month = Number(arr[1]);
    const date = Number(arr[2] || 1);
    const hours = Number(arr[3] || 0);
    const minutes = Number(arr[4] || 0);
    const seconds = Number(arr[5] || 0);
    const milliseconds = Number(arr[6] || 0);
    if (invalideValue({
      year,
      month,
      date,
      hours,
      minutes,
      seconds,
      milliseconds
    })) {
      return;
    }
    return getDateFromData({
      year,
      date,
      month,
      minutes,
      hours,
      milliseconds,
      seconds
    });
  } else {
    return parseDate(value);
  }
};
const toDate = (value, dateFormat, minDate) => {
  let date;
  if (isNumber(value)) {
    date = new Date(value);
  } else if (typeof value === "string") {
    date = innerParse(value, dateFormat);
  }
  if (minDate) {
    const min = minDate && toDate(minDate) || new Date(1, 1, 1, 0, 0, 0);
    return date && date < min ? min : date;
  }
  return date;
};
const format = function (date, dateFormat = "yyyy/MM/dd hh:mm:ss") {
  if (isDate(date)) {
    if (typeof dateFormat === "string") {
      const o = {
        "y{1,4}": date.getFullYear(),
        "M{1,2}": date.getMonth() + 1,
        "d{1,2}": date.getDate(),
        "h{1,2}": date.getHours(),
        "H{1,2}": date.getHours(),
        "m{1,2}": date.getMinutes(),
        "s{1,2}": date.getSeconds(),
        "S{1,3}": date.getMilliseconds(),
        "Z{1,1}": getTimezone(date)
      };
      Object.keys(o).forEach(k => {
        const m = dateFormat.match(dateFormatRegs[k]);
        if (k && m && m.length) {
          dateFormat = dateFormat.replace(m[0], k === "Z{1,1}" ? o[k] : fillChar(o[k].toString(), m[0].length));
        }
      });
      return dateFormat;
    }
  } else if (typeof date === "string" && arguments.length >= 2) {
    let afterFormat = dateFormat;
    if (arguments.length === 2) {
      dateFormat = void 0;
    } else {
      afterFormat = arguments[2];
    }
    const dateValue = toDate(date, dateFormat);
    return dateValue ? format(dateValue, afterFormat) : "";
  }
};
const getDateWithNewTimezone = (date, otz, ntz, timezoneOffset = 0) => {
  if (!isDate(date) || !isNumeric(otz) || !isNumeric(ntz) || !isNumeric(timezoneOffset)) {
    return;
  }
  const otzOffset = -otz * 60;
  const ntzOffset = -ntz * 60;
  const dstOffeset = timezoneOffset * 60;
  const utc = date.getTime() + otzOffset * 6e4;
  return new Date(utc - (ntzOffset - dstOffeset) * 6e4);
};
const toDateStr = (date, dateFormat, timezone) => {
  if (date && isNumeric(timezone)) {
    timezone = parseFloat(parseFloat(timezone).toFixed(2));
    date = getDateWithNewTimezone(isDate(date) ? date : new Date(toDate(date)), 0, timezone);
  }
  return format(date, dateFormat);
};
const getWeekOfFirstDay = (date, isSunFirst) => {
  typeof date === "boolean" && (isSunFirst = date);
  isDate(date) || (date = /* @__PURE__ */new Date());
  const day = date.getDay();
  let dayOfMonth = date.getDate();
  if (day === 0) {
    !isSunFirst && (dayOfMonth -= 6);
  } else {
    dayOfMonth = dayOfMonth - day + (!isSunFirst && 1);
  }
  return new Date(date.getFullYear(), date.getMonth(), dayOfMonth);
};
const TZRE = /(-|\+)(\d{2}):?(\d{2})$/;
const getLocalTimezone = () => 0 - ( /* @__PURE__ */new Date()).getTimezoneOffset() / 60;
const getStrTimezone = value => {
  const localTimeZone = getLocalTimezone();
  const match = typeof value === "string" && value.match(TZRE);
  if (match) {
    const minoffset = Number(match[2]) + Number(match[3]) / 60;
    value = minoffset * `${match[1]}1`;
  }
  if (isNumber(value) && value >= -12 && value <= 12) {
    return value;
  }
  return localTimeZone;
};
export { format, getDateWithNewTimezone, getLocalTimezone, getStrTimezone, getWeekOfFirstDay, isLeapYear, toDate, toDateStr };