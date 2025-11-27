import "../chunk-G2ADBYYC.js";
import { toogleRecord, handleConfirm, watchModelValue, renderAudioGraph, unmounted, resetRecord, handleCancel, triggerClick, watchRecordStatus, calcRecordTime } from './index.js';
const api = ["state", "toogleRecord", "handleConfirm", "handleCancel"];
const initState = ({
  vm,
  api: api2,
  reactive,
  computed
}) => {
  const state = reactive({
    listeners: vm.$listeners,
    record: {
      status: "ready",
      currentTime: 0
    },
    recodeTime: computed(() => {
      const time = parseInt(state.record.currentTime);
      const minute = Math.floor(time / 60);
      const second = Math.floor(time % 60);
      return `${minute.toString().padStart(2, 0)}:${second.toString().padStart(2, 0)}`;
    })
  });
  Object.assign(api2, {
    state
  });
  return state;
};
const initApi = ({
  api: api2,
  state,
  emit,
  vm,
  constants,
  props,
  nextTick
}) => {
  Object.assign(api2, {
    toogleRecord: toogleRecord({
      state,
      api: api2,
      emit,
      constants,
      props
    }),
    handleConfirm: handleConfirm({
      state,
      emit,
      props,
      constants,
      api: api2
    }),
    watchModelValue: watchModelValue({
      api: api2
    }),
    renderAudioGraph: renderAudioGraph({
      vm,
      nextTick,
      state,
      props
    }),
    unmounted: unmounted({
      api: api2
    }),
    resetRecord: resetRecord({
      state,
      constants
    }),
    handleCancel: handleCancel({
      emit,
      props,
      constants,
      api: api2,
      state
    }),
    triggerClick: triggerClick({
      state
    }),
    watchRecordStatus: watchRecordStatus({
      api: api2,
      props,
      constants,
      state
    }),
    calcRecordTime: calcRecordTime({
      state
    })
  });
};
const initWatch = ({
  watch,
  props,
  api: api2,
  state
}) => {
  watch(() => props.modelValue, api2.watchModelValue, {
    immediate: true
  });
  watch(() => state.record.status, api2.watchRecordStatus);
};
const renderless = (props, {
  reactive,
  watch,
  computed,
  onUnmounted,
  nextTick
}, {
  emit,
  vm,
  constants
}) => {
  const api2 = {};
  const state = initState({
    vm,
    api: api2,
    reactive,
    computed
  });
  initApi({
    api: api2,
    state,
    emit,
    vm,
    constants,
    props,
    nextTick
  });
  initWatch({
    watch,
    props,
    api: api2,
    state
  });
  onUnmounted(api2.unmounted);
  return api2;
};
export { api, renderless };