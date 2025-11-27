import "../chunk-G2ADBYYC.js";
import { on, off } from './../common/deps/dom.js';
import { panelToggle, filterSelectOption, filterConfirm, labelListComputed, selectOption, confirm, cancel, resize, reset, selectOptionAll } from './index.js';
const api = ["state", "panelToggle", "filterSelectOption", "filterConfirm", "selectOption", "confirm", "cancel", "reset", "selectOptionAll"];
const renderless = (props, {
  reactive,
  computed,
  onMounted,
  onBeforeUnmount
}, {
  emit,
  vm
}) => {
  const api2 = {};
  const state = reactive({
    showPanelIndex: -1,
    filterPanel: {
      show: false,
      selected: []
    },
    selectPanel: {
      selected: [],
      config: computed(() => state.showPanelIndex !== -1 ? props.data[state.showPanelIndex] : {
        options: []
      })
    },
    tagWidth: computed(() => (100 / props.columnNum).toFixed(1) + "%"),
    labelList: computed(() => api2.labelListComputed()),
    showPanel: computed(() => state.showPanelIndex !== -1 || state.filterPanel.show),
    hasFilterValue: computed(() => props.filterValue.find(item => Array.isArray(item) ? item.length > 0 : ![void 0, null, ""].includes(item)))
  });
  Object.assign(api2, {
    state,
    panelToggle: panelToggle({
      state,
      props,
      api: api2,
      emit
    }),
    filterSelectOption: filterSelectOption({
      state,
      props,
      emit,
      api: api2
    }),
    filterConfirm: filterConfirm({
      state,
      props,
      emit
    }),
    selectOption: selectOption({
      state,
      props,
      emit,
      api: api2
    }),
    confirm: confirm({
      state,
      props,
      emit,
      api: api2
    }),
    cancel: cancel({
      state,
      emit
    }),
    resize: resize({
      state,
      vm,
      props
    }),
    reset: reset({
      state,
      props
    }),
    selectOptionAll: selectOptionAll({
      state
    }),
    labelListComputed: labelListComputed({
      state,
      props
    })
  });
  onMounted(() => {
    on(window, "scroll", api2.resize);
    on(window, "resize", api2.resize);
  });
  onBeforeUnmount(() => {
    off(window, "scroll", api2.resize);
    off(window, "resize", api2.resize);
  });
  return api2;
};
export { api, renderless };