import "../chunk-G2ADBYYC.js";
import { addResizeListener, removeResizeListener } from './../common/deps/resize-event.js';
import debounce from './../common/deps/debounce.js';
import { getHiddenTags, handelItemClick } from './index.js';
const api = ["state", "handelItemClick"];
const renderless = (props, {
  onMounted,
  onBeforeUnmount,
  reactive,
  watch
}, {
  vm,
  emit
}) => {
  const delay = 100;
  const state = reactive({
    showMore: false,
    hiddenTags: []
  });
  const api2 = {
    state,
    getHiddenTags: getHiddenTags({
      props,
      vm,
      state
    }),
    handelItemClick: handelItemClick({
      emit
    })
  };
  onMounted(() => {
    api2.getHiddenTags();
    api2.debouncedGetHiddenTags = debounce(delay, api2.getHiddenTags);
    addResizeListener(vm.$refs.tagGroup, debounce(delay, api2.debouncedGetHiddenTags));
  });
  watch(() => props.data.length, () => {
    api2.getHiddenTags();
  });
  onBeforeUnmount(() => {
    removeResizeListener(vm.$refs.tagGroup, api2.debouncedGetHiddenTags);
  });
  return api2;
};
export { api, renderless };