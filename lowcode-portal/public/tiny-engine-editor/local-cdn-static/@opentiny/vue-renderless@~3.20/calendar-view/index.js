import { __spreadValues } from "../chunk-G2ADBYYC.js";
import { cloneDeep } from './../chart-core/deps/utils.js';
import { getDirection } from './../common/deps/touch.js';
import { getDays, lastMonth, nextMonth, getCalendar, transformArray } from './../common/calendar/calendar.js';
const getTime = date => new Date(date).getTime();
const newSchedule = ({
  emit
}) => date => emit("new-schedule", date);
const isShowNewSchedule = ({
  props
}) => date => props.showNewSchedule instanceof Function ? props.showNewSchedule(date) : false;
const isShowMark = ({
  props
}) => date => props.showMark instanceof Function ? props.showMark(date) : false;
const genDayTimes = ({
  props
}) => () => {
  const dayTimes = [];
  const defaultStartTime = props._constants.DAY_START_HOUR;
  const defaultEndTime = props._constants.DAY_END_HOUR;
  const startTime = isNaN(Number(props.dayTimes[0])) ? defaultStartTime : Number(props.dayTimes[0]);
  const endTime = isNaN(Number(props.dayTimes[1])) ? defaultEndTime : Number(props.dayTimes[1]);
  for (let i = startTime; i <= endTime; i++) {
    dayTimes.push({
      text: i + ":00",
      time: i + ":00:00"
    }, {
      text: i + ":30",
      time: i + ":30:00"
    });
  }
  return dayTimes;
};
const getEventShowTime = ({
  state
}) => (type, event, date) => {
  if (type === "start") {
    return event.start <= + /* @__PURE__ */new Date(date + " " + state.dayStartTime) ? state.dayStartTime : event.startTime;
  } else {
    return event.end >= + /* @__PURE__ */new Date(date + " " + state.dayEndTime) ? state.dayEndTime : event.endTime;
  }
};
const handleMouseenter = ({
  state,
  vm
}) => ($event, val) => {
  const tooltip = vm.$refs.tooltip;
  tooltip.state.referenceElm = $event.target;
  tooltip.state.popperElm && (tooltip.state.popperElm.style.display = "none");
  tooltip.doDestroy();
  state.eventTipContent = val;
  state.eventTipVisible = true;
  setTimeout(tooltip.updatePopper, 20);
};
const handleMouseleave = ({
  state
}) => () => {
  state.eventTipVisible = false;
};
const isSelectedDate = ({
  state
}) => day => {
  if (day.isLast || day.isNext) return false;
  const date = day.value ? state.activeYear + "-" + state.activeMonth + "-" + day.value : day;
  if (state.multiSelect) {
    return state.selectedDates.includes(date);
  } else {
    return +new Date(state.selectedDate) === +new Date(date);
  }
};
const getDayBgColor = ({
  props
}) => day => {
  const date = day.year + "-" + day.month + "-" + day.value;
  const isFunction = props.setDayBgColor instanceof Function;
  const bgColor = isFunction ? props.setDayBgColor(date) : "white";
  return bgColor;
};
const parseDate = time => {
  let date = {};
  if (new Date(time) !== "Invalid Date") {
    date = new Date(time);
  } else {
    date = /* @__PURE__ */new Date();
  }
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  };
};
const computedCalendar = ({
  props,
  state
}) => type => {
  let year = state.activeYear;
  let month = state.activeMonth;
  if (type === "prev") {
    year = lastMonth(year, month).year;
    month = lastMonth(year, month).month;
  } else if (type === "next") {
    year = nextMonth(year, month).year;
    month = nextMonth(year, month).month;
  }
  const isFunction = props.disabled instanceof Function;
  const calendar = getCalendar(year, month);
  const result = [];
  if (calendar) {
    const {
      last,
      current,
      next
    } = calendar;
    if (last && calendar.last.end >= calendar.last.start) {
      result.push(...getCalendarItem(last, props, isFunction, type, false, true));
    }
    if (current) {
      result.push(...getCalendarItem(current, props, isFunction, type, false, false));
    }
    if (next.end >= next.start) {
      result.push(...getCalendarItem(next, props, isFunction, type, true, false));
    }
  }
  return transformArray(result);
};
const getCalendarItem = function (item, props, isFunction, type, isNext, isLast) {
  const res = [];
  for (let i = item.start; i <= item.end; i++) {
    let disabled = type === "cur" && isFunction ? props.disabled(item.year + "-" + item.month + "-" + i) : false;
    res.push({
      value: i,
      year: item.year,
      month: item.month,
      isNext,
      isLast,
      disabled
    });
  }
  return res;
};
const handleEvents = ({
  props,
  state
}) => () => {
  let result = [];
  const dayMillisecond = 24 * 60 * 60 * 1e3;
  const lastYear = lastMonth(state.activeYear, state.activeMonth).year;
  const lastMon = lastMonth(state.activeYear, state.activeMonth).month;
  const nextYear = nextMonth(state.activeYear, state.activeMonth).month;
  const nextMon = nextMonth(state.activeYear, state.activeMonth).month;
  if (props.events && props.events.length) {
    props.events.forEach(prop => {
      const item = __spreadValues({}, prop);
      const {
        year: startYear,
        month: startMonth,
        day: startDay,
        hours: startHours,
        minutes: startMinutes,
        seconds: startSeconds
      } = parseDate(item.start);
      const {
        year: endYear,
        month: endMonth,
        day: endDay,
        hours: endHours,
        minutes: endMinutes,
        seconds: endSeconds
      } = parseDate(item.end);
      if ([lastYear, +state.activeYear, nextYear].includes(startYear) && [lastMon, +state.activeMonth, nextMon].includes(startMonth) || [lastYear, +state.activeYear, nextYear].includes(endYear) && [lastMon, +state.activeMonth, nextMon].includes(endMonth)) {
        item.start = getTime(item.start);
        item.end = getTime(item.end);
        item.startTime = makeUpZero(startHours) + ":" + makeUpZero(startMinutes) + ":" + makeUpZero(startSeconds);
        item.endTime = makeUpZero(endHours) + ":" + makeUpZero(endMinutes) + ":" + makeUpZero(endSeconds);
        item.startDay = startYear + "-" + startMonth + "-" + startDay;
        item.endDay = endYear + "-" + endMonth + "-" + endDay;
        const startTimestamp = getTime(startYear + "-" + startMonth + "-" + startDay);
        const endTimestamp = getTime(endYear + "-" + endMonth + "-" + endDay);
        const days = Math.abs(endTimestamp - startTimestamp) / dayMillisecond;
        item.dayNumber = days >= 1 ? days + 1 : 1;
        if (props.modes.includes("timeline")) {
          item.dayArr = [];
          item.dayArr = cloneDeep(splitEvent(props, item));
        }
        result.push(item);
      }
    });
  }
  state.eventsChangeHash = + /* @__PURE__ */new Date();
  state.events = [...result];
};
function splitEvent(props, event) {
  const result = [];
  const startDay = new Date(event.startDay);
  const dayMillisecond = 24 * 60 * 60 * 1e3;
  if (event.dayNumber > 1) {
    for (let i = 0; i < event.dayNumber; i++) {
      let copyObj = JSON.parse(JSON.stringify(event));
      let dayStartTimeStamp = new Date(startDay.getTime() + i * dayMillisecond);
      if (i === 0) {
        copyObj.realStart = copyObj.start;
        copyObj.realEnd = new Date(dayStartTimeStamp).setHours(props.dayTimes[1]);
      } else if (i === event.dayNumber - 1) {
        copyObj.realStart = new Date(dayStartTimeStamp).setHours(props.dayTimes[0]);
        copyObj.realEnd = copyObj.end;
      } else {
        copyObj.realStart = new Date(dayStartTimeStamp).setHours(props.dayTimes[0]);
        copyObj.realEnd = new Date(dayStartTimeStamp).setHours(props.dayTimes[1]);
      }
      result.push(copyObj);
    }
  } else {
    event.realStart = event.start;
    event.realEnd = event.end;
    result.push(event);
  }
  return result;
}
const selectDay = ({
  state,
  emit
}) => (day, i) => {
  if (!day || !day.value || day.disabled) return;
  state.activedWeekIndex = i;
  if (state.multiSelect) {
    if (day.isLast || day.isNext) return;
    const date = state.activeYear + "-" + state.activeMonth + "-" + day.value;
    const index = state.selectedDates.findIndex(item => item === date);
    if (index >= 0) {
      state.selectedDates.splice(index, 1);
    } else {
      state.selectedDates.push(date);
    }
    emit("update:modelValue", state.selectedDates);
    emit("selected-date-change", state.selectedDates);
    emit("date-click", date);
  } else {
    if (day.isNext) {
      const {
        year,
        month
      } = nextMonth(state.activeYear, state.activeMonth);
      state.activeMonth = month;
      state.activeYear = year;
    }
    if (day.isLast) {
      const {
        year,
        month
      } = lastMonth(state.activeYear, state.activeMonth);
      state.activeMonth = month;
      state.activeYear = year;
    }
    state.selectedDate = day.value.toString().length > 2 ? day.value : `${state.activeYear}-${state.activeMonth}-${day.value}`;
    state.showSelectedDateEvents = true;
    emit("update:modelValue", state.selectedDate);
    emit("date-click", state.selectedDate);
  }
};
const getEventByMonth = ({
  state
}) => (year, month) => {
  const result = [];
  const days = getDays(Number(year), Number(month));
  state.monthEventsLength = 0;
  for (let i = 1; i <= days; i++) {
    const date = year + "-" + month + "-" + i;
    const startTime = getTime(date + " " + state.dayStartTime);
    const endTime = getTime(date + " " + state.dayEndTime);
    const obj = {
      date,
      day: state.weekDays[new Date(date).getDay()],
      events: []
    };
    state.events.forEach(item => {
      if (eventInThisTime(item, startTime, endTime)) {
        obj.events.push(item);
        state.monthEventsLength += 1;
      }
    });
    result.push(obj);
  }
  return result;
};
const getCurWeekEvent = ({
  state,
  api
}) => () => {
  state.curWeekEvents = {};
  state.weekDates.forEach(date => {
    api.getEventByDate(date.value);
  });
  setEventsLeftOffset(state);
};
const setEventsLeftOffset = state => {
  if (!state.curWeekEvents) return;
  const offset = 5;
  for (let day in state.curWeekEvents) {
    const dayArrs = [];
    state.curWeekEvents[day].forEach(item => {
      if (item.dayArr) {
        dayArrs.push(...item.dayArr);
      }
    });
    dayArrs.sort((a, b) => Math.abs(b.realEnd - b.realStart) - Math.abs(a.realEnd - a.realStart));
    let repeatTimes = 0;
    for (let i = 0; i < dayArrs.length; i++) {
      for (let j = 0; j < dayArrs.length; j++) {
        if (i !== j && (dayArrs[i].realStart >= dayArrs[j].realStart && dayArrs[i].realStart <= dayArrs[j].realEnd || dayArrs[j].realStart >= dayArrs[i].realStart && dayArrs[j].realStart <= dayArrs[i].realEnd)) {
          dayArrs[i].left = repeatTimes * offset;
          repeatTimes++;
          break;
        }
      }
    }
  }
};
const getEventByDate = ({
  state
}) => (date, events) => {
  const startTime = getTime(date + " " + state.dayStartTime);
  const endTime = getTime(date + " " + state.dayEndTime);
  state.curWeekEvents[date] = [];
  events ? events = [] : state.curWeekEvents[date] = [];
  state.events.forEach(item => {
    if (eventInThisTime(item, startTime, endTime)) {
      events ? events.push(item) : state.curWeekEvents[date].push(item);
    }
  });
};
const getEventByTime = ({
  props,
  state
}) => (day, start, end) => {
  const date = typeof day === "object" ? day.year + "-" + day.month + "-" + day.value : day;
  const startTime = getTime(date + " " + start);
  const endTime = getTime(date + " " + (end || start));
  let result = [];
  if (state.mode === "timeline") {
    const halfHourMillisecond = 30 * 60 * 1e3;
    const cellHeight = props._constants.CELL_HEIGHT;
    const timeZero = ":00:00";
    state.events.forEach(event => {
      if (!event.dayArr) return;
      event.dayArr.forEach(item => {
        if (item.realStart >= startTime && item.realStart < endTime) {
          const sTime = getTime(item.startDay + " " + props.dayTimes[0] + timeZero);
          const startStamp = item.realStart < sTime ? sTime : item.realStart;
          const eTime = getTime(item.endDay + " " + props.dayTimes[1] + timeZero);
          const endStamp = item.realEnd > eTime ? eTime : item.realEnd;
          item.height = Math.abs(endStamp - startStamp) / halfHourMillisecond * cellHeight - 4;
          result.push(item);
        }
      });
    });
  } else {
    result = state.events.filter(item => eventInThisTime(item, startTime, endTime));
    result.sort((a, b) => Math.abs(b.end - b.start) - Math.abs(a.end - a.start));
  }
  return result;
};
const isStartOrEndDay = ({
  state
}) => (type, day, start, end, event) => {
  const date = day.toString().length > 2 ? day : state.activeYear + "-" + state.activeMonth + "-" + day;
  const startTime = getTime(date + " " + start);
  const endTime = getTime(date + " " + (end || start));
  if (type === "start") {
    return event.start >= startTime && event.start < endTime;
  } else {
    return event.end >= startTime && event.end <= endTime;
  }
};
const isToday = state => day => {
  const date = /* @__PURE__ */new Date();
  let year = +state.activeYear;
  let month = +state.activeMonth;
  if (day.isNext) {
    const nextDate = nextMonth(state.activeYear, state.activeMonth);
    year = nextDate.year;
    month = nextDate.month;
  }
  if (day.isLast) {
    const lastDate = lastMonth(state.activeYear, state.activeMonth);
    year = lastDate.year;
    month = lastDate.month;
  }
  return date.getDate() === day.value && date.getFullYear() === year && date.getMonth() + 1 === month;
};
const dateIsToday = () => day => {
  const curDate = /* @__PURE__ */new Date();
  const date = new Date(day);
  return curDate.getDate() === date.getDate() && curDate.getFullYear() === date.getFullYear() && curDate.getMonth() === date.getMonth();
};
const toToday = ({
  state,
  api,
  nextTick
}) => () => {
  if (state.mode === "month") {
    const todayDate = /* @__PURE__ */new Date();
    const year = todayDate.getFullYear();
    const month = todayDate.getMonth() + 1;
    state.activeMonth = month;
    state.activeYear = year;
  } else {
    nextTick(() => {
      api.initWeeklyCalendar( /* @__PURE__ */new Date());
    });
  }
};
const currentDateChange = ({
  state,
  api
}) => date => {
  const currentDate = new Date(date);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  state.activeMonth = month;
  state.activeYear = year;
  if (state.mode !== "month") {
    api.getAllWednesdaysInMonth(currentDate);
    api.getAllDatesOfCurrWeek(state.monthWednesdays[0]);
  }
};
const getAllWednesdaysInYear = ({
  state
}) => year => {
  state.wholeYearWednesdays = [];
  for (let month = 0; month < 12; month++) {
    let date = new Date(year, month, 1);
    while (date.getDay() !== state.wednesday) {
      date.setDate(date.getDate() + 1);
    }
    while (date.getMonth() === month) {
      state.wholeYearWednesdays.push(formatDate(new Date(date)));
      date.setDate(date.getDate() + 7);
    }
  }
};
const getAllWednesdaysInMonth = ({
  state
}) => date => {
  state.monthWednesdays = [];
  let monthDate = new Date(date);
  monthDate.setDate(1);
  const curMonth = monthDate.getMonth();
  while (monthDate.getDay() !== state.wednesday) {
    monthDate.setDate(monthDate.getDate() + 1);
  }
  while (monthDate.getMonth() === curMonth) {
    state.monthWednesdays.push(formatDate(new Date(monthDate.getTime())));
    monthDate.setDate(monthDate.getDate() + 7);
  }
};
const getAllDatesOfCurrWeek = ({
  props,
  state
}) => date => {
  state.weekDates = [];
  const weekDateOnly = [];
  let weekDate = new Date(date);
  const isFunction = props.disabled instanceof Function;
  weekDate.setDate(weekDate.getDate() - weekDate.getDay());
  for (let i = 0; i < 7; i++) {
    const obj = {
      value: formatDate(new Date(weekDate)),
      disabled: isFunction ? props.disabled(formatDate(new Date(weekDate))) : false
    };
    state.weekDates.push(obj);
    weekDateOnly.push(formatDate(new Date(weekDate)).split("-")[2]);
    weekDate.setDate(weekDate.getDate() + 1);
  }
  const lastWeekDate = new Date(state.weekDates[state.wednesday].value);
  state.activeMonth = lastWeekDate.getMonth() + 1;
  state.activeYear = lastWeekDate.getFullYear();
};
const getWeekOfDate = () => (type, date) => {
  const weekDates = [];
  const aWeekTimestamp = 7 * 24 * 60 * 60 * 1e3;
  let nextDate = 0;
  if (type === "prev") {
    nextDate = getTime(date) - aWeekTimestamp;
  } else {
    nextDate = getTime(date) + aWeekTimestamp;
  }
  let weekDate = new Date(nextDate);
  weekDate.setDate(weekDate.getDate() - weekDate.getDay());
  for (let i = 0; i < 7; i++) {
    const obj = {
      value: formatDate(new Date(weekDate)),
      disabled: false
    };
    weekDates.push(obj);
    weekDate.setDate(weekDate.getDate() + 1);
  }
  return weekDates;
};
const handleDropBtnClick = ({
  api,
  state
}) => () => {
  if (state.selectedDate && state.showMonth) {
    const sYear = new Date(state.selectedDate).getFullYear();
    const sMonth = new Date(state.selectedDate).getMonth() + 1;
    const curWeekStartTime = new Date(state.weekDates[0]).getTime();
    const curWeekEndTime = new Date(state.weekDates[6]).getTime();
    const selectedDateTime = new Date(state.selectedDate).getTime();
    if (+state.activeYear === sYear && +state.activeMonth === sMonth && !(selectedDateTime >= curWeekStartTime && selectedDateTime <= curWeekEndTime)) {
      api.getAllDatesOfCurrWeek(state.selectedDate);
    }
  }
  state.showMonth = !state.showMonth;
};
const initWeeklyCalendar = ({
  state,
  api
}) => date => {
  const curDate = new Date(date);
  api.getAllWednesdaysInYear(curDate.getFullYear());
  api.getAllDatesOfCurrWeek(curDate);
  api.getAllWednesdaysInMonth(state.weekDates[state.wednesday].value);
};
const getDatesOfPreviousWeek = ({
  state,
  api
}) => current => {
  let prevDate = new Date(current);
  api.getAllWednesdaysInYear(prevDate.getFullYear());
  api.getAllDatesOfCurrWeek(prevDate);
  api.getAllWednesdaysInMonth(state.weekDates[state.wednesday].value);
};
const getDatesOfNextWeek = ({
  state,
  api
}) => current => {
  let nextDate = new Date(current);
  api.getAllWednesdaysInYear(nextDate.getFullYear());
  api.getAllDatesOfCurrWeek(nextDate);
  api.getAllWednesdaysInMonth(state.weekDates[state.wednesday].value);
};
const getPrevWeek = ({
  state,
  api,
  emit
}) => () => {
  let newPrevDate = new Date(state.weekDates[0].value);
  newPrevDate.setDate(newPrevDate.getDate() - 7);
  const passDate = new Date(newPrevDate);
  api.getDatesOfPreviousWeek(passDate);
  emit("prev-week-click", state.weekDates);
};
const getNextWeek = ({
  state,
  api,
  emit
}) => () => {
  let newNextDate = new Date(state.weekDates[6].value);
  newNextDate.setDate(newNextDate.getDate() + 7);
  const passDate = new Date(newNextDate);
  api.getDatesOfNextWeek(passDate);
  emit("next-week-click", state.weekDates);
};
const goPrevMonth = ({
  state
}) => () => {
  const {
    year,
    month
  } = lastMonth(state.activeYear, state.activeMonth);
  state.activeYear = year;
  state.activeMonth = month;
};
const goNextMonth = ({
  state
}) => () => {
  const {
    year,
    month
  } = nextMonth(state.activeYear, state.activeMonth);
  state.activeYear = year;
  state.activeMonth = month;
};
const makeUpZero = number => {
  const string = String(number).padStart(2, "0");
  return string;
};
const formatDate = date => {
  const newDate = new Date(date);
  return newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
};
const computeCascaderOptions = t => () => [{
  range: [1990, 2090],
  optionMethod: i => ({
    id: i,
    label: t("ui.calendarBar.year").replace("%s", String(i))
  })
}, {
  range: [1, 12],
  optionMethod: i => ({
    id: i,
    label: t(`ui.calendarBar.month.${i}`)
  })
}];
const handleCascaderChange = ({
  state
}) => val => {
  if (Array.isArray(val) && val.length === 2) {
    state.activeYear = val[0];
    state.activeMonth = val[1];
  }
};
const setCascaderVisible = state => value => state.cascaderVisible = !!value;
const eventInThisTime = function (item, startTime, endTime) {
  return item.start >= startTime && item.start < endTime || startTime > item.start && endTime <= item.end || item.end >= startTime && item.end <= endTime;
};
const touchstart = ({
  state
}) => event => {
  event.preventDefault();
  event.stopPropagation();
  resetTouchStatus(state);
  state.moving = true;
  state.touchTime = Date.now();
  state.startPos.X = event.touches[0].clientX;
  state.startPos.Y = event.touches[0].clientY;
};
const touchmove = ({
  state
}) => event => {
  const touch = event.touches[0];
  state.deltaPos.X = touch.clientX - state.startPos.X;
  state.deltaPos.Y = touch.clientY - state.startPos.Y;
  state.offsetPos.X = Math.abs(state.deltaPos.X);
  state.offsetPos.Y = Math.abs(state.deltaPos.Y);
  state.direction = getDirection(state.offsetPos.X, state.offsetPos.Y);
  if (state.direction === "vertical") return;
  state.delta = state.deltaPos.X;
};
const touchend = ({
  state,
  api,
  vm
}) => () => {
  const weekPanel = vm.$refs.weekPanel;
  const width = weekPanel && weekPanel.offsetWidth;
  const speed = state.delta / (Date.now() - state.touchTime);
  const isShouldMove = Math.abs(speed) > 0.3 || Math.abs(state.delta) > +(width / 3).toFixed(2);
  if (isShouldMove) {
    if (state.mode === "month" || state.showMonth) {
      state.delta > 0 ? api.goPrevMonth() : api.goNextMonth();
    } else {
      state.delta > 0 ? api.getPrevWeek() : api.getNextWeek();
    }
  }
  state.moving = false;
  state.delta = 0;
};
function resetTouchStatus(state) {
  state.direction = "";
  state.delta = 0;
  state.deltaPos.X = 0;
  state.deltaPos.Y = 0;
  state.offsetPos.X = 0;
  state.offsetPos.Y = 0;
}
export { computeCascaderOptions, computedCalendar, currentDateChange, dateIsToday, genDayTimes, getAllDatesOfCurrWeek, getAllWednesdaysInMonth, getAllWednesdaysInYear, getCurWeekEvent, getDatesOfNextWeek, getDatesOfPreviousWeek, getDayBgColor, getEventByDate, getEventByMonth, getEventByTime, getEventShowTime, getNextWeek, getPrevWeek, getWeekOfDate, goNextMonth, goPrevMonth, handleCascaderChange, handleDropBtnClick, handleEvents, handleMouseenter, handleMouseleave, initWeeklyCalendar, isSelectedDate, isShowMark, isShowNewSchedule, isStartOrEndDay, isToday, newSchedule, parseDate, selectDay, setCascaderVisible, setEventsLeftOffset, toToday, touchend, touchmove, touchstart };