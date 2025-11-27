import "../chunk-G2ADBYYC.js";
import { created, loadPickerData, wheelChanged, changeWheelItemStyle, loadWheels, createWheelHasFooter, createWheelNoFooter, wheelsTo, refreshWheel, dealWheels, clickWheelItem } from './index.js';
const api = ["state", "created", "loadPickerData", "wheelChanged", "changeWheelItemStyle", "loadWheels", "createWheelHasFooter", "createWheelNoFooter", "wheelsTo", "refreshWheel", "dealWheels", "clickWheelItem"];
const initState = reactive => {
  const state = reactive({
    dataSource: [],
    defaultSelectedIndexs: [],
    pickerData: [],
    wheels: [],
    prevSelectedIndexs: []
  });
  return state;
};
const initApi = ({
  api: api2,
  props,
  state,
  emit,
  nextTick,
  refs,
  BScroll
}) => {
  Object.assign(api2, {
    state,
    created: created(api2),
    loadPickerData: loadPickerData({
      props,
      state
    }),
    wheelChanged: wheelChanged({
      api: api2,
      state
    }),
    changeWheelItemStyle: changeWheelItemStyle(state),
    loadWheels: loadWheels({
      api: api2,
      props,
      state,
      nextTick,
      refs
    }),
    createWheelHasFooter: createWheelHasFooter({
      api: api2,
      state,
      emit,
      BScroll
    }),
    createWheelNoFooter: createWheelNoFooter({
      api: api2,
      state,
      BScroll
    }),
    wheelsTo: wheelsTo({
      api: api2,
      state,
      nextTick
    }),
    refreshWheel: refreshWheel(nextTick),
    dealWheels: dealWheels(state),
    clickWheelItem: clickWheelItem({
      api: api2,
      state,
      emit
    })
  });
};
const initWatch = ({
  watch,
  api: api2,
  props,
  state,
  nextTick
}) => {
  watch(() => props.defaultSelectedIndexs, () => {
    api2.dealWheels(state);
    nextTick(() => {
      api2.created(api2);
    });
  });
};
const renderless = (props, {
  onMounted,
  reactive,
  watch
}, {
  emit,
  nextTick,
  refs
}, {
  BScroll
}) => {
  const api2 = {};
  const state = initState(reactive);
  initApi({
    api: api2,
    props,
    state,
    emit,
    nextTick,
    refs,
    BScroll
  });
  initWatch({
    watch,
    api: api2,
    props,
    state,
    nextTick
  });
  onMounted(() => {
    api2.created(api2);
  });
  return api2;
};
export { api, renderless };