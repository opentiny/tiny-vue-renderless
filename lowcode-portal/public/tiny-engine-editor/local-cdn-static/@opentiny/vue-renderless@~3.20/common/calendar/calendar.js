import "../../chunk-G2ADBYYC.js";
import { isLeapYear } from './../date.js';
const getDays = (year, month) => {
  return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
};
const getWeek = (year, month, day) => ( /* @__PURE__ */new Date(`${year}/${month}/${day}`)).getDay();
const lastMonth = (year, month) => {
  year = +year;
  month = +month;
  if (month === 1) {
    year--;
    month = 12;
  } else {
    month--;
  }
  return {
    year,
    month
  };
};
const nextMonth = (year, month) => {
  year = +year;
  month = +month;
  if (month === 12) {
    year++;
    month = 1;
  } else {
    month++;
  }
  return {
    year,
    month
  };
};
const getCalendar = (year, month) => {
  if (year && month && month <= 12) {
    const days = getDays(year, month);
    const firstWeek = getWeek(year, month, 1);
    const lastWeek = getWeek(year, month, days);
    const last = lastMonth(year, month);
    const next = nextMonth(year, month);
    const lastDays = getDays(last.year, last.month);
    let remainDays = 0;
    const totalDays = days + firstWeek + 7 - lastWeek - 1;
    if (totalDays / 7 < 6 && totalDays / 7 >= 5) {
      remainDays = 6 * 7 - totalDays;
    }
    return {
      last: {
        year: last.year,
        month: last.month,
        start: lastDays - (firstWeek - 1),
        end: lastDays
      },
      current: {
        year,
        month,
        start: 1,
        end: days
      },
      next: {
        year: next.year,
        month: next.month,
        start: 1,
        end: 7 - lastWeek - 1 + remainDays
      }
    };
  }
};
const transformArray = array => {
  const result = [];
  let index = 0;
  if (array && array.length) {
    const length = array.length / 7;
    for (let i = 0; i < length; i++) {
      result[i] = [];
      for (let j = 0; j < 7; j++) {
        result[i][j] = array[index++];
      }
    }
  }
  return result;
};
const parseDate = time => {
  const date = new Date(time && typeof time === "number" ? time : 0);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  };
};
export { getCalendar, getDays, getWeek, lastMonth, nextMonth, parseDate, transformArray };