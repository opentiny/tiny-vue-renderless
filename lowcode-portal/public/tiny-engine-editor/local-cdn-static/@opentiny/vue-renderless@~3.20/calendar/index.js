import "../chunk-G2ADBYYC.js";
import { copyArray } from './../common/object.js';
import { lastMonth, nextMonth, getCalendar, transformArray, parseDate } from './../common/calendar/calendar.js';
const computedCalendar = ({
  state
}) => () => {
  const calendar = getCalendar(state.activeYear, state.activeMonth);
  const result = [];
  if (calendar) {
    const {
      last,
      current,
      next
    } = calendar;
    if (last && calendar.last.end >= calendar.last.start) {
      for (let i = last.start; i <= last.end; i++) {
        result.push({
          value: i,
          isLast: true
        });
      }
    }
    if (current) {
      for (let i = current.start; i <= current.end; i++) {
        result.push({
          value: i
        });
      }
    }
    if (next.end >= next.start) {
      for (let i = next.start; i <= next.end; i++) {
        result.push({
          value: i,
          isNext: true
        });
      }
    }
  }
  return transformArray(result);
};
const computedEventList = ({
  props,
  state
}) => () => {
  let result = [];
  if (props.events && props.events.length) {
    result = props.events.filter(item => {
      const {
        year,
        month
      } = parseDate(item.time);
      return Number(state.activeYear) === year && Number(state.activeMonth) === month;
    });
  }
  return result;
};
const toggeModel = state => mode => {
  const isYearOrMonth = /^(year|month)$/.test(mode);
  state.displayMode = isYearOrMonth ? mode : state.displayMode === "year" ? "month" : "year";
};
const selectMonth = state => month => {
  if (month && typeof month === "number" && month <= 12) {
    state.activeMonth = month;
  }
};
const selectDay = state => day => {
  if (day && day.value) {
    if (day.isLast) {
      const {
        year,
        month
      } = lastMonth(state.activeYear, state.activeMonth);
      state.activeMonth = month;
      state.activeYear = year;
    }
    if (day.isNext) {
      const {
        year,
        month
      } = nextMonth(state.activeYear, state.activeMonth);
      state.activeMonth = month;
      state.activeYear = year;
    }
    state.selectedTip = `You selected date: ${state.activeYear}-${state.activeMonth}-${day.value}`;
    state.selectedDate = Number( /* @__PURE__ */new Date(`${state.activeYear}/${state.activeMonth}/${day.value}`));
  }
};
const getEventByDay = state => day => {
  let events = [];
  if (state.eventList && state.eventList.length) {
    events = copyArray(state.eventList).filter(({
      time
    }) => {
      const date = new Date(time);
      return date.getDate() === day && date.getFullYear() === Number(state.activeYear) && date.getMonth() + 1 === Number(state.activeMonth);
    }).map(event => {
      event.parseTime = parseDate(event.time);
      return event;
    });
  }
  return events;
};
const getEventByMonth = ({
  props,
  state
}) => month => {
  let events = [];
  if (props.events) {
    events = copyArray(props.events).filter(({
      time
    }) => {
      const date = new Date(time);
      return date.getFullYear() === Number(state.activeYear) && date.getMonth() + 1 === month;
    }).map(event => {
      event.parseTime = parseDate(event.time);
      return event;
    });
  }
  return events;
};
const getTime = state => day => Number( /* @__PURE__ */new Date(`${state.activeYear}/${state.activeMonth}/${day}`));
const getYearList = () => () => {
  const date = /* @__PURE__ */new Date();
  const year = date.getFullYear();
  const yesrs = [];
  for (let i = year - 10; i < year + 10; i++) {
    yesrs.push(i);
  }
  return yesrs;
};
const isToday = state => day => {
  const date = /* @__PURE__ */new Date();
  let year = Number(state.activeYear);
  let month = Number(state.activeMonth);
  if (day.isLast) {
    const lastDate = lastMonth(state.activeYear, state.activeMonth);
    year = lastDate.year;
    month = lastDate.month;
  }
  if (day.isNext) {
    const nextDate = nextMonth(state.activeYear, state.activeMonth);
    year = nextDate.year;
    month = nextDate.month;
  }
  return date.getDate() === day.value && date.getFullYear() === year && date.getMonth() + 1 === month;
};
const isThisMonth = state => month => {
  const date = /* @__PURE__ */new Date();
  const year = Number(state.activeYear);
  return date.getMonth() + 1 === month && date.getFullYear() === year;
};
const genMonths = () => {
  const result = [];
  let index = 1;
  for (let i = 0; i < 3; i++) {
    result[i] = [];
    for (let j = 0; j < 4; j++) {
      result[i][j] = index++;
    }
  }
  return result;
};
const toToday = state => () => {
  const year = ( /* @__PURE__ */new Date()).getFullYear();
  const month = ( /* @__PURE__ */new Date()).getMonth() + 1;
  const day = ( /* @__PURE__ */new Date()).getDate();
  state.activeMonth = month;
  state.activeYear = year;
  state.selectedTip = `You selected date: ${year}-${month}-${day}`;
  state.selectedDate = Number( /* @__PURE__ */new Date(`${year}/${month}/${day}`));
};
const getCurrentDate = () => {
  const day = ( /* @__PURE__ */new Date()).getDate();
  const month = ( /* @__PURE__ */new Date()).getMonth() + 1;
  const year = ( /* @__PURE__ */new Date()).getFullYear();
  return Number( /* @__PURE__ */new Date(`${year}/${month}/${day}`));
};
export { computedCalendar, computedEventList, genMonths, getCurrentDate, getEventByDay, getEventByMonth, getTime, getYearList, isThisMonth, isToday, selectDay, selectMonth, toToday, toggeModel };