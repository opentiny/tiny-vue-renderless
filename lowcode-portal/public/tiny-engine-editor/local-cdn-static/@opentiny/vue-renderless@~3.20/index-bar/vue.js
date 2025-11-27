import "../chunk-G2ADBYYC.js";
import { handleScroll, updateAnchorChildren, handleTouchDown, handleTouchMove, handleTouchUp, handleIndexClick } from './index.js';
const api = ["state", "handleIndexClick", "handleScroll", "updateAnchorChildren", "handleTouchDown", "handleTouchMove", "handleTouchUp", "handleIndexClick"];
const renderless = (props, {
  computed,
  reactive,
  onMounted,
  onUnmounted,
  onUpdated,
  watch
}, {
  emit,
  parent,
  refs
}) => {
  const state = reactive({
    index: 0,
    childrenAnchor: [],
    isFistUpdate: true
  });
  const api2 = {
    state,
    isMouseDown: false,
    handleScroll: handleScroll({
      state
    }),
    updateAnchorChildren: updateAnchorChildren({
      emit,
      parent,
      refs,
      state
    }),
    handleTouchDown: handleTouchDown({
      state
    }),
    handleTouchMove: handleTouchMove({
      emit,
      state
    }),
    handleTouchUp: handleTouchUp({
      state
    }),
    handleIndexClick: handleIndexClick({
      emit,
      parent,
      refs,
      state
    })
  };
  Object.assign(api2, {
    state
  });
  onMounted(e => {
    window.addEventListener("scroll", api2.handleScroll);
  });
  onUnmounted(() => {
    window.removeEventListener("scroll", api2.handleScroll);
  });
  watch(() => state.index, (value, oldValue) => {
    const isChange = value !== oldValue && value >= 0 && value < parent.indexList.length;
    if (isChange) {
      emit("change", value);
    }
  }, {
    immediate: false
  });
  watch(() => props.indexList, () => {
    api2.updateAnchorChildren({
      refs,
      state
    });
  }, {
    immediate: false,
    deep: true
  });
  onUpdated(() => {
    if (state.isFistUpdate) {
      state.isFistUpdate = false;
      api2.updateAnchorChildren({
        refs,
        state
      });
    }
  });
  return api2;
};
export { api, renderless };