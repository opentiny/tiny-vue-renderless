import "../chunk-G2ADBYYC.js";
import { getRegion, changeOffice, getRep, getOffice, fetchDefaultData, beforeMount } from './index.js';
const api = ["state", "getRep", "getRegion", "getOffice", "changeOffice"];
const renderless = (props, {
  onBeforeMount,
  reactive
}, {
  emit,
  service,
  vm,
  nextTick
}) => {
  const api2 = {};
  const {
    fetchArea
  } = service || {};
  const state = reactive({
    jcr: "",
    region: "",
    rep: "",
    office: "",
    jcrData: [],
    regionData: [],
    repData: [],
    officeData: []
  });
  Object.assign(api2, {
    state,
    changeOffice: changeOffice({
      emit,
      state
    }),
    beforeMount: beforeMount({
      api: api2,
      props
    }),
    getRep: getRep({
      emit,
      fetchArea,
      nextTick,
      props,
      vm,
      state
    }),
    getRegion: getRegion({
      emit,
      fetchArea,
      nextTick,
      props,
      vm,
      state
    }),
    getOffice: getOffice({
      emit,
      fetchArea,
      nextTick,
      props,
      vm,
      state
    }),
    fetchDefaultData: fetchDefaultData({
      emit,
      fetchArea,
      nextTick,
      props,
      vm,
      state
    })
  });
  onBeforeMount(api2.beforeMount);
  return api2;
};
export { api, renderless };