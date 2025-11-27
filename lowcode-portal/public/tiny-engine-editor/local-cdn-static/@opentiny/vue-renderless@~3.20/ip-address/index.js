import "../chunk-G2ADBYYC.js";
import { KEY_CODE, IPTHRESHOLD } from './../common/index.js';
const isIP6 = str => /^IPv6$/i.test(str);
const isIP4 = str => /^IPv4$/i.test(str);
const ipValidator = ({
  props,
  api
}) => value => {
  let result = true;
  if (props.type) {
    if (api.isIP6(props.type)) {
      result = /^(((([\da-fA-F]{1,4}):){7}([\da-fA-F]{1,4}))|(((([\da-fA-F]{1,4}):){1,7}:)|((([\da-fA-F]{1,4}):){6}:([\da-fA-F]{1,4}))|((([\da-fA-F]{1,4}):){5}:(([\da-fA-F]{1,4}):)?([\da-fA-F]{1,4}))|((([\da-fA-F]{1,4}):){4}:(([\da-fA-F]{1,4}):){0,2}([\da-fA-F]{1,4}))|((([\da-fA-F]{1,4}):){3}:(([\da-fA-F]{1,4}):){0,3}([\da-fA-F]{1,4}))|((([\da-fA-F]{1,4}):){2}:(([\da-fA-F]{1,4}):){0,4}([\da-fA-F]{1,4}))|((([\da-fA-F]{1,4}):){1}:(([\da-fA-F]{1,4}):){0,5}([\da-fA-F]{1,4}))|(::(([\da-fA-F]{1,4}):){0,6}([\da-fA-F]{1,4}))|(::([\da-fA-F]{1,4})?))|(((([\da-fA-F]{1,4}):){6}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-fA-F]{1,4}):){5}:(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-fA-F]{1,4}):){4}:(([\da-fA-F]{1,4}):)?(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-fA-F]{1,4}):){3}:(([\da-fA-F]{1,4}):){0,2}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-fA-F]{1,4}):){2}:(([\da-fA-F]{1,4}):){0,3}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|(([\da-fA-F]{1,4})::(([\da-fA-F]{1,4}):){0,4}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|(::(([\da-fA-F]{1,4}):){0,5}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))))$/.test(value);
    } else if (api.isIP4(props.type)) {
      result = /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/.test(value);
    }
  }
  return result;
};
const getCursorPosition = el => {
  var _a, _b;
  let cursorPos = 0;
  let selectRange = null;
  if (document == null ? void 0 : document.selection) {
    selectRange = (_a = document == null ? void 0 : document.selection) == null ? void 0 : _a.createRange();
    selectRange == null ? void 0 : selectRange.moveStart("character", -el.value.length);
    cursorPos = (_b = selectRange == null ? void 0 : selectRange.text) == null ? void 0 : _b.length;
  }
  if (el.selectionStart || el.selectionStart === "0") {
    cursorPos = el.selectionStart;
  }
  return cursorPos;
};
const getValue = ({
  api,
  props,
  state
}) => () => {
  const valueArr = [];
  let result = "";
  if (api.isIP6(props.type)) {
    state.address.forEach(item => {
      if (item.value) {
        item.value = item.value.replace(/[^a-fA-F\d]/g, "");
      }
      item.value && valueArr.push(item.value);
    });
    result = state.address.filter(item => item.value).length === 8 ? valueArr.join(":") : "";
  } else {
    state.address.forEach(item => {
      if (api.isIP4(props.type) && item.value) {
        item.value = item.value.replace(/\D/g, "");
      }
      item.value && valueArr.push(item.value);
    });
    result = state.address.filter(item => item.value).length === 4 ? valueArr.join(".") : "";
  }
  return result;
};
const setValue = ({
  api,
  props,
  state
}) => value => {
  var _a;
  if (value) {
    if ((_a = api == null ? void 0 : api.ipValidator) == null ? void 0 : _a.call(api, value)) {
      if (api.isIP6(props.type)) {
        state.address = value.split(":").map(item => ({
          value: item
        }));
        if (state.address.length < 8) {
          let insertIndex = 0;
          state.address.forEach((item, index) => {
            if (item.value === "") {
              item.value = "0000";
              insertIndex = index;
            }
          });
          for (let i = 0; i <= 8 - state.address.length; i++) {
            state.address.splice(insertIndex, 0, {
              value: "0000"
            });
          }
        }
      } else {
        state.address = value.split(".").map(item => ({
          value: item
        }));
      }
    }
  } else {
    const createValue = () => ({
      value: ""
    });
    state.address = api.isIP6(props.type) ? new Array(8).fill("").map(createValue) : new Array(4).fill("").map(createValue);
  }
};
const activeEvent = ({
  emit,
  parent,
  state,
  index,
  event,
  type
}) => {
  const target = event && event.target ? event.target : parent.$el.querySelectorAll("input")[index || 0];
  type === "focus" && (state.active = true);
  if (!event) {
    if (target && !state.isSelected) {
      state.isSelected = true;
      target[type]();
      setTimeout(() => {
        state.isSelected = false;
      }, 10);
      emit(type, target.value, index);
    }
  } else {
    !state.isSelected && emit(type, target.value, index);
  }
};
const focus = ({
  emit,
  parent,
  state
}) => ({
  index,
  event
}) => {
  activeEvent({
    emit,
    parent,
    state,
    index,
    event,
    type: "focus"
  });
};
const select = ({
  emit,
  parent,
  state
}) => ({
  index,
  event
}) => {
  activeEvent({
    emit,
    parent,
    state,
    index,
    event,
    type: "select"
  });
};
const inputEvent = ({
  api,
  componentName,
  emit,
  eventName,
  props
}) => ({
  item,
  index
}) => {
  var _a, _b, _c, _d, _e;
  const val = item.value.trim();
  let value = "";
  if (api.isIP4(props.type)) {
    if (!index && ((_a = api == null ? void 0 : api.ipValidator) == null ? void 0 : _a.call(api, val))) {
      (_b = api == null ? void 0 : api.setValue) == null ? void 0 : _b.call(api, val);
    } else if (isNaN(val) || val < IPTHRESHOLD.Min || val > IPTHRESHOLD.Max) {
      item.value = "";
    }
  } else {
    if (!index && ((_c = api == null ? void 0 : api.ipValidator) == null ? void 0 : _c.call(api, val))) {
      (_d = api == null ? void 0 : api.setValue) == null ? void 0 : _d.call(api, val);
    } else if (val.length > 4) {
      item.value = item.value.slice(0, 4);
    }
  }
  value = (_e = api == null ? void 0 : api.getValue) == null ? void 0 : _e.call(api);
  emit("update:modelValue", value, index);
  emit("input", value, index);
  api.dispatch(componentName, eventName, [value]);
};
const change = ({
  api,
  emit
}) => () => {
  var _a;
  const value = (_a = api == null ? void 0 : api.getValue) == null ? void 0 : _a.call(api);
  emit("change", value);
};
const blur = ({
  api,
  componentName,
  emit,
  eventName,
  props,
  state
}) => ({
  item,
  index
}) => {
  state.active = false;
  state.isDel = false;
  if (api.isIP4(props.type)) {
    item.value = item.value.replace(/\D/g, "");
  }
  emit("blur", item.value, index);
  api.dispatch(componentName, eventName, [item.value]);
};
const keyup = ({
  api,
  props
}) => ({
  item,
  index,
  event
}) => {
  const {
    keyCode
  } = event;
  const value = item.value.trim();
  const nextIndex = index + 1;
  if (api.isIP4(props.type)) {
    if (isNaN(item.value)) {
      item.value = item.value.replace(/\D/g, "");
      return false;
    }
    if ([KEY_CODE.Tab, KEY_CODE.Space, KEY_CODE.NumpadDecimal, KEY_CODE.NumpadComma].includes(keyCode) && value) {
      api.select({
        index: nextIndex
      });
      return false;
    }
    if ((value === "0" || value > IPTHRESHOLD.NonNumeric || value.length === 3) && !isNaN(event.key)) {
      api.focus({
        index: nextIndex
      });
      api.select({
        index: nextIndex
      });
      return false;
    }
  }
  if (api.isIP6(props.type)) {
    if ([KEY_CODE.Tab, KEY_CODE.Space, KEY_CODE.NumpadDecimal, KEY_CODE.NumpadComma].includes(keyCode) && value) {
      api.select({
        index: nextIndex
      });
      return false;
    }
    if ((value.length === 4 || value === "0000") && (!isNaN(event.key) || keyCode >= KEY_CODE.KeyA && keyCode <= KEY_CODE.KeyF)) {
      api.focus({
        index: nextIndex
      });
      api.select({
        index: nextIndex
      });
      return false;
    }
  }
};
const checkError1 = ({
  Tab,
  Space,
  NumpadDecimal,
  NumpadComma,
  keyCode,
  value
}) => [Tab, Space, NumpadDecimal, NumpadComma].includes(keyCode) && value;
const checkError2 = newValue => newValue && (isNaN(newValue) || newValue > IPTHRESHOLD.Max);
const checkError3 = ({
  isfilterKeyCodes,
  isSelected,
  value
}) => !isfilterKeyCodes && !isSelected && value === "0";
const checkError4 = ({
  isfilterKeyCodes,
  isSelected,
  value,
  key
}) => !isfilterKeyCodes && !isSelected && value + key > IPTHRESHOLD.Max;
const checkError5 = ({
  key,
  isfilterKeyCodes,
  value,
  ctrlKey,
  keyCode,
  KeyV
}) => isNaN(key) && !isfilterKeyCodes && !(!value && ctrlKey && keyCode === KeyV);
const isError = ({
  key,
  value,
  isSelected,
  isfilterKeyCodes,
  ctrlKey,
  keyCode,
  newValue
}) => {
  const {
    Tab,
    Space,
    NumpadDecimal,
    NumpadComma,
    KeyV
  } = KEY_CODE;
  return checkError1({
    Tab,
    Space,
    NumpadDecimal,
    NumpadComma,
    keyCode,
    value
  }) || checkError2(newValue) || checkError3({
    isfilterKeyCodes,
    isSelected,
    value
  }) || checkError4({
    isfilterKeyCodes,
    isSelected,
    value,
    key
  }) || checkError5({
    key,
    isfilterKeyCodes,
    value,
    ctrlKey,
    keyCode,
    KeyV
  });
};
const keydown = ({
  api,
  props,
  state
}) => ({
  item,
  index,
  event
}) => {
  const {
    target,
    key,
    keyCode,
    ctrlKey
  } = event;
  const value = item.value;
  const selectionStart = target == null ? void 0 : target.selectionStart;
  const selectionEnd = target == null ? void 0 : target.selectionEnd;
  const isSelected = selectionStart !== selectionEnd;
  const cursorPosition = api.getCursorPosition(target);
  const isfilterKeyCodes = state.filterKeyCodes.includes(keyCode);
  const nextIndex = index + 1;
  const lastIndex = index - 1;
  const newValue = isSelected && !isfilterKeyCodes && value.substr(0, selectionStart) + key + value.substr(selectionEnd);
  state.isDel = keyCode === KEY_CODE.Backspace || keyCode === KEY_CODE.Delete;
  if (keyCode === KEY_CODE.Backspace && cursorPosition === 0 && !selectionEnd) {
    api.focus({
      index: lastIndex
    });
    return false;
  }
  if (keyCode === KEY_CODE.ArrowLeft && cursorPosition === 0) {
    api.focus({
      index: lastIndex
    });
    event.preventDefault();
    return false;
  }
  if (keyCode === KEY_CODE.ArrowRight && cursorPosition === value.length) {
    api.focus({
      index: nextIndex
    });
    event.preventDefault();
    return false;
  }
  if (isError({
    key,
    value,
    isSelected,
    isfilterKeyCodes,
    ctrlKey,
    keyCode,
    newValue,
    api,
    props
  })) {
    event.preventDefault();
    return false;
  }
};
export { blur, change, focus, getCursorPosition, getValue, inputEvent, ipValidator, isIP4, isIP6, keydown, keyup, select, setValue };