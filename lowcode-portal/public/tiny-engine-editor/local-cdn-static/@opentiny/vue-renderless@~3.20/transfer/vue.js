import "../chunk-G2ADBYYC.js";
import { getObj, getSourceData, getLeftCheckedData, getRightCheckedData, getTargetData, logicFun, onSourceCheckedChange, onTargetCheckedChange, addToLeft, addToRight, clearQuery, sortableEvent } from './index.js';
const api = ["state", "onSourceCheckedChange", "onTargetCheckedChange", "addToLeft", "addToRight", "clearQuery"];
const initState = ({
  reactive,
  computed,
  api: api2,
  props,
  h,
  slots
}) => reactive({
  leftChecked: [],
  rightChecked: [],
  rightData: computed(() => api2.getRightCheckedData()),
  leftData: computed(() => api2.getLeftCheckedData()),
  dataObj: computed(() => api2.getObj()),
  sourceData: computed(() => api2.getSourceData()),
  targetData: computed(() => api2.getTargetData()),
  hasButtonTexts: computed(() => props.buttonTexts.length === 2),
  isToLeft: false,
  optionRender: computed(() => option => {
    if (props.renderContent) {
      return props.renderContent(h, option);
    }
    if (slots.default) {
      return slots.default({
        option
      });
    }
    return h("span", option[props.props.label] || option[props.props.key]);
  })
});
const renderless = (props, {
  computed,
  onMounted,
  reactive,
  h
}, {
  $prefix,
  emit,
  refs,
  parent,
  slots,
  vm
}) => {
  const api2 = {};
  const Tree = $prefix + "Tree";
  const Table = $prefix + "Table";
  const state = initState({
    reactive,
    computed,
    api: api2,
    props,
    h,
    slots
  });
  const {
    DROPPANEL,
    TRANSFERPANEL
  } = parent.$constants;
  Object.assign(api2, {
    state,
    getObj: getObj(props),
    clearQuery: clearQuery(refs),
    getSourceData: getSourceData({
      props,
      Tree
    }),
    addToLeft: addToLeft({
      emit,
      props,
      state
    }),
    getLeftCheckedData: getLeftCheckedData({
      props,
      state
    }),
    getRightCheckedData: getRightCheckedData({
      props,
      state
    }),
    addToRight: addToRight({
      emit,
      refs,
      props,
      state,
      Tree
    }),
    onTargetCheckedChange: onTargetCheckedChange({
      emit,
      state
    }),
    onSourceCheckedChange: onSourceCheckedChange({
      emit,
      state
    }),
    logicFun: logicFun({
      props,
      emit,
      state,
      vm
    }),
    getTargetData: getTargetData({
      props,
      state,
      Tree,
      Table
    }),
    sortableEvent: sortableEvent({
      api: api2,
      droppanel: DROPPANEL,
      props,
      queryDom: TRANSFERPANEL,
      refs
    })
  });
  onMounted(api2.sortableEvent);
  return api2;
};
export { api, renderless };