import "../chunk-G2ADBYYC.js";
import { getPages, onPagerClick, onMouseenter } from './index.js';
const api = ["state", "onPagerClick", "onMouseenter"];
const renderless = (props, {
  computed,
  reactive,
  watch
}, {
  emit,
  vm
}) => {
  const api2 = {
    onPagerClick: onPagerClick({
      emit,
      props,
      vm
    })
  };
  const state = reactive({
    current: null,
    showPrevMore: false,
    showNextMore: false,
    quicknextIconClass: props.popupIcon,
    quickprevIconClass: props.popupIcon,
    pagers: computed(() => api2.getPages())
  });
  Object.assign(api2, {
    state,
    getPages: getPages({
      props,
      state
    }),
    onMouseenter: onMouseenter({
      props,
      state
    })
  });
  watch(() => state.showPrevMore, value => {
    if (!value) {
      state.quickprevIconClass = props.popupIcon;
    }
  }, {
    immediate: true
  });
  watch(() => state.showNextMore, value => {
    if (!value) {
      state.quicknextIconClass = props.popupIcon;
    }
  }, {
    immediate: true
  });
  return api2;
};
export { api, renderless };