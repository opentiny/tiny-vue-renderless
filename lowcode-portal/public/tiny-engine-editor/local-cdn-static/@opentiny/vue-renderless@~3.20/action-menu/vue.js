import "../chunk-G2ADBYYC.js";
import { handleMoreClick, handleItemClick, visibleChange, computedMaxShowNum, computedSpacing, computedMoreText, computedSuffixIcon } from './index.js';
const api = ["state", "handleMoreClick", "handleItemClick", "visibleChange"];
const renderless = (props, {
  computed,
  reactive
}, {
  emit,
  t,
  designConfig
}) => {
  const api2 = {};
  const state = reactive({
    visibleOptions: computed(() => props.options.slice(0, state.maxShowNum)),
    isCardMode: computed(() => props.mode === "card"),
    moreOptions: computed(() => props.options.slice(state.maxShowNum)),
    spacing: computed(() => api2.computedSpacing()),
    maxShowNum: computed(() => api2.computedMaxShowNum()),
    moreText: computed(() => api2.computedMoreText()),
    suffixIcon: computed(() => api2.computedSuffixIcon())
  });
  Object.assign(api2, {
    state,
    handleMoreClick: handleMoreClick(emit),
    handleItemClick: handleItemClick(emit),
    visibleChange: visibleChange(emit),
    computedMaxShowNum: computedMaxShowNum({
      props,
      state
    }),
    computedSpacing: computedSpacing({
      props,
      state,
      designConfig
    }),
    computedMoreText: computedMoreText({
      props,
      state,
      t
    }),
    computedSuffixIcon: computedSuffixIcon({
      props,
      state
    })
  });
  return api2;
};
export { api, renderless };