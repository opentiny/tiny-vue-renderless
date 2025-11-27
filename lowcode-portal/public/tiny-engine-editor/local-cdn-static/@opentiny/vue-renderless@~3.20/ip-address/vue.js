import { __spreadProps, __spreadValues } from "../chunk-G2ADBYYC.js";
import { isIP6, isIP4, ipValidator, getCursorPosition, getValue, setValue, focus, select, inputEvent, change, blur, keyup, keydown } from './index.js';
import { KEY_CODE } from './../common/index.js';
const api = ["state", "focus", "inputEvent", "blur", "keyup", "keydown", "change", "select"];
const initState = ({
  reactive,
  computed,
  handleValue,
  parent,
  props
}) => {
  const state = reactive(__spreadProps(__spreadValues({}, handleValue.state), {
    active: false,
    isSelected: false,
    filterKeyCodes: [KEY_CODE.AtMark, KEY_CODE.Backspace, KEY_CODE.ArrowLeft, KEY_CODE.ArrowRight, KEY_CODE.Tab, KEY_CODE.Delete],
    formDisabled: computed(() => (parent.tinyForm || {}).disabled),
    disabled: computed(() => props.disabled || state.formDisabled),
    size: computed(() => props.size)
  }));
  return state;
};
const initApi = ({
  state,
  api: api2,
  dispatch,
  handleValue,
  emit,
  broadcast,
  parent,
  componentName,
  props,
  eventName
}) => {
  Object.assign(api2, __spreadProps(__spreadValues({}, handleValue.api), {
    state,
    dispatch,
    broadcast,
    getCursorPosition,
    focus: focus({
      emit,
      props,
      parent,
      state
    }),
    select: select({
      emit,
      props,
      parent,
      state
    }),
    blur: blur({
      api: api2,
      componentName,
      emit,
      eventName: eventName.blur,
      props,
      state
    }),
    keyup: keyup({
      api: api2,
      props,
      parent
    }),
    change: change({
      api: api2,
      emit
    }),
    keydown: keydown({
      api: api2,
      props,
      state
    }),
    inputEvent: inputEvent({
      api: api2,
      emit,
      props,
      componentName,
      eventName: eventName.change
    })
  }));
};
const useHandleValue = ({
  componentName,
  dispatch,
  eventName,
  props,
  reactive,
  toRefs,
  watch
}) => {
  const state = reactive({
    address: [],
    isDel: false
  });
  const api2 = {
    isIP6,
    isIP4
  };
  api2.getValue = getValue({
    api: api2,
    props,
    state
  });
  api2.setValue = setValue({
    api: api2,
    props,
    state
  });
  api2.ipValidator = ipValidator({
    api: api2,
    props
  });
  watch(() => props.modelValue, value => {
    var _a;
    if (!state.isDel) {
      (_a = api2 == null ? void 0 : api2.setValue) == null ? void 0 : _a.call(api2, value);
      dispatch(componentName, eventName, [value]);
    }
  }, {
    immediate: true
  });
  return {
    state: toRefs(state),
    api: api2
  };
};
const renderless = (props, {
  reactive,
  toRefs,
  watch,
  inject,
  computed
}, {
  emit,
  parent,
  broadcast,
  dispatch
}) => {
  const api2 = {};
  const componentName = "FormItem";
  const eventName = {
    change: "form.change",
    blur: "form.blur"
  };
  parent.tinyForm = parent.tinyForm || inject("form", null);
  const handleValue = useHandleValue({
    componentName,
    dispatch,
    eventName: eventName.change,
    props,
    reactive,
    toRefs,
    watch
  });
  const state = initState({
    reactive,
    computed,
    handleValue,
    parent,
    props
  });
  initApi({
    api: api2,
    state,
    handleValue,
    dispatch,
    broadcast,
    emit,
    props,
    parent,
    componentName,
    eventName
  });
  return api2;
};
export { api, renderless, useHandleValue };