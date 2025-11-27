import "../chunk-G2ADBYYC.js";
import { mounted, updated, unmounted, getContainer, linkClick, onItersectionObserver, setScrollContainer, getCurrentAnchor, setFixAnchor, handleScroll } from './index.js';
const api = ["state", "getContainer", "linkClick", "onItersectionObserver", "setScrollContainer", "getCurrentAnchor"];
const renderless = (props, {
  onMounted,
  onUnmounted,
  onUpdated,
  reactive,
  watch
}, {
  vm,
  emit,
  nextTick
}) => {
  const api2 = {};
  const state = reactive({
    currentLink: "",
    observerLinks: {},
    expandLink: {},
    intersectionObserver: null,
    scrollContainer: null,
    currentHash: "",
    isScroll: false,
    scrollTimer: 0,
    childOffsetTop: 0
  });
  Object.assign(api2, {
    state,
    mounted: mounted({
      state,
      api: api2,
      props,
      nextTick
    }),
    updated: updated({
      api: api2
    }),
    unmounted: unmounted({
      state,
      api: api2
    }),
    getContainer: getContainer({
      props
    }),
    linkClick: linkClick({
      state,
      vm,
      emit,
      props,
      api: api2
    }),
    onItersectionObserver: onItersectionObserver({
      state,
      props,
      api: api2,
      vm,
      emit
    }),
    setScrollContainer: setScrollContainer({
      state,
      api: api2
    }),
    getCurrentAnchor: getCurrentAnchor({
      vm,
      state,
      emit
    }),
    setFixAnchor: setFixAnchor({
      vm,
      props
    }),
    handleScroll: handleScroll(state)
  });
  onMounted(api2.mounted);
  onUpdated(api2.updated);
  onUnmounted(api2.unmounted);
  watch(() => props.links, () => {
    api2.mounted();
  });
  watch(() => props.isAffix, () => {
    api2.setFixAnchor();
  });
  return api2;
};
export { api, renderless };